# SetterFlo Landing Page

A modern marketing site for SetterFlo built with Next.js 15, the App Router, and Tailwind CSS. The page showcases the product value proposition, highlights features, and provides a webhook-enabled contact form with robust validation and rate limiting.

## Prerequisites

- Node.js 18+
- npm 9+

Install dependencies:

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and update the values:

| Variable | Description |
| --- | --- |
| `WEBHOOK_URL` | Destination endpoint for contact form submissions |
| `WEBHOOK_SECRET` | Optional shared secret sent via `X-Webhook-Secret` header |
| `NEXT_PUBLIC_SITE_URL` | Base URL used for SEO metadata |
| `NEXT_PUBLIC_SITE_NAME` | Site name for metadata |
| `CONTACT_RATE_LIMIT_REQUESTS` | Allowed requests within the time window |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Window (ms) for rate limiting |

## Key Scripts

```bash
npm run dev        # Start local dev server (http://localhost:3000)
npm run lint       # Lint with ESLint
npm test           # Run Jest unit/integration suite
npm run test:e2e   # Execute Playwright tests (requires dev server)
npm run build      # Build for production
npm run start      # Serve the production build
```

To inspect bundle size, run with `ANALYZE=true npm run build` and open the generated report.

## Testing

- Unit and API contract tests live in `__tests__/components` and `__tests__/api`.
- E2E coverage (hero, features, contact flow, responsiveness) is under `__tests__/e2e`.
- Shared testing utilities are available in `__tests__/utils/render.tsx`.

Run everything before shipping:

```bash
npm run lint && npm test && npx playwright test
```

## Deployment

## Production Setup

1. Configure `WEBHOOK_URL` to point at your production receiver.
2. If you sign webhook requests, add `WEBHOOK_SECRET` in the hosting provider.
3. Promote `CONTACT_RATE_LIMIT_*` values appropriate for expected traffic.
4. Enable HTTPS and monitor errors via your preferred APM tool.

The included `vercel.json` configures production caching headers. When deploying to Vercel:

1. Set environment variables from `.env.example` in your Vercel project.
2. Enable the bundle analyzer by setting `ANALYZE=true` on preview builds if you need bundle insights.
3. Configure your webhook receiver to accept JSON `POST` requests from the deployed site.

## Performance & Accessibility

- Hero and feature sections use optimized SVG assets and `next/image` for lazy-loading partner logos.
- Non-critical sections are code-split with dynamic imports for faster first paint.
- Global error and loading states provide graceful fallback experiences.
- The contact form exposes accessible validation messaging and rate-limit feedback.

## Verification Checklist

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npx playwright test`
- [ ] Verify contact form webhook succeeds against staging endpoint
- [ ] Run Lighthouse audit (target ≥90 for Performance/Accessibility/Best Practices/SEO)

