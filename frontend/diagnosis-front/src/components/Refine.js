import React from 'react';
import { Step } from './Step.js';

export class Refine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <>
                <Step step="2"></Step>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h5>Would you say you have... <b>Macrocephaly</b>?</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text pt-1">Macrocephaly refers to an overly large head. There’s a standard used to define macrocephaly: The circumference of a person’s head is more than two standard deviations above average for their age. Or, their head is larger than the 98th percentile.</p>
                            </div>
                            <div className="card-footer">
                                <div className="row justify-content-around pt-2">
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-primary btn-yes">Yes</button>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-primary btn-no">No</button>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-primary btn-na">I don&apos;t know</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
