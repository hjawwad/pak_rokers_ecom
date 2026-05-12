import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Contact from './pages/Contact';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsExchanges from './pages/ReturnsExchanges';
import FAQ from './pages/FAQ';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <Routes>
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes (protected) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>

            {/* Store Routes */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col">
                  <AnnouncementBar />
                  <Header onCartOpen={() => setCartOpen(true)} />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:slug" element={<ProductDetail />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-confirmation" element={<OrderConfirmation />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/shipping-policy" element={<ShippingPolicy />} />
                      <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
                      <Route path="/faq" element={<FAQ />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </div>
              }
            />
          </Routes>
        </CartProvider>
      </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
