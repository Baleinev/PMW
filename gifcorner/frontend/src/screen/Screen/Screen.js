import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css'

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gifs : []
        };
    }

    addGif = (url) => {
        this.state.gifs.unshift(url)
        if(this.state.gifs.length > 100){
            const arr = this.state.gifs.splice(0)
            arr.pop()
            this.setState({gifs:arr})
        }

        this.setState({gifs:this.state.gifs})
    }

    render() {
        return (
            <div className="gif_container">
                {this.state.gifs.map((url,index) =>(
                    <img key={index}  alt="nice gif" className="gif" src={url}></img>
                ))}
            </div>
        );
    }
}

export default Screen;