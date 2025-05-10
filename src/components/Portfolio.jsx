// Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Portfolio.css';
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpeg';
import p3 from '../assets/p3.jpeg';
import p4 from '../assets/p4.jpeg';
import p5 from '../assets/p5.jpeg';
import p6 from '../assets/p6.jpeg';
import p7 from '../assets/p7.jpeg';
import p8 from '../assets/p8.jpeg';
import p9 from '../assets/p9.jpg';
import p10 from '../assets/p10.jpeg';

function Portfolio() {
  // State
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs
  const portfolioRef = useRef(null);
  const modalRef = useRef(null);
  const itemRefs = useRef([]);
  
  // Portfolio items data with expanded details
  const portfolioItems = [
    { 
      id: 1, 
      category: "Wedding", 
      image: p1, 
      title: "Sarah & John's Wedding",
      client: "Sarah & John Miller",
      date: "June 15, 2024",
      location: "Rosewood Gardens",
      description: "An elegant garden wedding celebration with over 150 guests. Captured the couple's special moments from preparation through reception with a soft, romantic aesthetic."
    },
    { 
      id: 2, 
      category: "Portrait", 
      image: p2, 
      title: "Executive Portraits",
      client: "Nexus Technologies",
      date: "March 22, 2024",
      location: "Corporate Office",
      description: "Professional headshots and environmental portraits for the executive team, focusing on confidence and approachability while maintaining corporate standards."
    },
    { 
      id: 3, 
      category: "Event", 
      image: p3, 
      title: "Annual Gala",
      client: "Children's Foundation",
      date: "September 8, 2024",
      location: "Grand Meridian Hotel",
      description: "Documented the foundation's fundraising gala with 300+ attendees, capturing candid moments, speeches, performances, and the vibrant atmosphere of the evening."
    },
    { 
      id: 4, 
      category: "Commercial", 
      image: p4, 
      title: "Product Shoot",
      client: "Lumina Skincare",
      date: "February 10, 2024",
      location: "Studio",
      description: "Clean, minimalist product photography for a new skincare line, highlighting textures and packaging details with careful lighting techniques."
    },
    { 
      id: 5, 
      category: "Wedding", 
      image: p5, 
      title: "Beach Ceremony",
      client: "Emily & James Taylor",
      date: "July 7, 2024",
      location: "Coastal Bay Resort",
      description: "A breathtaking sunset beach wedding with intimate family gathering. Photography focused on natural light and the stunning coastal backdrop."
    },
    { 
      id: 6, 
      category: "Portrait", 
      image: p6, 
      title: "Family Session",
      client: "Thompson Family",
      date: "October 12, 2024",
      location: "Autumn Park",
      description: "Fall-themed family portraits capturing three generations of the Thompson family, with emphasis on natural interactions and the seasonal colors."
    },
    { 
      id: 7, 
      category: "Event", 
      image: p7, 
      title: "Birthday Celebration",
      client: "Robert Chen",
      date: "April 18, 2024",
      location: "Private Residence",
      description: "Surprise 50th birthday celebration with friends and family, documented with a photojournalistic approach to preserve genuine reactions and emotions."
    },
    { 
      id: 8, 
      category: "Commercial", 
      image: p8, 
      title: "Restaurant Menu",
      client: "Olive & Thyme",
      date: "May 30, 2024",
      location: "Restaurant",
      description: "Culinary photography showcasing signature dishes with attention to composition, texture, and color to enhance the restaurant's new seasonal menu."
    },
    { 
      id: 9, 
      category: "Wedding", 
      image: p9, 
      title: "Rustic Wedding",
      client: "Alexandra & Michael Ross",
      date: "August 25, 2024",
      location: "Pinewood Farm",
      description: "A charming barn wedding with country-chic aesthetics, focusing on the handcrafted details and the natural beauty of the countryside setting."
    },
    { 
      id: 10, 
      category: "Portrait", 
      image: p10, 
      title: "Graduation Photos",
      client: "David Wilson",
      date: "May 15, 2024",
      location: "University Campus",
      description: "Commemorative graduation portraits balancing formal academic tradition with personal style, captured at iconic campus locations."
    },
  ];

  // Available categories with count
  const categories = [
    { id: 'All', label: 'All Projects', count: portfolioItems.length },
    { id: 'Wedding', label: 'Wedding', count: portfolioItems.filter(item => item.category === 'Wedding').length },
    { id: 'Portrait', label: 'Portrait', count: portfolioItems.filter(item => item.category === 'Portrait').length },
    { id: 'Event', label: 'Event', count: portfolioItems.filter(item => item.category === 'Event').length },
    { id: 'Commercial', label: 'Commercial', count: portfolioItems.filter(item => item.category === 'Commercial').length },
  ];
  
  // Setup intersection observer for animations
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    // Observe portfolio section
    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }
    
    return () => {
      clearTimeout(timeout);
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
    };
  }, []);
  
  // Observe all portfolio items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    itemRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });
    
    return () => {
      itemRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [visibleItems]);
  
  // Filter items based on active category with animation
  useEffect(() => {
    setIsAnimating(true);
    
    const animationTimeout = setTimeout(() => {
      if (activeCategory === 'All') {
        setVisibleItems(portfolioItems);
      } else {
        setVisibleItems(portfolioItems.filter(item => item.category === activeCategory));
      }
      
      // Reset animation state after items are updated
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 400); // Wait for fade-out animation
    
    return () => clearTimeout(animationTimeout);
  }, [activeCategory]);

  // Initialize visible items on first render
  useEffect(() => {
    setVisibleItems(portfolioItems);
  }, []);

  // Handle category button click
  const handleCategoryClick = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };



  // Navigate through items in modal
  const navigateGallery = (direction) => {
    const totalItems = visibleItems.length;
    if (totalItems <= 1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalItems;
    } else {
      newIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    
    setCurrentIndex(newIndex);
    setSelectedItem(visibleItems[newIndex]);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Handle click outside modal content
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        navigateGallery('next');
      } else if (e.key === 'ArrowLeft') {
        navigateGallery('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex, visibleItems]);

  // Generate sample images for the modal gallery
  const generateGalleryImages = (item) => {
    // In a real app, you would have actual multiple images per project
    // Here we're simulating it by using the same image in different contexts
    return [
      { src: item.image, caption: 'Main shot' },
      { src: item.image, caption: 'Detail view' },
      { src: item.image, caption: 'Alternative angle' },
      { src: item.image, caption: 'Close-up' }
    ];
  };
  
  return (
    <section id="portfolio" className={`portfolio-section ${isLoaded ? 'loaded' : ''}`} ref={portfolioRef}>
      <div className="container">
        <h2 className="section-title">Photography Portfolio</h2>
        <div className="portfolio-description">
          <p>Explore our diverse collection of professional photography work across multiple genres</p>
        </div>
        
        {/* Enhanced Category Filtering */}
        <div className="portfolio-categories">
          {categories.map((category) => (
            <button 
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              aria-label={`Filter by ${category.label}`}
            >
              <span className="category-text">{category.label}</span>
              <span className="category-count">{category.count}</span>
              <span className="category-indicator"></span>
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid with Animation States */}
        <div className={`portfolio-container ${visibleItems.length > 0 ? 'has-items' : ''} ${isAnimating ? 'is-animating' : ''}`}>
          {visibleItems.length > 0 ? (
            <div className="portfolio-grid">
              {visibleItems.map((item, index) => (
                <div 
                  className="portfolio-item"
                  key={item.id}
                  data-category={item.category}
                  onClick={() => handleItemClick(item, index)}
                  ref={el => itemRefs.current[index] = el}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="portfolio-image-container">
                    <img src={item.image} alt={item.title} className="portfolio-image" />
                    <div className="portfolio-overlay">
                      <div className="overlay-content">
                        <span className="category-badge">{item.category}</span>
                        <h3 className="item-title">{item.title}</h3>
                        <div className="view-project">
                          <span className="view-text">View Details</span>
                          <span className="view-icon">+</span>
                        </div>
                      </div>
                      <div className="overlay-decoration"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-container">
              <div className="no-results">
                <span className="no-results-icon">!</span>
                <p>No portfolio items found in this category.</p>
                <button 
                  className="reset-filter" 
                  onClick={() => handleCategoryClick('All')}
                >
                  Show All Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal/Lightbox with Details */}
      {isModalOpen && selectedItem && (
        <div className="portfolio-modal" onClick={handleOutsideClick}>
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <div className="modal-title">
                <h3>{selectedItem.title}</h3>
                <p className="modal-category">{selectedItem.category}</p>
              </div>
              
              <div className="modal-controls">
                <button 
                  className="modal-nav prev" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery('prev');
                  }}
                  aria-label="Previous project"
                >
                  <span className="nav-icon">&#10094;</span>
                </button>
                <span className="modal-counter">
                  {currentIndex + 1} / {visibleItems.length}
                </span>
                <button 
                  className="modal-nav next" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery('next');
                  }}
                  aria-label="Next project"
                >
                  <span className="nav-icon">&#10095;</span>
                </button>
                <button 
                  className="modal-close" 
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Project Gallery */}
              <div className="modal-gallery">
                {generateGalleryImages(selectedItem).map((image, idx) => (
                  <div 
                    className="gallery-item" 
                    key={idx} 
                    style={{"--item-index": idx}}
                  >
                    <img 
                      src={image.src} 
                      alt={`${selectedItem.title} - ${image.caption}`} 
                      className="gallery-image" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Project Details */}
              <div className="modal-details">
                <div className="project-info">
                  <div className="info-item">
                    <span className="info-label">Client</span>
                    <span className="info-value">{selectedItem.client}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date</span>
                    <span className="info-value">{selectedItem.date}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location</span>
                    <span className="info-value">{selectedItem.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">{selectedItem.category}</span>
                  </div>
                </div>
                
                <div className="project-description">
                  <p>{selectedItem.description}</p>
                  
                  <div className="project-tags">
                    <span className="project-tag">{selectedItem.category}</span>
                    <span className="project-tag">Professional</span>
                    <span className="project-tag">Portfolio</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="footer-actions">
                <button className="action-button">
                  <span>Request Similar</span>
                </button>
                <button className="action-button primary">
                  <span>Book a Session</span>
                </button>
              </div>
              
              <div className="social-share">
                <button className="share-button" aria-label="Share on Facebook">
                  <i className="fa fa-facebook"></i>
                </button>
                <button className="share-button" aria-label="Share on Instagram">
                  <i className="fa fa-instagram"></i>
                </button>
                <button className="share-button" aria-label="Share on Pinterest">
                  <i className="fa fa-pinterest"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;