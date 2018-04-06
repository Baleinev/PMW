import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Home';
import SketchpadMobile from './Sketchpad/mobile/index';
import SketchpadScreen from './Sketchpad/screen/index';

class Main extends Component {
  render() {
    return (
        <BrowserRouter>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/drawing/mobile' component={SketchpadMobile} />
            <Route exact path='/drawing/screen' component={SketchpadScreen} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default Main;
