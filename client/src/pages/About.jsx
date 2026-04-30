import { Link } from "react-router-dom";
import { Target, Heart, Globe2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VALUES = [
  {
    icon: Target,
    title: "Pragmatic over flashy",
    body: "We don't ship demos that fall over in production. Every prototype we build is engineered with the next step in mind.",
  },
  {
    icon: Heart,
    title: "People first, always",
    body: "AI should make work feel lighter, not more surveilled. We design for the human on the other side of every workflow.",
  },
  {
    icon: Globe2,
    title: "Worldwide impact, local roots",
    body: "Headquartered in Sunderland, UK - partnering with teams across Europe, North America, and beyond.",
  },
  {
    icon: Sparkles,
    title: "Move at start-up speed",
    body: "Our small, senior team owns each engagement end-to-end. No handoffs, no slide-deck theater - just shipping.",
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

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl">
          <SectionLabel>About</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0C0C0C]">
            We innovate, promote, and deliver the future of the digital employee
            experience.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            AI-Solutions is a tech start-up based in Sunderland, UK. We use
            artificial intelligence to help businesses rapidly address the
            issues affecting their digital employee experience - and we make
            production-grade prototyping affordable enough to actually try.
          </p>
        </div>

        {/* Mission + How we work */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#0C0C0C] p-10 text-white">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-4">
              Our mission
            </p>
            <h2 className="text-2xl font-bold leading-snug mb-4">
              AI as a quiet partner for every employee.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              To support people at work by making AI a quiet partner - one that
              removes friction, surfaces the right answers, and gives every
              employee back the time they spend fighting their tools.
            </p>
          </div>
          <Card>
            <CardContent className="p-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">
                How we work
              </p>
              <h2 className="text-2xl font-bold text-[#0C0C0C] leading-snug mb-4">
                Prove value fast, then scale what works.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We start with a focused diagnostic of one painful workflow, ship
                a working prototype within weeks, and only scale what proves its
                value with real users. No multi-quarter consulting engagements.
                No vapourware.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mt-16">
          <SectionLabel>What we believe</SectionLabel>
          <h2 className="text-3xl font-bold text-[#0C0C0C] mb-8">
            The principles behind every decision we make.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="group hover:border-amber-200 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center text-slate-500 group-hover:text-amber-600 transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0C0C0C]">
                    {title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-amber-400 p-10 sm:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-black">
              Want to work with us?
            </h2>
            <p className="mt-3 text-black/70 leading-relaxed">
              Tell us where your team is feeling the friction - we will come
              back with a scoped plan and a quote within a week.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-[#1a1a1a] transition-colors duration-150"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
