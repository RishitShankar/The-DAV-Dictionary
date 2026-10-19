import urllib.request
import xml.etree.ElementTree as ET
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

sitemaps = [
    'https://solutiongyan.com/post-sitemap1.xml',
    'https://solutiongyan.com/post-sitemap2.xml',
    'https://solutiongyan.com/page-sitemap.xml',
    'https://solutiongyan.com/category-sitemap.xml'
]

all_urls = []

for sm in sitemaps:
    print(f"Fetching {sm}...")
    req = urllib.request.Request(sm, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            xml_data = r.read().decode('utf-8')
            root = ET.fromstring(xml_data)
            # Find all <loc>
            for elem in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                url = elem.text.strip()
                if 'dav' in url.lower() or 'class' in url.lower():
                    all_urls.append(url)
    except Exception as e:
        print(f"Error fetching {sm}: {e}")

print(f"Total DAV/Class URLs found on Solution Gyan: {len(all_urls)}")
with open('scripts/all_solutiongyan_urls.json', 'w', encoding='utf-8') as f:
    json.dump(all_urls, f, indent=2)

for u in all_urls[:20]:
    print(" ", u)
