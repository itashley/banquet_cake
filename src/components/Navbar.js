import React, { useState,useEffect } from 'react';
import { Navbar, Nav,Container,NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png'
import axios from '../utils/axios';
// import Swal from 'sweetalert2';
import { getUser,removeUserSession } from '../utils/Common';
import moment from 'moment';



function Navigate({ runGetAPIInsoft }) {
const history = useHistory();

const [userDetail, setUserDetail] = useState([]);
const handleLogout = async () => {
  removeUserSession()
  history.push('/')

}

const handleLoadAPI = () => {
  runGetAPIInsoft(); // Run the function passed from props
};

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUserDetail(userData);
    }
    
  }, []);


  return (
    <div>
      
      <Navbar style={{ fontSize: '12px' }} bg="dark" data-bs-theme="dark" expand="sm" className="bg-body-tertiary">
        <Container >
          <Navbar.Brand><img width={50} src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>

              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item style={{ fontSize: '12px' }} >List</NavDropdown.Item>
                <NavDropdown.Item style={{ fontSize: '12px' }} >Calendar</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>

              {/* <NavDropdown title="Inquiry" id="basic-nav-dropdown">
                <NavDropdown.Item style={{ fontSize: '12px' }} >Add</NavDropdown.Item>
                <NavDropdown.Item style={{ fontSize: '12px' }} >List</NavDropdown.Item>
                <NavDropdown.Item style={{ fontSize: '12px' }} >Progress</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" style={{ fontSize: '12px' }}>Done</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" style={{ fontSize: '12px' }}>Ongoing</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" style={{ fontSize: '12px' }}>Waiting to Review</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown title={`Signed in as: ${userDetail ? userDetail.name : ''}`} id="user-nav-dropdown" alignRight>
                <NavDropdown.Item  style={{fontSize:"12px"}} onClick={() => history.push('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Item style={{fontSize:"12px"}} onClick={()=>handleLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar style={{fontSize:'12px',height:"40px"}} expand="sm" className="bg-body-tertiary">
          <Container>
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={()=>handleLoadAPI()}><i className="bi bi-arrow-repeat"></i> <span className="ml-2">Load Insoft</span></Nav.Link>
                {/* <Nav.Link href="#home"><i className="bi bi-calendar-check-fill"></i> <span className="ml-2">Statistic</span></Nav.Link>
                <NavDropdown title="Inquiry" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => history.push('/inquiry/add')}>Add</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
            {/* <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text>
            </Navbar.Collapse> */}
          </Container>
          
      </Navbar>
    </div>
  )
}

export default Navigate