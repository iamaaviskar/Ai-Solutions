import { Card, CardContent } from "@/components/ui/card";

const IMPACTS = [
  {
    id: "downtime",
    number: "74%",
    description:
      "Average reduction in IT downtime across healthcare deployments.",
  },
  {
    id: "prototype",
    number: "< 5 days",
    description:
      "Typical time from project kick-off to a working, testable prototype.",
  },
  {
    id: "tickets",
    number: "60%",
    description:
      "Drop in HR and IT ticket volume after deploying our virtual assistant.",
  },
  {
    id: "countries",
    number: "12+",
    description:
      "Countries where AI-Solutions is actively transforming workplaces.",
  },
];

function ImpactCard({ impact }) {
  return (
    <Card className="bg-transparent border-white/10 hover:bg-white/5 transition-colors">
      <CardContent className="p-8">
        <p className="text-5xl font-bold text-amber-400 mb-3">
          {impact.number}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          {impact.description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ImpactSection() {
  return (
    <section className="py-28 bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              Impact
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Numbers that{" "}
              <span className="text-amber-400">actually matter</span> to the
              people using your software.
            </h2>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            {IMPACTS.map((impact) => (
              <ImpactCard key={impact.id} impact={impact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
