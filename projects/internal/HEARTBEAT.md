# HEARTBEAT.md

# Auto-Work Mode (Bogle Ops)

heartbeat가 오면 아래를 수행:

1) `/home/ubuntu/.openclaw/workspace/WORKQUEUE.md`를 읽는다.
2) `Status: PENDING` 중 맨 위 1개를 `DOING`으로 바꾼다.
3) 작업을 실제로 수행한다 (문서 생성/수정, 링크 반영, 커밋, 푸시 포함).
4) 성공 시 `DONE`으로 바꾸고 작업 로그에 결과(파일/커밋) 추가.
5) 실패 시 `BLOCKED`로 바꾸고 필요한 입력 1~3개만 정리.

출력 규칙:
- 진행/완료 사항이 있으면 요약 보고.
- 할 일이 없으면 `HEARTBEAT_OK`.

안전 규칙:
- 외부 메시지 발송/삭제/민감작업은 승인 없이 수행하지 않는다.
