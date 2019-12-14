
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
                <a className="navbar-brand ml-3" href="#">
                    Diagnostic: ràpid!
            </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/describe">Describe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/refine">Refine</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/review">Review</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
