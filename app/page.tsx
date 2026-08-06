import { PrimaryCta } from "@/components/content/PrimaryCta";
import { Claim } from "@/components/content/Claim";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-4xl font-medium tracking-tight">{siteConfig.name}</h1>
      <p className="mt-4 text-lg text-muted">{siteConfig.positioning}</p>
      <PrimaryCta href="/services" className="mt-10">
        See how I work
      </PrimaryCta>
      <p className="mt-10 text-sm text-muted">
        <Claim id="users-reached" /> · <Claim id="broker-count" /> ·{" "}
        <Claim id="uptime" />
      </p>
    </div>
  );
}
