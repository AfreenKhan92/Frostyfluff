"use client";

import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="h-2 w-full bg-gradient-to-r from-primary-container via-primary to-secondary-container" />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="flex flex-col items-center mb-6">
            <h2 className="font-heading text-2xl font-bold text-on-background">
              {mode === 'login' ? 'Welcome back!' : 'Join Frosty Fluffs'}
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              {mode === 'login'
                ? 'Sign in to your account to continue'
                : 'Create an account to start ordering'}
            </p>
          </div>

          <div className="flex bg-surface-container rounded-xl p-1 mb-6">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                  mode === m
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5 flex-shrink-0">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 border border-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 border border-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 border border-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-heading text-lg font-bold py-3.5 rounded-xl shadow-[0_8px_20px_-8px_rgba(134,78,90,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(134,78,90,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading
                ? <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Please wait...</>
                : mode === 'login' ? 'Sign In' : 'Create Account'
              }
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
