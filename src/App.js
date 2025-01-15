import Navbar from "./components/NavBar";
import News from "./components/News";
import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    );
  }
}
