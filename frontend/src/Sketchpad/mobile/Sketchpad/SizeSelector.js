import React from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import './styles.css'

const SizeSelector = ({onSizeChange}) => {
  return (
      <div>
        Taille<br/>
        <Slider className="PMWSlider"
                min={1} max={15} defaultValue={5} onAfterChange={onSizeChange}/>
      </div>
  )
};

export default SizeSelector;
