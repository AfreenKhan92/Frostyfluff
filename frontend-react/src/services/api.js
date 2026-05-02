// Base URL is proxied via Vite → http://localhost:5000
const BASE = '/api';

/**
 * Generic request helper. Injects Authorization header when a token is stored.
 */
async function request(method, path, body = null) {
  const token = localStorage.getItem('ff_token');

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
}

// ── Auth ──────────────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) =>
    request('POST', '/auth/register', { name, email, password }),

  login: (email, password) =>
    request('POST', '/auth/login', { email, password }),

  getMe: () => request('GET', '/auth/me'),
};

// ── Products ──────────────────────────────────────────────
export const productAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id) => request('GET', `/products/${id}`),
};

// ── Cart ──────────────────────────────────────────────────
export const cartAPI = {
  get: () => request('GET', '/cart'),

  add: (productId, quantity = 1) =>
    request('POST', '/cart', { productId, quantity }),

  update: (productId, quantity) =>
    request('PUT', `/cart/${productId}`, { quantity }),

  remove: (productId) => request('DELETE', `/cart/${productId}`),

  clear: () => request('DELETE', '/cart'),
};

// ── Custom Cake ───────────────────────────────────────────
export const customCakeAPI = {
  submit: (payload) => request('POST', '/custom-cake', payload),
  getAll: () => request('GET', '/custom-cake'),
};
