# Current Operating Rules (Shareable)

> 시스템 프롬프트 원문이 아니라, 현재 동작 규칙 요약입니다.

## 1) Heartbeat 실행 원칙
- heartbeat 트리거 시, 별도 지시가 없어도 오케스트레이션 루프를 실행한다.
- 실행 순서: WORKQUEUE 확인 → Orchestration queue 확인 → idle이면 Knowledge Loop + Super-Agent Loop.
- 단순 리마인드 전달만 하고 종료하지 않는다.

## 2) 오케스트레이션 루프 구조
- Queue 상태 전이: `PENDING -> DOING -> DONE/BLOCKED`
- 혼합 작업은 `OpenSpec 초안 -> OpenClaw 반영` 순서.
- heartbeat 1회당 작업량 제한(시간/건수)으로 과열 방지.

## 3) Knowledge Loop 규칙
- 오케스트레이션 큐에 PENDING이 없을 때만 실행.
- 작은 수정 1개 단위로 진행(의미 변경 금지).
- 정책 변경/민감/외부 작업은 자동 수행 금지.

## 4) Super-Agent Rotation
- 라운드로빈: `product-engineer -> super-marketer -> super-agent`
- 각 턴 1개 개선 수행 + score 업데이트.
- 결과는 run-log/report로 누적.

## 5) 리포트/로그 정책
- 실행 결과는 아래 리포트에 누적:
  - `heartbeat-run-report.md`
  - `turn-diff-report.md`
  - `file-update-index.md`
  - `doc-change-log.md`
- 로그/리포트는 최신 항목이 상단(최신순).

## 6) 퍼블리시 정책
- 오케스트레이션 리포트는 `quroom.github.io/projects/internal/orchestration-reports/`로 동기화 + push.

## 7) 안전/권한
- 외부 발송/삭제/민감 작업은 승인 없이 수행하지 않는다.
- 문서 수정/삭제 시 change-log 기록을 남긴다.

## 8) 사용자 선호 반영
- 사업/프로젝트 문서 우선 업데이트.
- 파일/경로 언급 시 클릭 가능한 링크로 제공.
- Threads 카피는 한 줄 20자 이내(공백 포함) 원칙.
- 보고 시 실제 변경 diff(파일 + 변경 텍스트)를 우선 제공.

## 9) 주요 공개 리포트 링크
- 실행 리포트: <https://quroom.github.io/md-viewer.html?file=/projects/internal/orchestration-reports/heartbeat-run-report.md>
- 변경 diff: <https://quroom.github.io/md-viewer.html?file=/projects/internal/orchestration-reports/turn-diff-report.md>
- 파일 업데이트 인덱스: <https://quroom.github.io/md-viewer.html?file=/projects/internal/orchestration-reports/file-update-index.md>
- 문서 변경 로그: <https://quroom.github.io/md-viewer.html?file=/projects/internal/orchestration-reports/doc-change-log.md>
