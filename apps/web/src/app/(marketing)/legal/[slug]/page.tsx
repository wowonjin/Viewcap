import { MarketingFooter, MarketingHeader } from "@/components/marketing/site-chrome";

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <LegalContent slugPromise={params} />
      </main>
      <MarketingFooter />
    </div>
  );
}

async function LegalContent({ slugPromise }: { slugPromise: Promise<{ slug: string }> }) {
  const { slug } = await slugPromise;
  const titles: Record<string, string> = {
    terms: "이용약관",
    privacy: "개인정보처리방침",
    refund: "환불 정책",
  };

  return (
    <article className="glass-card rounded-lg p-8">
      <p className="text-sm font-semibold text-primary">Legal</p>
      <h1 className="mt-3 text-3xl font-bold">{titles[slug] ?? "정책"}</h1>
      <p className="mt-5 leading-7 text-muted-foreground">
        이 문서는 MVP 단계의 기본 정책 안내입니다. 정식 서비스 운영 전 법무 검토를 거쳐 세부 조항을 확정해야 합니다.
      </p>
      <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
        <li>업로드한 콘텐츠의 권리와 사용 책임은 사용자에게 있습니다.</li>
        <li>AI가 생성한 편집 결과물은 참고용 초안이며 최종 검토 책임은 사용자에게 있습니다.</li>
        <li>렌더링 실패처럼 서비스 처리 오류가 확인되는 경우 사용 크레딧을 환급할 수 있습니다.</li>
      </ul>
    </article>
  );
}
