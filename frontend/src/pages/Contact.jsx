import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Home, Mail, Phone, MapPin, CheckSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
        consent: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submission logic here (e.g., API call)
        alert("Thank you for contacting us. We will get back to you shortly.");
        setFormData({ name: '', email: '', phone: '', interest: '', message: '', consent: false });
    };

    // Common input style matching your theme
    const inputClasses = "w-full p-4 border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)] focus:border-transparent transition-all duration-200";

    return (
        <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16" style={{ backgroundColor: 'var(--color-light-accent)' }}>
            
            {/* --- HEADER SECTION --- */}
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--color-secondary-highlight)' }}>
                    Get In Touch
                </h2>
                <h1 className="text-5xl md:text-6xl font-light tracking-wide" style={{ color: 'var(--color-primary-dark)' }}>
                    CONTACT US
                </h1>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                
                {/* --- LEFT COLUMN: ONLINE INQUIRY FORM --- */}
                <div>
                    <h3 className="text-xl font-normal tracking-widest text-center mb-8 uppercase" style={{ color: 'var(--color-primary-dark)' }}>
                        Online Inquiry
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                value={formData.name} 
                                onChange={handleChange}
                                className={inputClasses}
                                required 
                            />
                        </div>
                        <div>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange}
                                className={inputClasses}
                                required 
                            />
                        </div>
                        <div>
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Phone" 
                                value={formData.phone} 
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                        <div className="relative">
                            <select 
                                name="interest" 
                                value={formData.interest} 
                                onChange={handleChange}
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="" disabled>Select An Interest</option>
                                <option value="products">Product Inquiry</option>
                                <option value="manufacturing">Manufacturing Services</option>
                                <option value="bulk">Bulk Orders</option>
                                <option value="support">Order Support</option>
                                <option value="other">Other</option>
                            </select>
                            {/* Custom Arrow Indicator */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <div>
                            <textarea 
                                name="message" 
                                placeholder="Message" 
                                value={formData.message} 
                                onChange={handleChange}
                                rows="5"
                                className={inputClasses}
                                required
                            ></textarea>
                        </div>

                        {/* Privacy Checkbox */}
                        <div className="flex items-start space-x-3 pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="consent"
                                    name="consent"
                                    type="checkbox"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-[var(--color-primary-accent)]"
                                    required
                                />
                            </div>
                            <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed text-justify">
                                By providing your contact information, you acknowledge and agree to our Privacy Policy and consent to receiving marketing communications. This consent isn't necessary for purchasing any products or services and you may opt out at any time.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="px-10 py-4 text-sm font-bold text-white uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
                                style={{ backgroundColor: 'var(--color-primary-dark)' }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- RIGHT COLUMN: CONTACT DETAILS --- */}
                <div className="text-center flex flex-col items-center">
                    <h3 className="text-xl font-normal tracking-widest text-center w-full mb-8 uppercase" style={{ color: 'var(--color-primary-dark)' }}>
                        Contact Details
                    </h3>

                    <div className="space-y-10 text-gray-600 w-full">
                        
                        {/* Main Contact Info */}
                        <div className="flex flex-col items-center">
                            <a href="mailto:info@fabricateandstyle.ph" className="text-lg font-medium underline decoration-1 underline-offset-4 mb-1 hover:text-blue-600 transition">
                                info@manufactureandproduce.ph
                            </a>
                            <a href="tel:+63281234567" className="text-lg">
                                +63 (2) 8123 4567
                            </a>
                        </div>

                        {/* Locations List */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Corporate Headquarters</h4>
                                <p className="text-sm">25th Floor, Philam Life Tower</p>
                                <p className="text-sm">Paseo de Roxas, Makati City, 1226</p>
                                <p className="text-sm">Metro Manila, Philippines</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Manufacturing Plant</h4>
                                <p className="text-sm">Block 3, Lot 8, Phase 1</p>
                                <p className="text-sm">Laguna Technopark, Biñan</p>
                                <p className="text-sm">Laguna, 4024 Philippines</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Visayas Distribution Center</h4>
                                <p className="text-sm">Mandaue North Central</p>
                                <p className="text-sm">Mandaue City, Cebu</p>
                                <p className="text-sm">6014 Philippines</p>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="pt-8 flex space-x-6 justify-center">
                            <SocialLink href="#" icon={<Facebook className="w-6 h-6" />} />
                            <SocialLink href="#" icon={<Instagram className="w-6 h-6" />} />
                            <SocialLink href="#" icon={<Youtube className="w-6 h-6" />} />
                            <SocialLink href="#" icon={<Home className="w-6 h-6" />} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for social icons
const SocialLink = ({ href, icon }) => (
    <a 
        href={href} 
        className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 hover:scale-110 transition-all duration-300 text-gray-700"
    >
        {icon}
    </a>
);

export default Contact;