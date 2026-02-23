import fs from 'fs';
const base='/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/data';
const files={SCHD:`${base}/schd.csv`,JEPI:`${base}/jepi.csv`,SPY:`${base}/spy.csv`};
function parseCsv(txt){
  const lines=txt.trim().split(/\r?\n/).slice(1);const arr=[];
  for(const ln of lines){const [d,o,h,l,c,v]=ln.split(','); const cc=Number(c); if(d&&Number.isFinite(cc)) arr.push({date:d,close:cc});}
  return arr;
}
function mapByDate(a){const m=new Map(); a.forEach(r=>m.set(r.date,r.close)); return m;}
const data=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,parseCsv(fs.readFileSync(p,'utf8'))]));
const maps=Object.fromEntries(Object.entries(data).map(([k,v])=>[k,mapByDate(v)]));
let dates=[...maps.SCHD.keys()].filter(d=>maps.JEPI.has(d)&&maps.SPY.has(d)).sort();
dates=dates.filter(d=>d>='2020-05-26');
const closes={SCHD:dates.map(d=>maps.SCHD.get(d)),JEPI:dates.map(d=>maps.JEPI.get(d)),SPY:dates.map(d=>maps.SPY.get(d))};
function norm(s){const z=s[0]; return s.map(v=>100*v/z);} 
const normed={SCHD:norm(closes.SCHD),JEPI:norm(closes.JEPI),SPY:norm(closes.SPY)};
const blend=[100]; for(let i=1;i<dates.length;i++){const r=0.7*(closes.SCHD[i]/closes.SCHD[i-1]-1)+0.3*(closes.JEPI[i]/closes.JEPI[i-1]-1); blend.push(blend.at(-1)*(1+r));} normed.BLEND=blend;
function maxDrawdown(series){let peak=-Infinity,mdd=0; for(const v of series){if(v>peak) peak=v; const dd=v/peak-1; if(dd<mdd)mdd=dd;} return mdd;}
const years=(new Date(dates.at(-1))-new Date(dates[0]))/(365.25*24*3600*1000);
function metrics(raw){const total=raw.at(-1)/raw[0]-1; const cagr=Math.pow(raw.at(-1)/raw[0],1/years)-1; const mdd=maxDrawdown(raw.map(v=>v/raw[0])); return {total,cagr,mdd};}
const met={SCHD:metrics(closes.SCHD),JEPI:metrics(closes.JEPI),SPY:metrics(closes.SPY),BLEND:metrics(normed.BLEND)};
const html=`<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>ETF 티커 기반 백테스트(실데이터)</title><script src='https://cdn.jsdelivr.net/npm/chart.js'></script><style>body{font-family:system-ui;max-width:1000px;margin:24px auto;padding:0 16px}table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #e5e7eb;padding:8px}.note{background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px}</style></head><body><h1>ETF 티커 기반 백테스트 (실데이터)</h1><p class='note'>데이터: Stooq 일별 종가 · 기간: ${dates[0]} ~ ${dates.at(-1)} · 배당재투자/세금/환율 미반영(교육용)</p><canvas id='c' style='max-height:420px'></canvas><table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>MDD</th></tr></thead><tbody>${Object.entries(met).map(([k,v])=>`<tr><td>${k==='BLEND'?'SCHD/JEPI 70/30':k}</td><td>${(v.total*100).toFixed(1)}%</td><td>${(v.cagr*100).toFixed(1)}%</td><td>${(v.mdd*100).toFixed(1)}%</td></tr>`).join('')}</tbody></table><script>const labels=${JSON.stringify(dates)}; const d=${JSON.stringify(normed)}; new Chart(document.getElementById('c'),{type:'line',data:{labels,datasets:[{label:'SPY',data:d.SPY,borderColor:'#2563eb',pointRadius:0,tension:.1},{label:'SCHD',data:d.SCHD,borderColor:'#16a34a',pointRadius:0,tension:.1},{label:'JEPI',data:d.JEPI,borderColor:'#dc2626',pointRadius:0,tension:.1},{label:'SCHD/JEPI 70/30',data:d.BLEND,borderColor:'#7c3aed',pointRadius:0,tension:.1}]},options:{plugins:{legend:{position:'bottom'}},scales:{y:{title:{display:true,text:'초기 100 기준'}}}}});</script></body></html>`;
fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html',html);
const md=`# ETF 티커 기반 백테스트 (실데이터)

- 차트: [/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html](/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html)
- 데이터: Stooq 일별 종가 (SCHD, JEPI, SPY)
- 기간: ${dates[0]} ~ ${dates.at(-1)}

## 요약 해석
- JEPI는 인컴 성격으로 상승장 캡 영향이 나타날 수 있음
- SCHD는 배당성장 성격으로 JEPI 대비 성장 축 성과가 나올 수 있음
- 보글 관점: 코어(광범위 인덱스) + 위성(인컴/배당) 분리

## 주의
- 총수익(배당재투자) 완전 반영 아님
- 세금/환율/거래비용 미반영
- 교육용 참고
`;
fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.md',md);
console.log('built', dates[0], dates.at(-1), met);
