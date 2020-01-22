import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Tweets extends Component {

    render() {
        return (
            <div class='container mt-5'>
                <div class="card bg-dark text-white">
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>{this.props.message}</p>
                            <footer class="blockquote-footer">{this.props.author}</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}