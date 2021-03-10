import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DropdownNav extends Component {
    displayName = DropdownNav.name


    constructor(props) {
        super(props);
        this.state = {
            selectValue: 'Radish'
        };

    }

    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <div className="slidebottom"></div>;
            case 'orange':
                return <div className="slidebottom"></div>;
            case 'apple':
                return <div className="slidebottom"></div>;
            default:
                return <div className="slidebottom"></div>;
        }
    }

    render() {
        let message = this._renderSubComp();

        return (
            <div>
                <div>
                    <div className="chart-size">
                        <div className="btn-group pull-right">
                            <select className="selectpicker" value={this.state.selectValue} onChange={this.handleChange}>
                                <option value="mango" data-content="<span class='select-picker-font-size  select-picker-bg'>Front Office - waiting for Customer</span>">
                                    <Link  className="blank-link" to={'/front-office-wc/home'} >
                                        <div className="" data-toggle="tooltip" data-placement="right" title="Front Office - waiting for Customer">
                                            Front Office - waiting for Customer
                                        </div>
                                    </Link>
                                </option>
                                <option value="orange" data-content="<span class='select-picker-font-size  select-picker-bg'>Call Center</span>">
                                    <Link className="blank-link" to={'/call-center/home'} >
                                        <div className="" data-toggle="tooltip" data-placement="right" title="Call Center">
                                            Call Center
                                        </div>
                                    </Link>
                                </option>
                                <option value="apple" data-content="<span class='select-picker-font-size  select-picker-bg'>Back Office</span>">
                                    <Link className="blank-link" to={'/back-office/home'} >
                                        <div className="" data-toggle="tooltip" data-placement="right" title="Back Office">
                                            Back Office
                                        </div>
                                    </Link>
                                </option>
                            </select>
                        </div>
                    </div>
                </div><br />
                <div>{message}</div>
            </div>
        );
    }
}


export default DropdownNav;
