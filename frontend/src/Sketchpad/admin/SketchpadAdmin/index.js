import React from 'react';
import initSocket from '../socket';
import _ from 'lodash';
import ReactSignupLoginComponent from 'react-signup-login-component';

const config = CONFIG.sketchpad;

export default class SketchpadAdmin extends React.Component {

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

  signupWasClickedCallback = (data) => {
    console.log(data);
    alert('Signup callback, see log on the console to see the data.');
  };
  loginWasClickedCallback = (data) => {
    console.log(data)
    window.socket.emit('login', { data }, (res) => {
      console.log(res);
      this.props.history.push({
        pathname: `/sketchpad`,
        search: `admin`,
        state: {admin : true}
      })
    })
  };
  recoverPasswordWasClickedCallback = (data) => {
    console.log(data);
    alert('Recover password callback, see log on the console to see the data.');
  };


  render() {
    return (
        <div>
          <ReactSignupLoginComponent
            title="My awesome company"
            handleSignup={this.signupWasClickedCallback}
            handleLogin={this.loginWasClickedCallback}
            handleRecoverPassword={this.recoverPasswordWasClickedCallback}/>
         </div>
    )
  }
}
