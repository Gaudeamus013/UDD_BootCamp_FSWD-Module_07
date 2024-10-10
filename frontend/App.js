import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import HomePage from './src/pages/HomePage';
import ProductPage from './src/pages/ProductPage';
import AdminDashboard from './src/pages/AdminDashboard';
import CartPage from './src/pages/CartPage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import CheckoutPage from './src/pages/CheckoutPage';
import OrderHistoryPage from './src/pages/OrderHistoryPage';
import InventoryPage from './src/pages/InventoryPage';
import Footer from './src/components/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/historial-pedidos" element={<OrderHistoryPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;