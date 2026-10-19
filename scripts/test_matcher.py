import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/actual_dav_learncram_urls.json', 'r', encoding='utf-8') as f:
    lc_urls = json.load(f)

with open('scripts/actual_dav_solutiongyan_urls.json', 'r', encoding='utf-8') as f:
    sg_urls = json.load(f)

with open('scripts/all_ncertbookspdf_dav_urls.json', 'r', encoding='utf-8') as f:
    ncert_urls = json.load(f)

with open('scripts/all_onlinehindi_urls.json', 'r', encoding='utf-8') as f:
    oh_urls = json.load(f)

ROMAN_MAP = {
    '8': 'viii', '7': 'vii', '6': 'vi', '5': 'v', '4': 'iv', '3': 'iii', '2': 'ii', '1': 'i'
}

def clean_slug(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def match_onlinehindi(grade, subj_id, num, title):
    g_rom = ROMAN_MAP.get(str(grade), '')
    candidates = []
    t_clean = clean_slug(title)
    
    for u in oh_urls:
        ul = u.lower()
        # Check grade
        if g_rom and (f'class-{g_rom}' in ul or f'class{g_rom}' in ul or f'class-{grade}' in ul):
            # Check chapter num
            if f'chapter-{num}' in ul or f'chapter{num}' in ul or f'ch-{num}' in ul or f'-{num}-' in ul:
                candidates.append((3, u))
            elif t_clean and any(w in ul for w in title.lower().split() if len(w) > 4):
                candidates.append((2, u))
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

def match_learncram(grade, subj_id, num, title):
    g = str(grade)
    g_match = f'class-{g}'
    subj_tokens = []
    if 'sci' in subj_id: subj_tokens = ['science']
    elif 'math' in subj_id: subj_tokens = ['math', 'maths']
    elif 'sst' in subj_id or 'evs' in subj_id: subj_tokens = ['sst', 'social']
    elif 'lit' in subj_id or subj_id == 'eng8' or subj_id == 'eng7_lit' or subj_id == 'eng6_lit': subj_tokens = ['english-literature', 'english']
    elif 'reader' in subj_id: subj_tokens = ['reader']
    elif 'prac' in subj_id: subj_tokens = ['practice']
    elif 'hin' in subj_id: subj_tokens = ['hindi']
    elif 'sans' in subj_id: subj_tokens = ['sanskrit']
    
    candidates = []
    for u in lc_urls:
        ul = u.lower()
        if g_match in ul:
            # Check subject
            if any(st in ul for st in subj_tokens):
                # Check chapter
                if f'chapter-{num}-' in ul or f'chapter-{num}/' in ul or f'chapter{num}' in ul:
                    candidates.append((3, u))
                elif f'-{num}-' in ul:
                    candidates.append((2, u))
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

def match_solutiongyan(grade, subj_id, num, title):
    g = str(grade)
    g_match = f'class-{g}'
    subj_tokens = []
    if 'sci' in subj_id: subj_tokens = ['science']
    elif 'math' in subj_id: subj_tokens = ['math', 'maths']
    elif 'sst' in subj_id or 'evs' in subj_id: subj_tokens = ['sst', 'social']
    elif 'lit' in subj_id or subj_id == 'eng8' or subj_id == 'eng7_lit' or subj_id == 'eng6_lit': subj_tokens = ['english-literature', 'english']
    elif 'reader' in subj_id: subj_tokens = ['reader']
    elif 'prac' in subj_id: subj_tokens = ['practice']
    elif 'hin' in subj_id: subj_tokens = ['hindi']
    elif 'sans' in subj_id: subj_tokens = ['sanskrit']
    
    candidates = []
    for u in sg_urls:
        ul = u.lower()
        if g_match in ul or (g == '6' and 'class-6' in ul) or (g == '7' and 'class-7' in ul) or (g == '8' and 'class-8' in ul):
            if any(st in ul for st in subj_tokens):
                if f'chapter-{num}-' in ul or f'chapter-{num}/' in ul or f'chapter{num}' in ul:
                    candidates.append((3, u))
                elif any(w in ul for w in title.lower().split() if len(w) > 4):
                    candidates.append((2, u))
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

def match_ncert(grade, subj_id, num, title):
    g = str(grade)
    g_match = f'class-{g}'
    subj_tokens = []
    if 'sci' in subj_id: subj_tokens = ['science']
    elif 'math' in subj_id: subj_tokens = ['math', 'maths']
    elif 'sst' in subj_id or 'evs' in subj_id: subj_tokens = ['sst', 'social']
    elif 'lit' in subj_id or subj_id == 'eng8' or subj_id == 'eng7_lit' or subj_id == 'eng6_lit': subj_tokens = ['english-literature', 'english']
    elif 'reader' in subj_id: subj_tokens = ['reader']
    elif 'prac' in subj_id: subj_tokens = ['practice']
    elif 'hin' in subj_id: subj_tokens = ['hindi']
    elif 'sans' in subj_id: subj_tokens = ['sanskrit']
    
    candidates = []
    for u in ncert_urls:
        ul = u.lower()
        if g_match in ul:
            if any(st in ul for st in subj_tokens):
                if f'chapter-{num}-' in ul or f'chapter-{num}/' in ul or f'chapter{num}' in ul:
                    candidates.append((3, u))
                elif any(w in ul for w in title.lower().split() if len(w) > 4):
                    candidates.append((2, u))
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

# Test on Class 6 English Ch 10 Attila
print("Test Class 6 English Literature Ch 10:")
print("  SG:", match_solutiongyan(6, 'eng6_lit', 10, 'Attila'))
print("  LC:", match_learncram(6, 'eng6_lit', 10, 'Attila'))
print("  NCERT:", match_ncert(6, 'eng6_lit', 10, 'Attila'))

# Test on Class 3 Hindi Ch 4
print("\nTest Class 3 Hindi Ch 4:")
print("  OH:", match_onlinehindi(3, 'hin3_bm', 4, 'चींटी ने पाठ पढ़ाया'))
print("  LC:", match_learncram(3, 'hin3_bm', 4, 'चींटी ने पाठ पढ़ाया'))
print("  NCERT:", match_ncert(3, 'hin3_bm', 4, 'चींटी ने पाठ पढ़ाया'))
