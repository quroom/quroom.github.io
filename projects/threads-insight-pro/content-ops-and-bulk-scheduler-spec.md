# Threads Tools: 콘텐츠 운영 + 벌크 예약 스케줄러 스펙

## 0) 목적
Threads 운영자가 겪는 반복 불편을 해결한다.
- 반응 좋았던 글을 빠르게 찾기 어렵다.
- 팔로워 증가/반응 상승에 기여한 패턴을 파악하기 어렵다.
- 주간/월간 어떤 리듬으로 올릴지 기준이 없다.
- 초안을 한 번에 넣고 시간 간격으로 예약하고 싶다.

---

## 1) 핵심 문제와 해결

### 1-1. 문제
1. 히트 포스트 탐색 시간이 길다.
2. 주제/길이/게시 시간의 상관관계가 보이지 않는다.
3. 콘텐츠 생산은 되는데 발행 운영이 병목이다.

### 1-2. 해결 기능
1. **Top Performance Finder**
   - 최근 7/30/90일 기준 상위 글 자동 정렬
2. **Pattern Analyzer**
   - 주제, 글 길이, 업로드 시간대, CTA 유형별 성과 비교
3. **Cadence Planner**
   - 주간 슬롯 템플릿(예: 정보형/경험형/질문형 비율)
4. **Bulk Scheduler**
   - 초안 N개 입력 → 1시간/2시간 간격 자동 슬롯 배치

---

## 2) 정책/연동 원칙

### 2-1. 안전 원칙
- 플랫폼 정책과 허용 범위 내 연동만 사용
- 불확실한 자동 발행은 기본 비활성

### 2-2. 스케줄 동작 모드
- **Mode A (권장): 반자동 예약**
  - 앱에서 스케줄 생성
  - 발행 시점 알림 + 원클릭 복사/열기
- **Mode B (가능 시): 공식 예약 API 연동**
  - 공식 제공 기능 있을 때만 자동 발행

---

## 3) 화면 설계(핵심 5화면)

### Screen 1. Dashboard
- KPI 카드: 게시수, 평균 반응률, 팔로워 증감, 미응답 건수
- 빠른 필터: 기간, 콘텐츠 유형, 해시태그

### Screen 2. Top Posts
- 정렬: 반응률/댓글/저장/팔로워 기여도
- 액션: 재활용 후보 등록, 유사 포맷 생성

### Screen 3. Pattern Analysis
- 차트: 요일/시간대별 성과
- 표: 글 길이 구간별 평균 반응
- 추천: 다음 주 우선 테스트 슬롯 3개 제시

### Screen 4. Content Queue
- 초안 리스트 업로드/직접 입력
- 태그: 주제/의도/CTA/톤
- 품질 체크: 길이, 훅, CTA, 금칙어

### Screen 5. Scheduler
- 배치 옵션: 시작 시각, 간격(1h/2h/4h), 일일 최대 게시수
- 충돌 처리: 기존 스케줄 자동 회피
- 결과: 캘린더 미리보기 + 배치 로그

---

## 4) 벌크 예약 알고리즘(초안)

### 입력
- drafts[]
- startAt
- intervalHours
- dailyLimit
- quietHours(예: 00:00~08:00)

### 규칙
1. quietHours는 배치 제외
2. dailyLimit 초과 시 다음 날로 이월
3. 동일 주제 연속 배치 금지(최소 1 슬롯 띄움)

### 출력
- scheduled_posts[]: draft_id, scheduled_at, channel, status

---

## 5) 데이터 스키마(요약)

### posts
- id, external_id, content, posted_at, topic, cta_type, length_bucket

### metrics
- post_id, likes, replies, reposts, views, saves, follower_delta, captured_at

### drafts
- id, content, topic, cta_type, priority, created_at

### schedules
- id, draft_id, scheduled_at, mode(manual|api), status(planned|sent|failed)

### insights
- period, top_topics, best_time_slots, best_length_bucket, generated_at

---

## 6) KPI
1. 주간 게시 지속률 = 실제 게시 수 / 계획 게시 수
2. 평균 반응률 = (likes+replies+reposts)/views
3. 상위 20% 포스트 비율
4. 예약 성공률
5. 미응답 처리율(하트/답글)

---

## 7) 2주 MVP 백로그

### Week 1
- [ ] Top Posts 화면
- [ ] Pattern Analysis(요일/시간대)
- [ ] Queue 입력/편집

### Week 2
- [ ] Bulk Scheduler(1h 간격 포함)
- [ ] 캘린더 미리보기
- [ ] 발행 알림(반자동)
- [ ] 운영 리포트(주간)

---

## 8) 즉시 실행 TODO
1. 테스트 데이터셋 100개 포스트 준비
2. KPI 계산식 확정
3. 스케줄러 규칙(quietHours/dailyLimit) 기본값 확정
4. 반자동 발행 알림 UX 결정
5. 주간 템플릿(콘텐츠 믹스) 1안 확정
