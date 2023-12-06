import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">News App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <Link to="/register" className='py-2 text-secondary fw-semibold ps-3 pe-4 text-decoration-none'>Register</Link>
         
            <Link to="/login" className='py-2 text-secondary fw-semibold text-decoration-none'>Login</Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Ajay Kumar</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarComp