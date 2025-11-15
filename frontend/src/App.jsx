
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
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const App = () => {
  return (
    <div>
      <NavBar />

      {/* Main Routes*/}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;