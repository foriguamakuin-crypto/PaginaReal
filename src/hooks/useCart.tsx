import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity: number, unitPrice: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

function itemKey(productId: string, size: string, color: string) {
  return `${productId}__${size}__${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity: number, unitPrice: number) => {
      setItems(prev => {
        const existing = prev.find(
          i => itemKey(i.product.id, i.size, i.color) === itemKey(product.id, size, color)
        );
        if (existing) {
          return prev.map(i =>
            itemKey(i.product.id, i.size, i.color) === itemKey(product.id, size, color)
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { product, size, color, quantity, unitPrice }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems(prev =>
      prev.filter(i => itemKey(i.product.id, i.size, i.color) !== itemKey(productId, size, color))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems(prev =>
        prev.map(i =>
          itemKey(i.product.id, i.size, i.color) === itemKey(productId, size, color)
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
