import { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../interfaces/product";
import { useUser } from "./UserContext";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  deleteItem: (itemId: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { id } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (id) {
      const storedCart = localStorage.getItem(`cartItems_${id}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      localStorage.setItem(`cartItems_${id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, id]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((cartItem) =>
          cartItem.id === itemId.toString()
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevItems.filter(
          (cartItem) => cartItem.id !== itemId.toString()
        );
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } else {
      deleteItem(itemId);
    }
  };

  const deleteItem = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId.toString())
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
