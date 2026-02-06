# Deployment Checklist - Synergy Client Portal

Use this checklist when preparing the portal for production.

---

## 🔒 Security

### Pre-Deployment
- [ ] Change all JWT_SECRET, SESSION_ENCRYPTION_KEY, NEXTAUTH_SECRET (use `openssl rand -base64 32`)
- [ ] Review `.env.local` – no secrets in git history
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use Stripe **live keys** (not test keys)
- [ ] Update `NEXTAUTH_URL` to production domain (e.g., https://portal.synergy.com)
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure Security Headers in `next.config.js` (already done)
- [ ] Add CSP headers if needed
- [ ] Test SQL injection prevention (parameterized queries enabled)
- [ ] Test XSS prevention (React escaping enabled)
- [ ] Test CSRF protection (SameSite cookies enabled)
- [ ] Review rate limiting settings for production load
- [ ] Setup API key rotation plan
- [ ] Enable audit logging in production

### SSL/TLS
- [ ] HTTPS enforced
- [ ] Certificate auto-renewal (Vercel handles automatically)
- [ ] HSTS header configured
- [ ] Test with https://www.ssllabs.com/ssltest/

---

## 💾 Database

### Setup
- [ ] Create production PostgreSQL database
- [ ] Configure automated backups (daily, 30-day retention minimum)
- [ ] Setup read replica if needed (for analytics)
- [ ] Run all migrations: `npm run db:migrate`
- [ ] Verify schema with `psql`:
  ```bash
  psql $DATABASE_URL
  \dt  # list tables
  ```

### Optimization
- [ ] Indexes created (automatic from migrations)
- [ ] Query performance tested
- [ ] Connection pooling configured
- [ ] Max connections set to 20 (in `db.ts`)
- [ ] Database monitoring enabled

### Data
- [ ] Update services table with real Stripe Product/Price IDs
- [ ] Verify trial duration (14 days default)
- [ ] Test subscription state transitions

---

## 💳 Stripe Integration

### Account Setup
- [ ] Stripe production account created
- [ ] Products created (Starter, Professional, Enterprise)
- [ ] Prices configured (monthly + annual billing)
- [ ] Tax settings configured (if applicable)
- [ ] Currency set to USD (or desired currency)

### Keys & Secrets
- [ ] Stripe Public Key → `NEXT_PUBLIC_STRIPE_KEY`
- [ ] Stripe Secret Key → `STRIPE_SECRET_KEY`
- [ ] Webhook Secret → `STRIPE_WEBHOOK_SECRET`
- [ ] All keys stored in environment variables (not git)

### Webhooks
- [ ] Webhook endpoint configured in Stripe Dashboard
  - URL: `https://portal.synergy.com/api/webhooks/stripe`
  - Events: charge.*, customer.subscription.*, invoice.*
- [ ] Webhook signature validation working
- [ ] Test webhook delivery: `stripe trigger charge.succeeded`
- [ ] Monitor webhook failures in Stripe Dashboard

### Testing
- [ ] Test payment flow end-to-end
- [ ] Test subscription creation
- [ ] Test invoice generation
- [ ] Test subscription cancellation
- [ ] Test webhook delivery

---

## 📧 Email

### Configuration
- [ ] Email service chosen (SendGrid, AWS SES, Mailgun, etc.)
- [ ] SMTP credentials in `.env`
- [ ] Email templates created (password reset, welcome, invoice)
- [ ] FROM email configured (`SMTP_FROM`)

### Testing
- [ ] Test password reset email delivery
- [ ] Test welcome email on signup
- [ ] Test invoice email
- [ ] Verify email sender is recognized
- [ ] Test SPF/DKIM/DMARC records

---

## 🌐 Deployment

### Vercel (Recommended)
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Vercel dashboard
- [ ] Setup auto-deployment on main branch push
- [ ] Configure custom domain
- [ ] Enable automatic HTTPS
- [ ] Setup monitoring/alerts

### Alternative Hosting
- [ ] Docker image built and tested
- [ ] Container registry setup (Docker Hub, ECR, etc.)
- [ ] Kubernetes manifests created (if using K8s)
- [ ] Load balancer configured
- [ ] Auto-scaling rules defined
- [ ] Database connection pooling enabled

### Domain & DNS
- [ ] Domain purchased (or transferred)
- [ ] DNS records configured (A/AAAA/CNAME)
- [ ] SSL certificate valid (Vercel auto-renews)
- [ ] CDN configured (Vercel Edge Network)
- [ ] Test domain resolution globally

---

## 📊 Monitoring & Logging

### Errors & Performance
- [ ] Sentry account created (or alternative)
- [ ] Sentry DSN in environment
- [ ] Error tracking enabled
- [ ] Performance monitoring enabled
- [ ] Custom breadcrumbs added to key actions

### Logging
- [ ] Log aggregation service configured (Datadog, CloudWatch, etc.)
- [ ] Log level set to `info` for production
- [ ] Structured logs enabled (Pino)
- [ ] Log retention policy set
- [ ] Alerts configured for errors

### Metrics
- [ ] Stripe metrics dashboard reviewed
- [ ] Database performance monitored
- [ ] API response times tracked
- [ ] User activity dashboards created

---

## 🔑 Access & Secrets Management

### Environment Variables
- [ ] All secrets in `.env` (never in git)
- [ ] Use environment variable manager:
  - [ ] Vercel Environment Variables
  - [ ] AWS Secrets Manager
  - [ ] Hashicorp Vault
  - [ ] Or similar
- [ ] Rotate secrets every 90 days
- [ ] Document all required variables

### API Keys
- [ ] Stripe keys rotated
- [ ] JWT secrets rotated
- [ ] Database password rotated
- [ ] Email API keys rotated

---

## 👥 Team & Access

### Permissions
- [ ] Stripe Dashboard access configured (limited scope)
- [ ] Database access restricted (SSH key or VPN)
- [ ] Deployment access limited (GitHub branch protection)
- [ ] Log access restricted (Sentry/Datadog)

### Backups
- [ ] Database backups automated
- [ ] Backup encryption enabled
- [ ] Backup restoration tested
- [ ] Backup retention policy documented (30+ days)

---

## 📱 Testing

### Functional Testing
- [ ] User signup flow works
- [ ] User login flow works
- [ ] Password reset flow works
- [ ] Service subscription works
- [ ] Payment processing works
- [ ] Invoice generation works
- [ ] Subscription cancellation works
- [ ] Support ticket creation works

### Security Testing
- [ ] SQL injection attempts blocked
- [ ] XSS attempts blocked
- [ ] CSRF protection works
- [ ] Unauthorized access denied
- [ ] Rate limiting works
- [ ] Session timeout works

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Concurrent users tested (100+)
- [ ] Database query performance tested
- [ ] Static assets cached/compressed

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## 📋 Documentation

### For Users
- [ ] User guide created
- [ ] FAQ page populated
- [ ] Help center setup
- [ ] Email templates reviewed

### For Developers
- [ ] ARCHITECTURE.md reviewed and updated
- [ ] API.md reviewed and updated
- [ ] README.md reviewed and updated
- [ ] Code comments updated
- [ ] Deployment guide created

### For Admins
- [ ] Admin dashboard documented (if applicable)
- [ ] Monitoring setup documented
- [ ] Incident response plan created
- [ ] Rollback procedures documented

---

## 🚀 Launch

### Pre-Launch (48 hours before)
- [ ] Run full regression test
- [ ] Load test with realistic traffic
- [ ] Failover test (can site handle 1 server down?)
- [ ] Data backup verified
- [ ] Rollback procedure tested

### Launch Day
- [ ] Team assembled and on standby
- [ ] Monitoring actively watched
- [ ] Error tracking verified
- [ ] Customer support notified
- [ ] Status page created

### Post-Launch (48 hours after)
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Monitor user feedback
- [ ] Check for anomalies
- [ ] Document any issues

---

## 🔄 Ongoing (After Launch)

### Weekly
- [ ] Review error logs
- [ ] Monitor performance metrics
- [ ] Check backup status
- [ ] Review security alerts

### Monthly
- [ ] Dependency updates (npm)
- [ ] Security patch review
- [ ] Database optimization
- [ ] Cost analysis (Stripe, hosting, etc.)

### Quarterly
- [ ] Security audit
- [ ] Performance review
- [ ] Backup restoration test
- [ ] Disaster recovery drill

---

## 📞 Support Resources

**For Questions:**
- Architecture: See `ARCHITECTURE.md`
- Setup: See `README.md`
- Quick Start: See `QUICKSTART.md`
- API: See `docs/API.md`
- Summary: See `BUILD_SUMMARY.md`

**For Issues:**
- Database: `psql $DATABASE_URL` to query directly
- Logs: Check Vercel/app logs
- Stripe: https://dashboard.stripe.com → Logs & Webhooks
- Monitoring: Check Sentry/Datadog dashboard

---

## ✅ Sign-Off

- [ ] All items completed
- [ ] Team approved for launch
- [ ] Launch plan reviewed
- [ ] Incident response ready

**Deployed Date:** ___________

**Deployed By:** ___________

**Notes:** 

---

**Good luck with your launch! 🚀**
