# Synergy Client Portal - Architecture Document

## Overview

The Synergy Client Portal is a production-ready SaaS platform for managing company accounts, services, subscriptions, and billing. It features a public landing site and a secure authenticated dashboard for account management.

**Tech Stack:** Next.js 14 + TypeScript + React 18 + PostgreSQL + Stripe + NextAuth.js

---

## 1. Site Architecture

### Public Routes
- `/` – Landing page (hero, features, CTA)
- `/services` – Service offerings and pricing tiers
- `/how-it-works` – Demo and feature walkthrough
- `/login` – Sign in page
- `/signup` – Company registration (email, password, company name)
- `/forgot-password` – Password reset flow
- `/pricing` – Pricing page with comparison table

### Authenticated Routes (Protected by session)
- `/dashboard` – Account overview (company name, active services, status)
- `/dashboard/billing` – Invoice history, payment method management
- `/dashboard/services` – Service subscriptions, upgrade/downgrade/cancel
- `/dashboard/settings` – Account settings, security, integrations
- `/dashboard/support` – Support contact, ticket history
- `/api/*` – Backend API endpoints (JWT + session validated)

### Route Structure
```
/                          (public)
├── /services              (public)
├── /how-it-works          (public)
├── /pricing               (public)
├── /login                 (public)
├── /signup                (public)
├── /forgot-password       (public)
└── /dashboard/*           (protected - requires session)
    ├── /                  (overview)
    ├── /billing           (payment & invoices)
    ├── /services          (subscriptions management)
    ├── /settings          (account settings)
    └── /support           (help & tickets)
```

### API Endpoints (Backend)
```
/api/auth
├── POST /register         (email, password, company_name)
├── POST /login            (email, password)
├── POST /logout           (session invalidation)
├── POST /refresh          (refresh session token)
└── POST /reset-password   (email → send reset token)

/api/companies
├── GET  /:id              (company details - requires session)
├── PATCH /:id             (update company name, contact)
└── DELETE /:id            (soft delete - mark as canceled)

/api/subscriptions
├── GET  /                 (list company's subscriptions)
├── POST /                 (create subscription - Stripe webhook)
├── GET  /:id              (subscription details)
├── PATCH /:id             (upgrade/downgrade service)
└── DELETE /:id            (cancel subscription)

/api/services
├── GET  /                 (list all available services)
└── GET  /:id              (service details + pricing)

/api/payments
├── POST /create-intent    (create Stripe PaymentIntent)
├── POST /webhook          (Stripe webhook handler)
├── GET  /invoices         (list company invoices)
└── GET  /invoices/:id     (invoice details)

/api/support
├── POST /tickets          (create support ticket)
├── GET  /tickets          (list company tickets)
└── GET  /tickets/:id      (ticket details)
```

---

## 2. Data Models

### Companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('trial', 'active', 'paused', 'canceled') DEFAULT 'trial',
  billing_email VARCHAR(255),
  billing_address TEXT,
  stripe_customer_id VARCHAR(255) UNIQUE,
  trial_ends_at TIMESTAMP,
  trial_extended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: email (unique), stripe_customer_id (unique), status
```

### Services
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  base_price_cents INTEGER NOT NULL, -- $X.XX stored as cents
  billing_cycle ENUM('monthly', 'annual') NOT NULL,
  features JSONB NOT NULL DEFAULT '[]', -- List of included features
  tier ENUM('starter', 'professional', 'enterprise') NOT NULL,
  status ENUM('active', 'archived') DEFAULT 'active',
  stripe_product_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: name (unique), stripe_product_id, stripe_price_id, status
```

### Subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id),
  status ENUM('trial', 'active', 'paused', 'canceled') DEFAULT 'active',
  stripe_subscription_id VARCHAR(255) UNIQUE,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_company_service UNIQUE(company_id, service_id)
);

Indexes: company_id, service_id, stripe_subscription_id, status
```

### Payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  stripe_charge_id VARCHAR(255),
  status ENUM('pending', 'succeeded', 'failed', 'canceled') DEFAULT 'pending',
  payment_method ENUM('card', 'bank_transfer') DEFAULT 'card',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: company_id, subscription_id, stripe_payment_intent_id, status
```

