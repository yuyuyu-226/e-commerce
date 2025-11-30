import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


// Components
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to hold the logged-in user's data
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  // This function will be passed to the Login page
  const handleLogin = (userData) => {
    setUser(userData); 
    setIsLoggedIn(true);

    if (userData.role === 'Admin') {
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      navigate('/'); // Redirect regular users to home
    }
  };

  // This function will be passed to the NavBar
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div>
      <NavBar 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Routes*/}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route 
            path="/product-details/:id" 
            element={<ProductDetails isLoggedIn={isLoggedIn} user={user}/>} 
          />

          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />

          <Route path="/admin" element={<AdminDashboard />} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;