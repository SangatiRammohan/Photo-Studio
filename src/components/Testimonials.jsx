// components/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import '../styles/Testimonials.css';
import customer from '../assets/t1.webp'
import customer2 from '../assets/t2.jpeg'
import customer3 from '../assets/t3.jpeg'


function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef(null);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      image: customer,
      text: "vivaha_muchhatlu_with_sanju captured our wedding day perfectly! Every time we look at our photos, we relive those special moments. The team was professional, creative, and made us feel completely at ease.",
      event: "Wedding Photography",
      rating: 5
    },
    {
      name: "Michael Chen",
      image: customer2,
      text: "The corporate headshots exceeded my expectations. They made me look professional but approachable, which was exactly what I wanted for my LinkedIn profile. The team was efficient and the whole process was seamless.",
      event: "Professional Headshots",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      image: customer3,
      text: "As a small business owner, quality product photography is essential. vivaha_muchhatlu_with_sanju understood my vision and delivered images that have significantly improved my online sales. I couldn't be happier with the results!",
      event: "Product Photography",
      rating: 5
    },
    {
      name: "David Kumar",
      image: customer,
      text: "Our family portraits came out beautifully! The photographer was amazing with our kids and somehow managed to get everyone smiling at the same time - a miracle! We'll definitely be back for yearly photos.",
      event: "Family Portrait Session",
      rating: 5
    },
    {
      name: "Amanda Patel",
      image: customer2,
      text: "The graduation photos captured this milestone perfectly. The attention to detail and the creative angles made these photos stand out from traditional graduation pictures. Highly recommend!",
      event: "Graduation Photography",
      rating: 5
    },
    {
      name: "James Wilson",
      image: customer3,
      text: "The real estate photography service was exceptional. The photos made our property look amazing and helped us sell faster than expected. The virtual tour feature was an incredible bonus!",
      event: "Real Estate Photography",
      rating: 5
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          testimonialsRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }
    
    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);
  
  // Auto scroll through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        changeSlide((currentIndex + 1) % testimonials.length);
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, testimonials.length]);
  
  const changeSlide = (index) => {
    if (index === currentIndex || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };
  
  const goToNext = () => {
    if (!isAnimating) {
      changeSlide((currentIndex + 1) % testimonials.length);
    }
  };
  
  const goToPrev = () => {
    if (!isAnimating) {
      changeSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
    }
  };
  
  const renderStars = (rating) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} size={16} className="star" />
    ));
  };
  
  return (
    <section id="testimonials" className="testimonials-section" ref={testimonialsRef}>
      <div className="section-background"></div>
      <div className="container">
        <h2 className="section-title">Client Testimonials</h2>
        <p className="subtitle">What our clients are saying about their experience with us</p>
        
        <div className="testimonials-carousel">
          <button 
            className={`carousel-button prev ${isAnimating ? 'disabled' : ''}`} 
            onClick={goToPrev}
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonials-slides">
            {testimonials.map((testimonial, index) => (
              <div 
                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`} 
                key={index}
              >
                <div className="testimonial-content">
                  <div className="testimonial-image-panel">
                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.event}</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-text-panel">
                    <div className="quote-icon">❝</div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className={`carousel-button next ${isAnimating ? 'disabled' : ''}`} 
            onClick={goToNext}
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => changeSlide(index)}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;