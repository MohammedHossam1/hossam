import { Star } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;

        const fillColor =
          rating >= starValue
            ? "#FFCC00" // Full star
            : rating >= starValue - 0.5
            ? "url(#half)" // Half star (use gradient)
            : "#E0E0E0"; // Empty star

        return (
          <svg key={index} width={24} height={24}>
            <defs>
              <linearGradient id="half" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#FFCC00" />
                <stop offset="50%" stopColor="#E0E0E0" />
              </linearGradient>
            </defs>
            <Star
              width={24}
              height={24}
              fill={fillColor}
              stroke={fillColor}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default RatingStars;