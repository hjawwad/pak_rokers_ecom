import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? 'fill-star text-star' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}
