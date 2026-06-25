# AI 영상편집 서비스 SEO·GEO 세팅 가이드라인

> 대상 서비스: 영상 제목·영상 설명·원본 영상·편집 스타일을 입력하면 AI가 자동 편집본을 생성하고 실시간 미리보기를 제공하는 AI 영상편집 SaaS  
> 목적: Google/Naver/Bing 검색 노출 + ChatGPT/AI Overviews/Copilot/Perplexity 등 생성형 검색에서 서비스가 추천·인용될 가능성을 높이는 실행 가이드  
> 작성일: 2026-06-25  
> 전달 대상: Cursor AI / 프론트엔드 개발자 / 마케터 / 콘텐츠 담당자

---

## 0. 결론 요약

AI 영상편집 서비스의 SEO·GEO 전략은 단순히 메인페이지에 키워드를 많이 넣는 방식으로 가면 안 된다. 검색엔진과 생성형 AI가 이해하기 쉽게 **명확한 페이지 구조, 텍스트 기반 설명, 구조화 데이터, 비교 가능한 기능 정보, 사용 사례별 랜딩 페이지, 신뢰 신호**를 만드는 것이 핵심이다.

특히 Google은 AI Overviews와 AI Mode에 나타나기 위해 별도의 특별한 AI 메타태그나 특별한 schema.org 마크업이 필요하지 않다고 밝히고 있다. 대신 기존 SEO 기본기, 색인 가능성, 내부 링크, 좋은 페이지 경험, 중요한 콘텐츠의 텍스트화, visible content와 일치하는 구조화 데이터를 강조한다. 따라서 GEO는 SEO와 별개로 완전히 새로운 꼼수가 아니라, **검색엔진이 이해할 수 있는 고품질 콘텐츠를 AI가 인용하기 쉬운 형태로 재구성하는 작업**으로 봐야 한다.

이 서비스는 다음 포지션으로 SEO/GEO를 설계한다.

> “영상 제목과 원본 영상을 넣으면 AI가 자동으로 쇼츠·릴스·강의 영상을 편집해주는 AI 영상편집 서비스”

초기에는 다음 6개 키워드 클러스터를 중심으로 페이지를 만든다.

1. AI 영상편집
2. AI 쇼츠 편집
3. 자동 영상 편집
4. AI 자막 생성
5. 강의 영상 편집 AI
6. 문제 해설 영상 자동 제작

---

## 1. SEO와 GEO의 차이

### 1.1 SEO

SEO는 Google, Naver, Bing 같은 검색엔진이 웹사이트를 크롤링·색인·이해하도록 도와 검색 결과에서 노출되게 하는 작업이다.

핵심은 다음이다.

- 크롤러가 접근할 수 있어야 한다.
- 중요한 콘텐츠가 HTML 텍스트로 존재해야 한다.
- 페이지별 목적과 키워드가 명확해야 한다.
- sitemap, robots.txt, canonical, title, description이 제대로 설정되어야 한다.
- 내부 링크 구조가 좋아야 한다.
- 실제 사용자에게 도움이 되는 콘텐츠여야 한다.

### 1.2 GEO: Generative Engine Optimization

GEO는 ChatGPT, Google AI Overviews, Gemini, Copilot, Perplexity 같은 생성형 검색·AI 답변 시스템이 브랜드와 콘텐츠를 이해하고, 답변에서 추천·인용·참조할 가능성을 높이는 작업이다.

GEO의 핵심은 다음이다.

- AI가 바로 요약할 수 있는 명확한 설명
- 질문-답변형 콘텐츠
- 비교 가능한 기능·가격·사용 사례
- 신뢰 가능한 출처와 근거
- 브랜드명, 제품명, 카테고리, 사용 대상의 일관된 표현
- 외부 웹에서의 브랜드 언급, 리뷰, 비교글, 커뮤니티 언급
- AI 크롤러가 접근할 수 있는 기술 설정

중요한 점은 GEO는 아직 SEO처럼 확정된 공식 룰이 적다. 따라서 검증된 SEO 기본기 위에, AI가 읽기 좋은 정보 구조를 얹는 방식으로 접근해야 한다.

---

## 2. 기본 원칙

### 2.1 검색엔진과 AI에게 한 문장으로 이해되어야 한다

메인페이지 최상단에는 다음 수준의 문장이 필요하다.

```text
AI 영상편집 서비스 — 제목, 원본 영상, 원하는 스타일만 입력하면 AI가 쇼츠·릴스·강의 영상을 자동으로 편집합니다.
```

피해야 할 문장:

```text
콘텐츠 제작의 미래를 바꾸는 올인원 크리에이티브 플랫폼
```

위 문장은 멋있지만 검색엔진과 AI가 정확히 무엇을 하는 서비스인지 이해하기 어렵다.

### 2.2 페이지별 검색 의도를 분리한다

메인페이지 하나에 모든 키워드를 넣지 않는다. 사용자의 검색 의도별로 랜딩 페이지를 분리한다.

| 검색 의도 | 권장 URL | 목적 |
|---|---|---|
| AI 영상편집 서비스 찾기 | `/ai-video-editor` | 대표 카테고리 랜딩 |
| 쇼츠 자동 편집 | `/ai-shorts-editor` | 숏폼 크리에이터 전환 |
| 강의 영상 편집 | `/ai-lecture-video-editor` | 학원/강사 타깃 |
| 자동 자막 생성 | `/ai-subtitle-generator` | 자막 검색 수요 흡수 |
| 문제 해설 영상 제작 | `/ai-solution-video-maker` | 노바AI 교육 특화 |
| 가격 비교 | `/pricing` | 결제 전환 |
| 사용법 | `/how-it-works` | 정보성 검색 + 전환 |
| CapCut/Vrew 대체재 | `/compare/capcut-ai-alternative`, `/compare/vrew-alternative` | 비교 검색 유입 |

### 2.3 중요한 내용은 이미지가 아니라 HTML 텍스트로 작성한다

