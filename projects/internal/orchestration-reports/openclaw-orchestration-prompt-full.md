# OpenClaw Orchestration Prompt (Codex) - Full Replacement Draft

> 사용자가 제공한 프롬프트를 원문 구조로 보관한 완전 교체용 문서.

## BLOCK A: CORE
- HEARTBEAT 실행 순서 강제
- 실행 선언 [TASK]/[OUTPUT]/[DONE_WHEN]
- 결과물 실체 강제(텍스트/데이터/코드/diff)
- 서브에이전트 지시 품질 규칙
- 루프 종료 전 체크리스트
- 안전 규칙(외부 발송/삭제/민감 승인)

## BLOCK B: TASK TYPE (1개 선택)
- B1 기획/전략
- B2 마케팅 조사/경쟁사 분석
- B3 콘텐츠 제작
- B4 코드/자동화

## BLOCK C: AGENT DEPTH (1개 선택)
- C1: 2단계 (Orchestrator -> Sub)
- C2: 3단계 (Orchestrator -> Middle -> Sub)

## BLOCK D: OUTPUT FORMAT (1개 선택)
- D1 문서/리포트
- D2 표/데이터
- D3 코드 파일

## 입력 방법
1) BLOCK A + 2) B(1개) + 3) C(1개) + 4) D(1개) + 5) 작업지시

## 운영 적용 메모
- 이 문서는 "완전 교체 기준" 문서이며, 실제 시스템 프롬프트 자체를 직접 교체하는 기능은 없음.
- 대신 HEARTBEAT/오케스트레이션 루프 정책 문서에 동일 규칙을 반영하여 실운영에 적용한다.

## 적용 체크리스트
- [ ] HEARTBEAT 루프 순서 동일 반영
- [ ] 결과물 실체 체크리스트 반영
- [ ] TASK TYPE별 템플릿 적용
- [ ] AGENT DEPTH 선택 규칙 반영
- [ ] OUTPUT FORMAT별 리포트 강제
