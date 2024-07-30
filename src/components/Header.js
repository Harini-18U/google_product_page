import React from 'react';
import { Row, Col, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../router/routes';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onMenuClick = (path) => {
    navigate(path);
  };

  const isItemActive = (path) => {
    return location.pathname === path;
  };

  const selectDot = <div style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "#219EBC" }}></div>;

  return (
    <div style={{ height: "56px", width: "100%", borderBottom: "1px solid #f5f5f5" }}>
      <Row>
        <Col style={{ padding: "8px", marginLeft: "32px" }}>
          <img src="/images/googleLogo.png" alt="Google Logo" />
        </Col>
        <Col xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Stack direction="horizontal" gap={3}>
            <div className={`navItem ${isItemActive(AppRoutes.home) ? "navItemSelected" : ""}`} onClick={() => onMenuClick(AppRoutes.home)}>
              {isItemActive(AppRoutes.home) ? selectDot : ""} Home
            </div>
            <div className={`navItem ${isItemActive(AppRoutes.products) ? "navItemSelected" : ""}`} onClick={() => onMenuClick(AppRoutes.products)}>
              {isItemActive(AppRoutes.products) ? selectDot : ""} Products
            </div>
            <div className={`navItem ${isItemActive(AppRoutes.services) ? "navItemSelected" : ""}`} onClick={() => onMenuClick(AppRoutes.services)}>
              {isItemActive(AppRoutes.services) ? selectDot : ""} Services
            </div>
            <div className={`navItem ${isItemActive(AppRoutes.aboutus) ? "navItemSelected" : ""}`} onClick={() => onMenuClick(AppRoutes.aboutus)}>
              {isItemActive(AppRoutes.aboutus) ? selectDot : ""} About Us
            </div>
          </Stack>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className='profileContainer'>
            <img className='profileImg' src='https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=' alt="User Profile" />
            <img className='profileArrow' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Feather-arrows-chevron-down.svg/1024px-Feather-arrows-chevron-down.svg.png" alt="Dropdown Arrow" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;