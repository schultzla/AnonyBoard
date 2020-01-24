import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
    render() {
        return (
            <div className="mt-3">
                <Link to="/">
                    <FontAwesomeIcon icon={faUserSecret} color="#fec02f" size="3x" />
                </Link>
            </div>
        )
    }
}