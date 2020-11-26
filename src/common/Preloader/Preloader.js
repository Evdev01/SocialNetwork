import React from 'react';
import preloader from "../Preloader/preloader.gif";

let Preloader = () => {
    return <div>
        <img src={preloader} alt={'Loading...'}/>
    </div>
}

export default Preloader;