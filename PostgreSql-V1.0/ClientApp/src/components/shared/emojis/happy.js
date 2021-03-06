import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./emojis.css";

class EmojiHappy extends Component{


    render() {
        return (

            <span className="happy">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                    <path className="st8" d="M50,100c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50S22.4,100,50,100z M50,9.4c22.4,0,40.6,18.2,40.6,40.6 S72.4,90.6,50,90.6S9.4,72.4,9.4,50S27.6,9.4,50,9.4z M50,58.5c11.3,0,22.1-3,31.3-8.3c-1.4,17.4-15,31.1-31.3,31.1 S20.2,67.6,18.8,50.2C27.9,55.5,38.7,58.5,50,58.5z M25,34.4c0-5.2,2.8-9.4,6.3-9.4s6.3,4.2,6.3,9.4s-2.8,9.4-6.3,9.4 S25,39.5,25,34.4z M62.5,34.4c0-5.2,2.8-9.4,6.3-9.4s6.3,4.2,6.3,9.4s-2.8,9.4-6.3,9.4S62.5,39.5,62.5,34.4z"/>
                </svg>
            </span>
        );
    }
}

export default connect()(EmojiHappy);