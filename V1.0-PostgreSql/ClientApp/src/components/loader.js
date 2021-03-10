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
            <div className="divLoading">
            </div>
        );
    }
}
export default Loader;