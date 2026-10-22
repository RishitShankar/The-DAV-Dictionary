async function searchYouTube(q) {
  const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' } });
  const html = await res.text();
  const match = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]);
    const contents = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents;
    if (!contents) return [];
    const items = [];
    for (const c of contents) {
      const renderers = c?.itemSectionRenderer?.contents;
      if (renderers) {
        for (const r of renderers) {
          if (r.videoRenderer) {
            const v = r.videoRenderer;
            items.push({
              vid: v.videoId,
              title: v.title?.runs?.map(x => x.text).join('') || '',
              author: v.ownerText?.runs?.map(x => x.text).join('') || ''
            });
          }
        }
      }
    }
    return items;
  } catch (e) {
    return [];
  }
}

async function run() {
  const queries = [
    'EduMagnet DAV Class 8 SST Chapter 8 The Modern Period',
    'BrijBala Education DAV Class 8 SST Chapter 8 The Modern Period',
    'EduMagnet DAV Class 8 Sanskrit Chapter 1 सुवचनानि',
    'Vinod Kumar Pandit DAV Class 8 English Practice Book Unit 1 Tenses'
  ];
  for (const q of queries) {
    const results = await searchYouTube(q);
    console.log('\n--- Query: ' + q + ' ---');
    results.slice(0, 3).forEach(r => console.log(`[${r.vid}] ${r.author} -> ${r.title}`));
  }
}
run();
