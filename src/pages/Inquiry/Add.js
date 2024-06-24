import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Navbar';
import axios from '../../utils/axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCardList, setSelectedCardList] = useState([]);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const [selectedHotelList, setSelectedHotelList] = useState([]);
  const [selectedDeptList, setSelectedDeptList] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [chooseCat, setChooseCat] = useState(null);

  // Form Idle
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    priority: ''
  });

  const handleOptionSelect = (idSelectCat, Cat) => {
    setSelectedOption(idSelectCat);
    setChooseCat(Cat);
    setFormData({ ...formData, category: idSelectCat });
  };

  const handleCardClick = async (typeInq, idTypeInq) => {
    setSelectedCard(typeInq);
    setLoading(true);
    try {
      const response = await axios.get(`/api/list/inq/category/${idTypeInq}`);
      setSelectedOptionList(response.data.data);
    } catch (err) {
      console.error('Error fetching category:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInqType = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/list/inq/type');
      setSelectedCardList(response.data.data);
    } catch (err) {
      console.error('Error fetching inquiry types:', err);
    } finally {
      setLoading(false);
    }
  };

  const getHotelList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/list/hotel');
      setSelectedHotelList(response.data.data);
    } catch (err) {
      console.error('Error fetching hotel list:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentList = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/list/department');
      setSelectedDeptList(response.data.data);
    } catch (err) {
      console.error('Error fetching department list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this inquiry?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await axios.post('/api/submit/inquiry', {
          ...formData,
          hotel: selectedHotel,
          department: selectedDept,
          date: moment().format('LLL'),
        });
        console.log('Form submitted successfully:', response.data);
        MySwal.fire('Submitted!', 'Your inquiry has been submitted.', 'success');
      } catch (err) {
        console.error('Error submitting form:', err);
        MySwal.fire('Error!', 'There was an error submitting your inquiry.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getInqType();
    getHotelList();
    getDepartmentList();
  }, []);

  const cardStyle = {
    padding: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
    border: '1px solid #ced4da',
    backgroundColor: '#ffffff',
  };

  const selectedStyle = {
    ...cardStyle,
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: '1px solid #007bff',
  };

  const subtitleStyle = {
    fontSize: '11px',
    color: selectedOption === 'hello' || selectedOption === 'hells' || selectedOption === 'grruot' ? '#ffffff' : '#6c757d',
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card>
          <Card.Header style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            Guest Inquiry Form
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                {selectedCardList.length === 0 ? (
                  <center>
                    <Spinner />
                  </center>
                ) : (
                  selectedCardList.map((item) => (
                    <Col lg={3} className="mb-1" key={item.id_esc_type}>
                      <Card
                        className="p-3"
                        style={selectedCard === item.esc_name ? selectedStyle : cardStyle}
                        onClick={() => handleCardClick(item.esc_name, item.id_esc_type)}
                      >
                        <Card.Body>
                          <Card.Title>{item.esc_name}</Card.Title>
                          <Card.Subtitle
                            className="mb-2"
                            style={{
                              fontSize: '11px',
                              color: selectedCard === item.esc_name ? '#ffffff' : '#6c757d',
                            }}
                          >
                            {item.esc_description}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>

              <Row>
                {selectedOptionList.map((option, index) => (
                  <Col key={index} lg={2} className="mb-1">
                    <div className="p-3">
                      <input
                        type="radio"
                        name="option"
                        id={`option-${index + 1}`}
                        checked={selectedOption === option.id_cat_esc}
                        onChange={() => handleOptionSelect(option.id_cat_esc, option.cat_name)}
                      />
                      <label style={{ marginLeft: '8px' }} htmlFor={`option-${index + 1}`}>
                        <h6>{option.cat_name}</h6>
                        <h4 className="mb-2 text-muted" style={subtitleStyle}>
                          {option.subtitle}
                        </h4>
                      </label>
                    </div>
                  </Col>
                ))}
              </Row>

              {selectedOption && (
                <Row className="mb-5">
                  <Container>
                    <hr />
                    <h6>Detail Inquiry</h6>
                    <Form onSubmit={submitForm}>
                      <Form.Group as={Row} className="mb-2" controlId="formDate">
                        <Form.Label column sm={2}>
                          Date
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Label>{moment().format('LLL')}</Form.Label>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-2" controlId="formHotel">
                        <Form.Label column sm={2}>
                          Hotel
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Select
                            aria-label="Select Hotel"
                            size="sm"
                            name="hotel"
                            onChange={(e) => setSelectedHotel(e.target.value)}
                          >
                            <option>Select Location</option>
                            {selectedHotelList.map((hotel) => (
                              <option key={hotel.id_hotel} value={hotel.id_hotel}>
                                {hotel.nm_hotel}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formDepartment">
                        <Form.Label column sm={2}>
                          Department
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Select
                            aria-label="Select Department"
                            size="sm"
                            name="department"
                            onChange={(e) => setSelectedDept(e.target.value)}
                          >
                            <option>Select Department</option>
                            {selectedDeptList.map((dept) => (
                              <option key={dept.id_department} value={dept.id_department}>
                                {dept.nm_department}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formCategory">
                        <Form.Label column sm={2}>
                          Category
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            name="category"
                            size="sm"
                            value={chooseCat}
                            disabled={true}
                            placeholder="Category"
                          />
                        </Col>
                      </Form.Group>

                      <hr />
                      <h6>Detail Guest</h6>

                      <Form.Group as={Row} className="mb-3" controlId="formSubject">
                        <Form.Label column sm={2}>
                          Subject / Remark
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            as="textarea"
                            name="subject"
                            style={{ fontSize: '11px' }}
                            size="sm"
                            rows={8}
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Enter Subject"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formGuestName">
                        <Form.Label column sm={2}>
                          <i>Guest Name</i>
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            name="guestName"
                            size="sm"
                            style={{ fontWeight: 'bolder' }}
                            value={formData.guestName}
                            onChange={handleChange}
                            placeholder="Guest Name"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formGuestEmail">
                        <Form.Label column sm={2}>
                          <i>Guest Email</i>
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="email"
                            name="guestEmail"
                            size="sm"
                            style={{ fontWeight: 'bolder' }}
                            value={formData.guestEmail}
                            onChange={handleChange}
                            placeholder="Email"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formGuestPhone">
                        <Form.Label column sm={2}>
                          <i>Guest Phone</i>
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="tel"
                            name="guestPhone"
                            size="sm"
                            style={{ fontWeight: 'bolder' }}
                            value={formData.guestPhone}
                            onChange={handleChange}
                            placeholder="Phone"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3" controlId="formPriority">
                        <Form.Label column sm={2}>
                          <i>Response Priority</i>
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Select
                            aria-label="Select Priority"
                            size="sm"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                          >
                            <option>Select Priority</option>
                            <option value="1">Urgent</option>
                            <option value="2">So so</option>
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Col sm={12} className="mt-3">
                        <Button variant="primary" className="float-end" type="submit" disabled={loading}>
                          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
                        </Button>
                      </Col>
                    </Form>
                  </Container>
                </Row>
              )}
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Add;
