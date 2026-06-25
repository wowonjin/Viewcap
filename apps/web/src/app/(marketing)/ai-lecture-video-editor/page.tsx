import { SeoLandingPage } from "@/components/marketing/seo-landing-page";
import { buildLandingMetadata, type LandingPageConfig } from "@/lib/seo/landing-config";

const config: LandingPageConfig = {
  slug: "ai-lecture-video-editor",
  title: "강의 영상 AI 편집",
  h1: "긴 강의를 이해하기 쉬운 요약 클립으로 바꾸세요.",
  description:
    "온라인 강의와 해설 영상을 분석해 핵심 설명 구간을 찾고, 교육 콘텐츠에 맞는 자막과 강조 편집을 적용합니다.",
  keywords: ["강의 영상 편집", "강의 쇼츠 제작", "교육 영상 AI 편집"],
  bullets: [
    "핵심 개념이 나오는 구간 추출",
    "학습자가 읽기 쉬운 자막 스타일",
    "도입부와 반복 설명 구간 정리",
    "강의 홍보용 숏폼 클립 생성",
  ],
  cta: "강의 영상 업로드",
};

export const metadata = buildLandingMetadata(config);

export default function Page() {
  return <SeoLandingPage config={config} />;
}
