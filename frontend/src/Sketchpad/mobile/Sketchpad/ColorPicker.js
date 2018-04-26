import React from 'react';
import {CirclePicker} from 'react-color';

const ColorPicker = ({onColorChange}) => {

  return (
      <div>
          <div style={{fontSize:'21px', marginBottom:'15px'}}>
              Couleur
          </div>
        <CirclePicker width={'100vw'} onChangeComplete={onColorChange}/>
      </div>
  )
};

export default ColorPicker;

