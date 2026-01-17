
import React, { useState, useEffect } from 'react';
import { StorageService } from '../storage';
import { Design } from '../types';
import ImageModal from '../components/ImageModal';

const Designs: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDesc, setOrderDesc] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setDesigns(StorageService.getDesigns());
  }, []);

  const handleCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const user = StorageService.getCurrentUser();
    if (!user) {
      alert("Veuillez vous connecter pour passer une commande.");
      return;
    }

    StorageService.saveDesignOrder({
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      description: orderDesc,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    alert("Votre demande de design a été envoyée ! Un administrateur vous contactera bientôt.");
    setOrderDesc('');
    setShowOrderForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Design Graphique</h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium">Découvrez notre portfolio ou commandez un design sur-mesure pour votre image de marque.</p>
        </div>
        <button 
          onClick={() => setShowOrderForm(!showOrderForm)}
          className="btn-gradient text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition"
        >
          {showOrderForm ? 'Fermer le formulaire' : 'Commander un Design'}
        </button>
      </div>

      {showOrderForm && (
        <div className="mb-16 bg-white p-10 rounded-[2.5rem] border-2 border-red-50 shadow-2xl max-w-2xl animate-in slide-in-from-top-4 duration-300">
          <h2 className="text-2xl font-black mb-6">Décrivez votre projet</h2>
          <form onSubmit={handleCustomOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Votre besoin (Logo, Affiche, etc.)</label>
              <textarea 
                className="w-full p-6 border-2 border-gray-50 bg-gray-50 rounded-3xl focus:ring-4 focus:ring-red-100 outline-none transition font-medium" 
                rows={4} 
                required
                value={orderDesc}
                onChange={(e) => setOrderDesc(e.target.value)}
                placeholder="Ex: Je souhaite un logo minimaliste pour ma nouvelle boutique de cosmétiques..."
              />
            </div>
            <button type="submit" className="w-full btn-gradient text-white py-5 rounded-2xl font-black text-lg shadow-xl">Envoyer la demande</button>
          </form>
        </div>
      )}

      {designs.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
          <p className="text-2xl font-bold text-gray-300 italic">Aucune création publiée dans le portfolio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {designs.map(design => (
            <div key={design.id} className="group overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl">
              <div 
                className="aspect-w-16 aspect-h-9 h-72 overflow-hidden bg-gray-50 cursor-zoom-in relative"
                onClick={() => setSelectedImage(design.imageUrl)}
              >
                <img 
                  src={design.imageUrl} 
                  alt={design.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/90 p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition duration-300">
                     <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                   </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-3 text-gray-800">{design.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">{design.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ImageModal 
        isOpen={!!selectedImage} 
        imageUrl={selectedImage || ''} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default Designs;
