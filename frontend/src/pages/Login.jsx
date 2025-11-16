import React, { useState } from 'react';
import { Mail, Lock, LogIn, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // Use Link for SPA navigation

// API Endpoint from your server.js and auth.js
const API_URL = 'http://localhost:5000/auth/login';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1. Accept 'onLogin' prop from App.jsx
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  // Removed showModal and useEffect, as App.jsx will handle the redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

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
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json(); // Get data for both success/error

        if (response.ok) {
          // --- 2. THE FIX ---
          // Login was successful! Call the 'onLogin' prop from App.jsx
          // This will update the state in App.jsx and trigger the NavBar change.
          // (Assuming your backend returns { token, user: {...} })
          onLogin(data.user);
          
          // You can still save the token
          localStorage.setItem('token', data.token);
          
        } else {
          // Server returned an error
          setSubmitMessage(`🚫 ${data.message || 'Invalid email or password.'}`);
          setFormData({ ...formData, password: '' });
        }
      } catch (error) {
        console.error('Login Fetch Error:', error);
        setSubmitMessage('⚠️ Could not connect to the server. Check network.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Styling helpers
  const baseInputClasses = "w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-green-400 focus:border-green-400";
  const errorInputClasses = "border-red-500 focus:ring-red-400 focus:border-red-500";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const errorTextClasses = "text-sm text-red-500 mt-1";

  return (
    <>
      {/* This component returns the form, which App.jsx will render on the /login route */}
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-light-accent)' }}>
        <div className="w-full max-w-lg md:max-w-xl bg-white p-8 md:p-12 shadow-2xl rounded-2xl">
          <h2 className="text-3xl font-normal text-center text-gray-800 mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            
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

            <div className="flex justify-end mb-8">
              {/* Use Link for SPA-friendly navigation */}
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition duration-150">
                Forgot Password?
              </Link>
            </div>

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
            
            {submitMessage && (
              <p className="text-center font-medium text-sm mt-4 text-red-600 flex items-center justify-center">
                {submitMessage}
              </p>
            )}

            <div className='text-center mt-6'>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;