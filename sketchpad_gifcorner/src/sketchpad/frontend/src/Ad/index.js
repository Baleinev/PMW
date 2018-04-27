import React from 'react';

import style from './styles.css'

const makeStyle = (image) => {
    return {
        "backgroundImage": "url(/"+image+")",
        "backgroundRepeat":"no-repeat",
        "backgroundPosition":"center",
        "backgroundColor":"black",
        "backgroundSize":"contain",
        "height":"768px",
        "width":"814px"
    }
}

const Ad = ({image}) => (

     <div className={style.ad_container} style={makeStyle(image)}>
    </div>
);

export default Ad;
