export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const SITE_NAME = "ViewCap";

export const defaultKeywords = [
  "AI 영상 편집",
  "AI 숏폼 편집",
  "자동 영상 편집",
  "강의 영상 편집",
  "릴스 제작",
  "쇼츠 제작",
  "자동 자막 생성",
  "브라우저 영상 편집기",
];

export const faqItems = [
  {
    question: "ViewCap은 어떤 서비스인가요?",
    answer:
      "긴 영상과 간단한 편집 방향을 입력하면 핵심 구간 추출, 세로형 컷 편집, 자막, 강조 스타일을 브라우저에서 빠르게 구성해 주는 AI 영상 편집 서비스입니다.",
  },
  {
    question: "쇼츠나 릴스도 자동으로 만들 수 있나요?",
    answer:
      "네. 업로드한 영상에서 짧게 쓰기 좋은 구간을 찾고 9:16 비율, 자막, 강조 요소를 적용해 YouTube Shorts, Instagram Reels, TikTok에 맞는 초안을 만들 수 있습니다.",
  },
  {
    question: "강의 영상에도 사용할 수 있나요?",
    answer:
      "가능합니다. 강의의 핵심 설명 구간을 추려 짧은 요약 클립으로 만들고, 이해를 돕는 자막과 강조 스타일을 적용할 수 있습니다.",
  },
  {
    question: "결제 전에 결과를 확인할 수 있나요?",
    answer:
      "미리보기는 무료로 확인할 수 있습니다. 고화질 MP4 렌더링이나 추가 처리에는 선택한 플랜의 크레딧이 사용됩니다.",
  },
  {
    question: "처음 가입하면 무엇이 제공되나요?",
    answer: "신규 계정에는 테스트 편집에 사용할 수 있는 무료 크레딧이 제공됩니다.",
  },
];
