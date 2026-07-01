import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/order-success", "/api/"],
    },
    sitemap: "https://biharibhojan.com/sitemap.xml",
    host: "https://biharibhojan.com",
  };
}
