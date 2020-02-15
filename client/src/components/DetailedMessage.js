import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../components/Submission.css'
import Header from "./Header";
import Reply from './Reply';
import moment from 'moment';
var ObjectId = require('mongoose').Types.ObjectId;

export default class DetailedMessage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: "",
      author: "",
      date: null
    }
  }

  date = (messageDate) => {
    var end = moment();
    var start = moment(messageDate);
    return start.from(end);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (ObjectId.isValid(id)) {
      var auth = ""
      var msg = ""
      var dte = ""
      fetch('/api/v1/messages/' + id)
        .then(data => data.json())
        .then(results => {
          auth = results.author
          msg = results.message
          dte = results.date
          this.setState({
            message: msg,
            author: auth,
            date: dte
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
          <Header />
          <div className='container'>
            <div className='mt-5 mb-5'>
              <div className='container mt-2'>
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{this.state.message}</p>
                      <small className={`${this.state.message === "Invalid message ID" ? 'hidden' : ''} text-muted`}>{this.date(this.state.date)} from {this.state.author}</small>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Reply hidden={this.state.message === "Invalid message ID" ? 'hidden' : ''} id={this.props.match.params.id} />
        </header>
      </div>

    );
  }
}