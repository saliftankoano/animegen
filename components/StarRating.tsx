import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export function StarRating({ onRate }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={`focus:outline-none ${
              ratingValue <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setRating(ratingValue);
              onRate(ratingValue);
            }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className="w-8 h-8"
              fill={ratingValue <= (hover || rating) ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
}
