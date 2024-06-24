import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Card, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from '../utils/axios'; // Adjust this import as per your file structure
import { setUserSession } from '../utils/Common'; // Adjust this import as per your file structure
import Swal from 'sweetalert2';
import ICON_LOGO from '../assets/icon-only.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const cardStyle = {
    width: '24rem',
    maxWidth: '100%',
    color: '#fff',
    fontSize: '11px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
  };

  const inputStyle = {
    fontSize: '11px',
  };

  const backgroundStyle = {
    background: 'linear-gradient(135deg, #292927, #646463)',
    height: '100vh',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
      
      if (response.status === 200) {
        setUserSession(response.data.token, response.data.user);
        history.push('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Authorization Failed',
        text: err.response && err.response.data && err.response.data.message 
          ? err.response.data.message 
          : err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
      <Card className="p-4" style={cardStyle}>
        <Card.Body>
          <img src={ICON_LOGO} height={80} className="d-block mx-auto mb-4"/>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                style={inputStyle}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                style={inputStyle}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
