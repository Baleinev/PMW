import React from 'react';
import ScreenGrid from './ScreenGrid';
import initSocket from '../socket';
import _ from 'lodash';
import './screenSelection.css'
const config = CONFIG.sketchpad;

export default class ScreenSelection extends React.Component {

  constructor() {
    super();

    this.state = {
      screensStatus: _.fill(Array(config.screen.numbers), false)
    };

  }

  componentWillMount() {
    if(window.socket)
      window.socket.close()

    window.socket = initSocket();
  }

  componentDidMount() {
    this.check = setInterval(() => {
        window.socket.emit('state', (status) => {
            this.setState({
                screensStatus: status
            })
        });
    },200)
  }

  componentWillUnmount(){
    clearInterval(this.check)
  }

  handleChooseScreen = (screenNumber) => {
    if (this.state.screensStatus[screenNumber]) {
      window.socket.emit('reserve', { screenNumber }, (res) => {
        console.log(res);
        this.props.history.push(`/sketchpad/draw/${screenNumber}`);
      })
    } else {
      alert("Ecran occupé!")
    }
  };

  render() {
    return (
        <div>
          <ScreenGrid
              screensStatus={this.state.screensStatus}
              onChooseScreen={this.handleChooseScreen}
          />
        </div>
    )
  }
}
