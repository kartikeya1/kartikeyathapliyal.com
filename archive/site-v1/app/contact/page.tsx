import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kartikeya Thapliyal.",
};

/**
 * All hrefs below come from lib/site.ts - edit links there, not here.
 */
const channels = [
  {
    label: "Email",
    hint: "Best for anything substantive.",
    href: `mailto:${site.links.email}`,
    display: site.links.email,
  },
  {
    label: "LinkedIn",
    hint: "Work history, in the expected format.",
    href: site.links.linkedin,
    display: "linkedin.com",
  },
  {
    label: "GitHub",
    hint: "Prototypes and experiments.",
    href: site.links.github,
    display: "github.com",
  },
  {
    label: "X",
    hint: "Occasionally.",
    href: site.links.x,
    display: "x.com",
  },
  {
    label: "Instagram",
    hint: "Visual updates and behind-the-scenes.",
    href: site.links.instagram,
    display: "instagram.com",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-4xl font-medium tracking-tighter text-foreground sm:text-6xl">
          Contact
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          No forms, no scheduling maze. If something here resonated, write to
          me - I read everything.
        </p>
      </Reveal>

      <ul className="mt-14 flex flex-col">
        {channels.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.05}>
            <li className="border-t border-border last:border-b">
              <a
                href={channel.href}
                target={channel.label === "Email" ? undefined : "_blank"}
                rel={channel.label === "Email" ? undefined : "noopener noreferrer"}
                className="group flex items-baseline justify-between gap-6 py-6 transition-colors"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-24 text-base font-medium text-foreground">
                    {channel.label}
                  </span>
                  <span className="text-sm text-faint">{channel.hint}</span>
                </div>
                <span
                  aria-hidden="true"
                  className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
