import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Home from './Home';
import Drawing from './Drawing';

class Main extends Component {
  render() {
    return (
        <BrowserRouter>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/drawing' component={Drawing} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default Main;
