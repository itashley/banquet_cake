import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Navbar';
import axios from '../../utils/axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const List = () => {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // setLoading(true)
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card>
          <Card.Header style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            Guest Inquiry All List
          </Card.Header>
          <Card.Body>
            <Container>
            
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default List;
