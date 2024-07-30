// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import { AppRoutes } from '../router/routes';

const Layout = ({ children, isUserLoggedIn, handleLogout, handleFilterChange, filters }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname === AppRoutes.sign_in || location.pathname === AppRoutes.create_account;

  return (
    <>
      {!isAuthRoute && isUserLoggedIn && <Header onLogout={handleLogout} />}
      <Container fluid>
        <Row>
          {!isAuthRoute && isUserLoggedIn && (
            <Col sm={3}>
              <Sidebar onFilterChange={handleFilterChange} />
            </Col>
          )}
          <Col sm={!isAuthRoute && isUserLoggedIn ? 9 : 12}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
