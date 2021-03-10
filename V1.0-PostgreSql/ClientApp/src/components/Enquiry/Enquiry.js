import React, { Component } from 'react';
import Violations from './violations/Violation';
import Complaints from './complaints/Complaints';
import InvoiceReceiptRequest from './invoice/InvoiceReceiptRequest';
import IssueRequest from './Issuerequest/IssueRequest';
import QuotationRequest from './quotation/QuotationRequest';
import { Animated } from "react-animated-css";
import './Enquiry.css';

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
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                        <div className="row align-items-center nil-margin">
                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
                                <span>
                                    <i className="fa fa-exclamation-circle icon-title-small"></i>
                                </span>
                            </div>
                            <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 title-top-padding">
                                <strong className="font-custom-standard-gold">ENQUIRIES</strong>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                <button type="button" className="btn btn-standard-gold right">
                                    <span>{this.props.t('Register_New_Enquiry')}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                    </div>

                </div>
                <div className="row">
                    {/*Left Panel - START - Informational List Display*/}
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default main-body-height-admin">
                                <div className="panel panel-body">
                                    <div className="list-container-left-panel">
                                        <div className="container-fluid movetop">
                                            {/*Row Start*/}
                                            <div className="row list-row-styling align-items-center" onClick={this.handleClick.bind(this, 'violations')}>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <i className="fa fa-exclamation-circle icon-custom-standard-grey"></i>
                                                </div>
                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                    <span className="font-custom-standard-grey">
                                                        {this.props.t('Violations_Fines')}
                                                    </span>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <span className="pull-right">
                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/*Row End*/}
                                            {/*Row Start*/}
                                            <div className="row list-row-styling align-items-center" onClick={this.handleClick.bind(this, 'complaints')}>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <i className="fa fa-exclamation-circle icon-custom-standard-grey"></i>
                                                </div>
                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                    <span className="font-custom-standard-grey">
                                                        {this.props.t('Complaints')}
                                                    </span>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <span className="pull-right">
                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/*Row End*/}
                                            {/*Row Start*/}
                                            <div className="row list-row-styling align-items-center" onClick={this.handleClick.bind(this, 'issuerequest')}>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <i className="fa fa-exclamation-circle icon-custom-standard-grey"></i>
                                                </div>
                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                    <span className="font-custom-standard-grey">
                                                        {this.props.t('Issue_Request')}
                                                    </span>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <span className="pull-right">
                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/*Row End*/}
                                            {/*Row Start*/}
                                            <div className="row list-row-styling align-items-center" onClick={this.handleClick.bind(this, 'quotation')}>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <i className="fa fa-exclamation-circle icon-custom-standard-grey"></i>
                                                </div>
                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                    <span className="font-custom-standard-grey">
                                                        {this.props.t('Quotations_Request')}
                                                    </span>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <span className="pull-right">
                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/*Row End*/}
                                            {/*Row Start*/}
                                            <div className="row list-row-styling align-items-center" onClick={this.handleClick.bind(this, 'receipt')}>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <i className="fa fa-exclamation-circle icon-custom-standard-grey"></i>
                                                </div>
                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                    <span className="font-custom-standard-grey">
                                                        {this.props.t('Invoice_Receipts_Request')}
                                                    </span>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                    <span className="pull-right">
                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {/*Row End*/}
                                        </div>
                                    </div>

                                    <div className="movein">
                                        <div>
                                            <h4>
                                                <strong>5 </strong>
                                                Enquiry Options
                                            </h4>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Animated>
                    </div>
                    {/*Left Panel - END - Informational List Display*/}

                    {/*Right Panel - Start - Informational Panel Display*/}
                    <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 left-border">
                        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default main-body-height-admin">
                                <div className="panel panel-body">

                                    <div className="page-container-right-panel">

                                        <div className="row nil-margin align-items-center">

                                            <input className="form-control form-search-admin" type="text" placeholder="Search" aria-label="Search" />

                                            <span className="btn-search-edit">
                                                <button type="button">
                                                    <i className="glyphicon glyphicon-search btn-search" />
                                                </button>
                                            </span>

                                        </div>
                                        <div className="row nil-margin">
                                            <div className='col-lg-12 col-md-12 col-sm-12'>

                                                {this.state.render !== '' && <div className="details">
                                                    {this._renderSubComp()}
                                                </div>
                                                }
                                                {this.state.render === '' && <span>
                                                    <h5 className="text-center text-vertical"><br /><br /><br />
                                                        <i id="icon-truck-gold-no-circle" className="fa fa-exclamation-circle"></i>
                                                        <br />
                                                        Please select an enquiry</h5>
                                                </span>
                                                }

                                            </div>
                                        </div>

                                    </div>

                                    <div className="page-container-footer-right-panel">

                                    </div>
                                </div>
                            </div>

                        </Animated>

                    </div>
                    {/*Right Panel - END - Informational Panel Display*/}

                </div>
            </div>
        );
    }
}
export default translate(Enquiry);