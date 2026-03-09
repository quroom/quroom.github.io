import fs from 'fs';

const tickers = [
  { key:'SCHD', code:'schd.us', name:'SCHD' },
  { key:'JEPI', code:'jepi.us', name:'JEPI' },
  { key:'SPY', code:'spy.us', name:'SPY (Broad Market Proxy)' }
];

async function fetchCsv(code){
  const url = `https://stooq.com/q/d/l/?s=${code}&i=d`;
  const r = await fetch(url);
  if(!r.ok) throw new Error('fetch fail '+code);
  return await r.text();
}

function parseCsv(txt){
  const lines = txt.trim().split(/\r?\n/).slice(1);
  const arr=[];
  for(const ln of lines){
    const [Date,Open,High,Low,Close,Volume] = ln.split(',');
    const c = Number(Close);
    if(!Date || !Number.isFinite(c)) continue;
    arr.push({date:Date, close:c});
  }
  return arr;
}

function mapByDate(arr){const m=new Map(); arr.forEach(r=>m.set(r.date,r.close)); return m;}

function maxDrawdown(series){
  let peak=-Infinity, mdd=0;
  for(const v of series){
    if(v>peak) peak=v;
    const dd = (v/peak)-1;
    if(dd<mdd) mdd=dd;
  }
  return mdd;
}

function cagr(first,last,years){ return Math.pow(last/first,1/years)-1; }

const data={};
for(const t of tickers){
  data[t.key] = parseCsv(await fetchCsv(t.code));
}

// common date intersection
const maps = Object.fromEntries(Object.entries(data).map(([k,v])=>[k,mapByDate(v)]));
let dates = [...maps.SCHD.keys()].filter(d=>maps.JEPI.has(d)&&maps.SPY.has(d)).sort();
// start at JEPI inception common already; keep from 2020-05-26
const start='2020-05-26';
dates = dates.filter(d=>d>=start);

const closes = {
  SCHD: dates.map(d=>maps.SCHD.get(d)),
  JEPI: dates.map(d=>maps.JEPI.get(d)),
  SPY: dates.map(d=>maps.SPY.get(d)),
};

function norm(series){ const s0=series[0]; return series.map(v=>100*v/s0); }

const normed={
  SCHD:norm(closes.SCHD),
  JEPI:norm(closes.JEPI),
  SPY:norm(closes.SPY),
};

// 70/30 blend from daily returns (SCHD/JEPI)
const blend=[100];
for(let i=1;i<dates.length;i++){
  const rS=closes.SCHD[i]/closes.SCHD[i-1]-1;
  const rJ=closes.JEPI[i]/closes.JEPI[i-1]-1;
  const r=0.7*rS+0.3*rJ;
  blend.push(blend[blend.length-1]*(1+r));
}
normed.BLEND = blend;

const years = (new Date(dates.at(-1)) - new Date(dates[0])) / (365.25*24*3600*1000);

function metrics(series){
  const total = series.at(-1)/series[0]-1;
  const cg = cagr(series[0],series.at(-1),years);
  const mdd = maxDrawdown(series.map((v,i)=>v/series[0]));
  return {total,cagr:cg,mdd};
}

const met={
  SCHD:metrics(closes.SCHD),
  JEPI:metrics(closes.JEPI),
  SPY:metrics(closes.SPY),
  BLEND:metrics(normed.BLEND),
};

const html=`<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>ETF 티커 기반 백테스트</title><script src='https://cdn.jsdelivr.net/npm/chart.js'></script><style>body{font-family:system-ui;max-width:1000px;margin:24px auto;padding:0 16px}table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #e5e7eb;padding:8px}.note{background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px}</style></head><body>
<h1>ETF 티커 기반 백테스트 (Stooq 일별 데이터)</h1>
<p class='note'>기간: ${dates[0]} ~ ${dates.at(-1)} (공통구간, 배당/세금/환율/슬리피지 미반영 단순 가격기준). 교육용 참고 자료입니다.</p>
<canvas id='c' style='max-height:420px'></canvas>
<table><thead><tr><th>전략</th><th>총수익률</th><th>CAGR</th><th>최대낙폭(MDD)</th></tr></thead><tbody>
${Object.entries(met).map(([k,v])=>`<tr><td>${k==='BLEND'?'SCHD/JEPI 70/30':k}</td><td>${(v.total*100).toFixed(1)}%</td><td>${(v.cagr*100).toFixed(1)}%</td><td>${(v.mdd*100).toFixed(1)}%</td></tr>`).join('')}
</tbody></table>
<script>
const labels=${JSON.stringify(dates)};
const d=${JSON.stringify(normed)};
new Chart(document.getElementById('c'),{type:'line',data:{labels,datasets:[
{label:'SPY',data:d.SPY,borderColor:'#2563eb',pointRadius:0,tension:.1},
{label:'SCHD',data:d.SCHD,borderColor:'#16a34a',pointRadius:0,tension:.1},
{label:'JEPI',data:d.JEPI,borderColor:'#dc2626',pointRadius:0,tension:.1},
{label:'SCHD/JEPI 70/30',data:d.BLEND,borderColor:'#7c3aed',pointRadius:0,tension:.1}
]} ,options:{plugins:{legend:{position:'bottom'}},scales:{y:{title:{display:true,text:'초기 100 기준'}}}}});
</script>
</body></html>`;

fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html', html);

const md = `# ETF 티커 기반 백테스트 (실데이터)

- 차트: [/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html](/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.html)
- 데이터 소스: Stooq 일별 종가 (SCHD, JEPI, SPY)
- 공통구간: ${dates[0]} ~ ${dates.at(-1)}

## 핵심 해석
- JEPI는 인컴 성격상 상승장 참여가 제한될 수 있어 장기 CAGR이 낮게 나올 수 있음
- SCHD는 배당성장 성격으로 JEPI 대비 성장 쪽에 유리할 수 있음
- 보글 관점에서는 코어(광범위 인덱스) + 위성(인컴/배당 틸트) 접근이 합리적

## 주의
- 총수익(배당재투자) 완전 반영 아님
- 환율, 세금, 거래비용 미반영
- 교육용 비교 자료
`;
fs.writeFileSync('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/kr-jepi-schd-bogle-backtest-real.md', md);

console.log('built');
