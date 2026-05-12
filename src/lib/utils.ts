export const currency = (amount: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);

export const stripHtml = (value?: string) =>
  value?.replace(/<[^>]*>/g, "").trim() ?? "";
