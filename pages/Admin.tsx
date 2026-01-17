
import React, { useState, useEffect } from 'react';
import { StorageService } from '../storage';
import { Product, Design, Order, User, DigitalService } from '../types';

const Admin: React.FC = () => {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'designs' | 'services' | 'orders' | 'users'>('orders');

  // Form states
  const [productForm, setProductForm] = useState<Partial<Product>>({ name: '', description: '', price: 0, category: 'Marchandise', imageUrl: '', deliveryTime: '' });
  const [designForm, setDesignForm] = useState<Partial<Design>>({ title: '', description: '', imageUrl: '' });
  const [serviceForm, setServiceForm] = useState<Partial<DigitalService>>({ title: '', description: '', features: [], imageUrl: '' });
  const [newFeature, setNewFeature] = useState('');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [services, setServices] = useState<DigitalService[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const checkAuth = sessionStorage.getItem('alvm_admin_auth');
    if (checkAuth === 'true') setIsAdminAuth(true);
  }, []);

  useEffect(() => {
    if (isAdminAuth) refreshData();
  }, [isAdminAuth]);

  const refreshData = () => {
    setProducts(StorageService.getProducts());
    setDesigns(StorageService.getDesigns());
    setServices(StorageService.getDigitalServices());
    setOrders(StorageService.getOrders());
    setUsers(StorageService.getUsers());
  };

  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    
    // Limitation à 2Mo pour le localStorage
    if (file.size > 2 * 1024 * 1024) {
      alert("L'image est trop lourde (Max 2 Mo). Veuillez la compresser.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        callback(result);
      }
    };
    reader.onerror = () => alert("Erreur lors de la lecture de l'image.");
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '2026') {
      setIsAdminAuth(true);
      sessionStorage.setItem('alvm_admin_auth', 'true');
    } else {
      alert('Code d\'accès incorrect !');
      setAccessCode('');
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.imageUrl) return alert("Veuillez sélectionner une image.");
    const item: Product = {
      id: Date.now().toString(),
      name: productForm.name || '',
      description: productForm.description || '',
      price: Number(productForm.price) || 0,
      category: productForm.category || 'Marchandise',
      imageUrl: productForm.imageUrl || '',
      deliveryTime: productForm.deliveryTime || 'Sous 48h'
    };
    StorageService.saveProduct(item);
    setProductForm({ name: '', description: '', price: 0, category: 'Marchandise', imageUrl: '', deliveryTime: '' });
    refreshData();
    alert("Produit publié !");
  };

  const addDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designForm.imageUrl) return alert("Veuillez sélectionner une image.");
    const item: Design = {
      id: Date.now().toString(),
      title: designForm.title || '',
      description: designForm.description || '',
      imageUrl: designForm.imageUrl || ''
    };
    StorageService.saveDesign(item);
    setDesignForm({ title: '', description: '', imageUrl: '' });
    refreshData();
    alert("Design ajouté !");
  };

  const addService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.imageUrl) return alert("Veuillez sélectionner une image.");
    const item: DigitalService = {
      id: Date.now().toString(),
      title: serviceForm.title || '',
      description: serviceForm.description || '',
      features: serviceForm.features || [],
      imageUrl: serviceForm.imageUrl || ''
    };
    StorageService.saveDigitalService(item);
    setServiceForm({ title: '', description: '', features: [], imageUrl: '' });
    refreshData();
    alert("Service ajouté !");
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setServiceForm(prev => ({ ...prev, features: [...(prev.features || []), newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const confirmDelivery = (id: string) => {
    StorageService.updateOrderStatus(id, 'delivered');
    refreshData();
    alert("Livraison confirmée.");
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full p-10 bg-white shadow-2xl rounded-[3rem] border border-red-50 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-black mb-8 text-gray-900 uppercase">Administration</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={accessCode} 
              onChange={(e) => setAccessCode(e.target.value)} 
              className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-center text-3xl font-black focus:border-red-500 outline-none transition" 
              placeholder="CODE" 
              autoFocus
            />
            <button type="submit" className="w-full btn-gradient text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition">ACCÉDER</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-3xl font-black text-gray-900 uppercase">Gestion ALVM BUSINESS</h1>
          <button 
            onClick={() => { sessionStorage.removeItem('alvm_admin_auth'); setIsAdminAuth(false); }} 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition"
          >
            Déconnexion
          </button>
        </div>

        <div className="flex space-x-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {[
            { id: 'orders', label: 'Commandes', icon: '📦' },
            { id: 'products', label: 'Produits', icon: '🛒' },
            { id: 'designs', label: 'Portfolio', icon: '🎨' },
            { id: 'services', label: 'Web/Apps', icon: '💻' },
            { id: 'users', label: 'Utilisateurs', icon: '👥' }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`px-6 py-3 rounded-2xl font-black whitespace-nowrap transition flex items-center space-x-2 ${activeTab === tab.id ? 'gradient-primary text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-6 text-gray-800">Gestion des Commandes</h2>
            <div className="grid grid-cols-1 gap-6">
              {orders.sort((a,b) => b.id.localeCompare(a.id)).map(order => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Commande #{order.id.slice(-6)}</span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status === 'delivered' ? '✓ LIVRÉE' : '⏳ EN ATTENTE'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">{order.userName}</h3>
                      <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 space-y-4">
                      <h4 className="text-[12px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Adresse de Livraison Complète
                      </h4>
                      {order.address ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-gray-800">
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Pays</p>
                            <p>{order.address.country}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Ville</p>
                            <p>{order.address.city}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Commune</p>
                            <p>{order.address.commune}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Quartier</p>
                            <p>{order.address.neighborhood}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Avenue</p>
                            <p>{order.address.avenue}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400 uppercase text-[10px]">Numéro / Maison</p>
                            <p>{order.address.houseNumber}</p>
                          </div>
                        </div>
                      ) : <p className="text-sm text-red-500 italic">Adresse non renseignée</p>}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Articles commandés</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm font-black bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <span>{item.name} <span className="text-red-500 ml-2">x{item.quantity}</span></span>
                            <span>{item.price.toLocaleString()} FC</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t-2 border-dashed border-gray-200 font-black text-3xl">
                        <span className="text-gray-400 text-lg uppercase">Total</span>
                        <span className="text-red-600">{order.totalPrice.toLocaleString()} FC</span>
                      </div>
                    </div>
                    {order.status === 'pending' && (
                      <button onClick={() => confirmDelivery(order.id)} className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-green-700 transition transform active:scale-95 mt-8">
                        CONFIRMER LA LIVRAISON
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div className="text-center py-24 bg-white rounded-[3rem] text-gray-400 font-bold italic">Aucune commande.</div>}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-[2rem] border shadow-sm h-fit space-y-6">
              <h2 className="text-xl font-black mb-4">Nouveau Produit</h2>
              <form onSubmit={addProduct} className="space-y-4">
                <input type="text" placeholder="Nom" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Prix (FC)" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} required />
                  <input type="text" placeholder="Délai livraison" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={productForm.deliveryTime} onChange={e => setProductForm({...productForm, deliveryTime: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Image</label>
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (b64) => setProductForm({...productForm, imageUrl: b64})); }} className="text-xs w-full p-3 bg-gray-50 rounded-xl border cursor-pointer" />
                  {productForm.imageUrl && <img src={productForm.imageUrl} className="h-40 w-full object-cover rounded-2xl border mt-2" />}
                </div>
                <button type="submit" className="w-full btn-gradient text-white py-4 rounded-xl font-black shadow-lg">AJOUTER</button>
              </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative group">
                  <img src={p.imageUrl} className="h-48 w-full object-cover rounded-2xl mb-4" />
                  <button onClick={() => { if(confirm("Supprimer ?")) { StorageService.deleteProduct(p.id); refreshData(); } }} className="absolute top-6 right-6 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition">✕</button>
                  <h3 className="font-black text-gray-800">{p.name}</h3>
                  <p className="text-red-600 font-black text-sm">{p.price.toLocaleString()} FC</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'designs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-[2rem] border shadow-sm h-fit space-y-6">
              <h2 className="text-xl font-black mb-4">Portfolio Design</h2>
              <form onSubmit={addDesign} className="space-y-4">
                <input type="text" placeholder="Titre" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={designForm.title} onChange={e => setDesignForm({...designForm, title: e.target.value})} required />
                <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={designForm.description} onChange={e => setDesignForm({...designForm, description: e.target.value})} required />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Image du design</label>
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (b64) => setDesignForm({...designForm, imageUrl: b64})); }} className="text-xs w-full p-3 bg-gray-50 rounded-xl border cursor-pointer" />
                  {designForm.imageUrl && <img src={designForm.imageUrl} className="h-40 w-full object-cover rounded-2xl border mt-2" />}
                </div>
                <button type="submit" className="w-full btn-gradient text-white py-4 rounded-xl font-black shadow-lg">AJOUTER AU PORTFOLIO</button>
              </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {designs.map(d => (
                <div key={d.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                  <img src={d.imageUrl} className="h-40 w-full object-cover rounded-xl mb-3" />
                  <button onClick={() => { if(confirm("Supprimer ?")) { StorageService.deleteDesign(d.id); refreshData(); } }} className="absolute top-5 right-5 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                  <h3 className="font-bold text-gray-800 text-sm truncate">{d.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-[2rem] border shadow-sm h-fit space-y-6">
              <h2 className="text-xl font-black mb-4">Nouveau Service</h2>
              <form onSubmit={addService} className="space-y-4">
                <input type="text" placeholder="Nom du service" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} required />
                <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-xl border focus:border-red-500 outline-none font-medium" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} required />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Caractéristiques</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Ajouter point..." className="flex-1 p-3 bg-gray-50 rounded-xl border text-sm" value={newFeature} onChange={e => setNewFeature(e.target.value)} />
                    <button type="button" onClick={addFeature} className="bg-red-600 text-white px-4 rounded-xl font-bold">+</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {serviceForm.features?.map((f, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 flex items-center">
                        {f} <button type="button" onClick={() => setServiceForm(prev => ({...prev, features: prev.features?.filter((_, idx) => idx !== i)}))} className="ml-2 text-red-500">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Icône</label>
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], (b64) => setServiceForm({...serviceForm, imageUrl: b64})); }} className="text-xs w-full p-3 bg-gray-50 rounded-xl border cursor-pointer" />
                </div>
                <button type="submit" className="w-full btn-gradient text-white py-4 rounded-xl font-black shadow-lg">ENREGISTRER</button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {services.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-3xl flex items-center justify-between border border-gray-100 shadow-sm">
                   <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center overflow-hidden">
                        <img src={s.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-black text-gray-800">{s.title}</h3>
                   </div>
                   <button onClick={() => { if(confirm("Supprimer ?")) { StorageService.deleteDigitalService(s.id); refreshData(); } }} className="text-red-500 font-bold hover:underline">Supprimer</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-[2.5rem] border shadow-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Client</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Email</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Localisation</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="px-8 py-5 font-bold text-gray-900">{u.name}</td>
                    <td className="px-8 py-5 text-gray-600">{u.email}</td>
                    <td className="px-8 py-5 text-xs text-gray-500 font-bold uppercase">
                      {u.address ? `${u.address.city}, ${u.address.country}` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
