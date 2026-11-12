"""Builds content/bundle.js so the site opens by double-clicking index.html.
Run it again (py -3.12 make_local.py) whenever you change a content/*.json file."""
import json
mods = json.load(open("content/modules.json", encoding="utf-8"))
data = {"content/modules.json": mods}
for m in mods:
    data[f"content/{m}.json"] = json.load(open(f"content/{m}.json", encoding="utf-8"))
open("content/bundle.js", "w", encoding="utf-8").write(
    "window.BOOTH_DATA=" + json.dumps(data, ensure_ascii=False) + ";")
print("Wrote content/bundle.js with", len(data), "files")
