import fs from 'fs';

const outDir='/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops';
const cacheRev='20260224a';
const base=`${outDir}/data`;
const files={SCHD:`${base}/schd.csv`,JEPI:`${base}/jepi.csv`,SPY:`${base}/spy.csv`};

function parseCsv(txt){
  const lines=txt.trim().split(/\r?\n/).slice(1);
  const a=[];
  for(const ln of lines){
    const [d,,,,c]=ln.split(',');
    const cc=Number(c);
    if(d&&Number.isFinite(cc)) a.push({date:d,close:cc});
  }
  return a;
}
function mapByDate(a){const m=new Map();a.forEach(r=>m.set(r.date,r.close));return m;}
function normalize(raw){const z=raw[0];return raw.map(v=>100*v/z);}
function blendFromReturns(a,b,w=0.7){
  const out=[100];
  for(let i=1;i<a.length;i++){
    const r=w*(a[i]/a[i-1]-1)+(1-w)*(b[i]/b[i-1]-1);
    out.push(out.at(-1)*(1+r));
  }
  return out;
}

const data=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,parseCsv(fs.readFileSync(p,'utf8'))]));
const maps=Object.fromEntries(Object.entries(data).map(([k,v])=>[k,mapByDate(v)]));

const dates=[...maps.SCHD.keys()]
  .filter(d=>maps.JEPI.has(d)&&maps.SPY.has(d))
  .sort()
  .filter(d=>d>='2020-05-26');

const px={SCHD:dates.map(d=>maps.SCHD.get(d)),JEPI:dates.map(d=>maps.JEPI.get(d)),SPY:dates.map(d=>maps.SPY.get(d))};
const years=(new Date(dates.at(-1))-new Date(dates[0]))/(365.25*24*3600*1000);

function perf(raw){
  let peak=-Infinity,mdd=0;
  for(const v of raw){if(v>peak)peak=v; const dd=v/peak-1; if(dd<mdd)mdd=dd;}
  const total=raw.at(-1)/raw[0]-1;
  const cagr=Math.pow(raw.at(-1)/raw[0],1/years)-1;
  return{total,cagr,mdd};
}

// price-only
const priceNorm={SCHD:normalize(px.SCHD),JEPI:normalize(px.JEPI),SPY:normalize(px.SPY)};
priceNorm.BLEND=blendFromReturns(px.SCHD,px.JEPI,0.7);
const priceMet={SCHD:perf(px.SCHD),JEPI:perf(px.JEPI),SPY:perf(px.SPY),BLEND:perf(priceNorm.BLEND)};

// dividend-reinvestment approximation
const netYield={SCHD:0.027,JEPI:0.064,SPY:0.012};
function withCarry(raw, y){
  const out=[100];
  for(let i=1;i<raw.length;i++){
    const r=raw[i]/raw[i-1]-1;
    const carry=y/252;
    out.push(out.at(-1)*(1+r+carry));
  }
  return out;
}
const trNorm={SCHD:withCarry(px.SCHD,netYield.SCHD),JEPI:withCarry(px.JEPI,netYield.JEPI),SPY:withCarry(px.SPY,netYield.SPY)};
trNorm.BLEND=[100];
for(let i=1;i<dates.length;i++){
  const rS=px.SCHD[i]/px.SCHD[i-1]-1+netYield.SCHD/252;
  const rJ=px.JEPI[i]/px.JEPI[i-1]-1+netYield.JEPI/252;
  const r=0.7*rS+0.3*rJ;
  trNorm.BLEND.push(trNorm.BLEND.at(-1)*(1+r));
}
const trMet={SCHD:perf(trNorm.SCHD),JEPI:perf(trNorm.JEPI),SPY:perf(trNorm.SPY),BLEND:perf(trNorm.BLEND)};

function labelName(k){return k==='BLEND'?'SCHD/JEPI 70/30':k;}
function tableRows(m){
  return Object.entries(m).map(([k,v])=>`<tr><td>${labelName(k)}</td><td>${(v.total*100).toFixed(1)}%</td><td>${(v.cagr*100).toFixed(1)}%</td><td>${(v.mdd*100).toFixed(1)}%</td></tr>`).join('');
}

