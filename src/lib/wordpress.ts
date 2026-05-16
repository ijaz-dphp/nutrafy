import axios from "axios";

import {
  BlogPost,
  CheckoutPayload,
  ContactFormPayload,
  Product,
  ProductCategory,
  ProductReview,
} from "@/types";

const baseURL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!baseURL) {
  console.warn(
    "Missing NEXT_PUBLIC_WORDPRESS_API_URL environment variable. API calls will fail. Please set this in your .env.local file.",
  );
}

const api = axios.create({
  baseURL,
  auth:
    process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET
      ? {
          username: process.env.WC_CONSUMER_KEY,
          password: process.env.WC_CONSUMER_SECRET,
        }
      : undefined,
});

export const getProducts = async (params?: Record<string, unknown>) => {
  const { data } = await api.get<Product[]>("/wc/v3/products", { params });
  return data;
};

export const getProductsPaginated = async (
  params?: Record<string, unknown>,
): Promise<{ data: Product[]; totalPages: number }> => {
  const response = await api.get<Product[]>("/wc/v3/products", { params });
  return {
    data: response.data,
    totalPages: Number(response.headers["x-wp-totalpages"] || 1),
  };
};

export const getProduct = async (slug: string) => {
  const { data } = await api.get<Product[]>("/wc/v3/products", { params: { slug } });
  return data[0] ?? null;
};

export const getProductCategories = async () => {
  const { data } = await api.get<ProductCategory[]>("/wc/v3/products/categories");
  return data;
};

export const getReviews = async (productId?: number) => {
  const { data } = await api.get<ProductReview[]>("/wc/v3/products/reviews", {
    params: productId ? { product: productId } : undefined,
  });
  return data;
};

export const submitReview = async (payload: Record<string, unknown>) => {
  const { data } = await api.post<ProductReview>("/wc/v3/products/reviews", payload);
  return data;
};

export const getPosts = async (params?: Record<string, unknown>) => {
  const { data } = await api.get<BlogPost[]>("/wp/v2/posts", {
    params: { _embed: true, ...params },
  });
  return data;
};

export const getPost = async (slug: string) => {
  const { data } = await api.get<BlogPost[]>("/wp/v2/posts", {
    params: { slug, _embed: true },
  });
  return data[0] ?? null;
};

export const submitContactForm = async (
  formId: string,
  payload: ContactFormPayload,
) => {
  const { data } = await api.post(
    `/contact-form-7/v1/contact-forms/${formId}/feedback`,
    payload,
  );
  return data;
};

export const submitCheckout = async (payload: CheckoutPayload) => {
  const { data } = await api.post("/wc/store/checkout", payload);
  return data;
};
