import React from 'react';
import {Slider, Radio, Row, Col} from 'antd';
import {SliderPicker} from 'react-color';
import Canvas from '../Canvas/index';
import {TOOL_ELLIPSE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE} from '../Canvas/tools/index';
import IO from 'socket.io-client';
import './sketchpad.css';

const config = CONFIG.sketchpad;
const wsClient = IO(`ws://benoit-laptop:2000`);

export default class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      tool: TOOL_PENCIL,
      size: config.default.lineWidth,
      color: config.default.color.line,
      fillColor: config.default.color.fill,
      fill: config.default.fill,
      items: []
    };

    this.width = window.innerWidth;
    this.height = this.width / config.canvas.ratio;
  }

  handleColorChange = (color) => {
    this.setState({color: color.hex});
  };

  handleToolChange = (tool) => {
    this.setState({tool: tool});
  };

  toRelativePosition = (p) => {
    return {
      x: p.x / this.width,
      y: p.y / this.height
    }

  };

  sendItem = (item) => {
    item.size /= this.width;
    if (item.points) {
      item.points = item.points.map(this.toRelativePosition)
    } else {
      item.start = this.toRelativePosition(item.start);
      item.end = this.toRelativePosition(item.end);
    }
    wsClient.emit('addItem', item);
  };


  render() {

    return (
        <div>
          <Row>
            <Col>
              <Canvas
                  onCompleteItem={this.sendItem}
                  canvasClassName='canvas-sketchpad'
                  height={config.canvas.width}
                  width={config.canvas.height}
                  items={this.state.items}
                  color={this.state.color}
                  size={this.state.size}
                  tool={this.state.tool}
                  width={this.width}
                  height={this.height}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Radio.Group defaultValue={config.default.tool} onChange={e => this.handleToolChange(e.target.value)}>
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
                  min={config.lineWidth.min}
                  max={config.lineWidth.max}
                  defaultValue={config.default.lineWidth}
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
