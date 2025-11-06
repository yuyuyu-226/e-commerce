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