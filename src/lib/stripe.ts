// src/lib/stripe.ts
// Stripe integration and payment handling

import Stripe from 'stripe';
import { query, queryOne, transaction } from './db';
import { logger, logPayment, logSubscription } from './logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

/**
 * Create Stripe customer
 */
export async function createStripeCustomer(
  companyId: string,
  email: string,
  name: string
): Promise<string> {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        companyId,
      },
    });

    logPayment('customer_created', { companyId, stripeCustomerId: customer.id });
    return customer.id;
  } catch (error) {
    logger.error('Failed to create Stripe customer', { companyId, error });
    throw error;
  }
}

/**
 * Create payment intent
 */
export async function createPaymentIntent(
  companyId: string,
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {}
): Promise<Stripe.PaymentIntent> {
  try {
    const company = await queryOne<{ stripe_customer_id: string }>(
      'SELECT stripe_customer_id FROM companies WHERE id = $1',
      [companyId]
    );

    if (!company?.stripe_customer_id) {
      throw new Error('Company has no Stripe customer ID');
    }

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: company.stripe_customer_id,
      metadata: {
        companyId,
        ...metadata,
      },
    });

    logPayment('payment_intent_created', {
      companyId,
      intentId: intent.id,
      amount,
    });

    return intent;
  } catch (error) {
    logger.error('Failed to create payment intent', { companyId, error });
    throw error;
  }
}

/**
 * Create subscription
 */
export async function createSubscription(
  companyId: string,
  priceId: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Subscription> {
  try {
    const company = await queryOne<{ stripe_customer_id: string }>(
      'SELECT stripe_customer_id FROM companies WHERE id = $1',
      [companyId]
    );

    if (!company?.stripe_customer_id) {
      throw new Error('Company has no Stripe customer ID');
    }

    const subscription = await stripe.subscriptions.create({
      customer: company.stripe_customer_id,
      items: [{ price: priceId }],
      metadata: {
        companyId,
        ...metadata,
      },
    });

    logSubscription('subscription_created', {
      companyId,
      subscriptionId: subscription.id,
    });

    return subscription;
  } catch (error) {
    logger.error('Failed to create subscription', { companyId, error });
    throw error;
  }
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscriptionAtPeriodEnd(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    logSubscription('subscription_cancel_scheduled', { subscriptionId });
    return subscription;
  } catch (error) {
    logger.error('Failed to cancel subscription at period end', { subscriptionId, error });
    throw error;
  }
}

/**
 * Cancel subscription immediately
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    logSubscription('subscription_canceled', { subscriptionId });
    return subscription;
  } catch (error) {
    logger.error('Failed to cancel subscription', { subscriptionId, error });
    throw error;
  }
}

/**
 * Handle Stripe webhook event
 */
export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ success: boolean; message: string }> {
  try {
    switch (event.type) {
      case 'charge.succeeded':
        return handleChargeSucceeded(event.data.object as Stripe.Charge);

      case 'charge.failed':
        return handleChargeFailed(event.data.object as Stripe.Charge);

      case 'customer.subscription.created':
        return handleSubscriptionCreated(event.data.object as Stripe.Subscription);

      case 'customer.subscription.updated':
        return handleSubscriptionUpdated(event.data.object as Stripe.Subscription);

      case 'customer.subscription.deleted':
        return handleSubscriptionDeleted(event.data.object as Stripe.Subscription);

      case 'invoice.created':
        return handleInvoiceCreated(event.data.object as Stripe.Invoice);

      case 'invoice.paid':
        return handleInvoicePaid(event.data.object as Stripe.Invoice);

      default:
        logger.info(`Unhandled Stripe event: ${event.type}`);
        return { success: true, message: `Unhandled event: ${event.type}` };
    }
  } catch (error) {
    logger.error('Error handling Stripe webhook', { event, error });
    return { success: false, message: 'Webhook processing failed' };
  }
}

/**
 * Handle charge.succeeded event
 */
async function handleChargeSucceeded(charge: Stripe.Charge) {
  const companyId = charge.metadata?.companyId;
  if (!companyId) return { success: false, message: 'Missing companyId in metadata' };

  try {
    await query(
      `UPDATE payments
       SET status = $1, stripe_charge_id = $2, updated_at = CURRENT_TIMESTAMP
       WHERE stripe_payment_intent_id = $3`,
      ['succeeded', charge.id, charge.payment_intent]
    );

    logPayment('charge_succeeded', { companyId, chargeId: charge.id });
    return { success: true, message: 'Charge recorded' };
  } catch (error) {
    logger.error('Failed to record charge', { charge, error });
    return { success: false, message: 'Failed to record charge' };
  }
}

/**
 * Handle charge.failed event
 */
