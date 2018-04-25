import React, { Component } from 'react';
import Screen from './Screen/Screen'

const config = require('../config')

class Display extends Component {


    render() {
        return (
            <Screen url={config.host} port={config.screenPort}/>
        );
    }
}

export default Display;