AI 영상 서비스는 시각적 데모가 중요하지만, 검색엔진과 AI가 이해해야 하는 핵심 정보는 반드시 HTML 텍스트로 존재해야 한다.

필수 텍스트 정보:

- 서비스가 하는 일
- 지원 입력: 영상, 이미지, PDF, 제목, 설명, 스타일
- 지원 출력: 쇼츠, 릴스, 유튜브 영상, 강의 영상, MP4
- 주요 기능: 자동 컷편집, 자막 생성, BGM, 템플릿, 실시간 미리보기, 최종 렌더링
- 사용 대상: 크리에이터, 강사, 학원, 마케터, 스타트업, 출판사
- 가격/무료 체험 정보
- 사용 예시
- FAQ

---

## 3. 사이트 구조 설계

### 3.1 추천 URL 구조

```text
/
/ai-video-editor
/ai-shorts-editor
/ai-lecture-video-editor
/ai-subtitle-generator
/ai-solution-video-maker
/templates
/templates/shorts
/templates/lecture
/templates/product-demo
/use-cases
/use-cases/academy
/use-cases/creator
/use-cases/startup
/use-cases/marketing-agency
/compare
/compare/capcut-ai-alternative
/compare/vrew-alternative
/compare/descript-alternative
/pricing
/how-it-works
/blog
/blog/ai-video-editing-guide
/blog/how-to-make-shorts-with-ai
/blog/lecture-video-automation
/help
/help/upload-video
/help/rendering
/help/subtitle
/legal/terms
/legal/privacy
/legal/refund-policy
```

### 3.2 페이지별 역할

#### `/`

목적: 브랜드·제품을 5초 안에 이해시키고 회원가입으로 전환한다.

필수 섹션:

- 히어로 카피
- 영상 업로드 → AI 편집 → 미리보기 → 다운로드 흐름
- 실제 편집 전/후 데모
- 편집 스타일 프리셋
- 사용 대상별 카드
- 핵심 기능
- 요금제 진입 CTA
- FAQ

#### `/ai-video-editor`

목적: “AI 영상편집”, “AI 영상 편집기”, “자동 영상편집” 키워드 대응.

필수 내용:

- AI 영상편집기의 정의
- 일반 편집툴과의 차이
- 사용 방법
- 지원 기능
- 추천 사용 대상
- FAQ

#### `/ai-shorts-editor`

목적: “AI 쇼츠 편집”, “쇼츠 자동 편집”, “릴스 자동 편집” 키워드 대응.

필수 내용:

- 긴 영상에서 쇼츠를 자동 추출하는 흐름
- 자막, 컷편집, 후킹 문구, CTA 자동 생성
- 유튜브 쇼츠, 인스타 릴스, 틱톡 출력 포맷
- 크리에이터/마케터 사용 사례

#### `/ai-lecture-video-editor`

목적: 노바AI의 기존 고객층인 학원 선생님, 강사, 교육 콘텐츠 제작자 타깃.

필수 내용:

- 강의 영상에서 불필요 구간 제거
- 판서/문제/얼굴 영역 자동 강조
- 자막 생성
- 강의 하이라이트 쇼츠 제작
- 학원 홍보 영상 제작

#### `/ai-solution-video-maker`

목적: 경쟁이 약한 교육 특화 GEO/SEO 페이지.

필수 내용:

- 문제 이미지/PDF 업로드
- AI 풀이 대본 생성
- 해설 자막/음성/그래픽 생성
- 문제 확대/공식 강조/단계별 풀이
- 수학·과학·국어 등 과목 확장 가능성

---

## 4. 메타 태그 가이드

### 4.1 메인페이지 메타 예시

```tsx
export const metadata = {
  title: 'AI 영상편집 서비스 | 제목과 원본 영상만 넣으면 자동 편집',
  description:
    '영상 제목, 설명, 원본 영상을 업로드하면 AI가 쇼츠·릴스·강의 영상을 자동으로 편집합니다. 자막 생성, 컷편집, BGM, 실시간 미리보기, MP4 다운로드까지 한 번에 처리하세요.',
  alternates: {
    canonical: 'https://example.com',
  },
  openGraph: {
    title: 'AI 영상편집 서비스',
    description:
      '원본 영상을 넣으면 AI가 자동으로 쇼츠·릴스·강의 영상을 편집합니다.',
    url: 'https://example.com',
    siteName: '서비스명',
    images: [
      {
        url: 'https://example.com/og/main.png',
        width: 1200,
        height: 630,
        alt: 'AI 영상편집 서비스 미리보기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 영상편집 서비스',
    description: '제목과 원본 영상만 넣으면 AI가 자동 편집합니다.',
    images: ['https://example.com/og/main.png'],
  },
};
```

### 4.2 페이지별 title 규칙

좋은 title:

```text
AI 쇼츠 편집기 | 긴 영상을 쇼츠로 자동 편집
강의 영상 편집 AI | 자막·컷편집·쇼츠 제작 자동화
AI 자막 생성기 | 영상 업로드만으로 자동 자막 만들기
문제 해설 영상 제작 AI | 문제 이미지로 해설 쇼츠 자동 생성
```

나쁜 title:

```text
홈
서비스 소개
혁신적인 AI 플랫폼
콘텐츠 제작의 미래
```

### 4.3 description 규칙

- 80~150자 내외
- 핵심 기능 포함
- 검색자가 얻는 결과 포함
- CTA는 과하지 않게

예시:

```text
원본 영상과 제목을 업로드하면 AI가 자동 컷편집, 자막 생성, BGM, 실시간 미리보기를 통해 쇼츠·릴스·강의 영상을 제작합니다.
```

---

## 5. robots.txt 설정

### 5.1 기본 SEO용 robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### 5.2 관리자/사용자 데이터 차단

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /editor/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /projects/

