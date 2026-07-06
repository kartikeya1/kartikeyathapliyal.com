import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-[0.8125rem]">
          Built with Next.js. Hosted on Vercel. Designed thoughtfully.
        </p>
      </div>
    </footer>
  );
}
