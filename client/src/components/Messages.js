import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import { Link } from 'react-router-dom'

export default class Messages extends Component {
  
  render() {
    return (
      <div className='mt-5 mb-5'>
        {this.props.messages.map((message, index) =>
          <div className='container mt-2' key={index}>
            <div className="card bg-dark text-white">
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={{
              pathname: '/message/' + message._id,
              state: {
                id: message._id
              }
            }}>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{message.message}</p>
                  <footer className="blockquote-footer">{message.author}</footer>
                </blockquote>
              </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}