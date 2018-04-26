import React from 'react';

import style from './styles.css'

const makeStyle = (image) => {
    return {
        "background": "url(/"+{image}+") no-repeat",
        "backgroundSize":"cover"
    }
}

const Ad = ({image}) => (

     <div className={style.ad_container} style={makeStyle(image)}>
    </div>
);

export default Ad;
