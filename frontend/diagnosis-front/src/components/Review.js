import React from 'react';
import { Step } from './Step.js';

export class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
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
                                <div className="card-body">
                                    Uatever
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Possible diagnosis
                                </div>
                                <div className="card-body">
                                    Uatever
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
