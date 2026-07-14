# Dubber Admin

Production Next.js 16 administration console for the FastAPI Cloud Khmer Video
Dubber licensing service. All backend communication runs through server-side
services and Server Actions. The browser receives only an HTTP-only session
cookie; backend URLs and JWT values are not exposed to client components.

## Local development

1. Start `fastAPI_cloud` on port 8000.
2. Copy `.env.example` to `.env.local`.
3. Set `API_BASE_URL` to the backend's internal/server-reachable URL.
4. Run `npm run dev`.
5. Sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`, then enter the five-minute
   Gmail OTP. Resend becomes available after 60 seconds and timers survive refresh.

## Production deployment

Set only this environment variable on the Next.js host:

```env
API_BASE_URL=https://your-api.fastapicloud.dev
```

On FastAPI Cloud, configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and
the existing database, CutLuy, and SMTP secrets from `fastAPI_cloud/.env.example`.
Use independent random values for `ADMIN_TOKEN` and `JWT_SECRET`, set
`ENVIRONMENT=production`, and deploy both services over HTTPS.

Before redeploying the backend, run
`fastAPI_cloud/migrations/002_admin_otp_discounts.sql` in the Supabase SQL
Editor. The dashboard then supports editable licenses and fixed/percentage
discounts with caps, usage limits, start dates, and expiration dates.

Verify before deployment:

```bash
npm run lint
npm run build
```
