import Link from "next/link";

export default function NotFound() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1>Not found</h1>
      <p className="mt-4 text-muted">That page doesn&rsquo;t exist.</p>
      <Link href="/" className="mt-8 inline-block underline">
        Back home
      </Link>
    </div>
  );
}