Sitemap: https://example.com/sitemap.xml
```

주의:

- `robots.txt`는 보안 장치가 아니다.
- 민감한 프로젝트 파일은 robots.txt가 아니라 인증, 권한, signed URL, noindex, 비공개 스토리지로 보호해야 한다.
- 결제 페이지, 대시보드, 사용자 프로젝트는 검색 색인 대상이 아니다.

### 5.3 OpenAI/ChatGPT 검색 노출을 고려한 robots.txt

OpenAI는 검색 노출용 `OAI-SearchBot`과 학습용 `GPTBot`을 분리한다. ChatGPT 검색에 나타나고 싶지만 모델 학습에는 쓰이고 싶지 않다면 다음처럼 설정할 수 있다.

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Allow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /editor/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /projects/

Sitemap: https://example.com/sitemap.xml
```

운영 판단:

| 목적 | OAI-SearchBot | GPTBot |
|---|---|---|
| ChatGPT 검색에 노출되고 싶다 | Allow | 선택 |
| 모델 학습에는 사용되지 않았으면 한다 | Allow | Disallow |
| AI 크롤러를 전부 막고 싶다 | Disallow | Disallow |

초기 스타트업은 브랜드 노출이 중요하므로 `OAI-SearchBot`은 허용하는 쪽을 추천한다.

### 5.4 네이버 Yeti 허용

네이버 검색 노출을 위해서는 네이버 검색로봇 `Yeti` 접근을 막지 않는다.

```txt
User-agent: Yeti
Allow: /
```

---

## 6. sitemap.xml 설계

### 6.1 필수 포함 URL

`sitemap.xml`에는 공개 랜딩, 블로그, 도움말, 비교 페이지를 포함한다.

포함:

```text
/
/ai-video-editor
/ai-shorts-editor
/ai-lecture-video-editor
/ai-subtitle-generator
/ai-solution-video-maker
/pricing
/how-it-works
/templates
/use-cases/academy
/use-cases/creator
/use-cases/startup
/compare/capcut-ai-alternative
/compare/vrew-alternative
/blog/*
/help/*
/legal/terms
/legal/privacy
/legal/refund-policy
```

제외:

```text
/admin/*
/dashboard/*
/editor/*
/projects/*
/api/*
/checkout/*
/account/*
```

### 6.2 Next.js App Router sitemap 예시

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/ai-video-editor',
    '/ai-shorts-editor',
    '/ai-lecture-video-editor',
    '/ai-subtitle-generator',
    '/ai-solution-video-maker',
    '/pricing',
    '/how-it-works',
    '/templates',
    '/use-cases/academy',
    '/use-cases/creator',
    '/use-cases/startup',
    '/compare/capcut-ai-alternative',
    '/compare/vrew-alternative',
    '/legal/terms',
    '/legal/privacy',
    '/legal/refund-policy',
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
```

---

## 7. 구조화 데이터 JSON-LD

구조화 데이터는 GEO와 SEO 모두에 중요하다. 단, 구조화 데이터는 페이지에 실제로 보이는 내용과 일치해야 한다.

### 7.1 Organization schema

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '서비스명',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      sameAs: [
        'https://www.instagram.com/example',
        'https://www.youtube.com/@example',
        'https://blog.naver.com/example'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@example.com',
        availableLanguage: ['ko', 'en']
      }
    })
  }}
/>
```

### 7.2 SoftwareApplication schema

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '서비스명 AI 영상편집기',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url: 'https://example.com/ai-video-editor',
      description:
        '영상 제목, 설명, 원본 영상을 업로드하면 AI가 쇼츠, 릴스, 강의 영상을 자동으로 편집하는 웹 기반 AI 영상편집 서비스입니다.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
        description: '무료 체험 제공'
      },
      featureList: [
        'AI 자동 컷편집',
        '자동 자막 생성',
        '쇼츠 및 릴스 변환',
        '강의 영상 편집',
        '실시간 미리보기',
        'MP4 렌더링'
      ]
    })
  }}
/>
```

### 7.3 FAQPage schema

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'AI 영상편집 서비스는 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'AI 영상편집 서비스는 원본 영상과 제목, 설명, 원하는 스타일을 입력하면 AI가 자동으로 컷편집, 자막 생성, BGM, 화면 전환을 적용해 편집본을 만들어주는 서비스입니다.'
          }
        },
        {
          '@type': 'Question',
          name: '쇼츠 영상도 자동으로 만들 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              '네. 긴 영상에서 핵심 구간을 추출하고 9:16 비율로 변환하여 유튜브 쇼츠, 인스타 릴스, 틱톡용 영상을 만들 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          name: '강의 영상 편집에도 사용할 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              '네. 강의 영상의 불필요한 구간을 줄이고, 자막을 생성하며, 문제·판서·공식 설명 구간을 강조하는 교육용 영상 편집에 사용할 수 있습니다.'
          }
        }
      ]
    })
  }}
/>
```

### 7.4 BreadcrumbList schema

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '홈',
          item: 'https://example.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI 영상편집기',
          item: 'https://example.com/ai-video-editor'
        }
      ]
    })
  }}
/>
```

### 7.5 VideoObject schema

데모 영상이 있는 페이지에는 VideoObject를 넣는다.

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'AI 영상편집 데모',
      description:
        '원본 영상을 업로드하면 AI가 자동으로 쇼츠 편집본을 생성하는 과정입니다.',
      thumbnailUrl: ['https://example.com/thumbnails/demo.jpg'],
      uploadDate: '2026-06-25T09:00:00+09:00',
      duration: 'PT1M20S',
      contentUrl: 'https://example.com/videos/demo.mp4',
      embedUrl: 'https://example.com/demo'
    })
  }}
/>
```

---

## 8. GEO를 위한 콘텐츠 구조

### 8.1 AI가 인용하기 좋은 블록 구조

각 랜딩 페이지에는 아래 구조를 반복한다.

