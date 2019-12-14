
import React from 'react';
import { Step } from './Step.js';

export class Describe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <>
                <Step step="1"></Step>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                            <input className="form-control form-control-lg" placeholder="Describe your symptoms..." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="pl-2 small">e.g.  &apos;headache&apos;, &apos;tachycardia&apos;, &apos;anemia&apos;, etc.</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
