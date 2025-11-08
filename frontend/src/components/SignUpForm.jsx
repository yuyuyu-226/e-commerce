import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, CheckCircle, AlertTriangle, Loader, UserPlus } from 'lucide-react';
// REMOVED: import { Link, useNavigate } from 'react-router-dom'; 

// Basic email format validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation: at least 8 characters, one uppercase, one lowercase, one number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const SignUpForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
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

    // 1. New Required Fields (Matching Backend first_name/last_name fields)
    if (!data.firstName.trim()) {
      newErrors.firstName = 'First Name is required.';
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last Name is required.';
    }

    // 2. Existing Required Fields
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

    // 3. Email Format
    if (data.email.trim() && !EMAIL_REGEX.test(data.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // 4. Password Strength
    if (data.password && !PASSWORD_REGEX.test(data.password)) {
      newErrors.password = 'Password must be at least 8 characters, and include at least one uppercase letter, one lowercase letter, and one number.';
    }

    // 5. Password Match
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  // Handle form submission (Updated with fetch API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setShouldRedirect(false);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { username, email, password, firstName, lastName } = formData;

      try {
        setIsSubmitting(true);
        setSubmitMessage('Creating account...');

        // API Call to backend on port 5000
        const response = await fetch('http://localhost:5000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            // Map camelCase to backend's snake_case schema
            first_name: firstName, 
            last_name: lastName    
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Success (Status 201)
          console.log('Signup successful. API Response:', data);
          setSubmitMessage(`🎉 Signup successful! You will be redirected to login.`);
          // Here you would typically store the received 'data.token'
          setShouldRedirect(true);
        } else {
          // Error (Status 400, 500, etc. from server validation)
          setSubmitMessage(`🚫 Signup Failed: ${data.message || 'An unknown server error occurred.'}`);
        }

      } catch (error) {
        console.error('Network or Fetch Error:', error);
        setSubmitMessage('🚫 Network error. Check if the server is running on port 5000.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSubmitMessage('🚫 Please review the form errors.');
    }
  };
  
  // Effect for handling redirection
  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        // FIX: Use standard browser navigation for compatibility
        window.location.href = '/login'; 
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, [shouldRedirect]);
    
  // Reusable Tailwind Classes
  
  // Base class for inputs, handles error states and spacing for icons
  const inputClass = (fieldName, hasIcon = true) => 
    `w-full p-3 rounded-xl outline-none transition-all duration-200 focus:ring-4 focus:ring-offset-2 shadow-sm ${hasIcon ? 'pl-10' : ''} ${
      errors[fieldName] 
        ? 'border-2 border-red-500 focus:border-red-600 focus:ring-red-200' 
        : 'border border-gray-300 focus:border-blue-600 focus:ring-blue-200'
    } text-[var(--color-primary-dark)]`; // Use dark color for input text
  
  const iconBaseClass = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none";

  return (
    // Outer container: Set background to light-accent for the centering area
    <div className="min-h-screen flex items-center justify-center p-4 font-inter" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white p-8 md:p-10 shadow-2xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center flex items-center justify-center" style={{ color: 'var(--color-primary-dark)' }}>
            {/* Icon color set to primary accent */}
            <UserPlus className="w-8 h-8 mr-3" style={{ color: 'var(--color-primary-accent)' }} />
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* First Name & Last Name Fields (Side-by-side on desktop) */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-5 md:space-y-0">
            {/* First Name Field */}
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass('firstName', false)} // No icon, so pass false
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <p className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.firstName}</p>}
            </div>

            {/* Last Name Field */}
            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass('lastName', false)} // No icon, so pass false
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <p className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.lastName}</p>}
            </div>
          </div>


          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>Username</label>
            <div className="relative">
              <User className={iconBaseClass} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleChange}
                className={inputClass('username')}
                aria-invalid={!!errors.username}
              />
            </div>
            {errors.username && <p id="username-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>Email Address</label>
            <div className="relative">
              <Mail className={iconBaseClass} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass('email')}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.email}</p>}
          </div>

          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>Password</label>
            <div className="relative">
              <Lock className={iconBaseClass} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={inputClass('password')}
                aria-invalid={!!errors.password}
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-secondary-subtle)' }}>Confirm Password</label>
            <div className="relative">
              <Lock className={iconBaseClass} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass('confirmPassword')}
                aria-invalid={!!errors.confirmPassword}
              />
            </div>
            {errors.confirmPassword && <p id="confirm-password-error" className="text-sm text-red-600 mt-1 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" />{errors.confirmPassword}</p>}
          </div>

          {/* Submission Button */}
          <div className='pt-2'>
            <button 
              type="submit" 
              disabled={isSubmitting || shouldRedirect} 
              // Set button background to primary accent
              style={{ backgroundColor: 'var(--color-primary-accent)', color: 'var(--color-primary-dark)' }}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-full font-bold transition-all duration-300 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[var(--color-primary-accent)] ${
                isSubmitting || shouldRedirect
                  ? 'opacity-80 cursor-not-allowed' 
                  : 'hover:opacity-90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" style={{ color: 'var(--color-primary-dark)' }} /> 
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
            <p className={`mt-4 p-3 rounded-xl text-center font-semibold flex items-center justify-center ${
              submitMessage.includes('successful') 
                ? 'bg-[var(--color-light-accent)] text-[var(--color-primary-dark)]' // Success uses light accent background
                : 'bg-red-100 text-red-700'
            }`}>
              {submitMessage.includes('successful') ? (
                <CheckCircle className="w-5 h-5 mr-2" style={{ color: 'var(--color-primary-accent)' }} /> // Success checkmark uses primary accent
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2" />
              )}
              {submitMessage}
            </p>
          )}

          {/* Login Link */}
          <div className='text-center mt-6 pt-4 border-t border-gray-200'>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              {/* Login link uses secondary highlight color */}
              <a href="/login" className="font-bold hover:opacity-80 transition duration-150" style={{ color: 'var(--color-secondary-highlight)' }}>
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;