import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OutstandingComplaints from './OutstandingComplaints';
import AttendedComplaints from './AttendedComplaints';
import AllComplaints from './AllComplaints';


export default class Complaints extends Component {
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
                return <OutstandingComplaints />;
            case 'attended':
                return <AttendedComplaints />;
            case 'all':
                return <AllComplaints />;
            default:
                return <OutstandingComplaints />;

        }
    }
    handleSelect = (index) => { }

    render() {
        return (
            <div>
                <div className="panel fixed-height1" style={{ width: '100%', height: '300px' }}>
                    <div className="panel-body enquiry-padding">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                            <Tab label={<span onClick={() => this.handleSelect(0)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}>Outstanding Complaints</span>}><div className="panel-body enquiry-padding"><OutstandingComplaints /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(1)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> Attended Complaints</span>}> <div className="panel-body enquiry-padding"><AttendedComplaints /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(2)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> All Complaints</span>}> <div className="panel-body enquiry-padding"><AllComplaints /></div></Tab>
                        </Tabs>
                    </div>

                </div>
            </div>
        );
    }
}




