import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Award, Star, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import { products, categories, testimonials } from '../data/products';

const trustSignals = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, title: '1 Year Guarantee', desc: 'Full warranty coverage' },
  { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free returns' },
  { icon: Award, title: 'Premium Quality', desc: 'Trusted by 50,000+' },
];

const featuredProducts = products.filter((p) => p.badge === 'Bestseller' || p.badge === 'Hot Deal').slice(0, 4);
const saleProducts = products.filter((p) => p.badge === 'Sale').slice(0, 4);

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Summer Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Elevate Your <br />Everyday Living
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
              Discover premium products for your home, kitchen, and lifestyle. Curated for quality, designed for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition-colors no-underline">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=kitchen" className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors no-underline">
                Kitchen Essentials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-500 mt-1">Handpicked favorites our customers love</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:underline no-underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find exactly what you need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} className="group relative aspect-square rounded-xl overflow-hidden no-underline">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-white/70">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-r from-accent-orange to-[#ff8a4c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Summer Sale is Live!</h2>
            <p className="text-white/80 mt-2">Save up to 55% on select items. Limited time only.</p>
          </div>
          <Link to="/products" className="bg-white text-accent-orange px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition-colors no-underline whitespace-nowrap">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* Sale Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">On Sale Now</h2>
            <p className="text-gray-500 mt-1">Great deals on top-rated products</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-primary font-medium text-sm hover:underline no-underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-gray-500 mt-1">Trusted by thousands of happy shoppers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <StarRating rating={t.rating} />
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">"{t.text}"</p>
                <p className="mt-4 font-bold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Join the Pak Rokers Family</h2>
          <p className="text-white/70 mb-6">Subscribe for exclusive deals, new arrivals, and 10% off your first order.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="px-6 py-3 bg-accent text-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
