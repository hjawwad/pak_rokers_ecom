import { Link } from 'react-router-dom';
import { Package, FolderTree, ShoppingCart, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function Dashboard() {
  const { products, categories, orders } = useAdmin();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const inStockProducts = products.filter((p) => p.inStock).length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Categories', value: categories.length, icon: FolderTree, color: 'bg-purple-500', link: '/admin/categories' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: 'bg-green-500', link: '/admin/orders' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-amber-500', link: '/admin/orders' },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link} className="no-underline">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
                  <Icon size={22} className="text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">In-Stock Products</span>
              <span className="text-sm font-bold text-green-600">{inStockProducts} / {products.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Pending Orders</span>
              <span className="text-sm font-bold text-amber-600">{pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Out of Stock</span>
              <span className="text-sm font-bold text-red-600">{products.length - inStockProducts}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Avg. Order Value</span>
              <span className="text-sm font-bold">{orders.length > 0 ? `$${(totalRevenue / orders.length).toFixed(2)}` : '$0.00'}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock size={20} /> Recent Orders
          </h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.orderId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{order.orderId}</p>
                    <p className="text-xs text-gray-500">{order.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${order.total?.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {orders.length > 5 && (
            <Link to="/admin/orders" className="block text-center text-sm text-primary font-medium mt-4 no-underline hover:underline">
              View all orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
