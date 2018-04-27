import React from 'react';
import Canvas from '../../Canvas/index';
import '../sketchpad.css';
import Ad from "../../../Ad/index";
import CONFIG from '../../../../config/default';

const config = CONFIG.sketchpad;


export default class SketchpadScreen extends React.Component {

  tool = null;
  toAbsolutePosition = (p) => {
    return {
      x: p.x * this.state.width,
      y: p.y * this.state.height
    }
  };

  constructor({screenNumber}) {
    super();

    this.state = {
      width: config.screen.width,
      height: config.screen.height,
      items: [],
      screenNumber: screenNumber,
      displayedAd:null
    };

  }

  componentDidMount() {

    // Listening for new drawing orders
    this.props.socket.on('addShape', (item, {screenNumber}) => {
      
      if(screenNumber === this.state.screenNumber) {

		  this.setState({displayedAd:null})

		  item.size *= config.screen.width;

		  console.log(config.screen.width)
		  if (item.tool === 'pencil') {
			  item.points = item.points.map(this.toAbsolutePosition)
		  } else {
			  item.start = this.toAbsolutePosition(item.start)
			  item.end = this.toAbsolutePosition(item.end)
		  }

		  this.setState({items: this.state.items.concat([item])})
      }

    });

    this.props.socket.on('ad', (ad) => {
      this.setState({displayedAd:ad})
    })

    this.props.socket.on('clear',({screenNumber}) => {

		if(screenNumber == this.state.screenNumber) {
			this.canvas = document.getElementById('canvas-' + this.state.screenNumber)
			if (this.canvas !== null) {
				this.ctx = this.canvas.getContext('2d');
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			}
		}
    })

  }

  render() {
    const {width, height} = this.state;
    if (this.state.displayedAd === null){
        return (
            <div>
                <Canvas
                    screenNumber={this.state.screenNumber}
                    width={width}
                    height={height}
                    animate={true}
                    canvasClassName='canvas-screen'
                    items={this.state.items}
                />
            </div>)
    } else {
        return(
          <Ad image={this.state.displayedAd.res}/>
        )
    }


  }
}
