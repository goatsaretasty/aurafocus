const STOPWORDS = new Set(
  `a about above after again against all am an and any are aren't as at be because been
   before being below between both but by can cannot could couldn't did didn't do does
   doesn't doing don't down during each few for from further had hadn't has hasn't have
   haven't having he he'd he'll he's her here here's hers herself him himself his how
   how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most
   mustn't my myself no nor not of off on once only or other ought our ours ourselves
   out over own same shan't she she'd she'll she's should shouldn't so some such than
   that that's the their theirs them themselves then there there's these they they'd
   they'll they're they've this those through to too under until up very was wasn't we
   we'd we'll we're we've were weren't what what's when when's where where's which while
   who who's whom why why's with won't would wouldn't you you'd you'll you're you've
   your yours yourself yourselves just really like get got going still even much many
   thing things way back one two also every always never`
    .trim()
    .split(/\s+/)
)

export type WordCount = { word: string; count: number }

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .split(/[^a-z0-9']+/)
    .map((word) => word.replace(/^'+|'+$/g, ''))
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
}

export function topWords(texts: string[], limit = 18): WordCount[] {
  const counts = new Map<string, number>()
  for (const text of texts) {
    for (const word of tokenize(text)) {
      counts.set(word, (counts.get(word) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit)
}
