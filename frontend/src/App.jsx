import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuthModal from './components/AuthModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CartModal from './components/CartModal';
import ProductDetails from './components/ProductDetails';
import UserOrders from './pages/UserOrders'; // ✅ Make sure this file exists and is correct
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [user, setUser] = useState(null);

const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading or initial page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);





  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const openAuthModal = () => setAuthModalOpen(true);

  // ✅ Shared layout for public pages
  const PublicLayout = ({ children }) => (
    <>
      <Header
        onLogin={openAuthModal}
        onLogout={handleLogout}
        user={user}
        onCart={() => setCartModalOpen(true)}
      />
      <main className="flex-grow-1">{children}</main>
      <Footer />
      {authModalOpen && (
        <AuthModal closeModal={() => setAuthModalOpen(false)} setUser={setUser} />
      )}
      {cartModalOpen && (
        <CartModal user={user} close={() => setCartModalOpen(false)} />
      )}
    </>
  );

  return (
    <Router>
     {loading ? (
        <LoadingSpinner />
      ) : (
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          {/* ✅ Home Page */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home
                  onGrabOffer={openAuthModal}
                  user={user}
                  openAuthModal={openAuthModal}
                />
              </PublicLayout>
            }
          />

          {/* ✅ Product Details Page */}
          <Route
            path="/product/:id"
            element={
              <PublicLayout>
                <ProductDetails />
              </PublicLayout>
            }
          />

          {/* ✅ My Orders Page */}
          <Route
            path="/orders"
            element={
              <PublicLayout>
                <UserOrders user={user} />
              </PublicLayout>
            }
          />

          {/* ✅ Admin Routes (no public layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </div>
       )}
    </Router>
  );
}

export default App;
