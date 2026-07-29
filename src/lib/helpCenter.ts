import data from "@/data/helpCenter.json";

export type HelpArticle = { slug: string; title: string; body: string };
export type HelpFaq = { q: string; a: string };
export type HelpSection = {
  slug: string;
  title: string;
  summary?: string;
  status?: string;
  articles?: HelpArticle[];
  faqs?: HelpFaq[];
};

export const helpMeta = (data as { meta: { title: string; version?: string } }).meta;
export const sections = (data as unknown as { sections: HelpSection[] }).sections;

export const SUPPORT_EMAIL = "highfrequencyhighway@gmail.com";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const getSection = (slug?: string) => sections.find((s) => s.slug === slug);

/** True when copy is about orders, tracking, shipping, delivery or returns. */
const ORDER_TERMS =
  /\b(order|orders|tracking|track|shipping|shipment|shipped|delivery|deliver|dispatch|courier|carrier|parcel|package|refund|return|returns|customs|fulfil)/i;

export const mentionsOrders = (...parts: (string | undefined)[]) =>
  ORDER_TERMS.test(parts.filter(Boolean).join(" "));

export const getArticle = (sectionSlug?: string, articleSlug?: string) => {
  const section = getSection(sectionSlug);
  const article = section?.articles?.find((a) => a.slug === articleSlug);
  return { section, article };
};

/** Flattened article order across all sections, for prev/next navigation. */
export const flatArticles = sections.flatMap((s) =>
  (s.articles ?? []).map((a) => ({ section: s, article: a }))
);

export type SearchHit = {
  sectionSlug: string;
  sectionTitle: string;
  title: string;
  href: string;
  text: string;
  score: number;
};

type IndexEntry = Omit<SearchHit, "score">;

export const searchIndex: IndexEntry[] = [
  ...sections.flatMap((s) =>
    (s.articles ?? []).map((a) => ({
      sectionSlug: s.slug,
      sectionTitle: s.title,
      title: a.title,
      href: `/help/${s.slug}/${a.slug}`,
      text: a.body,
    }))
  ),
  ...sections.flatMap((s) =>
    (s.faqs ?? []).map((f) => ({
      sectionSlug: s.slug,
      sectionTitle: s.title,
      title: f.q,
      href: `/help/${s.slug}#${slugify(f.q)}`,
      text: f.a,
    }))
  ),
];

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ");

export function searchHelp(query: string, limit = 40): SearchHit[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(" ").filter(Boolean);

  const hits: SearchHit[] = [];
  for (const entry of searchIndex) {
    const title = norm(entry.title);
    const text = norm(entry.text);
    let score = 0;
    let matched = 0;
    for (const t of terms) {
      let termScore = 0;
      if (title.includes(t)) termScore += 8;
      const occurrences = text.split(t).length - 1;
      if (occurrences > 0) termScore += Math.min(occurrences, 4);
      if (termScore === 0) {
        // loose fuzzy: allow a prefix match of at least 4 chars
        if (t.length > 4 && (title.includes(t.slice(0, 4)) || text.includes(t.slice(0, 4)))) {
          termScore += 1;
        }
      }
      if (termScore > 0) matched += 1;
      score += termScore;
    }
    if (matched === terms.length && score > 0) hits.push({ ...entry, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Returns a short snippet of text around the first matched term. */
export function snippet(text: string, query: string, length = 180) {
  const terms = norm(query).split(" ").filter(Boolean);
  const lower = norm(text);
  let idx = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (idx === -1 || i < idx)) idx = i;
  }
  const start = idx === -1 ? 0 : Math.max(0, idx - 60);
  const raw = text.replace(/[*#>`]/g, "").slice(start, start + length).trim();
  return (start > 0 ? "…" : "") + raw + (start + length < text.length ? "…" : "");
}

export function highlight(text: string, query: string) {
  const terms = norm(query).split(" ").filter((t) => t.length > 1);
  if (!terms.length) return [{ text, match: false }];
  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return text
    .split(pattern)
    .filter((p) => p !== "")
    .map((part) => ({ text: part, match: terms.includes(norm(part)) }));
}
