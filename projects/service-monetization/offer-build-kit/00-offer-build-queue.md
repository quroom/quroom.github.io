# Offer Build Queue (One-by-One)

원칙: 한 번에 다 쓰지 않는다. **양식 1개씩 채우고 검토 후 다음으로 진행**한다.

Status 규칙: `PENDING` → `DOING` → `REVIEW` → `DONE`

| Order | Form | 목적 | Status | Output File |
|---|---|---|---|---|
| 01 | ICP & Segment | 누구를 위한 오퍼인지 명확화 | DONE | `01-icp-segment.md` |
| 02 | Problem Inventory | 고객의 고통/비용 구조 파악 | DONE | `02-problem-inventory.md` |
| 03 | Outcome Definition | 고객이 사는 ‘결과’ 정의 | DONE | `03-outcome-definition.md` |
| 04 | Offer Scope & Boundary | 해주는 것/안하는 것 경계 설정 | DONE | `04-scope-boundary.md` |
| 05 | Delivery Architecture | 2주/4주 전달 구조 설계 | DONE | `05-delivery-architecture.md` |
| 06 | Pricing Ladder | 진단/구축/유지 가격 계단 | DONE | `06-pricing-ladder.md` |
| 07 | Proof & Trust Assets | 신뢰 증거/리스크 문구 정리 | DONE | `07-proof-trust.md` |
| 08 | Conversion CTA Flow | 콘텐츠→리드→콜→제안 흐름 | DONE | `08-conversion-flow.md` |
| 09 | Landing Copy Pack | 실제 랜딩 카피 작성 | DONE | `09-landing-copy-pack.md` |
| 10 | Proposal Template | 제안서 템플릿/체크리스트 | DONE | `10-proposal-template.md` |

---

## 실행 규칙
1. 한 번에 하나만 `DOING`으로 변경
2. 작성 후 바로 `REVIEW`로 전환
3. 피드백 반영 후 `DONE`
4. 다음 항목으로 이동

## 시장상황 반영 메모 (2026 Q1 가정)
- 소규모 사업자의 자동화 수요는 "도구 학습"보다 "즉시 실행" 중심으로 이동
- 고비용 대규모 전환보다 2주 단위의 작고 검증 가능한 개선 선호
- 도구 경쟁(OpenClaw/Make/n8n)보다 "운영 정착" 역량이 실제 구매 포인트
