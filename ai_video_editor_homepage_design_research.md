# AI 자동 영상편집 서비스 메인페이지 디자인 리서치 & 프론트엔드 설계안

> 목적: 사용자가 `영상 제목 + 영상 내용 + 원본 영상 + 원하는 편집 스타일`만 입력하면 AI가 자동 편집하고, 결과를 실시간으로 보여주는 AI 영상편집 SaaS의 **판매 전환형 메인페이지**를 설계한다.  
> 대상: Cursor AI / 프론트엔드 개발자 / 디자이너 / PO  
> 작성 기준: 국내·해외 AI 영상 서비스 레퍼런스, 고객 페인포인트, 전환형 SaaS 랜딩페이지 구조, 노바AI식 교육/콘텐츠 제작 확장 가능성

---

## 0. 결론 요약

이 서비스의 메인페이지는 단순히 “AI 영상편집기”라고 말하면 안 된다. 이미 CapCut, Vrew, VEED, Descript, Captions, OpusClip 같은 강력한 경쟁자가 있다. 따라서 메인페이지의 핵심 메시지는 다음처럼 잡아야 한다.

```text
영상 제목과 원본 영상만 넣으세요.
AI가 컷편집, 자막, B-roll, 줌인, BGM까지 적용한 편집본을 바로 보여드립니다.
```

가장 중요한 UX 포인트는 **“실제로 바로 만들어지는 것처럼 보이는 인터랙티브 히어로 데모”**이다.

메인페이지 첫 화면에서 사용자가 바로 이해해야 하는 것은 세 가지다.

1. 무엇을 넣는가?
   - 제목
   - 영상 설명
   - 원본 영상
   - 원하는 편집 스타일

2. AI가 무엇을 해주는가?
   - 핵심 구간 추출
   - 컷편집
   - 자동 자막
   - B-roll 추천
   - 줌인/전환/음악 적용
   - 숏폼/유튜브/강의 영상 변환

3. 결과가 어떻게 보이는가?
   - 오른쪽에 9:16 영상 프리뷰
   - 아래에 자동 생성된 타임라인
   - 옆에 자연어 수정 명령창
   - “자막 크게”, “인트로 삭제”, “더 빠르게” 같은 명령 예시

---

## 1. 시장 레퍼런스 조사

### 1.1 해외 레퍼런스

| 서비스 | 메인 카피/포지셔닝 | 강점 | 우리가 배울 점 | 우리가 피해야 할 점 |
|---|---|---|---|---|
| Captions | AI that edits like a professional editor would | AI가 전체 영상을 스타일 기반으로 편집한다는 메시지가 강함 | “전문 편집자처럼 편집”이라는 결과 중심 메시지 | 너무 크리에이터 앱처럼 보이면 교육/비즈니스 고객에게 가벼워 보일 수 있음 |
| Descript | AI Video Editor / video editing is as easy as typing | 텍스트 기반 편집, AI co-editor, 기업 신뢰도 | “문서 편집처럼 쉬운 영상 편집” 메시지 | 기능이 많아 초반 인지가 복잡함 |
| VEED | AI video creation, made for social | 브랜드 영상, 소셜 영상, 빠른 제작 강조 | “AI 티 안 나는 브랜드 영상” 메시지 | 너무 일반적인 소셜 영상 플랫폼으로 보일 수 있음 |
| OpusClip | 1 long video, 10 viral clips | 긴 영상을 쇼츠로 바꾸는 가치가 매우 직관적 | 수치형 결과 약속: “긴 영상 1개 → 쇼츠 10개” | 바이럴 약속이 과하면 신뢰 하락 가능 |
| Runway | Building AI to Simulate the World | 고급 생성형 영상, 시네마틱, AI 연구 이미지 | 프리미엄/미래지향적 브랜드 톤 | 초보자에게 어렵고 추상적으로 보일 수 있음 |
| Riverside | Record, edit, repurpose, distribute | 콘텐츠 제작 전체 플로우 | “기록→편집→재활용→배포” end-to-end 구조 | 영상편집 단독 메시지가 약해질 수 있음 |

#### Captions에서 배울 점

Captions는 “AI가 전문 편집자처럼 편집한다”는 문장을 히어로 카피로 사용한다. 또한 사용자는 영상을 드래그하고 스타일을 고른 뒤 AI가 컷, B-roll, 자막 등을 처리한다는 흐름을 보여준다. Captions의 강점은 단순히 자막 툴이 아니라 **전체 편집을 AI가 처리하는 서비스**로 포지셔닝한다는 점이다.

우리 서비스에 적용할 메시지:

```text
전문 편집자에게 맡기듯, 원하는 스타일만 말하세요.
AI가 컷편집부터 자막, B-roll, BGM까지 편집본을 완성합니다.
```

#### Descript에서 배울 점

Descript는 “영상 편집을 문서 편집처럼”이라는 비유가 강하다. 사용자가 어려운 타임라인을 직접 만지는 대신 텍스트를 수정하듯 편집할 수 있다는 점을 계속 강조한다.

우리 서비스에 적용할 메시지:

```text
복잡한 타임라인 대신, 말로 편집하세요.
“인트로 지워줘”, “자막 크게”, “더 빠른 템포로”라고 입력하면 AI가 바로 수정합니다.
```

#### VEED에서 배울 점

VEED는 “social-ready”, “brand-ready”라는 표현을 강하게 사용한다. 즉 단순 편집보다 **바로 업로드할 수 있는 결과물**에 초점을 둔다.

우리 서비스에 적용할 메시지:

```text
편집만 하는 것이 아니라, 바로 올릴 수 있는 영상으로 완성합니다.
```

#### OpusClip에서 배울 점

OpusClip은 “긴 영상 1개 → 바이럴 쇼츠 10개”라는 결과가 매우 명확하다. 사용자가 얻는 산출물을 숫자로 보여준다.

우리 서비스에 적용할 메시지:

```text
강의 영상 1개로 쇼츠 10개를 자동 생성하세요.
```

단, “바이럴” 같은 표현은 국내 교육/비즈니스 고객에게 과장으로 보일 수 있으므로 “업로드용 쇼츠”, “SNS용 클립”, “홍보용 릴스” 정도가 더 적절하다.

#### Runway에서 배울 점

Runway는 프리미엄 AI 브랜드 이미지를 구축한다. 하지만 메인페이지가 추상적이기 때문에 초보 사용자는 “그래서 내가 뭘 할 수 있지?”를 바로 이해하기 어렵다.

우리 서비스는 Runway처럼 너무 추상적인 메시지를 쓰면 안 된다. 메인페이지 첫 화면에서는 반드시 구체적 결과물을 보여줘야 한다.

#### Riverside에서 배울 점

