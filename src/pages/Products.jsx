import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useAdmin } from '../context/AdminContext';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const { products, categories } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const activeCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.delete('search');
    setSearchParams(params);
  };

  const categoryName = categories.find((c) => c.id === activeCategory)?.name || 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="hover:text-primary cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="text-dark font-medium">{searchQuery ? `Search: "${searchQuery}"` : categoryName}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-60 flex-shrink-0 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-1.5 list-none p-0 m-0">
                <li>
                  <button
                    onClick={() => setCategory('')}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!activeCategory ? 'bg-primary text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    All Products ({products.length})
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setCategory(cat.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${activeCategory === cat.id ? 'bg-primary text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {cat.name} ({products.filter((p) => p.category === cat.id).length})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Grid toggle */}
              <div className="hidden sm:flex items-center gap-1 border rounded-lg p-0.5">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded ${gridCols === 3 ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1.5 rounded ${gridCols === 2 ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  aria-label="Large grid view"
                >
                  <LayoutList size={16} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none text-sm border rounded-lg px-3 py-2 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium text-gray-400">No products found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query</p>
              <button onClick={() => { setCategory(''); setPriceRange([0, 1000]); }} className="mt-4 text-primary font-medium text-sm hover:underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${gridCols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
