import React, { Component } from 'react';
import Pagination from '../shared/Pagination';
import { Animated } from "react-animated-css";
//import RenewPermit from './RenewPermit';
////import './PermitTab.css';
//import RequestPermit from './RequestPermit';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';
import { Redirect } from 'react-router-dom';
import Loader from '../loader';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import CompanyApproval from './CompanyApproval';
import Company from './Company';

export class CompanyTab extends Component {

    constructor() {
        super();

        this.state = {
            render: '',
            action:'pen'
        }
    }
    
    handleSelect = (obj) => {
        this.setState({ action: obj })
    }
    render() {
        return (
            <div>
                <div className={this.state.showing ? "entity-table-permit" : "entity-table-permit"} >
                    <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "arab-row" : null}>
                        <div className="col col-lg-12  col-md-12">
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <div className="panel fixed-height1" style={{ width: '100%' }}>
                                    <div className="panel-body">
                                        <Tabs>

                                            <Tab  label={<span onClick={() => this.handleSelect('pen')} className="tab-header-text">Pending</span>}>
                                                <div className="panel-body enquiry-padding">
                                                    <CompanyApproval action={this.state.action} />
                                                </div>
                                            </Tab>
                                            <Tab  label={<span onClick={() => this.handleSelect('app')} className="tab-header-text">Approved</span>}> 
                                                <div className="panel-body enquiry-padding">
                                                    <CompanyApproval action={this.state.action} />
                                                </div>
                                            </Tab>
                                            <Tab  label={<span onClick={() => this.handleSelect('rej')} className="tab-header-text">Rejected</span>}>
                                                <div className="panel-body enquiry-padding">
                                                    <CompanyApproval action={this.state.action} />
                                                </div>
                                            </Tab>
                                            
                                        </Tabs>
                                    </div>

                                </div>
                            </Animated>
                            <br />
                        </div>

                    </div>

                </div >
            </div>
        )
    }
}
//Multilingual Uncomments below lines
export default CompanyTab;
