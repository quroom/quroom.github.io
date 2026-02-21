# TAC 동적수집 (Playwright) 구축안

- 목적: 동적 렌더링 환경에서 TAC/실부담 값을 수집해 리포트 자동화 정확도 향상
- 방식: Playwright headless 수집 → `tac_overrides.csv` 병합 → `kr-etf-report-v3` 재생성

## 상태
- 스캐폴드 생성 완료
- 다음 단계: 로컬 실행 후 파싱 튜닝

## 실행 파일
- `bogle-ops/tac-playwright/fetch_tac.mjs`
- `bogle-ops/tac-playwright/README.md`
