# AI 영상 자동편집 SaaS 관리자 페이지 구축 리서치 & 설계 큰그림

> 목적: Cursor AI가 바로 개발 방향을 이해할 수 있도록, AI 영상 자동편집 서비스의 **관리자 페이지(Admin Console / Backoffice / Internal Tool)** 를 설계한다.  
> 범위: 관리자 IA, 디자인 방향, 핵심 운영 기능, 기술 스택, DB/API 설계, 권한/감사로그/CS/결제/렌더링 운영까지 포함한다.  
> 작성일: 2026-06-25

---

## 0. 결론 요약

AI 영상 자동편집 서비스의 관리자 페이지는 일반적인 CRUD 관리자보다 훨씬 중요하다. 이 서비스는 사용자가 영상 파일을 업로드하고, AI 분석·자막·타임라인 생성·렌더링·결제·크레딧 차감이 모두 연결되는 구조이기 때문이다.

따라서 관리자 페이지는 다음 5가지 목적을 만족해야 한다.

1. **운영 모니터링**  
   - 오늘 가입자, 결제, 렌더링 수, 실패율, GPU 비용, 크레딧 소진량 확인

2. **고객 지원**  
   - 특정 사용자의 프로젝트, 결제, 크레딧, 렌더링 실패 원인, 업로드 파일, 문의 내역 확인

3. **렌더링 작업 제어**  
   - 실패한 작업 재시도, 우선순위 조정, 환불/크레딧 복구, 작업 취소

4. **AI 품질 관리**  
   - 프롬프트 버전, 스타일 프리셋, 모델별 비용/성능, 생성 실패 로그 관리

5. **보안/감사/권한 관리**  
   - 누가 어떤 고객 정보를 조회했고, 결제/크레딧/작업 상태를 변경했는지 감사로그로 남김

초기 MVP는 **React Admin 또는 Refine + shadcn/ui + Next.js + Supabase/Postgres + BullMQ/Trigger.dev + Sentry + PostHog** 조합이 가장 현실적이다.

---

## 1. 다른 스타트업/툴의 관리자 페이지 구축 방식 조사

### 1.1 Retool: 빠른 내부 도구 구축의 표준 패턴

Retool은 기업 내부 도구를 빠르게 만드는 플랫폼이다. 공식 사이트에서는 Metrics Dashboard, Sales CRM, Inventory Tracker, Ops Dashboard, Support Console, Revenue Hub 같은 내부 운영 앱 예시를 제시한다. 또한 운영 앱에 필요한 인증, 접근 제어, 감사 로그, 거버넌스를 강조한다.

**관리자 페이지에서 배울 점**

- 내부 도구는 단순 디자인보다 **운영 액션 속도**가 중요하다.
- 데이터베이스, API, 외부 SaaS를 한 화면에서 연결한다.
- Support Console, Revenue Hub, Incident Response 같은 목적별 운영 화면을 분리한다.
- 관리자에게 위험한 액션을 줄 때는 권한과 감사로그를 반드시 붙인다.

**우리 서비스 적용**

- `/admin/support-console`: 사용자 검색 → 프로젝트/결제/작업/문의 전체 조회
- `/admin/revenue`: 결제, 환불, 크레딧, 요금제, MRR, ARPU
- `/admin/incidents`: 렌더링 실패, 큐 지연, GPU 장애, 스토리지 장애

출처: Retool 공식 사이트  
https://retool.com/

---

### 1.2 Appsmith: 오픈소스 기반 내부 앱/AI 앱 구축

Appsmith는 오픈소스 low-code 내부 도구 플랫폼이다. 공식 사이트에서는 LLM, database, SaaS tool, REST/GraphQL API와 연결할 수 있고, self-host를 통해 내부 데이터에 안전하게 접근할 수 있다고 설명한다. GitHub 스타도 40K 이상으로 공개되어 있다.

**관리자 페이지에서 배울 점**

- 관리자 페이지는 다양한 데이터 소스와 연결되어야 한다.
- AI 앱, 지원 앱, IT 앱, Salesforce 앱처럼 운영 목적별 앱을 빠르게 만든다.
- self-host 옵션은 민감한 고객 데이터가 있는 서비스에 중요하다.

**우리 서비스 적용**

- 초기에는 직접 코드로 만들되, 임시 운영툴은 Appsmith/Retool로 빠르게 보완 가능
- CS팀이 필요한 “고객 조회/크레딧 복구/렌더 재시도” 화면은 low-code로 먼저 만들 수 있음

출처: Appsmith 공식 사이트  
https://www.appsmith.com/

---

### 1.3 Forest Admin: 규제/감사/권한 중심의 운영 백엔드

Forest Admin은 운영 백엔드/관리자 도구에 가까운 서비스다. 공식 페이지는 Permissions & RBAC, Workflows & automation, Audit Trail & compliance, MCP server & API, Payments, AML/Fraud 같은 운영 요소를 강조한다. 특히 “record-level audit log”, “RBAC for humans and agents”, “data stays in your environment”, “LLM reasoning logs”, “regulator-ready exports”를 내세운다.

**관리자 페이지에서 배울 점**

- 단순히 데이터를 수정하는 관리자 페이지가 아니라 **감사 가능한 운영 인프라**가 되어야 한다.
- AI 서비스라면 LLM reasoning logs, prompt version, model decision log가 필요하다.
- BPO/외부 CS 인력이 들어올 가능성을 고려해 고객 데이터 접근권한을 세밀하게 제한해야 한다.

**우리 서비스 적용**

- 관리자 액션마다 `admin_audit_logs` 저장
- CS 권한은 결제정보 전체를 보지 못하고 일부 마스킹
- AI 프롬프트/모델 설정 변경은 Owner/Admin만 가능
- 프로젝트 원본 영상 다운로드 권한은 별도 승인 필요

출처: Forest Admin 공식 사이트  
https://forest.app/

---

### 1.4 React-admin: 코드 기반 CRUD 관리자 페이지의 대표 프레임워크

React-admin은 REST/GraphQL API 위에 관리자 페이지, 내부 도구, ERP, B2B 앱을 빠르게 만드는 오픈소스 프레임워크다. 공식 사이트는 Datagrid, filters, forms, validation, roles & permissions, file upload, import/export, realtime, search/filter, error handling 등을 핵심 빌딩블록으로 제시한다. GitHub 기준 약 26.8K stars, MIT 라이선스다.

**장점**

- CRUD 관리자 페이지를 매우 빠르게 만들 수 있음
- Datagrid, 필터, 정렬, 일괄 액션, 폼 검증, 관계 데이터 처리에 강함
- REST/GraphQL API와 붙이기 쉬움
- MUI 기반이라 운영툴 느낌을 빠르게 구현 가능

**단점**

