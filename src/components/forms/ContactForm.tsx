"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitContactForm } from "@/lib/wordpress";
import { ContactFormPayload } from "@/types";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit, reset } = useForm<ContactFormPayload>();

  return (
    <form
      className="space-y-3 rounded-lg border bg-white p-4"
      onSubmit={handleSubmit(async (values) => {
        try {
          const formId = process.env.NEXT_PUBLIC_CONTACT_FORM_ID || "123";
          await submitContactForm(formId, values);
          setStatus("Message sent.");
          reset();
        } catch {
          setStatus("Unable to submit right now.");
        }
      })}
    >
      <Input placeholder="Name" {...register("name", { required: true })} />
      <Input type="email" placeholder="Email" {...register("email", { required: true })} />
      <Input placeholder="Phone" {...register("phone")} />
      <Input placeholder="Subject" {...register("subject", { required: true })} />
      <textarea
        className="min-h-32 w-full rounded-md border border-zinc-300 p-3 text-sm"
        placeholder="Message"
        {...register("message", { required: true })}
      />
      <Button type="submit">Submit</Button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </form>
  );
}
