import { Metadata } from "next";

import { CheckoutForm } from "@/components/forms/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Nutrafy",
  description: "Complete your WooCommerce order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
