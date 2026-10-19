import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://solutiongyan.com/dav-class-8-maths-book-solutions/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        links = re.findall(r'<a[^>]+href=["\'](https://solutiongyan\.com/[^"\']+)["\'][^>]*>(.*?)</a>', html)
        print(f"Total links found: {len(links)}")
        for url, text in links:
            clean = re.sub(r'<[^>]+>', '', text).strip()
            if any(k in url.lower() for k in ['math', 'chapter', 'worksheet', 'compound']):
                print(f"{clean} -> {url}")
except Exception as e:
    print('Error:', e)
