import React, { useState } from 'react';

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
  };

  // Validation logic
  const validate = (data) => {
    let newErrors = {};

    // 1. Required Fields
    if (!data.username.trim()) {
      newErrors.username = 'Username is required.';
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

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // --- Simulate API Call ---
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Form Data Submitted:', formData); 
        setSubmitMessage('🎉 Sign-up successful! Check the console for data.');
        // Optionally clear form data on success
        // setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }, 1500);
      // --------------------------
    } else {
      setSubmitMessage('🚫 Please correct the errors above.');
    }
  };
    
  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        /* Base styles */
        .form-container {
          font-family: 'Inter', sans-serif;
          max-width: 28rem;
          margin: 4rem auto;
          padding: 2rem;
          background-color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
          /* Responsive adjustments */
          width: 90%; 
        }

        .form-title {
          font-size: 1.875rem; /* 3xl */
          font-weight: 700; /* bold */
          margin-bottom: 1.5rem; /* mb-6 */
          text-align: center;
          color: #1f2937; /* gray-800 */
        }

        .form-group {
          margin-bottom: 1.25rem; /* space-y-5 */
        }

        .form-label {
          display: block;
          font-size: 0.875rem; /* sm */
          font-weight: 500; /* medium */
          color: #374151; /* gray-700 */
          margin-bottom: 0.25rem; /* mb-1 */
        }

        .input-field {
          width: 93%;
          padding: 0.75rem; /* p-3 */
          border: 1px solid #d1d5db; /* border-gray-300 */
          border-radius: 0.5rem; /* rounded-lg */
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        /* Focus state */
        .input-field:focus {
          border-color: #3b82f6; /* blue-500 */
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25); /* focus:ring-blue-200 */
        }

        /* Error state */
        .input-error {
          border-color: #ef4444; /* red-500 */
        }

        .input-error:focus {
          border-color: #ef4444; /* red-500 */
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25); /* focus:ring-red-300 */
        }

        .error-text {
          color: #ef4444; /* red-500 */
          font-size: 0.875rem; /* text-sm */
          margin-top: 0.25rem; /* mt-1 */
        }

        .hint-text {
          color: #6b7280; /* gray-500 */
          font-size: 0.75rem; /* xs */
          margin-top: 0.25rem; /* mt-1 */
          display: block;
        }

        /* Button styles */
        .button-container {
          text-align: center;
        }
        .submit-button {
          width: 60%;
          padding: 0.75rem 1rem; /* py-3 */
          margin-top: 1.5rem; /* mt-6 */
          border-radius: 3rem; /* rounded-lg */
          font-weight: 600; /* font-semibold */
          color: #ffffff;
          background-color: #2563eb; /* blue-600 */
          transition: background-color 0.2s, opacity 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        }

        .submit-button:not(:disabled):hover {
          background-color: #1d4ed8; /* blue-700 */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          background-color: #60a5fa; /* blue-400 */
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* Message styles */
        .success-message {
          color: #10b981; /* green-600 */
        }

        .error-message {
          color: #dc2626; /* red-600 */
        }

        .submit-message {
          text-align: center;
          font-weight: 500;
          margin-top: 1rem;
        }
        `}
      </style>
      <div className="form-container">
        <h2 className="form-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`input-field ${errors.username ? 'input-error' : ''}`}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          
          {/* Role Dropdown Field (NEW) 
          <div className="form-group">
            <label htmlFor="role" className="form-label">User Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`input-field ${errors.role ? 'input-error' : ''}`}
            >
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Buyer">Buyer</option>
            </select>
            {errors.role && <p className="error-text">{errors.role}</p>}
          </div>
            */}
            
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            {!errors.password && (
              <small className="hint-text">
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number.
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          {/* Submission Button */}
          <div className='button-container'>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="submit-button"
            >
              {isSubmitting ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
          
          {/* Submission Message */}
          {submitMessage && (
            <p className={`submit-message ${submitMessage.includes('successful') ? 'success-message' : 'error-message'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUpForm;