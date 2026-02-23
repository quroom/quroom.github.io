import fs from 'fs';
const base='/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/data';
const files={SCHD:`${base}/schd.csv`,JEPI:`${base}/jepi.csv`,SPY:`${base}/spy.csv`};
function parseCsv(txt){const lines=txt.trim().split(/\r?\n/).slice(1);const a=[];for(const ln of lines){const [d,,,,c]=ln.split(',');const cc=Number(c);if(d&&Number.isFinite(cc))a.push({date:d,close:cc});}return a;}
function mapByDate(a){const m=new Map();a.forEach(r=>m.set(r.date,r.close));return m;}
const data=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,parseCsv(fs.readFileSync(p,'utf8'))]));
const maps=Object.fromEntries(Object.entries(data).map(([k,v])=>[k,mapByDate(v)]));
let dates=[...maps.SCHD.keys()].filter(d=>maps.JEPI.has(d)&&maps.SPY.has(d)).sort().filter(d=>d>='2020-05-26');
const px={SCHD:dates.map(d=>maps.SCHD.get(d)),JEPI:dates.map(d=>maps.JEPI.get(d)),SPY:dates.map(d=>maps.SPY.get(d))};
const years=(new Date(dates.at(-1))-new Date(dates[0]))/(365.25*24*3600*1000);
function perf(raw){let peak=-Infinity,mdd=0;for(const v of raw){if(v>peak)peak=v;const dd=v/peak-1;if(dd<mdd)mdd=dd;}const total=raw.at(-1)/raw[0]-1;const cagr=Math.pow(raw.at(-1)/raw[0],1/years)-1;return{total,cagr,mdd};}
function normalize(raw){const z=raw[0];return raw.map(v=>100*v/z);}
function blendFromReturns(a,b,w=0.7){const out=[100];for(let i=1;i<a.length;i++){const r=w*(a[i]/a[i-1]-1)+(1-w)*(b[i]/b[i-1]-1);out.push(out.at(-1)*(1+r));}return out;}

// price-only
const priceNorm={SCHD:normalize(px.SCHD),JEPI:normalize(px.JEPI),SPY:normalize(px.SPY)};
priceNorm.BLEND=blendFromReturns(px.SCHD,px.JEPI,0.7);
const priceMet={SCHD:perf(px.SCHD),JEPI:perf(px.JEPI),SPY:perf(px.SPY),BLEND:perf(priceNorm.BLEND)};

// dividend-reinvestment approximation (net carry added daily)
const netYield={SCHD:0.027,JEPI:0.064,SPY:0.012}; // simple assumed annual net yields
function withCarry(raw, y){const out=[100];for(let i=1;i<raw.length;i++){const r=raw[i]/raw[i-1]-1;const carry=y/252;out.push(out.at(-1)*(1+r+carry));}return out;}
const trNorm={SCHD:withCarry(px.SCHD,netYield.SCHD),JEPI:withCarry(px.JEPI,netYield.JEPI),SPY:withCarry(px.SPY,netYield.SPY)};
trNorm.BLEND=[100];for(let i=1;i<dates.length;i++){const rS=px.SCHD[i]/px.SCHD[i-1]-1+netYield.SCHD/252;const rJ=px.JEPI[i]/px.JEPI[i-1]-1+netYield.JEPI/252;const r=0.7*rS+0.3*rJ;trNorm.BLEND.push(trNorm.BLEND.at(-1)*(1+r));}
const trMet={SCHD:perf(trNorm.SCHD),JEPI:perf(trNorm.JEPI),SPY:perf(trNorm.SPY),BLEND:perf(trNorm.BLEND)};

function tableRows(m){return Object.entries(m).map(([k,v])=>`<tr><td>${k==='BLEND'?'SCHD/JEPI 70/30':k}</td><td>${(v.total*100).toFixed(1)}%</td><td>${(v.cagr*100).toFixed(1)}%</td><td>${(v.mdd*100).toFixed(1)}%</td></tr>`).join('');}

const html=`<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>ETF 백테스트 확장판</title><script src='https://cdn.jsdelivr.net/npm/chart.js'></script><style>body{font-family:system-ui;max-width:1060px;margin:24px auto;padding:0 16px}table{border-collapse:collapse;width:100%;margin:8px 0 16px}th,td{border:1px solid #e5e7eb;padding:8px}.note{background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px;margin:8px 0}.grid{display:grid;grid-template-columns:1fr;gap:18px}</style></head><body>
<h1>ETF 티커 기반 백테스트 확장판 (실데이터 + 배당재투자 근사)</h1>
<p class='note'>데이터: Stooq 종가 / 기간: ${dates[0]}~${dates.at(-1)}. 아래 '배당재투자 근사'는 순배당률 가정(SCHD 2.7%, JEPI 6.4%, SPY 1.2%)을 일할 반영한 교육용 모델입니다.</p>
<div class='grid'>
<section><h2>① 가격기준(Price-only)</h2><canvas id='c1' style='max-height:360px'></canvas><table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>MDD</th></tr></thead><tbody>${tableRows(priceMet)}</tbody></table></section>
<section><h2>② 배당재투자 근사(Total Return Approx.)</h2><canvas id='c2' style='max-height:360px'></canvas><table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>MDD</th></tr></thead><tbody>${tableRows(trMet)}</tbody></table></section>
</div>
<script>
const labels=${JSON.stringify(dates)};
const p=${JSON.stringify(priceNorm)}; const t=${JSON.stringify(trNorm)};
function mk(id,d){new Chart(document.getElementById(id),{type:'line',data:{labels,datasets:[{label:'SPY',data:d.SPY,borderColor:'#2563eb',pointRadius:0,tension:.1},{label:'SCHD',data:d.SCHD,borderColor:'#16a34a',pointRadius:0,tension:.1},{label:'JEPI',data:d.JEPI,borderColor:'#dc2626',pointRadius:0,tension:.1},{label:'SCHD/JEPI 70/30',data:d.BLEND,borderColor:'#7c3aed',pointRadius:0,tension:.1}]},options:{plugins:{legend:{position:'bottom'}},scales:{y:{title:{display:true,text:'초기 100 기준'}}}}});}
mk('c1',p); mk('c2',t);
</script></body></html>`;
fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v2.html',html);

const md=`# ETF 티커 기반 백테스트 확장판 (실데이터 + 배당재투자 근사)

- 차트: [/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v2.html](/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v2.html)
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

## "보글이 환생했다면" 메시지
- "승률 높은 비밀은 복잡함이 아니라 비용·분산·인내다."
- "인컴 전략은 조미료로, 코어 인덱스는 식사로 써라."

## 주의
- 배당재투자 근사는 가정 기반(세후 순배당률)이며 실거래 결과와 다를 수 있음
- 환율/세금/거래비용/추적오차 미반영
`;
fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real-v2.md',md);
console.log('built v2');
