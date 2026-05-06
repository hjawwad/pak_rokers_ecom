import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, MapPin, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-success" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500">Thank you for shopping with Pak Rokers, {state.name}.</p>
      </div>

      {/* Order Details Card */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Order Details</h2>
          <span className="text-sm bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">{state.orderId}</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Mail size={16} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-gray-500">Confirmation sent to</p>
              <p className="font-medium">{state.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-gray-500">Shipping address</p>
              <p className="font-medium">{state.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck size={16} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-gray-500">Shipping method</p>
              <p className="font-medium">{state.shipping}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="font-bold mb-4">Items Ordered</h3>
        <div className="space-y-3">
          {state.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.variant} &middot; Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${state.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>{state.shippingCost === 0 ? 'FREE' : `$${state.shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax</span>
            <span>${state.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
            <span>Total</span>
            <span className="text-primary">${state.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/products" className="flex-1 text-center py-3.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors no-underline">
          Continue Shopping
        </Link>
        <Link to="/" className="flex-1 text-center py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors no-underline text-dark">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
