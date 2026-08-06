import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPage } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Now",
  description: "What Kartikeya Thapliyal is focused on right now.",
};

export default function NowPage() {
  const page = getPage("now");
  const lastUpdated =
    typeof page.data.lastUpdated === "string" ? page.data.lastUpdated : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <Link
          href="/thinking"
          className="text-sm text-faint transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Thinking
        </Link>
        <h1 className="mt-10 text-4xl font-medium tracking-tighter text-foreground sm:text-6xl">
          {page.title}
        </h1>
        {lastUpdated ? (
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-faint">
            Last updated · {lastUpdated}
          </p>
        ) : null}
      </Reveal>

      <Reveal className="prose prose-invert mt-12 max-w-none prose-p:leading-relaxed">
        <MDXRemote source={page.body} components={mdxComponents} />
      </Reveal>
    </div>
  );
}
