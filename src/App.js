import NavBar from "./components/NavBar";
import News from "./components/News";
import NewsWrapper from "./components/NewsWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            {/* Default Route for General News */}
            <Route path="/" element={<News category="general" />} />

            {/* Dynamic Route for News Categories */}
            <Route path="/:category" element={<NewsWrapper />} />

            {/* Placeholder Route for About Page */}
            <Route path="/about" element={<div>About Us</div>} />

            {/* 404 Page for Unknown Routes */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
      </>
    );
  }
}