Riverside는 “기록, 편집, 재활용, 배포”라는 전체 콘텐츠 워크플로우를 보여준다. 우리 서비스도 장기적으로는 “업로드 → AI 편집 → 미리보기 → 수정 → 다운로드/배포” 전체 플로우를 보여줘야 한다.

---

### 1.2 국내/한국어권 레퍼런스

| 서비스 | 포지셔닝 | 강점 | 우리가 배울 점 |
|---|---|---|---|
| Vrew | 누구나 영상 편집을 쉽고 즐겁게 | 자동 자막, 문서 편집 같은 컷편집, AI 목소리, 텍스트→비디오 | “쉬움”을 극대화하는 한국어 카피 |
| Videostew | AI가 복잡함을 처리하고 사용자는 제작에 집중 | 클라우드 기반 실시간 미리보기/렌더링, 템플릿, 위저드 모드 | “브라우저에서 바로 만드는 영상” 메시지 |
| MiriCanvas | 템플릿 기반 디자인/영상 제작 | 방대한 템플릿, 쉬운 디자인, 브랜드 친숙성 | AI보다 “쉽고 예쁜 결과물”을 먼저 보여줌 |
| Typecast | AI 보이스/캐릭터 중심 | 음성, 캐릭터, 대본 기반 영상 | 편집 서비스와 결합 시 AI 음성/나레이션 확장 가능 |

#### Vrew에서 배울 점

Vrew는 한국 사용자에게 매우 잘 먹히는 단어를 쓴다.

- 누구나
- 쉽고
- 즐겁게
- 문서 편집처럼
- 반복 재생 없이
- 저작권 걱정 없이

우리 서비스도 국내 고객에게는 “AI가 대단하다”보다 “내가 편하다”를 강조해야 한다.

적용 카피:

```text
영상 편집을 배울 필요 없이,
원하는 스타일만 말하면 AI가 알아서 편집합니다.
```

```text
일일이 돌려보며 자를 필요 없이,
AI가 핵심 장면을 찾아 쇼츠로 정리합니다.
```

#### Videostew에서 배울 점

Videostew는 “고성능 PC 없이 브라우저만 있으면 된다”, “클라우드 기반 실시간 미리보기와 렌더링”을 강조한다. 우리 서비스의 실시간 프리뷰 컨셉과 가장 가까운 국내 레퍼런스다.

적용 카피:

```text
설치 없이 브라우저에서 바로 편집하고,
AI 편집 결과를 실시간으로 확인하세요.
```

#### MiriCanvas에서 배울 점

MiriCanvas는 “AI”를 전면에 내세우기보다, 사용자가 얻는 시각적 결과와 템플릿을 보여준다. AI 편집 서비스도 메인페이지에서 “AI 기술”을 설명하기보다 결과물 썸네일, 스타일 카드, 템플릿 미리보기를 보여줘야 한다.

---

## 2. 고객 페인포인트 조사

### 2.1 공통 페인포인트

고객이 영상편집에서 느끼는 가장 큰 문제는 다음이다.

| 페인포인트 | 고객의 실제 생각 | 메인페이지에서 해결해야 할 메시지 |
|---|---|---|
| 편집을 배워야 한다 | 프리미어, 캡컷, 다빈치 모두 공부해야 해서 귀찮다 | “편집툴을 배울 필요 없이, 말로 편집하세요” |
| 시간이 너무 오래 걸린다 | 10분 영상을 쇼츠 하나로 만드는 데 1~2시간 걸린다 | “긴 영상 1개를 업로드용 쇼츠 여러 개로 자동 생성” |
| 자막 작업이 귀찮다 | 말 하나하나 듣고 자막을 고치는 게 지루하다 | “자동 자막 + 강조 자막 + 스타일 자막까지 한 번에” |
| 어디를 잘라야 할지 모르겠다 | 어떤 부분이 핵심인지 판단하기 어렵다 | “AI가 핵심 구간을 찾아 컷편집” |
| B-roll/이미지/효과 넣기가 어렵다 | 영상이 밋밋한데 뭘 넣어야 할지 모르겠다 | “내용에 맞는 B-roll과 화면 효과 자동 추천” |
| 스타일을 맞추기 어렵다 | 폰트, 색, 자막 위치가 매번 달라진다 | “브랜드/강의/쇼츠 스타일 프리셋 적용” |
| AI 결과물이 촌스럽다 | AI 티 나거나 템플릿이 너무 뻔하다 | “AI 티 안 나는 깔끔한 영상 스타일” |
| 저작권이 걱정된다 | BGM, 이미지, 효과음을 써도 되는지 불안하다 | “상업적 사용 가능한 소스/직접 업로드 소스 구분” |
| 렌더링/업로드가 무겁다 | PC가 느리고, 파일이 크고, 오류가 난다 | “브라우저 기반 프리뷰 + 클라우드 렌더링” |
| 결과 수정이 어렵다 | AI가 만든 결과를 내가 원하는 대로 바꾸기 어렵다 | “채팅으로 수정: 자막 크게, 인트로 삭제, 더 빠르게” |

---

### 2.2 타깃별 페인포인트

#### A. 학원 선생님 / 강사

가장 유망한 초기 타깃이다. 노바AI의 기존 고객층과 겹친다.

| 상황 | 페인포인트 | 필요한 기능 |
|---|---|---|
| 강의 영상을 올려야 함 | 긴 강의에서 홍보용 클립을 만들 시간이 없음 | 긴 강의 → 쇼츠 자동 생성 |
| 문제 풀이 콘텐츠를 만들고 싶음 | 문제 이미지, 해설, 음성을 영상으로 구성하기 어려움 | 문제/PDF → 해설 영상 자동 생성 |
| 인스타/유튜브 쇼츠 홍보 필요 | 어떤 부분을 잘라야 홍보가 될지 모름 | AI 핵심 구간 추천 |
| 얼굴 노출 부담 | 직접 말하거나 찍기 부담스러움 | AI 음성/나레이션 |
| 자막 품질 중요 | 수식/용어가 틀리면 신뢰도 하락 | 교육 특화 자막 검수 UI |

추천 메인페이지 문구:

```text
강의 영상 하나로 홍보용 쇼츠를 자동 생성하세요.
AI가 핵심 설명 구간을 찾고, 자막과 강조 효과까지 적용합니다.
```

#### B. 1인 크리에이터 / 유튜버

| 상황 | 페인포인트 | 필요한 기능 |
|---|---|---|
| 롱폼을 쇼츠로 재활용 | 클립 선별이 오래 걸림 | AI 하이라이트 추출 |
| 자막 스타일 필요 | 자막이 촌스럽거나 일관성이 없음 | 트렌디 자막 프리셋 |
| 업로드 빈도 압박 | 편집 시간이 콘텐츠 생산을 막음 | 대량 자동 편집 |
| 소셜별 포맷 필요 | YouTube, Reels, TikTok 비율이 다름 | 9:16/1:1/16:9 자동 변환 |

추천 문구:

```text
롱폼 하나로 쇼츠 여러 개를 만드세요.
AI가 사람들이 볼 만한 순간을 찾아 바로 업로드 가능한 영상으로 편집합니다.
```

#### C. 스타트업 / 마케터 / 쇼핑몰

| 상황 | 페인포인트 | 필요한 기능 |
|---|---|---|
| 제품 홍보 영상 필요 | 외주 비용이 부담 | 제품 소개 템플릿 |
| 광고 소재를 많이 테스트해야 함 | 여러 버전 제작 시간이 부족 | 스타일/카피별 버전 생성 |
| 브랜드 통일성 필요 | 폰트, 로고, 색상 일관성 필요 | 브랜드 키트 |
| UGC 광고 제작 | 숏폼 광고를 빠르게 만들어야 함 | AI UGC 스타일 |

추천 문구:

```text
광고 소재를 편집자 없이 빠르게 테스트하세요.
제품 영상 하나로 여러 스타일의 숏폼 광고를 자동 생성합니다.
```

#### D. 기업 교육 / 세미나 / 웨비나

| 상황 | 페인포인트 | 필요한 기능 |
|---|---|---|
| 긴 웨비나를 재활용 | 핵심 장면 추출이 오래 걸림 | 챕터/하이라이트 자동 생성 |
| 내부 교육 영상 제작 | 편집 인력이 부족 | 자막 + 요약 + 챕터 |
| 다국어 배포 | 번역 자막 필요 | 번역 자막/더빙 |

추천 문구:

```text
긴 세미나와 웨비나를 교육용 클립으로 자동 정리하세요.
```

---

## 3. 메인페이지 최종 디자인 방향

### 3.1 브랜드 톤

권장 방향:

```text
깔끔한 생산성 SaaS + 영상 프리뷰 중심 + AI co-editor 느낌
```

참고 감성:

- Toss: 신뢰감, 단순함, 넓은 여백
- Linear: 고급 SaaS, 정교함, 다크/라이트 대비
- VEED: 소셜 콘텐츠 친화적
- Descript: 문서 편집처럼 쉬운 도구감
- Captions: AI가 실제로 편집해주는 마법감
- Vrew: 한국 사용자에게 친숙한 쉬운 카피

피해야 할 방향:

- 과도한 네온/사이버펑크
- AI 뇌, 로봇, 회로 이미지 남발
- 추상적인 “미래를 창조하세요”류 카피
- 실제 결과물을 보여주지 않는 감성형 랜딩
- 기능을 너무 많이 나열하는 복잡한 페이지

---

### 3.2 핵심 한 문장

가장 추천하는 메인 카피:

```text
영상만 올리면, AI가 편집본을 바로 보여드립니다.
```

보조 문구:

```text
제목, 내용, 스타일만 입력하세요.
AI가 핵심 장면을 찾고 컷편집, 자막, B-roll, BGM까지 적용해 바로 업로드 가능한 영상으로 완성합니다.
```

CTA:

```text
무료로 AI 편집 시작하기
```

보조 CTA:

```text
예시 결과물 보기
```

---

### 3.3 카피 후보

#### 범용형

```text
영상만 올리면, AI가 편집본을 바로 보여드립니다.
```

```text
복잡한 타임라인은 AI에게 맡기고,
당신은 원하는 스타일만 말하세요.
```

```text
제목과 원본 영상만 넣으면
컷편집, 자막, B-roll, BGM까지 한 번에 완성됩니다.
```

#### 쇼츠 특화형

```text
긴 영상 하나로 쇼츠 여러 개를 자동 생성하세요.
```

```text
AI가 사람들이 볼 만한 순간을 찾아
바로 업로드 가능한 숏폼으로 편집합니다.
```

#### 교육/강사 특화형

```text
강의 영상 하나로 홍보용 쇼츠를 자동 생성하세요.
```

```text
문제 풀이, 개념 설명, 강의 하이라이트를
AI가 자막과 강조 효과가 들어간 영상으로 완성합니다.
```

#### 비즈니스/마케팅 특화형

```text
편집자 없이 광고 소재를 빠르게 만드세요.
```

```text
제품 영상 하나로 여러 스타일의 숏폼 광고를 자동 생성합니다.
```

---

## 4. 메인페이지 정보 구조

### 4.1 전체 섹션 구성

```text
1. Header
2. Hero Section
3. Interactive AI Editing Demo
4. Pain Point Section
5. How It Works
6. Use Case Cards
7. Style Preset Gallery
8. Natural Language Editing Section
9. Before / After Results
10. Trust & Safety
11. Pricing Preview
12. FAQ
13. Final CTA
14. Footer
```

---

## 5. 섹션별 상세 설계

### 5.1 Header

#### 목적

사용자가 들어오자마자 서비스가 신뢰 가능한 SaaS임을 느끼게 한다.

#### 구성

```text
좌측: 로고
중앙: 기능 / 사용 예시 / 요금제 / 고객사례 / FAQ
우측: 로그인 / 무료로 시작하기
```

#### 권장 스타일

- 흰색 또는 반투명 sticky header
- 하단 border: #EEF1F5
- CTA 버튼은 항상 보이게 유지
- 모바일에서는 햄버거 메뉴 + 고정 CTA

#### Header CTA

```text
무료로 시작하기
```

또는

```text
영상 업로드하기
```

---

### 5.2 Hero Section

#### 목적

3초 안에 “내가 뭘 넣으면 어떤 결과가 나오는지” 이해시킨다.

#### 권장 레이아웃

```text
왼쪽:
- 큰 헤드라인
- 보조 설명
- CTA 2개
- 신뢰 배지

오른쪽:
- 실제 편집 데모 UI
- 9:16 영상 프리뷰
- AI 명령창
- 자동 생성 타임라인
```

#### Hero 텍스트

```text
영상만 올리면,
AI가 편집본을 바로 보여드립니다.
```

```text
제목, 내용, 스타일만 입력하세요.
AI가 핵심 장면을 찾고 컷편집, 자막, B-roll, BGM까지 적용해
바로 업로드 가능한 영상으로 완성합니다.
```

#### 신뢰 배지 예시

```text
설치 없음
브라우저 편집
자동 자막
쇼츠 변환
상업용 소스 지원
```

#### CTA

Primary:

```text
무료로 AI 편집 시작하기
```

Secondary:

```text
예시 결과물 보기
```

---

### 5.3 Interactive AI Editing Demo

이 섹션이 메인페이지의 핵심이다. 사용자는 실제 제품을 쓰기 전부터 “아, 이런 식으로 작동하는구나”를 봐야 한다.

#### 데모 UI 구조

```text
[입력 패널]        [AI 작업 상태]        [영상 프리뷰]
제목 입력          분석 중...             9:16 영상
영상 설명          핵심 구간 추출          자동 자막
스타일 선택        자막 생성              줌인 효과
파일 업로드        B-roll 추천            타임라인
```