- 디자인이 기본값 그대로면 “스타트업 제품 느낌”보다는 전통적인 백오피스 느낌
- 매우 커스텀한 UX, 특히 렌더링 타임라인/AI 로그 뷰어는 직접 구현 필요

**우리 서비스 적용 추천도**: 높음  
MVP 관리자 페이지를 빠르게 구축하기 좋다. 특히 사용자, 결제, 프로젝트, 작업, 로그, 크레딧 같은 표 기반 데이터 관리에 적합하다.

출처: React-admin 공식 사이트 및 GitHub  
https://marmelab.com/react-admin/  
https://github.com/marmelab/react-admin

---

### 1.5 Refine: React 기반 내부 도구/관리자 페이지 프레임워크

Refine은 React 기반 내부 도구, 관리자 패널, 대시보드, B2B 앱을 만드는 프레임워크다. 공식 사이트는 REST API 또는 Supabase에 연결하고, self-host, 기존 Identity Provider, ACL/RBAC/ABAC, audit logging, usage analytics를 강조한다. GitHub 기준 약 34.9K stars다.

**장점**

- Next.js/React와 잘 맞음
- Ant Design, MUI, Mantine, Chakra, Headless 등 선택 가능
- Supabase, REST, GraphQL, NestJS 등과 연동 편리
- React-admin보다 디자인 자유도가 높음

**단점**

- 초보자에게는 React-admin보다 구조 설계가 조금 더 필요함
- 관리자 데이터 모델을 명확하게 설계하지 않으면 복잡도가 올라감

**우리 서비스 적용 추천도**: 매우 높음  
메인 서비스가 Next.js/React라면 Admin도 같은 스택으로 유지하기 좋다. shadcn/ui 기반 커스텀 디자인을 붙일 경우 Refine이 더 유연하다.

출처: Refine 공식 사이트 및 GitHub  
https://refine.dev/  
https://github.com/refinedev/refine

---

### 1.6 Stripe Dashboard: 결제/고객/상품/구독 운영 콘솔 패턴

Stripe Dashboard 공식 문서는 Home, Balances, Transactions, Customers, Product catalog, Billing, Reporting, Workbench 같은 구조를 설명한다. Customers 페이지에서는 고객 프로필, 결제수단, 인보이스, 구독 정보를 볼 수 있고, Billing에서는 구독·인보이스·할인·수익 리포트를 관리한다. Team and security 설정에서는 팀원별 접근 권한도 다룬다.

**관리자 페이지에서 배울 점**

- 결제 관리자 페이지는 반드시 고객 중심으로 들어가야 한다.
- 고객 상세 페이지 안에 결제, 구독, 인보이스, 환불, 크레딧, 사용량이 모여야 한다.
- Webhook/API 로그를 별도로 보여줘야 결제 장애를 해결할 수 있다.
- 팀원별 권한 분리가 중요하다.

**우리 서비스 적용**

- `/admin/users/[id]` 안에 결제·구독·크레딧·프로젝트·작업·문의 탭 구성
- `/admin/billing/webhooks`에서 PG webhook 수신/실패/재처리 관리
- `/admin/billing/refunds`에서 환불 요청, 승인, 처리 이력 관리

출처: Stripe Dashboard docs  
https://docs.stripe.com/dashboard

---

### 1.7 Supabase Dashboard: 프로젝트/조직/DB/Auth/Storage 운영 패턴

Supabase Platform 문서는 각 프로젝트가 Postgres database, auto-generated APIs, Auth/user management, Edge Functions, Realtime API, Storage를 가진다고 설명한다. Organization 단위로 팀원과 billing settings를 묶는 구조도 참고할 만하다.

**관리자 페이지에서 배울 점**

- 프로젝트 중심 구조는 AI 영상 서비스와 잘 맞는다.
- 사용자 개인 단위가 아니라 팀/조직 단위 과금까지 확장할 수 있다.
- Storage, Auth, Database, Functions, Usage/Billing을 한 콘솔에 묶어 보여주는 방식이 좋다.

**우리 서비스 적용**

- User → Workspace → Project → Asset → RenderJob 구조로 확장
- 개인 고객부터 학원/팀 고객까지 지원 가능
- Workspace별 사용량, 크레딧, 멤버, 권한, 결제 관리

출처: Supabase Platform docs  
https://supabase.com/docs/guides/platform

---

### 1.8 Channel Talk: 국내식 CS/AI 상담 운영 패턴

Channel Talk은 국내외 고객상담 SaaS에 가까운 레퍼런스다. 공식 페이지는 AI가 반복 문의를 처리하고, 팀은 고가치 대화에 집중하는 구조를 설명한다. 또한 AI 응답을 위한 rules, structured knowledge, executable tasks, continuous improvement를 강조한다.

**관리자 페이지에서 배울 점**

- AI 서비스 운영에서는 CS 화면과 지식/규칙 관리 화면이 중요하다.
- 고객 문의가 들어왔을 때 상담사가 고객의 결제, 사용량, 프로젝트, 실패 로그를 바로 봐야 한다.
- AI가 어떤 규칙과 지식으로 답했는지도 추적해야 한다.

**우리 서비스 적용**

- `/admin/support/inbox`: 고객 문의 리스트
- `/admin/support/macros`: 자주 쓰는 답변 템플릿
- `/admin/ai/rules`: AI 편집/CS 답변 정책
- `/admin/ai/knowledge`: 도움말/환불규정/요금제 설명/장애 대응 문서 관리

출처: Channel Talk 공식 사이트  
https://channel.io/en

---

## 2. 우리 AI 영상편집 서비스 관리자 페이지의 핵심 원칙

### 2.1 관리자 페이지는 “보기”가 아니라 “해결” 중심이어야 한다

잘못된 구조:

```text
사용자 목록
프로젝트 목록
결제 목록
작업 목록
로그 목록
```

이렇게 단순히 데이터 테이블만 만들면 실제 운영 때 CS가 느려진다.

좋은 구조:

```text
고객이 문의함
→ 이메일/이름/프로젝트명으로 검색
→ 고객 상세 진입
→ 최근 실패 작업 확인
→ 실패 원인 확인
→ 재시도/크레딧 복구/환불/답변 발송
→ 모든 액션 감사로그 저장
```

즉, 관리자 페이지는 **고객 문제 해결 플로우**를 중심으로 설계해야 한다.

---

### 2.2 AI 영상 서비스 특성상 “작업 상태”가 가장 중요하다

AI 영상 자동편집은 하나의 요청이 여러 단계를 거친다.

```text
업로드
→ 프록시 생성
→ 음성 인식
→ 장면 분석
→ 타임라인 생성
→ 미리보기 생성
→ 렌더링
→ 업로드
→ 다운로드 가능
```

사용자는 대부분 다음과 같은 문제로 문의한다.

