import React, { useState, useEffect } from 'react';
// IMPORTANT: Import useParams for correct ID extraction
import { useParams } from 'react-router-dom'; 
import { ShoppingCart, Loader, AlertTriangle, Image as ImageIcon } from 'lucide-react';

// Base URL for your Express backend
const API_BASE_URL = 'http://localhost:5000';

const ProductDetails = () => {
  // --- DYNAMIC ID EXTRACTION FIX ---
  // Get the ID from the URL parameter defined in App.jsx (e.g., :id)
  const { id } = useParams(); 
  
  // Use the extracted ID, falling back only if necessary
  const productId = id || '690e075d5058824ebdd932ab'; // Fallback
  // ---------------------------------

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [imageSrc, setImageSrc] = useState(null);

  // Fallback function for broken images
  const handleImageError = () => {
    setImageSrc("https://placehold.co/500x500/e0e0e0/555555?text=Product+Image+Error");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      
      // Check for a reasonably valid ID structure before proceeding
      if (!productId || productId.length < 5) {
          setError("Invalid product identifier found in the URL.");
          setLoading(false);
          return;
      }
      
      try {
        // Use the reliable productId for the fetch URL
        const url = `${API_BASE_URL}/products/getProductById/${productId}`; 
        
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'No message available' }));
          
          if (response.status === 404) {
            throw new Error(`Product not found (ID: ${productId})`);
          }
          throw new Error(`API failed: ${response.status} - ${errorData.error}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.name) {
            throw new Error("Data retrieved successfully but product object is empty.");
        }

        setProduct(data);
        setImageSrc(data.image_url || null); 
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details. Check network.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // --- Render Loading and Error States ---
  if (loading) {
    return (
      <div 
        className="fixed inset-0 flex justify-center items-center z-50 transition-opacity" 
        style={{ backgroundColor: 'var(--color-primary-dark)' }} // Dark background for visibility
      >
        <div className="flex items-center p-4 bg-white rounded-lg shadow-2xl">
          <Loader className="w-6 h-6 animate-spin" style={{ color: 'var(--color-primary-accent)' }} />
          <p className="ml-3 text-lg" style={{ color: 'var(--color-primary-dark)' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-8" style={{ backgroundColor: 'var(--color-light-accent)' }}>
        <div className="text-center p-10 bg-red-100 rounded-lg shadow-xl">
          <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-red-600" />
          <h2 className="text-xl font-bold text-red-700">Fetch Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  // Final check for null data
  if (!product || !product.name) {
    return (
        <div className="min-h-screen flex justify-center items-center p-8" style={{ backgroundColor: 'var(--color-light-accent)' }}>
            <div className="text-center p-10 bg-gray-100 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-gray-700">Product Not Available</h2>
                <p className="text-gray-600">The product ID specified could not be loaded or data is invalid.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-12" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      
      {/* Product Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-10">
        
        {/* Breadcrumb/Navigation Placeholder */}
        <div className="text-sm mb-6" style={{ color: 'var(--color-secondary-highlight)' }}>
            Home / Products / {product.name}
        </div>

        {/* Two-Column Layout (Image Left, Details Right) */}
        <div className="md:flex md:space-x-10">
          
          {/* 1. Image Column (Left) */}
          <div className="md:w-1/2 flex-shrink-0 mb-6 md:mb-0">
            {/* 🌟 FIX APPLIED HERE: Forcing a square container using aspect ratio trick 🌟 */}
            <div 
              className="relative rounded-xl overflow-hidden border-4"
              // Tailwind classes for 1:1 aspect ratio: 'w-full pb-[100%]'
              style={{ 
                borderColor: 'var(--color-secondary-subtle)', 
                backgroundColor: 'var(--color-light-accent)',
                width: '100%', 
                paddingBottom: '100%' // This makes the height equal to the width (square)
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
              
                {imageSrc && imageSrc !== "https://placehold.co/500x500/e0e0e0/555555?text=Product+Image+Error" ? (
                  <img 
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                  />
                ) : (
                  <ImageIcon className="w-24 h-24" style={{ color: 'var(--color-secondary-subtle)' }} />
                )}
              </div>
            </div>
            
          </div>

          {/* 2. Details Column (Right) */}
          <div className="md:w-1/2 pt-4 flex flex-col justify-between">
            
            {/* Top Group (Title & Description) */}
            <div>
                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
                {product.name}
                </h1>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
                </p>
            </div>


            {/* Bottom Group (Price, Stock, and Button) */}
            <div className="flex-shrink-0">
                {/* Price */}
                <div className="mb-4"> {/* Changed mb-8 to mb-4 to tighten grouping */}
                  <span className="text-4xl font-extrabold" style={{ color: 'var(--color-secondary-highlight)' }}>
                    ${product.price ? product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                  </span>
                </div>

                {/* Stock/Status Indicator (Optional) */}
                <div className="text-sm font-semibold mb-6">
                    <span className={`px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                    </span>
                </div>

                {/* Order Now Button */}
                <button
                  disabled={product.stock === 0}
                  className={`w-full max-w-sm py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-lg ${product.stock > 0 ? 'hover:bg-opacity-90' : 'opacity-50 cursor-not-allowed'}`}
                  style={{ backgroundColor: 'var(--color-primary-dark)' }}
                >
                  <span className="flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-3" style={{ color: 'var(--color-primary-accent)' }} />
                    Order Now
                  </span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;