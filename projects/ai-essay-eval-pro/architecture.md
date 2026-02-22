# 기술 아키텍처 (초안)

## 구성
- Frontend: Next.js
- Backend: FastAPI (또는 Django)
- DB: Postgres
- Storage: S3 호환
- Queue: Redis + Worker
- LLM Layer: 평가 프롬프트 오케스트레이터

## 핵심 모듈
1. Auth/Org
2. Assignment & Rubric
3. Submission Ingestion (OCR 포함)
4. Scoring Engine
5. Feedback Generator
6. Human Review UI
7. Report Export (PDF/CSV)

## 데이터 모델 핵심
- users, organizations, classes
- assignments, rubrics, rubric_items
- submissions, scoring_runs, score_evidence
- feedback_versions, reports

## 신뢰성 설계
- 모델 버전 고정/기록
- 프롬프트 템플릿 버전관리
- 점수 근거 스팬 하이라이트
