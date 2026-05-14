import { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Nutrafy",
  description: "Get in touch with Nutrafy support and wellness team.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-4 text-3xl font-semibold">Contact Us</h1>
        <ContactForm />
      </div>
      <aside className="space-y-3 rounded-lg border bg-white p-4 text-sm">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p>Address: Lahore, Pakistan</p>
        <p>Phone: +92-300-0000000</p>
        <p>Email: support@nutrafy.pk</p>
        <p>Business Hours: Mon - Sat, 10:00 AM - 7:00 PM</p>
      </aside>
    </div>
  );
}
