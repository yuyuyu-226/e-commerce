import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
import { useParams, useNavigate } from 'react-router-dom'; 
import { ShoppingCart, Loader, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import OrderConfirmationModal from '../components/OrderConfirmationModal.jsx';
import { FastAverageColor } from "fast-average-color";

const API_BASE_URL = 'http://localhost:5000';

const ProductDetails = () => {
    const navigate = useNavigate();
    const fac = useMemo(() => new FastAverageColor(), []);
    
    const { id } = useParams(); 
    const productId = id || '690e075d5058824ebdd932ab'; 

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avgColor, setAvgColor] = useState('#f5f5f5'); 

    const handleImageError = () => {
        setImageSrc("https://placehold.co/500x500/e0e0e0/555555?text=Product+Image+Error");
    };

    const handleConfirmOrder = async ({ quantity, address, totalAmount }) => {
        navigate('/checkout', { 
            state: { 
                product, 
                quantity, 
                address, 
                totalAmount 
            } 
        });
    };

    const extractAverageColor = useCallback((imageElement) => {
        try {
            const color = fac.getColor(imageElement, { mode: "speed" }); 
            setAvgColor(color.hex);
        } catch (err) {
            console.error("Failed to get average color:", err);
            setAvgColor('#f5f5f5');
        }
    }, [fac]);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        setError(null);
        setProduct(null);
        setAvgColor('#f5f5f5');
        
        if (!productId || productId.length < 5) {
            setError("Invalid product identifier found in the URL.");
            setLoading(false);
            return;
        }
        
        try {
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
    }, [productId]); 


    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]); 

    if (loading) {
        return (
            <div 
                className="fixed inset-0 flex justify-center items-center z-50 transition-opacity" 
                style={{ backgroundColor: 'var(--color-primary-dark)' }}
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
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-10">
                <div className="text-sm mb-6" style={{ color: 'var(--color-secondary-highlight)' }}>
                    Home / Products / {product.name}
                </div>

                <div className="md:flex md:space-x-10">
                    
                    <div className="md:w-1/2 flex-shrink-0 mb-6 md:mb-0">
                        <div 
                            className="relative rounded-xl overflow-hidden border-4"
                            style={{ 
                                borderColor: 'var(--color-secondary-subtle)', 
                                backgroundColor: avgColor,
                                width: '100%', 
                                paddingBottom: '100%'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                {imageSrc && imageSrc !== "https://placehold.co/500x500/e0e0e0/555555?text=Product+Image+Error" ? (
                                    <img 
                                        src={imageSrc}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                        onError={handleImageError}
                                        onLoad={(e) => extractAverageColor(e.target)}
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    <ImageIcon className="w-24 h-24" style={{ color: 'var(--color-secondary-subtle)' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 pt-4 flex flex-col justify-between">
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-primary-dark)' }}>
                                {product.name}
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <div className="mb-4">
                                <span className="text-4xl font-extrabold" style={{ color: 'var(--color-secondary-highlight)' }}>
                                    ${product.price ? product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                                </span>
                            </div>

                            <div className="text-sm font-semibold mb-6">
                                <span className={`px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                                </span>
                            </div>

                            <button
                                onClick={() => product.stock > 0 && setIsModalOpen(true)}
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
            
            <OrderConfirmationModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmOrder}
            />
        </div>
    );
};

export default ProductDetails;