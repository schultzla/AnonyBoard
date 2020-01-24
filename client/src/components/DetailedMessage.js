import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from "./Header";
var ObjectId = require('mongoose').Types.ObjectId;

export default class DetailedMessage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: "",
      author: ""
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (ObjectId.isValid(id)) {
      var auth = ""
      var msg = ""
      fetch('/api/v1/messages/'+id)
        .then(data => data.json())
        .then(results => {
          auth = results.author
          msg = results.message
          this.setState({
            message: msg,
            author: auth
          })
        })
        .catch(error => {
          msg = "Invalid message ID"
          this.setState({
            message: msg,
            author: auth
          })
        })
    } else {
      this.setState({
        message: "Invalid message ID"
      })
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header/>
          <div className='container'>
            <div className='mt-5 mb-5'>
              <div className='container mt-2'>
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{this.state.message}</p>
                      <footer className="blockquote-footer">{this.state.author}</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

    );
  }
}