#### 데모 상태 전환

```text
1. 영상 업로드됨
2. AI가 내용을 분석 중
3. 핵심 장면 5개 발견
4. 자동 자막 생성 완료
5. B-roll 3개 삽입
6. 편집본 미리보기 준비 완료
```

#### 화면 안에 들어갈 예시 입력

```text
제목: 수능 물리 등가속도 3분 정리
내용: 등가속도 공식과 그래프 해석을 빠르게 설명하는 쇼츠
스타일: 깔끔한 강의 쇼츠, 큰 자막, 파란 강조색
```

#### 화면 안에 들어갈 AI 명령 예시

```text
자막을 더 크게 해줘
인트로 2초 삭제해줘
더 빠른 템포로 바꿔줘
문제 이미지를 더 크게 보여줘
BGM을 줄여줘
```

---

### 5.4 Pain Point Section

#### 목적

사용자가 “이거 내 문제네”라고 느끼게 한다.

#### 권장 카피

```text
영상 편집, 아직도 이렇게 하고 있나요?
```

#### 카드 구성

| 카드 제목 | 설명 | 해결 메시지 |
|---|---|---|
| 어디를 잘라야 할지 모르겠어요 | 긴 영상에서 핵심 장면을 찾는 데 시간이 오래 걸립니다 | AI가 핵심 구간을 자동으로 찾습니다 |
| 자막 넣기가 너무 귀찮아요 | 음성을 듣고 자막을 만들고 싱크를 맞춰야 합니다 | 자동 자막과 강조 자막을 생성합니다 |
| 영상이 너무 밋밋해요 | 줌인, B-roll, 효과를 어디에 넣어야 할지 모릅니다 | AI가 내용에 맞는 화면 효과를 추천합니다 |
| 편집툴이 너무 어려워요 | 타임라인, 키프레임, 프리셋이 복잡합니다 | 채팅으로 편집을 수정합니다 |
| 스타일이 매번 달라요 | 폰트, 색상, 자막 위치가 통일되지 않습니다 | 브랜드/강의 스타일을 저장합니다 |
| 렌더링이 오래 걸려요 | PC 성능에 따라 작업이 느려집니다 | 클라우드에서 렌더링합니다 |

---

### 5.5 How It Works

#### 권장 제목

```text
세 단계면 편집본이 완성됩니다.
```

#### 3단계 구성

```text
1. 영상과 설명을 업로드
제목, 내용, 원본 영상을 넣고 원하는 스타일을 선택합니다.

2. AI가 자동 편집
핵심 장면, 자막, B-roll, 줌인, BGM, 전환을 자동으로 구성합니다.

3. 미리보고 말로 수정
결과를 확인하고 “자막 크게”, “인트로 삭제”처럼 말로 수정합니다.
```

#### 시각적 표현

- Step 1: 업로드 카드
- Step 2: AI 분석 애니메이션
- Step 3: 영상 프리뷰 + 채팅 명령

---

### 5.6 Use Case Cards

#### 목적

방문자가 “이 서비스가 내 용도에도 맞네”라고 느끼게 한다.

#### 추천 카드

1. 강의/학원 쇼츠
2. 유튜브 롱폼 재활용
3. 제품/브랜드 광고
4. 세미나/웨비나 요약
5. 인터뷰/팟캐스트 클립
6. PDF/자료 기반 해설 영상

#### 카드 예시

```text
강의 영상 → 홍보 쇼츠
긴 강의에서 핵심 설명 구간을 찾아 자막과 강조 효과가 들어간 쇼츠로 변환합니다.
```

```text
제품 영상 → 광고 소재
제품 소개 영상을 여러 스타일의 숏폼 광고로 자동 편집합니다.
```

```text
PDF 자료 → 해설 영상
문서나 자료를 기반으로 대본, 나레이션, 자막이 들어간 영상으로 생성합니다.
```

---

### 5.7 Style Preset Gallery

#### 목적

사용자가 “내가 원하는 느낌을 고를 수 있다”는 감각을 준다.

#### 추천 스타일 프리셋

| 스타일명 | 설명 |
|---|---|
| 깔끔한 강의 쇼츠 | 흰 배경, 큰 자막, 핵심 키워드 강조 |
| 인스타 릴스 스타일 | 빠른 템포, 큰 자막, 강한 전환 |
| 토스형 미니멀 | 넓은 여백, 파란 강조, 부드러운 모션 |
| 유튜브 정보형 | 챕터, 요약 박스, 하단 자막 |
| 제품 광고형 | 제품 클로즈업, CTA, 브랜드 컬러 |
| 인터뷰 클립형 | 얼굴 자동 크롭, 하이라이트 자막 |
| 뉴스/리포트형 | 상단 타이틀, 자료 화면, 차분한 내레이션 |
| PDF 해설형 | 문서 확대, 밑줄, 포인터, 단계별 설명 |

#### UI 형태

- 카드형 갤러리
- 각 카드 안에 3~5초 미리보기 GIF 또는 비디오
- 선택 시 오른쪽 프리뷰가 스타일에 맞게 바뀌는 듯한 인터랙션

---

### 5.8 Natural Language Editing Section

#### 목적

서비스의 차별점을 보여준다. 단순 자동 생성이 아니라 사용자가 원하는 대로 수정 가능해야 한다.

#### 권장 제목

```text
복잡한 버튼 대신, 말로 편집하세요.
```

#### 예시 명령

```text
“자막을 더 크게 해줘”
“인트로는 빼고 바로 본론으로 시작해줘”
“강의 느낌보다 광고 느낌으로 바꿔줘”
“문제 이미지를 2초 더 오래 보여줘”
“BGM을 조금 줄이고 목소리를 더 선명하게 해줘”
“마지막에 상담 신청 CTA를 넣어줘”
```

#### UI 표현

```text
왼쪽: 영상 프리뷰
오른쪽: 채팅창
하단: 타임라인 변경 전후 비교
```

#### 핵심 메시지

```text
AI가 만든 편집본을 그대로 쓰지 않아도 됩니다.
원하는 수정사항을 말하면 타임라인이 바로 바뀝니다.
```

---

### 5.9 Before / After Section

#### 목적

서비스의 가치를 가장 직관적으로 증명한다.

#### 구성

```text
Before:
- 긴 원본 영상
- 무음 구간
- 자막 없음
- 밋밋한 화면

After:
- 핵심 구간만 컷편집
- 큰 자막
- 줌인/강조 효과
- B-roll 삽입
- 바로 업로드 가능
```

#### UI 방식

- before/after 슬라이더
- 2개 영상 나란히 재생
- 타임라인 차이 표시
- “AI가 적용한 편집” 체크리스트 표시

#### 체크리스트 예시

