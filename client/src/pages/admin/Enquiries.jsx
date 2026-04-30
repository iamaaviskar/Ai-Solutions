import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Mail,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  Loader2,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  Archive,
  ArchiveRestore,
  Trash2,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import api from "../../services/api";

const STATUS_OPTIONS = ["new", "reviewed", "responded"];
const PAGE_LIMIT = 6;

const STATUS_STYLES = {
  new: "bg-amber-50 text-amber-700 border-amber-200",
  reviewed: "bg-slate-100 text-slate-700 border-slate-200",
  responded: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export default function AdminEnquiries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const statusFilter = STATUS_OPTIONS.includes(searchParams.get("status"))
    ? searchParams.get("status")
    : "";
  const searchQuery = searchParams.get("search") || "";
  const archivedFilter = searchParams.get("archived") === "1";

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(searchQuery);
  const [updatingId, setUpdatingId] = useState(null);
  const [savingNotesId, setSavingNotesId] = useState(null);
  const [archivingId, setArchivingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});
  const [reloadKey, setReloadKey] = useState(0);

  const updateQuery = useCallback((next) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(next).forEach(([key, value]) => {
      if (!value || (key === "page" && value === "1")) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const refreshEnquiries = () => setReloadKey((key) => key + 1);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;
      setSearch(searchQuery);
      setLoading(true);
      setError("");
    });

    api
      .get("/admin/enquiries", {
        params: {
          search: searchQuery,
          status: statusFilter,
          archived: archivedFilter ? "1" : undefined,
          limit: PAGE_LIMIT,
          page,
        },
      })
      .then((res) => {
        if (!active) return;
        setEnquiries(res.data.enquiries);
        setPagination(res.data.pagination);
        setNoteDrafts(
          Object.fromEntries(
            res.data.enquiries.map((i) => [i.id, i.admin_notes ?? ""]),
          ),
        );
        setExpanded(null);
      })
      .catch(() => {
        if (active) setError("Unable to load enquiries.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, searchQuery, statusFilter, archivedFilter, reloadKey]);

  useEffect(() => {
    if (pagination && pagination.pages > 0 && page > pagination.pages) {
      updateQuery({ page: pagination.pages });
    }
  }, [page, pagination, updateQuery]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery({ search: search.trim(), page: 1 });
  };

  const goToPage = (p) => {
    updateQuery({ page: p });
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await api.patch(`/admin/enquiries/${id}/status`, {
        status: newStatus,
      });
      setEnquiries((prev) =>
        prev.map((i) => (i.id === id ? res.data.enquiry : i)),
      );
    } catch {
      setError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const saveNotes = async (id) => {
    setSavingNotesId(id);
    setError("");
    try {
      const res = await api.patch(`/admin/enquiries/${id}`, {
        admin_notes: noteDrafts[id] ?? "",
      });
      setEnquiries((prev) =>
        prev.map((i) => (i.id === id ? res.data.enquiry : i)),
      );
      setNoteDrafts((prev) => ({
        ...prev,
        [id]: res.data.enquiry.admin_notes ?? "",
      }));
    } catch {
      setError("Failed to save notes.");
    } finally {
      setSavingNotesId(null);
    }
  };

  const toggleArchive = async (id, archived) => {
    const action = archived ? "archive" : "restore";
    if (
      !window.confirm(
        archived
          ? "Archive this enquiry? You can restore it from the Archived filter."
          : "Restore this enquiry to the active list?",
      )
    ) {
      return;
    }

    setArchivingId(id);
    setError("");
    try {
      await api.patch(`/admin/enquiries/${id}`, { archived });
      refreshEnquiries();
    } catch {
      setError(`Failed to ${action} enquiry.`);
    } finally {
      setArchivingId(null);
    }
  };

  const deleteEnquiry = async (id) => {
    if (
      !window.confirm(
        "Permanently delete this enquiry? This cannot be undone.",
      )
    ) {
      return;
    }

    setDeletingId(id);
    setError("");
    try {
      await api.delete(`/admin/enquiries/${id}`);
      refreshEnquiries();
    } catch {
      setError("Failed to delete enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0C0C0C]">Enquiries</h1>
        <p className="text-sm text-slate-500 mt-1">
          Contact form submissions from your site
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200">
        {/* Toolbar */}
        <div className="p-4 sm:p-6 flex flex-wrap gap-3 items-center justify-between border-b border-slate-100">
          <form onSubmit={onSearchSubmit} className="flex-1 min-w-60">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or company"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
              />
            </div>
          </form>
          <div className="flex gap-1.5 flex-wrap">
            <FilterChip
              active={!statusFilter && !archivedFilter}
              onClick={() => updateQuery({ status: "", archived: "", page: 1 })}
              label="All"
            />
            {STATUS_OPTIONS.map((s) => (
              <FilterChip
                key={s}
                active={statusFilter === s && !archivedFilter}
                onClick={() =>
                  updateQuery({ status: s, archived: "", page: 1 })
                }
                label={s[0].toUpperCase() + s.slice(1)}
              />
            ))}
            <FilterChip
              active={archivedFilter}
              onClick={() => updateQuery({ status: "", archived: "1", page: 1 })}
              label="Archived"
            />
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <div className="p-12 flex items-center justify-center text-slate-500">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading
            enquiries...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-700">{error}</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No enquiries match your filters.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {enquiries.map((i) => (
              <li
                key={i.id}
                className="p-5 sm:p-6 hover:bg-[#FAFAF7] transition-colors"
              >
                <button
                  onClick={() => setExpanded(expanded === i.id ? null : i.id)}
                  className="w-full text-left"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#0C0C0C]">
                        {i.name}
                        <span className="ml-2 font-normal text-slate-500">
                          {i.company_name}
                        </span>
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {new Date(i.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${STATUS_STYLES[i.status] || ""}`}
                    >
                      {i.status}
                    </Badge>
                  </div>
                </button>

                {expanded === i.id && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm pt-4 border-t border-slate-100">
                    <Field icon={Mail} label="Email" value={i.email} />
                    <Field icon={Phone} label="Phone" value={i.phone} />
                    <Field
                      icon={Building2}
                      label="Company"
                      value={i.company_name}
                    />
                    <Field icon={MapPin} label="Country" value={i.country} />
                    <Field
                      icon={Briefcase}
                      label="Job title"
                      value={i.job_title}
                    />
                    <div className="sm:col-span-2">
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Project details
                      </p>
                      <p className="whitespace-pre-line text-slate-800 leading-relaxed">
                        {i.job_details}
                      </p>
                    </div>
                    <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 mb-2">
                        <StickyNote size={14} className="text-amber-500" />
                        Admin notes
                      </div>
                      <textarea
                        value={noteDrafts[i.id] ?? ""}
                        onChange={(e) =>
                          setNoteDrafts((prev) => ({
                            ...prev,
                            [i.id]: e.target.value,
                          }))
                        }
                        maxLength={5000}
                        placeholder="Add follow-up context, next steps, or owner notes..."
                        className="w-full min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                      />
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="text-xs text-slate-400">
                          {(noteDrafts[i.id] ?? "").length}/5000
                        </p>
                        <button
                          onClick={() => saveNotes(i.id)}
                          disabled={
                            savingNotesId === i.id ||
                            (noteDrafts[i.id] ?? "") === (i.admin_notes ?? "")
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingNotesId === i.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Save size={14} />
                          )}
                          Save notes
                        </button>
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                          disabled={updatingId === i.id || i.status === s}
                          onClick={() => updateStatus(i.id, s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:cursor-not-allowed ${
                              i.status === s
                                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-default"
                                : "bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-600"
                            }`}
                          >
                            Mark {s}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleArchive(i.id, !i.archived_at)}
                          disabled={archivingId === i.id}
                          className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {archivingId === i.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : i.archived_at ? (
                            <ArchiveRestore size={14} />
                          ) : (
                            <Archive size={14} />
                          )}
                          {i.archived_at ? "Restore" : "Archive"}
                        </button>
                        <button
                          onClick={() => deleteEnquiry(i.id)}
                          disabled={deletingId === i.id}
                          className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === i.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {pagination && pagination.total > 0 && (
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {(page - 1) * PAGE_LIMIT + 1}–
              {Math.min(page * PAGE_LIMIT, pagination.total)} of{" "}
              {pagination.total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                      p === page
                        ? "bg-amber-500 text-black"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === pagination.pages}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
        active
          ? "bg-amber-500 text-black border-amber-500"
          : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-2">
      <Icon size={16} className="text-amber-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-slate-800">{value}</p>
      </div>
    </div>
  );
}