async function handleChargeFailed(charge: Stripe.Charge) {
  const companyId = charge.metadata?.companyId;
  if (!companyId) return { success: false, message: 'Missing companyId in metadata' };

  try {
    await query(
      `UPDATE payments
       SET status = $1, error_message = $2, updated_at = CURRENT_TIMESTAMP
       WHERE stripe_payment_intent_id = $3`,
      ['failed', charge.failure_message || 'Payment failed', charge.payment_intent]
    );

    logPayment('charge_failed', { companyId, chargeId: charge.id, reason: charge.failure_code });
    return { success: true, message: 'Charge failure recorded' };
  } catch (error) {
    logger.error('Failed to record charge failure', { charge, error });
    return { success: false, message: 'Failed to record charge failure' };
  }
}

/**
 * Handle subscription creation (from Stripe)
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const companyId = subscription.metadata?.companyId;
  if (!companyId) return { success: false, message: 'Missing companyId in metadata' };

  try {
    const item = subscription.items.data[0];
    const service = await queryOne<{ id: string }>(
      'SELECT id FROM services WHERE stripe_price_id = $1',
      [item.price.id]
    );

    if (!service) {
      logger.warn('Service not found for Stripe price', { priceId: item.price.id });
      return { success: false, message: 'Service not found' };
    }

    await transaction(async (client) => {
      // Update or create subscription
      await client.query(
        `INSERT INTO subscriptions (company_id, service_id, status, stripe_subscription_id, current_period_start, current_period_end)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (company_id, service_id) DO UPDATE
         SET stripe_subscription_id = $4, status = $3, updated_at = CURRENT_TIMESTAMP`,
        [
          companyId,
          service.id,
          'active',
          subscription.id,
          new Date(subscription.current_period_start * 1000),
          new Date(subscription.current_period_end * 1000),
        ]
      );

      // Update company status
      await client.query(
        `UPDATE companies SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        ['active', companyId]
      );
    });

    logSubscription('subscription_created_from_stripe', { companyId, subscriptionId: subscription.id });
    return { success: true, message: 'Subscription created' };
  } catch (error) {
    logger.error('Failed to handle subscription creation', { subscription, error });
    return { success: false, message: 'Failed to create subscription' };
  }
}

/**
 * Handle subscription update
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const companyId = subscription.metadata?.companyId;

  try {
    const status = subscription.status === 'active' ? 'active' : 'paused';

    await query(
      `UPDATE subscriptions
       SET status = $1, current_period_start = $2, current_period_end = $3, updated_at = CURRENT_TIMESTAMP
       WHERE stripe_subscription_id = $4`,
      [
        status,
        new Date(subscription.current_period_start * 1000),
        new Date(subscription.current_period_end * 1000),
        subscription.id,
      ]
    );

    logSubscription('subscription_updated', { companyId, subscriptionId: subscription.id });
    return { success: true, message: 'Subscription updated' };
  } catch (error) {
    logger.error('Failed to handle subscription update', { subscription, error });
    return { success: false, message: 'Failed to update subscription' };
  }
}

/**
 * Handle subscription deletion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const companyId = subscription.metadata?.companyId;

  try {
    await query(
      `UPDATE subscriptions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE stripe_subscription_id = $2`,
      ['canceled', subscription.id]
    );

    logSubscription('subscription_deleted', { companyId, subscriptionId: subscription.id });
    return { success: true, message: 'Subscription deleted' };
  } catch (error) {
    logger.error('Failed to handle subscription deletion', { subscription, error });
    return { success: false, message: 'Failed to delete subscription' };
  }
}

/**
 * Handle invoice creation
 */
async function handleInvoiceCreated(invoice: Stripe.Invoice) {
  const companyId = invoice.metadata?.companyId;

  try {
    const number = `INV-${invoice.number}`;

    await query(
      `INSERT INTO invoices (company_id, invoice_number, amount_cents, currency, status, stripe_invoice_id, due_date, pdf_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (invoice_number) DO NOTHING`,
      [
        companyId,
        number,
        invoice.amount_due,
        invoice.currency.toUpperCase(),
        'open',
        invoice.id,
        new Date(invoice.due_date ? invoice.due_date * 1000 : 0),
        invoice.hosted_invoice_url || null,
      ]
    );

    logPayment('invoice_created', { companyId, invoiceId: invoice.id });
    return { success: true, message: 'Invoice recorded' };
  } catch (error) {
    logger.error('Failed to handle invoice creation', { invoice, error });
    return { success: false, message: 'Failed to record invoice' };
  }
}

/**
 * Handle invoice paid
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const companyId = invoice.metadata?.companyId;

  try {
    await query(
      `UPDATE invoices SET status = $1, paid_at = CURRENT_TIMESTAMP WHERE stripe_invoice_id = $2`,
      ['paid', invoice.id]
    );

    logPayment('invoice_paid', { companyId, invoiceId: invoice.id });
    return { success: true, message: 'Invoice marked as paid' };
  } catch (error) {
    logger.error('Failed to handle invoice paid', { invoice, error });
    return { success: false, message: 'Failed to update invoice' };
  }
}

export default stripe;
