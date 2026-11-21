import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, PerfumeSize, CartItem, ShippingOption } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: PerfumeSize, quantity?: number) => void;
  buyNow: (product: Product, size?: PerfumeSize, quantity?: number) => void;
  removeItem: (productId: string, size: PerfumeSize) => void;
  updateQuantity: (productId: string, size: PerfumeSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedShipping: ShippingOption | null;
  setSelectedShipping: (shipping: ShippingOption | null) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const CART_STORAGE_KEY = 'smellgood_cart_v2';
const FREE_SHIPPING_THRESHOLD = 120;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>({
    type: 'pickup',
    name: 'Retirada na Loja (Sertãozinho/SP)',
    price: 0,
    estimatedDays: 0,
    description: 'Combine o horário de retirada pelo WhatsApp · Grátis',
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage error fallback
    }
  }, [items]);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  }, []);

  const addItem = useCallback((product: Product, size: PerfumeSize = '60ml', quantity = 1) => {
    const unitPrice = size === '60ml' ? product.price_60ml : product.price_15ml;
    
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prev, { product, size, quantity, unitPrice }];
    });

    showNotification(`✓ ${product.name} (${size}) adicionado à sua sacola`);
  }, [showNotification]);

  const buyNow = useCallback((product: Product, size: PerfumeSize = '60ml', quantity = 1) => {
    addItem(product, size, quantity);
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  }, [addItem]);

  const removeItem = useCallback((productId: string, size: PerfumeSize) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: PerfumeSize, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        buyNow,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        isFreeShipping,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedShipping,
        setSelectedShipping,
        notification,
        showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
