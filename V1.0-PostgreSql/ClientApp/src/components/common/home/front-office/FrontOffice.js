import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom';
import BarChartMonth6 from './../../../shared/BarChartMonth6';
import BarChartMonth12 from './../../../shared/BarChartMonth12';
import BarChartMonth from './../../../shared/BarChartMonth';


class FrontOffice extends Component {
    displayName = FrontOffice.name
    state = {
        selectValue: 'Radish'
    }

    handleChange = (e) => {
        this.setState({selectValue: e.target.value});
    }

    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <div className="slidebottom"><BarChartMonth/></div>
            case 'orange':
                return <div className="slidebottom"><BarChartMonth6/></div>
            case 'apple':
                return <div className="slidebottom"><BarChartMonth12/></div>
            default:
                return <div className="slidebottom"><BarChartMonth/></div>
        }
    }

    render() {
        let message = this._renderSubComp();
        return (
            <div className="panel small-panel-height">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5">

                            <Link to={'/front-office/home'}>
                                <div className="panel-title black-button">
                                    <i className="fas fa-download"></i>
                                    <span className="btn-text">Front Office</span>
                                </div>
                            </Link>
                            <div>{message}</div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7">
                            <div className="btn-group pull-right">
                                <div className="chart-size">
                                    <div className="btn-group pull-right">
                                        <select
                                            value={this.state.selectValue}
                                            onChange={this.handleChange}
                                            className="form-control-dashboard">
                                            <option value="mango">Last 3 months, no of visitors per month</option>
                                            <option value="orange">Last 6 months, no of visitors per month</option>
                                            <option value="apple">Last 12 months, no of visitors per month</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="btn-group pull-right">
                                <div className="text-center">
                                    <div className="grey">
                                        <h6>Average wait time at desk</h6>
                                    </div>
                                    <div className="gold-small">
                                        <strong>10:10</strong>
                                    </div><br/>
                                    <div className="grey">
                                        <h6 className="little-margin-right">Average time to complete task at desk</h6>
                                    </div>
                                    <div className="gold-small">
                                        <strong>1:15</strong>
                                    </div>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
               </div>
                < br/>
            </div>
        );
    }
}
export default connect()(FrontOffice);