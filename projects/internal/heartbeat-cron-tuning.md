# Heartbeat Cron Tuning Guide (Ralph Loop)

목표: 유휴시간에는 더 촘촘하게 heartbeat를 발생시켜 야간 큐 처리량을 높인다.

권장 주기:
- 주간(07:00~23:00): 30~60분
- 야간(23:00~07:00): 10~15분

권장 운영:
- heartbeat 1회당 최대 20분/2개 Job 처리
- 과부하 시 즉시 1개 Job로 축소

체크 포인트:
1. run-log 누적 여부
2. daily-work-report 아침 요약 생성 여부
3. BLOCKED 비율(높으면 큐를 더 잘게 분할)

주의:
- 너무 짧은 주기는 API/토큰 소모 증가
- 5분 미만 주기는 불필요한 중복 작업 위험 증가
