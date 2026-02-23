import json
from pathlib import Path

base = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/interest-story-english/prototype')
data = json.loads((base / 'cartoon-template-sample.json').read_text())

bg = {
    'city_morning': 'linear-gradient(135deg,#dbeafe,#fde68a)',
    'library_light': 'linear-gradient(135deg,#ede9fe,#bfdbfe)',
    'night_desk': 'linear-gradient(135deg,#c7d2fe,#a7f3d0)',
}
chars = {
    'leo': '🧒',
    'mina': '👧',
}
em = {'curious':'🤔','thinking':'💡','smile':'😊'}

cards=[]
for p in data['pages']:
    scene = f"""
    <div class='scene' style='background:{bg.get(p['template'],'#eee')}'>
      <div class='char'>{chars.get(p['character'],'🧒')}</div>
      <div class='emo'>{em.get(p['emotion'],'🙂')}</div>
      <div class='label'>{p['template']}</div>
    </div>
    """
    text = f"<div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>"
    if p['layout']=='image-top-text-bottom':
        body = scene + text
    else:
        body = f"<div class='row'>{scene}{text}</div>"
    cards.append(f"<section class='card'><h3>Page {p['page']}</h3>{body}</section>")

html=f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Cartoon Template Sample</title>
<style>
body{{font-family:system-ui;max-width:980px;margin:24px auto;padding:0 16px}}
.card{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:14px 0}}
.scene{{height:260px;border-radius:10px;position:relative;display:flex;align-items:center;justify-content:center}}
.char{{font-size:76px}} .emo{{position:absolute;top:10px;right:12px;font-size:28px}}
.label{{position:absolute;bottom:8px;left:10px;font-size:12px;background:#ffffffcc;padding:2px 8px;border-radius:999px}}
.row{{display:grid;grid-template-columns:46% 1fr;gap:12px;align-items:stretch}}
.txt p{{line-height:1.7;margin:6px 0}}
@media (max-width:760px){{.row{{grid-template-columns:1fr}}.scene{{height:220px}}}}
</style></head><body>
<h1>{data['title']}</h1>
<p><small>Template test: 10개 템플릿/5개 캐릭터 확장 전 샘플(3p)</small></p>
{''.join(cards)}
</body></html>"""

(base / 'rendered-cartoon-template-sample.html').write_text(html)
print('rendered', base / 'rendered-cartoon-template-sample.html')
