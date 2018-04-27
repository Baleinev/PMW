import React from 'react';
import SketchpadTour from './SketchpadTour';
import './sketchpad.css';

export default class Home extends React.Component {

  render() {

    return (
      <SketchpadTour location={this.props.location}/>
    )
  }
}
