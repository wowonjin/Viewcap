import { SITE_NAME, SITE_URL } from "@/lib/seo/site-config";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@viewcap.local",
      availableLanguage: ["ko"],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SoftwareApplicationJsonLd({
  name = `${SITE_NAME} AI 영상 편집기`,
  url = SITE_URL,
  description = "긴 영상을 쇼츠, 릴스, 강의 요약 클립으로 바꾸는 브라우저 기반 AI 영상 편집 서비스입니다.",
}: {
  name?: string;
  url?: string;
  description?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url,
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
      description: "무료 미리보기와 신규 크레딧 제공",
    },
    featureList: [
      "AI 핵심 구간 추출",
      "자동 자막 생성",
      "9:16 숏폼 변환",
      "강의 영상 요약 편집",
      "브라우저 미리보기",
      "MP4 렌더링",
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function FaqJsonLd({ items }: { items: Array<{ question: string; answer: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; href: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
