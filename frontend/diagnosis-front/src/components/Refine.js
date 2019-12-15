import React from 'react';
import { Step } from './Step.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function cleanUpString(str) {
    let firstIndex = str.indexOf("\"");
    let secondIndex = str.indexOf("\"", firstIndex+1);

    if(firstIndex === -1 || secondIndex === -1)
        return str;
    else
        return str.substring(firstIndex+1, secondIndex);
}

class Refine extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.firstIterationPhenotypes === undefined || this.props.firstIterationPhenotypes === null)
            this.props.history.push("/");

        this.state = {
            currentQuestion: -1,
            questions: [],
            firstPhenos: this.props.firstIterationPhenotypes
        };

    }

    loadQuestions(apiAnswer) {
        let projected = apiAnswer.data.map(x => { return {
            question: x.name,
            description: cleanUpString(x.def),
            answer: null,
            onto: x.is_a[0],
            synonyms: x.synonym ? x.synonym.map(x => cleanUpString(x)).join(", ") : ""
        }});

        // console.log(projected);

        this.setState({ questions: projected, currentQuestion: 0 });
    }

    handleAnswer(answer) {
        let questions = this.state.questions;
        let currentQuestion = this.state.currentQuestion;
        questions = questions.map((x, i) => {
            if(i === currentQuestion) {
                let ret = Object.assign({}, x);
                ret.answer = answer;
                return ret;
            } else
                return x;
        });

        if(++currentQuestion === questions.length) {
            this.props.setPhenotypes(questions.filter(x => x.answer === 1).map(x => {return {label: x.question, onto: x.onto, orig: false }}));
            this.props.history.push("/review");
        }

        this.setState({ questions: questions, currentQuestion });
    }

    render() {
        if(this.state.currentQuestion === -1 || this.state.questions.length === 0) {
            axios.post("http://localhost:8000/api/pheno_quest", { phenotypes: this.state.firstPhenos.map(x => x.onto) })
                 .then(this.loadQuestions.bind(this));

            return (
                <>
                    <Step step="2"></Step>
                    <div className="container mt-4">{this.state.currentQuestion === -1 ? "Loading" : "Could not find matching diseases"}</div>
                </>
            )
        } else {
            const currentQuestion = this.state.questions[this.state.currentQuestion];
            const width = parseInt(this.state.currentQuestion  * 100 / this.state.questions.length) + "%";
            return (
                <>
                    <Step step="2"></Step>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Would you say you have... <b>{currentQuestion.question}</b>?</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text pt-1">{currentQuestion.description}</p>
                                    <p className="card-text pt-1 small">Also known as: {currentQuestion.synonyms}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="row justify-content-around pt-2">
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-primary btn-yes" onClick={() => this.handleAnswer(1)}>Yes</button>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-primary btn-no" onClick={() => this.handleAnswer(0)}>No</button>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-primary btn-na" onClick={() => this.handleAnswer(2)}>I don&apos;t know</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: width}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default withRouter(Refine);