```text
H1: AI 영상편집 서비스
요약 문단: 이 서비스가 무엇인지 2~3문장으로 설명

H2: 어떤 문제를 해결하나요?
- 편집 시간이 오래 걸림
- 자막 작업이 귀찮음
- 쇼츠로 다시 편집해야 함
- 강의 영상을 홍보 콘텐츠로 바꾸기 어려움

H2: 어떻게 작동하나요?
1. 원본 영상 업로드
2. 제목과 설명 입력
3. 편집 스타일 선택
4. AI 편집 미리보기
5. MP4 다운로드

H2: 주요 기능
표 형태로 기능과 설명 정리

H2: 누구에게 적합한가요?
사용자 유형별 설명

H2: 다른 영상편집툴과 차이
비교표

H2: 자주 묻는 질문
FAQ
```

### 8.2 AI 답변용 요약 박스

각 페이지 상단에 다음 블록을 넣는다.

```html
<section class="ai-summary">
  <h2>요약</h2>
  <p>
    서비스명은 영상 제목, 설명, 원본 영상을 입력하면 AI가 자동으로 컷편집, 자막 생성, BGM, 화면 전환을 적용해 쇼츠·릴스·강의 영상을 만들어주는 웹 기반 AI 영상편집 서비스입니다.
  </p>
</section>
```

이 블록은 사용자를 위한 요약이기도 하고, AI가 페이지를 요약할 때 핵심 문장으로 가져가기 좋은 구조다.

### 8.3 비교표는 반드시 HTML table로 작성

AI는 비교표를 잘 추출한다.

```html
<table>
  <thead>
    <tr>
      <th>구분</th>
      <th>일반 영상편집툴</th>
      <th>서비스명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>편집 방식</td>
      <td>사용자가 직접 컷편집</td>
      <td>AI가 자동으로 타임라인 생성</td>
    </tr>
    <tr>
      <td>자막</td>
      <td>수동 입력 또는 별도 기능 필요</td>
      <td>음성 인식 기반 자동 생성</td>
    </tr>
    <tr>
      <td>쇼츠 변환</td>
      <td>수동 리사이즈와 재편집 필요</td>
      <td>9:16 포맷으로 자동 변환</td>
    </tr>
  </tbody>
</table>
```

### 8.4 FAQ 질문 예시

메인 FAQ:

```text
AI 영상편집 서비스는 무엇인가요?
원본 영상만 업로드하면 자동으로 편집되나요?
영상 제목과 설명은 왜 필요한가요?
어떤 편집 스타일을 선택할 수 있나요?
쇼츠와 릴스 영상을 만들 수 있나요?
강의 영상도 편집할 수 있나요?
자막은 자동으로 생성되나요?
편집 결과를 수정할 수 있나요?
최종 영상은 어떤 파일로 다운로드되나요?
무료로 사용해볼 수 있나요?
```

교육 특화 FAQ:

```text
문제 이미지만으로 해설 영상을 만들 수 있나요?
수학 수식이나 과학 공식도 영상에 표시할 수 있나요?
학원 홍보용 쇼츠로 활용할 수 있나요?
강의 영상에서 핵심 구간만 추출할 수 있나요?
학생 얼굴이 나오는 영상도 업로드할 수 있나요?
```

---

## 9. 키워드 전략

### 9.1 메인 키워드

```text
AI 영상편집
AI 영상 편집기
자동 영상편집
영상 자동 편집
AI 쇼츠 편집
쇼츠 자동 편집
AI 릴스 편집
AI 자막 생성
자동 자막 생성
강의 영상 편집 AI
문제 해설 영상 제작
```

### 9.2 롱테일 키워드

```text
영상 제목 넣으면 자동으로 편집해주는 AI
긴 영상을 쇼츠로 자동 편집하는 서비스
강의 영상을 쇼츠로 만드는 AI
원본 영상으로 릴스 자동 제작
AI가 자막까지 넣어주는 영상편집기
학원 선생님을 위한 AI 영상편집
문제 풀이 영상을 자동으로 만드는 AI
유튜브 쇼츠 자동 편집 프로그램
인스타 릴스 자동 편집 프로그램
AI 영상편집 사이트 추천
```

### 9.3 비교 키워드

주의: 경쟁사명을 무리하게 비방하지 않는다. 비교 페이지는 객관적 차이 중심으로 작성한다.

```text
CapCut AI 대체 서비스
Vrew 대체 서비스
Descript 대체 서비스
OpusClip 대체 서비스
AI 영상편집 서비스 비교
AI 쇼츠 편집 프로그램 비교
```

### 9.4 국내 타깃 키워드

```text
학원 영상 편집 AI
강의 쇼츠 만들기
학원 홍보 쇼츠 제작
수업 영상 자막 자동 생성
문제 풀이 영상 만들기
교육 영상 자동 편집
선생님 영상편집 프로그램
```

---

## 10. 콘텐츠 허브 전략

### 10.1 블로그 카테고리

```text
/blog/ai-video-editing
/blog/shorts-marketing
/blog/lecture-video
/blog/ai-subtitle
/blog/video-production-automation
/blog/education-content
```

### 10.2 초기 작성 글 20개

1. AI 영상편집이란? 자동 편집 서비스의 원리와 활용법
2. 긴 영상을 쇼츠로 자동 편집하는 방법
3. AI 자막 생성 서비스 비교: 수동 자막과 무엇이 다른가
4. 강의 영상을 쇼츠로 만드는 가장 쉬운 방법
5. 학원 선생님이 AI 영상편집을 활용하는 방법
6. 문제 풀이 영상을 자동으로 만드는 방법
7. 유튜브 쇼츠 편집 시간을 줄이는 AI 워크플로우
8. 인스타 릴스 자동 편집을 위한 체크리스트
9. AI 영상편집 서비스 선택 기준 7가지
10. CapCut과 AI 자동편집 서비스의 차이
11. Vrew와 AI 영상편집 서비스의 차이
12. 쇼츠 자막 디자인 가이드
13. 강의 영상에서 핵심 구간을 추출하는 방법
14. 영상 편집 외주 비용과 AI 자동편집 비용 비교
15. 스타트업이 제품 소개 영상을 자동으로 만드는 방법
16. 교육 콘텐츠 제작자가 AI를 써야 하는 이유
17. 영상 제목과 설명이 AI 편집 품질에 미치는 영향
18. AI 영상편집 결과물을 수정하는 좋은 프롬프트 예시
19. 학원 홍보용 쇼츠 제작 가이드
20. 문제 이미지에서 해설 영상까지 자동화하는 방법

