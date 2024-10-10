import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const InventoryPage = lazy(() => import('./pages/InventoryPage'));

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
          <Suspense fallback={<div>Cargando...</div>}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;