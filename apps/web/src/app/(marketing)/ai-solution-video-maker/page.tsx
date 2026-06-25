import { SeoLandingPage } from "@/components/marketing/seo-landing-page";
import { buildLandingMetadata, type LandingPageConfig } from "@/lib/seo/landing-config";

const config: LandingPageConfig = {
  slug: "ai-solution-video-maker",
  title: "문제 해설 영상 AI 제작",
  h1: "해설 콘텐츠를 짧고 명확한 영상으로 정리하세요.",
  description:
    "문제 풀이, 해설 강의, 교육 콘텐츠를 분석해 핵심 설명 흐름을 유지한 짧은 클립 초안을 만듭니다.",
  keywords: ["문제 해설 영상", "교육 영상 AI", "해설 영상 제작"],
  bullets: [
    "해설의 핵심 단계와 결론 구간 선택",
    "학습용 자막과 강조 문구 적용",
    "쇼츠와 강의 홍보 클립으로 재구성",
    "브라우저에서 미리보고 렌더링",
  ],
  cta: "해설 영상 만들기",
};

export const metadata = buildLandingMetadata(config);

export default function Page() {
  return <SeoLandingPage config={config} />;
}
