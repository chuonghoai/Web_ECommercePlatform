// src/features/cart/contexts/CartProvider.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface CartContextType {
    cartCount: number;
    setCartCount: (count: number) => void;
    incrementCart: (amount?: number) => void;
    decrementCart: (amount?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);

    const incrementCart = (amount = 1) => {
        setCartCount((prev) => prev + amount);
    };

    const decrementCart = (amount = 1) => {
        setCartCount((prev) => Math.max(0, prev - amount));
    };

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, incrementCart, decrementCart }}>
            {children}
        </CartContext.Provider>
    );
};