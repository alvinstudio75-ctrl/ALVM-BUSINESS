
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../storage';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const users = StorageService.getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      StorageService.setCurrentUser(user);
      alert(`Content de vous revoir, ${user.name} !`);
      // Utilisation d'un redirect avec rechargement pour mettre à jour l'état global proprement
      window.location.href = '#/';
      window.location.reload();
    } else {
      alert("Email ou mot de passe incorrect. Veuillez vérifier vos identifiants ou créer un compte.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gradient uppercase tracking-tighter">Connexion</h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">Votre espace ALVM BUSINESS</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email professionnel</label>
            <input 
              type="email" 
              required 
              placeholder="votre@email.com"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-red-500 outline-none transition font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mot de passe</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-red-500 outline-none transition font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full btn-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl transition transform active:scale-95 ${loading ? 'opacity-70' : 'hover:scale-[1.02]'}`}
          >
            {loading ? 'CHARGEMENT...' : 'SE CONNECTER'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 font-medium">
            Pas encore de compte ?<br />
            <Link to="/register" className="text-red-600 font-black hover:underline">Inscrivez-vous ici</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
