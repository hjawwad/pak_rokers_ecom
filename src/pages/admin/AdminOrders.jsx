import { useState } from 'react';
import { Search, Eye, X, ChevronDown } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewOrder, setViewOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Order ID</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Customer</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Date</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Total</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.orderId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-mono font-bold">{order.orderId}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">{order.name}</p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{formatDate(order.date)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold">${order.total?.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium appearance-none cursor-pointer pr-7 border-0 ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setViewOrder(order)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {orders.length === 0 ? 'No orders yet. Orders will appear here when customers place them.' : 'No orders match your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewOrder(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-xl">
              <div>
                <h3 className="text-lg font-bold">Order {viewOrder.orderId}</h3>
                <p className="text-xs text-gray-500">{formatDate(viewOrder.date)}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Customer Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <p className="text-sm"><span className="text-gray-500">Name:</span> {viewOrder.name}</p>
                  <p className="text-sm"><span className="text-gray-500">Email:</span> {viewOrder.email}</p>
                  <p className="text-sm"><span className="text-gray-500">Address:</span> {viewOrder.address}</p>
                  <p className="text-sm"><span className="text-gray-500">Shipping:</span> {viewOrder.shipping}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Items ({viewOrder.items?.length || 0})</h4>
                <div className="space-y-2">
                  {viewOrder.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Order Summary</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${viewOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>{viewOrder.shippingCost === 0 ? 'FREE' : `$${viewOrder.shippingCost?.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>${viewOrder.tax?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">${viewOrder.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Update Status</h4>
                <select
                  value={viewOrder.status}
                  onChange={(e) => {
                    updateOrderStatus(viewOrder.orderId, e.target.value);
                    setViewOrder({ ...viewOrder, status: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
