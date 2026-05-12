export type ApiListResponse<T> = {
  data: T[];
  totalPages?: number;
};

export type ProductImage = {
  id: number;
  src: string;
  alt?: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ProductReview = {
  id: number;
  rating: number;
  review: string;
  reviewer: string;
  date_created?: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  stock_status?: "instock" | "outofstock" | string;
  description?: string;
  short_description?: string;
  categories?: ProductCategory[];
  images?: ProductImage[];
  average_rating?: string;
  related_ids?: number[];
};

export type BlogPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  author?: number;
  featured_media?: number;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
  };
};

export type CartLineItem = {
  id: string;
  productId: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  total: number;
};

export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type CheckoutPayload = {
  billing_address: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  };
  order_notes?: string;
};
