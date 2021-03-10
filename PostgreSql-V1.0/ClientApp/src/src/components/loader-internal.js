import React, { Component } from 'react';
import '../assets/loader.css';

class Loader2 extends Component {
    displayName = Loader2.name
    constructor(props) {
        super(props);
        this.state = {
            fullName: ''
        };
    }
    render() {
        return (
            <div className="divLoading2" >
                <ul className="loader-wrapper2">
                    <li className="loader-inner2">
                        <img width="150" alt="" src={require('../assets/svg-loaders/puff-gold.svg')} />
                    </li>
                </ul>
            </div>

        );
    }
}
export default Loader2;


