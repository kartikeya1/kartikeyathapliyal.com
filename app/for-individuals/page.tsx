import type { Metadata } from "next";

export const metadata: Metadata = { title: "For individuals" };

export default function ForIndividualsPage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-3xl font-medium tracking-tight">For individuals</h1>
      <p className="mt-4 text-muted">Built in Phase 1, priced before launch.</p>
    </div>
  );
}
