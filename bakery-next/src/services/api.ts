const BASE = '/api';

/**
 * Generic request helper. Injects Authorization header when a token is stored.
 */
async function request(method: string, path: string, body: any = null) {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('ff_token');
  }

  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options: any = { method, headers };
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
  register: (name: string, email: string, password: string) =>
    request('POST', '/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    request('POST', '/auth/login', { email, password }),

  getMe: () => request('GET', '/auth/me'),
};

// ── Products ──────────────────────────────────────────────
export const productAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => request('GET', `/products/${id}`),

  create: (data: any) => request('POST', '/products', data),

  update: (id: string, data: any) => request('PUT', `/products/${id}`, data),

  delete: (id: string) => request('DELETE', `/products/${id}`),
};

// ── Cart ──────────────────────────────────────────────────
export const cartAPI = {
  get: () => request('GET', '/cart'),

  add: (productId: string, quantity = 1) =>
    request('POST', '/cart', { productId, quantity }),

  update: (productId: string, quantity: number) =>
    request('PUT', `/cart/${productId}`, { quantity }),

  remove: (productId: string) => request('DELETE', `/cart/${productId}`),

  clear: () => request('DELETE', '/cart'),
};

// ── Custom Cake ───────────────────────────────────────────
export const customCakeAPI = {
  submit: (payload: any) => request('POST', '/custom-cake', payload),
  getAll: () => request('GET', '/custom-cake'),
};

// ── Settings ──────────────────────────────────────────────
export const settingsAPI = {
  getAll: () => request('GET', '/settings'),
  update: (key: string, value: string) => request('POST', '/settings', { key, value }),
};
