import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://www.onlinehindi.in/2017/11/class-vi-all-chapters-dav-davcmc-hindi.html', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        m = re.search(r"<div class='post-body[^']*'>(.*?)<div class='post-footer", html, re.DOTALL)
        if m:
            body = m.group(1)
            links = re.findall(r'<a[^>]+href=[\'\"]([^\'\"]+)[\'\"][^>]*>(.*?)</a>', body, re.DOTALL)
            for href, t in links:
                clean = re.sub(r'<[^>]+>', '', t).strip()
                if clean:
                    print(f"{clean} => {href}")
except Exception as e:
    print('Error:', e)
