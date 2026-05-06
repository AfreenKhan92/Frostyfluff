"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, cartAPI } from '../services/api';

interface AppContextType {
  user: any;
  token: string | null;
  cart: any;
  loadingAuth: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<any>;
  removeFromCart: (productId: string) => Promise<any>;
  updateCartItem: (productId: string, quantity: number) => Promise<any>;
  clearCart: () => Promise<any>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<any>({ items: [], totalItems: 0, totalPrice: 0 });
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Initialize token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('ff_token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Persist token
  useEffect(() => {
    if (token) localStorage.setItem('ff_token', token);
    else localStorage.removeItem('ff_token');
  }, [token]);

  // Restore session
  useEffect(() => {
    const restore = async () => {
      const savedToken = localStorage.getItem('ff_token');
      if (!savedToken) {
        setLoadingAuth(false);
        return;
      }
      try {
        const res = await authAPI.getMe();
        setUser(res.data);
        const cartRes = await cartAPI.get();
        setCart(cartRes.data);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authAPI.login(email, password);
    setToken(res.data.token);
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role });
    try {
      const cartRes = await cartAPI.get();
      setCart(cartRes.data);
    } catch { /* ignore */ }
    return res;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await authAPI.register(name, email, password);
    setToken(res.data.token);
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role });
    return res;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setCart({ items: [], totalItems: 0, totalPrice: 0 });
  }, []);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    if (!user) throw new Error('Please sign in to add items to your cart');
    const res = await cartAPI.add(productId, quantity);
    setCart(res.data);
    return res;
  }, [user]);

  const removeFromCart = useCallback(async (productId: string) => {
    const res = await cartAPI.remove(productId);
    setCart(res.data);
    return res;
  }, []);

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    const res = await cartAPI.update(productId, quantity);
    setCart(res.data);
    return res;
  }, []);

  const clearCart = useCallback(async () => {
    const res = await cartAPI.clear();
    setCart(res.data);
    return res;
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        cart,
        loadingAuth,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
