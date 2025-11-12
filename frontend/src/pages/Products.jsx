import React, { useState, useEffect } from 'react';
import { Image, ShoppingCart, Loader, AlertTriangle, Search } from 'lucide-react';

// Base URL for your Express backend
const API_BASE_URL = 'http://localhost:5000';

// --- Product Card Component ---
const ProductCard = ({ product }) => {
  // Use the full URL from the database
  const imageUrl = product.image_url || null; 

  // Initialize with the URL from the database
  const [imageSrc, setImageSrc] = useState(imageUrl);

  // Helper to handle navigation to the detail page
  const handleClick = () => {
    // Determine the correct ID. MongoDB uses _id which might be an object containing $oid.
    const id = product._id.$oid || product._id;
    // Redirect to the product-details page using the unique ID
    window.location.href = `/product-details/${id}`;
  };

  // Fallback function for broken images
  const handleImageError = () => {
    // Set a placeholder image on error and prevent infinite attempts
    setImageSrc("https://placehold.co/400x300/e0e0e0/555555?text=No+Image");
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 cursor-pointer"
      onClick={handleClick} // Make the entire card clickable
    >
      
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
            ${product.price ? product.price.toLocaleString(undefined, {minimumFractionDigits: 2,
maximumFractionDigits: 2, }) : "N/A"}
          </span>
          <button 
            // Prevent card click from triggering when clicking the button
            onClick={handleClick}
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
  const [selectedCategory, setSelectedCategory] = useState(''); // Category Filter
  const [sortBy, setSortBy] = useState(''); // Price Sort
  const [searchQuery, setSearchQuery] = useState(''); // Search Filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to extract and clean categories from a product list
  const extractCategories = (data) => {
    const uniqueCategories = [...new Set(data.map(p => p.category))];
    return uniqueCategories
      .filter(c => c && c.trim() !== '')
      .sort();
  };

  // 1. Fetch Products (filtered by category and sorted)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        if (sortBy) {
          params.append('sort', sortBy);
        }
        if (searchQuery.trim()) {
          params.append('query', searchQuery.trim()); // Send search query
        }
        
        const queryString = params.toString();
        const url = `${API_BASE_URL}/products/getProducts${queryString ? `?${queryString}` : ''}`;
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        
        // --- CLIENT-SIDE CATEGORY EXTRACTION FIX ---
        // Always populate the master categories list based on the full product data
        if (!selectedCategory && !searchQuery && categories.length === 0) {
            setCategories(extractCategories(data));
        }
        // Fallback for initial load
        if (categories.length === 0 && data.length > 0) {
            setCategories(extractCategories(data));
        }
        // ------------------------------------------

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please check the backend server and network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortBy, searchQuery, categories.length]); // Depends on all filter states

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
          <p className="text-gray-600 font-semibold">No products found in this category or matching your search.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {products.map(product => (
          // Use the ProductCard with the new click handler
          <ProductCard key={product._id.$oid || product._id} product={product} /> 
        ))}
      </div>
    );
  };

  // Helper to handle category dropdown changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Helper to handle sort dropdown changes
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Helper to handle search input changes
  const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
  };

  return (
    // Main Container: Set background to light accent
    <div className="min-h-screen flex font-inter" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      
      {/* 1. Sidebar Column (Filters/Navigation Container) */}
      <aside 
        className="w-64 p-6 shadow-2xl hidden sm:block border-r border-gray-300 flex-shrink-0 text-[var(--color-primary-dark)]" 
        style={{ backgroundColor: 'var(--color-secondary-subtle)' }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
          Filters
        </h2>

        {/* Search Bar */}
        <div className="relative mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-primary-dark)' }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
                style={{ 
                    borderColor: 'var(--color-primary-dark)',
                    color: 'var(--color-primary-dark)',
                    backgroundColor: 'var(--color-light-accent)'
                }}
            />
        </div>
        
        {/* Category Dropdown Filter Group */}
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary-dark)' }}>
          Category
        </h2>
        <div className="space-y-3">
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded-lg shadow-sm cursor-pointer"
            style={{ 
              borderColor: 'var(--color-primary-dark)', 
              color: 'var(--color-primary-dark)',
              backgroundColor: 'var(--color-light-accent)'
            }}
          >
            <option value="">All Categories</option>
            {/* Mapping through extracted categories */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* 2. Main Content Column (Product Grid) */}
      <main className="flex-1 p-6 lg:p-10">
        
        {/* Page Title / Header Area with Sort Dropdown */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-light tracking-wider mb-4 md:mb-0" style={{ color: 'var(--color-primary-dark)' }}>
            Our Products
          </h1>
          
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-lg font-semibold" style={{ color: 'var(--color-primary-dark)' }}>
              Sort by Price:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="p-2 border rounded-lg shadow-sm cursor-pointer"
              style={{ 
                borderColor: 'var(--color-secondary-subtle)', 
                color: 'var(--color-primary-dark)' 
              }}
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
        
      </main>
    </div>
  );
};

export default ProductPage;