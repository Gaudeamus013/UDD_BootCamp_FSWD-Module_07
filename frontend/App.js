import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import InventoryPage from './pages/InventoryPage';
import Footer from './components/Footer';

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