import { AlertCircle, Loader2, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STATUS_STYLES } from "../constants";

export default function ArticleList({
  articles,
  deleting,
  error,
  loading,
  loadingArticle,
  onCreate,
  onDelete,
  onEdit,
  onRetry,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0C0C0C]">Articles</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage your articles
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        {error && !loading && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {loading ? (
          <div className="p-12 flex items-center justify-center text-slate-500">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading
            articles...
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 mb-4">No articles yet.</p>
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              <Plus size={16} /> Create your first article
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {articles.map((article) => (
              <ArticleListItem
                key={article.id}
                article={article}
                deleting={deleting === article.id}
                loadingArticle={loadingArticle === article.id}
                onDelete={() => onDelete(article.id)}
                onEdit={() => onEdit(article.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ArticleListItem({
  article,
  deleting,
  loadingArticle,
  onDelete,
  onEdit,
}) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#FAFAF7] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[article.status] ?? ""}`}
          >
            {article.status}
          </Badge>
          <span className="text-xs text-slate-400">{article.category}</span>
          {article.featured && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
        <p className="font-semibold text-[#0C0C0C] text-sm truncate">
          {article.title}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {article.author && `${article.author} - `}
          {new Date(article.created_at).toLocaleDateString()}
          {article.read_time && ` - ${article.read_time}`}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onEdit}
          disabled={loadingArticle}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-colors disabled:opacity-60"
        >
          {loadingArticle ? <Loader2 size={14} className="animate-spin" /> : "Edit"}
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          {deleting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </li>
  );
}
