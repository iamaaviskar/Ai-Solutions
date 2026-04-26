import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

function BodyBlock({ block }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-10 mb-4 text-xl font-bold text-[#0C0C0C] tracking-tight">
        {block.text}
      </h2>
    );
  }
  return (
    <p className="mb-5 text-slate-600 leading-relaxed text-[1.0625rem]">
      {block.text}
    </p>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-[#0C0C0C] mb-3">
          Article not found
        </h1>
        <p className="text-slate-500 mb-8">
          This article doesn't exist or may have been moved.
        </p>
        <Button
          asChild
          className="bg-amber-500 hover:bg-amber-400 text-white gap-2"
        >
          <Link to="/articles">
            <ArrowLeft size={15} /> Back to articles
          </Link>
        </Button>
      </div>
    );
  }

  const related = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category,
  ).slice(0, 2);
  const relatedArticles =
    related.length >= 1
      ? related
      : ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/articles")}
          className="mb-10 gap-2 text-slate-500 hover:text-amber-600 group pl-0"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to articles
        </Button>

        <div className="max-w-3xl mx-auto">
          {/* Article header */}
          <div className="mb-10">
            <CategoryBadge category={article.category} />
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0C0C0C] tracking-tight leading-snug">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta row */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User size={13} />
                <span className="font-medium text-slate-600">
                  {article.author}
                </span>
                <span className="hidden sm:inline">— {article.authorRole}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-amber-400 via-amber-200 to-transparent mb-10" />

          {/* Article body */}
          <div>
            {article.body.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>

          {/* End divider */}
          <div className="mt-12 h-px bg-slate-100" />

          {/* Author card */}
          <Card className="mt-8 bg-slate-50 border-slate-100">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">
                {article.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-[#0C0C0C] text-sm">
                  {article.author}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {article.authorRole}
                </p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Part of the AI-Solutions team based in Sunderland, working to
                  make the digital employee experience better for organisations
                  across the UK and beyond.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
                More to read
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`}>
                  <Card className="group h-full hover:border-amber-300 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6 flex flex-col h-full">
                      <CategoryBadge category={a.category} />
                      <h3 className="mt-3 font-semibold text-[#0C0C0C] text-sm leading-snug group-hover:text-amber-600 transition-colors flex-1">
                        {a.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
                        <span>{a.date}</span>
                        <span className="flex items-center gap-1 text-amber-600 font-semibold group-hover:gap-1.5 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-linear-to-br from-[#0C0C0C] to-amber-500 p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Want to see this in practice for your organisation?
          </h2>
          <p className="mt-3 text-blue-100 leading-relaxed">
            Get in touch and we'll scope a working prototype your team can
            evaluate in weeks, not months.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-5 bg-white text-amber-500 hover:bg-amber-50"
          >
            <Link to="/contact" className="gap-2 text-sm">
              Start a conversation <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
