import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAuth, signOut } from "firebase/auth";
import { BsEnvelopeAtFill } from "react-icons/bs";


const NavbarComp = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <h5 className=' text-primary fw-semibold ps-3 pe-4 '>News App</h5>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <Link to="/register" className='py-2 text-secondary fw-semibold ps-3 pe-4 text-decoration-none'>Register</Link>
            )}
            {!user && (
              <Link to="/login" className='py-2 text-secondary fw-semibold ps-3 pe-4 text-decoration-none'>Login</Link>
            )}

            {user && (
              <Link to="/news" className='py-2 ps-3 pe-4 text-secondary fw-semibold text-decoration-none'>News Article</Link>
            )}
            
          </Nav>
          <Nav>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              {user ? (
                <div>
                 <NavDropdown.Item ><BsEnvelopeAtFill /> : {user.email}</NavDropdown.Item>
                  <NavDropdown.Item >
                <button className='btn btn-sm btn-outline-danger'onClick={handleLogout}>Sign Out</button>
              </NavDropdown.Item>
                </div>
              ) : (
                <NavDropdown.Item >Not Login</NavDropdown.Item>
              
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp