import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Pushkin's School Russian Language Network";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#fbfaf7",
          color: "#092a4f",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              style={{
                alignItems: "center",
                background: "#123f73",
                borderRadius: "999px",
                color: "white",
                display: "flex",
                fontSize: 30,
                fontWeight: 800,
                height: 92,
                justifyContent: "center",
                position: "relative",
                width: 92,
              }}
            >
              PS
              <div
                style={{
                  background: "#c92a3a",
                  border: "6px solid #fbfaf7",
                  borderRadius: "999px",
                  height: 30,
                  position: "absolute",
                  right: -4,
                  top: -8,
                  width: 30,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 32, fontWeight: 800 }}>
                Pushkin&apos;s School
              </div>
              <div
                style={{
                  color: "#5d6a7d",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  marginTop: 8,
                  textTransform: "uppercase",
                }}
              >
                Russian Language Network
              </div>
            </div>
          </div>
          <div
            style={{
              border: "2px solid #d2a24c",
              borderRadius: 999,
              color: "#123f73",
              fontSize: 22,
              fontWeight: 800,
              padding: "18px 26px",
            }}
          >
            Weekend schools
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#c92a3a",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "0.18em",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            Language, culture, and exam preparation
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 850,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              maxWidth: 900,
            }}
          >
            A refined Russian school network for families
          </div>
          <div
            style={{
              color: "#334155",
              fontSize: 30,
              lineHeight: 1.35,
              marginTop: 28,
              maxWidth: 900,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid #e5ded1",
            color: "#5d6a7d",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            justifyContent: "space-between",
            paddingTop: 26,
          }}
        >
          <span>Schools across the UK network</span>
          <span>pushkinsrussianschool.co.uk</span>
        </div>
      </div>
    ),
    size,
  );
}
