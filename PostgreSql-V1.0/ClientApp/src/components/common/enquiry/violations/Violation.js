import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import OutstandingViolation from './OutstandingViolation';
import AttendedViolation from './AttendedVoilation';
import AllViolation from './AllViolations';


export default class Violation extends Component {
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
                return <OutstandingViolation />;
            case 'attended':
                return <AttendedViolation />;
            case 'all':
                return <AllViolation />;
            default:
                return <OutstandingViolation />;

        }
    }
    handleSelect = (index) => { }

    render() {
        return (
            <div>
                <div className="panel fixed-height1" style={{ width: '100%', height: '300px' }}>
                    <div className="panel-body enquiry-padding">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                            <Tab label={<span onClick={() => this.handleSelect(0)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}>Outstanding Violations</span>}><div className="panel-body enquiry-padding"><OutstandingViolation /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(1)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> Attended Violations</span>}> <div className="panel-body enquiry-padding"><AttendedViolation /></div></Tab>
                            <Tab label={<span onClick={() => this.handleSelect(2)} className={(localStorage.getItem('selectedLanguageCode') == 1) ? "tab-header-text" : "tab-header-text rtl-flip"}> All Violations</span>}> <div className="panel-body enquiry-padding"><AllViolation /></div></Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}


