import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import BarChartMonth6 from './../../../shared/BarChartMonth6';
import BarChartMonth12 from './../../../shared/BarChartMonth12';
import BarChartMonth from './../../../shared/BarChartMonth';


class FrontOffice extends Component {
    displayName = FrontOffice.name
    state = {
        selectValue: 'Radish'
    }



    componentDidMount() {
        $('.selectpicker').selectpicker();
    }

    handleChange = (e) => {
        this.setState({selectValue: e.target.value});
    }


    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <div className="slidebottom"><BarChartMonth /></div>;
            case 'orange':
                return <div className="slidebottom"><BarChartMonth6 /></div>;
            case 'apple':
                return <div className="slidebottom"><BarChartMonth12 /></div>;
            default:
                return <div className="slidebottom"><BarChartMonth /></div>;
        }
    }

    render() {
        let message = this._renderSubComp();
        return (
            <div className="panel sph">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">

                       
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "panel-title rtl-black-button top-dash-padding" : "panel-title black-button top-dash-padding"}>
                                {/*<i className="fas fa-download"/> */}
                                    <span className="btn-text">Front Office</span>
                                </div>
                           
                            <div>{message}</div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "btn-group pull-left" : "btn-group pull-right"}>
                                <div className="chart-size">
                                    <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "btn-group pull-left" : "btn-group pull-right"}>
                                        <select
                                            value={this.state.selectValue}
                                            onChange={this.handleChange}
                                            className="selectpicker pull-right" data-width="180px" data-height="30px">
                                            <option value="mango" data-content="<span class='select-picker-font-size'>Last 3 months, visitors per month</span>">Last 3 months, visitors per month</option>
                                            <option value="orange" data-content="<span class='select-picker-font-size'>Last 6 months, visitors per month</span>">Last 6 months, visitors per month</option>
                                            <option value="apple" data-content="<span class='select-picker-font-size'>Last 12 months, visitors per month</span>">Last 12 months, visitors per month</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="btn-group pull-right">
                                <div className="text-center">
                                    <div className="grey">
                                            <h6 className={(localStorage.getItem('selectedLanguageCode') == 2) ? "little-margin-right" : "little-margin-left"}>Average wait time at desk</h6>
                                    </div>
                                    <div className="gold-small">
                                        <strong>10:10</strong>
                                    </div><br/>
                                    <div className="grey">
                                            <h6 className={(localStorage.getItem('selectedLanguageCode') == 2) ? "little-margin-right" : "little-margin-left"}>Average time to complete task at desk</h6>
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
export default FrontOffice;