# 데이터 모델 & 입력 스키마 v1

## 1) 엔티티
1. UserProfile
- userId
- birthYear
- targetRetireAge
- lifeExpectancy
- riskMode (conservative|neutral|growth)

2. FinancialSnapshot
- currentAssets
- currentCash
- monthlyContribution
- contributionGrowthRate
- monthlyExpenseInRetirement
- pensionMonthly
- inflationRate
- expectedReturn
- taxDragRate

3. SimulationRun
- runId
- userId
- scenarioMode (base|conservative|optimistic|stress)
- createdAt
- inputVersion
- resultSummary

4. YearlyProjection
- runId
- yearOffset
- age
- assetStart
- contribution
- withdrawal
- pensionIncome
- netReturnAfterTax
- assetEnd

## 2) 입력 JSON 스키마 (초안)
```json
{
  "userProfile": {
    "birthYear": 1985,
    "targetRetireAge": 60,
    "lifeExpectancy": 90,
    "riskMode": "neutral"
  },
  "financialSnapshot": {
    "currentAssets": 300000000,
    "currentCash": 20000000,
    "monthlyContribution": 1500000,
    "contributionGrowthRate": 0.03,
    "monthlyExpenseInRetirement": 3500000,
    "pensionMonthly": 1200000,
    "inflationRate": 0.025,
    "expectedReturn": 0.055,
    "taxDragRate": 0.10
  },
  "simulationOptions": {
    "scenarioMode": "base",
    "monteCarloRuns": 1000,
    "seed": 42
  }
}
```

## 3) 유효성 규칙
- targetRetireAge > 현재나이
- lifeExpectancy >= targetRetireAge + 10
- expectedReturn: -0.1 ~ 0.2
- inflationRate: 0.0 ~ 0.1
- taxDragRate: 0.0 ~ 0.5
- monetary fields >= 0

## 4) 결과 Summary 스키마
```json
{
  "successProbability": 0.74,
  "medianAssetAtRetirement": 980000000,
  "shortfallAtRetirement": 120000000,
  "depletionProbability": 0.18,
  "recommendations": [
    "월 적립금 +300000원",
    "은퇴시점 +2년",
    "은퇴 후 지출 -8%"
  ]
}
```

## 5) 버전 정책
- inputVersion: semver (`1.0.0`)
- 필드 추가는 minor
- 의미 변경은 major
- 모든 run에 inputVersion 저장 (재현성)
