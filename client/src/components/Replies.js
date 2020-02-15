import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Submission.css';
import moment from 'moment';

export default class Messages extends Component {

  date = (messageDate) => {
    var end = moment();
    var start = moment(messageDate);
    return start.from(end);
  }

  render() {
    return (
      <div className='mt-5 mb-5'>
        {this.props.messages.map((message, index) =>
          <div className='container mt-2' key={index}>
            <div className="card bg-dark text-white">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{message.message}</p>
                  <h5>
                    <small className='text-muted'>{this.date(message.date)} from {message.author}</small>
                  </h5>
                </blockquote>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}