```text
✓ 핵심 구간 4개 추출
✓ 무음 구간 18초 제거
✓ 자동 자막 32개 생성
✓ 강조 키워드 7개 표시
✓ B-roll 3개 삽입
✓ 9:16 쇼츠 포맷 변환
```

---

### 5.10 Trust & Safety

#### 목적

영상 서비스는 개인정보, 저작권, 원본 파일, 업로드 보안에 대한 불안이 크다. 특히 CapCut류 서비스의 약관/데이터 이슈가 이탈 요인이 될 수 있다.

#### 권장 제목

```text
내 영상과 자료는 안전하게 처리됩니다.
```

#### 포함할 메시지

```text
원본 파일은 사용자 프로젝트 안에서만 사용됩니다.
상업용 소스와 사용자 업로드 소스를 구분합니다.
결과물을 다운로드하기 전까지 언제든 삭제할 수 있습니다.
브랜드/강의 자료는 외부에 공개되지 않습니다.
```

#### 신뢰 요소

- 데이터 보호 정책 링크
- 저작권 안내
- 콘텐츠 삭제 정책
- 결제/환불 정책
- 기업/학원 전용 문의

---

### 5.11 Pricing Preview

메인페이지에서 가격을 너무 깊게 설명할 필요는 없다. 단, “시작 가능성”은 보여줘야 한다.

#### 권장 구성

```text
무료 체험
- 첫 영상 생성 무료 또는 무료 크레딧
- 워터마크 있음/없음 정책 명확화

Creator
- 월 N개 영상
- 1080p 다운로드
- 자막/쇼츠 자동 편집

Pro
- 더 많은 렌더링 시간
- 브랜드 키트
- 팀 기능
- 고화질 다운로드

Business
- 대량 생성
- 학원/기업 전용
- API/관리자 기능
```

#### 메인 카피

```text
먼저 무료로 편집 결과를 확인해보세요.
결과가 마음에 들 때만 고화질로 다운로드하세요.
```

---

### 5.12 FAQ

필수 FAQ:

```text
Q. 영상 편집을 몰라도 사용할 수 있나요?
A. 네. 제목, 설명, 스타일만 입력하면 AI가 편집본을 만들고, 수정도 자연어로 할 수 있습니다.

Q. 어떤 영상을 올릴 수 있나요?
A. 강의, 인터뷰, 제품 영상, 세미나, 유튜브 롱폼, 숏폼 원본 등을 지원하는 방향으로 설계합니다.

Q. 결과물을 바로 다운로드할 수 있나요?
A. 미리보기에서 수정한 뒤 MP4로 렌더링하여 다운로드할 수 있습니다.

Q. AI가 만든 결과를 수정할 수 있나요?
A. 네. “자막 크게”, “인트로 삭제”, “더 빠르게”처럼 채팅으로 수정할 수 있습니다.

Q. 상업적으로 사용해도 되나요?
A. 사용자가 직접 업로드한 원본은 사용자의 책임 범위에서 사용하며, 서비스 제공 소스는 라이선스 기준을 명확히 표시합니다.

Q. 원본 영상은 안전하게 보관되나요?
A. 원본 파일 보관 기간, 삭제 기능, 비공개 처리 정책을 명확히 제공해야 합니다.
```

---

## 6. 디자인 시스템 제안

### 6.1 컬러 방향

#### 기본 방향

```text
전체: 화이트/오프화이트 기반
포인트: 선명한 블루 또는 블루-퍼플 그라데이션
텍스트: 거의 검정에 가까운 네이비
보조 배경: 연한 블루 그레이
```

#### 추천 토큰

```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-soft: #F7F9FC;
  --color-bg-blue: #F2F7FF;

  --color-text-primary: #0B1220;
  --color-text-secondary: #5B667A;
  --color-text-muted: #8A94A6;

  --color-primary: #2563FF;
  --color-primary-hover: #174FE0;
  --color-primary-soft: #EAF1FF;

  --color-accent-purple: #7C3AED;
  --color-accent-cyan: #18BFFF;

  --color-border: #E6EAF0;
  --color-card: #FFFFFF;

  --shadow-card: 0 20px 60px rgba(15, 23, 42, 0.08);
}
```

#### 피해야 할 컬러

- 너무 강한 형광 네온
- 검정 배경 + 보라색 그라데이션만 있는 흔한 AI SaaS 톤
- 영상 편집툴처럼 너무 복잡한 다크 UI만 전면 배치

메인페이지는 신뢰와 쉬움을 줘야 하므로 **라이트 모드 기반**이 좋다. 단, 영상 프리뷰나 에디터 mockup 내부만 다크 UI로 만들면 전문성이 살아난다.

---

### 6.2 타이포그래피

#### 한국어 폰트

```text
Pretendard
```

#### 영문/숫자

```text
Inter
```

#### 권장 크기

```css
.hero-title {
  font-size: clamp(44px, 6vw, 76px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.section-title {
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.15;
  letter-spacing: -0.035em;
  font-weight: 800;
}

.body {
  font-size: 16px;
  line-height: 1.7;
}
```

#### 카피 스타일

- 짧고 명확하게
- 기술어보다 결과어
- “AI 기반 멀티모달 타임라인 생성” 같은 표현 금지
- “AI가 편집본을 바로 보여드립니다”처럼 사용자 결과 중심

---

### 6.3 컴포넌트 스타일

#### Button

```text
Primary:
- 배경: #2563FF
- 글자: white
- radius: 999px
- 높이: 52px
- padding: 0 28px
- hover: 살짝 위로 이동 + 그림자

Secondary:
- 배경: white
- border: #E6EAF0
- 글자: #0B1220
```

#### Card

```text
- 배경: white
- border: 1px solid #E6EAF0
- radius: 24px
- shadow: soft
- hover: translateY(-4px)
```

#### Video Preview

```text
- 9:16 phone mockup
- 둥근 모서리 32px
- 내부 영상 mockup
- 자동 자막 overlay
- 진행 바
- AI가 적용한 효과 chip
```

#### Timeline Strip

```text
- 가로형 블록
- Scene 1, Scene 2, Scene 3
- 자막 레이어, BGM 레이어, B-roll 레이어
- AI가 자동 생성한 듯한 색상 구분
```

---

## 7. 메인페이지 Hero Mockup 상세

### 7.1 Hero 오른쪽 데모 구조

```text
┌─────────────────────────────────────┐
│ AI 편집 브리프                       │
│ 제목: 수능 물리 등가속도 3분 정리      │
│ 내용: 공식과 그래프를 빠르게 설명      │
│ 스타일: 깔끔한 강의 쇼츠              │
│ [영상 3개 업로드됨]                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ AI가 편집 중                         │
│ ✓ 핵심 장면 분석 완료                 │
│ ✓ 무음 구간 제거                      │
│ ✓ 자막 생성 완료                      │
│ ✓ B-roll 추천                         │
└─────────────────────────────────────┘

┌───────────────┐
│ 9:16 Preview  │
│ 자동 자막      │
│ 줌인 효과      │
│ 문제 이미지     │
└───────────────┘

┌─────────────────────────────────────┐
│ Timeline: Intro | Explain | Example | CTA │
└─────────────────────────────────────┘
```

