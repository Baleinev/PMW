import React from 'react';
import {Grid} from 'semantic-ui-react';
import '../sketchpad.css';
import SketchpadScreen from '../SketchpadScreen';

const config = CONFIG.sketchpad;

export default class SketchpadTour extends React.Component {

  render() {

    return (
        <div>
          <Grid columns={2}>
            {Array.apply(null, {length: 8}).map(Number.call, Number).map(i => (
                <Grid.Column key={i} >
                  <SketchpadScreen screenNumber={i}/>
                </Grid.Column>
            ))}
          </Grid>
        </div>
    )
  }
}
