import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ProductDetails.css'; // Import custom CSS for additional styling

const ProductDetails = ({ product, handleBuyNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const colorBullets = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    // Add more colors as needed
  };

  const details = [
    { label: 'Color', value: product.color?.map((color, index) => (
        <span key={index} style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colorBullets[color.toLowerCase()] || color,
              marginRight: '4px',
              border: '1px solid grey',
            }}
          ></span>
          {color}
        </span>
      )) 
    },
    { label: 'Display', value: product.display?.join(', ') },
    { label: 'Dimension & Weight', value: product.dimension_and_weight?.join(', ') },
    { label: 'Battery', value: product.battery?.join(', ') },
    { label: 'Description', value: product.description },
    { label: 'Memory', value: product.memory },
    { label: 'Storage', value: product.storage },
    { label: 'Processor', value: product.processor }
  ];

  return (
    <Container className="mt-3">
      <h2 style={{ color: '#4E6E7E', textAlign: 'center' }}>
        <strong style={{ color: '#023047' }}>{product.product_name}</strong>
      </h2>
      <Row className="mb-3 justify-content-center">
        <Col xs={12} md={8} className="position-relative text-center">
          <div className="image-container">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.product_name} ${currentImageIndex + 1}`}
              className="img-fluid product-image"
            />
            <Button
              variant="light"
              onClick={handlePrevImage}
              className="position-absolute"
              style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}
            >
              &lt;
            </Button>
            <Button
              variant="light"
              onClick={handleNextImage}
              className="position-absolute"
              style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}
            >
              &gt;
            </Button>
          </div>
        </Col>
      </Row>
      {details.map((detail, idx) => (
        <Row className="product-details-row" key={idx}>
          <Col xs={12} md={4} className="detail-label">
            <strong style={{ color: '#023047' }}>{detail.label}:</strong>
          </Col>
          <Col xs={12} md={8} className="detail-value">
            <p>{detail.value || 'N/A'}</p>
          </Col>
        </Row>
      ))}
      <Row className="d-flex justify-content-between align-items-center mt-3">
        <Col xs={12} md={6} style={{ color: '#4E6E7E' }}>
          <div className="price"><strong style={{ color: '#023047' }}>${product.price}</strong></div>
        </Col>
        <Col xs={12} md={6} className="text-end" style={{ color: '#4E6E7E' }}>
          <div className="star-rating" style={{ color: 'gold' }}>
            {'★'.repeat(Math.round(product.rating / 20)) + '☆'.repeat(5 - Math.round(product.rating / 20))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={() => handleBuyNow(product)} className="w-100">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
