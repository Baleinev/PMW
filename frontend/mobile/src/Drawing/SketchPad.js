import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE } from './tools'

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse
};

export default class SketchPad extends Component {

  tool = null;
  interval = null;

  static defaultProps = {
    width: 300,
    height: 300,
    color: '#000',
    size: 5,
    fillColor: '',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap
  };

  constructor(props) {
    super(props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouch = this.onTouch.bind(this);
    this.onTouchEndCapture = this.onTouchEndCapture.bind(this);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    var width = window.innerWidth;
    var height = width * 0.75;
    this.canvas.setAttribute('width', `${width}px`);
    this.canvas.setAttribute('height', `${height}px`);
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

  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  onMouseDown(e) {
    this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
  }

  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove(e) {
    this.tool.onMouseMove(...this.getCursorPosition(e));
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    //console.log(data);
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
  }

  onTouch(e, mouseAction) {
    if (e.targetTouches.length === 1) {
      mouseAction(e.targetTouches[0]);
    }
  }

  onTouchEndCapture(e) {
    var data = this.tool.onMouseUp(...this.getTouchPosition(e));
    console.log(data);
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
  }

  getTouchPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    var pos = e.changedTouches[0];
    return [
        pos.clientX - left,
        pos.clientY - top
    ]
  }

  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  render() {
    const {height, width, canvasClassName} = this.props;
    return (
      <canvas
        ref={(canvas) => { this.canvasRef = canvas; }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        onTouchStartCapture={(e) => this.onTouch(e, this.onMouseDown)}
        onTouchMoveCapture={(e) => this.onTouch(e, this.onMouseMove)}
        onTouchEndCapture={this.onTouchEndCapture}
        onTouchCancelCapture={(e) => this.onTouch(e, this.onMouseUp)}
        width={width}
        height={height}
      />
    )
  }
}
