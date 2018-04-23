import React from 'react';
import {Grid} from 'semantic-ui-react';
import '../sketchpad.css';
import SketchpadScreen from '../SketchpadScreen';

const config = CONFIG.sketchpad;
const screenNumber = CONFIG.screen.numbers

export default class SketchpadTour extends React.Component {

  render() {

    return (
        <div>
          <Grid columns={2}>
            {Array.apply(null, {length: screenNumber}).map(Number.call, Number).map(i => (
                <Grid.Column key={i} >
                  <SketchpadScreen screenNumber={i}/>
                </Grid.Column>
            ))}
          </Grid>
        </div>
    )
  }
}
