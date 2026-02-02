import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
};

const rawModules = import.meta.glob("./blog/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function slugFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.md$/, "");
}

function getRawContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "default" in value) return String((value as { default: unknown }).default);
  return "";
}

const parsed = Object.entries(rawModules).map(([path, raw]) => {
  const rawString = getRawContent(raw);
  const { data, content } = matter(rawString);
  const fm = data as Frontmatter;
  return {
    slug: slugFromPath(path),
    title: fm.title ?? "Untitled",
    date: fm.date ?? "",
    excerpt: fm.excerpt ?? "",
    body: content
  };
});

export const blogPosts: BlogPost[] = [...parsed].sort((a, b) => (b.date.localeCompare(a.date)));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
