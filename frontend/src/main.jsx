import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your page components
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';


// Import your main component (often named App.jsx or a Layout component)
// Assuming you will create an App.jsx to hold the common structure (like the NavBar)
import App from './App.jsx';

// Import your global CSS file if you have one
import './index.css'; 

// --- The core rendering logic ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. BrowserRouter (Router) is necessary to enable client-side routing.
      2. The App component will house the NavBar and the logic for displaying
         the correct content based on the URL path.
    */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);