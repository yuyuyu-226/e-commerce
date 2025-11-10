import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx'; 

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 " style={{ backgroundColor: 'var(--color-light-accent)' }}>
      <SignUpForm />
      
    </div>
  );
};

export default SignUp;