import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { LOGO_NODE, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo";

// No `runtime` export: the image has no per-request data, so it renders once
// at build time as a static file. Setting `runtime = "edge"` here would turn
// this into a serverless function, which this site does not use anywhere.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          {/* Same geometry as the header mark and the favicon — imported, not
              redrawn, so the three surfaces cannot drift. */}
          <svg
            width="56"
            height="56"
            viewBox={LOGO_VIEWBOX}
            fill="none"
            stroke="#fafafa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {LOGO_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
            <circle
              cx={LOGO_NODE.cx}
              cy={LOGO_NODE.cy}
              r={LOGO_NODE.r}
              fill="#fafafa"
            />
          </svg>
          <div style={{ fontSize: 30, color: "#a1a1aa" }}>{siteConfig.role}</div>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#e6ebf0",
            marginTop: 36,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {siteConfig.positioning}
        </div>
      </div>
    ),
    { ...size },
  );
}
