import React, { Component } from 'react';
import GiphySelect from 'react-giphy-select';
import io from 'socket.io-client'

import './style/App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.socket = io('http://'+props.url+':'+props.port)
    }

    sendGIF(gif){
        this.socket.emit('gifcorner',gif.embed_url)
    }

    render() {
        return (
            <div className="container">
                <GiphySelect requestLang="fr" onEntrySelect={this.sendGIF}/>
            </div>

        );
    }
}

export default App;
