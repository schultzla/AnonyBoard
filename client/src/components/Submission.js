import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Submission.css';
import Messages from './Messages';
import Filter from 'bad-words';

export default class Submission extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            author: "",
            messages: [],
            messageError: null,
            authorError: null,
            error: false
        };

        this.getMessages = this.getMessages.bind(this);
    }

    validateAuthor = () => {
        const { author } = this.state;
        if (author.match('(?!^ +$)^.+$') == null) {
            this.setState({
                authorError: author.length > 0 ? "Author must be 3 characters" : null
            })
        } else {
            this.setState({
                authorError: author.length > 0 ? (author.length < 3 ? 'Author must be more than 3 characters' : null) : null
            })
        }

        if (author.length === 0) {
            return false;
        } else {
            return author.length < 3;
        }
    }

    validateMessage = () => {
        const { message } = this.state;
        if (message.match('(?!^ +$)^.+$') == null) {
            this.setState({
                messageError: "Message is empty",
                error: true
            })
            return true;
        } else {
            this.setState({
                messageError: message.length <= 0 ? (message.length > 140 ? 'Message must be less than 140 characters' : 'Message is empty') : null,
                error: message.length <= 0 ? (message.length > 140 ? true : true) : false
            })
        }

        if (message.length > 0 && message.length < 140) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className='container'>
                <input type='text' ref={el => this.inputAuthor = el} onChange={this.updateAuthor} className={`border-0 bg-dark text-white form-control mb-2 ${this.state.authorError ? 'is-invalid' : ''}`} placeholder='Username (Optional)'></input>
                <div className='invalid-feedback'>{this.state.authorError}</div>

                <textarea ref={el => this.inputMessage = el} onChange={this.updateMessage} onKeyDown={this.onEnter} className={`border-0 bg-dark text-white form-control ${this.state.messageError ? 'is-invalid' : ''}`} type='text' rows='5' resize='none' placeholder='Message'></textarea>
                <div className='invalid-feedback'>{this.state.messageError}</div>

                <button type="button" onMouseUp={this.addMessage} disabled={this.state.error} className="mt-2 btn btn-warning btn-block">Submit</button>
                <Messages messages={this.state.messages} />
            </div>
        );
    }

    onEnter = event => {
        if (event.keyCode === 13 && event.shiftKey === false && !this.state.error) {
            event.preventDefault();
            this.addMessage();
        }
    }

    addMessage = event => {
        var valMsg = this.validateMessage();
        var valAuth = this.validateAuthor();
        if (valMsg || valAuth) {
            return;
        }

        var filter = new Filter()
        fetch('/api/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: filter.clean(this.state.message),
                author: this.state.author === "" ? "Anonymous" : filter.clean(this.state.author)
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
            author: "",
            error: true
        })
    }

    updateMessage = event => {
        this.setState({
            message: event.target.value,
            error: false,
            messageError: null
        });
    }

    updateAuthor = event => {
        this.setState({
            author: event.target.value,
            error: false,
            authorError: null
        });
    }

    capMessages() {
        if (this.state.messages.length > 25) {
            var extras = this.state.messages.splice(25, this.state.messages.length - 1);
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
        if (this._isMounted) {
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
    }

    componentDidMount() {
        this._isMounted = true;
        this.getMessages();
        setInterval(this.getMessages, 5000)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}