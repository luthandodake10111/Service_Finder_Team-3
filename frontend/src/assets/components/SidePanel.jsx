// src/components/SidePanel.js
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import './SidePanel.css';

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Sample services - these would come from your map/backend
  const sampleServices = [
    { id: 'bellville-library', name: 'Bellville Library' },
    { id: 'khayelitsha-day-hospital', name: 'Khayelitsha Day Hospital' },
    { id: 'tygerberg-hospital', name: 'Tygerberg Hospital' },
  ];

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsOpen(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setSelectedServiceId(null);
    }
  };

  const handleClosePanel = () => {
    setIsOpen(false);
    setSelectedServiceId(null);
  };

  return (
    <>
      {/* Button with Hover Preview */}
      <div className="preview-container">
        <button 
          className="open-panel-btn" 
          onClick={() => handleServiceClick('bellville-library')}
          onMouseEnter={() => {
            const preview = document.querySelector('.hover-preview');
            if (preview) preview.classList.add('show');
          }}
          onMouseLeave={() => {
            const preview = document.querySelector('.hover-preview');
            if (preview) preview.classList.remove('show');
          }}
        >
          View Details
        </button>

        {/* Hover Preview Card - Keep your existing dummy data for hover */}
        <div className="hover-preview">
          <div className="preview-header">
            <img src="/shop.jpg" alt="Business" className="preview-image" />
            <div className="preview-info">
              <h3>ALL IN ONE SHOP</h3>
              <p className="category">General store</p>
            </div>
          </div>

          <div className="preview-details">
            {/* Address */}
            <div className="detail-item">
              <span className="material-symbols-outlined">place</span>
              <span>127 Comet Rd, Surrey Estate, Cape Town, 7764</span>
            </div>

            {/* Phone */}
            <div className="detail-item">
              <span className="material-symbols-outlined">call</span>
              <span>074 903 6329</span>
            </div>

            {/* Hours */}
            <div className="detail-item">
              <span className="material-symbols-outlined">schedule</span>
              <span>09:00 - 18:00</span>
            </div>
          </div>

          <div className="preview-actions">
            <button className="action-btn small">
              <span className="material-symbols-outlined">directions</span>
              Directions
            </button>
            <button className="action-btn small secondary">
              <span className="material-symbols-outlined">bookmark_border</span>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel with Backdrop */}
      {isOpen && (
        <div className="side-panel-backdrop" onClick={handleBackdropClick}>
          <ServiceCard serviceId={selectedServiceId} onClose={handleClosePanel} />
        </div>
      )}
    </>
  );
};

export default SidePanel;