import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import DummySwapiService from "../../services/dummy-swapi-service";

import {
  PeoplePage
} from '../pages';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {

      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }

    })
  }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet updateInterval={8000}/> :
      null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>
            { planet }

            <PeoplePage/>

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
