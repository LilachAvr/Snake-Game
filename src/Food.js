import React from 'react';

export default (props)=>{

     const foodStyle = {
        left: `${props.apple[0]}%`,
        top: `${props.apple[1]}%`,
    }
    return(
        <div className='apple' style={foodStyle}></div>
    )
    

}