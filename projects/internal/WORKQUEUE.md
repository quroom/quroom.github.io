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
- Status: PENDING
- Output:
  - `/projects/bogle-ops/onboarding-ab-test.md`
  - KPI 측정 필드 포함

### [BGL-014] 월간 KPI 대시보드 템플릿 (운영용)
- Status: PENDING
- Output:
  - `/projects/bogle-ops/kpi-dashboard-template.md`

### [BGL-015] 카페 필독 공지 리팩토링 (짧은/긴 버전)
- Status: PENDING
- Output:
  - `/projects/bogle-ops/notice-refactor-short-long.md`

### [BGL-016] 운영진 대응 매크로 50개
- Status: PENDING
- Output:
  - `/projects/bogle-ops/moderation-replies-50.md`

### [BGL-017] 월간 리포트 자동 생성 포맷
- Status: PENDING
- Output:
  - `/projects/bogle-ops/monthly-report-generator-format.md`

### [BGL-018] 신규회원 7일 온보딩 A/B 실험안
- Status: PENDING
- Output:
  - `/projects/bogle-ops/onboarding-ab-test-pack.md`

### [BGL-019] 카페 글 품질 30초 체크리스트
- Status: PENDING
- Output:
  - `/projects/bogle-ops/post-quality-check-30s.md`

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
