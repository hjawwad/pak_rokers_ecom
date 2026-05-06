import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  originalPrice: '',
  rating: 4.5,
  reviews: 0,
  badge: '',
  description: '',
  features: '',
  images: '',
  variants: '',
  inStock: true,
};

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [editing, setEditing] = useState(null); // null = closed, 'new' or product object
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setForm(emptyProduct);
    setEditing('new');
  };

  const openEdit = (product) => {
    setForm({
      ...product,
      features: Array.isArray(product.features) ? product.features.join(', ') : product.features || '',
      images: Array.isArray(product.images) ? product.images.join('\n') : product.images || '',
      variants: Array.isArray(product.variants)
        ? product.variants.map((v) => `${v.name}:${v.color}:${v.sku}`).join('\n')
        : product.variants || '',
      price: product.price?.toString() || '',
      originalPrice: product.originalPrice?.toString() || '',
    });
    setEditing(product);
  };

  const handleSave = () => {
    const features = form.features
      ? form.features.split(',').map((f) => f.trim()).filter(Boolean)
      : [];
    const images = form.images
      ? form.images.split('\n').map((u) => u.trim()).filter(Boolean)
      : [];
    const variants = form.variants
      ? form.variants.split('\n').map((v) => {
          const [name, color, sku] = v.split(':').map((s) => s.trim());
          return { name: name || '', color: color || '#000000', sku: sku || '' };
        }).filter((v) => v.name)
      : [];

    const productData = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      originalPrice: parseFloat(form.originalPrice) || 0,
      rating: parseFloat(form.rating) || 0,
      reviews: parseInt(form.reviews) || 0,
      badge: form.badge || null,
      description: form.description,
      features,
      images,
      variants,
      inStock: form.inStock,
    };

    if (editing === 'new') {
      addProduct(productData);
    } else {
      updateProduct({ ...productData, id: editing.id });
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });
  };

  const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Product</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Stock</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Badge</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm capitalize">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold">${product.price?.toFixed(2)}</p>
                  {product.originalPrice > product.price && (
                    <p className="text-xs text-gray-400 line-through">${product.originalPrice?.toFixed(2)}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {product.badge && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {product.badge}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(product)}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Delete Product</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-xl">
              <h3 className="text-lg font-bold">{editing === 'new' ? 'Add Product' : 'Edit Product'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input type="text" value={form.name} onChange={set('name')} placeholder="Product name" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select value={form.category} onChange={set('category')} className={inputCls}>
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Badge</label>
                  <select value={form.badge || ''} onChange={set('badge')} className={inputCls}>
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Sale">Sale</option>
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="New">New</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price *</label>
                  <input type="number" step="0.01" value={form.price} onChange={set('price')} placeholder="0.00" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price</label>
                  <input type="number" step="0.01" value={form.originalPrice} onChange={set('originalPrice')} placeholder="0.00" className={inputCls} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={set('description')} placeholder="Product description" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={set('features')} placeholder="Feature 1, Feature 2, Feature 3" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
                <textarea rows={3} value={form.images} onChange={set('images')} placeholder="https://example.com/image1.jpg" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Variants (one per line, format: Name:Color:SKU)</label>
                <textarea rows={3} value={form.variants} onChange={set('variants')} placeholder="Red:#FF0000:SKU_RED" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set('rating')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reviews Count</label>
                  <input type="number" value={form.reviews} onChange={set('reviews')} className={inputCls} />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.inStock} onChange={set('inStock')} className="accent-primary w-4 h-4" />
                <span className="text-sm font-medium">In Stock</span>
              </label>
            </div>

            <div className="flex gap-3 p-6 border-t sticky bottom-0 bg-white rounded-b-xl">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.category || !form.price}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editing === 'new' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
