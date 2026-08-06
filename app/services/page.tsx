import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-3xl font-medium tracking-tight">Services</h1>
      <p className="mt-4 text-muted">Built in Phase 1.</p>
    </div>
  );
}
