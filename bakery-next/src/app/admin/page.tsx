"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { productAPI, settingsAPI } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, loadingAuth } = useApp();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'cakes',
    description: '',
    image: '',
    tags: '',
    in_stock: true
  });

  useEffect(() => {
    if (!loadingAuth && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loadingAuth, router]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, settingsRes] = await Promise.all([
        productAPI.getAll(),
        settingsAPI.getAll().catch(() => ({ data: {} })) // Handle if table doesn't exist yet
      ]);
      setProducts(prodRes.data);
      setSettings(settingsRes.data);
      setAnnouncement(settingsRes.data.announcement || '');
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAnnouncement = async () => {
    try {
      await settingsAPI.update('announcement', announcement);
      alert('Announcement updated!');
      fetchData();
    } catch (err) {
      alert('Update failed. Make sure you created the site_settings table in Supabase.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, payload);
      } else {
        await productAPI.create(payload);
      }
      setShowForm(false);
      setEditingProduct(null);
      setForm({ name: '', price: '', category: 'cakes', description: '', image: '', tags: '', in_stock: true });
      fetchData();
    } catch (err) {
      alert('Action failed');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image || '',
      tags: product.tags?.join(', ') || '',
      in_stock: product.in_stock
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await productAPI.delete(id);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loadingAuth || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bakery-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bakery-cream pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-serif text-bakery-brown mb-2">Admin Dashboard</h1>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-all cursor-pointer ${activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-bakery-brown/40'}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-all cursor-pointer ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-bakery-brown/40'}`}
              >
                Site Updates
              </button>
            </div>
          </div>
          {activeTab === 'products' && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setForm({ name: '', price: '', category: 'cakes', description: '', image: '', tags: '', in_stock: true });
                setShowForm(true);
              }}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">add</span>
              Add New Item
            </button>
          )}
        </div>

        {activeTab === 'products' ? (
          /* ── Products List ───────────────────────────────────── */
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-bakery-rose/20">
              <table className="w-full text-left border-collapse">
                <thead className="bg-bakery-pink/30 text-bakery-brown/70 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bakery-rose/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-bakery-pink/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img src={product.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          ) : (
                            <div className="w-10 h-10 bg-bakery-rose/20 rounded-lg flex items-center justify-center">
                              <span className="material-symbols-outlined text-bakery-rose">cake</span>
                            </div>
                          )}
                          <span className="font-bold text-bakery-brown">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-bakery-pink text-bakery-brown text-[10px] font-bold uppercase rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-bakery-brown">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        {product.in_stock ? (
                          <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> In Stock
                          </span>
                        ) : (
                          <span className="text-red-500 text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-bakery-brown/40 hover:text-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-bakery-brown/40 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ── Settings / Site Updates ────────────────────────── */
          <div className="max-w-2xl bg-white p-8 rounded-[32px] shadow-sm border border-bakery-rose/20">
            <h2 className="text-xl font-serif text-bakery-brown mb-6">Global Site Updates</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Home Announcement Banner</label>
                <input
                  className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                  value={announcement}
                  onChange={e => setAnnouncement(e.target.value)}
                  placeholder="e.g. 20% OFF on all Red Velvet Cakes this weekend!"
                />
                <p className="text-[10px] text-bakery-brown/40 mt-2">This will appear at the top of the homepage.</p>
              </div>
              <button
                onClick={handleUpdateAnnouncement}
                className="bg-bakery-brown text-white px-8 py-3 rounded-xl font-bold hover:bg-bakery-gold transition-all cursor-pointer"
              >
                Update Website
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bakery-dark/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif text-bakery-brown">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-bakery-brown/40 hover:text-bakery-brown transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Product Name</label>
                    <input
                      required
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Vanilla Dream Cake"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Price ($)</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      placeholder="45.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Category</label>
                    <select
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                    >
                      <option value="cakes">Cakes</option>
                      <option value="pastries">Pastries</option>
                      <option value="cookies">Cookies</option>
                      <option value="breads">Breads</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Rich and delicious..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Image URL (Optional)</label>
                    <input
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.image}
                      onChange={e => setForm({ ...form, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-bakery-brown/60 uppercase tracking-widest mb-2">Tags (Comma separated)</label>
                    <input
                      className="w-full bg-bakery-cream rounded-xl px-4 py-3 border border-bakery-rose/30 focus:outline-none focus:border-primary transition-all"
                      value={form.tags}
                      onChange={e => setForm({ ...form, tags: e.target.value })}
                      placeholder="bestseller, vegan"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="in_stock"
                      className="w-5 h-5 rounded border-bakery-rose text-primary focus:ring-primary"
                      checked={form.in_stock}
                      onChange={e => setForm({ ...form, in_stock: e.target.checked })}
                    />
                    <label htmlFor="in_stock" className="text-sm font-bold text-bakery-brown/60 uppercase tracking-widest cursor-pointer">In Stock</label>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      className="w-full bg-bakery-brown text-white font-bold py-4 rounded-xl shadow-xl hover:bg-bakery-gold transition-all duration-300 cursor-pointer"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
