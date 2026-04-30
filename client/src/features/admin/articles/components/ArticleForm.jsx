import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";
import api from "@/services/api";
import { createArticleFormState, slugify } from "../utils/articleForm";
import ArticleContentFields from "./ArticleContentFields";
import ArticleMetadataFields from "./ArticleMetadataFields";

export default function ArticleForm({ article, onSave, onCancel }) {
  const isEdit = !!article;
  const [form, setForm] = useState(() => createArticleFormState(article));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(isEdit);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your article body here..." }),
    ],
    content: article?.body ?? "",
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(article?.body ?? "");
  }, [article?.id, article?.body, editor]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

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
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <ArticleContentFields
          editor={editor}
          form={form}
          onTitleChange={handleTitleChange}
          setField={set}
          setSlugEdited={setSlugEdited}
        />
        <ArticleMetadataFields form={form} setField={set} />
      </div>
    </form>
  );
}
