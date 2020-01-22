import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css';
import Tweet from './Tweets';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            author: ""
        };
    }

    render() {
        return (
            <div class='container'>
                <input type='text' onChange={this.updateAuthor} class='border-0 bg-dark text-white form-control mb-2' placeholder='Username'></input>
                <textarea onChange={this.updateMessage} class='border-0 bg-dark text-white form-control' type='text' rows='5' resize='none' placeholder='Message'></textarea>
                <button type="button" class="mt-2 btn btn-primary btn-sm">Submit</button>
                <Tweet message={this.state.message} author={this.state.author}/>
            </div>
        );
    }

    updateTweet = event => {
        
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
}