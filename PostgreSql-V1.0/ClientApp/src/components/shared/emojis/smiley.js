import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./emojis.css";

export class EmojiSmiley extends Component{


render() {
        return (

            <span className="happy">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                    <path className="st9" d="M50,100c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50S22.4,100,50,100z M50,9.4c22.4,0,40.6,18.2,40.6,40.6 S72.4,90.6,50,90.6S9.4,72.4,9.4,50S27.6,9.4,50,9.4z M25,31.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3 S25,34.7,25,31.3z M62.5,31.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3S62.5,34.7,62.5,31.3z M68.8,61.3l8,4.8 C71.3,75.2,61.4,81.3,50,81.3s-21.3-6.1-26.8-15.2l8-4.8C35.1,67.6,42,71.9,50,71.9S64.9,67.6,68.8,61.3z"/>
                </svg>
            </span>
        );
    }
}


export default connect()(EmojiSmiley);