### 10.3 각 글의 기본 템플릿

```markdown
# 제목

## 30초 요약

## 이런 사람이 읽으면 좋습니다

## 문제 상황

## 기존 방식의 한계

## AI 자동화 방식

## 실제 사용 예시

## 체크리스트

## 자주 묻는 질문

## 관련 기능

## 다음 단계 CTA
```

---

## 11. AI 검색 노출을 위한 브랜드 엔티티 설계

### 11.1 브랜드 설명을 일관되게 고정

사이트 전체에서 다음 문장을 반복 사용한다.

```text
서비스명은 영상 제목, 설명, 원본 영상을 입력하면 AI가 자동으로 컷편집, 자막 생성, BGM, 화면 전환을 적용해 쇼츠·릴스·강의 영상을 만들어주는 AI 영상편집 서비스입니다.
```

짧은 버전:

```text
서비스명은 원본 영상을 AI가 자동으로 쇼츠·릴스·강의 영상으로 편집해주는 웹 기반 AI 영상편집 서비스입니다.
```

### 11.2 브랜드 엔티티 속성

| 속성 | 값 |
|---|---|
| 브랜드명 | 서비스명 |
| 카테고리 | AI 영상편집 서비스 |
| 핵심 기능 | 자동 컷편집, 자동 자막, 스타일 편집, 실시간 미리보기, MP4 렌더링 |
| 주요 고객 | 크리에이터, 학원 선생님, 강사, 마케터, 스타트업, 출판사 |
| 대표 사용 사례 | 쇼츠 제작, 릴스 제작, 강의 영상 편집, 문제 해설 영상 제작 |
| 차별점 | 제목·내용·스타일 기반 AI 타임라인 자동 생성 |

### 11.3 외부 채널에도 같은 설명 사용

GEO는 자사 웹사이트만으로 부족하다. AI는 외부 웹의 브랜드 언급도 참고할 수 있다.

동일한 브랜드 설명을 아래 채널에 배포한다.

- 네이버 블로그
- 브런치
- Medium
- YouTube 설명란
- Instagram 프로필
- Threads 프로필
- LinkedIn 회사 페이지
- Product Hunt
- GitHub README
- 커뮤니티 소개글
- 보도자료
- 제휴사 페이지

---

## 12. llms.txt 설정

### 12.1 llms.txt는 선택 사항

Google은 AI Overviews/AI Mode에 나타나기 위해 별도 AI 텍스트 파일이나 특수 마크업이 필요하지 않다고 설명한다. 따라서 `llms.txt`는 필수 SEO 요소가 아니다.

다만 ChatGPT, Claude, Perplexity, 각종 AI 에이전트가 사이트 핵심 문서를 빠르게 이해하도록 돕기 위한 **선택적 GEO 보조 파일**로는 사용할 수 있다.

### 12.2 `/llms.txt` 예시

```txt
# 서비스명

서비스명은 영상 제목, 설명, 원본 영상을 입력하면 AI가 자동으로 컷편집, 자막 생성, BGM, 화면 전환을 적용해 쇼츠·릴스·강의 영상을 만들어주는 AI 영상편집 서비스입니다.

## 핵심 페이지

- 제품 소개: https://example.com/ai-video-editor
- AI 쇼츠 편집기: https://example.com/ai-shorts-editor
- 강의 영상 편집 AI: https://example.com/ai-lecture-video-editor
- 문제 해설 영상 제작 AI: https://example.com/ai-solution-video-maker
- 가격: https://example.com/pricing
- 사용법: https://example.com/how-it-works
- 도움말: https://example.com/help

## 주요 기능

- AI 자동 컷편집
- 자동 자막 생성
- 쇼츠/릴스 9:16 변환
- 강의 영상 편집
- 문제 해설 영상 제작
- 실시간 미리보기
- MP4 다운로드

## 주요 고객

- 유튜브 쇼츠 크리에이터
- 인스타 릴스 마케터
- 학원 선생님
- 온라인 강사
- 스타트업 마케팅팀
- 교육 콘텐츠 제작자

## 문의

- 고객지원: support@example.com
```

### 12.3 `/llms-full.txt` 예시

`llms-full.txt`에는 더 긴 설명과 FAQ를 넣는다.

```txt
# 서비스명 전체 설명

서비스명은 웹 기반 AI 영상편집 서비스입니다. 사용자는 영상 제목, 영상 설명, 원본 영상, 원하는 편집 스타일을 입력할 수 있습니다. AI는 입력된 정보를 바탕으로 영상의 핵심 구간을 찾고, 자동 컷편집, 자막 생성, BGM, 화면 전환, 화면 확대 효과를 적용하여 쇼츠, 릴스, 강의 영상, 제품 소개 영상을 생성합니다.

## 사용 흐름

1. 원본 영상 업로드
2. 제목과 설명 입력
3. 편집 스타일 선택
4. AI 편집 미리보기 확인
5. 자연어로 수정 요청
6. 최종 MP4 렌더링 및 다운로드

## FAQ

Q. AI 영상편집 서비스는 무엇인가요?
A. 원본 영상과 제목, 설명, 스타일을 입력하면 AI가 자동으로 편집본을 생성하는 서비스입니다.

Q. 쇼츠 영상도 만들 수 있나요?
A. 네. 긴 영상을 9:16 비율의 쇼츠, 릴스, 틱톡용 영상으로 자동 변환할 수 있습니다.
```

---

## 13. Next.js SEO 구현 체크리스트

### 13.1 파일 구조

