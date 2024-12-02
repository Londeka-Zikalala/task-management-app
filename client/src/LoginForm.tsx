import { LoginData } from "./Types/IUsers";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm: React.FC = () => {
  // States to hold form data and errors
  const [formData, setFormData] = useState<LoginData>({username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Navigating to different routes
  const navigate = useNavigate();

  // Handle changes to form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    try {
      // Fetch login details
      const response = await axios.post('/login', formData);
      const data:any = await response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/home'); 
      } else {
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Login failed.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          {/* Login form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username" 
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password" 
              />
            </Form.Group>

            {/* Display error messages */}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

            <Button variant="primary" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>

          {/* Link to navigate to registratioon page if the user doesn't exist */} 
          <p className="mt-3 text-center">
            Register : <a href="/signup">Register</a> 
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
