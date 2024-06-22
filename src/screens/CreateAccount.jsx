import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";
import { useCreateAccountMutation } from "../redux/services/user";

export const CreateAccount = (props) => {

    const navigate = useNavigate();
    const [createAccount, { isLoading, isError, isSuccess }] = useCreateAccountMutation();

    const [state, setState] = React.useState({
        fullName: "",
        emailId: "",
        password: "",
        confirmPassword: ""
    });

    const onChange = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (state.password === state.confirmPassword) {
            createAccount(state);
        } else {
            alert("Password and Confirm Password is not matching")
        }
    };

    React.useEffect(() => {
        if (isSuccess) {
            setState({
                fullName: "",
                emailId: "",
                password: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate(AppRoutes.sign_in);
            }, 1000 * 2)
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    return <Container fluid="md" style={{ position: "relative" }}>
        <img src="/images/googleLogo.png" alt="Google Logo" style={{ position: "absolute", top: 16, left: 24 }} />
        <Row>
            <Col style={{ backgroundColor: "#F9FBFE" }}>
                <img src="/images/shopping.png" alt="Shopping" style={{ height: "100vh" }} />
            </Col>
            <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "16px" }}>
                <h1>Welcome to Google Store!</h1>
                <p>Register your account</p>

                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control required name="fullName" value={state.fullName} onChange={(e) => onChange(e.target.name, e.target.value)} type="text" placeholder="Enter fullname" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required name="emailId" value={state.emailId} onChange={(e) => onChange(e.target.name, e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" value={state.password} onChange={(e) => onChange(e.target.name, e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required name="confirmPassword" value={state.confirmPassword} onChange={(e) => onChange(e.target.name, e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button disabled={isLoading} style={{ width: "100%" }} variant="primary" type="submit">
                        Create Account
                    </Button>

                    {isError && <Alert className="mt-2" variant="danger">
                        Something went wrong, Unable to Create Account
                    </Alert>}

                    {isSuccess && <Alert className="mt-2" variant="success">
                        Account Created Successfully!!!, You will be navigated to Sign In page shortly.
                    </Alert>}

                    <Link to={AppRoutes.sign_in} >Already have account, Click Here!</Link>
                </Form>
            </Col>
        </Row>
    </Container>
}