import React from 'react';
import ToolSelector from './ToolSelector';
import SizeSelector from './SizeSelector';
import ColorPicker from './ColorPicker';
import {Button} from 'semantic-ui-react';
import Canvas from '../../Canvas/index';
import './sketchpad.css';
import CONFIG from '../../../../config/default'

const config = CONFIG.sketchpad;

export default class Home extends React.Component {

    constructor({props, match}) {
    super(props);


    this.state = {
      tool: config.default.tool,
      size: config.default.lineWidth,
      color: config.default.color.line,
      fillColor: config.default.color.fill,
      fill: config.default.fill,
      items: []
    };

    this.screenNumber = match.params.screenNumber;
    this.width = window.innerWidth;
    this.height = this.width / config.canvas.ratio;
  }

  componentDidMount() {
    if (!window.socket) {
      this.props.history.push('/');
    }
      this.AFK_detection = setTimeout(() => {
          window.socket.close()
          delete window.socket
          alert("Vous avez été déconnecté en raison d'une inactivité prolongée.")
          this.props.history.push('/sketchpad')
      },15000)
  }

    componentWillUnmount(){
        clearTimeout(this.AFK_detection)
    }

  handleColorChange = (color) => {
    this.setState({color: color.hex});
  };

  handleToolChange = (event, props) => {
    this.setState({tool: props.tool});
  };

  handleSizeChange = (size) => {
    this.setState({size})
  };

  finishSketch = () => {
    window.socket.emit('terminate')
    this.props.history.push('/');
  }

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

    window.socket.emit('addShape', item, { screenNumber: this.screenNumber }, (res) => {
      console.log(res);
    });

    clearTimeout(this.AFK_detection);

    this.AFK_detection = setTimeout(() => {
          window.socket.close()
          delete window.socket
          alert("Vous avez été déconnecté en raison d'une inactivité prolongée.")
          this.props.history.push('/sketchpad')
      },15000)
  };

  render() {
    return (
        <div>
          <Canvas
              onCompleteItem={this.sendItem}
              canvasClassName='canvas-sketchpad'
              items={this.state.items}
              color={this.state.color}
              size={this.state.size}
              tool={this.state.tool}
              width={this.width}
              height={this.height}
          />

          <ToolSelector handleToolChange={this.handleToolChange}/>
          <SizeSelector onSizeChange={this.handleSizeChange}/>


          <div style={{marginLeft:'25px', marginTop:'10px'}}>
              <ColorPicker onColorChange={this.handleColorChange}/>
          </div>

            <div style={{marginTop:'20px', marginLeft:'150px'}}>
          <Button onClick={this.finishSketch} >
              Fini !
          </Button>
          </div>

        </div>
    )
  }
}
