import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const emptyCategory = { name: '', image: '', count: 0 };

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCategory);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openNew = () => {
    setForm(emptyCategory);
    setEditing('new');
  };

  const openEdit = (cat) => {
    setForm({ ...cat });
    setEditing(cat);
  };

  const handleSave = () => {
    if (editing === 'new') {
      addCategory({ name: form.name, image: form.image, count: parseInt(form.count) || 0 });
    } else {
      updateCategory({ ...form, count: parseInt(form.count) || 0 });
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    deleteCategory(id);
    setDeleteConfirm(null);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const getProductCount = (categoryId) => products.filter((p) => p.category === categoryId).length;

  const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {cat.image && (
              <div className="h-40 overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{getProductCount(cat.id)} products</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {cat.id}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cat.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No categories yet. Add your first category.
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Delete Category</h3>
            <p className="text-sm text-gray-600 mb-2">Are you sure you want to delete this category?</p>
            {getProductCount(deleteConfirm) > 0 && (
              <p className="text-sm text-amber-600 font-medium mb-4">
                Warning: {getProductCount(deleteConfirm)} product(s) are in this category.
              </p>
            )}
            <div className="flex gap-3 mt-4">
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
          <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{editing === 'new' ? 'Add Category' : 'Edit Category'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category Name *</label>
                <input type="text" value={form.name} onChange={set('name')} placeholder="Category name" className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="text" value={form.image} onChange={set('image')} placeholder="https://example.com/image.jpg" className={inputCls} />
                {form.image && (
                  <img src={form.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                )}
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editing === 'new' ? 'Add Category' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
