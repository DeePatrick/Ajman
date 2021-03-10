import React, { Component } from 'react';


class Dropdown extends Component {
    displayName = Dropdown.name

    state = {
        selectValue: 'Radish'
    }


    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    };

    render() {
        const { message } = 'You selected ' + this.state.selectValue;

        return (
            <div>
                <select value={this.state.selectValue} onChange={this.handleChange} className="form-control-dashboard">
                    <option value="Orange">Last 3 months, no of visitors per month</option>
                    <option value="Radish">Last 12 months, no of visitors per month</option>
                    <option value="Cherry">Last 6 months, no of visitors per month</option>
                </select>
                <p>{message}</p>
            </div>  
        );
    }
}


export default Dropdown;
