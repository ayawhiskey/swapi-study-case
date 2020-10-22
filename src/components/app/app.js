import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, 
  Route, 
  Switch,
  Link } from 'react-router-dom';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';

import {
  StarshipDetails
} from '../sw-components';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  };


  render() { 

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header 
                isLoggedIn={isLoggedIn}/>
              <RandomPlanet />

              <Switch>

                <Route path="/" 
                      render={() => <h2>Welcome to StarDB</h2>}
                      exact />
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetsPage}/>
                <Route path="/starships" exact component={StarshipsPage}/>
                <Route 
                  path="/starships/:id" 
                  render={({match, location, history}) => { 
                      const { id } = match.params;
                      return <StarshipDetails itemId = {id} />}
                    }/>

                <Route 
                  path="/login" 
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}/>
                  )}/>

                <Route 
                  path="/secret" 
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn}/>
                  )}/>

                <Route render={() => {
                  return (
                    <React.Fragment>
                      <p>Page Not Found</p>
                      <Link to="/">Back to Index Page</Link>
                    </React.Fragment>
                  )
                }}/>

              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
