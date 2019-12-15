import React from 'react';
import { AppHeader } from "./components/Header.js";
import { Describe } from './components/Describe.js';
import Refine from './components/Refine.js';
import Review from './components/Review.js';
import Home from './components/Home.js';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          originalPhenotypes: [],
          selectedPhenotypes: []
      };
  }

  render() {
    return (
      <Router>
      <AppHeader />
        <Switch>
          <Route path="/describe">
            <Describe setPhenotypes={(phenotypes) => {this.setState({originalPhenotypes: phenotypes}); }} />
          </Route>
          <Route path="/refine">
            <Refine setPhenotypes={(phenotypes) => this.setState({selectedPhenotypes: phenotypes})} firstIterationPhenotypes={this.state.originalPhenotypes} />
          </Route>
          <Route path="/review">
            <Review phenotypes={this.state.originalPhenotypes.concat(this.state.selectedPhenotypes)} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    );
  }
}

export default App;
