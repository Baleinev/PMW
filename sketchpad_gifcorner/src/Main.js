import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './sketchpad/frontend/src/Home/index';
import SketchpadMobile from './sketchpad/frontend/src/Sketchpad/mobile/Sketchpad/index';
import SketchpadScreen from './sketchpad/frontend/src/Sketchpad/screen/index';
import ScreenSelection from './sketchpad/frontend/src/Sketchpad/mobile/ScreenSelection/index';
import SketchpadAdmin from './sketchpad/frontend/src/Sketchpad/admin/SketchpadAdmin/index';
import App from "./gifcorner/frontend/src/mobile/App"
import Display from "./gifcorner/frontend/src/screen/Display"
import config from "./gifcorner/frontend/src/config"

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
              <Route exact path='/gifcorner/gif' render={()=><App url={config.host} port={config.appPort} />}/>
              <Route exact path='/gifcorner/display' render={()=><Display number={config.screens} url={config.host} port={config.screenPort}/>}/>
            </Switch>
        </BrowserRouter>
    );
  }
}

export default Main;
