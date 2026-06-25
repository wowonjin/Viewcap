import { SeoLandingPage } from "@/components/marketing/seo-landing-page";
import { buildLandingMetadata, type LandingPageConfig } from "@/lib/seo/landing-config";

const config: LandingPageConfig = {
  slug: "ai-video-editor",
  title: "AI 영상 편집기",
  h1: "긴 영상을 업로드하면 편집 초안이 먼저 만들어집니다.",
  description:
    "ViewCap은 핵심 장면 추출, 자막, 컷 편집, 9:16 변환을 브라우저에서 구성해 주는 AI 영상 편집기입니다.",
  keywords: ["AI 영상 편집기", "자동 영상 편집", "브라우저 영상 편집"],
  bullets: [
    "원본 영상을 업로드하고 목표와 톤을 입력",
    "AI가 핵심 구간과 자막 초안을 자동 구성",
    "자연어 요청으로 길이와 자막 스타일 수정",
    "미리보기 확인 후 MP4 렌더링",
  ],
  cta: "AI 편집 시작",
};

export const metadata = buildLandingMetadata(config);

export default function Page() {
  return <SeoLandingPage config={config} />;
}