- 영상이 너무 오래 걸려요.
- 렌더링 실패했어요.
- 크레딧만 차감되고 결과물이 안 나왔어요.
- 자막이 이상해요.
- 업로드가 안 돼요.
- 결제했는데 크레딧이 안 들어왔어요.
- 결과물이 마음에 안 들어요.

그래서 관리자 페이지에서 작업 상태를 아주 자세하게 볼 수 있어야 한다.

---

### 2.3 모든 돈/크레딧 변경은 Ledger로 관리한다

관리자가 `users.credit = 100000`처럼 직접 숫자를 수정하면 안 된다.

반드시 다음처럼 장부형 구조를 사용한다.

```text
credit_ledger
- +200,000 신규 가입 보너스
- -45,000 영상 분석
- -120,000 렌더링
- +120,000 렌더링 실패 복구
- +500,000 관리자 수동 지급
```

현재 잔액은 ledger 합계로 계산하거나, 캐시 컬럼을 두더라도 ledger와 항상 검증해야 한다.

---

### 2.4 위험 액션은 2단계 확인 + 감사로그

위험 액션 예시:

- 크레딧 수동 지급/차감
- 환불 처리
- 프로젝트 삭제
- 사용자 계정 정지
- 원본 영상 다운로드
- 관리자 권한 변경
- 프롬프트/모델 변경
- 전체 공지 발송

필수 처리:

1. 확인 모달
2. 사유 입력
3. 권한 검사
4. 액션 실행
5. 감사로그 저장
6. 필요시 Slack/Discord/이메일 알림

---

## 3. 추천 관리자 페이지 IA

```text
/admin
├─ Overview                         # 전체 운영 현황
├─ Users                            # 사용자/워크스페이스 관리
│  ├─ User List
│  ├─ User Detail
│  ├─ Workspace Detail
│  └─ Admin Notes
├─ Projects                         # 영상 프로젝트 관리
│  ├─ Project List
│  ├─ Project Detail
│  ├─ Assets
│  └─ Timeline JSON Viewer
├─ Render Jobs                      # 렌더링/분석 작업 관리
│  ├─ Job Queue
│  ├─ Failed Jobs
│  ├─ Worker Status
│  ├─ Retry Center
│  └─ Cost Analysis
├─ Billing & Credits                # 결제/크레딧/환불
│  ├─ Subscriptions
│  ├─ Payments
│  ├─ Invoices
│  ├─ Credit Ledger
│  ├─ Refund Requests
│  ├─ Coupons
│  └─ Webhook Logs
├─ AI Control Center                # AI 모델/프롬프트/스타일 관리
│  ├─ Model Routing
│  ├─ Prompt Versions
│  ├─ Style Presets
│  ├─ Safety Rules
│  ├─ Evaluation Logs
│  └─ Cost per Model
├─ Templates                        # 영상 템플릿/프리셋 관리
│  ├─ Template List
│  ├─ Template Editor
│  ├─ Preview Gallery
│  └─ Version History
├─ Support                          # CS/문의 관리
│  ├─ Inbox
│  ├─ User Lookup
│  ├─ Macros
│  ├─ Known Issues
│  └─ Announcements
├─ Content Moderation               # 업로드 영상/결과물 정책 관리
│  ├─ Flagged Assets
│  ├─ Abuse Reports
│  ├─ Blocked Users
│  └─ Policy Logs
├─ Analytics                        # 제품/매출/사용량 분석
│  ├─ Acquisition
│  ├─ Activation
│  ├─ Retention
│  ├─ Revenue
│  └─ Rendering Funnel
├─ System                           # 인프라/장애/외부 연동
│  ├─ Health Checks
│  ├─ Storage Usage
│  ├─ Queue Metrics
│  ├─ Webhook Status
│  ├─ Error Logs
│  └─ Feature Flags
├─ Team & Permissions               # 관리자 권한
│  ├─ Admin Members
│  ├─ Roles
│  ├─ Access Policies
│  └─ Audit Logs
└─ Settings                         # 서비스 설정
   ├─ Plans
   ├─ Credit Pricing
   ├─ Email Templates
   ├─ Notification Rules
   └─ Legal/Policy Links
```

---

## 4. 핵심 관리자 화면 설계

## 4.1 Overview Dashboard

### 목적

대표/운영자가 오늘 서비스 상태를 30초 안에 파악하는 화면.

### 핵심 카드

```text
오늘 가입자
오늘 결제액
오늘 렌더링 수
렌더링 실패율
평균 렌더링 시간
GPU/서버 비용
AI API 비용
크레딧 차감량
신규 문의 수
장애 알림 수
```

### 추천 레이아웃

```text
상단: 핵심 KPI 카드 8개
중단 좌측: 렌더링 파이프라인 상태
중단 우측: 실패 작업/장애 알림
하단 좌측: 매출 차트
하단 우측: 최근 관리자 액션/CS 이슈
```

### 주요 지표

| 지표 | 설명 | 운영 의미 |
|---|---|---|
| `new_users_today` | 오늘 가입자 수 | 마케팅 유입 체크 |
| `paid_conversions_today` | 오늘 결제 전환 수 | 가격/퍼널 체크 |
| `render_jobs_today` | 오늘 렌더링 작업 수 | 사용량 체크 |
| `render_failure_rate` | 실패율 | 5% 이상이면 장애 가능성 |
| `avg_render_duration` | 평균 렌더링 시간 | 사용자 체감 속도 |
| `cost_per_render` | 작업당 원가 | 요금제 수익성 판단 |
| `credit_refunds_today` | 크레딧 복구량 | 품질 문제 신호 |
| `support_tickets_open` | 미처리 문의 | CS 대응 필요 |

---

## 4.2 User Detail / 고객 360도 화면

관리자 페이지에서 가장 중요한 화면이다.

### 탭 구조

```text
기본 정보
프로젝트
렌더링 작업
결제/구독
크레딧 Ledger
문의 내역
관리자 메모
감사로그
위험 액션
```

### 보여줘야 할 데이터

```text
- 이름 / 이메일 / 전화번호 / 가입일
- 가입 경로 / UTM / 추천인
- 현재 요금제
- 결제 상태
- 남은 크레딧
- 총 사용 크레딧
- 총 프로젝트 수
- 최근 렌더링 작업
- 최근 실패 작업
- 최근 문의
- 계정 상태: 정상 / 정지 / 결제 실패 / 탈퇴 예정
```

### 관리자 액션

```text
- 크레딧 수동 지급
- 크레딧 차감
- 비밀번호 재설정 링크 발송
- 결제 상태 동기화
- 구독 변경
- 계정 일시정지
- 프로젝트 대신 재렌더링
- 고객에게 이메일/문자 발송
- 관리자 메모 작성
```

### 위험 액션 UX

