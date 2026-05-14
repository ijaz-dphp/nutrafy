import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nutrafy",
  description: "Learn Nutrafy's mission, values, and wellness commitment.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 rounded-xl border bg-white p-6">
      <h1 className="text-3xl font-semibold">About Nutrafy</h1>
      <p className="text-sm text-zinc-700">
        Nutrafy is dedicated to making science-backed wellness supplements accessible in Pakistan.
      </p>
      <section>
        <h2 className="text-xl font-semibold">Mission & Vision</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Build trust through quality products, transparent ingredients, and customer-first support.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Quality Standards</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Every product is sourced and verified under strict quality protocols.
        </p>
      </section>
    </div>
  );
}
