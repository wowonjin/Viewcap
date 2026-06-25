# ViewCap — AI 영상편집 SaaS MVP

AI가 자동으로 9:16 쇼츠 편집본을 생성하고, Remotion 기반 실시간 미리보기와 MP4 렌더링, 크레딧/결제, 관리자 콘솔까지 포함한 MVP monorepo입니다.

## Tech Stack

- **apps/web** — Next.js 15, Tailwind, shadcn-style UI, Remotion Player
- **apps/worker** — BullMQ (ingest / analyze / render)
- **packages/database** — Prisma + PostgreSQL (프로덕션) / SQLite (로컬)
- **packages/edl** — EDL JSON types + natural language patch
- **packages/remotion** — Video composition

## Prerequisites

- Node.js 20+
- **로컬 개발 (권장)**: Docker 없이 SQLite + 로컬 파일 스토리지로 바로 실행 가능
- **프로덕션/풀스택**: Docker Desktop (PostgreSQL, Redis, MinIO)
- FFmpeg (worker 렌더/프록시용, optional — fallback 있음)

## Quick Start (Docker 없이 — 로컬)

```bash
# 1. Install dependencies
npm install

# 2. 환경변수 (루트 .env — .env.example 복사)
cp .env.example .env

# 3. SQLite DB 생성 + 시드
npm run db:setup:local

# 4. Web dev server
npm run dev -w @viewcap/web
```

Web: http://localhost:3000

로컬 모드 기본값:
- `DATABASE_URL=file:./packages/database/prisma/dev.db`
- `LOCAL_STORAGE=true` — 업로드 파일은 `apps/web/storage/uploads/`에 저장
- Redis/worker 없이 analyze/render는 web API sync fallback으로 처리

## Quick Start (Docker — 프로덕션-like)

```bash
npm install
docker compose up -d

# MinIO Console: http://localhost:9001 (minioadmin / minioadmin)
# bucket 생성: viewcap

npm run db:generate
npm run db:push
npm run db:seed

npm run dev -w @viewcap/web
npm run dev -w @viewcap/worker   # 별도 터미널
```

## Dev Auth (Supabase 없이)

`.env`에 `DEV_AUTH_ENABLED=true` 설정 시 쿠키 기반 로컬 인증 사용.

| Account | Email |
|---|---|
| Demo user | demo@viewcap.local |
| Admin | admin@viewcap.local |

로그인 페이지에서 demo 계정으로 바로 로그인 가능.

## Environment Variables

`.env.example` 참고. 주요 항목:

| Variable | 설명 |
|---|---|
| `DATABASE_URL` | SQLite (`file:...`) 또는 PostgreSQL |
| `LOCAL_STORAGE` | `true`면 S3 대신 로컬 디스크 사용 |
| `REDIS_URL` | BullMQ (worker 사용 시) |
| `S3_*` | MinIO/S3 스토리지 (프로덕션) |
| `OPENAI_API_KEY` | Whisper 전사 + GPT EDL 보정 (없으면 mock) |
| `DEV_AUTH_ENABLED` | 로컬 dev auth |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` / `TOSS_SECRET_KEY` | 토스페이먼츠 |

## User Flow

1. `/signup` → 300 크레딧 지급
2. `/projects/new` → 프로젝트 생성
3. `/projects/[id]/brief` → 영상 업로드 + 편집 브리프
4. `/projects/[id]/editor` → Remotion 미리보기 + 자연어 수정
5. 렌더링 → 크레딧 차감 → MP4 다운로드
6. `/settings/billing` → 플랜 구독 (dev 모드에서 webhook bypass)

## Admin

`/admin` — Overview, Users, Render Jobs, Billing, Credits, Support

- 사용자 상세: `/admin/users/[id]` (크레딧 조정)
- 렌더 작업 상세: `/admin/render-jobs/[id]`
- 크레딧 원장: `/admin/credits`

Admin email: `admin@viewcap.local` (`ADMIN_EMAILS` env)

## SEO / Marketing Pages

- `/ai-video-editor`, `/ai-shorts-editor`, `/ai-lecture-video-editor`
- `/ai-subtitle-generator`, `/ai-solution-video-maker`
- `/how-it-works`, `/compare/capcut-ai-alternative`, `/compare/vrew-alternative`
- `sitemap.xml`, `robots.txt`, JSON-LD (Organization, FAQ, SoftwareApplication)

## Project Structure

```
viewcap/
├── apps/web/           # Next.js frontend + API routes
├── apps/worker/        # BullMQ media workers
├── packages/
│   ├── database/       # Prisma schema (PG + SQLite)
│   ├── edl/            # EDL types & patches
│   └── remotion/       # Remotion composition
├── docker-compose.yml
└── .env.example
```

## Sync Fallback (Worker/Redis 없을 때)

Redis/worker 미실행 시 web API가 analyze/render를 sync fallback으로 처리합니다.
- analyze: 로컬 proxy 생성 + Whisper(또는 mock) 전사
- render: 로컬 파일 복사로 출력물 생성

프로덕션에서는 worker를 반드시 실행하세요.

## Scripts

| Command | Description |
|---|---|
| `npm run dev -w @viewcap/web` | Web dev server |
| `npm run dev -w @viewcap/worker` | Background workers |
| `npm run db:setup:local` | SQLite generate + push + seed |
| `npm run db:push` | Push Prisma schema (PostgreSQL) |
| `npm run db:seed` | Seed plans/presets/admin |

## MVP Scope

**Included:** Landing, SEO pages, auth, dashboard, upload, AI EDL, preview, render, credits, Toss billing, admin console

**Excluded:** Team/workspace, B2B, API platform, manual timeline editor, 4K

## License Notes

Remotion commercial license may be required for production SaaS. Review before launch.
