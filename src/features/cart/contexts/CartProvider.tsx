import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { localStorageService } from "../../../core/storage/localStorage.service";

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
    const [cartCount, setCartCount] = useState<number>(() => {
        const savedCartCount = localStorageService.get<number>("cart_count");
        return savedCartCount !== null ? savedCartCount : 0;
    });

    useEffect(() => {
        localStorageService.set("cart_count", cartCount);
    }, [cartCount]);

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