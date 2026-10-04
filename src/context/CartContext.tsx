"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  image: string;
  sku?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, newQty: number) => void;
  removeItem: (id: string) => void;
  itemCount: number;
  subtotal: number;
}

const defaultCart: CartItem[] = [
  {
    id: "cart-item-1",
    productId: "prod-1",
    name: "Lumière Solitaire Diamond Ring",
    variant: "18k Yellow Gold • Size 6 (US)",
    price: 85000,
    comparePrice: 95000,
    quantity: 1,
    image: "/images/hero-ring.jpg",
    sku: "ECK-SOL-18Y-6",
  },
  {
    id: "cart-item-2",
    productId: "prod-2",
    name: "Pavé Diamond Wedding Band",
    variant: "18k Yellow Gold • Size 6 (US)",
    price: 42000,
    comparePrice: 48000,
    quantity: 1,
    image: "/images/collection-hero.jpg",
    sku: "ECK-BAN-PAV-18Y",
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(defaultCart);
  const [isOpen, setIsOpen] = useState(false);

  // Close cart drawer on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variant === newItem.variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [
          {
            ...newItem,
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          },
          ...prev,
        ];
      }
    });
    setIsOpen(true); // Automatically open drawer upon adding
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
