import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';

// BrowserRouter tells React Router how to behave
// Looks at router & changes the components visible on the screen
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  componentDidMount(props) {
    this.props.fetchUser();
  }

  render() {
   return (
    <div>
     <BrowserRouter>
      <div className="container">
       <Header />
       <Route exact path="/" component={Landing} />
       <Route path="/surveys" component={Dashboard} />
       <Route path="/surveys/new" component={SurveyNew} />
      </div>
     </BrowserRouter>
    </div>
  );
 }
};

export default connect(null, actions)(App);
