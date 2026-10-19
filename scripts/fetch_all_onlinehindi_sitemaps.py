import urllib.request
import xml.etree.ElementTree as ET
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

all_urls = []

for page in [1, 2, 3, 4]:
    url = f"https://www.onlinehindi.in/sitemap.xml?page={page}"
    print(f"Fetching {url}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            xml_data = r.read().decode('utf-8')
            root = ET.fromstring(xml_data)
            for elem in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                all_urls.append(elem.text.strip())
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print(f"Total URLs found on Online Hindi sitemaps: {len(all_urls)}")
with open('scripts/all_onlinehindi_urls.json', 'w', encoding='utf-8') as f:
    json.dump(all_urls, f, indent=2)

for u in all_urls[:30]:
    print(" ", u)
