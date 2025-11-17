import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Search, Loader2, AlertCircle, X, Save, Lock, ImageOff } from 'lucide-react'; // Added ImageOff for placeholder
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000/admin/products'; 

// --- Edit Product Modal Component ---
const EditProductModal = ({ product, onClose, onSave }) => {
    // Initialize form state with current product data
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0, 
        category: product?.category || '',
        image_url: product?.image_url || '', // Added image_url
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/edit/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const updatedProduct = await response.json();
            onSave(updatedProduct); 
            onClose(); 

        } catch (err) {
            setSaveError(err.message);
            console.error("Save Error:", err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (!product) return null;

    // Common input styling
    const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-150";

    return (
        // Modal Backdrop with blur
        <div 
            className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Edit Product: {product.name}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Image URL Field */}
                    <div>
                        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="https://..."
                        />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`${inputClass} h-24`}
                        />
                    </div>

                    {/* Price and Stock Fields (side-by-side) */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={inputClass}
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            {/* Uses 'stock' */}
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className={inputClass}
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                    
                    {/* Error Message */}
                    {saveError && (
                        <p className="text-red-500 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" /> {saveError}
                        </p>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 sticky bottom-0 bg-white pb-6 px-6 -mx-6 -mb-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Admin Dashboard Main Component ---

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  // 1. Initial Auth Check and Data Fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        setError("Not logged in. Redirecting to login.");
        setTimeout(() => navigate('/login'), 1500); 
        setIsLoading(false);
        return;
    }

    try {
        const decoded = jwtDecode(token); 
        if (decoded.role === 'Admin') {
            setIsAdmin(true);
            fetchProducts(token); 
        } else {
            setIsAdmin(false);
            setIsLoading(false);
        }
    } catch (e) {
        setError("Invalid token. Redirecting to login.");
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500); 
        setIsLoading(false);
    }
  }, [navigate]); 

  const fetchProducts = async (token) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/getAllProducts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401 || response.status === 403) {
          throw new Error('Authorization Failed. You lack permission.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : data.products || []); 

    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError(`Failed to load data: ${err.message}`);
      
      if (err.message.includes('Authorization Failed')) {
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 2000); 
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== id));
      } else {
        console.error("Delete failed with status:", response.status);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 3. Handle Product Update from Modal
  const handleProductUpdate = (updatedProduct) => {
      setProducts(prevProducts => 
          prevProducts.map(p => p._id === updatedProduct._id ? updatedProduct : p)
      );
  };

  // Filter products for search
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to determine stock status color/text
  const getStockStatus = (stock) => {
    const stockNum = stock || 0; // Ensure it's a number
    if (stockNum <= 0) {
      return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100', weight: 'font-bold' };
    } else if (stockNum < 10) {
      return { text: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100', weight: 'font-semibold' };
    } else {
      return { text: stockNum, color: 'text-green-700', bg: 'bg-green-100', weight: 'font-medium' };
    }
  };

  // --- ACCESS DENIED SCREEN ---
  if (!isAdmin && !isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 text-center" style={{ backgroundColor: 'var(--color-light-accent)' }}>
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-red-500 max-w-md">
                <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    This page is reserved for **Administrators** only.
                    Your current user role (`Buyer`) does not have permission to view or manage products.
                </p>
                <Link to="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition">
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
  }

  // --- Product Image Cell Component ---
  const ProductImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [error, setError] = useState(false);

    useEffect(() => {
        setImgSrc(src); // Reset src if product changes
        setError(false);
    }, [src]);

    const handleImageError = () => {
        setError(true);
    };

    if (error || !imgSrc) {
        return (
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                <ImageOff className="w-8 h-8" />
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className="w-16 h-16 object-cover rounded-md shadow-sm"
            onError={handleImageError}
        />
    );
  };


  // --- MAIN ADMIN DASHBOARD RENDER ---
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      
      {editingProduct && (
        <EditProductModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)} 
          onSave={handleProductUpdate}          
        />
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center text-gray-900">
            <Shield className="w-8 h-8 mr-3 text-green-600" />
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">View and manage your store inventory.</p>
        </div>
        
        <Link 
          to="/admin/add-product" 
          className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center border border-gray-200">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading inventory...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
            <AlertCircle className="w-10 h-10 mb-4" />
            <p>Error: {error}</p>
            <button onClick={() => fetchProducts(localStorage.getItem('token'))} className="mt-4 text-blue-600 underline">Try Again</button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No products found. Click "Add New Product" to start.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                  <th className="p-4 border-b w-16 text-center">#</th>
                  {/* --- NEW COLUMN --- */}
                  <th className="p-4 border-b">Image</th>
                  <th className="p-4 border-b">Product Name</th>
                  <th className="p-4 border-b">Category</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Stock</th>
                  <th className="p-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product.stock);
                  
                  return (
                    <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-4 text-center text-sm text-gray-500 font-medium">
                        {index + 1}
                      </td>
                      {/* --- NEW CELL --- */}
                      <td className="p-2">
                        <ProductImage src={product.image_url} alt={product.name} />
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="p-4 text-gray-600">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          {product.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="p-4 text-green-700 font-semibold">
                        ${product.price}
                      </td>
                      <td className={`p-4 ${stockStatus.weight}`}>
                        <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center space-x-4">
                        <button 
                          onClick={() => setEditingProduct(product)} 
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;