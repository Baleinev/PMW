import React from 'react';
import ScreenGrid from './ScreenGrid';
import initSocket from '../socket';

export default class ScreenSelection extends React.Component {

  constructor() {
    super();

    this.state = {
      screensStatus: [
          false, false, false, false, false, false, false, false
      ]
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
    console.log('choose');
    window.socket.emit('reserve', { screenNumber }, (res) => {
      console.log(res);
      this.props.history.push(`/sketchpad/draw/${screenNumber}`);
    })
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
