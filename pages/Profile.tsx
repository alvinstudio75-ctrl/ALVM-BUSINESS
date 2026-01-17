
import React, { useEffect, useState } from 'react';
import { StorageService } from '../storage';
import { Order, User } from '../types';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = StorageService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    const allOrders = StorageService.getOrders();
    setMyOrders(allOrders.filter(o => o.userId === currentUser.id));
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center space-x-6 mb-16">
        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-black shadow-xl">
          {user.name[0]}
        </div>
        <div>
          <h1 className="text-4xl font-black">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <h2 className="text-xl font-black mb-6">Mon Adresse</h2>
            {user.address ? (
              <div className="space-y-2 text-gray-600">
                <p><strong>Pays:</strong> {user.address.country}</p>
                <p><strong>Ville:</strong> {user.address.city}</p>
                <p><strong>Commune:</strong> {user.address.commune}</p>
                <p><strong>Quartier:</strong> {user.address.neighborhood}</p>
                <p><strong>Avenue:</strong> {user.address.avenue}</p>
                <p><strong>Numéro:</strong> {user.address.houseNumber}</p>
              </div>
            ) : <p className="text-red-500 italic">Veuillez mettre à jour votre adresse.</p>}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-black">Mes Commandes</h2>
          {myOrders.length === 0 ? (
            <div className="p-20 bg-gray-50 rounded-3xl text-center text-gray-400 font-bold">
              Vous n'avez pas encore passé de commande.
            </div>
          ) : (
            <div className="space-y-6">
              {myOrders.map(order => (
                <div key={order.id} className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase">Commande #{order.id.slice(-5)}</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black ${order.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status === 'delivered' ? '✓ COMMANDE LIVRÉE AVEC SUCCÈS' : '⏳ EN COURS DE PRÉPARATION'}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between font-bold">
                        <span>{item.name} x1</span>
                        <span>{item.price.toLocaleString()} FC</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-gray-400">Total payé</span>
                    <span className="text-2xl font-black text-red-600">{order.totalPrice.toLocaleString()} FC</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
