import React, { Component } from 'react';
import Violations from './violations/Violation';
import Complaints from './complaints/Complaints';
import InvoiceRecieptRequest from './invoice/InvoiceRecieptRequest';
import IssueRequest from './Issuerequest/IssueRequest';
import QuotationRequest from './quotation/QuotationRequest';
import { Animated } from "react-animated-css";
import './Enquiry.css';
import Violation from './violations/Violation';

class Enquiry extends Component {
    constructor() {
        super();
        this.state = {
            isDesktop: false,
            render: ''
        };

        this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }

    handleClick(compName, e) {
        console.log(compName);
        this.setState({ render: compName });
    }

    handleClickModal(compName, e) {
        console.log(compName);
        this.setState({ render: compName });
    }

    _renderSubComp() {
        switch (this.state.render) {
            case 'violations':
                return <div className="slideright"><Violations /></div>;
            case 'complaints':
                return <div className="slideright"><Complaints /></div>;
            case 'issuerequest':
                return <div className="slideright"><IssueRequest /></div>;
            case 'receipt':
                return <div className="slideright"><InvoiceRecieptRequest /></div>;
            case 'quotation':
                return <div className="slideright"><QuotationRequest /></div>;
            default:
                return <div className="slideright"><QuotationRequest /></div>;
        }
    }

    render() {
        const isDesktop = this.state.isDesktop;

        return (
            <div>
                <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "entity-table-no-searchbar entity-table-padding" : "entity-table-no-searchbar-rtl entity-table-padding-rtl"}>
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                        <div className={this.state.showing
                            ? "panel panel-default"
                            : ([localStorage.getItem('selectedLanguageCode') == 1
                                ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left"
                                : "col-lg-4 col-md-4 col-sm-12 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default animate-table pull-right"])}>
                            <div  className={(localStorage.getItem('selectedLanguageCode') == 1) ? "panel full-height" : "panel full-height rtl-flip"}>
                                <div className="">
                                    <div className="panel-body">
                                        <br />
                                        <div className="rows">
                                            <div className="col-md-3 col-lg-2 col-sm-2 col-xs-3">
                                                <h4 className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>Enquiries</h4>
                                            </div>
                                            <div className="col-md-9 col-lg-10 col-sm-10 col-xs-9">
                                                <button type="button" className="btn-enquiry">
                                                    <h6 className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>New Enquiry</h6>
                                                </button>
                                            </div>
                                        </div>
                                        <div>

                                            <br /><br />

                                            <div className="container-fluid">
                                                <br />

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-2 col-sm-1 col-xs-2">

                                                            <span className='pics'>
                                                                <i id="" className="fa fa-exclamation-circle icon-car-gold" />
                                                            </span>

                                                        </div>

                                                        {isDesktop ? (
                                                            <div onClick={this.handleClick.bind(this, 'violations')} className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Violations /Fines</span>

                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        ) : null}


                                                        {!isDesktop ? (
                                                            <div onClick={this.handleClickModal.bind(this, 'violations')} className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black" data-toggle="modal" data-target="#basicModal">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Violations /Fines</span>

                                                                    <span className="pull-right">
                                                                        <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                    </span>

                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-2 col-sm-1 col-xs-2">

                                                            <span className='pics'>
                                                                <i id="" className="fa fa-exclamation-circle icon-car-gold" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            onClick={this
                                                                .handleClick
                                                                .bind(this, 'complaints')}
                                                            className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Complaints</span>

                                                                <span className="pull-right">
                                                                    <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-2 col-sm-1 col-xs-2">

                                                            <span className='pics'>
                                                                <i id="" className="fa fa-exclamation-circle icon-car-gold" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            onClick={this
                                                                .handleClick
                                                                .bind(this, 'issuerequest')}
                                                            className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Issue Request</span>
                                                                <span className="pull-right">
                                                                    <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-2 col-sm-1 col-xs-2">

                                                            <span className='pics'>
                                                                <i id="" className="fa fa-exclamation-circle icon-car-gold" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            onClick={this
                                                                .handleClick
                                                                .bind(this, 'quotation')}
                                                            className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Quotations Request</span>

                                                                <span className="pull-right">
                                                                    <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="slidebottom">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-2 col-sm-1 col-xs-2">

                                                            <span className='pics'>
                                                                <i id="" className="fa fa-exclamation-circle icon-car-gold" />
                                                            </span>

                                                        </div>
                                                        <div
                                                            onClick={this
                                                                .handleClick
                                                                .bind(this, 'receipt')}
                                                            className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                            <div id="profile" className="speech-bubble-left-black">
                                                                <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Invoice / Receipts Request</span>
                                                                <span className="pull-right">
                                                                    <i id="scaled-arrow" className="fa fa-arrow-right" />
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

                    {!isDesktop ? (
                        <div className="modal fade" id="basicModal" tabIndex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title" id="myModalLabel">Violations /Fines</h4>
                                        <button type="button" className="close mobile-close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">

                                        <div className="container-fluid inner-modal-info">
                                            <Violation />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {isDesktop ? (
                        <div className={this.state.showing
                            ? "panel panel-default main-body-height"
                            : ([localStorage.getItem('selectedLanguageCode') == 1
                                ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                "t-12 col-xs-offset-12 panel panel-default main-body-height"
                                : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-rig" +
                                "ht rtl-main-body-height"])}>
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>
                                <div className="container-fluid">
                                    <div>
                                        <br /></div>
                                    {this.state.render !== '' && <div className="details">
                                        {this._renderSubComp()}
                                    </div>
                                    }
                                    {this.state.render === '' && <span>
                                        <h5 className="text-center text-vertical"><br /><br /><br />
                                            <i id="" className="fa fa-exclamation-circle icon-truck-gold-no-circle" />
                                            <br /><br />
                                            Click Enquiry Group button to show this panel</h5>
                                    </span>
                                    }
                                </div>

                            </Animated>
                        </div>
                    ) : null}
                </div>
            </div>

        );

    }
}

export default Enquiry;