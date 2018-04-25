import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
const io = require('socket.io');

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs : []
        }
        this.socket = io(props.port)
    }


    componentDidMount(){
        this.socket.on('connection', function (socket) {

            socket.on('gifcorner',(url) => {
                this.state.gifs.push(url)
                this.setState({gifs:this.state.gifs})
            })
        });
    }

    render() {
        return (
            <div className="ui grid">
                {this.state.gifs.map((url) =>(
                    <div className="wide column">
                        <img src={url} alt=''></img>
                    </div>
                ))}
            </div>
        );
    }
}

export default Screen;
