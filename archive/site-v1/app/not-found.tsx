import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-6 pb-28 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        404
      </p>
      <h1 className="mt-5 text-4xl font-medium tracking-tighter text-foreground sm:text-5xl">
        This page doesn't exist.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
        Possibly a broken link, possibly a project that hasn't been written up
        yet.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "default" })} mt-10`}>
        Back home
      </Link>
    </div>
  );
}
