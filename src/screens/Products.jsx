import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import { Container, Row, Col } from 'react-bootstrap';

export const Products = () => {
  const [filters, setFilters] = useState({
    phones: false,
    headphones: false,
    accessories: false
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light p-3">
          <Sidebar onFilterChange={handleFilterChange} />
        </Col>
        <Col md={10}>
          <ProductList filters={filters} />
        </Col>
      </Row>
    </Container>
  );
};

export default Products;