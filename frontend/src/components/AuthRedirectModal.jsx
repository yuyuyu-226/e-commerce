import React from 'react';
import { AlertTriangle, X, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthRedirectModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 transition-opacity"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
        </div>
        
        <h2 className="text-xl font-bold text-center mb-3" style={{ color: 'var(--color-primary-dark)' }}>
          Login Required
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          You must be logged in to place an order.
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleLoginRedirect}
            className="w-full py-3 rounded-lg text-lg font-bold text-white transition-colors duration-300 hover:bg-opacity-90"
            style={{ backgroundColor: 'var(--color-primary-dark)' }}
          >
            <span className="flex items-center justify-center">
              <LogIn className="w-5 h-5 mr-2" />
              Go to Login
            </span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg text-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthRedirectModal;