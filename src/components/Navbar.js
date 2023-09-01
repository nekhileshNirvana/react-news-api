import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import "./Navbar.css"
import Cookies from 'js-cookie'
import { useOAuth2 } from "react-oauth2";


export default function CustomNavbar() {

  const handleLoginClick = () => {
    // Redirect the user to the OAuth2 authentication page
    window.location.href = 'http://localhost:8080/auth/google';
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
        
        <button onClick={handleLoginClick}>Login with Google</button>
          
        <Link to="/Form">
          <Button variant="primary" className="create-button">
            Create
          </Button>
        </Link>)
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

CustomNavbar.propTypes = {
  prop: PropTypes.any,
}
