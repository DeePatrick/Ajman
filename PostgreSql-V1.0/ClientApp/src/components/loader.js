import React, { Component } from 'react';
import '../assets/loader.css';
class Loader extends Component {
    displayName = Loader.name
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
        };
    }
    render() {
        return (
            <div className="divLoading" >
                <ul className="loader-wrapper">
                    <li className="loader-inner">
                        <img width="150" alt="" src={require('../assets/svg-loaders/puff-white.svg')} />
                    </li>
                </ul>
            </div>
        );
    }
}
export default Loader;