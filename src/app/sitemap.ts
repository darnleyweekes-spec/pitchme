import type { MetadataRoute } from "next";
import { candidates } from "@/lib/data";

export const dynamic = "force-static";

const siteUrl = "https://pitchme.prime24ai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/talent",
    "/pitch/new",
    "/pricing",
    "/about",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const candidateRoutes = candidates.map((candidate) => ({
    url: `${siteUrl}/talent/${candidate.id}`,
  }));

  return [...staticRoutes, ...candidateRoutes];
}
