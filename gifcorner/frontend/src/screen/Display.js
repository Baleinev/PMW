import React, { Component } from 'react';
import Screen from './Screen/Screen'
import io from 'socket.io-client'


class Display extends Component {

    constructor(props){
        super(props)
        this.socket = io('ws://'+props.url+':'+props.port)
        this.myRefs = []

        for(var i = 0;i<props.number;i++)
            this.myRefs.push(React.createRef())
    }

    componentDidMount(){
        this.socket.on('gifcorner',(data) => {
            this.myRefs[data.screen].current.addGif(data.url)
        })

    }

    render() {
        return (
            this.myRefs.map((ref,index) => <Screen ref={ref} key={index}/>)
        );
    }
}

export default Display;
