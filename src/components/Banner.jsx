import React, { useEffect, useState, useRef } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Banner.css'; // Using the improved CSS file
import banner1 from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/baneer1.jpg';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const slideInterval = useRef(null);
  
  // Banner images array
  const bannerImages = [banner1, banner2, banner3];
  
  // Slide content array
  const slideContent = [
    {
      category: "Professional Photography",
      title: "Telling Stories Through Images",
      description: "Award-winning photography that captures authentic moments with artistic precision",
      theme: "portrait"
    },
    {
      category: "Professional Photography",
      title: "Weddings & Special Moments",
      description: "Preserving your most cherished celebrations with emotional depth and timeless elegance",
      theme: "wedding"
    },
    {
      category: "Professional Photography",
      title: "Commercial Excellence",
      description: "Elevating your brand with professional photography that speaks to your audience",
      theme: "commercial"
    }
  ];

  useEffect(() => {
    // Set banner as loaded with slight delay for animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Set up automatic slide rotation
    slideInterval.current = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % totalSlides);
    }, 6000);

    // Clean up timers on component unmount
    return () => {
      clearTimeout(loadTimer);
      clearInterval(slideInterval.current);
    };
  }, [totalSlides]);

  // Handle manual slide change
  const handleSlideChange = (index) => {
    setActiveSlide(index);
    // Reset interval timer when manually changing slides
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % totalSlides);
    }, 6000);
  };

  return (
    <div className={`hero-banner ${isLoaded ? 'loaded' : ''}`}>

      {/* Social Media Sidebar with Icons */}
      <div className="social-sidebar">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" />
        </a>
      </div>

      {/* Main Hero Content */}
      <div className="hero-slider">
        {/* Background Images */}
        <div className="slider-bg">
          {bannerImages.map((img, index) => (
            <div 
              key={`bg-${index}`}
              className={`slide-bg ${activeSlide === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {/* Slider Content */}
        <div className="container">
          <div className="slider-content">
            <div className="slides-wrapper">
              {slideContent.map((slide, index) => (
                <div 
                  key={`slide-${index}`} 
                  className={`slide ${activeSlide === index ? 'active' : ''}`}
                  data-theme={slide.theme}
                >
                  <span className="slide-category">{slide.category}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  
                  <div className="cta-group">
                    <a href="#services" className="btn btn-primary">Explore Services</a>
                    <a href="#portfolio" className="btn btn-outline">View Portfolio</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Dots */}
            <div className="slider-nav">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button 
                  key={`dot-${index}`}
                  className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Info */}
      <div className="floating-contact">
        <div className="contact-item">
          <span className="label">Email</span>
          <a href="mailto:vms9676015281@gmail.com">vms9676015281@gmail.com</a>
        </div>
        
        <div className="contact-item">
          <span className="label">Call Us</span>
          <a href="tel:+919676015281">+91 (967) 601-5281</a>
        </div>
      </div>
    </div>
  );
}

export default Banner;