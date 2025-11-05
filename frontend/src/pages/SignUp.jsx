import React from 'react';
// Assuming the SignUpForm is in the same directory or imported correctly
import SignUpForm from '../components/SignUpForm.jsx'; 

/**
 * Renders the main Sign-Up Page layout, centering the form using CSS flexbox properties.
 */
const SignUp = () => {
  const pageStyle = {
    // 1. Ensures the container takes up the full height of the viewport
    minHeight: '100vh', 
    // 2. Sets a light background color
    backgroundColor: '#ffffff', 
    // 3. Initializes a Flexbox container
    display: 'flex', 
    // 4. Centers children horizontally
    justifyContent: 'center', 
    // 5. Centers children vertically
    alignItems: 'center', 
    // 6. Adds padding around the edges
    padding: '30px', 
  };
  
  return (
    <div style={pageStyle}>
      
      {/* The SignUpForm component is placed here. 
          We'll use a wrapper to ensure it doesn't stretch too wide. */}
      <div style={formWrapperStyle}>
        <SignUpForm />
      </div>
      
    </div>
  );
};

// Style for the wrapper around the form to control its max width and padding
const formWrapperStyle = {
  
    maxWidth: '450px', // Max width of the form container
    width: '100%',     // Ensures it scales down on smaller screens
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};


export default SignUp;