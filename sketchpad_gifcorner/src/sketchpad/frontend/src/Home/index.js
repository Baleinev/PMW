import React from 'react';
import { Link} from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return (
        <div style={{
        	display:'table-cell',
			textAlign:'center',
			width:'100vw',
			height:'100vh',
			verticalAlign:'middle'
		}}>
          <Link to='/sketchpad'>
			  <button style={{marginBottom:'15px'}} className="positive massive ui button">Sketchpad</button>
		  </Link>
          <Link to='/gifcorner/gif'>
			  <button style={{marginTop:'15px'}} className="negative massive ui button">GifCorner</button>
		  </Link>
        </div>
    )
  }
}