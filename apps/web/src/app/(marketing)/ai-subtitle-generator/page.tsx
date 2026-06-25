import { SeoLandingPage } from "@/components/marketing/seo-landing-page";
import { buildLandingMetadata, type LandingPageConfig } from "@/lib/seo/landing-config";

const config: LandingPageConfig = {
  slug: "ai-subtitle-generator",
  title: "AI 자막 생성",
  h1: "영상 흐름에 맞는 자막을 자동으로 구성하세요.",
  description:
    "음성 인식 기반 자막을 생성하고, 숏폼 시청 환경에 맞춰 줄바꿈과 강조 스타일을 정리합니다.",
  keywords: ["AI 자막 생성", "자동 자막", "영상 자막 AI"],
  bullets: [
    "음성 기반 자동 자막 생성",
    "모바일 화면에 맞는 줄바꿈",
    "강조 문장과 키워드 스타일 적용",
    "편집 초안과 함께 자막 검토",
  ],
  cta: "자막 포함 편집 시작",
};

export const metadata = buildLandingMetadata(config);

export default function Page() {
  return <SeoLandingPage config={config} />;
}
