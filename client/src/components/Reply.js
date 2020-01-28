import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Submission.css';
import Replies from './Replies';
import Filter from 'bad-words';

export default class Reply extends Component {

    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            message: "",
            author: "",
            replies: [],
            messageError: null,
            authorError: null,
            error: false
        }

        this.getReplies = this.getReplies.bind(this);
    }

    addReply = event => {
        var valMsg = this.validateMessage();
        var valAuth = this.validateAuthor();
        if (valMsg || valAuth) {
            return;
        }

        var filter = new Filter();
        fetch('/api/v1/messages/replies/' + this.props.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: filter(this.state.message),
                author: this.state.author === "" ? "Anonymous" : filter(this.state.author)
            })
        })
            .then(data => data.json())
            .then(result => {
                this.setState({ replies: result.replies.sort((a, b) => (a.time > b.time ? 1 : -1)) })
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

    async getReplies() {
        if (this._isMounted) {
            try {
                const allReplies = [];
                const res = await fetch('/api/v1/messages/' + this.props.id)
                const data = await res.json();
                if (data.replies != null) {
                    allReplies.push(...data.replies);
                    allReplies.sort((a, b) => (a.time > b.time ? 1 : -1));
                }

                this.setState({
                    replies: allReplies
                })
            } catch (e) {
                console.log(e);
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getReplies();
        setInterval(this.getReplies, 5000)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className='container'>
                <input type='text' ref={el => this.inputAuthor = el} onChange={this.updateAuthor} className={`${this.props.hidden} highlight border-0 bg-dark text-white form-control mb-2 ${this.state.authorError ? 'is-invalid' : ''}`} placeholder='Username (Optional)'></input>
                <div className='invalid-feedback'>{this.state.authorError}</div>

                <textarea ref={el => this.inputMessage = el} onChange={this.updateMessage} onKeyDown={this.onEnter} className={`${this.props.hidden} highlight border-0 bg-dark text-white form-control ${this.state.messageError ? 'is-invalid' : ''}`} type='text' rows='5' resize='none' placeholder='Message'></textarea>
                <div className='invalid-feedback'>{this.state.messageError}</div>

                <button type="button" onMouseUp={this.addReply} disabled={this.state.error} className={`${this.props.hidden} mt-2 btn btn-warning btn-block`}>Reply</button>
                <Replies messages={this.state.replies} />

            </div>
        )
    }
}