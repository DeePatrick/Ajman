import React, {Component} from 'react';
import {connect} from 'react-redux';
import Violations from './violations/Violation';
import Complaints from './complaints/Complaints';
import InvoiceReceiptRequest from './invoice/InvoiceReceiptRequest';
import IssueRequest from './Issuerequest/IssueRequest';
import QuotationRequest from './quotation/QuotationRequest';
import {Animated} from "react-animated-css";
import './Enquiry.css';

class EnquiryAdmin extends Component {
    constructor() {
        super();
        this.state = {
            render: ''
        }
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({render: compName});
    }
    _renderSubComp() {
        switch (this.state.render) {
            case 'violations':
                return <div className="slideright"><Violations/></div>
            case 'complaints':
                return <div className="slidebottom"><Complaints/></div>
            case 'issuerequest':
                return <div className="slideright">
                    <IssueRequest/></div>
            case 'receipt':
                return <div className="slidebottom"><InvoiceReceiptRequest/></div>
            case 'quotation':
                return <div className="slideright"><QuotationRequest/></div>
            default:
                return <div className="slidebottom"><QuotationRequest/></div>
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default">
                                <div className="panel full-height">
                                    <div className="panel">
                                        <div className="panel-body">
                                        <br/>
                                            <div className="rows">
                                                <div className="col-md-4 col-lg-4 col-sm-4">
                                                    <h4>&nbsp;&nbsp;Enquiries</h4>
                                                </div>

                                                <div className="col-md-2 col-lg-2 col-sm-2"></div>
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <button type="button" className="btn-enquiry">
                                                        <h6>Register New Enquiry</h6>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                
                                                <br/><br/>

                                                <div className="container-fluid">
                                                    <br/>

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">

                                                                <span className='pics'>
                                                                    <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                .handleClick
                                                                .bind(this, 'violations')}
                                                                className="col-md-10 col-lg-10 col-sm-11 col-xs-8 ">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span>Violations /Fines</span>

                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">

                                                                <span className='pics'>
                                                                    <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                .handleClick
                                                                .bind(this, 'complaints')}
                                                                className="col-md-10 col-lg-10 col-sm-11 col-xs-8">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span>Complaints</span>

                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">

                                                                <span className='pics'>
                                                                    <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                .handleClick
                                                                .bind(this, 'issuerequest')}
                                                                className="col-md-10 col-lg-10 col-sm-11 col-xs-8 ">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span>Issue Request</span>
                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">

                                                                <span className='pics'>
                                                                    <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                .handleClick
                                                                .bind(this, 'quotation')}
                                                                className="col-md-10 col-lg-10 col-sm-11 col-xs-8 ">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span>Quotations Request</span>

                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">

                                                                <span className='pics'>
                                                                    <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                .handleClick
                                                                .bind(this, 'receipt')}
                                                                className="col-md-10 col-lg-10 col-sm-11 col-xs-8 ">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span>Invoice / Receipts Request</span>
                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default main-body-height">
                                <div className="container-fluid">
                                    <div>
                                        <br/></div>
                                    {this.state.render !== '' && <div className="details">
                                        {this._renderSubComp()}
                                    </div>
}
                                    {this.state.render === '' && <span>
                                        <h5 className="text-center text-vertical"><br/><br/><br/>
                                            <i id="icon-truck-gold-no-circle" className="fa fa-exclamation-circle"></i>
                                            <br/>
                                            Please select an enquiry</h5>
                                    </span>
}
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </div>

        );

    }
}

export default connect()(EnquiryAdmin);