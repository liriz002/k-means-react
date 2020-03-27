import React from 'react';
import styles from './Button.css';

const button = (props) => {
    let title = props.title
    let innerHTML;

    if ( props.iconURL ) {
        innerHTML = <div>
                <img className="Icon" src={ props.iconURL } alt="Settings Icon" />
                <span>{ title }</span>
            </div>
    }

    return (
        <button value={props.value} onClick={props.clicked} className={props.className} disabled={props.disabled} style={props.style}>
                { props.iconURL ? innerHTML : title }
        </button>
    );
}

export default button;