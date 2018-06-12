import React, { Component } from 'react';
// BrowserRouter tells React Router how to behave
// Looks at router & changes the components visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

import 'materialize-css/dist/css/materialize.min.css';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

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
