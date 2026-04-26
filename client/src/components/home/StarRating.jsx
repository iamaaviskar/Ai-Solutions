import { Star } from "lucide-react";

export default function StarRating({ rating = 5, max = 5, size = 14 }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < Math.floor(rating);

        return (
          <Star
            key={i}
            size={size}
            className={
              isFilled ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }
          />
        );
      })}
    </div>
  );
}
