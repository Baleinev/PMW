import React, { Component } from 'react';
import Screen from './Screen/Screen'

class Display extends Component {


    render() {
        return (
            <Screen url='localhost' port={10000}/>
        );
    }
}

export default Display;
