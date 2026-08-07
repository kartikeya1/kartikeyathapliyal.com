import { ImageResponse } from "next/og";
import { LOGO_NODE, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo";

/**
 * iOS ignores SVG favicons entirely - without this, "Add to Home Screen"
 * renders a screenshot of the page. 180×180 is the size iOS asks for.
 *
 * No `runtime` export: this renders once at build time as a static file.
 * Adding one would turn it into a serverless function and fail check-static.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox={LOGO_VIEWBOX}
          fill="none"
          stroke="#fafafa"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
          <circle cx={LOGO_NODE.cx} cy={LOGO_NODE.cy} r={LOGO_NODE.r} fill="#fafafa" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
