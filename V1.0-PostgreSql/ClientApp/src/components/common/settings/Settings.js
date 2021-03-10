import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './../../shared/SearchBar';
import { Link } from 'react-router-dom';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

export class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*Row 1 - Start - Image(logo)/Title/Button*/}
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                        <div className="row align-items-center nil-margin">
                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
                                <span>
                                    <i className="fa fa-cog icon-title-small"></i>
                                </span>
                            </div>
                            <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 title-top-padding">
                                <strong className="font-custom-standard-gold">SETTINGS</strong>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                    </div>

                </div>
                {/*Row 1 - End - Image(logo)/Title/Button*/}

                <div className="row">
                    {/*Left Panel - START - Informational List Display*/}
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                        <div className="panel panel-default main-body-height-admin">
                            <div className="panel panel-body">

                                <div className="list-container-left-panel">
                                    <div className="container-fluid movetop">
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Language_input_tools')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Device_Acivity_and_Notifications')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Location_Info')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Delete_your_account_or_services')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Account_History')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Edit_Dashboard')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Accessibility')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Security_info')} </span>
                                            </div>
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <span className="pull-right">
                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                </span>
                                            </div>
                                        </div>
                                        {/*Row End*/}
                                        {/*Row Start*/}
                                        <div className="row list-row-styling align-items-center">
                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                <i className="fa fa-cog icon-custom-standard-grey"></i>
                                            </div>
                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                <span className="font-custom-standard-grey"> {this.props.t('Company')} </span>
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
                                            <strong>9 </strong>
                                            Setting Options
                                            </h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*Left Panel - END - Informational List Display*/}

                    {/*Right Panel - Start - Informational Panel Display*/}
                    <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 left-border">
                        <div className="panel panel-default main-body-height-admin">
                            <div className="panel panel-body">

                                <div className="page-container-right-panel">

                                    <div className="row nil-margin align-items-center">

                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            
                                        </div>
                                    </div>
                                    <div className="row nil-margin">
                                        <div className='col-lg-12 col-md-12 col-sm-12'>

                                            <h5 className="text-center text-vertical">
                                                <i id="icon-truck-gold-no-circle" className="fa fa-exclamation-circle"></i> Please select an setting option to display on this panel
                                                </h5>

                                        </div>
                                    </div>

                                </div>

                                <div className="page-container-footer-right-panel">

                                </div>
                            </div>

                        </div>

                    </div>
                    {/*Right Panel - END - Informational Panel Display*/}

                </div>
            </div>
        );
    }
}
export default translate(Settings);