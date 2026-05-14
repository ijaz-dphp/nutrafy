# API Integration

Base URL: `NEXT_PUBLIC_WORDPRESS_API_URL` (should include `/wp-json`).

## WooCommerce Products
- `GET /wc/v3/products`
- `GET /wc/v3/products?slug={slug}`
- `GET /wc/v3/products/categories`

## Cart & Checkout
- `GET /wc/store/cart`
- `POST /wc/store/cart/add-item`
- `POST /wc/store/checkout`

## Blog
- `GET /wp/v2/posts`
- `GET /wp/v2/posts?slug={slug}`

## Reviews
- `GET /wc/v3/products/reviews`
- `POST /wc/v3/products/reviews`

## Contact Form 7
- `POST /contact-form-7/v1/contact-forms/{id}/feedback`

API helpers are implemented in:
- `src/lib/wordpress.ts`
- `src/lib/woocommerce.ts`
