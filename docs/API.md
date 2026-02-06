# Synergy Client Portal - API Specification

Complete API reference for developers and integrations.

---

## Authentication Endpoints

### Register (Create Account)

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "companyName": "Acme Corp",
  "email": "admin@acme.com",
  "password": "SecurePassword123!",
  "passwordConfirm": "SecurePassword123!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "company": {
      "id": "uuid",
      "name": "Acme Corp",
      "email": "admin@acme.com"
    },
    "sessionId": "session-token"
  }
}
```

**Error Responses:**
- 400: Validation error (invalid email, weak password, etc.)
- 409: Email already registered

---

### Login

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "admin@acme.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "company": {
      "id": "uuid",
      "name": "Acme Corp",
      "email": "admin@acme.com"
    },
    "sessionId": "session-token"
  }
}
```

**Sets Cookie:** `session_token` (httpOnly, Secure, SameSite=Strict)

**Error Responses:**
- 401: Invalid email or password
- 400: Validation error

---

### Logout

**POST** `/api/auth/logout`

**Headers:** Session cookie auto-detected

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": {}
}
```

**Clears Cookie:** `session_token`

---

### Forgot Password

**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "admin@acme.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If this email is registered, you will receive a password reset link",
  "data": {}
}
```

**Note:** Returns same message regardless of email existence (security)

---

### Reset Password

**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewSecurePassword123!",
  "passwordConfirm": "NewSecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful. Please log in with your new password.",
  "data": {}
}
```

**Error Responses:**
- 401: Invalid or expired token
- 400: Validation error (weak password, mismatch)

---

## Company Endpoints

### Get Company Details

**GET** `/api/companies`

**Headers:** `Authorization: Bearer session_token` (cookie-based, auto)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Acme Corp",
    "email": "admin@acme.com",
    "status": "active",
    "billing_email": "billing@acme.com",
    "billing_address": "123 Main St, City, State 12345",
    "trial_ends_at": "2024-12-20T00:00:00Z",
    "activeServices": 2
  }
}
```

**Error Responses:**
- 401: Not authenticated
- 404: Company not found

---

### Update Company

**PATCH** `/api/companies`

**Request Body:**
```json
{
  "name": "Acme Corp Inc",
  "billingEmail": "newemail@acme.com",
  "billingAddress": "456 Oak Ave, City, State 67890"
}
```

(All fields optional)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Company updated",
  "data": {
    "id": "uuid",
    "name": "Acme Corp Inc",
    "email": "admin@acme.com",
    "status": "active"
  }
}
```

---

## Services Endpoints

### List Available Services

**GET** `/api/services`

**Query Parameters:** (none)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "name": "Starter",
      "description": "Perfect for small teams",
      "basePrice": 29.99,
      "billing_cycle": "monthly",
      "features": ["Up to 5 users", "5 GB storage", "Basic analytics"],
      "tier": "starter",
      "status": "active"
    },
    {
      "id": "uuid",
      "name": "Professional",
      "description": "For growing companies",
      "basePrice": 99.99,
      "billing_cycle": "monthly",
      "features": ["Up to 50 users", "100 GB storage", "Advanced analytics"],
      "tier": "professional",
      "status": "active"
    }
  ]
}
```

---

## Subscriptions Endpoints

### List Company Subscriptions

**GET** `/api/subscriptions`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "company_id": "uuid",
      "service_id": "uuid",
      "name": "Starter",
      "status": "active",
      "base_price_cents": 2999,
      "billing_cycle": "monthly",
      "stripe_subscription_id": "sub_123456",
      "current_period_start": "2024-01-01T00:00:00Z",
      "current_period_end": "2024-02-01T00:00:00Z",
      "cancel_at_period_end": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### Create Subscription

**POST** `/api/subscriptions`

**Request Body:**
```json
{
  "serviceId": "uuid"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Subscription created",
  "data": {
    "id": "sub_stripe_id",
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00Z",
    "currentPeriodEnd": "2024-02-01T00:00:00Z"
  }
}
```

**Error Responses:**
- 404: Service not found
- 409: Already subscribed to this service

---

### Get Subscription Details

**GET** `/api/subscriptions/:id`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Starter",
    "status": "active",
    "base_price_cents": 2999,
    "features": ["Up to 5 users", "5 GB storage"],
    "current_period_end": "2024-02-01T00:00:00Z"
  }
}
```

---

### Cancel Subscription

**DELETE** `/api/subscriptions/:id`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Subscription will be canceled at the end of the billing period",
  "data": {
    "status": "cancel_scheduled"
  }
}
```

