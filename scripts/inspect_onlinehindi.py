import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\HP\.gemini\antigravity\brain\66051132-6dcc-49cb-b887-35e6eae2037b\.system_generated\steps\3930\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

links = re.findall(r'<a[^>]+href=[\'\"](https?://[^\'\"]+)[\'\"][^>]*>(.*?)</a>', text, re.DOTALL)
print(f"Total links on Class VIII page: {len(links)}")
for href, anchor in links:
    clean_anchor = re.sub(r'<[^>]+>', '', anchor).strip()
    if clean_anchor and len(clean_anchor) < 100:
        if any(w in clean_anchor.lower() for w in ['chapter', 'ch', 'पाठ', 'अभ्यास']) or any(c in clean_anchor for c in '123456789'):
            print(f"{clean_anchor} => {href}")
