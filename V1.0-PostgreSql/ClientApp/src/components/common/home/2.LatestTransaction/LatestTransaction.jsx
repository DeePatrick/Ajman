import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BarChartMonth6 from './../../../shared/BarChartMonth6';
import BarChartMonth12 from './../../../shared/BarChartMonth12';
import BarChartMonth from './../../../shared/BarChartMonth';
//import Carousel from '../1.PenaltyPaymentChart/penalty/Carousel';

export default class LatestTransaction extends Component {
    displayName = LatestTransaction.name
    state = {
        selectValue: 'Radish'
    }

    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <div className="slidebottom"><BarChartMonth /></div>
            case 'orange':
                return <div className="slidebottom"><BarChartMonth6 /></div>
            case 'apple':
                return <div className="slidebottom"><BarChartMonth12 /></div>
            default:
                return <div className="slidebottom"><BarChartMonth /></div>
        }
    }
    render() {
        let message = this._renderSubComp();
        return (
            <div>
                <i className="fa fa-bar-chart"></i>
                <h4>Latest Transaction Chart</h4>
                <div className="panel sph">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-5 col-lg-5 col-sm-5">
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
                                                <option value="mango">Last 3 months, visitors per month</option>
                                                <option value="orange">Last 6 months, visitors per month</option>
                                                <option value="apple">Last 12 months, visitors per month</option>
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
                                            </div><br />
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
                    < br />
                </div>
                <div className="panel fixed-height" style={{ display: 'none' }}>
                    <div className="panel-body">

                        <div className="row ">
                            <div className="col-md-4 penalty-panel">  red</div>
                            <div className="col-md-4 penalty-panel">
                                <br /><br /><br /><br />

                                {/*<Carousel />*/}
                            </div>
                            <div className="col-md-4 penalty-panel">
                                <div className="penalty-panel">MOST RECENT PENALTY CHARGE</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
