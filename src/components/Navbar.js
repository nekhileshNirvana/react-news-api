import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">STNews</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">
                <link className="nav-link" to="/">About</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/business">business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">general</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sport">sport</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">technology</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  prop: PropTypes.any,
};
