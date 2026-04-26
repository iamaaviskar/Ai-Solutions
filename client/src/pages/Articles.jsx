import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(ARTICLES.map((a) => a.category))),
];

const CATEGORY_STYLES = {
  Insights: "bg-blue-50 text-blue-600 border-blue-100",
  Product: "bg-violet-50 text-violet-600 border-violet-100",
  Industry: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Engineering: "bg-slate-100 text-slate-600 border-slate-200",
  "Case Study": "bg-amber-50 text-amber-600 border-amber-100",
};

function CategoryBadge({ category }) {
  const style =
    CATEGORY_STYLES[category] ?? "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <Badge
      variant="outline"
      className={`uppercase tracking-wider text-[10px] font-semibold ${style}`}
    >
      {category}
    </Badge>
  );
}

function FeaturedArticleCard({ article }) {
  const { slug, category, title, excerpt, date, readTime } = article;
  return (
    <Link to={`/articles/${slug}`}>
      <Card className="group relative hover:border-amber-300 hover:shadow-lg transition-all duration-300">
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CategoryBadge category={category} />
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 border-amber-200 bg-amber-50"
                >
                  Featured
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0C0C0C] leading-snug mb-3 group-hover:text-amber-700 transition-colors">
                {title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {excerpt}
              </p>
            </div>
            <div className="flex items-center gap-5 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {readTime}
              </span>
              <span className="ml-auto flex items-center gap-1 text-amber-600 font-semibold text-xs group-hover:gap-2 transition-all">
                Read article <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ArticleCard({ article }) {
  const { slug, category, title, excerpt, date, readTime } = article;
  return (
    <Link to={`/articles/${slug}`}>
      <Card className="group h-full hover:border-amber-300 hover:shadow-md transition-all duration-200">
        <CardContent className="p-6 flex flex-col h-full">
          <CategoryBadge category={category} />
          <h3 className="mt-3 font-semibold text-[#0C0C0C] text-[0.95rem] leading-snug mb-3 group-hover:text-amber-600 transition-colors flex-1">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">{excerpt}</p>
          <div className="flex items-center justify-between mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = ARTICLES.filter((a) => a.featured);
  const filteredFeatured =
    activeCategory === "All"
      ? featured
      : featured.filter((a) => a.category === activeCategory);

  const rest = ARTICLES.filter((a) => !a.featured);
  const filteredRest =
    activeCategory === "All"
      ? rest
      : rest.filter((a) => a.category === activeCategory);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="max-w-3xl mb-14">
          <Badge
            variant="secondary"
            className="uppercase tracking-wide text-xs text-amber-600 bg-amber-50 border-amber-100 mb-4"
          >
            Articles
          </Badge>
          <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-[#0C0C0C]">
            Insights from the frontier.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Thinking on AI, digital employee experience, and the future of work
            — from the team building it.
          </p>
        </div>

        {/* Category filter  */}
        <div className="relative mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ALL_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 hover:bg-amber-400 text-white border-amber-500"
                    : "text-slate-600 hover:text-amber-600 hover:border-amber-300"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
          {/* Fade-out hint on mobile to indicate scrollability */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent sm:hidden" />
        </div>
        {/* Featured articles */}
        {filteredFeatured.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
                Featured
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {filteredFeatured.map((article) => (
                <FeaturedArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* All other articles */}
        {filteredRest.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
                {activeCategory === "All" ? "More articles" : activeCategory}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {filteredFeatured.length === 0 && filteredRest.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">
              No articles in this category yet.
            </p>
            <Button
              variant="link"
              className="mt-2 text-amber-600"
              onClick={() => setActiveCategory("All")}
            >
              View all articles
            </Button>
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-20 rounded-3xl bg-linear-to-br from-[#0C0C0C] to-amber-500 p-10 sm:p-14 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to explore what AI can do for your team?
            </h2>
            <p className="mt-4 text-blue-100 text-lg leading-relaxed">
              Get in touch and we'll scope a working prototype your stakeholders
              can evaluate in weeks, not months.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 bg-white text-amber-500 hover:bg-amber-50"
            >
              <Link to="/contact" className="gap-2">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
