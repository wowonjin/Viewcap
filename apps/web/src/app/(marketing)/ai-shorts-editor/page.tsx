import { SeoLandingPage } from "@/components/marketing/seo-landing-page";
import { buildLandingMetadata, type LandingPageConfig } from "@/lib/seo/landing-config";

const config: LandingPageConfig = {
  slug: "ai-shorts-editor",
  title: "AI 쇼츠 편집",
  h1: "긴 영상 하나로 여러 개의 쇼츠 초안을 만드세요.",
  description:
    "강의, 인터뷰, 제품 영상을 분석해 YouTube Shorts, Reels, TikTok에 맞는 9:16 클립 초안을 만듭니다.",
  keywords: ["AI 쇼츠 편집", "쇼츠 제작", "릴스 제작", "숏폼 자동 편집"],
  bullets: [
    "후킹이 강한 구간 자동 추천",
    "9:16 비율과 모바일 자막 적용",
    "여러 후보 클립을 빠르게 비교",
    "플랫폼 업로드에 맞는 MP4 렌더링",
  ],
  cta: "쇼츠 초안 만들기",
};

export const metadata = buildLandingMetadata(config);

export default function Page() {
  return <SeoLandingPage config={config} />;
}
