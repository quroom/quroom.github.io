# 개발 백로그 (에픽/스토리/작업단위)

## Epic 1. 입력/시뮬레이션 기본 흐름
### Story 1-1 입력 폼 구축
- Task: 기본 입력 필드 UI 구성
- Task: 유효성 검증 로직
- Task: 기본값 프리셋 제공

### Story 1-2 시뮬레이션 실행
- Task: `/simulate` API 연결
- Task: 실행 상태 로딩/에러 처리
- Task: 결과 캐싱

## Epic 2. 계산엔진 구현
### Story 2-1 적립기/인출기 계산 모듈
- Task: 연단위 자산 변화 계산
- Task: 물가/세금 반영
- Task: 단위테스트 작성

### Story 2-2 시나리오 모듈
- Task: 보수/중립/낙관 시나리오
- Task: 스트레스 시나리오
- Task: 시나리오 비교 출력

## Epic 3. 결과 시각화/리포트
### Story 3-1 결과 카드
- Task: 달성확률/부족분/고갈확률 표시
- Task: 조정안 계산/표시

### Story 3-2 히스토리/내보내기
- Task: 실행 이력 저장
- Task: 비교 보기
- Task: PDF 내보내기(v1.1)

## Epic 4. 운영/품질
### Story 4-1 관측성
- Task: 요청/오류/응답시간 로깅
- Task: 장애 알림 훅

### Story 4-2 버전관리
- Task: inputVersion/engineVersion 저장
- Task: 릴리즈 노트 자동화

## Epic 5. 보안/컴플라이언스
### Story 5-1 고지/면책
- Task: 투자권유 아님 문구 상시 노출
- Task: 가정 기반 안내 컴포넌트

### Story 5-2 개인정보 보호
- Task: 최소수집 정책 반영
- Task: 마스킹/접근권한 설정

---

## Sprint 제안 (2주 단위)
- Sprint 1: Epic 1 + Epic 2 일부
- Sprint 2: Epic 2 완료 + Epic 3
- Sprint 3: Epic 4 + Epic 5 + 안정화
