# Nutrafy Frontend (Next.js + WordPress/WooCommerce)

Fast Next.js frontend for an existing WordPress/WooCommerce backend.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Context (cart)
- React Hook Form

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example`.

## Scripts
- `npm run dev` - start local server
- `npm run lint` - lint app
- `npm run build` - production build
- `npm run start` - start production server

## Implemented Routes
- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/submit-review`
- `/about`
- `/account` (+ login/register/orders/details/addresses)
- `/privacy-policy`, `/terms`, `/shipping`, `/refund-policy`, `/faq`
