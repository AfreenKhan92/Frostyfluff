import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI, cartAPI } from '../services/api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)          // { id, name, email, role }
  const [token, setToken] = useState(() => localStorage.getItem('ff_token') || null)
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 })
  const [loadingAuth, setLoadingAuth] = useState(true)

  // ── Persist token ───────────────────────────────────────
  useEffect(() => {
    if (token) localStorage.setItem('ff_token', token)
    else localStorage.removeItem('ff_token')
  }, [token])

  // ── Restore session on mount ────────────────────────────
  useEffect(() => {
    const restore = async () => {
      if (!token) { setLoadingAuth(false); return }
      try {
        const res = await authAPI.getMe()
        setUser(res.data)
        const cartRes = await cartAPI.get()
        setCart(cartRes.data)
      } catch {
        // Token expired / invalid
        setToken(null)
        setUser(null)
      } finally {
        setLoadingAuth(false)
      }
    }
    restore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auth Actions ────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const res = await authAPI.login(email, password)
    setToken(res.data.token)
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role })
    // Fetch cart after login
    try {
      const cartRes = await cartAPI.get()
      setCart(cartRes.data)
    } catch { /* ignore */ }
    return res
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await authAPI.register(name, email, password)
    setToken(res.data.token)
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role })
    return res
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setCart({ items: [], totalItems: 0, totalPrice: 0 })
  }, [])

  // ── Cart Actions ────────────────────────────────────────
  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!user) throw new Error('Please sign in to add items to your cart')
    const res = await cartAPI.add(productId, quantity)
    setCart(res.data)
    return res
  }, [user])

  const removeFromCart = useCallback(async (productId) => {
    const res = await cartAPI.remove(productId)
    setCart(res.data)
    return res
  }, [])

  const updateCartItem = useCallback(async (productId, quantity) => {
    const res = await cartAPI.update(productId, quantity)
    setCart(res.data)
    return res
  }, [])

  const clearCart = useCallback(async () => {
    const res = await cartAPI.clear()
    setCart(res.data)
    return res
  }, [])

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
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
