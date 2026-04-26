import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, Clock, Users } from "lucide-react";

const CASES = [
  {
    client: "Northwind Logistics",
    sector: "Logistics & Supply Chain",
    headline: "Cut warehouse onboarding time by 62% with an AI knowledge assistant",
    summary: "Northwind's frontline staff lost hours hunting through 14 different SOPs. We built a conversational assistant trained on their procedures — every new hire gets answers in seconds.",
    metrics: [
      { icon: Clock, label: "Onboarding time", value: "-62%" },
      { icon: TrendingUp, label: "Pick accuracy", value: "+18%" },
      { icon: Users, label: "Employees served", value: "1,400" },
    ],
  },
  {
    client: "Halcyon Health",
    sector: "Healthcare Operations",
    headline: "Automated 70% of internal IT tickets without sacrificing employee trust",
    summary: "Halcyon's IT team was buried under password resets and access requests. An AI triage layer now handles routine tickets end-to-end, escalating only what truly needs a human.",
    metrics: [
      { icon: Clock, label: "Avg resolution", value: "11 min" },
      { icon: TrendingUp, label: "Auto-resolved", value: "70%" },
      { icon: Users, label: "Tickets/month", value: "8,200" },
    ],
  },
  {
    client: "Meridian Financial",
    sector: "Financial Services",
    headline: "Prototyped a compliance-aware AI workspace assistant in 3 weeks",
    summary: "Meridian needed to prove that an AI assistant could respect their strict data boundaries before committing to a full rollout. We delivered a working prototype with full audit trails in 21 days.",
    metrics: [
      { icon: Clock, label: "Time to prototype", value: "3 wks" },
      { icon: TrendingUp, label: "Pilot adoption", value: "94%" },
      { icon: Users, label: "Departments piloted", value: "6" },
    ],
  },
];

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-px bg-amber-500" />
      <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
        {children}
      </span>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Case Studies</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0C0C0C]">
            Real teams. Real measurable wins.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            A few of the engagements we are proud of. Different industries,
            different scales — same focus on tangible employee experience improvements.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {CASES.map((c) => (
            <Card
              key={c.client}
              className="hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    {c.sector}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#0C0C0C]">{c.client}</h2>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors"
                >
                  Discuss a similar project <ArrowUpRight size={16} />
                </Link>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-[#0C0C0C] leading-snug">
                {c.headline}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{c.summary}</p>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {c.metrics.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-[#FAFAF7] border border-slate-100 p-4 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="text-lg font-bold text-[#0C0C0C]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
