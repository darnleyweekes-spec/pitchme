import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://pitchme.prime24ai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/talent",
    "/pitch/new",
    "/pricing",
    "/about",
    "/login",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
