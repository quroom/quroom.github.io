# OpenClaw Orchestration Prompt v2 (적용 정리본)

## 0) 목적
사용자가 전달한 Prompt 템플릿을 운영 문서로 저장하고,
현재 루프와 충돌 여부를 점검한 뒤, 실제 적용 가능한 최소 버전으로 정리한다.

---

## 1) 원문 템플릿 (요약 보관)
구조:
- BLOCK A: CORE
- BLOCK B: TASK TYPE (B1~B4 중 1개)
- BLOCK C: AGENT DEPTH (C1/C2 중 1개)
- BLOCK D: OUTPUT FORMAT (D1~D3 중 1개)

핵심 의도:
- heartbeat 루프의 강제 실행
- 결과물 실체(텍스트/코드/diff) 강제
- 서브에이전트 지시 구체화
- 안전/권한 규칙 고정
- 문서/리포트 출력 형식 표준화

---

## 2) 충돌 점검 결과 (현재 운영 규칙 대비)
### ✅ 그대로 사용 가능
1. HEARTBEAT 순서 강제
2. PENDING -> DOING -> DONE/BLOCKED 전이
3. 리포트 기록 강제
4. 외부 발송/삭제/민감 작업 승인 규칙
5. Diff 우선 보고 원칙

### ⚠️ 보정 필요
1. "매 루프 시작 시 반드시 출력 [TASK]/[OUTPUT]/[DONE_WHEN]"
   - 현재 heartbeat 응답 포맷과 중복 가능성
   - 해결: 내부 로그에는 강제, 사용자 메시지는 요약형 유지

2. "섹션 150자 이상" 같은 고정 분량 규칙
   - 작업 성격(표/체크리스트/템플릿)에 따라 과도할 수 있음
   - 해결: '실행 가능성' 기준 우선, 분량은 보조 기준

3. Task Type B2/B3/B4 완전 고정
   - heartbeat 자동 루프에서는 모든 턴에 강제하기 어려움
   - 해결: 턴별 에이전트 타입에 맞춰 선택 적용

---

## 3) 최소 적용 버전 (실전)
아래를 현재 시스템에 적용 가능한 최소 룰셋으로 채택:

### A. Core
- heartbeat마다 오케스트레이션 루프 실행 (리마인드만 금지)
- PENDING 없을 때만 Knowledge Loop -> Super-Agent Rotation
- 실제 산출물 없는 결과는 미완료 처리
- 문서 수정/삭제 시 doc-change-log 기록

### B. Task Type 자동 매핑
- product-engineer -> B1(기획/전략) 또는 B4(코드/자동화)
- super-marketer -> B2(조사) 또는 B3(콘텐츠)
- super-agent -> B1(전략 통합/운영 정책)

### C. Agent Depth
- 기본 C1(2단계) 사용
- 복잡 도메인 작업만 C2(3단계) 승격

### D. Output Format
- 기본 D1(문서/리포트)
- 데이터 작업은 D2
- 코드 산출물은 D3

---

## 4) 현재 적용 상태
현재 루프는 아래 리포트를 매 턴 생성/갱신한다.
- heartbeat-run-report.md
- turn-diff-report.md
- file-update-index.md
- doc-change-log.md
- (plus) project-improvement / revenue-experiments / strategy-brief

모두 최신순 상단 유지 + github.io 동기화 중.

---

## 5) 다음 액션
1. super_execute에 task_type 라벨(B1~B4) 자동기록 추가
2. heartbeat 응답에 [TASK]/[DONE_WHEN] 축약 라인 선택적 반영
3. BLOCK 템플릿을 `orchestration/templates/prompt-composer.md`로 분리 저장
