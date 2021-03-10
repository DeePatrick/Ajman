import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OutstandingIssueRequest from './OutstandingIssueRequest';
import AttendedIssueRequest from './AttendedIssueRequest';
import AllIssueRequests from './AllIssueRequests';


export default class IssueRequest extends Component {
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
                return <OutstandingIssueRequest />;
            case 'attended':
                return <AttendedIssueRequest />;
            case 'all':
                return <AllIssueRequests />;
            default:
                return <OutstandingIssueRequest />;

        }
    }
    handleSelect = (index) => { }

    render() {
        return (
            <div>
                <div className="panel fixed-height1" style={{ width: '100%', height: '300px' }}>
                    <div className="panel-body enquiry-padding">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                            <Tab label={<span onClick={() => this.handleSelect(0)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}>Outstanding IssueRequests</span>}><div className="panel-body enquiry-padding"><OutstandingIssueRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(1)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> Attended IssueRequests</span>}> <div className="panel-body enquiry-padding"><AttendedIssueRequest /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(2)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> All IssueRequests</span>}> <div className="panel-body enquiry-padding"><AllIssueRequests /></div></Tab>
                        </Tabs>
                    </div>

                </div>
            </div>
        );
    }
}

