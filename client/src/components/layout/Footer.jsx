import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Events", to: "/#events" },
  { label: "Contact Us", to: "/contact" },
];

const SOLUTION_LINKS = [
  { label: "Digital Employee Experience", to: "/solutions" },
  { label: "AI Prototyping", to: "/solutions" },
  { label: "Virtual Assistant", to: "/solutions" },
  { label: "Process Automation", to: "/solutions" },
];

function FooterLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 mb-4">
      <img
        src="/Logo-Dark.png"
        alt="AI-Solutions logo"
        className="h-9 opacity-90 hover:opacity-100 transition"
      />
      <span className="font-semibold text-[1.05rem] tracking-tight text-white">
        AI<span className="text-amber-400">-Solutions</span>
      </span>
    </Link>
  );
}

function FooterHeading({ children }) {
  return (
    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
      {children}
    </h4>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0C] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Innovating, promoting, and delivering the future of the digital
              employee experience - supporting people at work, worldwide.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-amber-400" />
                <span>Sunderland, United Kingdom</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-amber-400" />
                <a
                  href="mailto:hello@ai-solutions.co.uk"
                  className="hover:text-white transition-colors"
                >
                  hello@ai-solutions.co.uk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-amber-400" />
                <a
                  href="tel:+441910000000"
                  className="hover:text-white transition-colors"
                >
                  +44 191 000 0000
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions links */}
          <div>
            <FooterHeading>Solutions</FooterHeading>
            <ul className="space-y-2.5">
              {SOLUTION_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + social */}
          <div>
            <FooterHeading>Stay Updated</FooterHeading>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Ready to transform your digital employee experience?
            </p>
            <Link
              to="/contact"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium transition-colors duration-150"
            >
              Get in Touch
            </Link>

            <div className="flex items-center gap-2 mt-6"></div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {year} AI-Solutions Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <Link to="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
