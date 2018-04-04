import React from 'react';
import SketchPad from './SketchPad';
import IO from 'socket.io-client';
import './sketchpad.css';

const wsClient = IO(`ws://127.0.0.1:2000`);

export default class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    wsClient.on('addItem', item => {
      console.log("received item");
      this.setState({items: this.state.items.concat([item])})
    });
  }

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;

    return (
        <div>
          <SketchPad
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
