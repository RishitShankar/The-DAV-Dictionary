import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/davChapters.js', 'r', encoding='utf-8') as f:
    content = f.read()

json_part = content.split('export const DAV_CHAPTERS = ')[1].split(';\n\n// Hub URLs')[0]
data = json.loads(json_part)

cases = [
    ('6', 'eng6_lit', 10),
    ('6', 'eng6_prac', 10),
    ('3', 'hin3_bm', 4),
    ('3', 'hin3_ba', 4),
    ('8', 'math8', 6),
    ('8', 'sci8', 11),
    ('6', 'sci6', 1),
    ('7', 'sst7', 1),
    ('5', 'sci5', 1),
    ('4', 'sci4', 1)
]

for g, s, num in cases:
    chaps = data.get(g, {}).get(s, [])
    match = next((c for c in chaps if c['number'] == num), None)
    if match:
        print(f"=== Class {g} {s} Ch {num}: {match['title']} ===")
        print("  SG:", match.get('solutionGyanUrl'))
        print("  LC:", match.get('learnCramUrl'))
        print("  NC:", match.get('ncertUrl'))
        print("  OH:", match.get('onlineHindiUrl'))
    else:
        print(f"NOT FOUND: Class {g} {s} Ch {num}")
