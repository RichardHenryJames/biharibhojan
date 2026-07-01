import type { MetadataRoute } from "next";

const BASE = "https://biharibhojan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/menu", "/about", "/contact"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/menu" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/menu" ? 0.9 : 0.6,
  }));
}
