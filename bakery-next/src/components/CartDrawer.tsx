"use client";

import { useApp } from '../context/AppContext';

export default function CartDrawer({ onClose, onSignIn }: { onClose: () => void, onSignIn: () => void }) {
  const { user, cart, removeFromCart, updateCartItem, clearCart } = useApp();

  if (!user) {
    return (
      <DrawerShell onClose={onClose}>
        <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
          <span className="material-symbols-outlined text-6xl text-primary-container">shopping_bag</span>
          <h3 className="font-heading text-xl font-bold text-on-background">Your cart is waiting</h3>
          <p className="text-on-surface-variant text-sm">Sign in to view and manage your cart.</p>
          <button
            onClick={onSignIn}
            className="bg-primary text-on-primary font-bold px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </DrawerShell>
    );
  }

  return (
    <DrawerShell onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-surface-variant">
          <div>
            <h2 className="font-heading text-xl font-bold text-on-background">Your Cart</h2>
            <p className="text-xs text-on-surface-variant">{cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}</p>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-on-surface-variant hover:text-red-500 transition-colors cursor-pointer font-bold"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">shopping_cart</span>
              <p className="text-on-surface-variant font-medium">Your cart is empty</p>
              <button onClick={onClose} className="text-primary text-sm font-bold hover:underline cursor-pointer">
                Browse our menu →
              </button>
            </div>
          ) : (
            cart.items.map((item: any) => (
              <div key={item.id} className="flex gap-3 bg-surface-container-low p-3 rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                  {item.product?.image
                    ? <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant/30">cake</span>
                      </div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-on-background truncate">{item.product?.name || 'Unknown'}</p>
                  <p className="text-primary font-bold text-sm">${item.product?.price?.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => item.quantity <= 1 ? removeFromCart(item.product_id) : updateCartItem(item.product_id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="text-on-surface-variant hover:text-red-500 transition-colors self-start cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="p-6 border-t border-surface-variant space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant font-medium">Total</span>
              <span className="font-heading text-2xl font-bold text-primary">${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary text-on-primary font-heading text-lg font-bold py-4 rounded-xl shadow-[0_8px_20px_-8px_rgba(134,78,90,0.5)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">shopping_bag</span>
              Checkout
            </button>
          </div>
        )}
      </div>
    </DrawerShell>
  );
}

function DrawerShell({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex justify-end" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        {children}
      </div>
    </div>
  );
}
