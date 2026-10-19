import urllib.request
import sys

sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://solutiongyan.com/dav-class-8-maths-book-solutions/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        # Extract post content
        m = html.find('DAV Solutions for Class 8 Maths')
        if m != -1:
            snippet = html[m:m+6000]
            print(snippet)
        else:
            print(html[:1000])
except Exception as e:
    print('Error:', e)
