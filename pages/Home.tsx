
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Propulsez Votre Business avec ALVM
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90">
            E-commerce de marchandises, Design Graphique de pointe et Services Numériques sur-mesure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="bg-white text-red-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
              Découvrir la boutique
            </Link>
            <Link to="/services" className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
              Nos services web
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">E-Commerce</h3>
              <p className="text-gray-600 mb-6">Vente de marchandises de qualité sélectionnées pour vous.</p>
              <Link to="/shop" className="text-red-600 font-bold hover:underline">Voir les produits →</Link>
            </div>

            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Design Graphique</h3>
              <p className="text-gray-600 mb-6">Logos, affiches et identités visuelles uniques.</p>
              <Link to="/designs" className="text-red-600 font-bold hover:underline">Nos créations →</Link>
            </div>

            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Services Web & Apps</h3>
              <p className="text-gray-600 mb-6">Création de sites internet et d'applications mobiles performants.</p>
              <Link to="/services" className="text-red-600 font-bold hover:underline">Nos prestations →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Pourquoi choisir ALVM BUSINESS ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-extrabold text-red-600 mb-2">100%</div>
              <p className="text-gray-600">Sécurisé</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">Support WhatsApp</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-red-600 mb-2">PRO</div>
              <p className="text-gray-600">Service Qualité</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-red-600 mb-2">0+</div>
              <p className="text-gray-600">Projets Lancés</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
