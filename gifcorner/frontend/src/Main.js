import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from "./mobile/App"
import Display from "./screen/Display"

const config = require('./config')

class Main extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/gif' render={()=><App url={config.host} port={config.appPort} />}/>
                    <Route exact path='/display' render={()=><Display number={config.screens} url={config.host} port={config.screenPort}/>}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;