```text
[크레딧 100,000 지급]
사유를 입력하세요: ___________________
고객에게 알림 보내기: 체크박스

[확인]
```

모든 액션은 `admin_audit_logs`에 저장한다.

---

## 4.3 Render Jobs / 렌더링 작업 관리

AI 영상 서비스의 운영 핵심 화면이다.

### 작업 상태 정의

```ts
export type RenderJobStatus =
  | "queued"
  | "uploading"
  | "proxy_generating"
  | "transcribing"
  | "analyzing"
  | "timeline_generating"
  | "preview_generating"
  | "rendering"
  | "uploading_result"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded";
```

### 리스트 컬럼

| 컬럼 | 설명 |
|---|---|
| Job ID | 작업 ID |
| User | 사용자 |
| Project | 프로젝트명 |
| Status | 현재 상태 |
| Progress | 진행률 |
| Queue Wait | 큐 대기 시간 |
| Runtime | 실행 시간 |
| Worker | 처리 워커 |
| Model | 사용 AI 모델 |
| Render Engine | Remotion/FFmpeg 등 |
| Cost | 추정 비용 |
| Error | 실패 원인 |
| Actions | 재시도/취소/환불 |

### Job Detail에서 보여줄 것

```text
- 전체 파이프라인 타임라인
- 각 단계별 시작/종료 시간
- 입력 파일 정보
- 분석 결과
- Transcript
- Timeline JSON
- 프롬프트 버전
- 모델 응답
- 렌더 로그
- 에러 스택
- 비용 breakdown
- 크레딧 차감/복구 기록
```

### 실패 원인 카테고리

```text
UPLOAD_FAILED
PROXY_FAILED
STT_FAILED
SCENE_ANALYSIS_FAILED
LLM_TIMELINE_FAILED
RENDER_TIMEOUT
RENDER_CRASHED
STORAGE_UPLOAD_FAILED
INSUFFICIENT_CREDITS
POLICY_BLOCKED
UNKNOWN_ERROR
```

### 작업 액션

```text
- Retry from failed step
- Retry entire job
- Cancel job
- Mark as refunded
- Restore credits
- Download logs
- Open project as user-readonly
- Escalate to engineering
```

---

## 4.4 Billing & Credits

영상 생성 SaaS는 구독제만으로는 부족하다. 렌더링 시간, 원본 영상 길이, AI 모델 비용, GPU 비용에 따라 원가가 달라지므로 크레딧 기반 사용량 관리가 필요하다.

### 결제 관리자 메뉴

```text
Subscriptions
Payments
Invoices
Refund Requests
Credit Ledger
Coupons
Plans
Webhook Logs
Failed Payments
```

### Credit Ledger 구조

```ts
export type CreditLedgerType =
  | "signup_bonus"
  | "purchase"
  | "subscription_grant"
  | "render_charge"
  | "analysis_charge"
  | "manual_grant"
  | "manual_deduct"
  | "refund"
  | "failed_job_restore"
  | "promotion";
```

### 결제 관련 필수 화면

#### 1. 결제 목록

```text
결제일 / 사용자 / 금액 / 결제수단 / PG / 상태 / 영수증 / 환불 여부
```

#### 2. 구독 목록

```text
사용자 / 플랜 / 시작일 / 다음 결제일 / 상태 / 결제 실패 횟수 / 취소 예정 여부
```

#### 3. 환불 요청

```text
요청일 / 사용자 / 결제건 / 사유 / 사용량 / 환불 가능 금액 / 처리 상태
```

#### 4. Webhook Logs

```text
PG 이벤트 ID / 이벤트 타입 / 수신 시간 / 처리 결과 / 재처리 버튼
```

### Stripe 참고 패턴

Stripe는 Customer Portal을 통해 고객이 결제 정보, 구독, 인보이스, 결제수단, 취소를 관리할 수 있게 한다. 또한 Stripe Dashboard는 transactions, customers, product catalog, billing, reporting, workbench/logs를 제공한다.

우리 서비스도 최소한 다음을 제공해야 한다.

```text
사용자용: 결제 내역 / 구독 변경 / 영수증 / 플랜 변경
관리자용: 결제 동기화 / webhook 재처리 / 환불 / 크레딧 복구
```

출처: Stripe Customer Portal & Dashboard docs  
https://docs.stripe.com/customer-management  
https://docs.stripe.com/dashboard

---

## 4.5 AI Control Center

일반 SaaS 관리자와 AI 서비스 관리자의 가장 큰 차이점이다.

### 메뉴

```text
Model Routing
Prompt Versions
Style Presets
Safety Rules
Evaluation Logs
Cost per Model
A/B Tests
```

### Prompt Versions

프롬프트는 코드처럼 버전 관리해야 한다.

```text
prompt_id: timeline_generator_v3
version: 3.2.1
model: gemini-3.1-pro
status: production
created_by: admin_01
created_at: 2026-06-25
rollback_available: true
```

### Model Routing

```text
작업 유형별 모델 설정
- 짧은 영상 요약: fast model
- 긴 강의 분석: pro model
- 자막 교정: cheap text model
- 시각 분석: vision model
- 최종 타임라인 생성: reasoning model
```

### Style Presets

```text
- 토스 스타일
- 빠른 쇼츠 스타일
- 강의 해설 스타일
- 뉴스 요약 스타일
- 감성 브이로그 스타일
- 학원 홍보 릴스 스타일
```

각 스타일 프리셋에는 다음 필드가 필요하다.

```json
{
  "id": "edu_shorts_clean_v1",
  "name": "깔끔한 교육 쇼츠",
  "aspectRatio": "9:16",
  "font": "Pretendard",
  "captionPosition": "bottom_center",
  "captionSize": "large",
  "background": "white",
  "accentColor": "#2563EB",
  "transition": "fast_cut",
  "motion": "subtle_zoom",
  "bgmIntensity": 0.35,
  "targetDurationSec": 45
}
```

### Evaluation Logs

AI 결과물의 품질을 추적한다.

```text
- 사용자가 재생성했는가?
- 사용자가 다운로드했는가?
- 렌더링 이후 삭제했는가?
- 자막 수정 횟수
- 자연어 수정 요청 횟수
- CS 문의 여부
- 만족도 평가
```

---

## 4.6 Templates / 영상 템플릿 관리

AI 영상편집 서비스는 결국 “AI + 템플릿” 서비스다. 관리자 페이지에서 템플릿을 관리할 수 있어야 한다.

### 템플릿 목록 컬럼

```text
Template ID
Name
Category
Aspect Ratio
Status
Version
Usage Count
Avg Render Time
Avg Completion Rate
Last Updated
```

### 템플릿 상세

