import React from 'react';
import Canvas from '../Canvas/index';
import IO from 'socket.io-client';
import './sketchpad.css';

const config = CONFIG.sketchpad;
const wsClient = IO(`ws://benoit-laptop:2000`);

export default class Home extends React.Component {

  tool = null;

  constructor(props) {
    super(props);

    this.state = {
      width: config.screen.width,
      height: config.screen.height,
      items: []
    };
  }

  componentDidMount() {
    wsClient.on('addItem', item => {

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

  toAbsolutePosition = (p) => {
    return {
      x: p.x * this.state.width,
      y: p.y * this.state.height
    }
  };

  render() {

    const {width, height} = this.state;
    return (
        <div>
          <Canvas
              width={width}
              height={height}
              animate={true}
              canvasClassName='canvas-sketchpad'
              items={this.state.items}
          />
        </div>
    )
  }
}
