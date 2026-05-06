import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/products', label: 'All Products' },
    { to: '/products?category=kitchen', label: 'Kitchen' },
    { to: '/products?category=electronics', label: 'Electronics' },
    { to: '/products?category=home', label: 'Home & Living' },
    { to: '/products?category=wellness', label: 'Wellness' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary no-underline">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">P</div>
            <span className="hidden sm:inline">Pak Rokers</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors no-underline">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block" aria-label="Admin Panel">
              <Settings size={20} />
            </Link>
            <button onClick={onCartOpen} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" aria-label="Cart">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg border-t animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto p-4 flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              autoFocus
            />
            <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white animate-fade-in">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
