import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { reviews as allReviews } from '../data/products';
import { useAdmin } from '../context/AdminContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { products } = useAdmin();

  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const productReviews = useMemo(() => allReviews.filter((r) => r.productId === product?.id), [product]);
  const relatedProducts = useMemo(() => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4), [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-primary font-medium hover:underline">Back to Products</Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, product.variants[selectedVariant]?.name || 'Default');
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-primary no-underline text-gray-500">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-primary no-underline text-gray-500">Products</Link>
        <ChevronRight size={14} />
        <span className="text-dark font-medium">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                product.badge === 'Bestseller' ? 'bg-primary' : product.badge === 'Sale' ? 'bg-sale' : 'bg-accent-orange'
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-sale/10 text-sale text-sm font-bold px-2.5 py-1 rounded">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-bold mb-2">
                Color: <span className="font-normal text-gray-600">{product.variants[selectedVariant].name}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sku}
                    onClick={() => setSelectedVariant(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedVariant === i ? 'border-primary scale-110 ring-2 ring-primary/30' : 'border-gray-200 hover:border-gray-400'}`}
                    style={{ backgroundColor: v.color }}
                    title={v.name}
                    aria-label={v.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 transition-colors" aria-label="Decrease">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 transition-colors" aria-label="Increase">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-white transition-all ${addedToCart ? 'bg-success' : 'bg-primary hover:bg-primary-dark'}`}
            >
              {addedToCart ? (
                <><Check size={20} /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={20} /> Add to Cart</>
              )}
            </button>

            <button className="p-3.5 border rounded-lg hover:bg-gray-50 transition-colors" aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
            <button className="p-3.5 border rounded-lg hover:bg-gray-50 transition-colors hidden sm:block" aria-label="Share">
              <Share2 size={20} />
            </button>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 py-6 border-t border-b">
            {[
              { icon: Truck, text: 'Free Shipping' },
              { icon: Shield, text: '1 Year Warranty' },
              { icon: RotateCcw, text: '30-Day Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={20} className="text-primary" />
                <span className="text-xs font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="font-bold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {productReviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{review.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                <p className="text-xs text-gray-400 mt-3">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
