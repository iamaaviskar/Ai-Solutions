import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "AI-Solutions Demo Day 2025",
    event: "AI-Solutions Demo Day",
    location: "Sunderland Software Centre",
    date: "November 2025",
    category: "Demo Day",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    alt: "Team workshop at Sunderland HQ",
    event: "Product Strategy Workshop",
    location: "Sunderland, UK",
    date: "October 2025",
    category: "Internal",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    alt: "North East Tech Summit 2025",
    event: "North East Tech Summit",
    location: "Newcastle Gateshead Quays",
    date: "September 2025",
    category: "Conference",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Future of Work webinar recording session",
    event: "Webinar: Future of Work",
    location: "Online - Zoom",
    date: "August 2025",
    category: "Webinar",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    alt: "Client showcase evening",
    event: "Client Showcase Evening",
    location: "Sunderland Software Centre",
    date: "July 2025",
    category: "Showcase",
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    alt: "AI-Solutions networking event",
    event: "North East AI Networking",
    location: "Newcastle, UK",
    date: "June 2025",
    category: "Networking",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    alt: "Team sprint session",
    event: "Quarterly Team Sprint",
    location: "Sunderland, UK",
    date: "May 2025",
    category: "Internal",
  },
  {
    src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    alt: "AI-Solutions at Digital Leaders Week",
    event: "Digital Leaders Week",
    location: "London, UK",
    date: "April 2025",
    category: "Conference",
    wide: true,
  },
  {
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80",
    alt: "Product launch celebration",
    event: "v2.0 Product Launch",
    location: "Sunderland Software Centre",
    date: "March 2025",
    category: "Launch",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(PHOTOS.map((p) => p.category))),
];

const CATEGORY_BADGE_CLASS = {
  "Demo Day": "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  Internal: "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100",
  Conference: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  Webinar: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50",
  Showcase: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
  Networking: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50",
  Launch: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50",
};

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

function PhotoDialog({ photo, open, onOpenChange }) {
  if (!photo) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0">
        <DialogTitle className="sr-only">{photo.event}</DialogTitle>
        <DialogDescription className="sr-only">
          {photo.date} · {photo.location}
        </DialogDescription>
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 pointer-events-none">
          <p className="text-white font-semibold text-sm">{photo.event}</p>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Calendar size={11} className="text-amber-400" />
              {photo.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-amber-400" />
              {photo.location}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  const handleSelect = (photo) => {
    setSelected(photo);
    setDialogOpen(true);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0C0C0C]">
            Behind the scenes at AI-Solutions.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            From product launches and conferences to team workshops and client
            showcases - a look at the people and events behind our work.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-amber-500 text-black border-amber-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((photo) => (
            <Card
              key={photo.alt}
              className="group cursor-pointer hover:border-amber-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              onClick={() => handleSelect(photo)}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-[#0C0C0C] text-sm leading-snug">
                    {photo.event}
                  </p>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] ${
                      CATEGORY_BADGE_CLASS[photo.category] ||
                      "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    {photo.category}
                  </Badge>
                </div>
                <div className="mt-2.5 flex flex-col gap-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-amber-500 shrink-0" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-amber-500 shrink-0" />
                    {photo.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-slate-500">
            No photos in this category yet.
          </p>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-amber-400 p-10 sm:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-black">
              Want to see us in action?
            </h2>
            <p className="mt-3 text-black/70 leading-relaxed">
              Join us at an upcoming event or book a private demo with our team
              in Sunderland.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-[#1a1a1a] transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>

      <PhotoDialog
        photo={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
