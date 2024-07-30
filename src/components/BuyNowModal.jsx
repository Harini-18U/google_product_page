import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Card, Image } from 'react-bootstrap';
import './BuyNowModal.css';

const BuyNowModal = ({ show, onHide, product, refetch }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    address: '',
    city: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(true);
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        product_name: product.product_name,
        id: product.product_id,
        price: product.price,
        quantity: 1 // Assuming quantity is 1
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    if (formData.name && formData.contactNumber && formData.address && formData.city && formData.country) {
      setSavedAddress({ ...formData });
      setIsEditing(false);
    }
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const discount = 50; // Example discount
  const actualAmount = product ? product.price * formData.quantity : 0;
  const billingAmount = actualAmount - discount;

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Buy <span style={{ color: '#023047' }}>{product.product_name}</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <Card.Title style={{ color: '#023047' }}>{product.product_name}</Card.Title>
                <Image src={product.images[0]} alt={product.product_name} thumbnail width="50" height="50" />
                <p style={{ color: '#023047' }}>{product.product_id} | {product.storage} | {formData.quantity} | ${product.price}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 style={{ color: '#023047' }}>{isEditing ? 'Add Address' : 'Address Details'}</h4>
                {savedAddress && !isEditing ? (
                  <div>
                    <p>{savedAddress.name}</p>
                    <p>{savedAddress.contactNumber}</p>
                    <p>{savedAddress.address}</p>
                    <p>{savedAddress.city}</p>
                    <p>{savedAddress.country}</p>
                    <Button variant="secondary" onClick={handleEditAddress}>Edit</Button>
                  </div>
                ) : (
                  <Form>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="contactNumber" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="address" className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="city" className="mb-3">
                      <Form.Control
                        as="select"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value="">Select City</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Trichy">Trichy</option>
                        <option value="Tanjore">Tanjore</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country" className="mb-3">
                      <Form.Control
                        as="select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>
                        <option value="IN">India</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="US">United States</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSaveAddress}>Save Address</Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 style={{ color: '#023047' }}>Invoice Summary</h4>
                <p style={{ color: '#023047' }}>Actual Amount: <strong>${actualAmount}</strong></p>
                <p style={{ color: '#023047' }}>Discount: <strong>-${discount}</strong></p>
                <p style={{ color: '#023047' }}>Billing Amount: <strong>${billingAmount}</strong></p>
                <p style={{ color: '#023047' }}>Total Amount: <strong>${billingAmount}</strong></p>
                <Button variant="primary" className="mt-3">Pay Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default BuyNowModal;
