import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import initSocket from './Sketchpad/mobile/socket';

import Home from './Home';
import SketchpadMobile from './Sketchpad/mobile/Sketchpad/index';
import SketchpadScreen from './Sketchpad/screen';
import ScreenSelection from './Sketchpad/mobile/ScreenSelection/index';
import SketchpadAdmin from './Sketchpad/admin/SketchpadAdmin/index';

//const Socket = React.createContext(initSocket());

class Main extends Component {

  constructor() {
    super();
  }

  render() {
    return (
        <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/sketchpad/draw/:screenNumber([0-7])' component={SketchpadMobile} />
              <Route exact path='/sketchpad/screen' component={SketchpadScreen} />
              <Route exact path='/sketchpad' component={ScreenSelection}/>
              <Route exact path='/sketchpad/admin' component={SketchpadAdmin} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default Main;
