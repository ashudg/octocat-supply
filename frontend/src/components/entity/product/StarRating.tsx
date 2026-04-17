import { useState } from 'react';

interface StarRatingProps {
  productId: number;
  rating: number;
  onRate: (productId: number, rating: number) => void;
}

export default function StarRating({ productId, rating, onRate }: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <div className="flex items-center space-x-1" aria-label={`Rate ${productId}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onRate(productId, star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full
              transition-all duration-150 ease-out
              focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400
              ${isFilled
                ? 'text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                : 'text-red-200 hover:text-red-400 hover:scale-110'
              }
              active:scale-125
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFilled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={isFilled ? '0' : '1.5'}
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        );
      })}
      {rating > 0 && (
        <span className="text-xs text-red-400 font-semibold ml-1">
          {rating}/5
        </span>
      )}
    </div>
  );
}
