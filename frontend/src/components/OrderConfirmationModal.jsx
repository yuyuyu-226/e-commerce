import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';

// Define the component, accepting props for the product, visibility, and actions
const OrderConfirmationModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  // Initialize quantity state with a minimum of 1
  const [quantity, setQuantity] = useState(1);
  // State for the delivery address
  const [address, setAddress] = useState('');

  // Handle quantity increment/decrement
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInput = (e) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 1) {
      // If input is empty or invalid, temporarily set to a minimum of 1
      setQuantity(1);
      return; 
    }
    
    // Clamp the value: must be between 1 and available stock
    if (value > product.stock) {
      value = product.stock;
    }
    
    setQuantity(value);
  };

  // Handle confirmation button click
  const handleConfirm = () => {
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }
    if (!address.trim()) {
      alert("Please enter a valid delivery address.");
      return;
    }
    
    // Call the parent handler with the collected data
    onConfirm({ quantity, address, productId: product._id, totalAmount: product.price * quantity });
    onClose(); // Close modal on successful initiation
  };

  if (!isOpen) return null;

  // Calculate the current total amount
  const currentTotal = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 transition-opacity" style={{ backdropFilter: 'blur(8px)' }}>
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all"
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold flex items-center" style={{ color: 'var(--color-primary-dark)' }}>
            <ShoppingBag className="w-5 h-5 mr-2" />
            Confirm Order
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-4">
          <p className="text-gray-600">Product:</p>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-primary-dark)' }}>
            {product.name}
          </h3>
          <p className="text-sm font-medium" style={{ color: 'var(--color-secondary-highlight)' }}>
            Price per unit: ${product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Stock available: {product.stock}
          </p>
        </div>
        
        {/* Quantity Changer */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg border">
          <label className="font-semibold text-gray-700">Quantity:</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className={`p-2 rounded-full transition-colors ${quantity <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              style={{ color: 'var(--color-primary-dark)' }}
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Changes the Quantity through typing */}
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInput}
              min="1"
              max={product.stock}
              className="text-xl font-extrabold w-12 text-center p-1 border-gray-300 rounded-md shadow-sm"
              style={{ color: 'var(--color-primary-dark)', borderColor: 'var(--color-secondary-subtle)', appearance: 'none', 'MozAppearance': 'textfield' }}
            />

            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className={`p-2 rounded-full transition-colors ${quantity >= product.stock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              style={{ color: 'var(--color-primary-dark)' }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Address Input */}
        <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address:
            </label>
            <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-accent)]"
                placeholder="Enter full shipping address..."
            />
        </div>

        {/* Total and Action Button */}
        <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-gray-700">Total Amount:</span>
                <span className="text-3xl font-extrabold" style={{ color: 'var(--color-secondary-highlight)' }}>
                    ${currentTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
            
            <button
              onClick={handleConfirm}
              disabled={quantity < 1 || !address.trim()}
              className="w-full py-3 rounded-lg text-lg font-bold text-white transition-colors duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-primary-dark)' }}
            >
              Place Order
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default OrderConfirmationModal;