import React, { useState } from 'react';
import { Container, Card, Row, Col,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Navbar';

const Add = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);

    console.log(card)




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

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card>
          <Card.Header style={{ textAlign: 'center', fontWeight: 'bold' }}>Guest Inquiry Form</Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col lg={3} className="mb-3">
                  <Card
                    className="p-3"
                    style={selectedCard === 'Business Initiate' ? selectedStyle : cardStyle}
                    onClick={() => handleCardClick('Business Initiate')}
                  >
                    <Card.Body>
                      <Card.Title>Business Initiate</Card.Title>
                      <Card.Subtitle className="mb-2" style={{ fontSize: '11px', color: selectedCard === 'Business Initiate' ? '#ffffff' : '#6c757d' }}>
                        Subtitle here
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={3} className="mb-3">
                  <Card
                    className="p-3"
                    style={selectedCard === 'Business Service' ? selectedStyle : cardStyle}
                    onClick={() => handleCardClick('Business Service')}
                  >
                    <Card.Body>
                      <Card.Title>Business Service</Card.Title>
                      <Card.Subtitle className="mb-2" style={{ fontSize: '11px', color: selectedCard === 'Business Service' ? '#ffffff' : '#6c757d' }}>
                        Subtitle here
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={3} className="mb-3">
                  <Card
                    className="p-3"
                    style={selectedCard === 'Social Media' ? selectedStyle : cardStyle}
                    onClick={() => handleCardClick('Social Media')}
                  >
                    <Card.Body>
                      <Card.Title>Social Media</Card.Title>
                      <Card.Subtitle className="mb-2" style={{ fontSize: '11px', color: selectedCard === 'Social Media' ? '#ffffff' : '#6c757d' }}>
                        Subtitle here
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={3} className="mb-3">
                  <Card
                    className="p-3"
                    style={selectedCard === 'OTA' ? selectedStyle : cardStyle}
                    onClick={() => handleCardClick('OTA')}
                  >
                    <Card.Body>
                      <Card.Title>OTA</Card.Title>
                      <Card.Subtitle className="mb-2" style={{ fontSize: '11px', color: selectedCard === 'OTA' ? '#ffffff' : '#6c757d' }}>
                        Subtitle here
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
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
