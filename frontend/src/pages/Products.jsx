import React from 'react';
import { Image, ShoppingCart, Search } from 'lucide-react';

// --- Mock Data for Products ---
const mockProducts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Product Title ${i + 1}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in tempus nulla. Etiam porttitor tristique congue. Phasellus eu vestibulum dolor.',
}));

// --- Product Card Component ---
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
      
      {/* Image Placeholder */}
      <div className="h-48 flex items-center justify-center" style={{ backgroundColor: 'var(--color-light-accent)' }}>
        <Image className="w-12 h-12" style={{ color: 'var(--color-secondary-subtle)' }} />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary-dark)' }}>{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
        
        {/* Mock Price and Button */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            {/* Price uses Secondary Highlight color */}
            <span className="text-xl font-extrabold" style={{ color: 'var(--color-secondary-highlight)' }}>$99.99</span>
            {/* Button uses Primary Accent color */}
            <button 
                className="flex items-center text-[var(--color-primary-dark)] px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary-accent)' }}
            >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
            </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Product Page Component ---
const Products = () => {
  return (
    // Main Container: Set background to light accent
    <div className="min-h-screen flex font-inter" style={{ backgroundColor: 'var(--color-primary-accent)' }}>
      
      {/* 1. Sidebar Column (Filters/Navigation Container) */}
      <aside 
        className="w-64 p-6 shadow-xl hidden sm:block border-r border-gray-300" 
        style={{ backgroundColor: 'var(--color-secondary-subtle)' }}
      >
        {/*}
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-light-accent)' }}>Catalog</h2>
        
        
        <div className="space-y-4">
          
          
          <div className="p-2 bg-white rounded-lg flex items-center border border-gray-300">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm">Search (Removed)</span>
          </div>

          
          <div className="space-y-3 p-2 border-t" style={{ borderColor: 'var(--color-light-accent)' }}>
            <h4 className="font-medium" style={{ color: 'var(--color-light-accent)' }}>Filters (Removed)</h4>
            <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary-accent)' }} />
                <label className="text-gray-200">Category 1</label>
            </div>
            <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary-accent)' }} />
                <label className="text-gray-200">Category 2</label>
            </div>
          </div>

        </div>
        */}
      </aside>

      {/* 2. Main Content Column (Product Grid) */}
      <main className="flex-1 p-6 lg:p-10">
        
        {/* Page Title / Header Area */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-light" style={{ color: 'var(--color-primary-dark)' }}>Sample Text</h1>
        </header>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </main>
    </div>
  );
};

export default Products;