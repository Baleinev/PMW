import React from 'react';
import {Grid} from 'semantic-ui-react';
import '../sketchpad.css';
import SketchpadScreen from '../SketchpadScreen';
import qs from 'query-string';
import CONFIG from '../../../../config/default'
import IO from "socket.io-client"

const config = CONFIG.sketchpad;
const network = CONFIG.network;

export default class SketchpadTour extends React.Component {

	constructor(props){
		super(props);
		this.socket = IO("ws://" + network.host + ":" + network.screenPort);
	}
	componentWillMount() {
		this.screens = qs.parse(this.props.location.search).screens.split(',')

		this.socket.emit('subscribe', {screens: this.screens.map(s => parseInt(s))}, (res) => {
			console.log(res);
		});
	}

  render() {
    return (
        <div>
          <Grid columns={2}>
            {Array.apply(null, {length: this.screens.length}).map(Number.call, Number).map(i => (
                <Grid.Column key={i} >
                  <SketchpadScreen socket={this.socket} screenNumber={this.screens[i]}/>
                </Grid.Column>
            ))}
          </Grid>
        </div>
    )
  }
}
