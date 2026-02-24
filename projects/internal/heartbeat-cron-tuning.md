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

## 조건부 전환 규칙 (Ralph Loop)
기본 야간 주기: 10분 (`bogle-heartbeat-night`)
백업 야간 주기: 15분 (`bogle-heartbeat-night-backup-15m`, 기본 비활성)

15분으로 완화할 조건(하나라도 충족):
1) 최근 2시간 기준 run-log에서 `BLOCKED` 비율 > 30%
2) heartbeat 1회 평균 처리시간이 20분 초과가 3회 연속
3) 야간 중복 작업/충돌 징후 발생(동일 파일 반복 충돌)

다시 10분으로 복귀할 조건(모두 충족):
1) 최근 2시간 `BLOCKED` 비율 < 10%
2) 평균 처리시간 15분 미만
3) 최근 3회 연속 정상(DONE 중심) 처리

수동 전환 명령:
- 15분 완화:
  - `openclaw cron disable 11f66818-6d59-4678-914c-f26013f50116`
  - `openclaw cron enable 3dde85ae-c203-4151-8a0c-a5fb88fd0e43`
- 10분 복귀:
  - `openclaw cron disable 3dde85ae-c203-4151-8a0c-a5fb88fd0e43`
  - `openclaw cron enable 11f66818-6d59-4678-914c-f26013f50116`
