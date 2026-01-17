
import React, { useState, useEffect } from 'react';
import { StorageService } from '../storage';
import { Product } from '../types';
import ImageModal from '../components/ImageModal';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchedProducts = StorageService.getProducts();
    setProducts(fetchedProducts);
    // Initialiser les quantités à 1 pour chaque produit
    const initialQuants: { [key: string]: number } = {};
    fetchedProducts.forEach(p => initialQuants[p.id] = 1);
    setQuantities(initialQuants);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const addToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const cart = JSON.parse(localStorage.getItem('alvm_cart') || '[]');
    
    // Vérifier si le produit est déjà dans le panier
    const existingIndex = cart.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    
    localStorage.setItem('alvm_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    alert(`${qty} x ${product.name} ajouté(s) au panier.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900">BOUTIQUE ALVM</h1>
          <p className="text-gray-500 mt-2 font-medium">Découvrez nos marchandises exclusives</p>
        </div>
        <div className="bg-gray-100 px-6 py-2 rounded-full text-gray-600 font-bold text-sm">
          {products.length} ARTICLES DISPONIBLES
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-32 border-4 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/50">
          <p className="text-2xl font-bold text-gray-400">Le stock est vide pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
              <div 
                className="h-72 bg-gray-50 overflow-hidden cursor-zoom-in relative"
                onClick={() => setSelectedImage(product.imageUrl)}
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-red-600 shadow-sm">
                  ⏱ {product.deliveryTime || 'N/A'}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded w-fit mb-2">{product.category}</span>
                <h3 className="text-xl font-black text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-3 line-clamp-2 font-medium flex-grow">{product.description}</p>
                
                {/* Sélecteur de Quantité */}
                <div className="mt-6 flex items-center bg-gray-50 rounded-xl p-1 w-fit border border-gray-100">
                  <button 
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-8 h-8 flex items-center justify-center font-black text-gray-500 hover:text-red-600 transition"
                  >–</button>
                  <span className="w-10 text-center font-black text-gray-800">{quantities[product.id] || 1}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-8 h-8 flex items-center justify-center font-black text-gray-500 hover:text-red-600 transition"
                  >+</button>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-black text-red-600">{product.price.toLocaleString()} FC</span>
                  <button onClick={() => addToCart(product)} className="btn-gradient text-white px-5 h-12 rounded-2xl shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="font-black text-xs uppercase">Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ImageModal isOpen={!!selectedImage} imageUrl={selectedImage || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default Shop;
