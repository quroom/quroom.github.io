# 기술 아키텍처 초안 (웹앱/API/배치)

## 1) 목표
- 빠른 MVP 출시
- 수치 계산 재현성 확보
- 향후 SaaS 확장 가능한 구조

## 2) 구성요소
1. Web App (Frontend)
- 역할: 입력/결과 시각화/리포트 확인
- 후보: Next.js 또는 Django Template+HTMX

2. API Server
- 역할: 시뮬레이션 요청 처리, 결과 저장
- 후보: Django REST / FastAPI

3. Simulation Engine
- 역할: 적립/인출/시나리오/몬테카를로 계산
- 형태: 독립 모듈(파이썬 패키지)

4. Batch Worker
- 역할: 월간 재계산, 리포트 생성, 알림 데이터 준비
- 형태: cron + queue worker

5. Database
- PostgreSQL
- 테이블: users, profiles, snapshots, simulation_runs, yearly_projections

6. Storage
- 리포트/내보내기 파일 저장 (로컬/S3 호환)

## 3) 데이터 플로우
1. 사용자 입력 제출
2. API 유효성 검증
3. 엔진 실행 (sync 또는 async)
4. 결과 요약 + 연도별 시계열 저장
5. UI에서 결과 카드/차트 렌더
6. 필요 시 PDF/공유 링크 생성

## 4) 실행 모드
- v1: 동기 실행(단일 사용자 빠른 응답)
- v1.1: 비동기 실행(대량 시뮬레이션)

## 5) 품질/운영
- 버전 고정: inputVersion + engineVersion 저장
- 재현성: 같은 입력/시드면 같은 결과
- 관측성: 요청시간, 실패율, 계산시간 로깅

## 6) 보안/컴플라이언스
- 개인정보 최소수집
- 전송/저장 암호화
- 투자권유 오해 방지 문구 고정

## 7) 배포 전략
- 초기: 단일 서버 (web+api+db)
- 확장: web/api 분리, worker 분리, managed DB

## 8) 기술 스택 제안 (v1)
- Backend: Django + DRF
- Engine: Python module (NumPy optional)
- DB: PostgreSQL
- Infra: Docker Compose
- CI/CD: GitHub Actions (lint/test/deploy)
