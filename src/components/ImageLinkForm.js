import React from 'react';
import 'tachyons'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
           <p className= 'f3'>
            {'This magic brain will detect faces in your pictures'}
           </p>
           <div className='center'>
              <div className='center pa4 br3 shadow-5'>
              <input className='fa4 pa2 w-70 center' type='text' onChange={onInputChange}/>
               <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
              </div>
           </div>
        </div>
    );
}

export default ImageLinkForm;