```text
app/
  layout.tsx
  page.tsx
  sitemap.ts
  robots.ts
  manifest.ts
  ai-video-editor/
    page.tsx
  ai-shorts-editor/
    page.tsx
  ai-lecture-video-editor/
    page.tsx
  ai-subtitle-generator/
    page.tsx
  ai-solution-video-maker/
    page.tsx
  pricing/
    page.tsx
  how-it-works/
    page.tsx
  compare/
    capcut-ai-alternative/
      page.tsx
    vrew-alternative/
      page.tsx
  blog/
    [slug]/
      page.tsx
components/
  seo/
    JsonLd.tsx
    BreadcrumbJsonLd.tsx
    FaqJsonLd.tsx
    SoftwareApplicationJsonLd.tsx
public/
  robots.txt
  llms.txt
  llms-full.txt
  og/
    main.png
```

### 13.2 robots.ts 예시

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/editor/',
          '/api/',
          '/checkout/',
          '/account/',
          '/projects/',
        ],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com',
  };
}
```

### 13.3 JSON-LD 컴포넌트

```tsx
// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

사용 예시:

```tsx
import { JsonLd } from '@/components/seo/JsonLd';

export default function AiVideoEditorPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '서비스명 AI 영상편집기',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    description:
      '원본 영상과 제목을 입력하면 AI가 자동으로 쇼츠·릴스·강의 영상을 편집합니다.',
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <main>
        <h1>AI 영상편집 서비스</h1>
      </main>
    </>
  );
}
```

---

## 14. 성능 SEO

### 14.1 Core Web Vitals 목표

| 지표 | 목표 |
|---|---:|
| LCP | 2.5초 이하 |
| INP | 200ms 이하 |
| CLS | 0.1 이하 |
| TTFB | 800ms 이하 권장 |

### 14.2 영상 서비스 특화 성능 전략

- 히어로 데모 영상은 자동 재생 MP4를 바로 로딩하지 않는다.
- 첫 화면에는 poster 이미지를 먼저 보여준다.
- 영상은 lazy loading한다.
- OG 이미지, 히어로 이미지는 WebP/AVIF로 제공한다.
- 데모 영상은 720p 이하 프리뷰 버전 사용.
- 실제 편집 미리보기는 로그인 후 앱 영역에서 처리한다.
- 메인 랜딩은 최대한 정적 렌더링한다.

예시:

```tsx
<video
  poster="/images/demo-poster.webp"
  preload="none"
  controls
  playsInline
>
  <source src="/videos/demo-720p.mp4" type="video/mp4" />
</video>
```

---

## 15. 이미지/동영상 SEO

### 15.1 이미지 alt 규칙

좋은 alt:

```html
<img src="/demo-before-after.webp" alt="AI가 원본 영상을 쇼츠로 자동 편집한 전후 비교 화면" />
```

나쁜 alt:

```html
<img src="/demo.webp" alt="이미지" />
```

### 15.2 데모 영상 주변 텍스트

동영상만 넣지 말고 반드시 설명 텍스트를 붙인다.

```html
<section>
  <h2>AI 쇼츠 자동 편집 데모</h2>
  <p>
    아래 영상은 10분 강의 영상에서 핵심 구간을 추출하고, 자막과 화면 확대 효과를 적용해 45초 쇼츠로 편집한 예시입니다.
  </p>
  <video controls poster="/demo/poster.webp">
    <source src="/demo/shorts-demo.mp4" type="video/mp4" />
  </video>
</section>
```

---

## 16. 네이버 SEO 체크리스트

네이버 검색 노출을 위해서는 Google SEO와 별개로 네이버 서치어드바이저 설정을 해야 한다.

### 16.1 필수 작업

- 네이버 서치어드바이저에 사이트 등록
- 사이트 소유 확인
- `robots.txt`에서 `Yeti` 허용
- sitemap.xml 제출
- RSS 제출 가능하면 제출
- 사이트 제목과 설명 확인
- `noindex`, `nofollow` 실수 제거
- 중요한 콘텐츠를 JavaScript만으로 로딩하지 않기
- 내부 링크를 `<a href="...">` 형태로 제공
- 네이버 블로그/인스타그램/유튜브 등 연관 채널 마크업 정리

### 16.2 네이버 검색로봇 허용 예시

```txt
User-agent: Yeti
Allow: /

User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### 16.3 네이버용 콘텐츠 전략

네이버는 블로그/카페/지식인/플레이스/웹문서가 혼합되어 노출된다. 따라서 웹사이트만 만들지 말고 네이버 블로그 콘텐츠를 병행한다.

초기 네이버 블로그 글 주제:

```text
AI 영상편집 서비스 추천
쇼츠 자동 편집하는 방법
학원 선생님을 위한 강의 영상 편집 AI
강의 영상 자막 자동 생성 방법
문제 풀이 쇼츠 만드는 방법
```

---

## 17. Bing/Copilot SEO 체크리스트

Bing은 Microsoft Copilot과 연결되어 있어 GEO 관점에서도 무시하면 안 된다.

### 17.1 필수 작업

- Bing Webmaster Tools 등록
- sitemap.xml 제출
- IndexNow 설정
- 구조화 데이터 점검
- robots.txt 점검
- Microsoft Clarity 설치 고려

### 17.2 IndexNow 설정 예시

IndexNow는 새 URL이나 수정 URL을 참여 검색엔진에 빠르게 알리는 프로토콜이다.

```ts
async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: 'example.com',
    key: process.env.INDEXNOW_KEY,
    keyLocation: `https://example.com/${process.env.INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });
}
```

`public/{INDEXNOW_KEY}.txt` 파일을 배포해야 한다.

---

## 18. 외부 신뢰 신호 구축

생성형 AI는 브랜드 자체 페이지보다 외부 신뢰 신호를 참고하는 경우가 많다. 따라서 다음 외부 자산을 만든다.

### 18.1 필수 외부 자산

| 채널 | 목적 |
|---|---|
| 네이버 블로그 | 국내 검색 유입 |
| YouTube | 데모 영상 색인 |
| GitHub README | 개발자/AI가 읽기 쉬운 설명 |
| Product Hunt | 글로벌 SaaS 신뢰 신호 |
| LinkedIn 회사 페이지 | B2B 신뢰 |
| Threads/Instagram | 실제 사용 사례 확산 |
| 보도자료 | 브랜드 엔티티 강화 |
| 제휴사/고객사 페이지 | 제3자 언급 확보 |

