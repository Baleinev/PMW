import React from 'react';
import {Slider, Radio, Row, Col} from 'antd';
import {SliderPicker} from 'react-color';
import SketchPad from './SketchPad';
import {TOOL_ELLIPSE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE} from './tools';
import IO from 'socket.io-client';
import './sketchpad.css';

const config = CONFIG.sketchpad;
const wsClient = IO(`ws://benoit-laptop:2000`);

export default class Home extends React.Component {


  sendItem = (item) => {
    if (item.points) {
      item.points = item.points.map(p => {
        return {
          x: p.x / this.canvas_width,
          y: p.y / this.canvas_height
        };
      })
    } else {
      item.start = {
        x: item.start.x / this.canvas_width,
        y: item.start.y / this.canvas_height
      };
      item.end = {
        x: item.end.x / this.canvas_width,
        y: item.end.y / this.canvas_height
      };

    }
    wsClient.emit('addItem', item);
  };
  handleColorChange = (color) => {
    this.setState({color: color.hex});
  };

  constructor(props) {
    super(props);

    this.canvas_width = window.innerWidth;
    this.canvas_height = this.canvas_width * 0.75;

    this.state = {
      tool: config.default.tool,
      size: config.default.lineWidth,
      color: config.default.color.line,
      fillColor: config.default.color.fill,
      fill: config.default.fill,
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
                  width={`${config.canvas.ratio.width}vw`}
                  height={`${config.canvas.ratio.height}vw`}
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
              <Radio.Group defaultValue={config.default.tool} onChange={(e) => this.setState({tool: e.target.value})}>
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
