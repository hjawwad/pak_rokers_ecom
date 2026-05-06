import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Lock, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const initialForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  phone: '',
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
  shippingMethod: 'standard',
};

const shippingOptions = [
  { id: 'standard', label: 'Standard Shipping', desc: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express Shipping', desc: '2–3 business days', price: 9.99 },
  { id: 'overnight', label: 'Overnight Shipping', desc: '1 business day', price: 19.99 },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1=info, 2=shipping, 3=payment

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some items before checking out.</p>
        <Link to="/products" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium no-underline hover:bg-primary-dark transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = shippingOptions.find((s) => s.id === form.shippingMethod);
  const shippingCost = shipping?.price || 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shippingCost + tax).toFixed(2);

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!form.email.trim()) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
      if (!form.firstName.trim()) errs.firstName = 'First name is required';
      if (!form.lastName.trim()) errs.lastName = 'Last name is required';
      if (!form.address.trim()) errs.address = 'Address is required';
      if (!form.city.trim()) errs.city = 'City is required';
      if (!form.state.trim()) errs.state = 'State is required';
      if (!form.zip.trim()) errs.zip = 'ZIP code is required';
      if (!form.phone.trim()) errs.phone = 'Phone is required';
    }
    if (s === 3) {
      if (!form.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      else if (form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Enter a valid card number';
      if (!form.cardName.trim()) errs.cardName = 'Name on card is required';
      if (!form.expiry.trim()) errs.expiry = 'Expiry is required';
      else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = 'Use MM/YY format';
      if (!form.cvv.trim()) errs.cvv = 'CVV is required';
      else if (form.cvv.length < 3) errs.cvv = 'Invalid CVV';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return;
    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    const orderId = 'PR-' + Date.now().toString(36).toUpperCase();
    const orderData = {
      orderId,
      email: form.email,
      name: `${form.firstName} ${form.lastName}`,
      address: `${form.address}${form.apartment ? ', ' + form.apartment : ''}, ${form.city}, ${form.state} ${form.zip}`,
      shipping: shipping.label,
      items: items.map((i) => ({ name: i.name, variant: i.variant, quantity: i.quantity, price: i.price })),
      subtotal,
      shippingCost,
      tax,
      total,
    };
    addOrder(orderData);
    clearCart();
    navigate('/order-confirmation', { state: orderData });
  };

  const formatCardNumber = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) return v.slice(0, 2) + '/' + v.slice(2);
    return v;
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${errors[field] ? 'border-sale ring-1 ring-sale/30' : 'border-gray-300'}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-primary no-underline text-gray-500">Home</Link>
        <ChevronRight size={14} />
        <span className="text-dark font-medium">Checkout</span>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {['Information', 'Shipping', 'Payment'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => { if (i + 1 < step) setStep(i + 1); }}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === i + 1 ? 'text-primary' : step > i + 1 ? 'text-success cursor-pointer' : 'text-gray-400'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === i + 1 ? 'border-primary bg-primary text-white' : step > i + 1 ? 'border-success bg-success text-white' : 'border-gray-300 text-gray-400'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < 2 && <div className={`w-8 sm:w-16 h-0.5 ${step > i + 1 ? 'bg-success' : 'bg-gray-300'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          {/* Step 1: Contact & Shipping Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Contact & Shipping Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls('email')} />
                  {errors.email && <p className="text-sale text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="John" className={inputCls('firstName')} />
                    {errors.firstName && <p className="text-sale text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Doe" className={inputCls('lastName')} />
                    {errors.lastName && <p className="text-sale text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input type="text" value={form.address} onChange={set('address')} placeholder="123 Main Street" className={inputCls('address')} />
                  {errors.address && <p className="text-sale text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Apartment, suite, etc. (optional)</label>
                  <input type="text" value={form.apartment} onChange={set('apartment')} placeholder="Apt 4B" className={inputCls('apartment')} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" value={form.city} onChange={set('city')} placeholder="New York" className={inputCls('city')} />
                    {errors.city && <p className="text-sale text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input type="text" value={form.state} onChange={set('state')} placeholder="NY" className={inputCls('state')} />
                    {errors.state && <p className="text-sale text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input type="text" value={form.zip} onChange={set('zip')} placeholder="10001" className={inputCls('zip')} />
                    {errors.zip && <p className="text-sale text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 123-4567" className={inputCls('phone')} />
                  {errors.phone && <p className="text-sale text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <button onClick={nextStep} className="w-full mt-8 py-3.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors">
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Step 2: Shipping Method */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-2">Shipping Method</h2>
              <p className="text-sm text-gray-500 mb-6">Shipping to {form.address}, {form.city}, {form.state} {form.zip}</p>

              <div className="space-y-3">
                {shippingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${form.shippingMethod === opt.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={form.shippingMethod === opt.id}
                        onChange={set('shippingMethod')}
                        className="accent-primary w-4 h-4"
                      />
                      <div>
                        <p className="text-sm font-semibold">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">{opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 py-3.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lock size={20} /> Secure Payment
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={inputCls('cardNumber')}
                    />
                    <CreditCard size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.cardNumber && <p className="text-sale text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name on Card</label>
                  <input type="text" value={form.cardName} onChange={set('cardName')} placeholder="John Doe" className={inputCls('cardName')} />
                  {errors.cardName && <p className="text-sale text-xs mt-1">{errors.cardName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={inputCls('expiry')}
                    />
                    {errors.expiry && <p className="text-sale text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      placeholder="123"
                      maxLength={4}
                      className={inputCls('cvv')}
                    />
                    {errors.cvv && <p className="text-sale text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 p-3 bg-success/10 rounded-lg">
                <ShieldCheck size={18} className="text-success" />
                <p className="text-xs text-success font-medium">Your payment information is encrypted and secure.</p>
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(2)} className="flex-1 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="flex-1 py-3.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Processing...
                    </>
                  ) : (
                    <>Place Order — ${total.toFixed(2)}</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-md" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                  </div>
                  <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal >= 50 && shippingCost === 0 && (
              <div className="flex items-center gap-2 mt-4 p-2.5 bg-success/10 rounded-lg">
                <Truck size={16} className="text-success" />
                <p className="text-xs text-success font-medium">You qualify for free shipping!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
