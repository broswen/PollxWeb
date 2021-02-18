import React from 'react';
import './Button.css';


const Button = (props) => {

    return (
        <div className="Button" onClick={props.click}>
            <div>{props.children}</div>
        </div>
    );
}

export default Button;