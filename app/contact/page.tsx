import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-3xl font-medium tracking-tight">Contact</h1>
      <p className="mt-4 text-muted">
        <a href={`mailto:${siteConfig.contact.email}`} className="underline">
          {siteConfig.contact.email}
        </a>
      </p>
    </div>
  );
}
