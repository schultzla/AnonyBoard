import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Header from './Header'

export default class Invalid extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <h1>404, Not Found!</h1>
        </header>
      </div>
    );
  }
}