```text
- 미리보기 영상
- 템플릿 설명
- 지원 비율: 9:16 / 16:9 / 1:1
- 기본 자막 스타일
- 기본 전환 효과
- 허용 입력 타입
- Remotion Component path
- props schema
- version history
```

### 템플릿 버전 관리

템플릿 변경으로 기존 프로젝트가 깨지면 안 된다.

```text
template_id: clean_shorts
version: 1.0.0 → 기존 프로젝트 유지
version: 1.1.0 → 신규 프로젝트에만 적용
```

---

## 4.7 Support Console

CS 담당자가 고객 문의를 해결하는 핵심 화면이다.

### Inbox 목록

```text
문의자
이메일
문의 유형
우선순위
최근 프로젝트
결제 상태
최근 실패 작업 여부
담당자
상태
```

### 문의 유형

```text
- 결제/환불
- 크레딧
- 렌더링 실패
- 결과물 품질
- 업로드 오류
- 계정/로그인
- 요금제 문의
- 기능 제안
- 악성 사용자/정책 위반
```

### CS 화면에 붙어야 하는 사이드패널

```text
고객 정보
현재 플랜
남은 크레딧
최근 결제
최근 프로젝트
최근 실패 작업
관리자 메모
추천 답변 매크로
```

### 답변 매크로 예시

```text
렌더링 실패 크레딧 복구 안내
결제 완료 후 크레딧 미반영 안내
업로드 용량 제한 안내
자막 품질 개선 안내
환불 규정 안내
```

---

## 4.8 Content Moderation

영상 업로드 서비스는 콘텐츠 리스크가 있다.

### 관리 대상

```text
- 업로드 원본 영상
- 생성된 결과물
- 사용자 입력 프롬프트
- 제목/설명
- 자막/스크립트
- 썸네일
```

### 상태

```text
safe
flagged
blocked
needs_review
appealed
```

### 정책 위반 예시

```text
저작권 문제 가능성이 높은 영상
성인/폭력/혐오/불법 콘텐츠
개인정보 포함 영상
타인 얼굴/음성 악용 가능성
정치/의료/투자 등 고위험 허위정보
```

### 관리자 액션

```text
- 프로젝트 차단
- 사용자 경고
- 계정 정지
- 파일 삭제 예약
- 이의신청 승인/거절
```

---

## 4.9 Team & Permissions

관리자 권한은 처음부터 나눠야 한다.

### 추천 역할

| 역할 | 권한 |
|---|---|
| Owner | 모든 권한, 관리자 초대/삭제, 결제/프롬프트/모델 변경 |
| Admin | 대부분의 운영 권한, 위험 설정 일부 제한 |
| Support | 고객 조회, 문의 처리, 제한적 크레딧 복구 |
| Finance | 결제/환불/세금/영수증 관리 |
| AI Ops | 프롬프트, 모델, 템플릿, AI 로그 관리 |
| Engineer | 작업 로그, 에러, 시스템 상태, 재시도 관리 |
| Viewer | 읽기 전용 |

### 권한 모델

RBAC를 기본으로 하되, 민감 작업은 ABAC 조건을 붙인다.

```ts
type AdminPermission =
  | "users.read"
  | "users.update"
  | "users.suspend"
  | "projects.read"
  | "projects.delete"
  | "assets.download"
  | "render_jobs.read"
  | "render_jobs.retry"
  | "credits.grant"
  | "credits.deduct"
  | "billing.refund"
  | "prompts.update"
  | "models.update"
  | "templates.update"
  | "audit_logs.read"
  | "admin_members.manage";
```

### 감사로그 필수 필드

```ts
type AdminAuditLog = {
  id: string;
  actorAdminId: string;
  actorRole: string;
  action: string;
  targetType: "user" | "project" | "render_job" | "payment" | "credit" | "prompt" | "template";
  targetId: string;
  before?: unknown;
  after?: unknown;
  reason?: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
};
```

---

## 5. 디자인 방향

## 5.1 관리자 페이지는 마케팅 페이지와 달라야 한다

메인페이지는 “와, 멋지다”가 중요하지만 관리자 페이지는 “문제를 빨리 찾고 해결한다”가 중요하다.

### 디자인 키워드

```text
정확함
밀도감
상태 가시성
빠른 검색
위험 액션 명확화
로그 추적성
권한 인식
```

### 추천 톤

```text
배경: #F8FAFC 또는 #0B1020 다크 모드 옵션
텍스트: 진한 회색/흰색
포인트: 브랜드 블루 또는 인디고
상태색:
- success: green
- warning: amber
- error: red
- processing: blue
- queued: gray
```

### UI 스타일

- Stripe Dashboard처럼 좌측 사이드바 + 상단 검색 + 콘텐츠 카드
- Supabase Dashboard처럼 프로젝트/리소스 중심 구조
- Linear/Retool처럼 빠른 액션과 필터 중심
- shadcn/ui 기반의 깔끔한 카드/테이블/모달
- 데이터 테이블은 밀도 높은 compact mode 제공

---

## 5.2 추천 레이아웃

```text
┌────────────────────────────────────────────────────────────┐
│ Top Bar: Global Search / Alerts / Admin Profile             │
├───────────────┬────────────────────────────────────────────┤
│ Sidebar       │ Page Header                                │
│ - Overview    │ Title / Description / Primary Action        │
│ - Users       ├────────────────────────────────────────────┤
│ - Projects    │ Filter Bar                                  │
│ - Jobs        ├────────────────────────────────────────────┤
│ - Billing     │ Main Table / Cards / Detail Panel            │
│ - AI Ops      │                                             │
│ - Support     │                                             │
│ - System      │                                             │
└───────────────┴────────────────────────────────────────────┘
```

### Global Search

관리자 페이지에서 가장 중요한 기능이다.

검색 가능 항목:

```text
이메일
이름
전화번호
Project ID
Render Job ID
Payment ID
Invoice ID
Webhook Event ID
파일명
```

검색 결과는 이런 식으로 보여준다.

```text
Users
- jjw@example.com / Pro Plan / 120,000 credits

Projects
- 수능 물리 쇼츠 / failed render / 2026-06-25

Payments
- 99,000원 / paid / TossPayments / 2026-06-25

Render Jobs
- job_abc123 / rendering failed / RENDER_TIMEOUT
```

---

## 5.3 컴포넌트 가이드

### 필수 컴포넌트

```text
DataTable
StatusBadge
MetricCard
UserAvatar
CreditBadge
PlanBadge
JobProgressTimeline
JSONViewer
LogViewer
DangerActionModal
AdminNotePanel
AuditLogTable
WebhookEventViewer
CostBreakdownCard
```

### 상태 배지 예시

```tsx
<StatusBadge status="completed" />
<StatusBadge status="failed" />
<StatusBadge status="rendering" />
<StatusBadge status="queued" />
```

### 위험 액션 모달

