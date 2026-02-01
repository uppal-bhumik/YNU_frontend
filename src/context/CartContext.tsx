import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

// Cart Item TypeScript Interface
interface CartItem {
    id: number;
    peer_id: number;
    peer_name: string;
    peer_university: string;
    peer_program: string;
    peer_location: string;
    peer_profile_image_url: string;
    charges: number;
    state: 'in_cart' | 'checkout_in_progress';
    created_at: string;
}

// Cart Context Interface
interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    isInCart: (peerId: number) => boolean;
    addToCart: (peer: any) => Promise<void>;
    removeFromCart: (cartItemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    syncCart: () => Promise<void>;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);



const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ||
    (window as any).__API_BASE__ ||
    'https://ynu-backend.onrender.com';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Get auth token
    const getToken = () => {
        return localStorage.getItem('sc_token') ||
            sessionStorage.getItem('sc_token') ||
            (window as any).user?.token || '';
    };

    // Sync cart from backend
    const syncCart = useCallback(async () => {
        if (!user || !user.id) {
            // User not logged in, load from localStorage
            const localCart = localStorage.getItem('cart_items');
            if (localCart) {
                try {
                    setCartItems(JSON.parse(localCart));
                } catch (e) {
                    console.error('Failed to parse local cart:', e);
                }
            }
            return;
        }

        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE}/api/cart/items`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
                // Sync to localStorage for instant UX
                localStorage.setItem('cart_items', JSON.stringify(data));
            } else if (response.status === 401) {
                // Token invalid, clear cart
                setCartItems([]);
                localStorage.removeItem('cart_items');
            }
        } catch (error) {
            console.error('Failed to sync cart:', error);
            // Fallback to localStorage
            const localCart = localStorage.getItem('cart_items');
            if (localCart) {
                try {
                    setCartItems(JSON.parse(localCart));
                } catch (e) {
                    console.error('Failed to parse local cart:', e);
                }
            }
        }
    }, [user]);

    // Sync cart on mount and when user changes
    useEffect(() => {
        syncCart();
    }, [syncCart]);

    // Add to cart
    const addToCart = async (peer: any) => {
        if (!user || !user.id) {
            alert('Please log in to add items to cart');
            return;
        }

        const token = getToken();
        if (!token) {
            alert('Please log in to continue');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ peer_counsellor_id: peer.id })
            });

            if (response.ok) {
                const data = await response.json();
                // Add to local state
                const newItem: CartItem = {
                    id: data.id,
                    peer_id: data.peer_id,
                    peer_name: data.peer_name,
                    peer_university: data.peer_university,
                    peer_program: data.peer_program,
                    peer_location: data.peer_location,
                    peer_profile_image_url: data.peer_profile_image_url,
                    charges: data.charges || 699,
                    state: data.state,
                    created_at: data.created_at
                };

                // Check if already exists (backend returns existing)
                const existingIndex = cartItems.findIndex(item => item.id === newItem.id);
                let updatedCart;
                if (existingIndex >= 0) {
                    updatedCart = cartItems;
                } else {
                    updatedCart = [newItem, ...cartItems];
                }

                setCartItems(updatedCart);
                localStorage.setItem('cart_items', JSON.stringify(updatedCart));

                // Show success message (you can use a toast library here)
                console.log(data.message || 'Added to cart successfully');
            } else {
                const error = await response.json();
                alert(error.detail || 'Failed to add to cart');
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Remove from cart
    const removeFromCart = async (cartItemId: number) => {
        if (!user || !user.id) return;

        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/cart/remove/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Remove from local state
                const updatedCart = cartItems.filter(item => item.id !== cartItemId);
                setCartItems(updatedCart);
                localStorage.setItem('cart_items', JSON.stringify(updatedCart));
            } else {
                const error = await response.json();
                alert(error.detail || 'Failed to remove item');
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Clear cart
    const clearCart = async () => {
        if (!user || !user.id) {
            setCartItems([]);
            localStorage.removeItem('cart_items');
            return;
        }

        const token = getToken();
        if (!token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/cart/clear`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setCartItems([]);
                localStorage.removeItem('cart_items');
            } else {
                const error = await response.json();
                alert(error.detail || 'Failed to clear cart');
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Check if peer is in cart
    const isInCart = (peerId: number): boolean => {
        return cartItems.some(item => item.peer_id === peerId);
    };

    const value: CartContextType = {
        cartItems,
        cartCount: cartItems.length,
        isInCart,
        addToCart,
        removeFromCart,
        clearCart,
        syncCart,
        loading
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
