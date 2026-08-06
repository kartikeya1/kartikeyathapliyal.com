import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-3xl font-medium tracking-tight">About</h1>
      <p className="mt-4 text-muted">Written in Phase 2.</p>
    </div>
  );
}
