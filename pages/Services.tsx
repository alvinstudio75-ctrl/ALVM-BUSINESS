
import React, { useState, useEffect } from 'react';
import { StorageService } from '../storage';
import { DigitalService } from '../types';

const Services: React.FC = () => {
  const [services, setServices] = useState<DigitalService[]>([]);
  const whatsappNumber = "0829373462";

  useEffect(() => {
    const storedServices = StorageService.getDigitalServices();
    setServices(storedServices);
  }, []);

  const contactWhatsApp = (service: string) => {
    const text = encodeURIComponent(`Bonjour ALVM BUSINESS, je souhaiterais obtenir un devis pour : ${service}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Services Numériques</h1>
        <p className="text-xl text-gray-600">Solutions innovantes pour votre transformation digitale.</p>
      </div>

      {services.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Fallback default if nothing added yet */}
            <div className="bg-white p-10 rounded-3xl border shadow-sm text-center">
                <h2 className="text-2xl font-bold mb-4">Création Web</h2>
                <p className="text-gray-500 mb-6">Ajoutez vos services via le panneau d'administration pour les afficher ici.</p>
                <button onClick={() => contactWhatsApp("Site Web")} className="w-full btn-gradient text-white py-4 rounded-2xl font-bold">Nous contacter</button>
            </div>
            <div className="bg-white p-10 rounded-3xl border shadow-sm text-center">
                <h2 className="text-2xl font-bold mb-4">Applications Mobile</h2>
                <p className="text-gray-500 mb-6">Personnalisez cette section depuis l'espace admin.</p>
                <button onClick={() => contactWhatsApp("Application Mobile")} className="w-full btn-gradient text-white py-4 rounded-2xl font-bold">Nous contacter</button>
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col items-center text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg overflow-hidden">
                {service.imageUrl ? (
                    <img src={service.imageUrl} className="w-full h-full object-cover" />
                ) : (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                )}
              </div>
              <h2 className="text-3xl font-extrabold mb-6 uppercase">{service.title}</h2>
              <p className="text-gray-500 mb-6">{service.description}</p>
              <ul className="text-gray-600 mb-10 space-y-4 text-lg w-full text-left inline-block">
                {service.features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2">
                        <span className="text-red-500 font-bold">✓</span>
                        <span>{f}</span>
                    </li>
                ))}
              </ul>
              <button 
                onClick={() => contactWhatsApp(service.title)}
                className="w-full btn-gradient text-white py-4 rounded-2xl font-bold text-xl"
              >
                Demander un devis
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 p-8 bg-gray-50 rounded-3xl text-center">
        <h3 className="text-2xl font-bold mb-4">Besoin d'un accompagnement personnalisé ?</h3>
        <p className="text-gray-600 mb-8">Contactez-nous directement pour discuter de votre projet.</p>
        <button onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')} className="text-red-600 font-bold hover:underline">WhatsApp Direct →</button>
      </div>
    </div>
  );
};

export default Services;
