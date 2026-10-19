import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

urls = {
    'Class 6': 'https://www.onlinehindi.in/2017/11/class-vi-all-chapters-dav-davcmc-hindi.html',
    'Class 5': 'https://www.onlinehindi.in/2017/11/class-v-all-chapters-dav-davcmc-hindi.html',
    'Class 4': 'https://www.onlinehindi.in/2020/07/class-iv-all-chapters-dav-davcmc-hindi.html'
}

for cls, url in urls.items():
    print(f"\n=================== {cls} ===================")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
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
            else:
                print("Could not find post-body")
    except Exception as e:
        print('Error:', e)
