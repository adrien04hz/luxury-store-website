'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  make_id: number;
  model: string;
  year: number;
  price: number;
  description: string;
  images: string[];
  quantity: number;
}

interface CartContextType {
  count: number;
  setCount: (count: number) => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);

  // Al cargar el context, obtenemos count e items de la API
  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch('http://127.0.0.1:8000/cart');
      const data = await res.json();
      setCount(data.count);
      setItems(data.cart || []); // en caso de que la API devuelva items
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ count, setCount, items, setItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el context fácilmente
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return context;
}