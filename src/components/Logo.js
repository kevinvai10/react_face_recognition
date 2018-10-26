import React from 'react';
import 'tachyons';
import './Logo.css';
import guitar from './guitar.png';
import Tilt from 'react-tilt';

const Logo = () => {
    return(
        <div className='ma4 mt'>
           <Tilt className="Tilt br2 shadow-2 " options={{ max : 45 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt='logo' src={guitar} /></div>
           </Tilt>
        </div>
    );
}

export default Logo;