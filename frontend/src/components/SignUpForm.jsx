import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming routing is set up

// Basic email format validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation: at least 8 characters, one uppercase, one lowercase, one number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const SignUpForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // State to trigger redirection after success
  const [shouldRedirect, setShouldRedirect] = useState(false); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for the field as the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    // Clear submission message when user starts typing again
    if (submitMessage) {
        setSubmitMessage('');
    }
  };

  // Validation logic
  const validate = (data) => {
    let newErrors = {};

    // 1. Required Fields
    if (!data.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (data.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!data.password) {
      newErrors.password = 'Password is required.';
    }
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    }

    // 2. Email Format
    if (data.email.trim() && !EMAIL_REGEX.test(data.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // 3. Password Strength
    if (data.password && !PASSWORD_REGEX.test(data.password)) {
      newErrors.password = 'Password must be at least 8 characters, and include at least one uppercase letter, one lowercase letter, and one number.';
    }

    // 4. Password Match
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setShouldRedirect(false);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // --- Simulate API Call ---
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Form Data Submitted:', formData); 
        setSubmitMessage('🎉 Sign-up successful! You will be redirected to login.');
        setShouldRedirect(true); // Trigger redirection
        // Optionally clear form data on success
        // setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }, 1500);
      // --------------------------
    } else {
      setSubmitMessage('🚫 Please review the form errors.');
    }
  };
  
  // Effect for handling redirection
  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        // In a real app, you would use navigate('/login') here
        window.location.href = '/login'; // Simulated redirect to login page
        // Reset state after simulated redirect
        setShouldRedirect(false); 
        setSubmitMessage('');
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, [shouldRedirect]);
    
  // Reusable classes
  const inputClass = (isError) => 
    `w-full p-3 pl-10 border text-gray-800 rounded-xl outline-none transition-all duration-200 focus:ring-4 focus:ring-offset-2 ${
      isError 
        ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
        : 'border-gray-300 focus:border-blue-600 focus:ring-blue-200'
    }`;
  
  const iconBaseClass = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400";

  return (
    // Outer container for centering and responsive width
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
      {/* Form Card (Responsive: max-w-lg on mobile, max-w-2xl on desktop) */}
      <div className="w-full max-w-lg md:max-w-xl bg-white p-8 md:p-12 shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <div className="relative">
              <User className={iconBaseClass} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleChange}
                className={inputClass(errors.username)}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : null}
              />
            </div>
            {errors.username && <p id="username-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className={iconBaseClass} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(errors.email)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : null}
              />
            </div>
            {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.email}</p>}
          </div>

          
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className={iconBaseClass} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={inputClass(errors.password)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-hint'}
              />
            </div>
            {errors.password && <p id="password-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.password}</p>}
            {!errors.password && (
              <small id="password-hint" className="text-xs text-gray-500 mt-1 block">
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className={iconBaseClass} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass(errors.confirmPassword)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : null}
              />
            </div>
            {errors.confirmPassword && <p id="confirm-password-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.confirmPassword}</p>}
          </div>

          {/* Submission Button */}
          <div className='pt-2'>
            <button 
              type="submit" 
              disabled={isSubmitting || shouldRedirect} 
              className={`w-full flex items-center justify-center py-3 px-4 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                isSubmitting || shouldRedirect
                  ? 'bg-blue-400 cursor-not-allowed opacity-80' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" /> 
                  Processing...
                </>
              ) : shouldRedirect ? (
                'Redirecting...'
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          
          {/* Submission Message */}
          {submitMessage && (
            <p className={`mt-4 p-3 rounded-xl text-center font-medium flex items-center justify-center ${
              submitMessage.includes('successful') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {submitMessage.includes('successful') ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2" />
              )}
              {submitMessage}
            </p>
          )}

          {/* Login Link */}
          <div className='text-center mt-6 pt-4 border-t border-gray-100'>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;