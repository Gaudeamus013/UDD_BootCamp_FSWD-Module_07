import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import ContentPage from './pages/ContentPage';
import CreadorDashboard from './pages/CreadorDashboard';
import EventoProximo from './pages/EventoProximo';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/content/:id" element={<ContentPage />} />
          <Route path="/creador-dashboard" element={<CreadorDashboard />} />
          <Route path="/evento-proximo" element={<EventoProximo />} />
        </Routes>
      </div>
    </SocketProvider>
  );
}

export default App;