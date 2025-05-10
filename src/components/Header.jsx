import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.jpg';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="vivaha_muchhatlu_with_Sanju Logo" className="logo" />
          <h1>vivaha_muchhatlu_with_Sanju</h1>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={mobileMenuOpen ? 'active' : ''}>
          <ul className="nav-links">
            <li><a href="#" onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
            <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
            <li><a href="#portfolio" onClick={closeMobileMenu}>Portfolio</a></li>
            <li><a href="#team" onClick={closeMobileMenu}>Team</a></li>
            <li><a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a></li>
            <li><a href="#contact" className="cta-button" onClick={closeMobileMenu}>Book Now</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;