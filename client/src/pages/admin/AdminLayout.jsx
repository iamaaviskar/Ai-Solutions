import { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  MessageCircleQuestion,
  FileText,
  Image,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/enquiries", icon: Inbox, label: "Enquiries" },
  {
    to: "/admin/queries",
    icon: MessageCircleQuestion,
    label: "Unanswered Queries",
  },
  { to: "/admin/articles", icon: FileText, label: "Articles" },
  { to: "/admin/gallery", icon: Image, label: "Gallery" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {/* ── Sidebar (desktop) ───────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0C0C0C] min-h-screen fixed left-0 top-0 bottom-0 z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-lg font-bold text-white tracking-tight">
              AI<span className="text-amber-500">-Solutions</span>
            </span>
            <ExternalLink
              size={12}
              className="text-white/30 group-hover:text-white/60 transition-colors"
            />
          </Link>
          <p className="mt-1 text-xs text-white/40">Admin Panel</p>
        </div>

        {/* Admin info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm uppercase">
              {admin?.username?.[0] ?? "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {admin?.username}
              </p>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-black"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ───────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0C0C0C] flex flex-col transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            AI<span className="text-amber-500">-Solutions</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm uppercase">
              {admin?.username?.[0] ?? "A"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {admin?.username}
              </p>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-black"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content area ────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:ml-60">
        {/* Mobile top bar */}
        <header className="lg:hidden bg-white border-b border-slate-200 h-14 flex items-center px-4 gap-4 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-600 hover:text-[#0C0C0C]"
          >
            <Menu size={22} />
          </button>
          <span className="text-sm font-bold text-[#0C0C0C]">
            AI<span className="text-amber-500">-Solutions</span> Admin
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
