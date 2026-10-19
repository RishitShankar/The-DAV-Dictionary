import urllib.request
import xml.etree.ElementTree as ET
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

sitemaps = [
    f"https://ncertbookspdf.com/post-sitemap{i}.xml" for i in range(1, 7)
] + ['https://ncertbookspdf.com/page-sitemap.xml']

dav_urls = []

for sm in sitemaps:
    print(f"Fetching {sm}...")
    req = urllib.request.Request(sm, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            xml_data = r.read().decode('utf-8')
            root = ET.fromstring(xml_data)
            for elem in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                url = elem.text.strip()
                if 'dav' in url.lower():
                    dav_urls.append(url)
    except Exception as e:
        print(f"Error fetching {sm}: {e}")

print(f"Total DAV URLs found on ncertbookspdf.com: {len(dav_urls)}")
with open('scripts/all_ncertbookspdf_dav_urls.json', 'w', encoding='utf-8') as f:
    json.dump(dav_urls, f, indent=2)

for u in dav_urls[:30]:
    print(" ", u)
