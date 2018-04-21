import React from 'react';
import Canvas from '../../Canvas/index';
import IO from 'socket.io-client';
import '../sketchpad.css';

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
      screenNumber: [screenNumber]
    };
  }

  componentWillMount() {
    this.socket = IO("ws://" + network.host + ":" + network.screenPort);
    this.socket.emit('subscribe', {screens: this.state.screenNumber}, (res) => {
      console.log(res);
    });

  }

  componentDidMount() {
    this.socket.on('addShape', (item) => {
      item.size *= config.screen.width;
      if (item.tool === 'pencil') {
        item.points = item.points.map(this.toAbsolutePosition)
      } else {
        item.start = this.toAbsolutePosition(item.start)
        item.end = this.toAbsolutePosition(item.end)
      }

      this.setState({items: this.state.items.concat([item])})
    });
  }

  render() {

    const {width, height} = this.state;
    return (
        <div>
          <Canvas
              width={width}
              height={height}
              animate={true}
              canvasClassName='canvas-screen'
              items={this.state.items}
          />
        </div>
    )
  }
}
