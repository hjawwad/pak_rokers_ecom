import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <AnnouncementBar />
          <Header onCartOpen={() => setCartOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