### 7.2 데모 애니메이션

#### 0~2초

입력 패널에 텍스트가 자동으로 타이핑된다.

```text
영상 제목: 강의 하이라이트 쇼츠 만들기
스타일: 빠른 템포, 큰 자막, 파란 강조색
```

#### 2~5초

업로드 카드가 나타난다.

```text
lecture_01.mp4
lecture_02.mp4
problem_image.png
```

#### 5~8초

AI 체크리스트가 순차적으로 완료된다.

```text
핵심 장면 찾는 중...
자막 생성 중...
편집 스타일 적용 중...
미리보기 준비 완료
```

#### 8초 이후

영상 프리뷰가 재생되고 타임라인이 움직인다.

---

## 8. 프론트엔드 컴포넌트 구조

### 8.1 권장 폴더 구조

```text
src/
  app/
    page.tsx
    pricing/
    examples/
    login/
    signup/

  components/
    landing/
      Header.tsx
      HeroSection.tsx
      HeroDemo.tsx
      PainPointSection.tsx
      HowItWorks.tsx
      UseCaseSection.tsx
      StylePresetGallery.tsx
      NaturalLanguageEditing.tsx
      BeforeAfterSection.tsx
      TrustSection.tsx
      PricingPreview.tsx
      FAQSection.tsx
      FinalCTA.tsx
      Footer.tsx

    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      VideoMockup.tsx
      TimelineStrip.tsx
      CommandChip.tsx
      SectionHeading.tsx

  data/
    landing-copy.ts
    style-presets.ts
    use-cases.ts
    faq.ts

  styles/
    globals.css
    tokens.css
```

---

### 8.2 데이터 분리 예시

`src/data/style-presets.ts`

```ts
export const stylePresets = [
  {
    id: "clean-lecture-shorts",
    title: "깔끔한 강의 쇼츠",
    description: "흰 배경, 큰 자막, 핵심 키워드 강조",
    tags: ["강의", "학원", "교육"],
    preview: "/videos/presets/clean-lecture.mp4",
  },
  {
    id: "fast-reels",
    title: "빠른 릴스 스타일",
    description: "빠른 컷, 강한 자막, 짧은 전환",
    tags: ["인스타", "쇼츠", "틱톡"],
    preview: "/videos/presets/fast-reels.mp4",
  },
  {
    id: "toss-minimal",
    title: "토스형 미니멀",
    description: "넓은 여백, 파란 강조, 부드러운 모션",
    tags: ["브랜드", "비즈니스"],
    preview: "/videos/presets/toss-minimal.mp4",
  },
  {
    id: "product-ad",
    title: "제품 광고형",
    description: "제품 클로즈업, CTA, 브랜드 컬러 적용",
    tags: ["광고", "커머스"],
    preview: "/videos/presets/product-ad.mp4",
  },
];
```

---

### 8.3 HeroSection 예시

```tsx
import { Button } from "@/components/ui/Button";
import { HeroDemo } from "@/components/landing/HeroDemo";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            AI 자동 편집 · 실시간 미리보기 · 쇼츠 변환
          </div>

          <h1 className="text-[48px] font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-950 md:text-[68px]">
            영상만 올리면,
            <br />
            AI가 편집본을
            <br />
            바로 보여드립니다.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            제목, 내용, 스타일만 입력하세요. AI가 핵심 장면을 찾고
            컷편집, 자막, B-roll, BGM까지 적용해 바로 업로드 가능한
            영상으로 완성합니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">무료로 AI 편집 시작하기</Button>
            <Button size="lg" variant="secondary">
              예시 결과물 보기
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
            <span>설치 없음</span>
            <span>·</span>
            <span>브라우저 편집</span>
            <span>·</span>
            <span>자동 자막</span>
            <span>·</span>
            <span>쇼츠 변환</span>
          </div>
        </div>

        <HeroDemo />
      </div>
    </section>
  );
}
```

---

### 8.4 HeroDemo 예시

```tsx
const steps = [
  "원본 영상 분석 중",
  "핵심 장면 5개 발견",
  "무음 구간 제거",
  "자동 자막 생성",
  "B-roll 추천",
  "미리보기 준비 완료",
];

export function HeroDemo() {
  return (
    <div className="relative rounded-[32px] border border-slate-200 bg-slate-950 p-4 shadow-2xl">
      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="rounded-3xl bg-white p-5">
          <p className="text-sm font-semibold text-slate-500">AI 편집 브리프</p>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">영상 제목</p>
              <p className="font-semibold text-slate-900">
                수능 물리 등가속도 3분 정리
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">편집 스타일</p>
              <p className="font-semibold text-blue-600">
                깔끔한 강의 쇼츠 · 큰 자막 · 파란 강조색
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {steps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-700"
              >
                <span>✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-black p-3">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-slate-800">
            <div className="absolute inset-x-4 bottom-16 rounded-xl bg-white/95 px-3 py-2 text-center text-sm font-bold text-slate-950">
              등가속도는 속도가 일정하게 변하는 운동입니다
            </div>

            <div className="absolute bottom-4 left-4 right-4 h-1.5 rounded-full bg-white/20">
              <div className="h-full w-2/3 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900 p-3">
        <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-white">
          <div className="rounded-lg bg-blue-500 p-2">Intro</div>
          <div className="rounded-lg bg-purple-500 p-2">Concept</div>
          <div className="rounded-lg bg-cyan-500 p-2">Example</div>
          <div className="rounded-lg bg-slate-700 p-2">CTA</div>
        </div>
      </div>
    </div>
  );
}
```

---

## 9. 전환율을 높이는 UX 장치

### 9.1 첫 화면에서 바로 체험시키기

단순히 “무료 시작”만 두지 말고, 히어로 안에 가짜 입력창을 넣는다.

```text
어떤 영상을 만들고 싶나요?

[ 강의 영상에서 핵심만 뽑아 쇼츠로 만들어줘            ]
[ 스타일 선택: 깔끔한 강의 쇼츠 ▼ ]
[ 원본 영상 업로드하기 ]
```

이렇게 하면 사용자는 가입 전에도 제품을 상상할 수 있다.

---

### 9.2 “결과물 예시”를 첫 화면에 배치

AI 영상 서비스는 결과물이 중요하다. 첫 화면 아래에 바로 예시를 보여준다.

```text
원본 강의 12분 → 쇼츠 38초
인터뷰 45분 → 클립 6개
제품 영상 1개 → 광고 소재 5개
```

---

### 9.3 CTA는 “가입하기”보다 “편집 시작하기”

