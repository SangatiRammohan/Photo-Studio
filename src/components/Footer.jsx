// components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="vivaha_muchhatlu_with_Sanju Logo" />
        <h3>vivaha_muchhatlu_with_Sanju</h3>
            <p>Capturing life's precious moments</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Book Now</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Wedding Photography</a></li>
                <li><a href="#services">Portrait Sessions</a></li>
                <li><a href="#services">Event Coverage</a></li>
                <li><a href="#services">Commercial Photography</a></li>
                <li><a href="#services">Photo Restoration</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">👍</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📱</a>
              </div>
              <div className="newsletter">
                <h4>Subscribe to our newsletter</h4>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email address" />
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 vivaha_muchhatlu_with_Sanju
          . All rights reserved.</p>
      <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;