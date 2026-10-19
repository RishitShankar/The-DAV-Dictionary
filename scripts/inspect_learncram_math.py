import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://www.learncram.com/dav-solutions/dav-class-8-maths-book-solutions/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        links = re.findall(r'<a[^>]+href=["\'](https://www.learncram\.com/[^"\']+)["\'][^>]*>(.*?)</a>', html)
        for url, text in links:
            clean = re.sub(r'<[^>]+>', '', text).strip()
            if 'dav' in url.lower() or 'chapter' in url.lower() or 'math' in url.lower():
                print(f"{clean} -> {url}")
except Exception as e:
    print('Error:', e)
