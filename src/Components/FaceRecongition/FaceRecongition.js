import React from 'react';
import './FaceRecongition.css';

const FaceRecongition = ({box, imageurl}) => {
	return(
       <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputimage' alt='' src={imageurl} width='500px' height='auto' />
          { box.map((item,index) => (
          <div className='bounding_box' style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol }} key={index}></div>
          ))}
        </div>  
       </div>
	);
}

export default FaceRecongition;