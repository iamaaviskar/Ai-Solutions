import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, ChevronRight } from "lucide-react";
import { EVENTS } from "../../data/events";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function EventRow({ event }) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-md hover:border-amber-300">
      <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[10px] uppercase tracking-wider font-semibold text-amber-600 border-amber-100 bg-amber-50"
          >
            {event.type}
          </Badge>

          <h3 className="font-semibold text-[#0C0C0C]">{event.title}</h3>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-amber-500" />
            {event.date}
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-amber-500" />
            {event.location}
          </span>

          <span className="flex items-center gap-1 text-amber-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Register <ChevronRight size={13} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsSection() {
  return (
    <section id="events" className="py-28 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
              Events
            </p>
            <h2 className="text-4xl font-bold text-[#0C0C0C] tracking-tight">
              Meet us in person.
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            Book a private demo <ArrowRight size={15} />
          </Link>
        </div>

        {/* List */}
        <div className="space-y-3">
          {EVENTS.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
