import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row, Table, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import axios from '../utils/axios';
import moment from 'moment';
import LOGO from '../assets/logo.png';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState([]);

  const NumberFormatIDR = ({ value }) => {
    const formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
    return formattedValue;
  };

  const getBanquetForecast = async () => {
    try {
      const response = await axios.get('/api/search/banquet/forecast/1/2024-06-01/2024-06-30');
      console.log(response.data);
    } catch (err) {
      console.error('Error find banquet forecast:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Search clicked with start date:', startDate, 'and end date:', endDate);

    try {
      const response = await axios.get(`/api/search/banquet/forecast/${selectedHotel}/${startDate}/${endDate}`);
      console.log(response.data);
      // Filter meals to exclude those with "LUNCH" package
      const filteredResults = response.data.map(row => ({
        ...row,
        Meals: row.Meals.filter(meal => meal.Package !== "LUNCH")
      }));
      setResult(filteredResults);
    } catch (err) {
      console.error('Error find banquet forecast:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoffeeBreakClick = (meal) => {
    alert(`Coffee Break clicked for meal ID: ${meal.mealsID}`);
  };

  const calculateCoffeeBreakPax = (meals) => {
    return meals
      .filter(meal => meal.Package === "COFFEE BREAK")
      .reduce((total, meal) => total + meal.Pax, 0);
  };

  return (
    <>
      <Header runGetAPIInsoft={getBanquetForecast} />
      <div className='container-fluid mt-5'>
        <div className='container'>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md='2'>
                <Form.Check
                  type="radio"
                  name="hotel"
                  value="1"
                  style={{ fontSize: "16px" }}
                  label="Ashley Wahid Hasyim"
                  checked={selectedHotel === "1"}
                  onChange={handleClick}
                />
              </Col>
              <Col md='2'>
                <Form.Check
                  type="radio"
                  name="hotel"
                  value="2"
                  style={{ fontSize: "16px" }}
                  label="Ashley Tanah Abang"
                  checked={selectedHotel === "2"}
                  onChange={handleClick}
                />
              </Col>
              <Col md='3'>
                <Form.Control required size='sm' className='text-center' placeholder='Start' type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </Col>
              <Col md='1' className='text-center'>
                <Form.Label style={{ fontSize: "16px" }}>until</Form.Label>
              </Col>
              <Col md='3'>
                <Form.Control required size='sm' type='date' className='text-center' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </Col>
              <Col md='1'>
                <Button variant="primary" type="submit" block="true">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <hr />

        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {!loading && result.length > 0 && (
          <div className='container'>
            <div className="text-center">
              <img src={LOGO} width={100} alt="Logo" />
            </div>
            <h5 className="text-center">Banquet Forecast</h5>
            <p className="text-center">
              {selectedHotel === "1" && <span>Ashley Wahid Hasyim</span>}
              {selectedHotel === "2" && <span>Ashley Tanah Abang</span>}
            </p>
            <p className="text-center">
              From: {moment(startDate).format('ll')} to {moment(endDate).format('ll')}
            </p>
            <Table striped bordered hover style={{ marginBottom: "10%" }}>
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Customer Name</th>
                  <th>Event Type</th>
                  <th>Time</th>
                  <th>Function Room</th>
                  <th>Setup</th>
                  <th>Set Pax</th>
                  <th>Status</th>
                  <th>Salesman</th>
                  <th>Revenue</th>
                  <th>Created Date</th>
                  <th>Meals</th>
                  <th>Total Coffee Break Pax</th>
                </tr>
              </thead>
              <tbody>
                {result.map((row, index) => {
                  const totalCoffeeBreakPax = calculateCoffeeBreakPax(row.Meals);
                  return (
                    <tr key={index}>
                      <td>{moment(row.onDate).format('DD-MMM-YYYY')}</td>
                      <td>{row.GuestName}</td>
                      <td>{row.Package}</td>
                      <td>{row.TimeSpan}</td>
                      <td>{row.Function}</td>
                      <td>{row.Setup}</td>
                      <td>{row.SetPax}</td>
                      <td>{row.StatusName}</td>
                      <td>{row.Salesman}</td>
                      <td>{NumberFormatIDR({ value: row.Revenue })}</td>
                      <td>{moment(row.CreatedOn).format('DD-MMM-YYYY HH:mm')}</td>
                      <td>
                        <ul>
                          {row.Meals.map((meal, mealIndex) => (
                            <li key={mealIndex}>
                              {meal.Package} ({meal.Period}): {meal.TimeFrom} - {meal.TimeTo} | <b><i>{meal.Pax} Pax</i></b>
                              {meal.Package === "COFFEE BREAK" && (
                                <>
                                <br/>
                                <i class="bi bi-info-circle" onClick={() => handleCoffeeBreakClick(meal)}></i>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        {totalCoffeeBreakPax > 0 && (
                          <Button
                            variant="primary"
                            size="sm"
                            className="ml-2"
                            onClick={() => alert(`Total Coffee Break Pax: ${totalCoffeeBreakPax}`)}
                          >
                            {totalCoffeeBreakPax} Pax
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}

        {!loading && result.length === 0 && (
          <p className="text-center mt-3">No data found for the selected criteria or please choose another date</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
