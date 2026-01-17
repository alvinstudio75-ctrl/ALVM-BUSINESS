
export interface Address {
  country: string;
  city: string;
  commune: string;
  neighborhood: string;
  avenue: string;
  houseNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Ajouté pour la vérification
  role: 'admin' | 'user';
  address?: Address;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  deliveryTime: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  address?: Address;
  items: { productId: string; name: string; quantity: number; price: number }[];
  totalPrice: number;
  status: 'pending' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface DigitalService {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface CustomDesignOrder {
  id: string;
  userId: string;
  userName: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
}
