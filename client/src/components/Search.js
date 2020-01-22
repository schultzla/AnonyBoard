import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import Tweet from './Tweets';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            author: "",
            messages: []
        };
    }

    render() {
        return (
            <div className='container'>
                <input type='text' ref={el => this.inputAuthor = el} onChange={this.updateAuthor} className='border-0 bg-dark text-white form-control mb-2' placeholder='Username'></input>
                <textarea ref={el => this.inputMessage = el} onChange={this.updateMessage} className='border-0 bg-dark text-white form-control' type='text' rows='5' resize='none' placeholder='Message'></textarea>
                <button type="button" onClick={this.addMessage} className="mt-2 btn btn-primary btn-sm">Submit</button>
                <Tweet messages={this.state.messages}/>
            </div>
        );
    }

    addMessage = event => {
        fetch('/api/v1/messages', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                message: this.state.message,
                author: this.state.author
              })})
        .then(data => data.json())
        .then(result => {
            this.setState({messages: [result, ...this.state.messages]})
            console.log(this.state.messages)
        })
        .catch(error => console.log(error))
        this.inputAuthor.value = "";
        this.inputMessage.value = "";
        this.setState({
            message: "",
            author: ""
        })
    }

    updateMessage = event => {
        this.setState({
            message: event.target.value
        })
    }

    updateAuthor = event => {
        this.setState({
            author: event.target.value
        })
    }

    componentDidMount() {
        const allMessages = [];
        fetch('/api/v1/messages')
            .then(data => data.json())
            .then(results => {
                allMessages.push(...results)
                this.setState({ messages: allMessages})
            })
            .catch(error => console.log(error))
    }
}