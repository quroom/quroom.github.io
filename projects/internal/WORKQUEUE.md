# WORKQUEUE.md

지속 작업 큐 (우선순위 높은 순)

## 운영 규칙
- 한 번에 **작업 1개**만 처리
- 처리 순서: `PENDING` → `DOING` → `DONE`
- 각 작업 완료 시:
  1. 웹 반영(필요 시)
  2. git commit + push
  3. 변경 요약 기록
- 막히면 `BLOCKED`로 전환하고, 필요한 입력만 요청
- 승인 없이 하지 말 것: 외부 메시지 발송, 삭제성 작업, 민감정보 처리

## Queue

### [BGL-011] 4주 연재 업로드 순서표 + 게시 캘린더 문서화
- Status: DOING
- Output:
  - `/projects/bogle-ops/publishing-calendar.md`
  - docs/index 링크 반영

### [BGL-012] 운영진 댓글 대응 30문구 확장본
- Status: DONE
- Output:
  - `/projects/bogle-ops/moderation-replies-30.md`
  - docs/index 링크 반영

### [BGL-013] 온보딩 A/B 실험 설계 문서
- Status: DONE
- Output:
  - `/projects/bogle-ops/onboarding-ab-test.md`
  - KPI 측정 필드 포함

### [BGL-014] 월간 KPI 대시보드 템플릿 (운영용)
- Status: DONE
- Output:
  - `/projects/bogle-ops/kpi-dashboard-template.md`

### [BGL-015] 카페 필독 공지 리팩토링 (짧은/긴 버전)
- Status: DONE
- Output:
  - `/projects/bogle-ops/notice-refactor-short-long.md`

### [BGL-016] 운영진 대응 매크로 50개
- Status: DONE
- Output:
  - `/projects/bogle-ops/moderation-replies-50.md`

### [BGL-017] 월간 리포트 자동 생성 포맷
- Status: DONE
- Output:
  - `/projects/bogle-ops/monthly-report-generator-format.md`

### [BGL-018] 신규회원 7일 온보딩 A/B 실험안
- Status: DONE
- Output:
  - `/projects/bogle-ops/onboarding-ab-test-pack.md`

### [BGL-019] 카페 글 품질 30초 체크리스트
- Status: DONE
- Output:
  - `/projects/bogle-ops/post-quality-check-30s.md`

### [BGL-020] 스레드용 보글 유머 카피라이팅 팩 (대량 생성)
- Status: DONE
- Output:
  - `/projects/bogle-ops/threads-humor-pack-001.md`
  - 톤: 초보/중수/고수/보글 4단 구성, 짧은 풍자형
  - 수량: 최소 100개 (시리즈형)

### [BGL-021] Playwright 기반 TAC 동적수집 파이프라인 구축
- Status: DONE
- Output:
  - `/bogle-ops/tac-playwright/README.md`
  - `/bogle-ops/tac-playwright/fetch_tac.mjs`
  - `/bogle-ops/tac-playwright/package.json`
  - 결과를 `tac_overrides.csv`에 병합하는 가이드

### [BGL-030] 노후준비 시뮬레이션 서비스 PRD v1 작성
- Status: DONE
- Output:
  - `/projects/retire-sim/prd-v1.md`

### [BGL-031] 사용자 페르소나/문제정의(지수투자 관점)
- Status: DONE
- Output:
  - `/projects/retire-sim/personas-problems.md`

### [BGL-032] 핵심 계산엔진 스펙 (적립/인출/물가/세금)
- Status: DONE
- Output:
  - `/projects/retire-sim/engine-spec.md`

### [BGL-033] 시뮬레이션 시나리오 20개 설계
- Status: DONE
- Output:
  - `/projects/retire-sim/scenarios-20.md`

### [BGL-034] 데이터 모델/입력 스키마 정의
- Status: DONE
- Output:
  - `/projects/retire-sim/data-schema.md`

### [BGL-035] MVP 기능 우선순위 (MoSCoW)
- Status: PENDING
- Output:
  - `/projects/retire-sim/mvp-priority.md`

