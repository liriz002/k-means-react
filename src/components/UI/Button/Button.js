import React from 'react';
import styles from './Button.css';

const button = (props) => {
    return (
        <button value={props.value} onClick={props.clicked} className={props.className} disabled={props.disabled} style={props.style}>
            {props.title}
        </button>
    );
}

export default button;