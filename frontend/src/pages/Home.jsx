import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Loader } from 'lucide-react';
import HeroImage from '../assets/heroSection.jpg';

const API_BASE_URL = 'http://localhost:5000';

const Home = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://placehold.co/600x400/e0e0e0/555555?text=No+Image";
        
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
            return imagePath;
        }

        const normalizedPath = imagePath.replace(/\\/g, '/');
        let cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
        
        if (cleanPath.startsWith('images/')) {
            cleanPath = cleanPath.replace('images/', '');
        }

        return `/images/${cleanPath}`;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products/getProducts`);
                if (!response.ok) throw new Error("Failed to fetch data");
                
                const rawData = await response.json();
                const products = Array.isArray(rawData) ? rawData : rawData.products || [];

                const uniqueCats = {};
                
                products.forEach(product => {
                    if (!product.category) return;

                    if (!uniqueCats[product.category]) {
                        uniqueCats[product.category] = {
                            name: product.category,
                            image: product.image_url, 
                            description: `Explore our latest ${product.category} collection.`
                        };
                    } 
                    else if (!uniqueCats[product.category].image && product.image_url) {
                         uniqueCats[product.category].image = product.image_url;
                    }
                });

                setCategories(Object.values(uniqueCats).slice(0, 3));
            } catch (err) {
                console.error("Error loading categories:", err);
                setError("Unable to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate('/products', { state: { category: categoryName } });
    };

    return (
        <div className="font-sans text-gray-800">

            {/* --- SECTION 1: HERO SECTION --- */}
            <section 
                className="relative py-32 px-6 md:px-12 text-center bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${HeroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                        Innovating Textile Manufacturing for Tomorrow's Fashion
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        From concept to creation, we blend cutting-edge technology with timeless craftsmanship to produce high-quality apparel for leading brands worldwide.
                    </p>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:-translate-y-1"
                        style={{ backgroundColor: 'var(--color-primary-accent)' }}
                    >
                        Explore Our Collections
                    </Link>
                </div>
            </section>

            {/* --- SECTION 2: PRODUCT CATEGORIES --- */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16" style={{ color: 'var(--color-primary-dark)' }}>
                        Our Product Categories
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader className="w-10 h-10 animate-spin text-gray-400" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Could not load specific categories.</p>
                            <Link to="/products" className="text-blue-600 underline mt-2 inline-block">View All Products</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categories.length > 0 ? categories.map((cat, index) => (
                                <div key={index} className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                    <div className="h-64 overflow-hidden bg-gray-100 relative">
                                        <img 
                                            src={getImageUrl(cat.image)} 
                                            alt={cat.name} 
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => e.target.src = "https://placehold.co/600x400/e0e0e0/555555?text=Image+Not+Found"}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                    </div>
                                    
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-3 capitalize" style={{ color: 'var(--color-primary-dark)' }}>
                                            {cat.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6 text-sm flex-grow">
                                            {cat.description}
                                        </p>
                                        <button 
                                            onClick={() => handleCategoryClick(cat.name)}
                                            className="w-full py-3 px-4 rounded-lg font-bold text-white flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: 'var(--color-primary-accent)' }}
                                        >
                                            View More <ArrowRight className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-3 text-center text-gray-500 py-10">
                                    No categories found. Add products to your database to see them here.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* --- SECTION 3: MANUFACTURING PROCESS --- */}
            <section className="py-20 px-6 md:px-12" style={{ backgroundColor: 'var(--color-light-accent)' }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16" style={{ color: 'var(--color-primary-dark)' }}>
                        Our Manufacturing Process & Capabilities
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative h-96 w-full bg-gray-300 rounded-lg overflow-hidden shadow-lg border-2 border-white">
                            <img 
                                src="https://images.unsplash.com/photo-1504279577054-acfeccf8dr52?auto=format&fit=crop&q=80&w=800" 
                                alt="Factory Floor" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-secondary-highlight)' }}>
                                Precision, Quality, and Innovation at Every Step
                            </h3>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                We are committed to delivering excellence through a meticulous manufacturing process, 
                                supported by state-of-the-art technology and a highly skilled workforce.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Advanced Fabric Sourcing & Inspection",
                                    "Computer-Aided Design & Pattern Making",
                                    "Automated Cutting & Sewing Technologies",
                                    "Strict Quality Control & Assurance",
                                    "Sustainable Production Practices"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mt-1 mr-3 flex-shrink-0" style={{ color: 'var(--color-primary-accent)' }} />
                                        <span className="text-gray-800 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                to="/about"
                                className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                                style={{ backgroundColor: 'var(--color-primary-accent)' }}
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;