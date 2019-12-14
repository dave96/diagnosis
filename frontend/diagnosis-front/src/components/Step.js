import React from 'react';
import './Step.css';

export class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: parseInt(props.step),
        };
    }

    render() {
        return (
            <div className="container">
                <div className="step-indicator">
                    <span className={this.state.currentStep >= 1 ? "step completed" : "step"}>
                        <span className="name">Describe</span>
                    </span>
                    <span className={this.state.currentStep >= 2 ? "step completed" : "step"}>
                        <span className="name">Refine</span>
                    </span>
                    <span className={this.state.currentStep >= 3 ? "step completed" : "step"}>
                        <span className="name">Review</span>
                    </span>
                </div>
            </div>
        );
    }
}
