import type { Metadata } from "next";
import { defaultKeywords, SITE_NAME, SITE_URL } from "@/lib/seo/site-config";

export type LandingPageConfig = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  bullets: string[];
  cta: string;
};

export function buildLandingMetadata(config: LandingPageConfig): Metadata {
  return {
    title: `${config.title} | ${SITE_NAME}`,
    description: config.description,
    keywords: [...config.keywords, ...defaultKeywords],
    alternates: { canonical: `${SITE_URL}/${config.slug}` },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${SITE_URL}/${config.slug}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}
