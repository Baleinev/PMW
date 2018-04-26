import React from 'react';
import { Link} from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return (
        <div>
          <Link to='/sketchpad/draw/1'>Drawing app</Link>
          <Link to='/sketchpad'>Screen choice</Link>
        </div>
    )
  }
}