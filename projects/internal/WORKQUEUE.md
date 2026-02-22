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
- **카페 콘텐츠 작업 작성 원칙:** 카페 게시용 콘텐츠(게시글/FAQ/댓글매크로/온보딩 문안 등)에 한해 Bogleheads 철학(저비용·광범위 분산·장기보유·규칙적 투자·단순 포트폴리오)을 반드시 반영한다. (참조: [`/projects/bogle-beginner-kit/STYLE-GUIDE.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/STYLE-GUIDE.md))

## 실행 보드 (1인 기업 모드)

### NOW (1개만)
- [OPS-002] WORKQUEUE 대시보드 단일화/정비

### NEXT (최대 3개)
- [BGL-201] 카페 초보자용 지수투자 시작 가이드 10편
- [BGL-202] 초보자 FAQ 50문답 (복붙형)
- [BGL-204] 카페 댓글 대응 매크로(초보자 질문형) 100개

### LATER
- 나머지 DONE 문서는 아카이브로 유지 (실행 대상 아님)

## Queue

### [BGL-011] 4주 연재 업로드 순서표 + 게시 캘린더 문서화
- Status: DOING
- Output:
  - [`/projects/bogle-ops/publishing-calendar.md`](/md-viewer.html?file=/projects/bogle-ops/publishing-calendar.md)
  - docs/index 링크 반영

### [BGL-012] 운영진 댓글 대응 30문구 확장본
- Status: DONE
- Output:
  - [`/projects/bogle-ops/moderation-replies-30.md`](/md-viewer.html?file=/projects/bogle-ops/moderation-replies-30.md)
  - docs/index 링크 반영

### [BGL-013] 온보딩 A/B 실험 설계 문서
- Status: DONE
- Output:
  - [`/projects/bogle-ops/onboarding-ab-test.md`](/md-viewer.html?file=/projects/bogle-ops/onboarding-ab-test.md)
  - KPI 측정 필드 포함

### [BGL-014] 월간 KPI 대시보드 템플릿 (운영용)
- Status: DONE
- Output:
  - [`/projects/bogle-ops/kpi-dashboard-template.md`](/md-viewer.html?file=/projects/bogle-ops/kpi-dashboard-template.md)

### [BGL-015] 카페 필독 공지 리팩토링 (짧은/긴 버전)
- Status: DONE
- Output:
  - [`/projects/bogle-ops/notice-refactor-short-long.md`](/md-viewer.html?file=/projects/bogle-ops/notice-refactor-short-long.md)

### [BGL-016] 운영진 대응 매크로 50개
- Status: DONE
- Output:
  - [`/projects/bogle-ops/moderation-replies-50.md`](/md-viewer.html?file=/projects/bogle-ops/moderation-replies-50.md)

### [BGL-017] 월간 리포트 자동 생성 포맷
- Status: DONE
- Output:
  - [`/projects/bogle-ops/monthly-report-generator-format.md`](/md-viewer.html?file=/projects/bogle-ops/monthly-report-generator-format.md)

### [BGL-018] 신규회원 7일 온보딩 A/B 실험안
- Status: DONE
- Output:
  - [`/projects/bogle-ops/onboarding-ab-test-pack.md`](/md-viewer.html?file=/projects/bogle-ops/onboarding-ab-test-pack.md)

### [BGL-019] 카페 글 품질 30초 체크리스트
- Status: DONE
- Output:
  - [`/projects/bogle-ops/post-quality-check-30s.md`](/md-viewer.html?file=/projects/bogle-ops/post-quality-check-30s.md)

### [BGL-020] 스레드용 보글 유머 카피라이팅 팩 (대량 생성)
- Status: DONE
- Output:
  - [`/projects/bogle-ops/threads-humor-pack-001.md`](/md-viewer.html?file=/projects/bogle-ops/threads-humor-pack-001.md)
  - 톤: 초보/중수/고수/보글 4단 구성, 짧은 풍자형
  - 수량: 최소 100개 (시리즈형)

### [BGL-021] Playwright 기반 TAC 동적수집 파이프라인 구축
- Status: DONE
- Output:
  - [`/bogle-ops/tac-playwright/README.md`](/md-viewer.html?file=/bogle-ops/tac-playwright/README.md)
  - [`/bogle-ops/tac-playwright/fetch_tac.mjs`](/bogle-ops/tac-playwright/fetch_tac.mjs)
  - [`/bogle-ops/tac-playwright/package.json`](/bogle-ops/tac-playwright/package.json)
  - 결과를 `tac_overrides.csv`에 병합하는 가이드

### [BGL-030] 노후준비 시뮬레이션 서비스 PRD v1 작성
- Status: DONE
- Output:
  - [`/projects/retire-sim/prd-v1.md`](/md-viewer.html?file=/projects/retire-sim/prd-v1.md)

### [BGL-031] 사용자 페르소나/문제정의(지수투자 관점)
- Status: DONE
- Output:
  - [`/projects/retire-sim/personas-problems.md`](/md-viewer.html?file=/projects/retire-sim/personas-problems.md)

### [BGL-032] 핵심 계산엔진 스펙 (적립/인출/물가/세금)
- Status: DONE
- Output:
  - [`/projects/retire-sim/engine-spec.md`](/md-viewer.html?file=/projects/retire-sim/engine-spec.md)

### [BGL-033] 시뮬레이션 시나리오 20개 설계
- Status: DONE
- Output:
  - [`/projects/retire-sim/scenarios-20.md`](/md-viewer.html?file=/projects/retire-sim/scenarios-20.md)

### [BGL-034] 데이터 모델/입력 스키마 정의
- Status: DONE
- Output:
  - [`/projects/retire-sim/data-schema.md`](/md-viewer.html?file=/projects/retire-sim/data-schema.md)

### [BGL-035] MVP 기능 우선순위 (MoSCoW)
- Status: DONE
- Output:
  - [`/projects/retire-sim/mvp-priority.md`](/md-viewer.html?file=/projects/retire-sim/mvp-priority.md)

### [BGL-036] 기술 아키텍처 초안 (웹앱/API/배치)
- Status: DONE
- Output:
  - [`/projects/retire-sim/architecture.md`](/md-viewer.html?file=/projects/retire-sim/architecture.md)

### [BGL-037] 화면설계 와이어프레임 텍스트 버전
- Status: DONE
- Output:
  - [`/projects/retire-sim/wireframe-text.md`](/md-viewer.html?file=/projects/retire-sim/wireframe-text.md)

### [BGL-038] 리스크/컴플라이언스 체크리스트
- Status: DONE
- Output:
  - [`/projects/retire-sim/risk-compliance.md`](/md-viewer.html?file=/projects/retire-sim/risk-compliance.md)

### [BGL-039] 운영 정책 (고객문의/장애/버전관리)
- Status: DONE
- Output:
  - [`/projects/retire-sim/ops-policy.md`](/md-viewer.html?file=/projects/retire-sim/ops-policy.md)

### [BGL-040] 개발 백로그 (에픽/스토리/작업단위)
- Status: DONE
- Output:
  - [`/projects/retire-sim/dev-backlog.md`](/md-viewer.html?file=/projects/retire-sim/dev-backlog.md)

### [BGL-041] QA 테스트플랜 + 수치 검증 케이스
- Status: DONE
- Output:
  - [`/projects/retire-sim/qa-testplan.md`](/md-viewer.html?file=/projects/retire-sim/qa-testplan.md)

### [BGL-042] GTM/마케팅 플랜 (콘텐츠/채널/지표)
- Status: DONE
- Output:
  - [`/projects/retire-sim/gtm-marketing.md`](/md-viewer.html?file=/projects/retire-sim/gtm-marketing.md)

### [BGL-043] 온보딩 카피/랜딩페이지 문안
- Status: DONE
- Output:
  - [`/projects/retire-sim/landing-copy.md`](/md-viewer.html?file=/projects/retire-sim/landing-copy.md)

### [BGL-044] 가격정책/수익모델 실험안
- Status: DONE
- Output:
  - [`/projects/retire-sim/pricing-experiments.md`](/md-viewer.html?file=/projects/retire-sim/pricing-experiments.md)

### [BGL-045] 월요일 점검 리포트(주말 산출물 요약)
- Status: DONE
- Output:
  - [`/projects/retire-sim/monday-summary.md`](/md-viewer.html?file=/projects/retire-sim/monday-summary.md)

### [BIZ-100] 즉시수익화 오퍼 구조 설계 (자동화/코칭/세팅)
- Status: DONE
- Output:
  - [`/projects/service-monetization/offer-architecture.md`](/md-viewer.html?file=/projects/service-monetization/offer-architecture.md)

### [BIZ-101] 상품 3종 상세 스펙/범위/산출물 정의
- Status: DONE
- Output:
  - [`/projects/service-monetization/packages-spec.md`](/md-viewer.html?file=/projects/service-monetization/packages-spec.md)

### [BIZ-102] 가격정책/할인/업셀/월구독 모델 설계
- Status: DONE
- Output:
  - [`/projects/service-monetization/pricing-model.md`](/md-viewer.html?file=/projects/service-monetization/pricing-model.md)

### [BIZ-103] 리드 수집형 무료 줌강의 기획안 + 신청폼 문항
- Status: DONE
- Output:
  - [`/projects/service-monetization/free-webinar-plan.md`](/md-viewer.html?file=/projects/service-monetization/free-webinar-plan.md)

### [BIZ-104] 줌강의 60분 스크립트/데모 흐름/CTA 문구
- Status: DONE
- Output:
  - [`/projects/service-monetization/webinar-script-60m.md`](/md-viewer.html?file=/projects/service-monetization/webinar-script-60m.md)

### [BIZ-105] 랜딩페이지 카피 + FAQ + 전환 CTA 설계
- Status: DONE
- Output:
  - [`/projects/service-monetization/landing-copy-faq.md`](/md-viewer.html?file=/projects/service-monetization/landing-copy-faq.md)

### [BIZ-106] 상담콜 스크립트(진단→제안→클로징)
- Status: DONE
- Output:
  - [`/projects/service-monetization/sales-call-script.md`](/md-viewer.html?file=/projects/service-monetization/sales-call-script.md)

### [BIZ-107] 견적서/SOW/계약 템플릿 초안
- Status: DONE
- Output:
  - [`/projects/service-monetization/sow-contract-templates.md`](/md-viewer.html?file=/projects/service-monetization/sow-contract-templates.md)

### [BIZ-108] 온보딩 체크리스트(고객 자료 수집/킥오프)
- Status: DONE
- Output:
  - [`/projects/service-monetization/client-onboarding-checklist.md`](/md-viewer.html?file=/projects/service-monetization/client-onboarding-checklist.md)

### [BIZ-109] 프로젝트 실행 SOP (주간 운영/리포트/장애대응)
- Status: DONE
- Output:
  - [`/projects/service-monetization/delivery-sop.md`](/md-viewer.html?file=/projects/service-monetization/delivery-sop.md)

### [BIZ-110] 지역(전라도권) 오프라인+온라인 영업 플랜
- Status: DONE
- Output:
  - [`/projects/service-monetization/regional-go-to-market.md`](/md-viewer.html?file=/projects/service-monetization/regional-go-to-market.md)

### [BIZ-111] 콘텐츠 마케팅 캘린더 4주 (Threads/LinkedIn/카페)
- Status: DONE
- Output:
  - [`/projects/service-monetization/content-calendar-4weeks.md`](/md-viewer.html?file=/projects/service-monetization/content-calendar-4weeks.md)

### [BIZ-112] 첫 10고객 확보 실행계획 (주차별 KPI)
- Status: DONE
- Output:
  - [`/projects/service-monetization/first-10-customers-plan.md`](/md-viewer.html?file=/projects/service-monetization/first-10-customers-plan.md)

### [BIZ-113] 수익성 대시보드(매출/마진/시간당수익)
- Status: DONE
- Output:
  - [`/projects/service-monetization/unit-economics-dashboard.md`](/md-viewer.html?file=/projects/service-monetization/unit-economics-dashboard.md)

### [BIZ-114] 월요일 런치체크리스트 + 실행 요약본
- Status: DONE
- Output:
  - [`/projects/service-monetization/monday-launch-checklist.md`](/md-viewer.html?file=/projects/service-monetization/monday-launch-checklist.md)

### [BIZ-115] 고립은둔 완화형 운영원칙 설계 (사회적 연결 중심)
- Status: DONE
- Output:
  - [`/projects/service-monetization/social-connection-principles.md`](/md-viewer.html?file=/projects/service-monetization/social-connection-principles.md)

### [BIZ-116] 오프라인 소규모 밋업 파일럿 기획 (전라도권)
- Status: DONE
- Output:
  - [`/projects/service-monetization/local-meetup-pilot.md`](/md-viewer.html?file=/projects/service-monetization/local-meetup-pilot.md)

### [BIZ-117] 무료 줌 스터디/오피스아워 주간 운영안
- Status: DONE
- Output:
  - [`/projects/service-monetization/weekly-office-hours.md`](/md-viewer.html?file=/projects/service-monetization/weekly-office-hours.md)

### [BIZ-118] 1:1 진단콜 이후 후속 접촉 시나리오(관계 유지형)
- Status: DONE
- Output:
  - [`/projects/service-monetization/followup-retention-flow.md`](/md-viewer.html?file=/projects/service-monetization/followup-retention-flow.md)

### [BIZ-119] 커뮤니티 참여 루프 설계 (신규→활동→기여)
- Status: DONE
- Output:
  - [`/projects/service-monetization/community-engagement-loop.md`](/md-viewer.html?file=/projects/service-monetization/community-engagement-loop.md)

### [BIZ-120] 월 1회 오프라인/온라인 하이브리드 데모데이 기획
- Status: DONE
- Output:
  - [`/projects/service-monetization/hybrid-demo-day.md`](/md-viewer.html?file=/projects/service-monetization/hybrid-demo-day.md)

### [OPS-001] 주기 실행 구조(heartbeat cron) 구축
- Status: DONE
- Output:
  - cron job: `bogle-heartbeat` (every 10m, session=main, system-event)

### [OPS-002] WORKQUEUE 대시보드 구축
- Status: DOING
- Output:
  - [`/projects/internal/workqueue-dashboard.html`](/projects/internal/workqueue-dashboard.html)
  - [`/projects/internal/WORKQUEUE.md`](/md-viewer.html?file=/projects/internal/WORKQUEUE.md)와 연동


### [REV-201] 나만의 차별점 포지셔닝 원페이지
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/differentiation-onepager.md`](/md-viewer.html?file=/projects/revenue-sprint/differentiation-onepager.md)

### [REV-202] 즉시수익화 오퍼 3종 재정의 (빠른판매형)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/offer-stack-fast-close.md`](/md-viewer.html?file=/projects/revenue-sprint/offer-stack-fast-close.md)

### [REV-203] 2주 MVP 개발 백로그 (수익 우선)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/mvp-dev-backlog-2weeks.md`](/md-viewer.html?file=/projects/revenue-sprint/mvp-dev-backlog-2weeks.md)

### [REV-204] 리드 자석(무료 템플릿) 5종 기획
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/lead-magnet-pack-5.md`](/md-viewer.html?file=/projects/revenue-sprint/lead-magnet-pack-5.md)

### [REV-205] 7일 콘텐츠 캘린더 (신뢰→상담 전환)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/content-calendar-7days.md`](/md-viewer.html?file=/projects/revenue-sprint/content-calendar-7days.md)

