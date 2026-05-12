import Link from "next/link";

import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Nutrafy</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Wellness supplements powered by trusted science.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/shipping">Shipping Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <NewsletterForm />
      </div>
    </footer>
  );
}
