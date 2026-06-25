import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-config";

const routes = [
  "",
  "/ai-video-editor",
  "/ai-shorts-editor",
  "/ai-lecture-video-editor",
  "/ai-subtitle-generator",
  "/ai-solution-video-maker",
  "/how-it-works",
  "/pricing",
  "/examples",
  "/compare/capcut-ai-alternative",
  "/compare/vrew-alternative",
  "/legal/terms",
  "/legal/privacy",
  "/legal/refund",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/ai-") ? 0.9 : 0.7,
  }));
}