좋지 않은 CTA:

```text
회원가입
시작하기
더 알아보기
```

좋은 CTA:

```text
무료로 AI 편집 시작하기
영상 업로드하고 결과 보기
내 영상으로 미리보기 만들기
```

---

### 9.4 무료 체험의 심리적 허들 낮추기

권장 문구:

```text
카드 등록 없이 첫 편집 결과를 확인해보세요.
```

또는

```text
결과를 먼저 보고, 고화질 다운로드할 때 결제하세요.
```

AI 영상 서비스는 결과 품질에 대한 의심이 크므로, “먼저 결과를 보라”가 강력한 전환 장치다.

---

### 9.5 신뢰 장치

메인페이지에 반드시 들어가야 하는 신뢰 요소:

```text
원본 영상 비공개 처리
프로젝트 삭제 가능
상업용 소스 라이선스 표시
국내 결제 지원
고객센터/카카오톡 문의
```

특히 국내 B2B/학원 고객은 결제와 CS 신뢰가 중요하다.

---

## 10. 메인페이지용 이미지/비디오 에셋 기획

### 10.1 필요한 에셋 목록

```text
1. Hero 데모 영상
2. 9:16 쇼츠 결과물 3개
3. 16:9 강의 영상 결과물 1개
4. Before/After 비교 영상
5. 스타일 프리셋 썸네일 8개
6. 사용 사례 카드 이미지 6개
7. 편집 타임라인 UI mockup
8. 자연어 채팅 수정 UI mockup
9. 업로드/분석/렌더링 진행 애니메이션
```

---

### 10.2 Hero 영상 컨셉

#### 영상 길이

```text
8~12초 loop
```

#### 내용

```text
1. 사용자가 제목 입력
2. 영상 파일 업로드
3. AI가 체크리스트 완료
4. 오른쪽 영상 프리뷰에 자막/줌인/B-roll 적용
5. 타임라인이 자동 생성
```

#### 카피 오버레이

```text
원본 영상 분석
핵심 장면 추출
자동 자막 생성
편집본 미리보기 완료
```

---

### 10.3 스타일 프리셋 썸네일 방향

| 스타일 | 썸네일 구성 |
|---|---|
| 깔끔한 강의 쇼츠 | 흰 배경 + 강사/칠판 + 큰 자막 |
| 릴스형 빠른 편집 | 인물 클로즈업 + 노란 강조 자막 |
| 토스형 미니멀 | 파란 카드 + 큰 숫자 + 여백 |
| 제품 광고 | 제품 이미지 + CTA 버튼 |
| 인터뷰 클립 | 인물 2명 + 자동 크롭 |
| 뉴스형 리포트 | 상단 제목 + 자료 화면 |
| PDF 해설 | 문서 확대 + 밑줄 + 포인터 |
| 웨비나 요약 | 발표자 + 핵심 bullet |

---

## 11. 페이지별 연결 구조

메인페이지는 아래 페이지로 자연스럽게 이어져야 한다.

```text
/                     메인페이지
/pricing              요금제
/examples             결과물 예시
/examples/education   강의/교육 예시
/examples/marketing   광고/마케팅 예시
/editor/new           새 프로젝트 만들기
/login                로그인
/signup               회원가입
```

### 메인 CTA 라우팅

```text
무료로 AI 편집 시작하기 → /editor/new
예시 결과물 보기 → /examples
요금제 보기 → /pricing
교육용으로 보기 → /examples/education
```

---

## 12. SEO/GEO 키워드 전략

### 12.1 메인 키워드

```text
AI 영상편집
AI 영상 편집기
자동 영상 편집
AI 쇼츠 만들기
AI 자막 생성
AI 숏폼 제작
유튜브 쇼츠 자동 편집
강의 쇼츠 만들기
강의 영상 편집
릴스 자동 편집
```

### 12.2 페이지 타이틀 후보

```text
AI 영상편집 서비스 | 영상만 올리면 자동 컷편집·자막·쇼츠 생성
```

### 12.3 메타 설명 후보

```text
영상 제목, 내용, 원본 영상, 원하는 스타일만 입력하면 AI가 컷편집, 자동 자막, B-roll, BGM을 적용해 바로 업로드 가능한 영상으로 완성합니다. 쇼츠, 릴스, 강의 영상 편집을 브라우저에서 간편하게 시작하세요.
```

### 12.4 H1

```text
영상만 올리면, AI가 편집본을 바로 보여드립니다.
```

### 12.5 H2 후보

```text
복잡한 타임라인 대신, 말로 편집하세요
긴 영상 하나로 쇼츠 여러 개를 만드세요
세 단계면 편집본이 완성됩니다
강의, 인터뷰, 제품 영상을 바로 업로드 가능한 콘텐츠로
AI가 적용한 편집을 직접 확인하세요
```

---

## 13. A/B 테스트 가설

### 13.1 Hero 카피 테스트

| 버전 | H1 | 예상 강점 |
|---|---|---|
| A | 영상만 올리면, AI가 편집본을 바로 보여드립니다 | 범용적, 직관적 |
| B | 긴 영상 하나로 쇼츠 여러 개를 자동 생성하세요 | 쇼츠 니즈 강함 |
| C | 복잡한 편집 없이, 말로 영상 편집하세요 | 자연어 편집 차별점 강조 |
| D | 강의 영상을 홍보용 쇼츠로 자동 편집하세요 | 교육 타깃 전환 최적화 |

초기에는 A를 메인으로 쓰고, 학원/교육 캠페인 랜딩은 D를 별도로 만드는 것이 좋다.

---

### 13.2 CTA 테스트

| 버전 | CTA | 예상 |
|---|---|---|
| A | 무료로 AI 편집 시작하기 | 안정적 |
| B | 영상 업로드하고 결과 보기 | 제품 체험 유도 강함 |
| C | 내 영상으로 미리보기 만들기 | 결과 확인 심리 자극 |
| D | 쇼츠 자동 생성하기 | 쇼츠 목적 고객에게 강함 |

추천 초기 CTA:

```text
영상 업로드하고 결과 보기
```

이 문구가 “회원가입”보다 행동이 구체적이다.

---

### 13.3 Hero UI 테스트

| 버전 | 구성 |
|---|---|
| A | 왼쪽 카피 + 오른쪽 데모 UI |
| B | 중앙 카피 + 아래 대형 비디오 데모 |
| C | 첫 화면에 실제 입력창 |
| D | 9:16 쇼츠 결과물 중심 |

추천:

```text
데스크톱: A
모바일: C + 짧은 비디오 데모
```

---

## 14. 구현 우선순위

### MVP 메인페이지 1차

1. Header
2. Hero Section
3. HeroDemo mockup
4. PainPoint Section
5. How It Works
6. Use Case Cards
7. Style Preset Gallery
8. Final CTA
9. Footer

### 2차

