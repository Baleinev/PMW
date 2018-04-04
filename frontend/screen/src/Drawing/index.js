import React from 'react';
import SketchPad from './SketchPad';
import IO from 'socket.io-client';
import './sketchpad.css';

const wsClient = IO(`ws://benoit-laptop:2000`);

export default class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      width: 1024,
      height: 768,
      items: []
    }
  }

  componentDidMount() {
    wsClient.on('addItem', item => {
      if (item.tool === 'pencil') {
        item.points = item.points.map(p => {
          return {
            x: p.x * this.state.width,
            y: p.y * this.state.height
          };
        })
      }
      console.log(item.points);
      this.setState({items: this.state.items.concat([item])})
    });
  }

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;

    return (
        <div>
          <SketchPad
              width={1024}
              height={768}
              animate={true}
              size={size}
              color={color}
              fillColor={fill ? fillColor : ''}
              items={items}
              tool={tool}
              canvasClassName='canvas-sketchpad'
          />
        </div>
    )
  }
}
