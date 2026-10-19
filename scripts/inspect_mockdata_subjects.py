import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

text = open('src/data/mockData.js', 'r', encoding='utf-8').read()
# Extract DAV_SUBJECTS object
m = re.search(r'export const DAV_SUBJECTS\s*=\s*\{([\s\S]*?)\n\};', text)
if m:
    body = m.group(1)
    # Split by grade key
    sections = re.findall(r"(?:'(\w+)'|(\w+))\s*:\s*\[([\s\S]*?)\]\s*(?:,|$)", body)
    for g1, g2, blk in sections:
        g = g1 or g2
        subjs = re.findall(r"id:\s*'([^']+)',\s*name:\s*'([^']+)'", blk)
        print(f"Grade {g}:")
        for sid, sname in subjs:
            print(f"   {sid}: {sname}")
