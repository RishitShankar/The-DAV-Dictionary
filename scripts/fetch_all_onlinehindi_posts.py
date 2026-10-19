import urllib.request
import xml.etree.ElementTree as ET
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

all_posts = []

start_idx = 1
while True:
    url = f"https://www.onlinehindi.in/atom.xml?redirect=false&start-index={start_idx}&max-results=500"
    print(f"Fetching {url}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            xml_data = r.read().decode('utf-8')
            root = ET.fromstring(xml_data)
            entries = root.findall('{http://www.w3.org/2005/Atom}entry')
            if not entries:
                break
            for entry in entries:
                title_elem = entry.find('{http://www.w3.org/2005/Atom}title')
                title = title_elem.text.strip() if title_elem is not None and title_elem.text else ''
                link_elem = entry.find("{http://www.w3.org/2005/Atom}link[@rel='alternate']")
                link = link_elem.attrib.get('href', '') if link_elem is not None else ''
                all_posts.append({'title': title, 'url': link})
            print(f"  Got {len(entries)} entries, total so far: {len(all_posts)}")
            if len(entries) < 500:
                break
            start_idx += 500
    except Exception as e:
        print(f"Error fetching atom feed at start-index={start_idx}: {e}")
        break

print(f"Total posts extracted from Online Hindi: {len(all_posts)}")
with open('scripts/all_onlinehindi_posts.json', 'w', encoding='utf-8') as f:
    json.dump(all_posts, f, indent=2, ensure_ascii=False)
