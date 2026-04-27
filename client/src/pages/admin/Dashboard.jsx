import { useEffect, useState } from "react";
import {
  Inbox,
  MessageCircleQuestion,
  FileText,
  Image,
  TrendingUp,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import api from "../../services/api";

const STATUS_STYLES = {
  new: "bg-amber-50 text-amber-700 border-amber-200",
  reviewed: "bg-slate-100 text-slate-700 border-slate-200",
  responded: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [st, list] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/inquiries", { params: { limit: 5 } }),
        ]);
        setStats(st.data);
        setRecent(list.data.inquiries);
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusCount = (s) =>
    stats?.byStatus?.find((x) => x.status === s)?.count ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0C0C0C]">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your site activity
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Inbox}
          label="Total Enquiries"
          value={stats?.total ?? 0}
          sub="All time"
          color="amber"
        />
        <StatCard
          icon={TrendingUp}
          label="New"
          value={statusCount("new")}
          sub="Awaiting review"
          color="amber"
        />
        <StatCard
          icon={Inbox}
          label="Reviewed"
          value={statusCount("reviewed")}
          sub="In progress"
          color="slate"
        />
        <StatCard
          icon={Inbox}
          label="Responded"
          value={statusCount("responded")}
          sub="Completed"
          color="emerald"
        />
      </div>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <QuickLink
          to="/admin/queries"
          icon={MessageCircleQuestion}
          label="Unanswered Queries"
          desc="Review chatbot gaps"
        />
        <QuickLink
          to="/admin/articles"
          icon={FileText}
          label="Articles"
          desc="Create & manage content"
        />
        <QuickLink
          to="/admin/gallery"
          icon={Image}
          label="Gallery"
          desc="Upload & manage photos"
        />
      </div>

      {/* Recent enquiries */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#0C0C0C]">
            Recent Enquiries
          </h2>
          <Link
            to="/admin/inquiries"
            className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {recent.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">No enquiries yet.</p>
          ) : (
            recent.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0C0C0C]">
                    {i.name}
                    <span className="ml-2 font-normal text-slate-500">
                      {i.company_name}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(i.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${STATUS_STYLES[i.status] || ""}`}
                >
                  {i.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  const accent =
    {
      amber: "text-amber-500",
      emerald: "text-emerald-600",
      slate: "text-slate-500",
    }[color] || "text-slate-700";
  const bg =
    { amber: "bg-amber-50", emerald: "bg-emerald-50", slate: "bg-slate-100" }[
      color
    ] || "bg-slate-100";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
      >
        <Icon size={18} className={accent} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <p className="text-3xl font-bold text-[#0C0C0C] mt-1">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label, desc }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:border-amber-400 hover:shadow-sm transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-amber-50 transition-colors">
        <Icon
          size={18}
          className="text-slate-500 group-hover:text-amber-500 transition-colors"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0C0C0C]">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
      <ArrowRight
        size={16}
        className="text-slate-300 group-hover:text-amber-500 transition-colors shrink-0"
      />
    </Link>
  );
}
