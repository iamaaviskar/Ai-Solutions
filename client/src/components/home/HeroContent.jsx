import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
        Sunderland · Global reach
      </p>

      <h1 className="text-5xl sm:text-6xl lg:text-[3.75rem] font-bold text-[#0C0C0C] leading-[1.05] tracking-tight mb-7">
        Making work <span className="text-amber-500">better</span> for real
        people — with AI.
      </h1>

      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md">
        AI-Solutions rapidly identifies and resolves digital friction across
        your workforce.
      </p>

      <div className="flex flex-wrap gap-3 mb-14">
        <Button
          asChild
          size="lg"
          className="bg-amber-500 hover:bg-amber-400 text-black gap-2"
        >
          <Link to="/contact">
            Start a conversation <ArrowRight size={16} />
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline">
          <Link to="/solutions">Explore solutions</Link>
        </Button>
      </div>
    </div>
  );
}
