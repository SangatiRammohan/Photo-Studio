// components/TeamModern.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Team.css';
import t1 from '../assets/t1.webp';
import t2 from '../assets/t2.jpeg';
import t3 from '../assets/t3.jpeg';

function TeamModern() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [visibleElements, setVisibleElements] = useState([]);
  
  const teamMembers = [
    {
      id: 1,
      name: "Alexandra Morgan",
      role: "Lead Photographer",
      image: t1,
      bio: "Alex has over 15 years of experience specializing in wedding and portrait photography. Her unique approach blends documentary style with artistic portraits.",
      social: {
        instagram: "https://instagram.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        email: "mailto:alex@example.com"
      }
    },
    {
      id: 2,
      name: "Jamie Chen",
      role: "Fashion Photographer",
      image: t2,
      bio: "With a background in fashion design, Jamie brings a unique artistic perspective to every photoshoot. Her work has been featured in numerous publications.",
      social: {
        instagram: "https://instagram.com/jamiechen",
        linkedin: "https://linkedin.com/in/jamiechen",
        email: "mailto:jamie@example.com"
      }
    },
    {
      id: 3,
      name: "Taylor Reed",
      role: "Event Specialist",
      image: t3,
      bio: "Taylor excels at capturing candid moments at events and creating dynamic compositions that tell compelling stories.",
      social: {
        instagram: "https://instagram.com/taylorreed",
        linkedin: "https://linkedin.com/in/taylorreed",
        email: "mailto:taylor@example.com"
      }
    },
    {
      id: 4,
      name: "Jordan Smith",
      role: "Studio Manager",
      image: t1,
      bio: "Jordan handles all the logistics to ensure your photography experience runs smoothly from start to finish, coordinating every aspect of your project.",
      social: {
        instagram: "https://instagram.com/jordansmith",
        linkedin: "https://linkedin.com/in/jordansmith",
        email: "mailto:jordan@example.com"
      }
    }
  ];
  
  const socialIcons = {
    instagram: { icon: <InstagramIcon />, label: "Instagram" },
    linkedin: { icon: <LinkedInIcon />, label: "LinkedIn" },
    email: { icon: <EmailIcon />, label: "Contact" }
  };
  
  useEffect(() => {
    const observeSection = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sectionRef.current.classList.add('in-view');
            observeCards();
          }
        },
        { threshold: 0.1 }
      );
      
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    };
    
    observeSection();
  }, []);
  
  const observeCards = () => {
    const cards = document.querySelectorAll('.team-card-wrapper');
    
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => [...prev, entry.target.dataset.id]);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );
    
    cards.forEach(card => cardObserver.observe(card));
  };

  const handleCardFocus = (id) => {
    setActiveCard(id);
  };

  const handleCardBlur = () => {
    setActiveCard(null);
  };
  
  const trackSocialInteraction = (member, platform) => {
    console.log(`${member.name}'s ${platform} link was clicked`);
    // Add your analytics tracking code here
  };
  
  return (
    <section id="team" className="team-section" ref={sectionRef}>
      <div className="team-noise-overlay"></div>
      <div className="container">
        <div className="team-heading">
          <div className="heading-badge">Our Professionals</div>
          <h2 className="heading-title">The Creative Team</h2>
          <div className="heading-underline">
            <span className="line"></span>
            <span className="dot"></span>
          </div>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div 
              className={`team-card-wrapper ${visibleElements.includes(member.id.toString()) ? 'is-visible' : ''}`} 
              key={member.id}
              data-id={member.id}
            >
              <div 
                className={`team-card ${activeCard === member.id ? 'is-active' : ''}`}
                onMouseEnter={() => handleCardFocus(member.id)}
                onMouseLeave={handleCardBlur}
                onFocus={() => handleCardFocus(member.id)}
                onBlur={handleCardBlur}
                tabIndex="0"
              >
                <div className="card-inner">
                  <div className="card-media">
                    <div className="media-clip">
                      <img src={member.image} alt={member.name} className="team-image" />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-br"></div>
                  </div>
                  
                  <div className="card-content">
                    <div className="member-meta">
                      <h3 className="member-name">{member.name}</h3>
                      <div className="member-role">{member.role}</div>
                      <div className="meta-divider">
                        <span className="divider-line"></span>
                      </div>
                    </div>
                    
                    <div className="member-bio">
                      <p>{member.bio}</p>
                    </div>
                    
                    <div className="social-links">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a 
                          href={url}
                          className="social-link" 
                          key={platform}
                          aria-label={`${socialIcons[platform].label} for ${member.name}`}
                          onClick={() => trackSocialInteraction(member, platform)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="icon-wrapper">
                            {socialIcons[platform].icon}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card-accent"></div>
                <div className="card-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}

export default TeamModern;