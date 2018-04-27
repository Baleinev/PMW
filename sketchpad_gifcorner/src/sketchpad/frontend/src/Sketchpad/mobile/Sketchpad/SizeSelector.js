import React from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import './styles.css'

const SizeSelector = ({onSizeChange}) => {
  return (
      <div>
          <div style={{fontSize:'21px', marginBottom:'10px', marginTop:'15px', marginLeft:'25px'}}>
              Taille
          </div>

        <Slider className="PMWSlider"
                min={1} max={15} defaultValue={5} onAfterChange={onSizeChange}
                handleStyle={{
                    borderColor: 'light-blue',
                    height: 20,
                    width: 20,
                    marginTop: -8
                }}/>
      </div>
  )
};

export default SizeSelector;
