
import { Product, Design, User, Order, CustomDesignOrder, DigitalService } from './types';

const STORAGE_KEYS = {
  PRODUCTS: 'alvm_products',
  DESIGNS: 'alvm_designs',
  SERVICES: 'alvm_services',
  USERS: 'alvm_users',
  ORDERS: 'alvm_orders',
  DESIGN_ORDERS: 'alvm_design_orders',
  CURRENT_USER: 'alvm_current_user'
};

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = <T,>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const StorageService = {
  getProducts: (): Product[] => getFromStorage(STORAGE_KEYS.PRODUCTS, []),
  saveProduct: (product: Product) => {
    const products = StorageService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) products[index] = product;
    else products.push(product);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  },
  deleteProduct: (id: string) => {
    const products = StorageService.getProducts().filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  },

  getDesigns: (): Design[] => getFromStorage(STORAGE_KEYS.DESIGNS, []),
  saveDesign: (design: Design) => {
    const designs = StorageService.getDesigns();
    designs.push(design);
    saveToStorage(STORAGE_KEYS.DESIGNS, designs);
  },
  deleteDesign: (id: string) => {
    const designs = StorageService.getDesigns().filter(d => d.id !== id);
    saveToStorage(STORAGE_KEYS.DESIGNS, designs);
  },

  getDigitalServices: (): DigitalService[] => getFromStorage(STORAGE_KEYS.SERVICES, []),
  saveDigitalService: (service: DigitalService) => {
    const services = StorageService.getDigitalServices();
    services.push(service);
    saveToStorage(STORAGE_KEYS.SERVICES, services);
  },
  deleteDigitalService: (id: string) => {
    const services = StorageService.getDigitalServices().filter(s => s.id !== id);
    saveToStorage(STORAGE_KEYS.SERVICES, services);
  },

  getOrders: (): Order[] => getFromStorage(STORAGE_KEYS.ORDERS, []),
  saveOrder: (order: Order) => {
    const orders = StorageService.getOrders();
    orders.push(order);
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  },
  updateOrderStatus: (orderId: string, status: 'pending' | 'delivered' | 'cancelled') => {
    const orders = StorageService.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index >= 0) {
      orders[index].status = status;
      saveToStorage(STORAGE_KEYS.ORDERS, orders);
    }
  },
  deleteOrder: (id: string) => {
    const orders = StorageService.getOrders().filter(o => o.id !== id);
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  },

  getDesignOrders: (): CustomDesignOrder[] => getFromStorage(STORAGE_KEYS.DESIGN_ORDERS, []),
  saveDesignOrder: (order: CustomDesignOrder) => {
    const orders = StorageService.getDesignOrders();
    orders.push(order);
    saveToStorage(STORAGE_KEYS.DESIGN_ORDERS, orders);
  },

  getUsers: (): User[] => getFromStorage(STORAGE_KEYS.USERS, []),
  registerUser: (user: User) => {
    const users = StorageService.getUsers();
    users.push(user);
    saveToStorage(STORAGE_KEYS.USERS, users);
  },

  getCurrentUser: (): User | null => getFromStorage(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (user: User | null) => saveToStorage(STORAGE_KEYS.CURRENT_USER, user),
};
