import React, { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';
import { AuthContext } from './AuthContext.jsx'; // Import the context

// This component wraps routes that require authentication
const ProtectedRoute = ({ children, requiredRole }) => {
  // Get auth state from the context
  const { isLoggedIn, user, isAuthReady } = useContext(AuthContext);

  // 1. Wait for auth check to complete
  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // 2. Check if user is logged in
  if (!isLoggedIn) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // 3. Check if a specific role is required
  if (requiredRole && user?.role !== requiredRole) {
    // User is logged in, but not authorized for this page
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
          <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-red-500 max-w-md text-center">
              <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
              <p className="text-gray-600 mb-6">
                  You do not have the required permissions ({requiredRole}) to view this page.
              </p>
              <Link to="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition">
                  Go to Home Page
              </Link>
          </div>
      </div>
    );
  }

  // 4. User is authorized, render the child component
  return children;
};

export default ProtectedRoute;