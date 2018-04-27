import React from 'react';
import Canvas from '../../Canvas/index';
import IO from 'socket.io-client';
import '../sketchpad.css';
import Ad from "../../../Ad/index";

const config = CONFIG.sketchpad;
const network = CONFIG.network;


export default class SketchpadScreen extends React.Component {

  tool = null;
  toAbsolutePosition = (p) => {
    return {
      x: p.x * this.state.width,
      y: p.y * this.state.height
    }
  };

  constructor({screenNumber}) {
    super();

    this.state = {
      width: config.screen.width,
      height: config.screen.height,
      items: [],
      screenNumber: [screenNumber],
      displayedAd:null
    };

  }

  componentWillMount() {
    this.socket = IO("ws://" + network.host + ":" + network.screenPort);
    this.socket.emit('subscribe', {screens: this.state.screenNumber}, (res) => {
      console.log(res);
    });

  }

  componentDidMount() {

    // Listening for new drawing orders
    this.socket.on('addShape', (item) => {

      this.setState({displayedAd:null})

      item.size *= config.screen.width;
      if (item.tool === 'pencil') {
        item.points = item.points.map(this.toAbsolutePosition)
      } else {
        item.start = this.toAbsolutePosition(item.start)
        item.end = this.toAbsolutePosition(item.end)
      }

      this.setState({items: this.state.items.concat([item])})

    });

    this.socket.on('ad', (ad) => {
      this.setState({displayedAd:ad})
    })

    this.socket.on('clear',() => {
        this.canvas = document.getElementById('canvas-'+this.state.screenNumber)
        if(this.canvas !== null){
            this.ctx = this.canvas.getContext('2d');
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        }
    })

  }

  render() {
    const {width, height} = this.state;
    if (this.state.displayedAd === null){
        return (
            <div>
                <Canvas
                    screenNumber={this.state.screenNumber}
                    width={width}
                    height={height}
                    animate={true}
                    canvasClassName='canvas-screen'
                    items={this.state.items}
                />
            </div>)
    } else {
        return(
          <Ad image={this.state.displayedAd.res}/>
        )
    }


  }
}
