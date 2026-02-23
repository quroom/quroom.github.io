import json
from pathlib import Path

base = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/interest-story-english/prototype')

data = json.loads((base / 'hybrid-story-sample.json').read_text())

bg_colors = {
    'bg-sky': '#dbeafe',
    'bg-field': '#dcfce7',
    'bg-night': '#e0e7ff',
}
char_icons = {
    'kid-blue': '🧒',
    'kid-point': '🧑\u200d🏫',
    'kid-think': '🤔',
}
prop_icons = {
    'book': '📘', 'flag': '🚩', 'cloud': '☁️', 'star': '⭐'
}

cards = []
for p in data['pages']:
    bg = bg_colors.get(p['layers']['background'], '#f3f4f6')
    ch = char_icons.get(p['layers']['character'], '🧒')
    props = ' '.join(prop_icons.get(x, '•') for x in p['layers'].get('props', []))
    if p['layout'] == 'image-top-text-bottom':
        content = f"""
        <div class='imgbox' style='background:{bg}'><div class='emoji'>{ch}</div><div class='props'>{props}</div></div>
        <div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>
        """
    else:
        content = f"""
        <div class='row'>
          <div class='imgbox' style='background:{bg}'><div class='emoji'>{ch}</div><div class='props'>{props}</div></div>
          <div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>
        </div>
        """
    cards.append(f"<section class='card'><h3>Page {p['page']}</h3>{content}</section>")

html = f"""<!doctype html>
<html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Hybrid Story Sample</title>
<style>
body{{font-family:system-ui;max-width:960px;margin:24px auto;padding:0 16px}}
.card{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:12px 0}}
.imgbox{{height:180px;border-radius:10px;display:flex;align-items:center;justify-content:center;position:relative}}
.emoji{{font-size:58px}} .props{{position:absolute;bottom:8px;right:10px;font-size:22px}}
.row{{display:grid;grid-template-columns:42% 1fr;gap:12px;align-items:stretch}}
.txt p{{margin:6px 0;line-height:1.6}}
@media (max-width:760px){{.row{{grid-template-columns:1fr}}}}
</style></head><body>
<h1>{data['title']} (Hybrid Render Sample)</h1>
{''.join(cards)}
</body></html>"""

(base / 'rendered-sample.html').write_text(html)
print('rendered', base / 'rendered-sample.html')
