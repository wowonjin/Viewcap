import {
  BeforeAfterSection,
  FaqSection,
  NaturalLanguageSection,
  PricingPreviewSection,
  TrustSection,
} from "@/components/marketing/sections-extended";
import {
  FinalCTA,
  HeroSection,
  HowItWorks,
  PainPointSection,
  StatsBar,
  StylePresetGallery,
  UseCaseSection,
} from "@/components/marketing/sections";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { FaqJsonLd, OrganizationJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/json-ld";
import { faqItems } from "@/lib/seo/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ViewCap | AI 영상 편집으로 쇼츠와 릴스를 빠르게 제작",
  description:
    "긴 영상을 업로드하면 ViewCap이 핵심 장면, 자막, 9:16 컷 편집 초안을 만들어 주는 브라우저 기반 AI 영상 편집기입니다.",
  keywords: ["AI 영상 편집", "AI 쇼츠 편집", "릴스 제작", "강의 영상 편집", "자동 자막"],
};

export default function HomePage() {
  return (
    <MarketingLayout>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <FaqJsonLd items={faqItems} />
      <HeroSection />
      <StatsBar />
      <PainPointSection />
      <HowItWorks />
      <BeforeAfterSection />
      <NaturalLanguageSection />
      <UseCaseSection />
      <StylePresetGallery />
      <TrustSection />
      <PricingPreviewSection />
      <FaqSection />
      <FinalCTA />
    </MarketingLayout>
  );
}
