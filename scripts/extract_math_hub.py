import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\HP\.gemini\antigravity\brain\66051132-6dcc-49cb-b887-35e6eae2037b\.system_generated\steps\3960\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Search for solutiongyan.com links
links = re.findall(r'href=[\'\"](https?://solutiongyan\.com/[^\'\"]+)[\'\"]', text)
print(f"Total solutiongyan links: {len(set(links))}")
for l in sorted(list(set(links))):
    if any(k in l.lower() for k in ['math', 'chapter', 'square', 'cube', 'exponent', 'interest', 'compound', 'linear', 'polynomial', 'graph', 'mensuration', 'symmetry']):
        print(l)
