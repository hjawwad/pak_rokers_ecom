import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">P</div>
              <span className="text-lg font-bold">Pak Rokers</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your destination for premium home, kitchen, and lifestyle products. Quality you can trust, from Pak Rokers.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">All Products</Link></li>
              <li><Link to="/products?category=kitchen" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">Kitchen</Link></li>
              <li><Link to="/products?category=electronics" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">Electronics</Link></li>
              <li><Link to="/products?category=home" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">Home & Living</Link></li>
              <li><Link to="/products?category=wellness" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">Wellness</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">Contact Us</Link></li>
              <li><span className="text-gray-400 text-sm">Shipping Policy</span></li>
              <li><span className="text-gray-400 text-sm">Returns & Exchanges</span></li>
              <li><span className="text-gray-400 text-sm">FAQ</span></li>
              <li><span className="text-gray-400 text-sm">Track Order</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-3">Get exclusive deals and updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="px-4 py-2.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-light transition-colors font-medium">
                Join
              </button>
            </form>
            <div className="flex gap-4 mt-4">
              {['Facebook', 'Instagram', 'Twitter'].map((s) => (
                <span key={s} className="text-gray-500 hover:text-white text-xs cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">&copy; 2026 Pak Rokers. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-gray-500 text-xs">Privacy Policy</span>
            <span className="text-gray-500 text-xs">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
