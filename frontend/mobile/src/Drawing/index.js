import React from 'react';
import SketchPad from './SketchPad';
import {TOOL_ELLIPSE} from './tools';
import IO from 'socket.io-client';

const wsClient = IO(`ws://127.0.0.1:2000`);

export default class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_ELLIPSE,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  sendItem = (item) => {
    wsClient.emit('addItem', item);
  };

  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;

    return (
        <div>
          <SketchPad
              width={500}
              height={500}
              animate={true}
              size={size}
              color={color}
              fillColor={fill ? fillColor : ''}
              items={items}
              tool={tool}
              onCompleteItem={this.sendItem}
          />
        </div>
    )
  }
}
