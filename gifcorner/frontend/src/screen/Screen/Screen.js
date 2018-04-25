import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import io from 'socket.io-client'
import './styles.css'

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs : []
        };

        this.socket = io('ws://'+props.url+':'+props.port)

    }


    componentDidMount(){
        this.socket.on('gifcorner',(url) => {
            this.state.gifs.push(url)
            this.setState({gifs:this.state.gifs})
        })
    }

    render() {
        return (
            <div className="ui grid">
                {this.state.gifs.map((url) =>(
                    <div key={url} className="wide column">
                        <img className="gif" src={url}></img>
                    </div>
                ))}
            </div>
        );
    }
}

export default Screen;