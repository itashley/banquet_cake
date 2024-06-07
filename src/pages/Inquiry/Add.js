import React, { useState,useEffect } from 'react';
import { Container, Card, Row, Col,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Navbar';
import axios from '../../utils/axios';
const Add = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCardList, setSelectedCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleCardClick = async (typeInq,idTypeInq) => {
    setSelectedCard(typeInq);
    console.log(idTypeInq)

    // Do search for relation for category inquiry
    try {
      const response = await axios.get(`/api/list/inq/category/${idTypeInq}`);
      console.log(response.data);
      if(response.data.data) {
        // setSelectedCardList(response.data.data);
      }
    } catch (err) {
      console.error('Login error:', err);
     
    } finally {
      setLoading(false);
    }

  };

  const getInqType = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/list/inq/type');
      console.log(response.data);
      setSelectedCardList(response.data.data);
    } catch (err) {
      console.error('Login error:', err);
     
    } finally {
      setLoading(false);
    }

  };

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
    color: selectedOption === 'hello' || selectedOption === 'hells' || selectedOption === 'grruot' ? '#ffffff' : '#6c757d', // White if selected, gray if not   
  };

  useEffect(() => {
    getInqType()
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card>
          <Card.Header style={{ textAlign: 'center', fontWeight: 'bold' ,fontSize:"14px"}}>Guest Inquiry Form</Card.Header>
          <Card.Body>
            <Container>


            <Row>
              {selectedCardList.map((item) => (
                <Col lg={3} className="mb-3" key={item.id_esc_type}>
                  <Card
                    className="p-3"
                    style={selectedCard === item.esc_name ? selectedStyle : cardStyle}
                    onClick={() => handleCardClick(item.esc_name,item.id_esc_type)}
                  >
                    <Card.Body>
                      <Card.Title>{item.esc_name}</Card.Title>
                      <Card.Subtitle className="mb-2" style={{ fontSize: '11px', color: selectedCard === item.esc_name ? '#ffffff' : '#6c757d' }}>
                        {item.esc_description}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

              <Row>
                {[{ title: 'hello', subtitle: 'Subtitle 1' }, { title: 'hells', subtitle: 'Subtitle 2' }, { title: 'grruot', subtitle: 'Subtitle 3' }].map((option, index) => (
                  <Col key={index} lg={2} className="mb-3">
                    <Form.Check
                      type="radio"
                      name="option"
                      id={`option-${index + 1}`}
                      className="p-3"
                      checked={selectedOption === option.title}
                      onChange={() => handleOptionSelect(option.title)}
                    >
                      <Form.Check.Input type="radio" isValid />
                      <Form.Check.Label>
                        <h6>{option.title}</h6>
                        <h4 className="mb-2 text-muted" style={subtitleStyle}>
                          {option.subtitle}
                        </h4>
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                ))}
              </Row>






            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Add;
