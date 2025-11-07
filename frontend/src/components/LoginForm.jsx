import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, X, Loader2 } from 'lucide-react';
// Note: Removed 'Link' import to prevent router context errors

// API Endpoint from your server.js and auth.js
const API_URL = 'http://localhost:5000/auth/login';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for the success modal

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error as the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validation logic
  const validate = (data) => {
    let newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!data.password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
  };

  // Handle form submission with real API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Body matches your authController.js (email, password)
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          // Successful login (Status 200)
          const data = await response.json();
          
          // --- IMPORTANT ---
          // This is where you would save the token for future requests
          // Example: localStorage.setItem('token', data.token);
          console.log('Login successful, token received:', data.token);
          
          setSubmitMessage(''); 
          setShowModal(true); // Show the success modal
          
        } else {
          // Server returned an error (e.g., 400, 401)
          const errorData = await response.json();
          // Set error message based on your backend's response format
          setSubmitMessage(`🚫 ${errorData.message || 'Invalid email or password.'}`);
          setFormData({ ...formData, password: '' }); // Clear password field on failure
        }
      } catch (error) {
        // Network errors (e.g., server not running, CORS issues)
        console.error('Login Fetch Error:', error);
        setSubmitMessage('⚠️ Could not connect to the server. Check network or CORS settings.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Redirect logic (Simulated redirection for Canvas)
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        window.location.href = '/'; // Redirect to home page
        setShowModal(false); 
      }, 2000); // Wait 2 seconds before "redirecting"

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // Styling helpers
  const baseInputClasses = "w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-green-400 focus:border-green-400";
  const errorInputClasses = "border-red-500 focus:ring-red-400 focus:border-red-500";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const errorTextClasses = "text-sm text-red-500 mt-1";

  return (
    <>
      {/* Using max-w-xl to match the signup form's width */}
      <div className="w-full max-w-lg md:max-w-xl bg-white p-8 md:p-12 shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-normal text-center text-gray-800 mb-8">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`${baseInputClasses} ${errors.email ? errorInputClasses : ''}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <p className={errorTextClasses}>{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`${baseInputClasses} ${errors.password ? errorInputClasses : ''}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.password && <p className={errorTextClasses}>{errors.password}</p>}
          </div>

          {/* Forgot Password Link (as an <a> tag) */}
          <div className="flex justify-end mb-8">
            <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition duration-150">
              Forgot Password?
            </a>
          </div>

          {/* Submission Button */}
          <div className='text-center'>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-5 h-5" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </>
              )}
            </button>
          </div>
          
          {/* Error Message */}
          {submitMessage && (
            <p className="text-center font-medium text-sm mt-4 text-red-600 flex items-center justify-center">
              {submitMessage}
            </p>
          )}

          {/* Sign Up Link (as an <a> tag) */}
          <div className='text-center mt-6'>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-xs w-full transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Login Successful!</h3>
            <p className="text-gray-600 mb-4">You will be redirected home shortly.</p>
            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-5 h-5 inline mr-1" /> Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;