import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Cruz & Valencia - Perfumería de Niche</title>
          <meta name="description" content="Descubre los mejores perfumes de nicho en Cruz & Valencia, con envíos a todo Chile y al extranjero." />
          <meta name="keywords" content="perfumería, perfumes de nicho, perfumes exclusivos, Cruz & Valencia" />
        </Helmet>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos/:id" element={<ProductPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/historial-pedidos" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
            <Route path="/inventario" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;