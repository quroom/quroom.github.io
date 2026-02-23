import json
from pathlib import Path

base = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/interest-story-english/prototype')
data = json.loads((base / 'hybrid-all-real-10p-sample.json').read_text())

cards=[]
for p in data['pages']:
    img = f"<div class='scene'><img class='realimg' src='{p['image']}' alt='page-{p['page']}' loading='lazy'/><span class='chip'>real image</span></div>"
    txt = f"<div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>"
    body = img + txt if p['layout']=='image-top-text-bottom' else f"<div class='row'>{img}{txt}</div>"
    cards.append(f"<section class='card'><h3>Page {p['page']}</h3>{body}</section>")

html=f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>All Real 10p Sample</title>
<style>
body{{font-family:system-ui;max-width:1000px;margin:24px auto;padding:0 16px}}
.card{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:12px 0}}
.row{{display:grid;grid-template-columns:46% 1fr;gap:12px}}
.scene{{height:260px;border-radius:10px;position:relative;overflow:hidden}}
.realimg{{width:100%;height:100%;object-fit:cover}}
.chip{{position:absolute;top:8px;left:8px;background:#ffffffdd;border:1px solid #ddd;border-radius:999px;padding:2px 8px;font-size:12px}}
.txt p{{line-height:1.7;margin:6px 0}}
.note{{border:1px solid #fde68a;background:#fffbeb;padding:8px 10px;border-radius:8px}}
@media (max-width:760px){{.row{{grid-template-columns:1fr}}.scene{{height:220px}}}}
</style></head><body>
<h1>{data['title']}</h1>
<p class='note'>실사 이미지 10페이지 버전(교육용 샘플). 전쟁 주제는 연령 적합하게 순화된 텍스트만 사용.</p>
{''.join(cards)}
</body></html>"""

(base / 'rendered-hybrid-all-real-10p-sample.html').write_text(html)
print('rendered', base / 'rendered-hybrid-all-real-10p-sample.html')
