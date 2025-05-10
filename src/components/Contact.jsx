// components/Contact.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, Calendar, User, FileText, AtSign } from 'lucide-react';
import '../styles/Contact.css';

function Contact() {
  const contactRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contactRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.service) errors.service = 'Please select a service';
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Format phone number for WhatsApp
    const whatsappNumber = '9999999999'; 
    const text = encodeURIComponent(
      `New Booking Request\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred Date: ${formData.date}\nMessage: ${formData.message}`
    );
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    
    // Reset form and show success message
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: ''
    });
    setFormSubmitted(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="contact-section" ref={contactRef}>
      <div className="container">
        <h2 className="section-title">Book Your Session</h2>
        
        <div className="contact-container">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {formSubmitted && (
                <div className="form-success">
                  <p>Thank you for your booking request! We'll be in touch shortly.</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                </div>
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address*</label>
                  <div className="input-wrapper">
                    <AtSign size={18} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? 'error' : ''}
                    />
                  </div>
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={formErrors.phone ? 'error' : ''}
                    />
                  </div>
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Service Type*</label>
                  <div className="input-wrapper">
                    <FileText size={18} className="input-icon" />
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={formErrors.service ? 'error' : ''}
                    >
                      <option value="">Select a service</option>
                      <option value="Wedding Photography">Wedding Photography</option>
                      <option value="Portrait Session">Portrait Session</option>
                      <option value="Event Coverage">Event Coverage</option>
                      <option value="Commercial Photography">Commercial Photography</option>
                      <option value="Fashion & Portfolio">Fashion & Portfolio</option>
                      <option value="Photo Restoration">Photo Restoration</option>
                    </select>
                  </div>
                  {formErrors.service && <span className="error-message">{formErrors.service}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <div className="input-wrapper">
                    <Calendar size={18} className="input-icon" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your project or any special requirements"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                <Send size={18} />
                <span>Send Request</span>
              </button>
            </form>
          </div>
          
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>Ready to capture your special moments? Reach out to us to schedule a consultation or book your photography session.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <Phone size={20} />
                <span>(999) 999-9999</span>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <span>Example@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>Hanamkonda</span>
              </div>
            </div>
            
            <div className="contact-hours">
              <h4>Studio Hours</h4>
              <p>Monday - Friday: 9AM - 6PM</p>
              <p>Saturday: 10AM - 4PM</p>
              <p>Sunday: By appointment only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;