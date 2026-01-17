
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../storage';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(StorageService.getCurrentUser());
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('alvm_cart') || '[]');
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    const interval = setInterval(() => setUser(StorageService.getCurrentUser()), 2000);
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setUser(null);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="gradient-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">ALVM BUSINESS</Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/shop" className="hover:text-yellow-100 font-medium transition">Boutique</Link>
            <Link to="/designs" className="hover:text-yellow-100 font-medium transition">Design</Link>
            <Link to="/services" className="hover:text-yellow-100 font-medium transition">Web & Apps</Link>
            {user && <Link to="/profile" className="hover:text-yellow-100 font-medium transition">Mes Commandes</Link>}
            {user?.role === 'admin' && (
              <Link to="/admin" className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">Admin</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-white text-red-600 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">{cartCount}</span>}
            </Link>
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="text-sm font-bold hover:underline">Profil</Link>
                <button onClick={handleLogout} className="text-xs bg-red-700/30 border border-white/20 px-3 py-1.5 rounded-lg hover:bg-red-700/50 transition font-bold">Quitter</button>
              </div>
            ) : <Link to="/login" className="text-sm bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition font-bold">Connexion</Link>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
