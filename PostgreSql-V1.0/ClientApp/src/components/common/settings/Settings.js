import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import AccountHistory from './accountHistory/AccountHistory';
import Accessibility from './accessibilty/Accessibility';
import LanguageAndInputTools from './language/LanguageAndInputTools';
import SecurityInfo from './securityInfo/SecurityInfo';
import EditDashboard from './editDashboard/EditDashboard';
import AddLinkUsers from './addLinkUsers/AddLinkUsers';
import DeviceActivityAndNotifications from './device/DeviceAcitivityandNotifications';
import DeleteAccountAndServices from './deleteAccount/DeleteAccountAndServices';

class Settings extends Component {
    displayName = Settings.name
    constructor() {
        super();
        this.state = {
            isDesktop: false,
            render: '',
            search: ''
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

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
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
            case 'language':
                return <div className="slideright"><LanguageAndInputTools /></div>;
            case 'device':
                return <div className="slidebottom"><DeviceActivityAndNotifications /></div>;
            case 'deleteAccount':
                return <div className="slideright"><DeleteAccountAndServices /></div>;
            case 'accountHistory':
                return <div className="slidebottom"><AccountHistory /></div>;
            case 'accessibility':
                return <div className="slideright"><Accessibility /></div>;
            case 'securityInfo':
                return <div className="slidebottom"><SecurityInfo /></div>;
            case 'addUsersLinkUsers':
                return <div className="slidebottom"><AddLinkUsers /></div>;
            case 'editDashboard':
                return <div className="slidebottom"><EditDashboard /></div>;
            default:
                return <div className="slidebottom"><LanguageAndInputTools /></div>;
        }
    }

    render() {
        const isDesktop = this.state.isDesktop;

        return (
            <div>
                <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "entity-table-no-searchbar entity-table-padding" : "entity-table-no-searchbar-rtl entity-table-padding-rtl"}>
                    <div
                        className={this.state.showing
                            ? "panel"
                            : ([localStorage.getItem('selectedLanguageCode') == 1
                                ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left"
                                : "col-lg-4 col-md-4 col-sm-12 col-xs-12 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default animate-table pull-right"])}>
                        <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                            <div className="panel search-input-wrapper">
                                <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "panel-body search-input" : "panel-body search-input"}>
                                    <input
                                        type="text"
                                        className="form-search-admin"
                                        placeholder="Search ..."
                                        value={this.state.search}
                                        onChange={this
                                            .updatesearch
                                            .bind(this)} />

                                    <span className="btn-search-edit">
                                        <button type="button">
                                            <i className="glyphicon glyphicon-search btn-search" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </Animated>


                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>

                            <div className="panel">
                                <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "panel full-height" : "panel full-height rtl-flip"}>
                                    <div className="panel">
                                        <div className="panel-body">
                                            <div>
                                                <div className="container-fluid">
                                                    <br />

                                                    <div className="slidebottom">
                                                        <div className="row">
                                                            <div
                                                                className="col-md-3 col-lg-2 col-sm-1 col-xs-2">
                                                                <span className='pics'>
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>


                                                            {isDesktop ? (
                                                                <div onClick={this.handleClick.bind(this, 'language')} className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                    <div id="profile" className="speech-bubble-left-black">
                                                                        <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Language and Input tools</span>

                                                                        <span className="pull-right">
                                                                            <i id="scaled-arrow" className="fa fa-arrow-right" />
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            ) : null}

                                                            {!isDesktop ? (
                                                                <div
                                                                    onClick={this
                                                                        .handleClickModal.bind(this, 'language')}
                                                                    className="col-md-9 col-lg-10 col-sm-11 col-xs-10" data-toggle="modal" data-target="#basicModal">
                                                                    <div id="profile" className="speech-bubble-left-black">
                                                                        <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Language & Input Tools</span>

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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'device')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Delete Activity and Notifications</span>

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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'deleteAccount')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Delete your account or service</span>
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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'accountHistory')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Account History</span>

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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'accessibility')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Accessibility</span>
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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'securityInfo')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Security Info</span>
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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'addUsersLinkUsers')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Add Users & Link Users</span>
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
                                                                    <i id="" className="fa fa-cog icon-black-cog" />
                                                                </span>

                                                            </div>
                                                            <div
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, 'editDashboard')}
                                                                className="col-md-9 col-lg-10 col-sm-11 col-xs-10">
                                                                <div id="profile" className="speech-bubble-left-black">
                                                                    <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-truncate" : "text-truncate pull-left rtl-flip"}>Edit DashBoard</span>
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
                    </div>

                    {!isDesktop ? (
                        <div className="modal fade" id="basicModal" tabIndex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title" id="myModalLabel">Language & Input Tools</h4>
                                        <button type="button" className="close mobile-close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="modal-body">

                                        <div className="container-fluid inner-modal-info">
                                            <LanguageAndInputTools />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {isDesktop ? (
                        <div
                            className={this.state.showing
                                ? "panel panel-default main-body-height"
                                : ([localStorage.getItem('selectedLanguageCode') == 1
                                    ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                    "t-12 col-xs-offset-12 panel panel-default main-body-height"
                                    : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-rig" +
                                    "ht rtl-main-body-height rtl-flip"])}>
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>

                                <div className="container-fluid">
                                    <div>


                                        <br /></div>
                                    {this.state.render !== '' && <div className="details">
                                        {this._renderSubComp()}
                                    </div>
                                    }
                                    {this.state.render === '' && <span>
                                        <h5 className={(localStorage.getItem('selectedLanguageCode') == 1) ? "text-center text-vertical" : "rtl-flip text-center text-vertical"}><br /><br /><br />
                                            <i id="" className="fa fa-cog icon-truck-gold-no-circle" />
                                            <br />
                                            Select a Setting</h5>
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

export default Settings;