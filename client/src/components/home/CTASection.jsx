import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-amber-400 border-0 shadow-xl">
          <CardContent className="p-10 sm:p-14">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-black leading-tight tracking-tight">
                  Ready to transform your digital employee experience?
                </h2>
              </div>

              {/* Right */}
              <div>
                <p className="text-black/70 text-lg leading-relaxed mb-8">
                  Tell us about your project. Our team will get back to you
                  within one business day with a tailored approach — no sales
                  pitch, just a real conversation.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-black text-white hover:bg-[#1a1a1a] gap-2"
                  >
                    <Link to="/contact">
                      Contact us today <ArrowRight size={16} />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-black text-black hover:bg-amber-50 gap-2"
                  >
                    <Link to="/solutions">View solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
