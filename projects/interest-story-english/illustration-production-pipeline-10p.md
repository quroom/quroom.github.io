# 10페이지 삽화 제작 파이프라인 (무료+AI 혼합)

## 1) 목표
- 비용을 통제하면서도 "만화책 삽화 수준"의 일관된 비주얼 확보
- 10페이지 기준 제작 시간을 줄이고 재사용 가능한 템플릿 구축

---

## 2) 컷 배분 전략 (권장)
- 무료/템플릿 컷: **6~7장**
- AI 생성 컷: **3~4장**

### 권장 배치
1. p1 표지 — AI
2. p2 도입 — 템플릿
3. p3 탐색 — 템플릿
4. p4 전환 — AI
5. p5 설명 — 템플릿
6. p6 갈등 — AI
7. p7 단서 — 템플릿
8. p8 선택 — 템플릿
9. p9 클라이맥스 — AI
10. p10 엔딩 — 템플릿

---

## 3) 스타일 가이드 (고정)
- 스타일: children’s storybook illustration
- 라인: clean line art
- 색감: soft warm palette
- 표정: 과장되되 과도한 공포 표현 금지
- 비율: 4:3 또는 16:10 고정

### 프롬프트 공통 Prefix
"children's storybook illustration, clean line art, soft warm colors, consistent character design, age-appropriate, no violence"

---

## 4) 무료 소스 구성

### 배경(무료)
- 하늘/도시/도서관/박물관/야경/들판 템플릿 10종

### 캐릭터(무료)
- 아바타 기반 캐릭터 5명 + 표정 6종
- seed 고정으로 일관성 유지

### 소품(무료)
- 지도, 공책, 깃발, 책, 별, 구름 아이콘 세트

---

## 5) AI 생성 컷 규칙
- 생성 컷은 페이지당 최대 1회 재시도
- 재시도 후에도 품질 미달이면 템플릿 컷으로 대체
- 생성 컷은 표지/갈등/클라이맥스 우선

---

## 6) 원가 절감 룰
1. 같은 장면은 재생성 금지(캐시 재사용)
2. 표지 제외 고해상도 생성 금지
3. 베타 단계는 10p 중 3p만 AI 생성 기본값
4. 인기 스토리만 AI 비율 상향

---

## 7) 품질 점검 체크리스트
- [ ] 캐릭터 얼굴/복장 일관성
- [ ] 페이지 간 색감 톤 일관성
- [ ] 텍스트 가독성(배경 대비)
- [ ] 연령 적합성(폭력/자극 묘사 없음)
- [ ] 사실/가상 시나리오 라벨 존재

---

## 8) 실행 순서 (실무)
1. 스토리 10페이지 확정
2. 템플릿 컷 6~7장 먼저 배치
3. AI 컷 3~4장 생성
4. 톤 통일(색감/폰트/말풍선)
5. QA 후 배포

---

## 9) 즉시 적용 템플릿 세트
- 캐릭터/배경 키트:
  - [/projects/interest-story-english/prototype/rendered-cartoon-assets-kit-sample.html](/projects/interest-story-english/prototype/rendered-cartoon-assets-kit-sample.html)
- 혼합 10p 샘플:
  - [/projects/interest-story-english/prototype/rendered-hybrid-mixed-sample.html](/projects/interest-story-english/prototype/rendered-hybrid-mixed-sample.html)
