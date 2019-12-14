import React from 'react';
import { Step } from './Step.js';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phenotyping: this.props.phenotypes,
            diagnosis: [
                { label: "Disease 1", prob: 0.4 },
                { label: "Disease 2", prob: 0.3 },
                { label: "Disease 3", prob: 0.3 }
            ]
        };
    }

    deepPhenotyping() {
        let items = [];

        for(let i = 0; i < this.state.phenotyping.length; ++i) {
            let currentPheno = this.state.phenotyping[i];
            items.push(<li className="list-group-item" key={i}>{currentPheno.label}</li>);
        }

        return items;
    }

    diagnosis() {
        let items = [];
        let diagItems = this.state.diagnosis.concat().sort((a, b) => b - a);


        for(let i = 0; i < diagItems.length; ++i) {
            let currentDiag = diagItems[i];
            items.push(<li className="list-group-item" key={i}>{currentDiag.label} <span style={{float: "right"}}>({currentDiag.prob})</span></li>);
        }

        return items;
    }

    render() {
        return (
            <>
                <Step step="3"></Step>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Your deep phenotyping
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {this.deepPhenotyping()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Possible diagnosis
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {this.diagnosis()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Review);