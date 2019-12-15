import React from 'react';
import { Step } from './Step.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Review extends React.Component {
    constructor(props) {
        super(props);
        // { label: "Disease 1", prob: 0.4 },
        // { label: "Disease 2", prob: 0.3 },
        // { label: "Disease 3", prob: 0.3 }
        this.state = {
            phenotyping: this.props.phenotypes,
            diagnosis: null
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

    loadProbabilities(apiAnswer) {
        let diagnosis = apiAnswer.data.map(x => { return {label: x[0], prob: Math.round(x[1] * 100)}});
        diagnosis.sort((a, b) => (b.prob - a.prob));
        this.setState({
            diagnosis: diagnosis
        });
    }

    diagnosis() {
        let items = [];
        if(this.state.diagnosis === null) {
            // console.log(this.state.phenotyping);
            axios.post("http://localhost:8000/api/pheno_diagnostic", { phenotypes: this.state.phenotyping.map(x => x.onto),
                                                                       phenotypes_orig: this.state.phenotyping.filter(x => x.orig).map(x => x.onto) })
                 .then(this.loadProbabilities.bind(this));

            return ([<li className="list-group-item" key="0">Loading...</li>]);
        }

        let diagItems = this.state.diagnosis.concat().sort((a, b) => b - a);


        for(let i = 0; i < diagItems.length; ++i) {
            let currentDiag = diagItems[i];
            items.push(<li className="list-group-item" key={i}>{currentDiag.label} <span style={{float: "right"}}>({currentDiag.prob} %)</span></li>);
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