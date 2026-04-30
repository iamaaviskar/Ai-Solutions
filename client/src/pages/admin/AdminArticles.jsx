import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Plus,
  ArrowLeft,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  Heading3,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import api from "../../services/api";

const CATEGORIES = [
  "Insights",
  "Product",
  "Industry",
  "Engineering",
  "Case Study",
];

const STATUS_STYLES = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-slate-100 text-slate-600 border-slate-200",
};

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Tiptap toolbar ───────────────────────────────────────────
function Toolbar({ editor }) {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  const btn = (active, onClick, title, children) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active ? "bg-amber-500 text-black" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
      {btn(
        editor.isActive("bold"),
        () => editor.chain().focus().toggleBold().run(),
        "Bold",
        <Bold size={15} />,
      )}
      {btn(
        editor.isActive("italic"),
        () => editor.chain().focus().toggleItalic().run(),
        "Italic",
        <Italic size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(
        editor.isActive("heading", { level: 2 }),
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        "Heading 2",
        <Heading2 size={15} />,
      )}
      {btn(
        editor.isActive("heading", { level: 3 }),
        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        "Heading 3",
        <Heading3 size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(
        editor.isActive("bulletList"),
        () => editor.chain().focus().toggleBulletList().run(),
        "Bullet list",
        <List size={15} />,
      )}
      {btn(
        editor.isActive("orderedList"),
        () => editor.chain().focus().toggleOrderedList().run(),
        "Ordered list",
        <ListOrdered size={15} />,
      )}
      <div className="w-px bg-slate-200 mx-1" />
      {btn(editor.isActive("link"), setLink, "Link", <LinkIcon size={15} />)}
    </div>
  );
}

// ── Article form (create + edit) ─────────────────────────────
function ArticleForm({ article, onSave, onCancel }) {
  const isEdit = !!article;

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? CATEGORIES[0],
    excerpt: article?.excerpt ?? "",
    author: article?.author ?? "",
    author_role: article?.author_role ?? "",
    read_time: article?.read_time ?? "",
    featured: article?.featured ?? false,
    status: article?.status ?? "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(isEdit);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your article body here…" }),
    ],
    content: article?.body ?? "",
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(article?.body ?? "");
  }, [article?.id, article?.body, editor]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // Auto-generate slug from title unless manually edited
  const handleTitleChange = (v) => {
    set("title", v);
    if (!slugEdited) set("slug", slugify(v));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...form, body: editor?.getHTML() ?? "" };
      if (isEdit) {
        await api.put(`/admin/articles/${article.id}`, payload);
      } else {
        await api.post("/admin/articles", payload);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#0C0C0C]">
              {isEdit ? "Edit Article" : "New Article"}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isEdit ? `Editing: ${article.title}` : "Create a new article"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Draft / Published toggle */}
          <button
            type="button"
            onClick={() =>
              set("status", form.status === "published" ? "draft" : "published")
            }
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
              form.status === "published"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {form.status === "published" ? (
              <Eye size={15} />
            ) : (
              <EyeOff size={15} />
            )}
            {form.status === "published" ? "Published" : "Draft"}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Title *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Article title"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Slug *
            </label>
            <input
              required
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", slugify(e.target.value));
              }}
              placeholder="article-url-slug"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
            <p className="mt-1 text-xs text-slate-400">
              /articles/{form.slug || "…"}
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              placeholder="Short summary shown in article cards"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Body editor */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Body
            </label>
            <div className="rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-500 transition-colors">
              <Toolbar editor={editor} />
              <EditorContent
                editor={editor}
                className="px-4 py-3 min-h-[280px] text-sm text-slate-800 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:text-inherit [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-4 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-base [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mt-3 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Right — metadata */}
        <div className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Category *
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Author
            </label>
            <input
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              placeholder="e.g. Sarah Mitchell"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Author role */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Author Role
            </label>
            <input
              value={form.author_role}
              onChange={(e) => set("author_role", e.target.value)}
              placeholder="e.g. Head of Insights, AI-Solutions"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Read time */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
              Read Time
            </label>
            <input
              value={form.read_time}
              onChange={(e) => set("read_time", e.target.value)}
              placeholder="e.g. 5 min read"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
            <div>
              <p className="text-sm font-medium text-[#0C0C0C]">Featured</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Show in featured section
              </p>
            </div>
            <button
              type="button"
              onClick={() => set("featured", !form.featured)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                form.featured ? "bg-amber-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  form.featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Status card */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Status
            </p>
            <div className="flex gap-2">
              {["draft", "published"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    form.status === s
                      ? s === "published"
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

// ── Articles list ────────────────────────────────────────────
export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("list"); // "list" | "create" | "edit"
  const [editing, setEditing] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/articles");
      setArticles(res.data.articles);
      setError("");
    } catch {
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await api.delete(`/admin/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Failed to delete article.");
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = async (id) => {
    setLoadingArticle(id);
    setError("");
    try {
      const res = await api.get(`/admin/articles/${id}`);
      setEditing(res.data.article);
      setView("edit");
    } catch {
      setError("Failed to load article for editing.");
    } finally {
      setLoadingArticle(null);
    }
  };

  const handleSave = () => {
    setView("list");
    setEditing(null);
    load();
  };

  const handleCancel = () => {
    setView("list");
    setEditing(null);
  };

  // ── Editor view
  if (view === "create" || view === "edit") {
    return (
      <ArticleForm
        article={view === "edit" ? editing : null}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  // ── List view
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
          onClick={() => setView("create")}
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
            articles…
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => load()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 mb-4">No articles yet.</p>
            <button
              onClick={() => setView("create")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              <Plus size={16} /> Create your first article
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {articles.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#FAFAF7] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[a.status] ?? ""}`}
                    >
                      {a.status}
                    </Badge>
                    <span className="text-xs text-slate-400">{a.category}</span>
                    {a.featured && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-[#0C0C0C] text-sm truncate">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {a.author && `${a.author} · `}
                    {new Date(a.created_at).toLocaleDateString()}
                    {a.read_time && ` · ${a.read_time}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(a.id)}
                    disabled={loadingArticle === a.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-colors"
                  >
                    {loadingArticle === a.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      "Edit"
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={deleting === a.id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    {deleting === a.id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