### [BGL-036] 기술 아키텍처 초안 (웹앱/API/배치)
- Status: PENDING
- Output:
  - `/projects/retire-sim/architecture.md`

### [BGL-037] 화면설계 와이어프레임 텍스트 버전
- Status: PENDING
- Output:
  - `/projects/retire-sim/wireframe-text.md`

### [BGL-038] 리스크/컴플라이언스 체크리스트
- Status: PENDING
- Output:
  - `/projects/retire-sim/risk-compliance.md`

### [BGL-039] 운영 정책 (고객문의/장애/버전관리)
- Status: PENDING
- Output:
  - `/projects/retire-sim/ops-policy.md`

### [BGL-040] 개발 백로그 (에픽/스토리/작업단위)
- Status: PENDING
- Output:
  - `/projects/retire-sim/dev-backlog.md`

### [BGL-041] QA 테스트플랜 + 수치 검증 케이스
- Status: PENDING
- Output:
  - `/projects/retire-sim/qa-testplan.md`

### [BGL-042] GTM/마케팅 플랜 (콘텐츠/채널/지표)
- Status: PENDING
- Output:
  - `/projects/retire-sim/gtm-marketing.md`

### [BGL-043] 온보딩 카피/랜딩페이지 문안
- Status: PENDING
- Output:
  - `/projects/retire-sim/landing-copy.md`

### [BGL-044] 가격정책/수익모델 실험안
- Status: PENDING
- Output:
  - `/projects/retire-sim/pricing-experiments.md`

### [BGL-045] 월요일 점검 리포트(주말 산출물 요약)
- Status: PENDING
- Output:
  - `/projects/retire-sim/monday-summary.md`

### [BIZ-100] 즉시수익화 오퍼 구조 설계 (자동화/코칭/세팅)
- Status: PENDING
- Output:
  - `/projects/service-monetization/offer-architecture.md`

### [BIZ-101] 상품 3종 상세 스펙/범위/산출물 정의
- Status: PENDING
- Output:
  - `/projects/service-monetization/packages-spec.md`

### [BIZ-102] 가격정책/할인/업셀/월구독 모델 설계
- Status: PENDING
- Output:
  - `/projects/service-monetization/pricing-model.md`

### [BIZ-103] 리드 수집형 무료 줌강의 기획안 + 신청폼 문항
- Status: PENDING
- Output:
  - `/projects/service-monetization/free-webinar-plan.md`

### [BIZ-104] 줌강의 60분 스크립트/데모 흐름/CTA 문구
- Status: PENDING
- Output:
  - `/projects/service-monetization/webinar-script-60m.md`

### [BIZ-105] 랜딩페이지 카피 + FAQ + 전환 CTA 설계
- Status: PENDING
- Output:
  - `/projects/service-monetization/landing-copy-faq.md`

### [BIZ-106] 상담콜 스크립트(진단→제안→클로징)
- Status: PENDING
- Output:
  - `/projects/service-monetization/sales-call-script.md`

### [BIZ-107] 견적서/SOW/계약 템플릿 초안
- Status: PENDING
- Output:
  - `/projects/service-monetization/sow-contract-templates.md`

### [BIZ-108] 온보딩 체크리스트(고객 자료 수집/킥오프)
- Status: PENDING
- Output:
  - `/projects/service-monetization/client-onboarding-checklist.md`

### [BIZ-109] 프로젝트 실행 SOP (주간 운영/리포트/장애대응)
- Status: PENDING
- Output:
  - `/projects/service-monetization/delivery-sop.md`

### [BIZ-110] 지역(전라도권) 오프라인+온라인 영업 플랜
- Status: PENDING
- Output:
  - `/projects/service-monetization/regional-go-to-market.md`

### [BIZ-111] 콘텐츠 마케팅 캘린더 4주 (Threads/LinkedIn/카페)
- Status: PENDING
- Output:
  - `/projects/service-monetization/content-calendar-4weeks.md`

### [BIZ-112] 첫 10고객 확보 실행계획 (주차별 KPI)
- Status: PENDING
- Output:
  - `/projects/service-monetization/first-10-customers-plan.md`

