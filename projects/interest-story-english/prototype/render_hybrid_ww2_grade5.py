import json
from pathlib import Path

base = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/interest-story-english/prototype')
data = json.loads((base / 'hybrid-mixed-ww2-grade5-sample.json').read_text())

bg = {
    'city_morning':'linear-gradient(135deg,#bfdbfe,#fde68a)','library_light':'linear-gradient(135deg,#ddd6fe,#e9d5ff)',
    'museum_hall':'linear-gradient(135deg,#fef3c7,#fde68a)','old_map_room':'linear-gradient(135deg,#d1fae5,#a7f3d0)',
    'river_bridge':'linear-gradient(135deg,#bae6fd,#7dd3fc)','cloudy_hill':'linear-gradient(135deg,#e0f2fe,#cffafe)',
    'sunset_field':'linear-gradient(135deg,#fed7aa,#fdba74)'
}
seed = {'leo':'Leo','mina':'Mina','teacher_j':'TeacherJ','explorer_kai':'Kai','friend_noa':'Noa'}

cards=[]
for p in data['pages']:
    if p['sourceType']=='template':
        av = f"https://api.dicebear.com/7.x/adventurer/svg?seed={seed[p['character']]}-{p['emotion']}&backgroundColor=b6e3f4,c0aede,d1d4f9"
        scene = f"<div class='scene' style='background:{bg.get(p['template'],'#eef2ff')}'><img class='avatar' src='{av}' alt='avatar'/><span class='chip'>{p.get('label','template')}</span></div>"
    else:
        scene = f"<div class='scene real'><img class='realimg' src='{p['image']}' alt='real'/><span class='chip'>{p.get('label','stock/ai')}</span></div>"

    txt = f"<div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>"
    if p['layout']=='image-top-text-bottom':
        body = scene + txt
    else:
        body = f"<div class='row'>{scene}{txt}</div>"
    cards.append(f"<section class='card'><h3>Page {p['page']}</h3>{body}</section>")

html=f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>WW2 Grade5 Mixed Sample</title>
<style>
body{{font-family:system-ui;max-width:1000px;margin:24px auto;padding:0 16px}}
.card{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:12px 0}}
.row{{display:grid;grid-template-columns:46% 1fr;gap:12px}}
.scene{{height:250px;border-radius:10px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}}
.avatar{{width:130px;height:130px;border-radius:50%;background:#fff}}
.realimg{{width:100%;height:100%;object-fit:cover}}
.chip{{position:absolute;top:8px;left:8px;background:#ffffffd9;border:1px solid #ddd;border-radius:999px;padding:2px 8px;font-size:12px}}
.txt p{{line-height:1.7;margin:6px 0}}
.notice{{border:1px solid #fde68a;background:#fffbeb;padding:8px 10px;border-radius:8px}}
@media (max-width:760px){{.row{{grid-template-columns:1fr}}.scene{{height:220px}}}}
</style></head><body>
<h1>{data['title']}</h1>
<p class='notice'>This sample is age-filtered: minimal violent detail, fact vs what-if labels.</p>
<p><small>혼합 파이프라인: 템플릿 7 + 실사/생성 3</small></p>
{''.join(cards)}
</body></html>"""

(base / 'rendered-hybrid-ww2-grade5-sample.html').write_text(html)
print('rendered', base / 'rendered-hybrid-ww2-grade5-sample.html')
