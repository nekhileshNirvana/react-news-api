import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export default function CustomNavbar() {

  const handleSignInClick = () => {
    const clientId = '51200461855-qtjkic8mekk4g9l5tt171k4bk6675jaj.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8080/auth/google/callback'; // Update with your desired redirect URL
    const scope = 'profile email';
  
    // Construct the authorization URL
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
    // Redirect the user to the Google OAuth 2.0 authorization endpoint
    window.location.href = authorizationUrl;
  };

  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "black" }}>
          STNews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "black" }} // Set the color to black
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/business"
              style={{ color: "black" }} // Set the color to black
            >
              Business
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/entertainment"
              style={{ color: "black" }} // Set the color to black
            >
              Entertainment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/health"
              style={{ color: "black" }} // Set the color to black
            >
              Health
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/science"
              style={{ color: "black" }} // Set the color to black
            >
              Science
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/sports"
              style={{ color: "black" }} // Set the color to black
            >
              Sports
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/technology"
              style={{ color: "black" }} // Set the color to black
            >
              Technology
            </Nav.Link>
          </Nav>
          <button onClick={handleSignInClick}>
      Sign in with Google
    </button>
          <Link to="/Form">
            <Button variant="primary">Create</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

CustomNavbar.propTypes = {
  prop: PropTypes.any,
}