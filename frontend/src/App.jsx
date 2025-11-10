// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar.jsx';

// Pages
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  return (
    <div>
      {/* The NavBar stays here because it should be visible on all pages */}
      <NavBar />

      {/* Routes defines the area where page content will change.
        The Route components map a URL path to a specific Page component.
      */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* You might want a route for the sign-up form */}
          {/* <Route path="/signup" element={<SignUpForm />} /> */}
          
          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;

{/*}
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-light-accent)' }}>Catalog</h2>
        
        
        <div className="space-y-4">
          
          
          <div className="p-2 bg-white rounded-lg flex items-center border border-gray-300">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm">Search (Removed)</span>
          </div>

          
          <div className="space-y-3 p-2 border-t" style={{ borderColor: 'var(--color-light-accent)' }}>
            <h4 className="font-medium" style={{ color: 'var(--color-light-accent)' }}>Filters (Removed)</h4>
            <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary-accent)' }} />
                <label className="text-gray-200">Category 1</label>
            </div>
            <div className="flex items-center space-x-2">
                <input type="checkbox" disabled className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary-accent)' }} />
                <label className="text-gray-200">Category 2</label>
            </div>
          </div>

        </div>
        */}