import json
from pathlib import Path

base = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/interest-story-english/prototype')
data = json.loads((base / 'hybrid-story-real-assets-sample.json').read_text())

cards = []
for p in data['pages']:
    img = p['image']
    if p['layout'] == 'image-top-text-bottom':
        content = f"""
        <img class='hero' src='{img}' alt='page-{p['page']}' loading='lazy'/>
        <div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>
        """
    else:
        content = f"""
        <div class='row'>
          <img class='side' src='{img}' alt='page-{p['page']}' loading='lazy'/>
          <div class='txt'><p><b>EN</b> {p['text']['en']}</p><p><b>KO</b> {p['text']['ko']}</p></div>
        </div>
        """
    cards.append(f"<section class='card'><h3>Page {p['page']}</h3>{content}</section>")

html = f"""<!doctype html>
<html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Hybrid Real Asset Sample</title>
<style>
body{{font-family:system-ui;max-width:980px;margin:24px auto;padding:0 16px;background:#fff}}
.card{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:14px 0;background:#fff}}
.hero{{width:100%;height:280px;object-fit:cover;border-radius:10px}}
.side{{width:100%;height:260px;object-fit:cover;border-radius:10px}}
.row{{display:grid;grid-template-columns:46% 1fr;gap:12px;align-items:start}}
.txt p{{margin:6px 0;line-height:1.7}}
small{{color:#666}}
@media (max-width:760px){{.row{{grid-template-columns:1fr}}.hero,.side{{height:220px}}}}
</style></head><body>
<h1>{data['title']}</h1>
<p><small>Layout mix: page1=image-top-text-bottom, page2~3=left-image-right-text</small></p>
{''.join(cards)}
</body></html>"""

(base / 'rendered-real-assets-sample.html').write_text(html)
print('rendered', base / 'rendered-real-assets-sample.html')
