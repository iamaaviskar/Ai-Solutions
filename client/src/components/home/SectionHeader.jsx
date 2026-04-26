export function SectionHeader({ label, title, description, action, light }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
      <div>
        {label && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-amber-500" />
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${
                light ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {label}
            </span>
          </div>
        )}

        <h2
          className={`text-4xl sm:text-5xl font-bold tracking-tight ${
            light ? "text-white" : "text-[#0C0C0C]"
          }`}
        >
          {title}
        </h2>

        {description && (
          <p className={`mt-4 ${light ? "text-slate-400" : "text-slate-600"}`}>
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