### [REV-206] DM/댓글 인바운드 세일즈 스크립트 40개
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/inbound-sales-scripts-40.md`](/md-viewer.html?file=/projects/revenue-sprint/inbound-sales-scripts-40.md)

### [REV-207] 상담콜 클로징 플로우 (진단→결제)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/call-closing-flow.md`](/md-viewer.html?file=/projects/revenue-sprint/call-closing-flow.md)

### [REV-208] 랜딩페이지 구조 리팩터링 (1페이지 판매형)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/landing-restructure-onepage.md`](/md-viewer.html?file=/projects/revenue-sprint/landing-restructure-onepage.md)

### [REV-209] 가격/할인/긴급성 룰북 (과장없는 전환형)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/pricing-urgency-rulebook.md`](/md-viewer.html?file=/projects/revenue-sprint/pricing-urgency-rulebook.md)

### [REV-210] 파이프라인 대시보드 (리드→상담→결제)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/pipeline-dashboard-template.md`](/md-viewer.html?file=/projects/revenue-sprint/pipeline-dashboard-template.md)

### [REV-211] 10일 런치 실행 시퀀스 (1인기업 한정)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/launch-sequence-10days-solo.md`](/md-viewer.html?file=/projects/revenue-sprint/launch-sequence-10days-solo.md)

