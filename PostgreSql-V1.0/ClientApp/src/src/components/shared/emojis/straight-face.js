import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./emojis.css";

class EmojiStraightFace extends Component{
    render() {
        return (

            <span className="neutral">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
                    <path className="st10" d="M50,100c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50S22.4,100,50,100z M50,9.4c22.4,0,40.6,18.2,40.6,40.6 S72.4,90.6,50,90.6S9.4,72.4,9.4,50S27.6,9.4,50,9.4z M25,31.3c0,3.5,2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S34.7,25,31.3,25 S25,27.8,25,31.3z M62.5,31.3c0,3.5,2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S72.2,25,68.8,25S62.5,27.8,62.5,31.3z M37.5,68.8h25V75h-25 V68.8z"/>
                </svg>
            </span>
        );
    }
}



export default connect()(EmojiStraightFace);