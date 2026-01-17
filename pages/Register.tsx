
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../storage';
import { User, Address } from '../types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState<Address>({
    country: '', city: '', commune: '', neighborhood: '', avenue: '', houseNumber: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier si l'utilisateur existe déjà
    const existingUsers = StorageService.getUsers();
    if (existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert("Cet email est déjà utilisé.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password, // On stocke le mot de passe
      role: email.toLowerCase() === 'admin@alvm.com' ? 'admin' : 'user',
      address
    };

    StorageService.registerUser(newUser);
    StorageService.setCurrentUser(newUser);
    
    alert("Compte créé avec succès ! Bienvenue chez ALVM BUSINESS.");
    // Redirection propre
    window.location.href = '#/';
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-[2.5rem] shadow-2xl border border-gray-50">
      <h1 className="text-3xl font-black text-center mb-8 text-gradient uppercase">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Identifiants</h3>
            <input type="text" placeholder="Nom complet" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Adresse de livraison</h3>
            <input type="text" placeholder="Pays" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
            <input type="text" placeholder="Ville" required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-500 transition" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Commune" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" value={address.commune} onChange={(e) => setAddress({...address, commune: e.target.value})} />
              <input type="text" placeholder="Quartier" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" value={address.neighborhood} onChange={(e) => setAddress({...address, neighborhood: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Avenue" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" value={address.avenue} onChange={(e) => setAddress({...address, avenue: e.target.value})} />
              <input type="text" placeholder="Numéro" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm" value={address.houseNumber} onChange={(e) => setAddress({...address, houseNumber: e.target.value})} />
            </div>
          </div>
        </div>
        <button type="submit" className="w-full btn-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.01] active:scale-95 transition mt-6">S'INSCRIRE MAINTENANT</button>
      </form>
      <p className="mt-8 text-center text-gray-400 font-medium">
        Déjà un compte ? <Link to="/login" className="text-red-600 font-black hover:underline">Se connecter ici</Link>
      </p>
    </div>
  );
};

export default Register;