### [REV-212] 고객 인터뷰 질문지 + 오퍼 개선 루프
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/customer-interview-loop.md`](/md-viewer.html?file=/projects/revenue-sprint/customer-interview-loop.md)


### [REV-213] 월요일 디테일 실행계획 (고액 외주 포함)
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/monday-detail-plan-outsourcing-10m-20m.md`](/md-viewer.html?file=/projects/revenue-sprint/monday-detail-plan-outsourcing-10m-20m.md)

### [REV-214] 고액 외주 제안서 템플릿 v1
- Status: DONE
- Output:
  - [`/projects/revenue-sprint/high-ticket-outsourcing-proposal-template.md`](/md-viewer.html?file=/projects/revenue-sprint/high-ticket-outsourcing-proposal-template.md)


### [CHK-001] 월요일 디테일 계획 확정 미팅
- Status: DONE
- Output:
  - [`/projects/internal/must-check-items.md`](/md-viewer.html?file=/projects/internal/must-check-items.md)


### [BGL-201] 카페 초보자용 지수투자 시작 가이드 10편
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/001-start-here.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/001-start-here.md)

### [BGL-202] 초보자 FAQ 50문답 (복붙형)
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/faq-50.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/faq-50.md)

### [BGL-203] 하락장 멘탈관리 카피 100선
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/bear-market-copies-100.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/bear-market-copies-100.md)

