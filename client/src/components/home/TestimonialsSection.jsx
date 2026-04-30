import { TESTIMONIALS } from "../../data/testimonials";
import { SectionHeader } from "./SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";

function TestimonialCard({ testimonial }) {
  const { name, title, rating, text } = testimonial;

  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="p-8 flex flex-col h-full">
        <StarRating rating={rating} />

        <p className="text-4xl text-amber-500/30 font-serif leading-none mt-4 mb-2">
          “
        </p>

        <p className="text-slate-300 text-sm leading-relaxed flex-1">{text}</p>

        <div className="flex items-center gap-3 mt-7 pt-6 border-t border-white/10">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black text-xs font-bold shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">
              {name}
            </p>
            <p className="text-slate-400 text-xs mt-0.5">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          label="Testimonials"
          title="Trusted by teams who care about their people."
          light
        />

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
