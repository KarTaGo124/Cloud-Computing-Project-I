import { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../interfaces/product";
import { useUser } from "./UserContext";

interface CartItem extends Product {
	quantity: number;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (item: CartItem) => void;
	clearCart: () => void;
	getCartTotal: () => number;
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
		const isItemInCart = cartItems.find(
			(cartItem) => cartItem.id === item.id
		);

		if (isItemInCart) {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			setCartItems([...cartItems, { ...item, quantity: 1 }]);
		}
	};

	const removeFromCart = (item: CartItem) => {
		const isItemInCart = cartItems.find(
			(cartItem) => cartItem.id === item.id
		);

		if (isItemInCart && isItemInCart.quantity === 1) {
			setCartItems(
				cartItems.filter((cartItem) => cartItem.id !== item.id)
			);
		} else {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				)
			);
		}
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

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		const cartItems = localStorage.getItem("cartItems");
		if (cartItems) {
			setCartItems(JSON.parse(cartItems));
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
