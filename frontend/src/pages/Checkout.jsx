import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Loader, AlertTriangle, CheckCircle } from 'lucide-react';

// You can use lucide-react's 'Wallet' icon for GCash, or import an actual logo
import GcashLogo from '../assets/gcash.svg'; 
import CreditCardLogo from '../assets/credit-card.svg';

const API_BASE_URL = 'http://localhost:5000';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get the order data passed from the ProductDetails page
    const { product, quantity, address, totalAmount } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState(null); // 'gcash' or 'creditcard'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmitOrder = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        // This is the same logic that was in ProductDetails.jsx
        // You'll need to get the real user ID from your auth context
        const mockUserId = '690ecd4a9345e9e5bf44685a'; 

        try {
            const orderData = {
                userId: mockUserId, 
                productId: product._id,
                quantity: quantity,
                address: address,
                totalAmount: totalAmount,
                // You could also add 'paymentMethod' to your backend Order model
            };

            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create order.");
            }

            // SUCCESS!
            alert("Order placed successfully! Thank you for your purchase.");
            navigate('/products'); 

        } catch (err) {
            console.error("Order creation error:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // If the user lands here directly without order data, redirect them
    if (!product) {
        // You can make this a more elegant "Empty Cart" page
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-light-accent)' }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary-dark)' }}>Your cart is empty</h1>
                    <button onClick={() => navigate('/products')} className="mt-4 px-6 py-2 rounded-lg text-white" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
                        Go Shopping
                    </button>
                </div>
            </div>
        );
    }

    // Helper to style the selected payment option
    const getPaymentOptionClass = (method) => {
        return `flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
            paymentMethod === method
                ? 'border-[var(--color-primary-accent)] ring-2 ring-[var(--color-primary-accent)] shadow-lg'
                : 'border-gray-200 hover:bg-gray-50'
        }`;
    };

    return (
        <div className="min-h-screen p-4 md:p-12" style={{ backgroundColor: 'var(--color-light-accent)' }}>
            <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-10">
                <h1 className="text-3xl font-extrabold mb-6 flex items-center" style={{ color: 'var(--color-primary-dark)' }}>
                    <ShoppingBag className="w-8 h-8 mr-3" />
                    Final Checkout
                </h1>

                {/* --- 1. Order Summary --- */}
                <div className="mb-6 border-b pb-6">
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>Order Summary</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">{product.name} (x{quantity})</span>
                        <span className="font-semibold" style={{ color: 'var(--color-primary-dark)' }}>
                            ${(product.price * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-extrabold mt-4 pt-4 border-t">
                        <span style={{ color: 'var(--color-primary-dark)' }}>Total Amount</span>
                        <span style={{ color: 'var(--color-secondary-highlight)' }}>
                            ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* --- 2. Shipping Details --- */}
                <div className="mb-6 border-b pb-6">
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>Shipping To</h2>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {address}
                    </p>
                </div>

                {/* --- 3. Payment Method --- */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary-dark)' }}>Payment Method</h2>
                    <div className="space-y-4">
                        {/* GCash Option */}
                        <div className={getPaymentOptionClass('gcash')} onClick={() => setPaymentMethod('gcash')}>
                            <div className="flex items-center">
                                {/*  You can use an <img> tag here */}
                                <img src={GcashLogo} alt="GCash" className="w-10 h-10 mr-4 object-contain"/>
                                <span className="font-semibold">Pay with GCash</span>
                            </div>
                            {paymentMethod === 'gcash' && <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-primary-accent)' }} />}
                        </div>

                        {/* Credit Card Option */}
                        <div className={getPaymentOptionClass('creditcard')} onClick={() => setPaymentMethod('creditcard')}>
                            <div className="flex items-center">
                                {/*  You can use an <img> tag here */}
                                <img src={CreditCardLogo} alt="Visa" className="w-10 h-6 mr-2 object-contain"/>
                                <span className="font-semibold">Pay with Credit/Debit Card</span>
                            </div>
                            {paymentMethod === 'creditcard' && <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-primary-accent)' }} />}
                        </div>
                    </div>
                </div>
                
                {/* --- 4. Error Display --- */}
                {error && (
                    <div className="text-center p-3 bg-red-100 rounded-lg mb-4">
                        <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-red-600" />
                        <p className="text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                {/* --- 5. Place Order Button --- */}
                <button
                    onClick={handleSubmitOrder}
                    disabled={!paymentMethod || isLoading}
                    className={`w-full py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center ${
                        !paymentMethod || isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-opacity-90'
                    }`}
                    style={{ backgroundColor: 'var(--color-primary-dark)' }}
                >
                    {isLoading ? (
                        <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                        `Confirm and Place Order`
                    )}
                </button>
            </div>
        </div>
    );
};

export default Checkout;