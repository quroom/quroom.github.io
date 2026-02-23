# 기술스택/구현 방법 조사 (사용자 경험 기반 제안)

## 0) 전제
- 이 문서는 "빠른 실행 + 안정적 운영 + 확장 가능성"을 함께 고려한 제안입니다.
- 사용자 강점(실행 속도, 문서→시스템 전환, AX 자동화)을 최대한 살리는 구조를 우선합니다.

---

## 1) 권장 아키텍처 (MVP → 확장)

### 1-1. MVP (4~6주)
- **Frontend**: Next.js (App Router)
- **Backend**: FastAPI (Python)
- **DB**: PostgreSQL
- **Queue/Jobs**: Redis + RQ/Celery (콘텐츠 생성/리포트 배치)
- **Storage**: S3 호환 스토리지(이미지/오디오)
- **Auth**: NextAuth or Clerk

### 1-2. 왜 이 조합인가
1. Next.js: UI/랜딩/대시보드 빠른 구축
2. FastAPI: AI 파이프라인/콘텐츠 생성 로직 분리 쉬움
3. Postgres: 사용자/세션/분기 로그 구조화에 안정적
4. Queue: 생성 작업 비동기 처리로 UX 지연 최소화

---

## 2) 기능별 구현 방법

### A. 이중언어 스토리 생성
- 파이프라인:
  1) 주제 입력
  2) 스토리 아웃라인 생성
  3) 한글 버전 생성
  4) 쉬운 영어 버전 생성(A1~A2 제약)
  5) 이미지 프롬프트 생성 및 렌더
- 구현 포인트:
  - 문장 길이/단어 수 하드 룰 적용
  - L0.5(Biscuit 레벨) 템플릿 별도 운영

### B. 분기형 질문 엔진
- 챕터당 질문 카드 3개 생성
- 선택 결과를 `branch_log`에 저장
- 다음 챕터 생성 시 branch context 반영
- 깊이 제한: 기본 1, 최대 3

### C. 의견 기록/학부모 리포트
- 의견 텍스트 저장(한글/영어)
- 주간 배치로 리포트 생성
- 리포트 항목: 학습일, 완주 챕터, 단어량, 스트레스

### D. 파닉스 초입문 보호 UX
- TTS 느린 속도
- 단어 하이라이트
- 한 문장씩 보기
- 선택형 우선(서술형 최소)

---

## 3) 데이터 스키마 (구현형)

### 핵심 테이블
- users
- learner_profiles (grade, level, phonics_mode)
- story_sessions
- chapters (ko_text, en_text, vocab_json)
- question_cards
- branch_logs
- opinion_notes
- weekly_reports

### 인덱스 권장
- `(user_id, created_at)`
- `(session_id, chapter_index)`
- `(learner_profile_id, week_start)`

---

## 4) AI 품질 제어 전략

1. **생성 전 제약**
- 금칙어/연령 부적합 필터
- 문장 길이/어휘 수 제한

2. **생성 후 검증**
- 난이도 스코어링
- 사실/가상 라벨 부착
- 질문-본문 근거 매핑

3. **사람 검수 루프**
- 파일럿 단계에선 부모/튜터 검수 반영
- 자주 수정되는 패턴은 템플릿으로 고정

---

## 5) 배포/운영

### 인프라
- App: Vercel(프론트), Render/Fly/EC2(백엔드)
- DB: Managed Postgres
- Cache/Queue: Upstash Redis 또는 Managed Redis

### 모니터링
- Sentry: 에러 추적
- PostHog/Amplitude: 재방문율/완주율 이벤트 분석
- Uptime 체크: 헬스 엔드포인트

---

## 6) 보안/컴플라이언스
- 아동 데이터 최소수집 원칙
- PII 마스킹/보존기간 정책
- 콘텐츠 안전 필터(폭력/혐오/부적절 표현)
- 부모 동의 및 삭제 요청 플로우

---

## 7) 구현 로드맵 (기술 관점)

### Sprint 1
- 프로젝트 뼈대 + Auth + DB 스키마
- 주제입력/세션생성 API

### Sprint 2
- 스토리 생성 파이프라인(한글/영어)
- L0.5 레벨 룰 적용

### Sprint 3
- 분기 질문/다음 챕터 생성
- 의견 기록 기능

### Sprint 4
- 주간 리포트 + 부모 대시보드
- 이벤트 트래킹 + KPI 보드

---

## 8) 사용자 경험 기반 최종 추천
- "처음부터 완전 자동"보다
  **반자동 + 강한 품질룰 + 빠른 파일럿**이 성공 확률 높음.
- 즉, 초기엔 생성 속도보다 **레벨 정확도(L0.5 포함)**와 재방문 UX를 우선.
