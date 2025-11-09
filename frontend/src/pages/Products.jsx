import React, { useState, useEffect } from 'react';
import { Image, ShoppingCart, Loader, AlertTriangle } from 'lucide-react';

// Base URL for your Express backend
const API_BASE_URL = 'http://localhost:5000';

// --- Product Card Component ---
const ProductCard = ({ product }) => {
  // Use the full URL from the database, as confirmed by your product example
  const imageUrl = product.image_url || null; 

  // Initialize with the URL from the database
  const [imageSrc, setImageSrc] = useState(imageUrl);

  // Fallback function for broken images
  const handleImageError = () => {
    // Set a placeholder image on error and prevent infinite attempts
    setImageSrc("https://placehold.co/400x300/e0e0e0/555555?text=No+Image");
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      
      {/* Image Display */}
      <div className="h-48 flex items-center justify-center relative bg-gray-50">
        {imageSrc && imageSrc !== "https://placehold.co/400x300/e0e0e0/555555?text=No+Image" ? (
          <img 
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <Image className="w-12 h-12" style={{ color: 'var(--color-secondary-subtle)' }} />
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate" style={{ color: 'var(--color-primary-dark)' }}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 h-12">
          {product.description}
        </p>
        
        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-xl font-extrabold" style={{ color: 'var(--color-secondary-highlight)' }}>
            ${product.price ? product.price.toFixed(2) : 'N/A'}
          </span>
          <button 
            className="flex items-center text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary-accent)' }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Product Page Component ---
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Empty string means 'All'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Unique Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories list.");
        }
      } catch (err) {
        console.error("Network error while fetching categories:", err);
      }
    };
    fetchCategories();
  }, []); // Run only once on mount

  // 2. Fetch Products (filtered by category)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoryQuery = selectedCategory 
          ? `?category=${encodeURIComponent(selectedCategory)}` 
          : '';
          
        const response = await fetch(`${API_BASE_URL}/products/getProducts${categoryQuery}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please check the backend server and network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Re-fetch whenever the selectedCategory changes

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <Loader className="w-10 h-10 animate-spin" style={{ color: 'var(--color-primary-accent)' }} />
          <p className="ml-3 text-lg" style={{ color: 'var(--color-primary-dark)' }}>Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-10 bg-red-100 rounded-lg shadow-inner">
          <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-red-600" />
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      );
    }
    
    if (products.length === 0) {
      return (
        <div className="text-center p-10 bg-gray-100 rounded-lg shadow-inner">
          <p className="text-gray-600 font-semibold">No products found in this category.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {products.map(product => (
          // Using product._id for the key
          <ProductCard key={product._id.$oid || product._id} product={product} /> 
        ))}
      </div>
    );
  };

  // Helper to handle radio button changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    // Main Container: Set background to light accent
    <div className="min-h-screen flex font-inter" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      
      {/* 1. Sidebar Column (Filters/Navigation Container) */}
      <aside 
        className="w-64 p-6 shadow-2xl hidden sm:block border-r border-gray-300 flex-shrink-0 text-[var(--color-primary-dark)]" 
        style={{ backgroundColor: 'var(--color-secondary-subtle)' }}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2" style={{ borderColor: 'var(--color-primary-dark)' }}>
          Categories
        </h2>
        
        {/* Radio Button Filter Group */}
        <div className="space-y-3">
          {/* Option for All Categories */}
          <label className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
            <input
              type="radio"
              name="categoryFilter"
              value=""
              checked={selectedCategory === ''}
              onChange={() => handleCategoryChange('')}
              className="form-radio h-4 w-4"
              style={{ accentColor: 'var(--color-primary-dark)' }}
            />
            <span className="font-semibold">All Products</span>
          </label>
          
          {/* Mapping through fetched categories */}
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer hover:opacity-opacity-80 transition">
              <input
                type="radio"
                name="categoryFilter"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="form-radio h-4 w-4"
                style={{ accentColor: 'var(--color-primary-dark)' }}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* 2. Main Content Column (Product Grid) */}
      <main className="flex-1 p-6 lg:p-10">
        
        {/* Page Title / Header Area */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-light tracking-wider" style={{ color: 'var(--color-primary-dark)' }}>
            Our Products
          </h1>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
        
      </main>
    </div>
  );
};

export default ProductPage;