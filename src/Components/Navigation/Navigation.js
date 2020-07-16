import React from 'react';

const Navigation = ({onRouteChange, isSignedin}) => {
	if(isSignedin){
	 return(
	     <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	       <div className="flex-grow grow flex items-center"> 
	         <p  onClick={() => onRouteChange('signout')} className='f5 dib white bg-black mr1 mr4-ns pv2 ph2 br-pill pointer' >Sign Out</p>
	       </div> 
	     </nav>
	   );
     }
     else{
       return(
	    <nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
	      <div className="flex-grow flex items-center"> 
	       <p  onClick={() => onRouteChange('signin')} className='f5 grow dib white bg-black mr1 mr4-ns pv2 ph2 br-pill pointer' >Sign In</p>
	       <p  onClick={() => onRouteChange('register')} className='f5 grow dib white bg-black mr1 mr4-ns pv2 ph2 br-pill pointer' >Register</p>
	      </div>
	     </nav>
	   );	
     }
}

export default Navigation;