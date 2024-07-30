import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useGetAllProductsQuery } from '../redux/services/products';
import ProductDetails from './ProductDetails';
import BuyNowModal from './BuyNowModal'; // Ensure this import
import './ProductList.css'; 

const ProductList = ({ filters }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowBuyNowModal(true);
    setShowProductDetailsModal(false); // Close the product details modal
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductDetailsModal(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowBuyNowModal(false);
    setShowProductDetailsModal(false);
  };

  // Filter products based on the selected filters
  const filteredProducts = products?.filter(product => {
    if (filters.phones && product.product_type === 'phones') return true;
    if (filters.headphones && product.product_type === 'headphones') return true;
    if (filters.accessories && product.product_type === 'accessories') return true;
    return false;
  }) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="mt-5">
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
              className="product-card"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div className="image-container">
                <Card.Img variant="top" src={product.images[0]} alt={product.product_name} className="product-image" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="product-info">
                  <Card.Title className="product-name">{product.product_name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="price">${product.price}</div>
                    <div className="star-rating" style={{ color: 'gold' }}>
                      {'★'.repeat(Math.round(product.rating / 20)) + '☆'.repeat(5 - Math.round(product.rating / 20))}
                    </div>
                  </div>
                </div>
                {hoveredProductId === product.id && (
                  <div
                    className="d-flex justify-content-between align-items-center mt-3"
                    style={{ position: 'absolute', bottom: '10px', width: '90%' }}
                  >
                    <Button variant="primary" onClick={() => handleViewProduct(product)}>View Product</Button>
                    <Button variant="primary" onClick={() => handleBuyNow(product)}>Buy Now</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showProductDetailsModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && <ProductDetails product={selectedProduct} handleBuyNow={handleBuyNow} />}
        </Modal.Body>
      </Modal>
      <BuyNowModal
        show={showBuyNowModal}
        onHide={handleClose}
        product={selectedProduct}
        refetch={refetch} // Pass the refetch function to BuyNowModal
      />
    </Container>
  );
};

export default ProductList;