### Invoices
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status ENUM('draft', 'open', 'paid', 'void', 'uncollectible') DEFAULT 'draft',
  stripe_invoice_id VARCHAR(255) UNIQUE,
  due_date TIMESTAMP,
  paid_at TIMESTAMP,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: company_id, invoice_number (unique), status, stripe_invoice_id
```

### Support Tickets
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: company_id, status, priority
```

### Sessions
```sql
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  token VARCHAR(512) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Indexes: company_id, token, expires_at
```

---

## 3. Authentication Flow

### Sign Up
1. User fills form: email, password, company name
2. Backend validates input (email format, password strength)
3. Hash password with bcrypt (min 12 rounds)
4. Create company record + Stripe customer
5. Send verification email (optional: email confirmation required)
6. Redirect to login or auto-login with session
7. Create trial subscription (14 days)

### Login
1. User submits email + password
2. Find company by email
3. Verify password hash
4. Create session record (JWT-like token stored in DB)
5. Set httpOnly session cookie
6. Redirect to /dashboard

### Password Reset
1. User clicks "Forgot Password"
2. Enter email → send reset link (expires 1 hour)
3. Token stored in `reset_tokens` table
4. User clicks link, enters new password
5. Verify token, update password hash, invalidate all sessions
6. Redirect to login

### Session Management
- Sessions stored in PostgreSQL (not just JWT)
- httpOnly cookie + SameSite=Strict
- Automatic refresh on API calls (extend expiry)
- Logout invalidates all sessions or just current
- CSRF protection via next-csrf or built-in Next.js pattern

---

## 4. Payment & Billing Flow

### Stripe Integration
- **Customer Creation:** Auto-create Stripe customer on company registration
- **Products/Prices:** Pre-configured in Stripe dashboard; sync via migrations
- **One-time Payments:** For trial → pro upgrades
- **Recurring:** Subscriptions with monthly/annual billing
- **Webhooks:** Sync subscription state, payment status, invoice generation

### Payment Intent Flow
1. User clicks "Upgrade" → GET /api/payments/create-intent
2. Backend creates Stripe PaymentIntent (client secret)
3. Frontend renders Stripe Elements form (never handle raw card data)
4. User submits payment → Stripe processes
5. Webhook confirms → Update subscription status
6. Dashboard updates in real-time or on refresh

### State Transitions
```
trial (14 days)
  ↓
  ├─→ active (payment succeeds)
  └─→ canceled (user cancels trial)

active
  ├─→ paused (user pause subscription)
  ├─→ canceled (user cancels at period end)
  └─→ canceled (payment fails 3x, Stripe dunning)

paused
  └─→ active (user resumes)

canceled (terminal state)
```

### Invoice Generation
- Auto-generated on subscription start, renewal
- Stored in DB + linked to Stripe invoice
- PDF downloadable from dashboard
- Email sent on generation (optional)

---

## 5. Client Dashboard Layout

### Components
```
/dashboard
├── Sidebar (navigation, logout)
├── Header (company name, account menu, notifications)
└── Main Content
    ├── Overview
    │   ├── Company info card
    │   ├── Active services (list + status)
    │   ├── Trial status / days remaining
    │   └── Next billing date
    │
    ├── /billing
    │   ├── Current billing info
    │   ├── Payment method (manage)
    │   ├── Invoice history (sortable, downloadable)
    │   └── Billing address form
    │
    ├── /services
    │   ├── Active subscriptions
    │   ├── Service cards (name, price, features)
    │   ├── Upgrade/downgrade buttons
    │   ├── Cancel subscription (with warning)
    │   └── Available services to add
    │
    ├── /settings
    │   ├── Company name + email
    │   ├── Password change
    │   ├── 2FA setup (optional)
    │   └── Session management (list active sessions)
    │
    └── /support
        ├── Contact form (email, subject, message)
        ├── Support ticket history
        ├── Ticket status (open, in-progress, resolved)
        └── FAQ / Knowledge base link
```

---

## 6. Security Checklist

