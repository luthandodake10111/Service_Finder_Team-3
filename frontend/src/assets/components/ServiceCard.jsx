// src/components/ServiceCard.js
import React, { useState, useEffect } from 'react';
import './ServiceCard.css'; // We'll create this for styling

const ServiceCard = ({ serviceId, onClose }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!serviceId) {
      setService(null);
      return;
    }

    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/service/${serviceId}`);
        if (!response.ok) {
          throw new Error('Service not found');
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) return <div className="service-card-loading">Loading service details...</div>;
  if (error) return <div className="service-card-error">Error: {error}</div>;
  if (!service) return <div className="service-card-placeholder">Select a location to see details.</div>;

  return (
    <div className="side-panel" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="panel-header">
        <img src="/shop.jpg" alt={service.name} className="panel-image" />
        <h2 className="panel-title">{service.name}</h2>
        <div className="rating">
          <span>5</span>
          <span className="stars">★★★★★</span>
          <span className="review-count">(1)</span>
        </div>
        <p className="category">{service.type}</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab active">Overview</button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn primary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#00796b' }}>
            directions
          </span>
          Directions
        </button>
        <button className="action-btn secondary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#00796b' }}>
            bookmark_border
          </span>
          Save
        </button>
      </div>

      {/* Info Section */}
      <div className="info-section">
        {/* Address */}
        <div className="info-item">
          <span className="material-symbols-outlined" style={{ color: 'green', fontSize: '25px' }}>
            place
          </span>
          <span>{service.address?.line1}, {service.address?.city}</span>
        </div>

        {/* Hours */}
        <div className="info-item">
          <span className="material-symbols-outlined" style={{ color: 'green', fontSize: '22px' }}>
            schedule
          </span>
          <span className="open-status">09:00 - 18:00</span>
        </div>

        {/* Phone */}
        {service.contact?.phone && (
          <div className="info-item">
            <span className="material-symbols-outlined" style={{ color: 'green', fontSize: '24px' }}>
              call
            </span>
            <span>{service.contact.phone}</span>
          </div>
        )}

        {/* Website */}
        {service.contact?.website && (
          <div className="info-item">
            <span className="material-symbols-outlined" style={{ color: 'green', fontSize: '23px' }}>
              language
            </span>
            <span>{service.contact.website}</span>
          </div>
        )}

        {/* Description */}
        {service.description && (
          <div className="info-item">
            <span className="material-symbols-outlined" style={{ color: 'green', fontSize: '23px' }}>
              description
            </span>
            <span>{service.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;