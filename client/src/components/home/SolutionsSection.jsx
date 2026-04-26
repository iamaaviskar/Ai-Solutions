import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SOLUTIONS } from "../../data/solutions";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { SectionHeader } from "./SectionHeader";

function SolutionCard({ solution }) {
  const Icon = solution.icon;

  return (
    <Card className="group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-amber-300">
      <CardHeader className="space-y-4">
        <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors">
          <Icon
            size={20}
            className="text-slate-500 group-hover:text-amber-600 transition-colors"
          />
        </div>

        <h3 className="font-semibold text-[#0C0C0C]">{solution.title}</h3>
      </CardHeader>

      <CardContent className="text-sm text-slate-500 leading-relaxed">
        {solution.description}
      </CardContent>
    </Card>
  );
}

export default function SolutionsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col justify-between h-full">
            <SectionHeader
              label="What we do"
              title="AI built for every layer of your organisation."
              description="From intelligent assistants to rapid prototyping, every solution is built around one goal: making work better for your people."
            />
            <Link
              to="/solutions"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors mt-8"
            >
              View all solutions <ChevronRight size={15} />
            </Link>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {SOLUTIONS.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
