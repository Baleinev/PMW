import React from 'react';
import {CirclePicker} from 'react-color';

const ColorPicker = ({onColorChange}) => {

  return (
      <div>
        <label>Color</label>
        <CirclePicker width={'100vw'} onChangeComplete={onColorChange}/>
          <button className="circular ui icon button">
              <i className="eraser icon"/>
          </button>
      </div>
  )
};

export default ColorPicker;