```tsx
<DangerActionModal
  title="크레딧을 수동 지급하시겠습니까?"
  description="이 액션은 감사로그에 기록되며 되돌릴 수 없습니다."
  confirmText="100,000 크레딧 지급"
  requireReason
  onConfirm={(reason) => grantCredits({ userId, amount: 100000, reason })}
/>
```

---

## 6. 추천 기술 스택

## 6.1 가장 현실적인 MVP 스택

```text
Frontend/Admin: Next.js App Router
UI: shadcn/ui + Tailwind CSS
Data Table: TanStack Table
Forms: React Hook Form + Zod
Charts: Recharts 또는 Tremor
Auth: Supabase Auth / NextAuth / Clerk 중 택1
DB: PostgreSQL + Prisma
Storage: S3 또는 Google Cloud Storage
Queue: BullMQ + Redis 또는 Trigger.dev
Error Monitoring: Sentry
Product Analytics: PostHog
Logs: Grafana/Loki 또는 Cloud Logging
Feature Flags: PostHog Feature Flags 또는 자체 테이블
```

### 왜 이 조합인가?

- Next.js: 메인 서비스와 같은 스택 유지
- shadcn/ui: 커스텀 디자인 자유도가 높고 관리자 UI 구현에 적합
- TanStack Table: 대규모 테이블, 필터, 정렬, 페이지네이션 구현에 강함
- Prisma/Postgres: 관계형 데이터 관리에 적합
- BullMQ: 렌더링/분석 같은 비동기 작업 큐 관리
- Sentry: 오류/성능/세션 리플레이/트레이싱 관찰
- PostHog: 사용자 행동, 퍼널, 기능 플래그, 이벤트 분석

---

## 6.2 React-admin vs Refine vs 자체 구현

| 선택지 | 장점 | 단점 | 추천 상황 |
|---|---|---|---|
| React-admin | CRUD 빠름, 테이블/폼 강함, 안정적 | 디자인 커스텀 한계, MUI 느낌 강함 | 초고속 MVP 관리자 |
| Refine | Next/React 친화, UI 자유도 높음, RBAC/ABAC 구조 좋음 | 설계가 조금 더 필요 | 장기 운영 관리자 |
| 자체 구현 | 완전한 디자인/UX 자유 | 개발량 큼 | 핵심 운영 화면만 특화할 때 |
| Retool/Appsmith | 매우 빠른 내부툴 제작 | 제품 코드와 분리, 비용/종속성 | 임시 운영툴/CS 보조툴 |

### 최종 추천

```text
1단계: Next.js + shadcn/ui + TanStack Table로 핵심 관리자 직접 구현
2단계: 반복 CRUD는 React-admin 또는 Refine 패턴 흡수
3단계: 급한 내부 운영은 Retool/Appsmith로 보조
```

AI 영상 서비스는 렌더링 작업, 프롬프트, Timeline JSON, GPU 비용 같은 특수 화면이 많기 때문에 완전 low-code보다는 **제품 코드와 같은 레포에서 직접 구현**하는 것이 장기적으로 유리하다.

---

## 7. 데이터베이스 설계 큰그림

```prisma
model AdminUser {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  role        AdminRole
  isActive    Boolean  @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  auditLogs   AdminAuditLog[]
}

enum AdminRole {
  OWNER
  ADMIN
  SUPPORT
  FINANCE
  AI_OPS
  ENGINEER
  VIEWER
}

model AdminAuditLog {
  id           String   @id @default(cuid())
  actorAdminId String
  actorRole    String
  action       String
  targetType   String
  targetId     String
  before       Json?
  after        Json?
  reason       String?
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())

  actor AdminUser @relation(fields: [actorAdminId], references: [id])
}

model User {
  id             String   @id @default(cuid())
  email          String   @unique
  name           String?
  phone          String?
  planId         String?
  status         UserStatus @default(ACTIVE)
  creditBalance  Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  projects       Project[]
  creditLedger   CreditLedger[]
  payments       Payment[]
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  DELETED
  PAYMENT_FAILED
}

model Project {
  id          String   @id @default(cuid())
  userId      String
  title       String
  description String?
  status      ProjectStatus
  stylePreset String?
  timeline    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User @relation(fields: [userId], references: [id])
  assets      Asset[]
  renderJobs  RenderJob[]
}

enum ProjectStatus {
  DRAFT
  ANALYZING
  READY_TO_PREVIEW
  RENDERING
  COMPLETED
  FAILED
  ARCHIVED
}

model Asset {
  id          String   @id @default(cuid())
  projectId   String
  type        AssetType
  fileName    String
  mimeType    String
  sizeBytes   BigInt
  storageUrl  String
  proxyUrl    String?
  durationSec Float?
  width       Int?
  height      Int?
  status      AssetStatus
  createdAt   DateTime @default(now())

  project Project @relation(fields: [projectId], references: [id])
}

enum AssetType {
  VIDEO
  IMAGE
  AUDIO
  DOCUMENT
}

enum AssetStatus {
  UPLOADED
  PROCESSING
  READY
  FAILED
  BLOCKED
}

model RenderJob {
  id              String   @id @default(cuid())
  projectId        String
  userId           String
  status           RenderJobStatus
  progress         Int      @default(0)
  currentStep      String?
  errorCode        String?
  errorMessage     String?
  workerId         String?
  modelName        String?
  promptVersion    String?
  creditCharged    Int      @default(0)
  estimatedCostKrw Int      @default(0)
  startedAt        DateTime?
  completedAt      DateTime?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  project Project @relation(fields: [projectId], references: [id])
}

enum RenderJobStatus {
  QUEUED
  UPLOADING
  PROXY_GENERATING
  TRANSCRIBING
  ANALYZING
  TIMELINE_GENERATING
  PREVIEW_GENERATING
  RENDERING
  UPLOADING_RESULT
  COMPLETED
  FAILED
  CANCELLED
  REFUNDED
}

model CreditLedger {
  id             String   @id @default(cuid())
  userId         String
  type           String
  amount         Int
  balanceAfter   Int
  relatedType    String?
  relatedId      String?
  reason         String?
  createdByAdmin String?
  createdAt      DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}

model Payment {
  id              String   @id @default(cuid())
  userId          String
  provider        String
  providerPaymentId String?
  amountKrw       Int
  status          PaymentStatus
  planId          String?
  receiptUrl      String?
  paidAt          DateTime?
  createdAt       DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
  CANCELLED
}
```

---

## 8. API 설계 큰그림

## 8.1 관리자 인증

```http
GET /api/admin/me
POST /api/admin/login
POST /api/admin/logout
```

## 8.2 Overview

```http
GET /api/admin/overview
GET /api/admin/overview/revenue
GET /api/admin/overview/rendering
GET /api/admin/overview/incidents
```

