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
- Status: PENDING
- Output:
  - `/projects/bogle-ops/publishing-calendar.md`
  - docs/index 링크 반영

### [BGL-012] 운영진 댓글 대응 30문구 확장본
- Status: PENDING
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

---

## 작업 로그
- 2026-02-21: 큐 초기화 완료
