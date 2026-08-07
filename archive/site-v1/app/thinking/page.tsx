import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPage, getWritingPosts } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Thinking",
  description:
    "How Kartikeya Thapliyal approaches products, problems, ambiguity, tradeoffs and the people who build software.",
};

export default function ThinkingPage() {
  const page = getPage("thinking");
  const posts = getWritingPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-4xl font-medium tracking-tighter text-foreground sm:text-6xl">
          {page.title}
        </h1>
        {typeof page.data.intro === "string" ? (
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {page.data.intro}
          </p>
        ) : null}
      </Reveal>

      <Reveal className="prose prose-invert mt-14 max-w-none prose-p:leading-relaxed">
        <MDXRemote source={page.body} components={mdxComponents} />
      </Reveal>

      {/* Now - deliberately not in the main navigation */}
      <Reveal>
        <Link
          href="/now"
          className="group mt-16 flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-faint">
              Now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              What I'm focused on at the moment - updated as it changes.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          >
            →
          </span>
        </Link>
      </Reveal>

      {/* Writing */}
      <Reveal>
        <section aria-labelledby="writing-heading" className="mt-20">
          <h2
            id="writing-heading"
            className="text-2xl font-medium tracking-tight text-foreground"
          >
            Writing
          </h2>

          {posts.length > 0 ? (
            /*
              TODO: future blog posts render here automatically.
              To publish one, add content/writing/<slug>.mdx with
              frontmatter: title, summary, date ("YYYY-MM-DD").
              A dedicated /thinking/<slug> route can be added when the
              first real post lands - see content/README.md.
            */
            <ul className="mt-6 flex flex-col gap-4">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <p className="text-base font-medium text-foreground">
                    {post.title}
                  </p>
                  {post.summary ? (
                    <p className="mt-1 text-sm text-muted">{post.summary}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-xl border border-border bg-card p-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-faint">
                Coming soon
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                Occasional essays on platforms, internal tools and AI-native
                product work. Written slowly, published when they're worth your
                time.
              </p>
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
}
