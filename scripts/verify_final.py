import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/davChapters.js', 'r', encoding='utf-8') as f:
    content = f.read()

data = json.loads(content.split('export const DAV_CHAPTERS = ')[1].split(';\n\n// Hub URLs')[0])

print('=== 1. Class 6 Science (sci6) Chapters ===')
sci6 = data['6']['sci6']
print(f'Total chapters: {len(sci6)}')
for c in sci6:
    print(f"  Ch {c['number']}: {c['title']}")

print('\n=== 2. Class 6 SST (sst6) Chapters ===')
sst6 = data['6']['sst6']
print(f'Total chapters: {len(sst6)}')
for c in sst6[-4:]:
    print(f"  Ch {c['number']}: {c['title']}")

print('\n=== 3. Class 8 Science Ch 11 ===')
sci8_11 = [c for c in data['8']['sci8'] if c['number'] == 11][0]
print('Title:', sci8_11['title'])
print('Solution Gyan:', sci8_11['solutionGyanUrl'])
print('Learn Cram:', sci8_11['learnCramUrl'])

print('\n=== 4. Class 8 Maths Ch 6 ===')
math8_6 = [c for c in data['8']['math8'] if c['number'] == 6][0]
print('Title:', math8_6['title'])
print('Solution Gyan:', math8_6['solutionGyanUrl'])
print('Learn Cram:', math8_6['learnCramUrl'])

print('\n=== 5. Class 8 Hindi Ch 1, 16, 20 ===')
hin8 = data['8']['hin8']
for num in [1, 16, 20]:
    c = [x for x in hin8 if x['number'] == num][0]
    print(f"Ch {num} {c['title']}: {c['onlineHindiUrl']}")

print('\n=== 6. Class 5 Hindi Ch 16 ===')
hin5 = data['5']['hin5_bm']
c5_16 = [x for x in hin5 if x['number'] == 16][0]
print(f"Ch 16 {c5_16['title']}: {c5_16['onlineHindiUrl']}")