// Long-term projection using TR CAGR
const horizons=[10,20,30];
const principals=[10_000_000,100_000_000]; // 1천만, 1억
const monthlyContribs=[500_000,1_000_000]; // 월 50만, 100만
function krw(n){return new Intl.NumberFormat('ko-KR').format(Math.round(n));}
function proj(cagr, years, principal){return principal*Math.pow(1+cagr,years);}
function projMonthly(cagr, years, monthly){
  const r=(1+cagr)**(1/12)-1;
  const n=years*12;
  if (r===0) return monthly*n;
  return monthly*((Math.pow(1+r,n)-1)/r);
}

const projRows = Object.entries(trMet).map(([k,v])=>{
  const mult10=Math.pow(1+v.cagr,10), mult20=Math.pow(1+v.cagr,20), mult30=Math.pow(1+v.cagr,30);
  return `<tr>
    <td>${labelName(k)}</td>
    <td>${(v.cagr*100).toFixed(1)}%</td>
    <td>${mult10.toFixed(2)}x / ${mult20.toFixed(2)}x / ${mult30.toFixed(2)}x</td>
    <td>${krw(proj(v.cagr,10,principals[0]))}원</td>
    <td>${krw(proj(v.cagr,20,principals[0]))}원</td>
    <td>${krw(proj(v.cagr,30,principals[0]))}원</td>
    <td>${krw(proj(v.cagr,10,principals[1]))}원</td>
    <td>${krw(proj(v.cagr,20,principals[1]))}원</td>
    <td>${krw(proj(v.cagr,30,principals[1]))}원</td>
  </tr>`;
}).join('');

const dcaRows = Object.entries(trMet).map(([k,v])=>{
  return `<tr>
    <td>${labelName(k)}</td>
    <td>${(v.cagr*100).toFixed(1)}%</td>
    <td>${krw(projMonthly(v.cagr,10,monthlyContribs[0]))}원</td>
    <td>${krw(projMonthly(v.cagr,20,monthlyContribs[0]))}원</td>
    <td>${krw(projMonthly(v.cagr,30,monthlyContribs[0]))}원</td>
    <td>${krw(projMonthly(v.cagr,10,monthlyContribs[1]))}원</td>
    <td>${krw(projMonthly(v.cagr,20,monthlyContribs[1]))}원</td>
    <td>${krw(projMonthly(v.cagr,30,monthlyContribs[1]))}원</td>
  </tr>`;
}).join('');

