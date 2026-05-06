import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, itemCount, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingBag size={20} />
              Cart ({itemCount})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingBag size={48} className="mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Add items to get started</p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors no-underline font-medium"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                      {item.variant && <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>}
                      <p className="text-sm font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="ml-auto p-1 text-gray-400 hover:text-sale transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout</p>
              <button
                onClick={() => { onClose(); navigate('/checkout'); }}
                className="w-full py-3.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-bold text-base"
              >
                Checkout — ${subtotal.toFixed(2)}
              </button>
              <button onClick={clearCart} className="w-full py-2 text-sm text-gray-500 hover:text-sale transition-colors">
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
