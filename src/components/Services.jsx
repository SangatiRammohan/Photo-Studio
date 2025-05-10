// components/Services.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/Services.css';
import { Camera, Users, CalendarDays, Building, Shirt, ImagePlus } from 'lucide-react';

function Services() {
  const servicesRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          servicesRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);
  
  const services = [
    {
      title: "Wedding Photography",
      description: "Capture your special day with our experienced wedding photographers who specialize in both traditional and photojournalistic styles.",
      icon: <Camera size={28} strokeWidth={1.5} />,
      featured: true
    },
    {
      title: "Portrait Sessions",
      description: "From family portraits to professional headshots, our portrait sessions are tailored to showcase your unique personality.",
      icon: <Users size={28} strokeWidth={1.5} />,
      featured: false
    },
    {
      title: "Event Coverage",
      description: "Corporate events, parties, or special celebrations - our team will document every memorable moment.",
      icon: <CalendarDays size={28} strokeWidth={1.5} />,
      featured: false
    },
    {
      title: "Commercial Photography",
      description: "Elevate your brand with high-quality product photography, architectural shots, and marketing materials.",
      icon: <Building size={28} strokeWidth={1.5} />,
      featured: false
    },
    {
      title: "Fashion & Portfolio",
      description: "Build your modeling portfolio with our professional fashion photography sessions designed to showcase your versatility.",
      icon: <Shirt size={28} strokeWidth={1.5} />,
      featured: true
    },
    {
      title: "Photo Restoration",
      description: "Breathe new life into old or damaged photographs with our expert restoration services.",
      icon: <ImagePlus size={28} strokeWidth={1.5} />,
      featured: false
    }
  ];

  return (
    <section id="services" className="services-section" ref={servicesRef}>
      <div className="services-bg-element"></div>
      <div className="container">
        <div className="section-header">
          <span className="section-tagline">Our Services</span>
          <h2 className="section-title">Professional Photography Expertise</h2>
          <p className="section-subtitle">
            Transforming fleeting moments into timeless memories with exceptional quality and artistic vision
          </p>
          <div className="title-decoration"></div>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              className={`service-card ${service.featured ? 'featured' : ''}`} 
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.featured && <span className="featured-badge">Popular</span>}
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">
                <span>Explore Service</span>
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <div className="cta-content">
            <h3>Ready to Create Lasting Memories?</h3>
            <p>Let our expert photographers bring your vision to life. Book a consultation today and discover how we can create stunning visual narratives for your most treasured moments.</p>
          </div>
          <div className="cta-action">
            <a href="#contact" className="cta-button">
              <span>Schedule a Consultation</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;