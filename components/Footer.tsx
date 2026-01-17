
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-4">ALVM BUSINESS</h3>
            <p className="text-gray-500 text-sm">
              Votre partenaire privilégié pour la vente de marchandises, le design graphique et le développement numérique.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Transaction: 0976903760</li>
              <li>WhatsApp: 0829373462</li>
              <li>Email: contact@alvm-business.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Suivez-nous</h3>
            <div className="flex space-x-6">
               <span className="text-gray-400 hover:text-red-600 cursor-pointer">Facebook</span>
               <span className="text-gray-400 hover:text-red-600 cursor-pointer">Instagram</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-400">&copy; 2025 ALVM BUSINESS. Tous droits réservés.</p>
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xs text-gray-300 hover:text-red-500 font-medium uppercase tracking-tighter">Accès Gestionnaire</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
