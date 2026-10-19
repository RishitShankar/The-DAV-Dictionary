import urllib.request
import urllib.parse
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for q in ['class vi', 'class v', 'class iv', 'bhasha madhuri', 'gyan sagar']:
    req = urllib.request.Request(f'https://www.onlinehindi.in/search?q={urllib.parse.quote(q)}&max-results=5', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8')
            titles = re.findall(r"<h3 class=['\"]post-title entry-title['\"]>\s*<a href=['\"]([^'\"]+)['\"]>(.*?)</a>", html)
            print(f'=== Query: {q} ===')
            for link, t in titles:
                clean = re.sub(r'<[^>]+>', '', t).strip()
                print(f'  {clean} -> {link}')
    except Exception as e:
        print('Error:', e)
