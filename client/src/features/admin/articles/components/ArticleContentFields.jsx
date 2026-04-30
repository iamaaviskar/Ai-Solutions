import { EditorContent } from "@tiptap/react";
import { slugify } from "../utils/articleForm";
import ArticleToolbar from "./ArticleToolbar";

export default function ArticleContentFields({
  editor,
  form,
  onTitleChange,
  setField,
  setSlugEdited,
}) {
  return (
    <div className="lg:col-span-2 space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Title *
        </label>
        <input
          required
          value={form.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Article title"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Slug *
        </label>
        <input
          required
          value={form.slug}
          onChange={(e) => {
            setSlugEdited(true);
            setField("slug", slugify(e.target.value));
          }}
          placeholder="article-url-slug"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
        <p className="mt-1 text-xs text-slate-400">
          /articles/{form.slug || "..."}
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Excerpt
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setField("excerpt", e.target.value)}
          rows={3}
          placeholder="Short summary shown in article cards"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Body
        </label>
        <div className="rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:border-amber-500 transition-colors">
          <ArticleToolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="px-4 py-3 min-h-[280px] text-sm text-slate-800 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:text-inherit [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-4 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-base [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mt-3 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
