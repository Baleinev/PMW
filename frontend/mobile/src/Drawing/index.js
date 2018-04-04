import React from 'react';
import {Slider, Radio, Row, Col} from 'antd';
import {SliderPicker} from 'react-color';
import SketchPad from './SketchPad';
import {TOOL_ELLIPSE, TOOL_LINE, TOOL_PENCIL, TOOL_RECTANGLE} from './tools';
import IO from 'socket.io-client';
import './sketchpad.css';

const wsClient = IO(`ws://benoit-laptop:2000`);

export default class Home extends React.Component {


  constructor(props) {
    super(props);

    this.canvas_width = window.innerWidth;
    this.canvas_height = this.canvas_width * 0.75;

    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

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

  render() {
    const {tool, size, color, fill, fillColor, items} = this.state;

    return (
        <div>
          <Row>
            <Col>
              <div style={{float: 'left', marginRight: 20}}>
                <SketchPad
                    width={'100vw'}
                    height={'75vw'}
                    animate={true}
                    size={size}
                    color={color}
                    fillColor={fill ? fillColor : ''}
                    items={items}
                    tool={tool}
                    onCompleteItem={this.sendItem}
                    canvasClassName='canvas-sketchpad'
                />
              </div>
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
