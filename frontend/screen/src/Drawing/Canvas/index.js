import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE } from './tools/index'

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse
};

export default class Canvas extends Component {

  tool = null;

  static defaultProps = {
    tool: TOOL_PENCIL,
    toolsMap
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.initTool(this.props.tool);
  }

  componentWillReceiveProps({tool, items}) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  initTool = (tool) => {
    this.tool = this.props.toolsMap[tool](this.ctx);
  };

  render() {
    const {width, height, canvasClassName} = this.props;
    return (
      <canvas
        ref={(canvas) => { this.canvasRef = canvas; }}
        className={canvasClassName}
        width={width}
        height={height}
      />
    )
  }
}
