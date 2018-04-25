import React from 'react';

import './travys.jpg';

const Ad = ({image}) => (
    <div style={{
      height: "1024px",
      width: "728px"
    }}>
      <img src={`/${image}.jpg`} alt={image} />
    </div>
);

export default Ad;