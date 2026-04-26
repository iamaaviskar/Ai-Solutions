import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/solutions" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Articles", to: "/articles" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
      <img
        src="/Logo.png"
        alt="AI-Solutions logo"
        className="h-9 w-auto object-contain"
      />
      <span className="text-[#0C0C0C] font-semibold text-[1.05rem] tracking-tight leading-none">
        AI<span className="text-amber-600">-Solutions</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav links */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "text-amber-600 bg-amber-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-400 active:bg-amber-300 transition-colors duration-150 shadow-sm"
            >
              Contact Us
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-amber-600 bg-amber-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-1 px-4 py-2.5 rounded-lg bg-amber-500 text-white text-sm font-medium text-center hover:bg-amber-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
