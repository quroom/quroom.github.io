# Bogle Content Loop (Ralph)

목표: 스레드 유머 + 지수투자 카페 글을 **지속 생성**하는 루프.

핵심 원칙
- 1회 실행(run)마다 batch 생성
- 중복 문구는 해시로 방지
- 결과는 `generated/`에 누적
- 스레드 문구는 **한 줄 20자 이내(공백 포함)** 유지

실행
```bash
python3 /home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/content-loop/run_loop.py
```

자동화 권장
- heartbeat/cron에서 1회 실행하도록 연결
- 한 번에 과도 생성 금지(기본 batch: threads 20개, cafe 2개)
