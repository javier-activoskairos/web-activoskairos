import { ImageResponse } from "next/og";

// Tarjeta social. Antes no había ninguna: al compartir en LinkedIn o WhatsApp
// salía una tarjeta en blanco. Se genera aquí para no arrastrar un PNG más.
export const alt = "Activos Kairos";
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
          background: "#0D0D0D",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#F96302",
            fontWeight: 700,
          }}
        >
          <div style={{ width: 56, height: 4, background: "#F96302" }} />
          Activos Kairos
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.1,
            color: "#FFFFFF",
            fontWeight: 700,
            maxWidth: 960,
          }}
        >
          Construimos los sistemas que hacen crecer tu negocio
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#F96302",
              fontWeight: 700,
            }}
          >
            vive el proceso
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(245,237,230,0.55)" }}>
            · activoskairos.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
