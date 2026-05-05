import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.variants[0]?.name || 'Default');
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 no-underline">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
            product.badge === 'Bestseller' ? 'bg-primary' :
            product.badge === 'Sale' ? 'bg-sale' :
            'bg-accent-orange'
          }`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-dark/80 text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
          </span>
        )}
        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-star text-star' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-dark line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
