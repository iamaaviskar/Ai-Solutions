import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "../../data/caseStudies";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CaseStudyCard({ study }) {
  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-slate-200 hover:border-amber-300">
      {/* Top accent */}
      <div className="h-1 bg-amber-400 w-0 group-hover:w-full transition-all duration-500" />

      <CardHeader className="space-y-3">
        <Badge
          variant="outline"
          className="w-fit text-[10px] uppercase tracking-wider font-semibold text-amber-600 border-amber-100 bg-amber-50"
        >
          {study.tag}
        </Badge>

        <h3 className="font-semibold text-[0.95rem] leading-snug text-[#0C0C0C]">
          {study.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm text-slate-500">
        {study.description}
      </CardContent>

      <CardFooter>
        <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
          <CheckCircle2 size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-slate-700 text-xs font-medium">{study.result}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CaseStudiesSection() {
  return (
    <section className="py-28 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
              Case studies
            </p>
            <h2 className="text-4xl font-bold text-[#0C0C0C] tracking-tight">
              Real results, real industries.
            </h2>
          </div>

          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.title} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
