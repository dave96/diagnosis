import React from 'react';
import { AppHeader } from "./components/Header.js";
import { Describe } from './components/Describe.js';
import { Refine } from './components/Refine.js';
import { Review } from './components/Review.js';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <AppHeader />
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/describe">
          <Describe />
        </Route>
        <Route path="/refine">
          <Refine />
        </Route>
        <Route path="/review">
          <Review />
        </Route>
        <Route path="/">
          Home
        </Route>
      </Switch>
  </Router>


  );
}

export default App;
