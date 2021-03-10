import React, { Component } from 'react';
import './PenaltyPaymentChart.css';
import { Link } from 'react-router-dom';
import BarChartMonth6 from '../../shared/BarChartMonth6';
import BarChartMonth12 from '../../shared/BarChartMonth12';
import BarChartMonth from '../../shared/BarChartMonth';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class PaymentPenaltyChart extends Component {
    displayName = PaymentPenaltyChart.name

    constructor(props) {
        super(props);

        this.state = {
            selectValue: 'Radish',
            totalPaymentDue: 0,
            amount: 0,
            duedate: '',
            finetype: '',
            messsage: ''
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            totalPaymentDue: nextProps.totalPaymentDue.totalpaymentdue,
            amount: nextProps.mostRecentPenalityCharge.amount,
            duedate: nextProps.mostRecentPenalityCharge.duedate,
            finetype: nextProps.mostRecentPenalityCharge.finetype
        });
    }
    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }
    _renderSubComp() {
        switch (this.state.selectValue) {
            case 'mango':
                return <BarChartMonth />
            case 'orange':
                return <BarChartMonth6 />
            case 'apple':
                return <BarChartMonth12 />
            default:
                return <BarChartMonth />
        }
    }

    render() {
        let message = this._renderSubComp();
        return (
            <div>
                <div className="panel-element-header-container">
                    <strong className="gold-small-header"><i id="icon-small_noborder" className="fa fa-bar-chart" />{this.props.t('PENALTY_PAYMENT_CHART')}</strong>
                </div>
                <div className="white-panel-container row panel-element-container-row-top">
                    {/*<div className="row"><select
                            value={this.state.selectValue}
                            onChange={this.handleChange}
                            className="form-control-dashboard">
                            <option value="mango">{this.props.t('Last_3_months')}</option>
                            <option value="orange">{this.props.t('Last_6_months')}</option>
                            <option value="apple">{this.props.t('Last_12_months')}</option>
                        </select></div>*/}
                    <div className="col-md-12 col-lg-4 col-sm-12 col-xs-12">
                        {/*Fines/Stats Graph - START*/}
                        {message}
                        {/*Fines/Stats Graph - END*/}
                    </div>
                    <div className="col-md-6 col-lg-5 col-sm-12 col-xs-12">
                        <div className="row h-100">
                            {/*Slider for price - START*/}
                            <div id="myCarousel" className="carousel slide carousel-main-PenaltyPaymentChart" data-ride="carousel">

                                <ol className="carousel-indicators carousel-indicators-PenaltyPaymentChart">
                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                </ol>

                                <div className="carousel-inner">
                                    <div class="item active">
                                        <strong className="totalpaymentsdue">{this.props.t('Total_Payments_Due')} </strong>
                                        <br />
                                        <strong className="textgold-payment">{this.state.totalPaymentDue}</strong>
                                        <strong className="textgold-AED">AED</strong>
                                        <br />
                                        <strong className="textgold-account">1234512345</strong>
                                    </div>

                                    <div className="item">
                                        <strong className="totalpaymentsdue">{this.props.t('Total_Payments_Due')} </strong>
                                        <br />
                                        <strong className="textgold-payment">{this.state.totalPaymentDue}</strong>
                                        <strong className="textgold-AED">AED</strong>
                                        <br />
                                        <strong className="textgold-account">1234512345</strong>
                                    </div>

                                    <div className="item">
                                        <strong className="totalpaymentsdue">{this.props.t('Total_Payments_Due')} </strong>
                                        <br />
                                        <strong className="textgold-payment">{this.state.totalPaymentDue}</strong>
                                        <strong className="textgold-AED">AED</strong>
                                        <br />
                                        <strong className="textgold-account">1234512345</strong>
                                    </div>
                                    <a className="left carousel-control carousel-controls-PenaltyPaymentChart" href="#myCarousel" data-slide="prev">
                                        <span className="fa fa-chevron-circle-left"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="right carousel-control carousel-controls-PenaltyPaymentChart" href="#myCarousel" data-slide="next">
                                        <span className="fa fa-chevron-circle-right"></span>
                                        <span className="sr-only">Next</span>
                                    </a>

                                </div>
                            </div>
                            {/*Slider for price - END*/}
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-sm-12 col-xs-12">
                        {/*"Most Recent Penalty Charge Section" - START*/}
                        <div className="recent-penalty-charge-container">
                            <p>
                                <strong className="textwhite"> {this.props.t('MOST_RECENT_PENALTY_CHARGE')}</strong>
                            </p>
                            <p>
                                <strong className="textwhite"> {this.state.finetype}<br />{this.state.duedate}</strong>
                            </p>
                            <p>
                                <strong className="textwhite-payment">{this.state.amount}</strong> <strong className="textwhite-AED">AED</strong>
                            </p>
                            <p>
                                <button type="button" className="btn btn-lg btn-block recent-penalty-charge-button">Pay Now</button>
                            </p>
                        </div>
                        {/*"Most Recent Penalty Charge Section" - END*/}
                    </div>
                </div>
                <div className="panel-element-footer-container right">
                    <a href=""><u>See More ></u></a>
                </div>
            </div>
        )
    }
}
export default translate(PaymentPenaltyChart);