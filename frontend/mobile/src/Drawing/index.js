import React from 'react';
import {Slider, Radio, Row, Col} from 'antd';
import {SliderPicker} from 'react-color';
import SketchPad from './SketchPad';
import {TOOL_ELLIPSE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE} from './tools';
import IO from 'socket.io-client';
import './sketchpad.css';

const wsClient = IO(`ws://127.0.0.1:2000`);

export default class Home extends React.Component {

  sendItem = (item) => {
    wsClient.emit('addItem', item);
  };
  handleColorChange = (color) => {
    this.setState({color: color.hex});
  };

  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  render() {
    const {tool, size, color, fill, fillColor, items} = this.state;

    return (
        <div>
          <Row>
            <Col>
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
                  canvasClassName='canvas-sketchpad'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Radio.Group defaultValue={TOOL_PENCIL} onChange={(e) => this.setState({tool: e.target.value})}>
                <Radio.Button default value={TOOL_PENCIL}>pencil</Radio.Button>
                <Radio.Button value={TOOL_LINE}>line</Radio.Button>
                <Radio.Button value={TOOL_ELLIPSE}>ellipse</Radio.Button>
                <Radio.Button value={TOOL_RECTANGLE}>rectangle</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Line width</label>
              <Slider
                  min={1}
                  max={10}
                  defaultValue={2}
                  onChange={(e) => this.setState({size: e})}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Color</label>
              <SliderPicker
                  color="#333"
                  onChangeComplete={this.handleColorChange}
              />
            </Col>
          </Row>
        </div>
    )
  }
}
