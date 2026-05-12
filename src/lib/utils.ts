import sanitizeHtml from "sanitize-html";

export const currency = (amount: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);

export const stripHtml = (value?: string) =>
  sanitizeHtml(value ?? "", { allowedTags: [], allowedAttributes: {} }).trim();
