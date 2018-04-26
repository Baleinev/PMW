import React from 'react';

import './screenSelection.css';

const getStateClass = (isFree) => isFree ? 'free' : 'occupied';

const ScreenBox = ({isFree, number, onClick}) => (
  <div onClick={onClick} className={`screen-box ${getStateClass(isFree)}`}>
       {isFree ? 'Disponible' : 'Occupé'}
  </div>
);

export default ScreenBox;