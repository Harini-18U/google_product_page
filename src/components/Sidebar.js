import React, { useState } from 'react';
import { Form, Nav } from 'react-bootstrap';

const Sidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    phones: false,
    headphones: false,
    accessories: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const newFilters = { ...filters, [name]: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Nav className="flex-column mt-5 ms-4">
      <h6 className="text-muted mb-4">Filter</h6>
      <Nav.Item className="mb-2">
        <Form.Check 
          type="checkbox" 
          label="Phones" 
          name="phones" 
          checked={filters.phones} 
          onChange={handleCheckboxChange} 
        />
      </Nav.Item>
      <Nav.Item className="mb-2">
        <Form.Check 
          type="checkbox" 
          label="Headphones" 
          name="headphones" 
          checked={filters.headphones} 
          onChange={handleCheckboxChange} 
        />
      </Nav.Item>
      <Nav.Item className="mb-2">
        <Form.Check 
          type="checkbox" 
          label="Accessories" 
          name="accessories" 
          checked={filters.accessories} 
          onChange={handleCheckboxChange} 
        />
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