## 8.3 Users

```http
GET /api/admin/users?query=&plan=&status=&page=
GET /api/admin/users/:id
PATCH /api/admin/users/:id
POST /api/admin/users/:id/suspend
POST /api/admin/users/:id/restore
POST /api/admin/users/:id/admin-notes
```

## 8.4 Credits

```http
GET /api/admin/users/:id/credit-ledger
POST /api/admin/users/:id/credits/grant
POST /api/admin/users/:id/credits/deduct
POST /api/admin/render-jobs/:id/credits/restore
```

### 크레딧 지급 요청 예시

```json
{
  "amount": 100000,
  "reason": "렌더링 실패로 인한 보상",
  "notifyUser": true
}
```

## 8.5 Render Jobs

```http
GET /api/admin/render-jobs?status=&userId=&projectId=&page=
GET /api/admin/render-jobs/:id
POST /api/admin/render-jobs/:id/retry
POST /api/admin/render-jobs/:id/cancel
POST /api/admin/render-jobs/:id/escalate
GET /api/admin/render-jobs/:id/logs
GET /api/admin/render-jobs/:id/timeline-json
```

## 8.6 Billing

```http
GET /api/admin/payments
GET /api/admin/payments/:id
POST /api/admin/payments/:id/refund
GET /api/admin/subscriptions
POST /api/admin/subscriptions/:id/sync
GET /api/admin/billing/webhook-logs
POST /api/admin/billing/webhook-logs/:id/replay
```

## 8.7 AI Control Center

```http
GET /api/admin/ai/prompts
POST /api/admin/ai/prompts
PATCH /api/admin/ai/prompts/:id
POST /api/admin/ai/prompts/:id/publish
POST /api/admin/ai/prompts/:id/rollback

GET /api/admin/ai/models
PATCH /api/admin/ai/models/routing

GET /api/admin/ai/style-presets
POST /api/admin/ai/style-presets
PATCH /api/admin/ai/style-presets/:id
```

## 8.8 Audit Logs

```http
GET /api/admin/audit-logs?actor=&action=&targetType=&from=&to=
```

---

## 9. 비동기 작업/렌더링 관리자 기술

AI 영상편집 서비스는 장시간 작업이 많기 때문에 queue와 worker 관리가 중요하다.

### 선택지

| 도구 | 장점 | 단점 | 추천도 |
|---|---|---|---|
| BullMQ | Redis 기반, Node.js 친화, 간단, 수평 확장 가능 | 직접 모니터링 UI 개발 필요 | MVP 추천 |
| Trigger.dev | long-running task, retries, realtime, observability 제공 | 외부 플랫폼 의존 가능 | 빠른 운영 추천 |
| Temporal | 매우 견고한 workflow, crash-proof execution | 러닝커브 큼 | 대규모/엔터프라이즈 추천 |

BullMQ 공식 문서는 Redis 기반의 빠르고 견고한 queue system이며, horizontal scaling, retries, delayed jobs, concurrency, automatic recovery 등을 제공한다고 설명한다. Trigger.dev는 long-running AI workflow, retries, queues, observability, realtime status를 강조한다. Temporal은 crash/network/infrastructure failure 이후에도 workflow가 중단 지점부터 재개되는 안정성을 강조한다.

출처:  
https://docs.bullmq.io/  
https://trigger.dev/  
https://docs.temporal.io/

### MVP 추천

```text
초기: BullMQ + Redis
운영 편의가 필요하면: Trigger.dev
대규모 장기 작업 안정성이 중요해지면: Temporal 검토
```

### 관리자 페이지에서 필요한 Queue 지표

```text
대기 중 작업 수
진행 중 작업 수
실패 작업 수
평균 대기 시간
평균 실행 시간
워커별 처리량
워커별 실패율
GPU 인스턴스 사용률
작업당 평균 원가
```

---

## 10. 모니터링/분석/로그 설계

### Sentry

Sentry는 error monitoring, logs, session replay, tracing, profiling, uptime monitoring 등을 제공한다. 관리자 페이지에서는 Sentry event ID를 각 실패 작업과 연결해 두면 엔지니어가 원인 분석을 빠르게 할 수 있다.

적용:

```text
RenderJob.errorSentryEventId
WebhookLog.errorSentryEventId
AdminAction.errorSentryEventId
```

출처: Sentry 공식 사이트  
https://sentry.io/

### PostHog

PostHog는 product analytics, data warehouse, SQL editor, user activity feed, API/webhooks, payments/exception/ticket data 통합을 강조한다. AI 영상 서비스에서는 “가입 → 첫 업로드 → 첫 프리뷰 → 첫 렌더 → 다운로드 → 결제” 퍼널 분석에 적합하다.

적용 이벤트:

```text
admin_user_opened
admin_render_job_retried
admin_credit_granted
admin_refund_processed
user_uploaded_video
user_preview_generated
user_render_completed
user_downloaded_video
user_upgraded_plan
```

출처: PostHog 공식 사이트  
https://posthog.com/

### Grafana/Metabase

- Grafana: 서버/큐/GPU/인프라 모니터링 대시보드
- Metabase: DB 기반 비즈니스 지표, 매출, 고객, 사용량 분석

관리자 페이지에서 전부 구현하지 말고, 고급 BI는 Metabase/Grafana로 분리하는 것이 효율적이다.

---

## 11. 관리자 페이지 MVP 개발 범위

## 11.1 1차 MVP: 반드시 필요한 화면

```text
1. Admin Login
2. Overview Dashboard
3. User List / User Detail
4. Project List / Project Detail
5. Render Job List / Job Detail / Retry
6. Credit Ledger / Manual Grant
7. Payment List / Refund Request basic
8. Prompt Version List
9. Style Preset List
10. Admin Audit Logs
```

이 정도만 있어도 실제 운영은 가능하다.

---

## 11.2 2차 개발

```text
1. Support Inbox
2. Webhook Logs / Replay
3. Worker Status
4. Cost Analysis
5. Template Version Manager
6. Content Moderation
7. Feature Flags
8. Admin Role Management
9. Announcement Manager
10. Email/SMS Template Manager
```

---

## 11.3 3차 개발

```text
1. AI Evaluation Dashboard
2. A/B Test Manager
3. Model Routing Rules
4. Automated Incident Detection
5. Auto Credit Restore Rule
6. SLA Dashboard
7. Workspace/Team Billing
8. Enterprise Admin
9. API Key Management
10. Advanced BI Dashboard
```

---

## 12. Cursor AI용 프로젝트 폴더 구조