### [BIZ-113] 수익성 대시보드(매출/마진/시간당수익)
- Status: PENDING
- Output:
  - `/projects/service-monetization/unit-economics-dashboard.md`

### [BIZ-114] 월요일 런치체크리스트 + 실행 요약본
- Status: PENDING
- Output:
  - `/projects/service-monetization/monday-launch-checklist.md`

### [OPS-001] 주기 실행 구조(heartbeat cron) 구축
- Status: DONE
- Output:
  - cron job: `bogle-heartbeat` (every 10m, session=main, system-event)

### [OPS-002] WORKQUEUE 대시보드 구축
- Status: DOING
- Output:
  - `/projects/internal/workqueue-dashboard.html`
  - `/projects/internal/WORKQUEUE.md`와 연동

---

## 주기 실행 구조
- 트리거: OpenClaw cron `bogle-heartbeat` (매 10분)
- 페이로드: HEARTBEAT 표준 프롬프트 시스템 이벤트
- 동작: HEARTBEAT.md 지침에 따라 WORKQUEUE 상단 PENDING 1개 처리
- 안전장치: 외부 발송/삭제/민감작업은 승인 필요

## 작업 로그
- 2026-02-21: 큐 초기화 완료
- 2026-02-21: OPS-001 완료 (cron id: 2a20369e-a38b-4775-a7d2-9b68aa26e545)
- 2026-02-21: cron 주기 60분 -> 10분 변경
- 2026-02-21: BGL-015~019 작업 큐 추가
- 2026-02-21: OPS-002 대시보드 작업 시작
- 2026-02-21: BGL-012 완료 (`/projects/bogle-ops/moderation-replies-30.md`, commit: 61b40ad)
- 2026-02-21: BGL-013 완료 (`/projects/bogle-ops/onboarding-ab-test.md`, commit: 14579e1)
- 2026-02-21: BGL-014 완료 (`/projects/bogle-ops/kpi-dashboard-template.md`, commit: 7b4b393)
- 2026-02-21: BGL-015 완료 (`/projects/bogle-ops/notice-refactor-short-long.md`, commit: 7a01cb0)
- 2026-02-21: BGL-016 완료 (`/projects/bogle-ops/moderation-replies-50.md`, commit: 421ef2b)
- 2026-02-21: BGL-017 완료 (`/projects/bogle-ops/monthly-report-generator-format.md`, commit: 00c1c5f)
- 2026-02-21: BGL-020 추가 (스레드용 보글 유머 카피라이팅 팩)
- 2026-02-21: BGL-018 완료 (`/projects/bogle-ops/onboarding-ab-test-pack.md`, commit: ed07019)
- 2026-02-21: BGL-021 완료 (`/bogle-ops/tac-playwright/*`, Playwright 수집 스캐폴드)
- 2026-02-21: BGL-021 후속 성공 (ETF CHECK `getEtpLatestFee`로 실비용 자동수집, commit: 96cfb62 / pages: 0e7af08)
- 2026-02-21: BGL-019 완료 (`/projects/bogle-ops/post-quality-check-30s.md`, commit: 53ade7d)
- 2026-02-21: BGL-020 완료 (`/projects/bogle-ops/threads-humor-pack-001.md`, commit: 5ad2fa7)
- 2026-02-21: BGL-030~045 추가 (노후준비 시뮬레이션 서비스 주말 태스크팩)
- 2026-02-21: BGL-030 완료 (`/projects/retire-sim/prd-v1.md`)
- 2026-02-21: BGL-031 완료 (`/projects/retire-sim/personas-problems.md`)
- 2026-02-21: BGL-032 완료 (`/projects/retire-sim/engine-spec.md`)
- 2026-02-21: BGL-033 완료 (`/projects/retire-sim/scenarios-20.md`)
- 2026-02-21: BGL-034 완료 (`/projects/retire-sim/data-schema.md`)
- 2026-02-21: BIZ-100~114 추가 (즉시수익화 프로젝트 태스크팩)
