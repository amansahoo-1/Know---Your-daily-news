import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" exact to="/">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/technology">
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" exact to="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
