import { CATEGORIES } from "../constants";

export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createArticleFormState(article) {
  return {
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? CATEGORIES[0],
    excerpt: article?.excerpt ?? "",
    author: article?.author ?? "",
    author_role: article?.author_role ?? "",
    read_time: article?.read_time ?? "",
    featured: article?.featured ?? false,
    status: article?.status ?? "draft",
  };
}
