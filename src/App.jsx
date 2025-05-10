// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.jpg';

// Import components
import Header from './components/Header';
import Banner from './components/Banner';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  return (
    <div className="app">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-logo">
           <img src={logo} alt="Vivaha muchtallu with sanju" />
          </div>
          <p className="loading-text">Loading amazing photography...</p>
        </div>
      ) : (
        <>
          <Header />
          <Banner />
          <AboutUs />
          <Services />
          <Portfolio />
          <Team />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;