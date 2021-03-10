import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./emojis.css";

class EmojiSad extends Component {


    render() {
        return (
            <span className="sad">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                    <path className="st11" d="M50,100c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50S22.4,100,50,100z M50,9.4c22.4,0,40.6,18.2,40.6,40.6 S72.4,90.6,50,90.6S9.4,72.4,9.4,50S27.6,9.4,50,9.4z M25,31.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3 S25,34.7,25,31.3z M62.5,31.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3s-2.8,6.3-6.3,6.3S62.5,34.7,62.5,31.3z M31.2,76.2l-8-4.8 c5.5-9.1,15.4-15.2,26.8-15.2s21.3,6.1,26.8,15.2l-8,4.8C64.9,69.9,58,65.6,50,65.6S35.1,69.9,31.2,76.2z"/>
                </svg>
            </span>
        );
    }
}


export default connect()(EmojiSad);