import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Diagnòstic: ràpid</h1>
                    <p className="lead">You will be asked to describe your symptoms and then answer some questions.</p>
                </div>
                <hr className="my-4" />
                    <div className="container">
                        <Link className="btn btn-primary btn-lg" to="/describe">Start!</Link>
                    </div>
            </div>
        );
    }
}

export default Home;