### 18.2 GitHub README 템플릿

```markdown
# 서비스명 AI Video Editor

서비스명은 영상 제목, 설명, 원본 영상을 입력하면 AI가 자동으로 컷편집, 자막 생성, BGM, 화면 전환을 적용해 쇼츠·릴스·강의 영상을 만들어주는 웹 기반 AI 영상편집 서비스입니다.

## 주요 기능

- AI 자동 컷편집
- 자동 자막 생성
- 쇼츠/릴스 변환
- 강의 영상 편집
- 문제 해설 영상 제작
- 실시간 미리보기
- MP4 렌더링

## 주요 사용 사례

- 긴 영상을 쇼츠로 변환
- 강의 영상에서 핵심 구간 추출
- 학원 홍보 쇼츠 제작
- 제품 소개 영상 제작
```

---

## 19. 랜딩 페이지 카피 가이드

### 19.1 메인 히어로 카피

옵션 A:

```text
영상 제목만 넣으면,
AI가 편집본을 바로 보여줍니다.

원본 영상과 원하는 스타일을 입력하면
AI가 컷편집, 자막, BGM, 화면 전환까지 자동으로 완성합니다.
```

옵션 B:

```text
원본 영상이 쇼츠가 되는 가장 빠른 방법

제목, 설명, 편집 스타일만 입력하세요.
AI가 자동으로 편집하고 실시간 미리보기로 보여줍니다.
```

옵션 C, 교육 특화:

```text
강의 영상과 문제를 넣으면
AI가 해설 쇼츠를 만들어줍니다.

자막, 문제 확대, 핵심 공식 강조, MP4 렌더링까지 한 번에 처리하세요.
```

### 19.2 CTA 문구

좋은 CTA:

```text
무료로 AI 편집 시작하기
내 영상으로 편집본 미리보기
1분 샘플 영상 만들어보기
쇼츠 자동 편집해보기
```

약한 CTA:

```text
시작하기
더 알아보기
회원가입
```

---

## 20. 이벤트 트래킹 설계

SEO/GEO는 노출만 보면 안 되고, 검색 유입이 제품 사용으로 이어지는지 봐야 한다.

### 20.1 추적 이벤트

```ts
export const SEO_EVENTS = {
  VIEW_LANDING: 'view_landing',
  CLICK_HERO_CTA: 'click_hero_cta',
  CLICK_DEMO_PLAY: 'click_demo_play',
  CLICK_PRICING: 'click_pricing',
  SIGNUP_FROM_SEO: 'signup_from_seo',
  START_PROJECT_FROM_SEO: 'start_project_from_seo',
  COMPLETE_PREVIEW_FROM_SEO: 'complete_preview_from_seo',
  PURCHASE_FROM_SEO: 'purchase_from_seo',
};
```

### 20.2 UTM 규칙

```text
utm_source=google
utm_medium=organic
utm_campaign=seo_ai_video_editor

utm_source=naver
utm_medium=organic
utm_campaign=seo_ai_video_editor

utm_source=chatgpt
utm_medium=ai_referral
utm_campaign=geo

utm_source=perplexity
utm_medium=ai_referral
utm_campaign=geo
```

### 20.3 Search Console에서 봐야 할 지표

- 검색어
- 노출수
- 클릭수
- CTR
- 평균 게재순위
- 페이지별 유입
- 색인 제외 사유
- 구조화 데이터 오류
- Core Web Vitals

### 20.4 GEO 추적 지표

GEO는 아직 공식 측정이 제한적이므로 다음을 수동/반자동으로 추적한다.

- ChatGPT에서 “AI 영상편집 서비스 추천” 검색 시 언급 여부
- Perplexity에서 관련 질의 시 언급 여부
- Gemini/AI Overviews에서 관련 질의 시 언급 여부
- Copilot/Bing Chat에서 관련 질의 시 언급 여부
- AI referral traffic
- 외부 문서/커뮤니티/블로그의 브랜드 언급량
- 브랜드명 검색량 증가

---

## 21. 초기 30일 실행 로드맵

### Week 1: 기술 SEO 세팅

- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록
- [ ] Bing Webmaster Tools 등록
- [ ] sitemap.xml 생성
- [ ] robots.txt 생성
- [ ] canonical 설정
- [ ] OG 이미지 설정
- [ ] metadata 설정
- [ ] Organization/SoftwareApplication/FAQ schema 추가
- [ ] `/llms.txt` 추가
- [ ] `/llms-full.txt` 추가

### Week 2: 핵심 랜딩 페이지 제작

- [ ] `/ai-video-editor`
- [ ] `/ai-shorts-editor`
- [ ] `/ai-lecture-video-editor`
- [ ] `/ai-subtitle-generator`
- [ ] `/ai-solution-video-maker`
- [ ] `/pricing`
- [ ] `/how-it-works`

### Week 3: 콘텐츠 허브 제작

- [ ] 블로그 구조 생성
- [ ] 초기 글 5개 발행
- [ ] FAQ 30개 작성
- [ ] 비교 페이지 2개 작성
- [ ] 데모 영상 페이지 제작

### Week 4: GEO 외부 신호 구축

- [ ] 네이버 블로그 5개 발행
- [ ] YouTube 데모 영상 업로드
- [ ] GitHub README/소개 페이지 생성
- [ ] Product Hunt/LinkedIn 소개 페이지 준비
- [ ] 고객 사례 페이지 1개 작성
- [ ] AI 검색 결과 수동 테스트 시작

---

## 22. Cursor AI에게 전달할 구현 지시문

