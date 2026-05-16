import Link from "next/link";

import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">Nutrafy</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Wellness supplements backed by quality and trusted formulations for Pakistan.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <h4 className="font-semibold text-zinc-900">Quick Links</h4>
          <Link href="/products">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="grid gap-2 text-sm">
          <h4 className="font-semibold text-zinc-900">Policies</h4>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/shipping">Shipping Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="space-y-4">
          <div className="text-sm">
            <h4 className="font-semibold text-zinc-900">Need Help?</h4>
            <p className="mt-2 text-zinc-600">support@nutrafy.pk</p>
            <p className="text-zinc-600">+92-300-0000000</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
}
