import React from 'react'
import { Navbar, Nav,Container,NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png'

function Navigate() {
const history = useHistory();
  return (
    <div>
      <Navbar style={{fontSize:'12px'}}  bg="dark" data-bs-theme="dark" expand="sm" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand><img width={50} src={logo}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
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
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
          
      </Navbar>

      <Navbar style={{fontSize:'12px',height:"40px"}} expand="sm" className="bg-body-tertiary">
          <Container>
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home"><i className="bi bi-bar-chart-fill"></i> <span className="ml-2">Statistic</span></Nav.Link>
                <Nav.Link href="#home"><i className="bi bi-calendar-check-fill"></i> <span className="ml-2">Statistic</span></Nav.Link>
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
                </NavDropdown>
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