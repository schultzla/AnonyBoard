import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import Tweet from './Messages';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            author: "",
            messages: [],
            messageError: "",
            authorError: ""
        };
        
        this.getMessages = this.getMessages.bind(this);
    }

    render() {
        return (
            <div className='container'>
                <input type='text' ref={el => this.inputAuthor = el} onChange={this.updateAuthor} className={`border-0 bg-dark text-white form-control mb-2 ${this.state.authorError ? 'is-invalid' : ''}`} placeholder='Username (Optional)'></input>
                <div className='invalid-feedback'>{this.state.authorError}</div>

                <textarea ref={el => this.inputMessage = el} onChange={this.updateMessage} onKeyDown={this.onEnter} className={`border-0 bg-dark text-white form-control ${this.state.messageError ? 'is-invalid' : ''}`} type='text' rows='5' resize='none' placeholder='Message'></textarea>
                <div className='invalid-feedback'>{this.state.messageError}</div>

                <button type="button" onMouseUp={this.addMessage} className="mt-2 btn btn-primary btn-sm">Submit</button>
                <Tweet messages={this.state.messages} />
            </div>
        );
    }

    onEnter = event => {
        if (event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            this.addMessage();
        }
    }

    addMessage = event => {
        this.capMessages();
        fetch('/api/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: this.state.message,
                author: this.state.author === "" ? "Anonymous" : this.state.author
            })
        })
            .then(data => data.json())
            .then(result => {
                this.setState({ messages: [result, ...this.state.messages] })
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
            message: event.target.value,
            messageError: ""
        })
    }

    updateAuthor = event => {
        this.setState({
            author: event.target.value,
            authorError: ""
        })
    }

    capMessages() {
        if (this.state.messages.length > 5) {
            var extras = this.state.messages.splice(5, this.state.messages.length - 1);
            extras.map(val => {
                return fetch('/api/v1/messages/' + val._id, {
                    method: 'DELETE'
                })
                .then(data => data.json())
                .catch(error => console.log(error))
            })
            
        }
    }

    async getMessages() {
        this.capMessages();
        try {
            const allMessages = [];
            const res = await fetch('/api/v1/messages')
            const data = await res.json();
            allMessages.push(...data);
            allMessages.sort((a, b) => (a.time > b.time ? 1 : -1));

            this.setState({
                messages: allMessages
            })
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getMessages();
        setInterval(this.getMessages, 5000)
    }
}