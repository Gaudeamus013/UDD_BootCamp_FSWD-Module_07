import React, { Suspense, lazy, createContext, useReducer, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Definición de Contextos
const AuthContext = createContext();
const CartContext = createContext();

// Reducers para manejar el estado global
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Lazy loading de componentes
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
  const [authState, authDispatch] = useReducer(authReducer, { isAuthenticated: false, user: null });
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <CartContext.Provider value={{ cartState, cartDispatch }}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;

// Hooks personalizados para usar los contextos de autenticación y carrito
export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);