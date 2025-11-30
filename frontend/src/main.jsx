import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

// Import your global CSS file if you have one
import './index.css'; 

// --- The core rendering logic ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);