```text
너는 Next.js App Router 기반 SaaS 프론트엔드 개발자다.
아래 SEO/GEO 가이드라인에 따라 AI 영상편집 서비스의 검색 최적화 기본 구조를 구현해라.

필수 구현:
1. app/sitemap.ts 생성
2. app/robots.ts 생성
3. 전역 metadataBase 설정
4. 메인페이지 metadata 설정
5. 각 랜딩 페이지별 title/description/canonical 설정
6. Organization JSON-LD 컴포넌트 구현
7. SoftwareApplication JSON-LD 컴포넌트 구현
8. FAQPage JSON-LD 컴포넌트 구현
9. BreadcrumbList JSON-LD 컴포넌트 구현
10. /llms.txt, /llms-full.txt public 파일 생성
11. 공개 페이지와 비공개 앱 페이지의 index/noindex 정책 분리
12. OG 이미지 경로 연결
13. AI 영상편집, AI 쇼츠 편집, 강의 영상 편집 AI, AI 자막 생성기, 문제 해설 영상 제작 AI 랜딩 페이지 기본 구조 생성
14. 각 랜딩 페이지에 요약 박스, 기능 표, 사용법, FAQ 섹션 포함
15. SEO 이벤트 트래킹 hook을 만들고 CTA 클릭/데모 재생/회원가입/프로젝트 생성 이벤트를 기록할 수 있게 설계

주의사항:
- 관리자, 대시보드, 편집기, 결제, 사용자 프로젝트 페이지는 색인 금지한다.
- 중요한 랜딩 페이지 콘텐츠는 클라이언트 JS 로딩에 의존하지 말고 서버 렌더링 HTML에 포함한다.
- 구조화 데이터는 실제 화면에 보이는 내용과 일치해야 한다.
- 메인 카피는 추상적인 표현보다 서비스가 하는 일을 직접 설명해야 한다.
```

---

## 23. 운영 체크리스트

### 23.1 배포 전

- [ ] `site:도메인`으로 Google 색인 여부 확인
- [ ] Search Console URL Inspection 확인
- [ ] Rich Results Test로 구조화 데이터 검증
- [ ] robots.txt 테스트
- [ ] sitemap 제출
- [ ] Naver Search Advisor 소유 확인
- [ ] Bing Webmaster Tools 소유 확인
- [ ] OG 이미지 미리보기 확인
- [ ] 모바일 렌더링 확인
- [ ] Lighthouse 점수 확인
- [ ] noindex 실수 확인

### 23.2 배포 후 매주

- [ ] Search Console 검색어 확인
- [ ] 색인 제외 페이지 확인
- [ ] CTR 낮은 페이지 title/description 개선
- [ ] AI 검색 수동 질의 테스트
- [ ] 블로그 2개 이상 발행
- [ ] 네이버 블로그 1개 이상 발행
- [ ] FAQ 추가
- [ ] 고객 사례/데모 추가

### 23.3 매월

- [ ] 핵심 키워드 순위 점검
- [ ] AI 검색 언급 여부 점검
- [ ] 외부 브랜드 언급량 점검
- [ ] 전환율 높은 페이지 분석
- [ ] 전환율 낮은 페이지 리라이팅
- [ ] 경쟁사 비교 페이지 업데이트
- [ ] 가격/기능 변경 시 schema 업데이트

---

## 24. 주의해야 할 것

### 24.1 AI 대량 생성 블로그를 남발하지 말 것

Google은 사용자에게 도움이 되는 사람 중심 콘텐츠를 강조한다. 자동화/AI를 사용할 수는 있지만, 검색 순위 조작만을 목적으로 대량 생산된 낮은 품질 콘텐츠는 위험하다.

### 24.2 모든 페이지를 색인시키지 말 것

색인 대상:

```text
랜딩 페이지
기능 페이지
사용 사례 페이지
비교 페이지
블로그
도움말
정책 페이지
```

색인 제외:

```text
로그인 후 대시보드
영상 편집기
결제 완료 페이지
관리자 페이지
사용자 프로젝트
API 응답
임시 렌더링 파일
```

### 24.3 GEO 꼼수에 의존하지 말 것

`llms.txt`나 AI 전용 메타파일만으로 AI 검색 노출이 보장되지 않는다. 핵심은 다음이다.

- 검색 가능한 공개 페이지
- 명확한 브랜드 설명
- 사용 사례별 구체적 콘텐츠
- FAQ와 비교표
- 외부 언급
- 신뢰 가능한 사용자 사례
- 기술적으로 크롤링 가능한 구조

---

## 25. 참고 자료

- Google Search Central, SEO Starter Guide  
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide

- Google Search Central, AI features and your website  
  https://developers.google.com/search/docs/appearance/ai-features

- Google Search Central, Creating helpful, reliable, people-first content  
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content

- Google Search Central, Introduction to structured data  
  https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

- OpenAI, Overview of OpenAI Crawlers  
  https://developers.openai.com/api/docs/bots

- Naver Search Advisor, 웹마스터 가이드  
  https://searchadvisor.naver.com/guide

- Naver Search Advisor, 검색엔진 최적화의 목적  
  https://searchadvisor.naver.com/guide/seo-basic-intro

- IndexNow official site  
  https://www.indexnow.org/

- GEO: Generative Engine Optimization, arXiv  
  https://arxiv.org/abs/2311.09735

---

## 26. 최종 권장 실행 순서

1. `robots.txt`, `sitemap.xml`, metadata, canonical, OG 이미지부터 세팅한다.
2. Google/Naver/Bing 웹마스터 도구에 사이트를 등록한다.
3. 메인페이지와 5개 핵심 랜딩을 만든다.
4. 각 랜딩에 요약 박스, FAQ, 비교표, 기능표, JSON-LD를 넣는다.
5. `/llms.txt`, `/llms-full.txt`를 보조적으로 추가한다.
6. AI 영상편집 관련 블로그/도움말/비교글을 주 2~3개씩 발행한다.
7. 네이버 블로그와 YouTube 데모 영상으로 국내 외부 신호를 만든다.
8. ChatGPT, Perplexity, Gemini, Copilot에서 매주 직접 질의해 브랜드 언급 여부를 기록한다.
9. 검색 유입이 회원가입·프로젝트 생성·결제까지 이어지는지 이벤트 트래킹으로 확인한다.
10. 전환율이 높은 키워드 클러스터를 기준으로 랜딩 페이지를 확장한다.

