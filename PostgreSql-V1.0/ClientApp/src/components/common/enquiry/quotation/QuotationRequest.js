import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OutstandingQuotationRequest from './OutstandingQuotationRequest';
import AttendedQuotationRequest from './AttendedQuotationRequest';
import AllQuotationRequests from './AllQuotationRequests';


export default class QuotationRequest extends Component {
    constructor() {
        super();
        this.state = {
            render: ''
        };
    }

    handleClick(index) { }
    _renderSubComp() {
        switch (this.state.render) {
            case 'outstanding':
                return <OutstandingQuotationRequest/>;
            case 'attended':
                return <AttendedQuotationRequest />;
            case 'all':
                return <AllQuotationRequests />;
            default:
                return <OutstandingQuotationRequest/>;

        }
    }
    handleSelect = (index) => { }

    render() {
        return (
            <div>
                <div className="panel fixed-height1" style={{ width: '100%', height: '300px' }}>
                    <div className="panel-body enquiry-padding">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                            <Tab label={<span onClick={() => this.handleSelect(0)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}>Outstanding Quotation Request</span>}><div className="panel-body enquiry-padding"><OutstandingQuotationRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(1)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> Attended Quotation Request</span>}> <div className="panel-body enquiry-padding"><AttendedQuotationRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(2)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> All Quotation Requesst</span>}> <div className="panel-body enquiry-padding"><AllQuotationRequests /></div></Tab>
                        </Tabs>
                    </div>

                </div>
            </div>
        );
    }
}