const mdDoc=`# ETF 티커 기반 백테스트 확장판 (실데이터 + 배당재투자 근사)

- 차트: [/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v4.html?rev=${cacheRev}](/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v4.html?rev=${cacheRev})
- 비교: 가격기준(Price-only) + 배당재투자 근사(Total Return Approx.)
- 데이터: Stooq 일별 종가, 기간 ${dates[0]}~${dates.at(-1)}

## 보글 철학 기준 전략 제안
1. **코어 70~90%: 초저비용 광범위 인덱스**
   - 시장 전체 보유, 장기 복리의 엔진 역할
2. **위성 10~30%: 목적형 틸트(SCHD/JEPI 성격)**
   - 현금흐름 니즈가 있을 때만 제한적으로
3. **리밸런싱 규칙 고정**
   - 연 1~2회 또는 밴드(예: ±5%) 이탈 시만
4. **예측보다 비용/규율/분산 우선**
   - 뉴스 대응 매매 최소화
5. **인출기가 가까울수록 현금흐름 버킷 분리**
   - 생활비 버킷(1~3년) + 장기 버킷 분리

## 10년/20년/30년 장기 시뮬레이션(일시금 복리)
- 기준: 배당재투자 근사 CAGR를 그대로 적용한 단순 복리 모델
- 원금 시나리오: 1천만원, 1억원
- CAGR(근사): SCHD ${(trMet.SCHD.cagr*100).toFixed(1)}% / JEPI ${(trMet.JEPI.cagr*100).toFixed(1)}% / SPY ${(trMet.SPY.cagr*100).toFixed(1)}% / SCHD·JEPI 70/30 ${(trMet.BLEND.cagr*100).toFixed(1)}%

### 1천만원 시작 시 예상금액(근사)
- SCHD: 10년 ${krw(proj(trMet.SCHD.cagr,10,principals[0]))}원 / 20년 ${krw(proj(trMet.SCHD.cagr,20,principals[0]))}원 / 30년 ${krw(proj(trMet.SCHD.cagr,30,principals[0]))}원
- JEPI: 10년 ${krw(proj(trMet.JEPI.cagr,10,principals[0]))}원 / 20년 ${krw(proj(trMet.JEPI.cagr,20,principals[0]))}원 / 30년 ${krw(proj(trMet.JEPI.cagr,30,principals[0]))}원
- SPY: 10년 ${krw(proj(trMet.SPY.cagr,10,principals[0]))}원 / 20년 ${krw(proj(trMet.SPY.cagr,20,principals[0]))}원 / 30년 ${krw(proj(trMet.SPY.cagr,30,principals[0]))}원
- SCHD/JEPI 70/30: 10년 ${krw(proj(trMet.BLEND.cagr,10,principals[0]))}원 / 20년 ${krw(proj(trMet.BLEND.cagr,20,principals[0]))}원 / 30년 ${krw(proj(trMet.BLEND.cagr,30,principals[0]))}원

### 적립식(월 50만원/100만원) 예상금액(근사)
- SCHD: 월50만 → 10년 ${krw(projMonthly(trMet.SCHD.cagr,10,monthlyContribs[0]))}원 / 20년 ${krw(projMonthly(trMet.SCHD.cagr,20,monthlyContribs[0]))}원 / 30년 ${krw(projMonthly(trMet.SCHD.cagr,30,monthlyContribs[0]))}원
- JEPI: 월50만 → 10년 ${krw(projMonthly(trMet.JEPI.cagr,10,monthlyContribs[0]))}원 / 20년 ${krw(projMonthly(trMet.JEPI.cagr,20,monthlyContribs[0]))}원 / 30년 ${krw(projMonthly(trMet.JEPI.cagr,30,monthlyContribs[0]))}원
- SPY: 월50만 → 10년 ${krw(projMonthly(trMet.SPY.cagr,10,monthlyContribs[0]))}원 / 20년 ${krw(projMonthly(trMet.SPY.cagr,20,monthlyContribs[0]))}원 / 30년 ${krw(projMonthly(trMet.SPY.cagr,30,monthlyContribs[0]))}원
- SCHD/JEPI 70/30: 월50만 → 10년 ${krw(projMonthly(trMet.BLEND.cagr,10,monthlyContribs[0]))}원 / 20년 ${krw(projMonthly(trMet.BLEND.cagr,20,monthlyContribs[0]))}원 / 30년 ${krw(projMonthly(trMet.BLEND.cagr,30,monthlyContribs[0]))}원
- (월100만원은 위 금액의 2배)

## "보글이 환생했다면" 메시지
- "승률 높은 비밀은 복잡함이 아니라 비용·분산·인내다."
- "인컴 전략은 조미료로, 코어 인덱스는 식사로 써라."

## 주의
- 배당재투자 근사는 가정 기반(세후 순배당률)이며 실거래 결과와 다를 수 있음
- 장기 시뮬레이션은 과거 구간 CAGR을 미래에도 동일 적용한 단순 모델
- 환율/세금/거래비용/추적오차/개별 상품 구조 변화 미반영
`;