```text
src/
├─ app/
│  ├─ admin/
│  │  ├─ layout.tsx
│  │  ├─ login/page.tsx
│  │  ├─ page.tsx                         # overview
│  │  ├─ users/
│  │  │  ├─ page.tsx
│  │  │  └─ [userId]/page.tsx
│  │  ├─ projects/
│  │  │  ├─ page.tsx
│  │  │  └─ [projectId]/page.tsx
│  │  ├─ render-jobs/
│  │  │  ├─ page.tsx
│  │  │  └─ [jobId]/page.tsx
│  │  ├─ billing/
│  │  │  ├─ payments/page.tsx
│  │  │  ├─ subscriptions/page.tsx
│  │  │  ├─ credits/page.tsx
│  │  │  └─ webhooks/page.tsx
│  │  ├─ ai/
│  │  │  ├─ prompts/page.tsx
│  │  │  ├─ models/page.tsx
│  │  │  └─ styles/page.tsx
│  │  ├─ support/
│  │  │  ├─ page.tsx
│  │  │  └─ macros/page.tsx
│  │  ├─ system/
│  │  │  ├─ health/page.tsx
│  │  │  └─ workers/page.tsx
│  │  └─ audit-logs/page.tsx
│  └─ api/
│     └─ admin/
│        ├─ overview/route.ts
│        ├─ users/route.ts
│        ├─ users/[userId]/route.ts
│        ├─ render-jobs/route.ts
│        ├─ render-jobs/[jobId]/retry/route.ts
│        ├─ credits/grant/route.ts
│        └─ audit-logs/route.ts
├─ components/
│  └─ admin/
│     ├─ AdminSidebar.tsx
│     ├─ AdminTopbar.tsx
│     ├─ DataTable.tsx
│     ├─ MetricCard.tsx
│     ├─ StatusBadge.tsx
│     ├─ DangerActionModal.tsx
│     ├─ JobProgressTimeline.tsx
│     ├─ JsonViewer.tsx
│     ├─ LogViewer.tsx
│     └─ CreditLedgerTable.tsx
├─ lib/
│  ├─ admin/
│  │  ├─ auth.ts
│  │  ├─ permissions.ts
│  │  ├─ audit.ts
│  │  ├─ actions.ts
│  │  └─ queries.ts
│  ├─ billing/
│  │  ├─ credits.ts
│  │  ├─ payments.ts
│  │  └─ webhooks.ts
│  ├─ render/
│  │  ├─ jobs.ts
│  │  └─ retry.ts
│  └─ db.ts
├─ prisma/
│  └─ schema.prisma
└─ types/
   ├─ admin.ts
   ├─ render.ts
   ├─ billing.ts
   └─ ai.ts
```

---

## 13. Cursor AI에게 줄 개발 지시문

```md
# 작업 목표
AI 영상 자동편집 SaaS의 관리자 페이지를 구축한다.

# 기술 스택
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Table
- React Hook Form
- Zod
- Prisma
- PostgreSQL

# 우선 구현 범위
1. /admin/login
2. /admin overview dashboard
3. /admin/users
4. /admin/users/[userId]
5. /admin/render-jobs
6. /admin/render-jobs/[jobId]
7. /admin/billing/credits
8. /admin/audit-logs

# 디자인 원칙
- 좌측 사이드바 + 상단 글로벌 검색 + 본문 카드/테이블 구조
- 관리자 페이지는 compact mode 지원
- 모든 위험 액션은 reason 입력 모달 필요
- 모든 관리자 액션은 admin_audit_logs에 기록
- 상태값은 StatusBadge 컴포넌트로 통일
- 날짜/금액/크레딧 포맷은 공통 유틸 사용

# 필수 컴포넌트
- AdminSidebar
- AdminTopbar
- DataTable
- MetricCard
- StatusBadge
- DangerActionModal
- JobProgressTimeline
- JsonViewer
- LogViewer
- CreditLedgerTable

# 필수 API
- GET /api/admin/overview
- GET /api/admin/users
- GET /api/admin/users/:id
- GET /api/admin/render-jobs
- GET /api/admin/render-jobs/:id
- POST /api/admin/render-jobs/:id/retry
- POST /api/admin/users/:id/credits/grant
- GET /api/admin/audit-logs

# 보안 요구사항
- admin role 기반 접근 제어 구현
- Support 권한은 결제 상세 일부 마스킹
- Owner/Admin만 크레딧 수동 지급 가능
- Prompt/Model 변경은 Owner 또는 AI_OPS만 가능
- 모든 POST/PATCH/DELETE는 audit log 저장

# 첫 번째 산출물
- 관리자 레이아웃
- 더미 데이터 기반 Overview Dashboard
- Users DataTable
- User Detail Tabs
- Render Jobs DataTable
- Job Detail Timeline
```

---

## 14. 최종 추천

이 서비스의 관리자 페이지는 다음 순서로 구축하는 것이 가장 효율적이다.

```text
1. 핵심 운영: 사용자 / 프로젝트 / 렌더링 작업 / 크레딧 / 결제
2. 문제 해결: 실패 작업 재시도 / 크레딧 복구 / 고객 메모 / 감사로그
3. AI 운영: 프롬프트 / 모델 / 스타일 / 템플릿
4. 성장 운영: 매출 / 퍼널 / 유지율 / 코호트 / A/B 테스트
5. 엔터프라이즈 운영: 워크스페이스 / 팀 권한 / 조직 과금 / SLA
```

초기에는 “멋진 관리자 페이지”보다 **CS가 고객 문제를 1분 안에 해결할 수 있는 페이지**가 중요하다.

따라서 1차 MVP의 핵심은 다음이다.

```text
고객 검색
→ 고객 상세
→ 최근 프로젝트/렌더링 실패 확인
→ 크레딧 복구 또는 재시도
→ 관리자 메모/감사로그 자동 기록
```

이 흐름만 제대로 만들어도 실제 유료 서비스 운영이 가능해진다.

---

## 15. 참고 자료

- Retool: https://retool.com/
- Appsmith: https://www.appsmith.com/
- Forest Admin: https://forest.app/
- React-admin: https://marmelab.com/react-admin/
- React-admin GitHub: https://github.com/marmelab/react-admin
- Refine: https://refine.dev/
- Refine GitHub: https://github.com/refinedev/refine
- Stripe Dashboard docs: https://docs.stripe.com/dashboard
- Stripe Customer Portal docs: https://docs.stripe.com/customer-management
- Stripe Usage-based Billing docs: https://docs.stripe.com/billing/subscriptions/usage-based
- Supabase Platform docs: https://supabase.com/docs/guides/platform
- Channel Talk: https://channel.io/en
- shadcn/ui: https://ui.shadcn.com/
- Ant Design: https://ant.design/
- MUI: https://mui.com/
- BullMQ docs: https://docs.bullmq.io/
- Trigger.dev: https://trigger.dev/
- Temporal docs: https://docs.temporal.io/
- Sentry: https://sentry.io/
- PostHog: https://posthog.com/
