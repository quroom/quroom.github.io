# Threads Insight Pro — Product Engineering Master Plan

## 0) 한 줄 판단 (돈이 될까?)
가능성 있음. 단, 전제는 명확함:
- 타깃이 "주기적으로 글을 쓰는 사람"이어야 함
- 핵심 가치가 "시간 절약 + 성과 개선"으로 바로 체감돼야 함
- 안전한 수집 경로(API/동의/업로드)를 지켜야 장기 운영 가능

영어강사(콘텐츠 생산자) 페르소나에는 특히 잘 맞음:
- 수업/홍보/브랜딩 콘텐츠를 반복 생산
- 어떤 글이 반응 좋은지 빠르게 재활용 니즈가 큼

---

## 1) Product Strategy

### ICP (Ideal Customer Profile)
1. 주 3회 이상 Threads 게시하는 1인 크리에이터
2. 영어강사/교육업 운영자 (콘텐츠가 곧 리드)
3. DM/상담 전환이 중요한 지식업 종사자

### JTBD (Jobs To Be Done)
- "내 과거 글 중 잘 된 포맷을 10초 안에 찾고 싶다"
- "통계 화면에서 원문으로 바로 점프해서 재작성하고 싶다"
- "아이디어 메모와 성과를 한곳에서 보고 다음 글을 정하고 싶다"

### Core Value Props
- 검색: 내 글 아카이브 즉시 탐색
- 인사이트: 성과 상위 패턴 자동 파악
- 실행: 통계→원문→메모→다음 액션 연결

---

## 2) Product Scope (MVP → V1)

### MVP (6주)
- 내 글 검색 (키워드/기간/태그)
- 통계 리스트 + 원문 바로가기
- 스친 메모 CRUD + 검색
- 안전한 데이터 입력 1개 경로(업로드 또는 공식 API)

### V1 (8~12주)
- 콘텐츠 패턴 클러스터링
- 상위 성과 템플릿 추천
- 주간 리포트 이메일
- Pro 결제/구독

---

## 3) Technical Architecture

### Frontend
- Next.js + TypeScript
- Dashboard: 검색/통계/메모 3탭

### Backend
- FastAPI(또는 Django)
- API 모듈: auth, posts, metrics, notes, billing

### Data
- Postgres (FTS/인덱싱)
- 테이블: users, posts, post_metrics, notes, tags, sync_jobs

### Ingestion (안전 우선)
1. 공식 API 연동(가능 필드)
2. 사용자 업로드(JSON/CSV)
3. 사용자 동의 기반 보조수집(정책 준수 범위)

---

## 4) Compliance/Safety
- ToS 준수 경로만 사용
- 수집 항목/목적/보관기간 동의 화면
- 계정 연결 해제/데이터 삭제 기능
- 감사로그 및 최소권한 토큰

---

## 5) Delivery Plan (10 weeks)

### W1-2: Discovery
- 인터뷰 10명(영어강사 3명 포함)
- 핵심 지표/화면 정의

### W3-4: MVP Build 1
- auth + post import + search

### W5-6: MVP Build 2
- metrics + post deep-link + notes

### W7: QA/Hardening
- 성능/권한/오류 처리

### W8: Beta Launch
- 클로즈드 베타 20명

### W9-10: Monetization
- Pro 플랜, paywall, onboarding

---

## 6) Operations
- 모니터링: sync 실패율, 쿼리 지연, 활성사용자
- CS: FAQ, 버그 리포트, 요청 우선순위
- 주간 릴리즈 + 월간 회고

---

## 7) Go-To-Market

### Positioning
"Threads를 쓰는 사람을 위한 검색/인사이트/메모 작업대"

### Launch Funnel
- Waitlist → 베타 초대 → 사례 공개 → 유료 전환

### Channels
- Threads 본계정 데모
- 영어강사 커뮤니티/운영자 커뮤니티
- 짧은 튜토리얼 영상(검색→재작성 워크플로)

### Pricing (초안)
- Free: 최근 30일 + 기본 검색
- Pro: 전체기간 + 고급필터 + 메모 무제한
- Team: 다계정/공유 보드

---

## 8) Business KPI
- Activation: 첫날 검색 1회 이상
- Retention: D7 / W4
- Conversion: Free→Pro
- Outcome: "재활용 게시글 비율" 증가

---

## 9) Risks & Mitigation
- 정책 변경 리스크 → 업로드 모드 fallback
- 데이터 품질 편차 → 정규화/검증 파이프라인
- 유료 전환 저조 → 역할별 템플릿 기능 강화(예: 영어강사용)

---

## 10) Immediate Next Actions (이번 주)
- [ ] 인터뷰 스크립트 작성
- [ ] MVP 와이어프레임 3장
- [ ] 데이터 스키마 v1 확정
- [ ] 베타 모집 랜딩 오픈
