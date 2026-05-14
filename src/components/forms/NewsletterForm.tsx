"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setSent(true);
      }}
    >
      <h4 className="font-medium">Newsletter</h4>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Subscribe</Button>
      {sent ? <p className="text-sm text-zinc-600">Subscribed successfully.</p> : null}
    </form>
  );
}
