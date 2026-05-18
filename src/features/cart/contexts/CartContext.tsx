import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../models/cart-item.model";
import { cartService, calcTotal } from "../services/cart.service";

interface ICartContextProps {
    items: CartItem[];
    totalPrice: number;
    isLoading: boolean;
    loadCart: () => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    addToCart: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<ICartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadCart = useCallback(async () => {
        setIsLoading(true);
        const res = await cartService.getCartItems();
        if (res.success && res.data) {
            setItems(res.data);
        }
        setIsLoading(false);
    }, []);

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        await cartService.updateQuantity(productId, quantity);
        await loadCart();
    };

    const removeItem = async (productId: string) => {
        await cartService.removeFromCart(productId);
        await loadCart();
    };

    const addToCart = async (productId: string, quantity: number) => {
        await cartService.addToCart(productId, quantity);
        await loadCart(); 
    };

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const totalPrice = calcTotal(items);

    return (
        <CartContext.Provider value={{ items, totalPrice, isLoading, loadCart, updateQuantity, removeItem, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook tiện ích để dùng trong UI
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
