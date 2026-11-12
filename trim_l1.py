"""Lesson 1: cut the text where the audio ends ("...a stupéfié Israël et le monde"),
and keep the remaining lines as a "Text without audio" section under the player.
Run from the site folder:   py -3.12 trim_l1.py
Edits content/int-fr-ar.json in place. Backup: content/int-fr-ar.before-trim.json"""
import json, shutil, unicodedata
F = "content/int-fr-ar.json"
def flat(s):
    return "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")
d = json.load(open(F, encoding="utf-8"))
l = next(x for x in d["lessons"] if x["id"] == "l1")
cut = next((i for i, c in enumerate(l["chunks"]) if "stupef" in flat(c) and "et le monde" in flat(c)), None)
if cut is None: raise SystemExit("Could not find the 'stupéfié Israël et le monde' line. Nothing changed.")
if cut == len(l["chunks"]) - 1: raise SystemExit("Lesson 1 already ends at that line. Nothing changed.")
shutil.copy(F, "content/int-fr-ar.before-trim.json")
l["extra"] = l["chunks"][cut + 1:]
l["chunks"] = l["chunks"][:cut + 1]
if l.get("times"): l["times"] = l["times"][:cut + 1]
json.dump(d, open(F, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"Lesson 1: {len(l['chunks'])} lines with audio, {len(l['extra'])} lines kept as text without audio.")
