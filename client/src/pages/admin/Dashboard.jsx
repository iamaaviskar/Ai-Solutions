import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Inbox, Search, LogOut, Mail, Phone,
  Building2, MapPin, Briefcase, Loader2,
} from "lucide-react";
import api from "../../services/api";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../context/AuthContext";

const STATUS_OPTIONS = ["new", "reviewed", "responded"];

const STATUS_STYLES = {
  new:       "bg-amber-50 text-amber-700 border-amber-200",
  reviewed:  "bg-slate-100 text-slate-700 border-slate-200",
  responded: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats]       = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [list, st] = await Promise.all([
        api.get("/admin/inquiries", { params: { search, status: statusFilter, limit: 100 } }),
        api.get("/admin/stats"),
      ]);
      setInquiries(list.data.inquiries);
      setStats(st.data);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    load();
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await api.patch(`/admin/inquiries/${id}/status`, { status: newStatus });
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch {
      setError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusCount = (s) =>
    stats?.byStatus?.find((x) => x.status === s)?.count ?? 0;

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-black flex items-center justify-center">
              <Inbox size={18} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#0C0C0C]">AI-Solutions Admin</h1>
              <p className="text-xs text-slate-500">Signed in as {admin?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-slate-500 hover:text-[#0C0C0C] px-3 py-2 transition-colors">
              View site
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Total enquiries" value={stats?.total ?? "—"} />
          <StatCard label="New"       value={statusCount("new")}       highlight="amber" />
          <StatCard label="Reviewed"  value={statusCount("reviewed")}  highlight="slate" />
          <StatCard label="Responded" value={statusCount("responded")} highlight="emerald" />
        </div>

        {/* Enquiries table */}
        <div className="mt-8 rounded-2xl bg-white border border-slate-200">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 flex flex-wrap gap-3 items-center justify-between border-b border-slate-100">
            <form onSubmit={onSearchSubmit} className="flex-1 min-w-60">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or company"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                />
              </div>
            </form>
            <div className="flex gap-1.5">
              <FilterChip active={!statusFilter} onClick={() => setStatusFilter("")} label="All" />
              {STATUS_OPTIONS.map((s) => (
                <FilterChip
                  key={s}
                  active={statusFilter === s}
                  onClick={() => setStatusFilter(s)}
                  label={s[0].toUpperCase() + s.slice(1)}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          {loading ? (
            <div className="p-12 flex items-center justify-center text-slate-500">
              <Loader2 size={20} className="animate-spin mr-2" /> Loading enquiries...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-700">{error}</div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No enquiries match your filters yet.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {inquiries.map((i) => (
                <li key={i.id} className="p-5 sm:p-6 hover:bg-[#FAFAF7] transition-colors">
                  <button
                    onClick={() => setExpanded(expanded === i.id ? null : i.id)}
                    className="w-full text-left"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#0C0C0C]">
                          {i.name}
                          <span className="ml-2 font-normal text-slate-500">{i.company_name}</span>
                        </p>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {new Date(i.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline" className={`text-xs font-medium ${STATUS_STYLES[i.status] || ""}`}>
                        {i.status}
                      </Badge>
                    </div>
                  </button>

                  {expanded === i.id && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm pt-4 border-t border-slate-100">
                      <Field icon={Mail}      label="Email"   value={i.email} />
                      <Field icon={Phone}     label="Phone"   value={i.phone} />
                      <Field icon={Building2} label="Company" value={i.company_name} />
                      <Field icon={MapPin}    label="Country" value={i.country} />
                      <Field icon={Briefcase} label="Job title" value={i.job_title} />
                      <div className="sm:col-span-2">
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Project details</p>
                        <p className="whitespace-pre-line text-slate-800 leading-relaxed">{i.job_details}</p>
                      </div>
                      <div className="sm:col-span-2 flex gap-2 pt-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            disabled={updatingId === i.id || i.status === s}
                            onClick={() => updateStatus(i.id, s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                              i.status === s
                                ? "bg-slate-100 text-slate-400 border-slate-200 cursor-default"
                                : "bg-white text-slate-700 border-slate-300 hover:border-amber-500 hover:text-amber-600"
                            }`}
                          >
                            Mark {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  const valueClass = {
    amber:   "text-amber-600",
    emerald: "text-emerald-700",
    slate:   "text-slate-600",
  }[highlight] || "text-[#0C0C0C]";

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
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
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-slate-800">{value}</p>
      </div>
    </div>
  );
}
