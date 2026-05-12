# Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.example`.
4. Set production domain (e.g. `nutrafy.pk`).
5. Deploy.

## Notes
- WordPress/WooCommerce backend must be reachable from Vercel.
- Add WordPress image host in `next.config.ts` via `NEXT_PUBLIC_WORDPRESS_API_URL`.
