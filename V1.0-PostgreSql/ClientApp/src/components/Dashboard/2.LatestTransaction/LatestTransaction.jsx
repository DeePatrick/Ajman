import React, { Component } from 'react';
import './LatestTransaction.css';
import { Link } from 'react-router-dom';
import BarChartMonth6 from '../../shared/BarChartMonth6';
import BarChartMonth12 from '../../shared/BarChartMonth12';
import BarChartMonth from '../../shared/BarChartMonth';
//import Carousel from '../1.PenaltyPaymentChart/penalty/Carousel';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class LatestTransaction extends Component {
    displayName = LatestTransaction.name

    constructor(props) {
        super(props);

        this.state = {
            selectValue: 'Radish',
            latestTransactions: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            latestTransactions: nextProps.latestTransactions
        });
    }
    render() {
        return (
            <div>
                <div className="panel-element-header-container">
                    <strong className="gold-small-header"><i id="icon-small_noborder" class="fa fa-credit-card"></i><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{this.props.t('LATEST_TRANSACTION')}</span></strong>
                </div>
                <div className="white-panel-container row panel-element-container-row-top">

                    <div className="w-100">
                        {/*"LATEST TRANSACTION" Row - Start ---- TOP "ROW" NEEDS TO HAVE CLASS OF "transaction-info-row-container-top" to stop border line from appearing on top result*/}

                        <div className="row transaction-info-row-container-top">
                            <div className="col-lg-11 col-md-11 col-xs-11">
                                {/*"Transaction Information" Row - Start*/}
                                <div className="row">
                                    GH06KLD - Renewed Permit &#163;50 per month
                                </div>
                                {/*"Transaction Information" Row - End*/}
                                {/*"Information Status" Row - Start*/}
                                <div className="row">
                                    <span class="label label-danger">{this.props.t('Decline')}</span>
                                </div>
                                {/*"Information Status" Row - End*/}
                            </div>
                            {/*"Information" Col - End*/}

                            {/*"Arrow" Col - Start*/}
                            <div className="col-lg-1 col-md-1 col-xs-1 padding-none">
                                <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                            </div>
                        </div>

                        <div className="row transaction-info-row-container">
                            <div className="col-lg-11 col-md-11 col-xs-11">
                                {/*"Transaction Information" Row - Start*/}
                                <div className="row">
                                    HO56KGF - Renewed Permit &#163;50 per month
                                </div>
                                {/*"Transaction Information" Row - End*/}
                                {/*"Information Status" Row - Start*/}
                                <div className="row">
                                    <span class="label label-success">{this.props.t('Accepted')}</span>
                                </div>
                                {/*"Information Status" Row - End*/}
                            </div>
                            {/*"Information" Col - End*/}

                            {/*"Arrow" Col - Start*/}
                            <div className="col-lg-1 col-md-1 col-xs-1 padding-none">
                                <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                            </div>
                        </div>

                        <div className="row transaction-info-row-container">
                            <div className="col-lg-11 col-md-11 col-xs-11">
                                {/*"Transaction Information" Row - Start*/}
                                <div className="row">
                                    HO56KGF - Paid Fine &#163;200
                                </div>
                                {/*"Transaction Information" Row - End*/}
                                {/*"Information Status" Row - Start*/}
                                <div className="row">
                                    <span class="label label-warning">{this.props.t('Waiting')}</span>
                                </div>
                                {/*"Information Status" Row - End*/}
                            </div>
                            {/*"Information" Col - End*/}

                            {/*"Arrow" Col - Start*/}
                            <div className="col-lg-1 col-md-1 col-xs-1 padding-none">
                                <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                            </div>
                        </div>

                        <div className="row transaction-info-row-container">
                            <div className="col-lg-11 col-md-11 col-xs-11">
                                {/*"Transaction Information" Row - Start*/}
                                <div className="row">
                                    GL05GFD - Paid Fine &#163;200
                                </div>
                                {/*"Transaction Information" Row - End*/}
                                {/*"Information Status" Row - Start*/}
                                <div className="row">
                                    <span class="label label-success">{this.props.t('Accepted')}</span>
                                </div>
                                {/*"Information Status" Row - End*/}
                            </div>
                            {/*"Information" Col - End*/}

                            {/*"Arrow" Col - Start*/}
                            <div className="col-lg-1 col-md-1 col-xs-1 padding-none">
                                <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                            </div>
                        </div>

                        {/*"LATEST TRANSACTION" Row - End*/}
                    </div>

                    {/*this.state.latestTransactions.length > 0 &&
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            {this.state.latestTransactions.map((vec, index) => (
                                <div className="" key={index}>
                                    <div className="speech-bubble small-margin-well" style={{ height: '64px' }}>
                                        <div className="row" style={{ paddingLeft: '10px' }}>
                                            <div className="col-md-11 col-lg-11 col-sm-11">
                                                <span>{vec.remark} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1">
                                                <i style={{ color: '#9f8865', fontSize: '18px' }} className="fa fa-arrow-right" />
                                            </div>
                                        </div>
                                        {
                                            vec.status === "Pending" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'red', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Pending')}</span></div>
                                        }
                                        {
                                            vec.status === "Accepted" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'limegreen', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Accepted')}</span></div>
                                        }
                                        {
                                            vec.status === "Decline" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'red', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Decline')}</span></div>
                                        }
                                        {
                                            vec.status === "Waiting" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'gold', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Waiting')}</span></div>
                                        }
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    }
                    {this.state.latestTransactions.length > 4 &&
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            {this.state.latestTransactions.map((vec, index) => (
                                <div className="" key={index}>
                                    <div className="speech-bubble small-margin-well" style={{ height: '64px' }}>
                                        <div className="row" style={{ paddingLeft: '10px' }}>
                                            <div className="col-md-11 col-lg-11 col-sm-11">
                                                <span>{vec.remark} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1">
                                                <i style={{ color: '#9f8865', fontSize: '18px' }} className="fa fa-arrow-right" />
                                            </div>
                                        </div>
                                        {
                                            vec.status === "Pending" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'red', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Pending')}</span></div>
                                        }
                                        {
                                            vec.status === "Accepted" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'limegreen', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Accepted')}</span></div>
                                        }
                                        {
                                            vec.status === "Decline" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'red', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Decline')}</span></div>
                                        }
                                        {
                                            vec.status === "Waiting" &&
                                            <div className="row" style={{ paddingLeft: '10px' }}><span style={{ backgroundColor: 'gold', borderRadius: '5px', padding: '3px', color: 'white', fontSize: '10px' }}>{this.props.t('Waiting')}</span></div>
                                        }
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    }
                    {this.state.latestTransactions.length === 0 &&
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <strong style={{ color: 'red', textAlign: 'center', marginTop: '50px', marginLeft: '50px' }}> No any latest transactions </strong>
                        </div>
                    */}
                </div>
                <div className="panel-element-footer-container right">
                    <a href=""><u>See More ></u></a>
                </div>
            </div>
        )
    }
}
export default translate(LatestTransaction);