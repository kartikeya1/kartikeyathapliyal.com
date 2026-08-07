import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} - Product Manager`;
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
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#707070",
          }}
        >
          Product Manager
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3 }}>
            Kartikeya Thapliyal
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#a1a1a1",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Building products, platforms and internal systems that make complex
            ecosystems feel simple.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#d9926c" }}>
          kartikeyathapliyal.com
        </div>
      </div>
    ),
    size
  );
}
