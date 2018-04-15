import React from 'react';
import ScreenGrid from './ScreenGrid';
import initSocket from '../socket';
import _ from 'lodash';

export default class ScreenSelection extends React.Component {

  constructor() {
    super();

    this.state = {
      screensStatus: _.fill(Array(8), false)
    };

  }

  componentWillMount() {
    window.socket = initSocket();
  }

  componentDidMount() {
    window.socket.emit('state', (status) => {
      this.setState({
        screensStatus: status
      })
    });

  }

  handleChooseScreen = (screenNumber) => {
    if (this.state.screensStatus[screenNumber]) {
      window.socket.emit('reserve', { screenNumber }, (res) => {
        console.log(res);
        this.props.history.push(`/sketchpad/draw/${screenNumber}`);
      })
    } else {
      //TODO: afficher popup screen occupé
      console.log("occupé!")
    }
  };

  render() {
    return (
        <div>
          <h1>Choisissez un écran</h1>
          <ScreenGrid
              screensStatus={this.state.screensStatus}
              onChooseScreen={this.handleChooseScreen}
          />
        </div>
    )
  }
}
