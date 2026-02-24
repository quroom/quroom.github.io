# Night Queue (Service Monetization)

Status: `PENDING` | `DOING` | `DONE` | `BLOCKED`

원칙:
- 작업은 1개씩만 처리
- 가능하면 기존 문서에 추가/개선 (신규 파일 최소화)
- 완료 시 커밋/푸시 + daily-work-report 누적

| Priority | Job | Status | Update Target (existing first) |
|---|---|---|---|
| 1 | 제안서 승률 개선: 거절 사유 패턴 분석 + 제안서 구조 리팩터링 | DONE | `offer-build-kit/10-proposal-template.md` + `execution-playbook.md` |
| 2 | 리드 우선순위 자동화: 오늘 연락할 Top5 추출 규칙 설계 | DONE | `execution-playbook.md` (BIZ-122) + `unit-economics-dashboard.md` |
| 3 | 상담 후속 자동화: D+0/D+1/D+3 메시지 템플릿 + 자동 리마인드 룰 | DONE | `followup-retention-flow.md` + `sales-call-script.md` |
| 4 | 1인기업 최적 고객접점 전략 리서치 + 일일 루틴 + AI 자동화 피드백루프 설계 | DONE | `execution-playbook.md` (BIZ-123) |
| 5 | 구조 완전 자동화 아키텍처 명세 (큐엔진/QA게이트/리포트/승인흐름) | DONE | `execution-playbook.md` (신규 BIZ-125) |
| 6 | n8n/Make 플로우 설계서 작성 (트리거/분기/실패복구/알림) | DONE | `execution-playbook.md` (신규 BIZ-126) |
| 5 | ICP 세분화 v2 (업종 3세그먼트 + Not ICP 강화) | DONE | `offer-build-kit/01-icp-segment.md` |
| 6 | Problem Inventory 정량화 (시간/누락/매출 영향 수치화) | DONE | `offer-build-kit/02-problem-inventory.md` |
| 7 | Outcome KPI 보강 (2주/4주 기준선-목표값 추가) | DONE | `offer-build-kit/03-outcome-definition.md` |
| 8 | Scope 경계 강화 (Change Request 템플릿 문구 추가) | DONE | `offer-build-kit/04-scope-boundary.md` |
| 9 | Delivery 아키텍처 고도화 (역할/의사결정 책임표) | DONE | `offer-build-kit/05-delivery-architecture.md` |
| 10 | Pricing Ladder 실전안 (옵션 3개 + 앵커링 문구) | DONE | `offer-build-kit/06-pricing-ladder.md` |
| 11 | Proof/Trust 보강 (사례카드 템플릿 2종 추가) | DONE | `offer-build-kit/07-proof-trust.md` |
| 12 | Conversion Flow 개선 (채널별 CTA A/B 2세트) | DONE | `offer-build-kit/08-conversion-flow.md` |
| 13 | Landing Copy 팩 확장 (보수형/공격형 버전) | DONE | `offer-build-kit/09-landing-copy-pack.md` |
| 14 | 채널 전략 상세화 (채널별 주간 운영표/콘텐츠 타입) | DONE | `execution-playbook.md` (BIZ-121) |
| 15 | 리드 수집 자동화 설계 (소스→정제→스코어→큐) | DONE | `execution-playbook.md` (BIZ-122) |
| 16 | 콜드아웃리치 컴플라이언스 체크리스트 추가 | DONE | `execution-playbook.md` (BIZ-122) |
| 17 | KPI 대시보드 항목 확장 (채널/퍼널/매출 지표) | DONE | `unit-economics-dashboard.md` |
| 18 | 4주 GTM 실행 플랜 동기화 (채널+오퍼+퍼널 반영) | DONE | `regional-go-to-market.md` |
| 19 | 주간 실행 브리프 템플릿 추가 (월~금 해야 할 일 1페이지) | DONE | `execution-playbook.md` (신규 BIZ-124) |
| 20 | 채널별 콘텐츠 캘린더 고도화 (LinkedIn/Threads/지역모임 분리) | DONE | `content-calendar-4weeks.md` |
| 21 | 아웃리치 메시지 팩 작성 (소개요청/콜드DM/재접촉) | PENDING | `sales-call-script.md` + `first-10-customers-plan.md` |
| 22 | 상담콜 질문지 고도화 (진단→제안 전환형) | PENDING | `sales-call-script.md` |
| 23 | 제안서 거절 사유 분석 프레임 추가 | PENDING | `execution-playbook.md` (BIZ-123/124) |
| 24 | 주간 KPI 리뷰 루틴 상세화 (읽고 바로 실행 가능한 체크리스트) | PENDING | `unit-economics-dashboard.md` |
| 25 | 리퍼럴 요청 자동 루프 설계 (납품 후 7일/30일) | PENDING | `followup-retention-flow.md` |
| 26 | 아침 요약 리포트 포맷 고정 (전일 성과/오늘 액션 3개) | PENDING | `projects/internal/daily-work-report.md` |

## 로그 규칙
- 각 작업 완료 시 결과 파일 + 커밋 해시를 한 줄 로그로 남긴다.
- BLOCKED 시 필요한 입력 1~3개만 명시한다.
