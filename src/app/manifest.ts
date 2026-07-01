import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BihariBhojan — Ghar ka Bihari Khana",
    short_name: "BihariBhojan",
    description:
      "Homestyle Bihari food, fresh-cooked and delivered hot in Hazaribagh.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf1",
    theme_color: "#E8890B",
    lang: "hi-IN",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
