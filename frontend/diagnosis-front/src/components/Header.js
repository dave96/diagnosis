
import React from 'react';

import { Link } from "react-router-dom";

export class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg">
                <Link className="navbar-brand ml-3" to="/">
                    Diagnostic: ràpid!
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/describe">Start</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
