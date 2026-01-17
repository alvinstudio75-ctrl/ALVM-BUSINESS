
import React, { useState, useEffect } from 'react';
import { StorageService } from '../storage';
import { Order } from '../types';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('alvm_cart') || '[]');
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateCartQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
    localStorage.setItem('alvm_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('alvm_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleCheckout = () => {
    const user = StorageService.getCurrentUser();
    if (!user) {
      alert("Veuillez vous connecter pour commander.");
      navigate('/login');
      return;
    }
    if (cart.length === 0) return;
    setShowPaymentConfirm(true);
  };

  const confirmOrder = () => {
    const user = StorageService.getCurrentUser()!;
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      address: user.address,
      items: cart.map(i => ({ productId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      totalPrice: total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    StorageService.saveOrder(newOrder);
    localStorage.removeItem('alvm_cart');
    setCart([]);
    setShowPaymentConfirm(false);
    alert("Commande confirmée ! Retrouvez vos commandes dans votre profil.");
    navigate('/profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-black mb-12 uppercase tracking-tighter">Votre Panier</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
          <p className="text-xl text-gray-400 mb-6 font-bold">Votre panier est vide.</p>
          <button onClick={() => navigate('/shop')} className="btn-gradient text-white px-10 py-4 rounded-full font-black shadow-lg">Aller à la boutique</button>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            {cart.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-8 last:border-0 last:pb-0 gap-4">
                <div className="flex items-center space-x-6">
                  <img src={item.imageUrl} className="w-24 h-24 rounded-[1.5rem] object-cover border shadow-sm" />
                  <div>
                    <h3 className="font-black text-xl text-gray-900">{item.name}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase mt-1">{item.category}</p>
                    <p className="text-red-600 font-black mt-1 text-sm">{item.price.toLocaleString()} FC / unité</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:space-x-12">
                  <div className="flex items-center bg-gray-100 rounded-xl p-1 border">
                    <button onClick={() => updateCartQuantity(idx, -1)} className="w-8 h-8 flex items-center justify-center font-black text-gray-500 hover:text-red-600 transition">–</button>
                    <span className="w-10 text-center font-black text-gray-800">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(idx, 1)} className="w-8 h-8 flex items-center justify-center font-black text-gray-500 hover:text-red-600 transition">+</button>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="font-black text-xl">{(item.price * item.quantity).toLocaleString()} FC</p>
                    <button onClick={() => removeItem(idx)} className="text-xs text-red-500 font-bold hover:underline mt-1 uppercase">Supprimer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-10">
            <div className="flex justify-between items-center mb-10">
              <span className="text-gray-500 font-black uppercase tracking-widest">Sous-total</span>
              <span className="text-4xl font-black text-red-600">{total.toLocaleString()} FC</span>
            </div>
            <button onClick={handleCheckout} className="w-full btn-gradient text-white py-6 rounded-3xl font-black text-2xl shadow-2xl hover:scale-[1.02] transition active:scale-95">
              PASSER LA COMMANDE
            </button>
          </div>
        </div>
      )}

      {showPaymentConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center space-y-8 animate-in zoom-in duration-200">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border-4 border-white shadow-xl">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase">Paiement</h2>
            <div className="space-y-2">
              <p className="text-gray-500 font-medium">Veuillez envoyer le montant total :</p>
              <p className="text-4xl font-black text-red-600">{total.toLocaleString()} FC</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Au numéro suivant :</p>
              <div className="bg-gray-100 py-5 rounded-2xl text-3xl font-black tracking-widest text-gray-800 border-2 border-white shadow-inner">0976903760</div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">Une fois le transfert effectué, cliquez sur le bouton ci-dessous pour confirmer.</p>
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={confirmOrder} className="btn-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl uppercase">J'ai effectué le paiement</button>
              <button onClick={() => setShowPaymentConfirm(false)} className="text-gray-400 font-black hover:text-red-600 transition uppercase text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
