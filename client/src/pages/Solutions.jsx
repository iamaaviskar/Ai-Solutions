import { Link } from "react-router-dom";
import {
  Sparkles,
  LayoutDashboard,
  MessageSquareCode,
  Workflow,
  Database,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SOLUTIONS = [
  {
    icon: Sparkles,
    title: "AI-Powered Prototyping",
    description:
      "Move from scoped idea to working prototype through a structured four-week delivery cycle. Get tangible artifacts your stakeholders can actually click through.",
  },
  {
    icon: LayoutDashboard,
    title: "Employee Experience Dashboards",
    description:
      "Real-time visibility into the friction points hurting your workforce. Aggregate signals from across your stack and surface the issues that matter.",
  },
  {
    icon: MessageSquareCode,
    title: "Conversational AI Assistants",
    description:
      "Internal copilots that understand your policies, tools, and people. From IT helpdesk to HR Q&A - give every employee a smart first responder.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Identify repetitive workflows and replace them with reliable AI agents. Free your team to focus on the work that actually moves the needle.",
  },
  {
    icon: Database,
    title: "Knowledge Intelligence",
    description:
      "Turn scattered docs, wikis, and tickets into a single searchable brain. Answers in seconds, not hours of digging.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI Guardrails",
    description:
      "Production-ready safety, audit logging, and access controls baked in. Move fast without breaking trust with your employees or your regulators.",
  },
];

export default function Solutions() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-500 text-xs font-semibold tracking-wide uppercase">
            Solutions
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-[#0C0C0C]">
            AI that improves the day-to-day for real employees.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            We build practical AI products that target the small frustrations
            and big workflow gaps that quietly drag teams down. Affordable,
            measurable, and shipped fast.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group hover:border-amber-500/40 hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0C0C0C]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-linear-to-br from-[#0C0C0C] to-amber-500 p-10 sm:p-14 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Have a specific challenge in mind?
            </h2>
            <p className="mt-4 text-blue-100 text-lg leading-relaxed">
              Tell us about it. We will scope a working prototype your team can
              evaluate through a focused four-week delivery cycle.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-white text-amber-500 font-medium hover:bg-amber-50 transition-colors"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