### [BGL-204] 카페 댓글 대응 매크로(초보자 질문형) 100개
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/comment-macros-100.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/comment-macros-100.md)

### [BGL-205] 주차별 온보딩 포스트 4주치 (복붙형)
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/onboarding-4weeks.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/onboarding-4weeks.md)

### [BGL-206] ETF 선택 기준 카드뉴스 원고 30개
- Status: DONE
- Output:
  - [`/projects/bogle-beginner-kit/etf-selection-cards-30.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/etf-selection-cards-30.md)

### [BGL-207] 월간 점검 템플릿 + 예시 12개월
- Status: PENDING
- Output:
  - [`/projects/bogle-beginner-kit/monthly-check-template-12m.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/monthly-check-template-12m.md)

### [BGL-208] 초보자 금지행동 체크리스트 200
- Status: PENDING
- Output:
  - [`/projects/bogle-beginner-kit/no-go-checklist-200.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/no-go-checklist-200.md)

### [BGL-209] 카페 공지/필독 리팩토링(짧은/긴) 20세트
- Status: PENDING
- Output:
  - [`/projects/bogle-beginner-kit/notice-refactor-20sets.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/notice-refactor-20sets.md)

### [BGL-210] 월요일까지 게시 가능한 복붙 패킷 v1
- Status: PENDING
- Output:
  - [`/projects/bogle-beginner-kit/copy-paste-pack-v1.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/copy-paste-pack-v1.md)

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
- 2026-02-21: BGL-012 완료 ([`/projects/bogle-ops/moderation-replies-30.md`](/md-viewer.html?file=/projects/bogle-ops/moderation-replies-30.md), commit: 61b40ad)
- 2026-02-21: BGL-013 완료 ([`/projects/bogle-ops/onboarding-ab-test.md`](/md-viewer.html?file=/projects/bogle-ops/onboarding-ab-test.md), commit: 14579e1)
- 2026-02-21: BGL-014 완료 ([`/projects/bogle-ops/kpi-dashboard-template.md`](/md-viewer.html?file=/projects/bogle-ops/kpi-dashboard-template.md), commit: 7b4b393)
- 2026-02-21: BGL-015 완료 ([`/projects/bogle-ops/notice-refactor-short-long.md`](/md-viewer.html?file=/projects/bogle-ops/notice-refactor-short-long.md), commit: 7a01cb0)
- 2026-02-21: BGL-016 완료 ([`/projects/bogle-ops/moderation-replies-50.md`](/md-viewer.html?file=/projects/bogle-ops/moderation-replies-50.md), commit: 421ef2b)
- 2026-02-21: BGL-017 완료 ([`/projects/bogle-ops/monthly-report-generator-format.md`](/md-viewer.html?file=/projects/bogle-ops/monthly-report-generator-format.md), commit: 00c1c5f)
- 2026-02-21: BGL-020 추가 (스레드용 보글 유머 카피라이팅 팩)
- 2026-02-21: BGL-018 완료 ([`/projects/bogle-ops/onboarding-ab-test-pack.md`](/md-viewer.html?file=/projects/bogle-ops/onboarding-ab-test-pack.md), commit: ed07019)
- 2026-02-21: BGL-021 완료 ([`/bogle-ops/tac-playwright/*`](/bogle-ops/tac-playwright/*), Playwright 수집 스캐폴드)
- 2026-02-21: BGL-021 후속 성공 (ETF CHECK `getEtpLatestFee`로 실비용 자동수집, commit: 96cfb62 / pages: 0e7af08)
- 2026-02-21: BGL-019 완료 ([`/projects/bogle-ops/post-quality-check-30s.md`](/md-viewer.html?file=/projects/bogle-ops/post-quality-check-30s.md), commit: 53ade7d)
- 2026-02-21: BGL-020 완료 ([`/projects/bogle-ops/threads-humor-pack-001.md`](/md-viewer.html?file=/projects/bogle-ops/threads-humor-pack-001.md), commit: 5ad2fa7)
- 2026-02-21: BGL-030~045 추가 (노후준비 시뮬레이션 서비스 주말 태스크팩)
- 2026-02-21: BGL-030 완료 ([`/projects/retire-sim/prd-v1.md`](/md-viewer.html?file=/projects/retire-sim/prd-v1.md))
- 2026-02-21: BGL-031 완료 ([`/projects/retire-sim/personas-problems.md`](/md-viewer.html?file=/projects/retire-sim/personas-problems.md))
- 2026-02-21: BGL-032 완료 ([`/projects/retire-sim/engine-spec.md`](/md-viewer.html?file=/projects/retire-sim/engine-spec.md))
- 2026-02-21: BGL-033 완료 ([`/projects/retire-sim/scenarios-20.md`](/md-viewer.html?file=/projects/retire-sim/scenarios-20.md))
- 2026-02-21: BGL-034 완료 ([`/projects/retire-sim/data-schema.md`](/md-viewer.html?file=/projects/retire-sim/data-schema.md))
- 2026-02-21: BGL-035 완료 ([`/projects/retire-sim/mvp-priority.md`](/md-viewer.html?file=/projects/retire-sim/mvp-priority.md))
- 2026-02-21: BGL-036 완료 ([`/projects/retire-sim/architecture.md`](/md-viewer.html?file=/projects/retire-sim/architecture.md))
- 2026-02-21: BGL-037 완료 ([`/projects/retire-sim/wireframe-text.md`](/md-viewer.html?file=/projects/retire-sim/wireframe-text.md))
- 2026-02-21: BGL-038 완료 ([`/projects/retire-sim/risk-compliance.md`](/md-viewer.html?file=/projects/retire-sim/risk-compliance.md))
- 2026-02-21: BGL-039 완료 ([`/projects/retire-sim/ops-policy.md`](/md-viewer.html?file=/projects/retire-sim/ops-policy.md))
- 2026-02-21: BGL-040 완료 ([`/projects/retire-sim/dev-backlog.md`](/md-viewer.html?file=/projects/retire-sim/dev-backlog.md))
- 2026-02-21: BGL-041 완료 ([`/projects/retire-sim/qa-testplan.md`](/md-viewer.html?file=/projects/retire-sim/qa-testplan.md))
- 2026-02-21: BGL-042 완료 ([`/projects/retire-sim/gtm-marketing.md`](/md-viewer.html?file=/projects/retire-sim/gtm-marketing.md))
- 2026-02-21: BGL-043 완료 ([`/projects/retire-sim/landing-copy.md`](/md-viewer.html?file=/projects/retire-sim/landing-copy.md))
- 2026-02-21: BGL-044 완료 ([`/projects/retire-sim/pricing-experiments.md`](/md-viewer.html?file=/projects/retire-sim/pricing-experiments.md))
- 2026-02-21: BGL-045 완료 ([`/projects/retire-sim/monday-summary.md`](/md-viewer.html?file=/projects/retire-sim/monday-summary.md))
- 2026-02-21: BIZ-100 완료 ([`/projects/service-monetization/offer-architecture.md`](/md-viewer.html?file=/projects/service-monetization/offer-architecture.md))
- 2026-02-21: BIZ-101 완료 ([`/projects/service-monetization/packages-spec.md`](/md-viewer.html?file=/projects/service-monetization/packages-spec.md))
- 2026-02-21: BIZ-102 완료 ([`/projects/service-monetization/pricing-model.md`](/md-viewer.html?file=/projects/service-monetization/pricing-model.md))
- 2026-02-21: BIZ-103 완료 ([`/projects/service-monetization/free-webinar-plan.md`](/md-viewer.html?file=/projects/service-monetization/free-webinar-plan.md))
- 2026-02-21: BIZ-104 완료 ([`/projects/service-monetization/webinar-script-60m.md`](/md-viewer.html?file=/projects/service-monetization/webinar-script-60m.md))
- 2026-02-21: BIZ-105 완료 ([`/projects/service-monetization/landing-copy-faq.md`](/md-viewer.html?file=/projects/service-monetization/landing-copy-faq.md))
- 2026-02-21: BIZ-106 완료 ([`/projects/service-monetization/sales-call-script.md`](/md-viewer.html?file=/projects/service-monetization/sales-call-script.md))
- 2026-02-21: BIZ-107 완료 ([`/projects/service-monetization/sow-contract-templates.md`](/md-viewer.html?file=/projects/service-monetization/sow-contract-templates.md))
- 2026-02-22: BIZ-108 완료 ([`/projects/service-monetization/client-onboarding-checklist.md`](/md-viewer.html?file=/projects/service-monetization/client-onboarding-checklist.md))
- 2026-02-22: BIZ-109 완료 ([`/projects/service-monetization/delivery-sop.md`](/md-viewer.html?file=/projects/service-monetization/delivery-sop.md))
- 2026-02-22: BIZ-110 완료 ([`/projects/service-monetization/regional-go-to-market.md`](/md-viewer.html?file=/projects/service-monetization/regional-go-to-market.md))
- 2026-02-22: BIZ-111 완료 ([`/projects/service-monetization/content-calendar-4weeks.md`](/md-viewer.html?file=/projects/service-monetization/content-calendar-4weeks.md))
- 2026-02-22: BIZ-112 완료 ([`/projects/service-monetization/first-10-customers-plan.md`](/md-viewer.html?file=/projects/service-monetization/first-10-customers-plan.md))
- 2026-02-22: BIZ-113 완료 ([`/projects/service-monetization/unit-economics-dashboard.md`](/md-viewer.html?file=/projects/service-monetization/unit-economics-dashboard.md))
- 2026-02-21: BIZ-100~114 추가 (즉시수익화 프로젝트 태스크팩)
- 2026-02-21: BIZ-115~120 추가 (고립은둔 완화형 사회적 연결 태스크팩)
- 2026-02-22: BIZ-114 완료 ([`/projects/service-monetization/monday-launch-checklist.md`](/md-viewer.html?file=/projects/service-monetization/monday-launch-checklist.md), commit: d6eb919)`
- 2026-02-22: BIZ-115 완료 ([`/projects/service-monetization/social-connection-principles.md`](/md-viewer.html?file=/projects/service-monetization/social-connection-principles.md), commit: 7c14e10)`
- 2026-02-22: BIZ-116 완료 ([`/projects/service-monetization/local-meetup-pilot.md`](/md-viewer.html?file=/projects/service-monetization/local-meetup-pilot.md), commit: 24c99f6)`
- 2026-02-22: BIZ-117 완료 ([`/projects/service-monetization/weekly-office-hours.md`](/md-viewer.html?file=/projects/service-monetization/weekly-office-hours.md), commit: 384f95f)`

- 2026-02-22: BIZ-118 완료 ([`/projects/service-monetization/followup-retention-flow.md`](/md-viewer.html?file=/projects/service-monetization/followup-retention-flow.md), commit: 1726f61)`
- 2026-02-22: BIZ-119 완료 ([`/projects/service-monetization/community-engagement-loop.md`](/md-viewer.html?file=/projects/service-monetization/community-engagement-loop.md), commit: 1726f61)`
- 2026-02-22: BIZ-120 완료 ([`/projects/service-monetization/hybrid-demo-day.md`](/md-viewer.html?file=/projects/service-monetization/hybrid-demo-day.md), commit: 1726f61)`

- 2026-02-22: REV-201~212 추가 (즉시수익화 스프린트: 기획/개발/마케팅/판매 통합 큐)
- 2026-02-22: REV-201 완료 ([`/projects/revenue-sprint/differentiation-onepager.md`](/md-viewer.html?file=/projects/revenue-sprint/differentiation-onepager.md), commit: e2cc195)`
- 2026-02-22: REV-202 완료 ([`/projects/revenue-sprint/offer-stack-fast-close.md`](/md-viewer.html?file=/projects/revenue-sprint/offer-stack-fast-close.md), commit: 5d8cb93)`
- 2026-02-22: REV-203 완료 ([`/projects/revenue-sprint/mvp-dev-backlog-2weeks.md`](/md-viewer.html?file=/projects/revenue-sprint/mvp-dev-backlog-2weeks.md), commit: 2877017)`
- 2026-02-22: 수익화 핵심 판매자료 3종 문서화 ([`/projects/revenue-sprint/free-hook-productivity-checklist-10min.md`](/md-viewer.html?file=/projects/revenue-sprint/free-hook-productivity-checklist-10min.md), [`/projects/revenue-sprint/offer-copy-90min-setup-session.md`](/md-viewer.html?file=/projects/revenue-sprint/offer-copy-90min-setup-session.md), [`/projects/revenue-sprint/proposal-2week-productivity-sprint.md`](/md-viewer.html?file=/projects/revenue-sprint/proposal-2week-productivity-sprint.md))
- 2026-02-22: REV-204 완료 ([`/projects/revenue-sprint/lead-magnet-pack-5.md`](/md-viewer.html?file=/projects/revenue-sprint/lead-magnet-pack-5.md), commit: 0828ba2)`
- 2026-02-22: REV-205 완료 ([`/projects/revenue-sprint/content-calendar-7days.md`](/md-viewer.html?file=/projects/revenue-sprint/content-calendar-7days.md), commit: 59ccd00)`
- 2026-02-22: REV-213 완료 ([`/projects/revenue-sprint/monday-detail-plan-outsourcing-10m-20m.md`](/md-viewer.html?file=/projects/revenue-sprint/monday-detail-plan-outsourcing-10m-20m.md), commit: 624a60d)`
- 2026-02-22: REV-214 완료 ([`/projects/revenue-sprint/high-ticket-outsourcing-proposal-template.md`](/md-viewer.html?file=/projects/revenue-sprint/high-ticket-outsourcing-proposal-template.md), commit: 624a60d)`
- 2026-02-22: REV-206 완료 ([`/projects/revenue-sprint/inbound-sales-scripts-40.md`](/md-viewer.html?file=/projects/revenue-sprint/inbound-sales-scripts-40.md), commit: 0effff3)`
- 2026-02-22: BGL-201~210 추가 (네이버 존보글 카페 초보자용 복붙 자료 스프린트)
- 2026-02-22: Bogleheads 철학 반영 작성가이드 추가 ([`/projects/bogle-beginner-kit/STYLE-GUIDE.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/STYLE-GUIDE.md))
- 2026-02-22: REV-207 완료 ([`/projects/revenue-sprint/call-closing-flow.md`](/md-viewer.html?file=/projects/revenue-sprint/call-closing-flow.md), commit: 700201e)`
- 2026-02-22: REV-208 완료 ([`/projects/revenue-sprint/landing-restructure-onepage.md`](/md-viewer.html?file=/projects/revenue-sprint/landing-restructure-onepage.md), commit: ce27137)`
- 2026-02-22: REV-209 완료 ([`/projects/revenue-sprint/pricing-urgency-rulebook.md`](/md-viewer.html?file=/projects/revenue-sprint/pricing-urgency-rulebook.md), commit: 5c27c0c)`
- 2026-02-22: REV-210 완료 ([`/projects/revenue-sprint/pipeline-dashboard-template.md`](/md-viewer.html?file=/projects/revenue-sprint/pipeline-dashboard-template.md), commit: 877e805)`
- 2026-02-22: REV-211 완료 ([`/projects/revenue-sprint/launch-sequence-10days-solo.md`](/md-viewer.html?file=/projects/revenue-sprint/launch-sequence-10days-solo.md), commit: a2a595e)`
- 2026-02-22: REV-212 완료 ([`/projects/revenue-sprint/customer-interview-loop.md`](/md-viewer.html?file=/projects/revenue-sprint/customer-interview-loop.md), commit: 4a7f065)`
- 2026-02-22: CHK-001 완료 ([`/projects/internal/must-check-items.md`](/md-viewer.html?file=/projects/internal/must-check-items.md), commit: af72cbf)`
- 2026-02-22: BGL-201 완료 ([`/projects/bogle-beginner-kit/001-start-here.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/001-start-here.md), commit: 6955273)`
- 2026-02-22: BGL-202 완료 ([`/projects/bogle-beginner-kit/faq-50.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/faq-50.md), commit: 97d7dc3)`
- 2026-02-22: BGL-203 완료 ([`/projects/bogle-beginner-kit/bear-market-copies-100.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/bear-market-copies-100.md), commit: cf3b50b)`
- 2026-02-22: BGL-204 완료 ([`/projects/bogle-beginner-kit/comment-macros-100.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/comment-macros-100.md), commit: 38eeecc)`
- 2026-02-22: BGL-205 완료 ([`/projects/bogle-beginner-kit/onboarding-4weeks.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/onboarding-4weeks.md), commit: 7906633)`
- 2026-02-22: BGL-206 완료 ([`/projects/bogle-beginner-kit/etf-selection-cards-30.md`](/md-viewer.html?file=/projects/bogle-beginner-kit/etf-selection-cards-30.md), commit: PENDING_BGL206)`
