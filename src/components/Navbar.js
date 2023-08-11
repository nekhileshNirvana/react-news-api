import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import "./Navbar.css"
import Cookies from 'js-cookie'

export default function CustomNavbar() {
  
  const handleSignInClick = async () => {
    const clientId = '51200461855-qtjkic8mekk4g9l5tt171k4bk6675jaj.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8080/auth/google/callback';
    const scope = 'profile email';
  
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
    // Redirect the user to the Google OAuth 2.0 authorization endpoint
    window.location.href = authorizationUrl;
    // After successful login
Cookies.set('loggedIn', 'true');


  };
  
  const isLoggedIn = Cookies.get('loggedIn') === 'true';

      
  
  
  const handleSignOut = () => {
    // After successful logout
Cookies.remove('loggedIn');

    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
    })
      .then(() => {
        // Redirect to a logged-out state (e.g., home page)
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
    <Container>
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        STNews
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="nav-link">
            Home
          </Nav.Link>
          <NavDropdown title="Filter" id="basic-nav-dropdown" className="nav-dropdown">
            <NavDropdown.Item as={Link} to="/business">
              Business
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/entertainment">
              Entertainment
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/health">
              Health
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/science">
              Science
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/sports">
              Sports
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/technology">
              Technology
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
            {isLoggedIn?(<button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>)
              :
            (<button onClick={handleSignInClick} className="sign-in-button">
              Sign in with Google
            </button>)}
          
        {isLoggedIn?(<Link to="/Form">
          <Button variant="primary" className="create-button">
            Create
          </Button>
        </Link>):null}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

CustomNavbar.propTypes = {
  prop: PropTypes.any,
}