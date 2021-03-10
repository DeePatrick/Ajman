import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OutstandingInvoiceRecieptRequest from './OutstandingInvoiceRecieptRequest';
import AttendedInvoiceRecieptRequest from './AttendedInvoiceRecieptRequest';
import AllInvoiceRecieptRequests from './AllInvoiceRecieptRequests';


export default class InvoiceRecieptRequest extends Component {
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
                return <OutstandingInvoiceRecieptRequest />;
            case 'attended':
                return <AttendedInvoiceRecieptRequest />;
            case 'all':
                return <AllInvoiceRecieptRequests />;
            default:
                return <OutstandingInvoiceRecieptRequest />;

        }
    }
    handleSelect = (index) => { }

    render() {
        return (
            <div>
                <div className="panel fixed-height1" style={{ width: '100%', height: '300px' }}>
                    <div className="panel-body enquiry-padding">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                            <Tab label={<span onClick={() => this.handleSelect(0)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}>Outstanding InvoiceReciept Requests</span>}><div className="panel-body enquiry-padding"><OutstandingInvoiceRecieptRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(1)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> Attended InvoiceReciept Requests</span>}> <div className="panel-body enquiry-padding"><AttendedInvoiceRecieptRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(2)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> All InvoiceReciept Requests</span>}> <div className="panel-body enquiry-padding"><AllInvoiceRecieptRequests /></div></Tab>
                        </Tabs>
                    </div>

                </div>
            </div>
        );
    }
}

