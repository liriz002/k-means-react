import React from 'react';
import styles from './Button.css';

const button = (props) => {
    return (
        <button onClick={props.clicked} className={props.class}>
            {props.title}
        </button>
    );
}

export default button;