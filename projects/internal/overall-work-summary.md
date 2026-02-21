# 전체 작업 설명 (Overall Work Summary)

이 페이지는 현재 GitHub Pages(`quroom.github.io`)에 올라온 작업의 **전체 구조와 진행 상태**를 한눈에 보기 위한 요약입니다.

## 1) 지금 무엇을 운영 중인가?

- **운영 방식**: HEARTBEAT 트리거로 WORKQUEUE 상단 PENDING 작업을 1개씩 처리
- **큐 원칙**: `PENDING → DOING → DONE` (막히면 `BLOCKED`)
- **기록 원칙**: 처리 결과를 문서 + WORKQUEUE 로그 + 일일보고에 함께 남김

## 2) 현재 진행 상태 (스냅샷)

[`/projects/internal/WORKQUEUE.md`](/md-viewer.html?file=/projects/internal/WORKQUEUE.md) 기준:

- 전체 작업: **50**
- DONE: **43**
- DOING: **2**
- PENDING: **5**
- BLOCKED: **0**

## 3) 핵심 문서 위치

### Internal Ops
- WORKQUEUE 대시보드: [`/projects/internal/workqueue-dashboard.html`](/projects/internal/workqueue-dashboard.html)
- WORKQUEUE 원문: [`/md-viewer.html?file=/projects/internal/WORKQUEUE.md`](/md-viewer.html?file=/projects/internal/WORKQUEUE.md)
- HEARTBEAT 원문: [`/md-viewer.html?file=/projects/internal/HEARTBEAT.md`](/md-viewer.html?file=/projects/internal/HEARTBEAT.md)
- **일일 보고 (Daily Report)**: [`/md-viewer.html?file=/projects/internal/daily-work-report.md`](/md-viewer.html?file=/projects/internal/daily-work-report.md)

### 프로젝트 문서 묶음
- Bogle Ops: [`/projects/bogle-ops/`](/projects/bogle-ops/)
- Retire Sim: [`/projects/retire-sim/`](/projects/retire-sim/)
- Service Monetization: [`/projects/service-monetization/`](/projects/service-monetization/)
- Academy MVP: [`/projects/academy-mvp/`](/projects/academy-mvp/)

## 4) 일일 보고는 어떻게 쌓이나?

`daily-work-report.md`에 날짜별로 아래 항목을 누적 기록합니다.

- 처리 작업 ID/제목
- 결과 파일
- 보강 작업(링크 반영, 상태 변경 등)
- 비고(핵심 의사결정/주의사항)

즉, **“오늘 뭐 했는지”**는 일일보고에서, **“전체 진척”**은 WORKQUEUE/대시보드에서 확인하면 됩니다.
