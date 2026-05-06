import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ShoppingCart, ArrowLeft } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-white/60 mt-1">Pak Rokers Store</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? 'bg-white/15 text-white border-r-3 border-accent'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={16} />
            Back to Store
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
