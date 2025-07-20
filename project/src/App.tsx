import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MartSelection from './pages/MartSelection';
import ProductBrowsing from './pages/ProductBrowsing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import OrderStatus from './pages/OrderStatus';
import MartLogin from './pages/MartLogin';
import MartRegister from './pages/MartRegister';
import MartDashboard from './pages/MartDashboard';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { MartAuthProvider } from './context/MartAuthContext';
import ProtectedMartRoute from './components/ProtectedMartRoute';

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <MartAuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/marts" element={<MartSelection />} />
                <Route path="/products/:martId" element={<ProductBrowsing />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/receipt/:orderId" element={<Receipt />} />
                <Route path="/order-status/:orderId" element={<OrderStatus />} />
                
                {/* Mart Routes */}
                <Route path="/mart/login" element={<MartLogin />} />
                <Route path="/mart/register" element={<MartRegister />} />
                <Route 
                  path="/mart/dashboard" 
                  element={
                    <ProtectedMartRoute>
                      <MartDashboard />
                    </ProtectedMartRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </MartAuthProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;