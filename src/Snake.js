import React from 'react';
import './index.css';

export default (props) => {
    return (
        <div>
            {props.snake.map((cube,i)=>{
                const snakeStyle = {
                    left: `${cube[0]}%`,
                    top: `${cube[1]}%`,
                }
                return (
                    <div className='snake' key={i} style={snakeStyle}></div>
                )
            })}
    </div >
    )
} 
