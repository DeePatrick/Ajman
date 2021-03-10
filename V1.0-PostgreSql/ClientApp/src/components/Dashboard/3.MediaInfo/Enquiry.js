import React, { Component } from 'react';
import Violations from '../../Enquiry/violations/Violation';
import Complaints from '../../Enquiry/complaints/Complaints';
import InvoiceReceiptRequest from '../../Enquiry/invoice/InvoiceReceiptRequest';
import IssueRequest from '../../Enquiry/Issuerequest/IssueRequest';
import QuotationRequest from '../../Enquiry/quotation/QuotationRequest';
import { Animated } from "react-animated-css";

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Enquiry extends Component {
    constructor() {
        super();

        this.state = {
            render: ''
        };
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName });
    }

    _renderSubComp() {
        switch (this.state.render) {
            case 'violations':
                return <div className="slideright"><Violations /></div>;
            case 'complaints':
                return <div className="slidebottom"><Complaints /></div>;
            case 'issuerequest':
                return <div className="slideright"><IssueRequest /></div>;
            case 'receipt':
                return <div className="slidebottom"><InvoiceReceiptRequest /></div>;
            case 'quotation':
                return <div className="slideright"><QuotationRequest /></div>;
            default:
                return <div className="slidebottom"><QuotationRequest /></div>;
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default">
                                <div className="panel panel-body">
                                    <br />
                                    <div style={{ height: '250px', overflow: 'auto' }}>
                                        <div className="panel-body">
                                            <div className="container-fluid">
                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
                                                            <span className='pics'>
                                                                <i id="icon-car-gold" className="fa fa-exclamation-circle"></i>
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="col-md-11 col-lg-11 col-sm-11 col-xs-11">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span>{this.props.t('Violations_Fines')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">

                                                            <span className='pics'>
                                                                <i id="icon-car-gold" className="fa fa-exclamation-circle" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            className="col-md-11 col-lg-11 col-sm-11 col-xs-11">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span>{this.props.t('Complaints')}</span>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">

                                                            <span className='pics'>
                                                                <i id="icon-car-gold" className="fa fa-exclamation-circle" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            className="col-md-11 col-lg-11 col-sm-11 col-xs-11 ">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span>{this.props.t('Issue_Request')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">

                                                            <span className='pics'>
                                                                <i id="icon-car-gold" className="fa fa-exclamation-circle" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            className="col-md-11 col-lg-11 col-sm-11 col-xs-11 ">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span>{this.props.t('Quotations_Request')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">

                                                            <span className='pics'>
                                                                <i id="icon-car-gold" className="fa fa-exclamation-circle" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            className="col-md-11 col-lg-11 col-sm-11 col-xs-11 ">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span>{this.props.t('Invoice_Receipts_Request')}</span>
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
                </div>
            </div>

        );
    }
}
export default translate(Enquiry);