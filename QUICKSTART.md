# Quick Start Guide - Synergy Client Portal

**Get up and running in 5 minutes.**

---

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Create Database

Create a PostgreSQL database:

```bash
createdb synergy_dev
# Or use your cloud provider (Vercel Postgres, Heroku, Railway, etc.)
```

---

## 3️⃣ Configure Environment

Copy the template and fill in your details:

```bash
cp .env.example .env.local
```

**Minimum required in `.env.local`:**

```env
# Database (adjust for your setup)
DATABASE_URL=postgresql://postgres:password@localhost:5432/synergy_dev

# Auth (generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here
JWT_SECRET=your-jwt-secret-here
SESSION_ENCRYPTION_KEY=your-session-key-here

# Stripe (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_KEY=pk_test_YOUR_PUBLIC_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK_SECRET

NODE_ENV=development
```

---

## 4️⃣ Run Database Migrations

```bash
npm run db:migrate
```

This creates all tables, indexes, and seeds services.

---

## 5️⃣ Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🎉 You're Done!

### Test it:

1. **Sign Up:** http://localhost:3000/signup
   - Company: "Test Corp"
   - Email: `test@example.com`
   - Password: `TestPassword123!`

2. **Login:** http://localhost:3000/login
   - Use the credentials above

3. **Dashboard:** http://localhost:3000/dashboard
   - View account overview
   - Check services and billing

---

## 📚 Next Steps

- **Read:** `ARCHITECTURE.md` – System design
- **Read:** `README.md` – Full setup guide
- **Check:** `docs/API.md` – API reference
- **View:** `BUILD_SUMMARY.md` – What's included

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Run production build

# Database
npm run db:migrate      # Run migrations
npm run db:reset        # Reset database (⚠️ deletes data)

# Code Quality
npm run type-check      # TypeScript check
npm run lint            # ESLint check
npm run format          # Prettier format

# Testing
npm test                # Run tests
npm run test:watch      # Watch mode
```

---

## 🚨 Troubleshooting

### Database Connection Error
```
psql: error: FATAL: Ident authentication failed for user "postgres"
```

**Fix:** Update `DATABASE_URL` in `.env.local` with correct credentials

### Stripe Key Error
```
Error: Stripe API key required
```

**Fix:** Get keys from https://dashboard.stripe.com/apikeys and add to `.env.local`

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```

**Fix:** Use different port with `npm run dev -- -p 3001`

---

## 📖 File Structure (Key Files)

```
├── ARCHITECTURE.md       👈 System design
├── README.md            👈 Full documentation
├── BUILD_SUMMARY.md     👈 What's built
├── QUICKSTART.md        👈 You are here
│
├── src/
│   ├── app/page.tsx     (Home page)
│   ├── app/login/       (Login page)
│   ├── app/signup/      (Sign up page)
│   ├── app/dashboard/   (Protected routes)
│   ├── app/api/         (Backend endpoints)
│   ├── lib/             (Core utilities)
│   └── middleware.ts    (Auth middleware)
│
├── migrations/          (Database)
├── docs/API.md         (API reference)
└── package.json        (Dependencies)
```

---

## 🔌 Stripe Setup (First Time)

1. Create Stripe account: https://stripe.com
2. Go to Dashboard → Products
3. Create 3 products:
   - **Starter** – $29.99/month
   - **Professional** – $99.99/month
   - **Enterprise** – $299.99/month
4. Copy Product IDs and Price IDs
5. Update `migrations/002_seed_services.sql` with real IDs
6. Re-run: `npm run db:reset`

---

## 🌐 Deployment (Next Steps)

### Vercel (Easiest)
```bash
npm i -g vercel
vercel
# Follow prompts to connect GitHub repo
```

### Docker
```bash
docker build -t synergy .
docker run -p 3000:3000 --env-file .env.production synergy
```

### Manual Server
```bash
npm run build
npm start
```

---

## 📧 Email Setup (Optional)

To enable password reset emails:

1. Sign up for SendGrid: https://sendgrid.com
2. Get API key
3. Add to `.env.local`:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   ```

4. Implement email sending in `src/lib/email.ts`

---

## ✨ Features Ready to Use

- ✅ User authentication (signup/login)
- ✅ Service subscriptions
- ✅ Stripe payments
- ✅ Invoice tracking
- ✅ Support tickets
- ✅ Account management
- ✅ Responsive dashboard
- ✅ Admin-friendly API

---

## 🤝 Need Help?

- Check `README.md` for detailed docs
- See `docs/API.md` for API reference
- Review `ARCHITECTURE.md` for system design
- Check browser console for errors
- Look at `npm run dev` output for logs

---

**Ready to build? Happy coding! 🚀**
