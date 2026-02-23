# 하이브리드 이미지 파이프라인 구현안 (저비용 운영)

## 1) 목표
10페이지 스토리북 생성 시, 매번 10장을 AI로 만들지 않고
- 템플릿/무료소스 재사용
- 핵심 장면만 AI 생성
으로 비용을 줄이면서도 storybook 느낌을 유지한다.

---

## 2) 구성 방식 (Hybrid)

### A. 재사용 레이어 (기본)
- 배경(background): 무료 이미지/일러스트
- 캐릭터(character): 만화형 PNG/SVG 세트
- 소품(props): 아이콘/오브젝트
- 말풍선/텍스트(text): 런타임 렌더

### B. AI 생성 레이어 (선택)
- 표지 1장
- 클라이맥스 1장

### C. 최종 합성
- 페이지별로 레이어 조합값(JSON) 저장
- 웹 렌더 시 CSS absolute stacking으로 합성

---

## 3) 페이지 생성 룰 (10장 기준)
- 1~8p: 템플릿 조합
- 9~10p: AI 생성 허용(옵션)
- 재생성 제한: 페이지당 2회

---

## 4) 데이터 구조
```json
{
  "bookId": "story-001",
  "pages": [
    {
      "page": 1,
      "layout": "image-top-text-bottom",
      "layers": {
        "background": "bg-city-dawn",
        "character": "kid-blue-smile",
        "props": ["book","cloud"]
      },
      "text": {
        "en": "Leo opens the old map.",
        "ko": "레오는 오래된 지도를 펼쳤어요."
      },
      "sourceType": "template"
    }
  ]
}
```

---

## 5) 라이선스/운영 체크
- 상업 사용 가능 여부
- 2차 가공 가능 여부
- 저작자 표시 필요 여부

---

## 6) 테스트 결과 (샘플)
- 샘플 입력 JSON 3페이지 구성
- 렌더 결과 HTML 생성 성공
- 레이어 조합 + 한/영 텍스트 병렬 표시 확인

샘플 결과물(이모지 mock):
- [/projects/interest-story-english/prototype/hybrid-story-sample.json](/md-viewer.html?file=/projects/interest-story-english/prototype/hybrid-story-sample.json)
- [/projects/interest-story-english/prototype/rendered-sample.html](/projects/interest-story-english/prototype/rendered-sample.html)

실사 에셋 테스트 결과물(무료 스톡 이미지):
- [/projects/interest-story-english/prototype/hybrid-story-real-assets-sample.json](/md-viewer.html?file=/projects/interest-story-english/prototype/hybrid-story-real-assets-sample.json)
- [/projects/interest-story-english/prototype/rendered-real-assets-sample.html](/projects/interest-story-english/prototype/rendered-real-assets-sample.html)

렌더 스크립트:
- [/projects/interest-story-english/prototype/render_hybrid_sample.py](/md-viewer.html?file=/projects/interest-story-english/prototype/render_hybrid_sample.py)
- [/projects/interest-story-english/prototype/render_hybrid_real_assets.py](/md-viewer.html?file=/projects/interest-story-english/prototype/render_hybrid_real_assets.py)