const html=`<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>ETF 백테스트 확장판</title><script src='https://cdn.jsdelivr.net/npm/chart.js'></script><style>
body{font-family:system-ui;max-width:1120px;margin:24px auto;padding:0 16px;line-height:1.5}
table{border-collapse:collapse;width:100%;margin:8px 0 16px;font-size:14px}
th,td{border:1px solid #e5e7eb;padding:8px;vertical-align:top}
.note{background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px;margin:8px 0}
.grid{display:grid;grid-template-columns:1fr;gap:18px}
pre{white-space:pre-wrap;background:#f8fafc;padding:12px;border:1px solid #e5e7eb;border-radius:8px}
</style></head><body>
<h1>ETF 티커 기반 백테스트 확장판 (실데이터 + 배당재투자 근사)</h1>
<p class='note'>데이터: Stooq 종가 / 기간: ${dates[0]}~${dates.at(-1)}. 아래 '배당재투자 근사'는 순배당률 가정(SCHD 2.7%, JEPI 6.4%, SPY 1.2%)을 일할 반영한 교육용 모델입니다.</p>

<div class='grid'>
<section><h2>① 가격기준(Price-only)</h2><canvas id='c1' style='max-height:360px'></canvas><table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>MDD</th></tr></thead><tbody>${tableRows(priceMet)}</tbody></table></section>
<section><h2>② 배당재투자 근사(Total Return Approx.)</h2><canvas id='c2' style='max-height:360px'></canvas><table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>MDD</th></tr></thead><tbody>${tableRows(trMet)}</tbody></table></section>
</div>

<section>
  <h2>③ 10년/20년/30년 장기 시뮬레이션 (일시금 복리)</h2>
  <p>배당재투자 근사 CAGR을 미래에도 동일하게 적용한 단순 복리 모델입니다. (원금: 1천만원, 1억원)</p>
  <table>
    <thead><tr><th>전략</th><th>CAGR(근사)</th><th>성장배수(10/20/30년)</th><th>1천만원 10년</th><th>1천만원 20년</th><th>1천만원 30년</th><th>1억원 10년</th><th>1억원 20년</th><th>1억원 30년</th></tr></thead>
    <tbody>${projRows}</tbody>
  </table>
</section>

<section>
  <h2>④ 적립식 시뮬레이션 (월 50만원 / 100만원)</h2>
  <p>월말 적립을 가정한 단순 복리 모델입니다. (배당재투자 근사 CAGR 적용)</p>
  <table>
    <thead><tr><th>전략</th><th>CAGR(근사)</th><th>월50만 10년</th><th>월50만 20년</th><th>월50만 30년</th><th>월100만 10년</th><th>월100만 20년</th><th>월100만 30년</th></tr></thead>
    <tbody>${dcaRows}</tbody>
  </table>
</section>

<section>
  <h2>문서 요약 (MD 포함)</h2>
  <pre>${mdDoc.replaceAll('<','&lt;')}</pre>
</section>

<section>
  <h2>주의</h2>
  <ul>
    <li>근사 모델이므로 실제 투자결과와 다를 수 있습니다.</li>
    <li>환율, 세금, 거래비용, 추적오차, 종목 정책 변화는 반영하지 않았습니다.</li>
  </ul>
</section>

<script>
const labels=${JSON.stringify(dates)};
const p=${JSON.stringify(priceNorm)}; const t=${JSON.stringify(trNorm)};
function mk(id,d){new Chart(document.getElementById(id),{type:'line',data:{labels,datasets:[{label:'SPY',data:d.SPY,borderColor:'#2563eb',pointRadius:0,tension:.1},{label:'SCHD',data:d.SCHD,borderColor:'#16a34a',pointRadius:0,tension:.1},{label:'JEPI',data:d.JEPI,borderColor:'#dc2626',pointRadius:0,tension:.1},{label:'SCHD/JEPI 70/30',data:d.BLEND,borderColor:'#7c3aed',pointRadius:0,tension:.1}]},options:{plugins:{legend:{position:'bottom'}},scales:{y:{title:{display:true,text:'초기 100 기준'}}}}});}
mk('c1',p); mk('c2',t);
</script></body></html>`;

fs.writeFileSync(`${outDir}/kr-jepi-schd-bogle-backtest-real-v4.html`,html);
fs.writeFileSync(`${outDir}/kr-jepi-schd-bogle-backtest-real-v4.md`,mdDoc);
console.log('built v2 with long-term simulation');