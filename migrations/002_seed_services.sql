-- 002_seed_services.sql
-- Seed default services and pricing

INSERT INTO services (name, description, base_price_cents, billing_cycle, features, tier, stripe_product_id, stripe_price_id)
VALUES
  (
    'Starter',
    'Perfect for small teams just getting started',
    2999, -- $29.99/month
    'monthly',
    '["Up to 5 users", "5 GB storage", "Basic analytics", "Email support"]'::jsonb,
    'starter',
    'prod_starter_monthly',
    'price_starter_monthly'
  ),
  (
    'Professional',
    'For growing companies with advanced needs',
    9999, -- $99.99/month
    'monthly',
    '["Up to 50 users", "100 GB storage", "Advanced analytics", "Priority support", "Custom integrations", "API access"]'::jsonb,
    'professional',
    'prod_professional_monthly',
    'price_professional_monthly'
  ),
  (
    'Enterprise',
    'Custom solution for large organizations',
    29999, -- $299.99/month
    'monthly',
    '["Unlimited users", "Unlimited storage", "Advanced analytics", "24/7 dedicated support", "Custom integrations", "API access", "SSO/SAML", "Custom SLA"]'::jsonb,
    'enterprise',
    'prod_enterprise_monthly',
    'price_enterprise_monthly'
  ),
  (
    'Starter Annual',
    'Starter plan with annual billing (save 20%)',
    28799, -- $287.99/year (~$23.99/month)
    'annual',
    '["Up to 5 users", "5 GB storage", "Basic analytics", "Email support"]'::jsonb,
    'starter',
    'prod_starter_annual',
    'price_starter_annual'
  ),
  (
    'Professional Annual',
    'Professional plan with annual billing (save 20%)',
    95999, -- $959.99/year (~$79.99/month)
    'annual',
    '["Up to 50 users", "100 GB storage", "Advanced analytics", "Priority support", "Custom integrations", "API access"]'::jsonb,
    'professional',
    'prod_professional_annual',
    'price_professional_annual'
  ),
  (
    'Enterprise Annual',
    'Enterprise plan with annual billing (save 20%)',
    287999, -- $2879.99/year (~$239.99/month)
    'annual',
    '["Unlimited users", "Unlimited storage", "Advanced analytics", "24/7 dedicated support", "Custom integrations", "API access", "SSO/SAML", "Custom SLA"]'::jsonb,
    'enterprise',
    'prod_enterprise_annual',
    'price_enterprise_annual'
  );

-- Note: stripe_product_id and stripe_price_id should be updated after creating products in Stripe dashboard
-- This is a placeholder for reference. In production, use Stripe API or manual sync.
