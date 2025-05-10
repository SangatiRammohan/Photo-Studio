import React, { useEffect, useRef, useState } from 'react';
import '../styles/AboutUs.css';
import about from '../assets/about.jpg';

function AboutUs() {
  const aboutRef = useRef(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  
  const experienceData = [
    { number: "8+", text: "Years Experience" },
    { number: "1500+", text: "Photo Sessions" },
    { number: "250+", text: "Weddings Captured" },
    { number: "50+", text: "Awards Won" }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    
    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Staggered animation for highlights
  useEffect(() => {
    if (aboutRef.current && aboutRef.current.classList.contains('visible')) {
      const highlightAnimation = setInterval(() => {
        const nextHighlight = activeHighlight === null ? 0 : (activeHighlight + 1) % experienceData.length;
        setActiveHighlight(nextHighlight);
      }, 3000);
      
      return () => clearInterval(highlightAnimation);
    }
  }, [activeHighlight, experienceData.length]);

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="parallax-background"></div>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      
      <div className="container">
        <h2 className="section-title">
          <span className="title-accent">Our</span> Story
        </h2>
        
        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image">
              <img src={about} alt="Professional photography session" />
              <div className="image-overlay"></div>
            </div>
            <div className="experience-badge">
              <span className="badge-years">8+</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
          </div>
          
          <div className="about-text">
            <div className="text-accent-line"></div>
            <h3>Creating Timeless Memories Since 2015</h3>
            <p className="fade-in-paragraph">
              <span className="first-letter">V</span>ivaha_muchhatlu_with_Sanju was founded with a passion for capturing life's most precious moments. Our team of professional photographers specializes in a wide range of photography styles, from candid wedding shots to polished corporate headshots.
            </p>
            <p className="fade-in-paragraph delay-1">
              What sets us apart is our commitment to understanding each client's unique vision and bringing it to life through our creative lens. We believe that photography is more than just taking pictures—it's about telling stories that will be cherished for generations.
            </p>
            <p className="fade-in-paragraph delay-2">
              Our state-of-the-art studio is equipped with the latest technology and lighting equipment to ensure the highest quality results for every shoot.
            </p>
            
            <div className="experience-highlights">
              {experienceData.map((item, index) => (
                <div 
                  className={`highlight-item ${activeHighlight === index ? 'highlight-active' : ''}`} 
                  key={index}
                >
                  <div className="highlight-circle">
                    <svg className="highlight-progress" width="120" height="120">
                      <circle className="highlight-track" cx="60" cy="60" r="54" />
                      <circle className="highlight-indicator" cx="60" cy="60" r="54" />
                    </svg>
                    <div className="highlight-content">
                      <div className="highlight-number">{item.number}</div>
                      <div className="highlight-text">{item.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="team-preview">
          <div className="team-preview-content">
            <h4>Meet Our Creative Team</h4>
            <p>Our diverse team of photographers brings unique perspectives and specialized skills to every project. From portrait masters to landscape experts, we have the perfect professional for your needs.</p>
            <a href="#team" className="meet-team-btn">
              <span className="btn-text">Meet The Team</span>
              <span className="btn-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
          <div className="team-preview-images">
            <div className="team-preview-image image-1"></div>
            <div className="team-preview-image image-2"></div>
            <div className="team-preview-image image-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;