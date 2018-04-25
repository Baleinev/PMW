import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from "./mobile/App"
import Display from "./screen/Display"

class Main extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/gif' render={()=><App url='localhost' port={10000} />}/>
                    <Route exact path='/display' render={()=><Display />}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;