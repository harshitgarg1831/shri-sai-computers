"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) { }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.productId === item.productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
        alert("Product added to cart!");
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prev) => prev.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