- ✅ **No card data stored locally** – All via Stripe
- ✅ **Password hashing** – bcrypt with 12+ rounds
- ✅ **HTTPS only** – Enforced redirect, HSTS headers
- ✅ **CSRF protection** – Token-based or SameSite cookies
- ✅ **Rate limiting** – 100 req/min per IP (auth endpoints: 5 req/min)
- ✅ **SQL injection prevention** – Parameterized queries (pg library)
- ✅ **XSS prevention** – React escaping, CSP headers
- ✅ **Session hijacking** – httpOnly, SameSite=Strict, secure flag
- ✅ **Secret management** – Stripe key, DB URL in env vars
- ✅ **Error handling** – No stack traces in responses, generic error messages
- ✅ **Input validation** – Email format, password strength, length limits
- ✅ **Audit logging** – Log auth attempts, payment changes, sensitive updates

---

## 7. Deployment Architecture

### Environment Setup
```
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://user:pass@host/synergy
JWT_SECRET=<random-32-char-string>
SESSION_ENCRYPTION_KEY=<random-32-char-string>
NEXTAUTH_URL=https://portal.synergy.com
NEXTAUTH_SECRET=<random-32-char-string>
NODE_ENV=production
LOG_LEVEL=info
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=noreply@synergy.com
SMTP_PASS=<password>
```

### Database
- **PostgreSQL 14+** on managed service (AWS RDS, Heroku, Railway)
- **Migrations:** Flyway or custom Node script in `/migrations`
- **Backups:** Daily automated backups (30-day retention)
- **Replication:** Read replicas for analytics queries

### Hosting
- **Frontend:** Vercel (native Next.js, auto-scaling, edge functions)
- **API:** Same Vercel deployment (serverless functions)
- **Webhooks:** Handled via Vercel Functions with long timeout
- **CDN:** Vercel's global edge network

### Monitoring
- **Error tracking:** Sentry (errors, performance)
- **Logging:** Pino (structured logging, sent to CloudWatch/Datadog)
- **Metrics:** Stripe dashboard, custom analytics
- **Uptime:** Pingdom or similar

---

## 8. Extensibility for Agents

The architecture supports future agent automation:

- **Scheduled tasks:** Background jobs (invoice generation, trial expiry, dunning)
- **Webhooks:** Fully documented for third-party integrations
- **Admin API:** Separate endpoints for internal automation (rate-limited)
- **Event system:** Publish/subscribe pattern for status changes
- **Audit trail:** All changes logged with timestamp + user/system ID
- **API-first design:** All UI operations via REST API (no direct DB manipulation in UI)

---

## Files Structure
```
synergy-client-portal/
├── src/
│   ├── app/              (Next.js 14 app router)
│   │   ├── layout.tsx
│   │   ├── page.tsx      (home)
│   │   ├── services/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── dashboard/layout.tsx (protected)
│   │   │   ├── page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── support/page.tsx
│   │   └── api/
│   │       ├── auth/
│   │       ├── companies/
│   │       ├── subscriptions/
│   │       ├── services/
│   │       ├── payments/
│   │       └── support/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── billing/
│   │   ├── services/
│   │   └── common/
│   ├── lib/
│   │   ├── auth.ts       (session, jwt, bcrypt)
│   │   ├── db.ts         (postgres pool)
│   │   ├── stripe.ts     (Stripe client + helpers)
│   │   ├── email.ts      (nodemailer or SendGrid)
│   │   └── validation.ts (zod schemas)
│   └── middleware.ts     (session validation)
├── migrations/           (SQL migration files)
├── public/               (static assets)
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
├── ARCHITECTURE.md       (this file)
└── README.md
```

---

## Summary

This architecture provides a **secure, scalable, and agent-ready** SaaS platform:

1. **Clear separation** of concerns (auth, payments, subscriptions)
2. **Security-first** approach (no card data, bcrypt, rate limiting)
3. **Event-driven** design (Stripe webhooks, audit trail)
4. **Extensible** for future automation and integrations
5. **Production-ready** with monitoring, logging, and error handling

The codebase is designed for clarity—business logic is separated from infrastructure—making it easy for agents or new engineers to understand and extend.
