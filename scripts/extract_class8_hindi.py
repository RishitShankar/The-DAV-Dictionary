import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\HP\.gemini\antigravity\brain\66051132-6dcc-49cb-b887-35e6eae2037b\.system_generated\steps\3938\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Look for post-body
post_body_m = re.search(r"<div class='post-body[^']*'>(.*?)<div class='post-footer", text, re.DOTALL)
if post_body_m:
    post_body = post_body_m.group(1)
    links = re.findall(r'<a[^>]+href=[\'\"]([^\'\"]+)[\'\"][^>]*>(.*?)</a>', post_body, re.DOTALL)
    print(f"Links inside post-body: {len(links)}")
    for href, title in links:
        clean_title = re.sub(r'<[^>]+>', '', title).strip()
        print(f"{clean_title} => {href}")
else:
    print("Could not find post-body")