1. Before/After 영상
2. Natural Language Editing 섹션
3. Pricing Preview
4. FAQ
5. SEO schema
6. 실제 예시 영상 페이지 연결

### 3차

1. 인터랙티브 데모
2. 실제 업로드 체험
3. 이메일 수집/리드 폼
4. 산업별 랜딩 페이지
5. A/B 테스트

---

## 15. Cursor AI 작업 지시용 체크리스트

### 15.1 개발 목표

```text
Next.js 기반 AI 영상편집 SaaS 메인페이지를 만든다.
디자인은 흰색 기반의 깔끔한 생산성 SaaS 톤으로 하며,
Hero Section에서 사용자가 AI 자동 편집 과정을 직관적으로 이해할 수 있도록
입력 패널 + AI 작업 상태 + 9:16 영상 프리뷰 + 타임라인 mockup을 구현한다.
```

### 15.2 필수 컴포넌트

```text
Header
HeroSection
HeroDemo
PainPointSection
HowItWorks
UseCaseSection
StylePresetGallery
NaturalLanguageEditing
BeforeAfterSection
TrustSection
PricingPreview
FAQSection
FinalCTA
Footer
```

### 15.3 스타일 요구사항

```text
- Tailwind CSS 사용
- Pretendard 폰트 사용
- 기본 배경은 white / #F7F9FC
- Primary color는 #2563FF
- 카드 radius는 24px 이상
- 히어로 타이틀은 48~76px responsive
- 데모 UI는 실제 앱처럼 보여야 함
- 모바일 반응형 필수
- CTA 버튼은 명확하고 크고 반복 배치
```

### 15.4 금지사항

```text
- 로봇/뇌/회로 이미지 중심의 흔한 AI 디자인 금지
- 추상적인 우주/미래 이미지 금지
- 기능 목록만 나열하는 랜딩 금지
- 실제 결과물 mockup 없이 카피만 있는 Hero 금지
- 첫 화면에서 “회원가입”만 강조 금지
```

---

## 16. Cursor AI에게 바로 전달할 프롬프트

```text
너는 SaaS 프론트엔드 전문 개발자이자 전환율 중심 랜딩페이지 디자이너다.

Next.js + Tailwind CSS로 AI 자동 영상편집 서비스의 메인페이지를 구현해줘.

서비스 설명:
사용자는 영상 제목, 영상 설명, 원본 영상들, 원하는 편집 스타일을 입력한다.
AI는 핵심 구간을 찾고 컷편집, 자동 자막, B-roll, 줌인, BGM, 전환 효과를 적용해 편집본을 생성한다.
사용자는 실시간 미리보기에서 결과를 확인하고, “자막 크게”, “인트로 삭제”, “더 빠르게” 같은 자연어 명령으로 편집을 수정할 수 있다.

메인페이지 핵심 메시지:
“영상만 올리면, AI가 편집본을 바로 보여드립니다.”

보조 문구:
“제목, 내용, 스타일만 입력하세요. AI가 핵심 장면을 찾고 컷편집, 자막, B-roll, BGM까지 적용해 바로 업로드 가능한 영상으로 완성합니다.”

디자인 방향:
- 흰색 기반의 깔끔한 생산성 SaaS 스타일
- Toss/Linear처럼 넓은 여백과 선명한 타이포그래피
- 영상 프리뷰와 에디터 mockup은 고급스럽게
- Primary color: #2563FF
- Font: Pretendard
- 카드 radius: 24px 이상
- 그림자: 부드러운 SaaS 카드 shadow
- 모바일 반응형 필수

구현할 섹션:
1. Header
2. Hero Section
3. Interactive Hero Demo
4. Pain Point Section
5. How It Works
6. Use Case Cards
7. Style Preset Gallery
8. Natural Language Editing Section
9. Before / After Section
10. Trust & Safety
11. Pricing Preview
12. FAQ
13. Final CTA
14. Footer

Hero Demo에는 다음 요소를 포함해:
- AI 편집 브리프 카드
- 영상 제목 예시
- 편집 스타일 예시
- 업로드된 파일 카드
- AI 작업 체크리스트
- 9:16 영상 프리뷰 mockup
- 자동 자막 overlay
- 하단 타임라인 strip
- 자연어 명령 chip

CTA 문구:
Primary: “영상 업로드하고 결과 보기”
Secondary: “예시 결과물 보기”

중요:
첫 화면에서 사용자가 서비스 작동 방식을 바로 이해해야 한다.
AI 기술 설명보다 결과물과 편집 흐름을 보여줘야 한다.
실제 제품처럼 보이는 UI mockup을 우선 구현해줘.
```

---

## 17. 최종 권장안

이 서비스의 메인페이지는 다음 한 문장으로 설계하면 된다.

```text
영상 제목과 원본 영상만 넣으면 AI가 편집본을 실시간으로 보여주는 서비스
```

디자인적으로는 **Vrew의 쉬움**, **Descript의 텍스트 기반 편집성**, **Captions의 AI 전체 편집감**, **OpusClip의 결과 중심성**, **VEED의 소셜/브랜드 완성도**, **Videostew의 브라우저 실시간 프리뷰 메시지**를 섞어야 한다.

초기 메인페이지의 승부처는 다음이다.

```text
1. 첫 화면에서 “무엇을 넣고 무엇이 나오는지” 즉시 이해시킨다.
2. 실제 편집 UI처럼 보이는 Hero Demo를 만든다.
3. “편집툴을 배울 필요 없음”이라는 심리적 장벽을 제거한다.
4. “결과를 먼저 보고 결제” 구조로 신뢰를 만든다.
5. 교육/강의 쇼츠 자동 편집이라는 특화 사용 사례를 강하게 보여준다.
```

---

## 18. 참고 출처

- Captions 공식 홈페이지: https://captions.ai/
- Descript 공식 홈페이지: https://www.descript.com/
- VEED 공식 홈페이지: https://www.veed.io/
- OpusClip 공식 홈페이지: https://www.opus.pro/
- Runway 공식 홈페이지: https://runwayml.com/
- Riverside 공식 홈페이지: https://riverside.com/
- Vrew 공식 홈페이지: https://vrew.ai/ko/
- Videostew 공식 홈페이지: https://videostew.com/
- MiriCanvas 공식 홈페이지: https://www.miricanvas.com/
- B-Script: Transcript-based B-roll Video Editing with Recommendations: https://arxiv.org/abs/1902.11216
- PodReels: Human-AI Co-Creation of Video Podcast Teasers: https://arxiv.org/abs/2311.05867
- AVscript: Accessible Video Editing with Audio-Visual Scripts: https://arxiv.org/abs/2302.14117
- TechRadar CapCut Terms 관련 보도: https://www.techradar.com/pro/popular-video-editing-app-capcut-wants-to-use-any-content-you-produce-for-free-forever-heres-what-you-should-know
