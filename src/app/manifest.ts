import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Activos Kairos",
    short_name: "Kairos",
    description:
      "Diseñamos, automatizamos y operamos los sistemas internos de tu empresa.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#0D0D0D",
    icons: [
      { src: "/assets/logo-mark.png", sizes: "1000x1000", type: "image/png" },
    ],
  };
}
