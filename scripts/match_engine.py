import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load all 4 URL lists
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

def clean_tokens(text):
    text = re.sub(r'[^\w\s]', ' ', text.lower())
    stop = {'the', 'and', 'for', 'in', 'of', 'a', 'an', 'to', 'its', 'part', 'with', 'chapter', 'unit', 'topic', 'solutions', 'solution', 'dav', 'class'}
    return [t for t in text.split() if len(t) >= 3 and t not in stop]

def match_onlinehindi(grade, subj_id, num, title):
    g_rom = ROMAN_MAP.get(str(grade), '')
    g_str = str(grade)
    tokens = clean_tokens(title)
    
    candidates = []
    for u in oh_urls:
        ul = u.lower()
        # Strict grade boundary check:
        # If g_rom is 'vi', it must NOT match 'vii' or 'viii'!
        # If g_rom is 'vii', it must NOT match 'viii'!
        # If g_rom is 'v', it must NOT match 'vi', 'vii', 'viii'!
        grade_ok = False
        if g_rom:
            pattern = rf'class[_\-]{g_rom}(?:[_\-]|$|\.|\/)'
            if re.search(pattern, ul):
                grade_ok = True
        if not grade_ok:
            if re.search(rf'class[_\-]{g_str}(?:[_\-]|$|\.|\/)', ul):
                grade_ok = True
            
        if not grade_ok:
            continue
            
        score = 0
        # Chapter num match
        if re.search(rf'chapter[_\-]*{num}(?:[_\-]|$|\.|\/)', ul) or re.search(rf'[_\-]{num}[_\-]', ul):
            score += 25
            
        # Title tokens match
        for tok in tokens:
            if tok in ul:
                score += 8
                
        if score > 0:
            candidates.append((score, u))
            
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

def get_subj_keywords(subj_id):
    s = subj_id.lower()
    if 'sci' in s: return ['science', 'living-world']
    if 'math' in s: return ['math', 'maths', 'mathematics']
    if 'sst' in s or 'evs' in s: return ['sst', 'social-science', 'we-and-our-world', 'social']
    if 'lit' in s: return ['english-literature', 'literature']
    if 'reader' in s: return ['english-reader', 'reader']
    if 'prac' in s: return ['english-practice', 'practice']
    if s == 'eng8' or s == 'eng1': return ['english']
    if 'hin' in s: return ['hindi', 'gyan-sagar', 'abhyas-sagar', 'bhasha-madhuri', 'bhasha-abhyas', 'shabd-abhyas']
    if 'sans' in s: return ['sanskrit', 'surabhi', 'surbhi']
    if 'naitik' in s: return ['naitik', 'moral-science', 'moral']
    if 'comp' in s: return ['computer', 'hands-on']
    if 'gk' in s: return ['kid-wiz', 'gk', 'general-knowledge']
    return []

def match_portal(url_list, grade, subj_id, num, title, portal_name):
    g_str = str(grade)
    g_match = f'class-{g_str}'
    subj_kws = get_subj_keywords(subj_id)
    tokens = clean_tokens(title)
    
    candidates = []
    for u in url_list:
        ul = u.lower()
        if g_match not in ul and f'class{g_str}' not in ul and f'std-{g_str}' not in ul:
            continue
            
        score = 0
        # Subject match
        subj_match = any(kw in ul for kw in subj_kws)
        if not subj_match:
            # Check if any specific title token is unique to this subject
            token_hits = sum(1 for tok in tokens if tok in ul)
            if token_hits < 2:
                continue
            score += token_hits * 3
        else:
            score += 15
            
        # Distinguish between Literature, Reader, Practice Book in English
        if 'lit' in subj_id:
            if 'literature' in ul: score += 15
            elif 'practice' in ul or 'reader' in ul: score -= 25
        elif 'reader' in subj_id:
            if 'reader' in ul: score += 15
            elif 'literature' in ul or 'practice' in ul: score -= 25
        elif 'prac' in subj_id:
            if 'practice' in ul: score += 15
            elif 'literature' in ul or 'reader' in ul: score -= 25
            
        # Distinguish between Moral Science / Naitik and pure Science
        if 'sci' in subj_id and 'moral' not in subj_id:
            if 'moral' in ul or 'naitik' in ul:
                score -= 30
        elif 'naitik' in subj_id:
            if 'moral' in ul or 'naitik' in ul:
                score += 20

        # Chapter num match
        if re.search(rf'chapter[_\-]*{num}(?:[_\-]|$|\.|\/)', ul) or re.search(rf'unit[_\-]*{num}(?:[_\-]|$|\.|\/)', ul):
            score += 25
        elif re.search(rf'[_\-]{num}[_\-]', ul) or re.search(rf'[_\-]{num}\/', ul):
            score += 10
            
        # Title tokens match
        for tok in tokens:
            if tok in ul:
                score += 8
                
        # Worksheet match (for math on learncram)
        if 'math' in subj_id and 'worksheet-1' in ul:
            score += 5
            
        if score >= 20:
            candidates.append((score, u))
            
    if candidates:
        candidates.sort(key=lambda x: x[0], reverse=True)
        return candidates[0][1]
    return ''

print("Match engine with strict Roman and English book isolation updated.")