**Note:** Subscription cancels at period end, not immediately (user-friendly)

---

## Payments Endpoints

### Create Payment Intent

**POST** `/api/payments/create-intent`

**Request Body:**
```json
{
  "subscriptionId": "uuid",
  "amount": 9999
}
```

(Amount in cents; e.g., $99.99 = 9999)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Payment intent created",
  "data": {
    "clientSecret": "pi_1234567890_secret_abcdefghijklmnop",
    "intentId": "pi_1234567890"
  }
}
```

**Frontend Usage:**
```javascript
const { clientSecret } = response.data;
const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement }
});
```

---

## Invoices Endpoints

### List Company Invoices

**GET** `/api/invoices`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "invoice_number": "INV-000001",
      "amount": 99.99,
      "currency": "USD",
      "status": "paid",
      "due_date": "2024-02-01T00:00:00Z",
      "paid_at": "2024-01-20T12:34:56Z",
      "pdf_url": "https://invoices.stripe.com/...",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## Support Endpoints

### List Support Tickets

**GET** `/api/support/tickets`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "subject": "Can't log in",
      "description": "I forgot my password",
      "priority": "high",
      "status": "open",
      "created_at": "2024-01-20T10:00:00Z",
      "updated_at": "2024-01-20T10:00:00Z"
    }
  ]
}
```

---

### Create Support Ticket

**POST** `/api/support/tickets`

**Request Body:**
```json
{
  "subject": "Feature request: CSV export",
  "description": "We need the ability to export data as CSV",
  "priority": "medium"
}
```

(Priority optional: low/medium/high/urgent; defaults to medium)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Support ticket created",
  "data": {
    "id": "uuid",
    "subject": "Feature request: CSV export",
    "priority": "medium",
    "status": "open",
    "created_at": "2024-01-20T10:00:00Z"
  }
}
```

---

## Webhook Endpoints

### Stripe Webhook

**POST** `/api/webhooks/stripe`

**Headers:**
- `stripe-signature`: Stripe-generated signature

**Handled Events:**
- `charge.succeeded` – Payment successful
- `charge.failed` – Payment failed
- `customer.subscription.created` – New subscription
- `customer.subscription.updated` – Subscription updated
- `customer.subscription.deleted` – Subscription canceled
- `invoice.created` – Invoice generated
- `invoice.paid` – Invoice paid

**Response (200):**
```json
{
  "received": true
}
```

**Note:** This endpoint is public but validated with Stripe signature. No authentication needed.

---

## Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {
      "field_name": "Field-specific error message"
    }
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400) – Input validation failed
- `AUTHENTICATION_ERROR` (401) – Session invalid or expired
- `AUTHORIZATION_ERROR` (403) – Access denied
- `NOT_FOUND` (404) – Resource not found
- `CONFLICT` (409) – Resource already exists
- `RATE_LIMIT` (429) – Too many requests
- `INTERNAL_ERROR` (500) – Server error

---

## Rate Limiting

Default limits:
- **General endpoints:** 100 requests per 15 minutes per IP
- **Auth endpoints:** 5 requests per 15 minutes per IP
- **Webhook endpoints:** Unlimited (Stripe will retry)

Response headers:
- `RateLimit-Limit`: Total allowed requests
- `RateLimit-Remaining`: Requests remaining
- `RateLimit-Reset`: Unix timestamp when limit resets

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK – Success |
| 201 | Created – Resource created |
| 400 | Bad Request – Validation error |
| 401 | Unauthorized – Auth required |
| 403 | Forbidden – Access denied |
| 404 | Not Found – Resource doesn't exist |
| 409 | Conflict – Duplicate resource |
| 429 | Too Many Requests – Rate limited |
| 500 | Internal Server Error |

---

## Testing

### Register Test Account

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Corp",
    "email": "test@example.com",
    "password": "TestPassword123!",
    "passwordConfirm": "TestPassword123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

### Get Company (with session cookie)

```bash
curl http://localhost:3000/api/companies \
  -b cookies.txt
```

---

## Client Integration Example (React)

```typescript
// Auth hook
async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error.message);
  }
  
  return await res.json();
}

// Get subscriptions (auto-includes session cookie)
async function getSubscriptions() {
  const res = await fetch('/api/subscriptions');
  return await res.json();
}
```

---

**For more details, see ARCHITECTURE.md**
