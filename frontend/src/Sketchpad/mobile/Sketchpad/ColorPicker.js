import React from 'react';
import {CirclePicker} from 'react-color';

const ColorPicker = ({onColorChange}) => {

  return (
      <div>
        <label>Color</label>
        <CirclePicker width={'100vw'} onChangeComplete={onColorChange}/>
      </div>
  )
};

export default ColorPicker;

