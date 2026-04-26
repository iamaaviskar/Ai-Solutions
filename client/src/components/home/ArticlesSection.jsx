import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ARTICLES as ALL_ARTICLES } from "../../data/articles";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ARTICLES = ALL_ARTICLES.filter((a) => a.featured);

function CategoryBadge({ category }) {
  return (
    <Badge
      variant="outline"
      className="uppercase tracking-wider text-[10px] font-semibold text-amber-600 border-amber-100 bg-amber-50"
    >
      {category}
    </Badge>
  );
}

export default function ArticlesSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
              Articles
            </p>
            <h2 className="text-4xl font-bold text-[#0C0C0C] tracking-tight">
              Insights from the frontier.
            </h2>
          </div>

          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            View all articles <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              state={{ from: "/articles" }}
              className="group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-amber-300">
                <CardHeader className="space-y-3">
                  <CategoryBadge category={article.category} />

                  <h3 className="font-semibold text-[0.95rem] leading-snug text-[#0C0C0C] group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h3>
                </CardHeader>

                <CardContent className="text-sm text-slate-500">
                  {article.excerpt}
                </CardContent>

                <CardFooter className="flex justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
