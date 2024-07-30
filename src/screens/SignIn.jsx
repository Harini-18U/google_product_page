import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";
import { useGetAllUsersQuery } from "../redux/services/user";

export const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const { data } = useGetAllUsersQuery();

  const [state, setState] = React.useState({
    emailId: "",
    password: "",
  });

  const onChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = data?.filter(user => user.emailId === state.emailId && user.password === state.password);

    if (user.length === 1) {
      localStorage.setItem('isUserLoggedIn', 'true');
      onLogin();
      navigate(AppRoutes.products);
    } else {
      alert('Invalid Username and Password');
    }
  };

  return (
    <Container fluid="md" style={{ position: "relative" }}>
      <img src="/images/googleLogo.png" alt="Google Logo" style={{ position: "absolute", top: 16, left: 24 }} />
      <Row>
        <Col style={{ backgroundColor: "#F9FBFE" }}>
          <img src="/images/shopping.png" alt="Shopping" style={{ height: "100vh" }} />
        </Col>
        <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px" }}>
          <h1>Welcome to Google Store!</h1>
          <p>Sign In to your account</p>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required name="emailId" value={state.emailId} onChange={(e) => onChange(e.target.name, e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required name="password" value={state.password} onChange={(e) => onChange(e.target.name, e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button style={{ width: "100%" }} variant="primary" type="submit">Sign In</Button>
            <Link to={AppRoutes.create_account}>Don't have account, Click Here!</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
