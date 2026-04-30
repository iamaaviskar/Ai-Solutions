import { CATEGORIES } from "../constants";

export default function ArticleMetadataFields({ form, setField }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Category *
        </label>
        <select
          required
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        >
          {CATEGORIES.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Author
        </label>
        <input
          value={form.author}
          onChange={(e) => setField("author", e.target.value)}
          placeholder="e.g. Sarah Mitchell"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Author Role
        </label>
        <input
          value={form.author_role}
          onChange={(e) => setField("author_role", e.target.value)}
          placeholder="e.g. Head of Insights, AI-Solutions"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
          Read Time
        </label>
        <input
          value={form.read_time}
          onChange={(e) => setField("read_time", e.target.value)}
          placeholder="e.g. 5 min read"
          className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
        <div>
          <p className="text-sm font-medium text-[#0C0C0C]">Featured</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Show in featured section
          </p>
        </div>
        <button
          type="button"
          onClick={() => setField("featured", !form.featured)}
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

      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Status
        </p>
        <div className="flex gap-2">
          {["draft", "published"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setField("status", status)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                form.status === status
                  ? status === "published"
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
              }`}
            >
              {status[0].toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
