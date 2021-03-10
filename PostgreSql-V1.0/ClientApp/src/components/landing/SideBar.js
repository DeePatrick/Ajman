import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import * as config from '../../config';
import Logoa from '../shared/logo/AjmanLogoA';
import axios from 'axios';
import { NotificationPopup } from '../notifications/NotificationPopup';
import { Animated } from "react-animated-css";
import { OverlayTrigger } from 'react-bootstrap';
import userNotificationPopover from '../notifications/popovers/popover-hover-focus/UserNotificationPopover';
import enquiryNotificationPopover from '../notifications/popovers/popover-hover-focus/EnquiryNotification';
import companyNotificationPopover from '../notifications/popovers/popover-hover-focus/CompaniesNotificationPopover';
import individualNotificationPopover from '../notifications/popovers/popover-hover-focus/IndividualNotificationPopover';
import PermitNotificationPopover from '../notifications/popovers/popover-hover-focus/PermitNotificationPopover';
import VehiclesNotificationPopover from '../notifications/popovers/popover-hover-focus/VehiclesNotificationPopover';


class Sidebar extends Component {
    displayName = Sidebar.name
    constructor(props, context) {
        super(props, context);

        this.handleClick = e => {
            this.setState({ target: e.target, show: !this.state.show });
        };

        this.state = {
            addClass: true,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassInUser: false,
            addClassPermit: false,
            addClassbackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,

            roleid: 0,
            showing: false,
            email: '',
            password: '',
            logTime: '',
            loading: true,
            otp: '',
            events: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            },
            user: [],
            userData: [],
            notificationData: [],
            notification: {
                roleCode: '',
                deptCode: '',
                notificationType: 1,
                userCode: ''
            }

        };
    }

    componentDidMount() {
        this.state.roleid = localStorage.getItem('roleid');
        this.toggleSideBarDirection();
    }

    getUserInfo() {
        var roleCode = this.state.userData.map(user => user.roles.primaryRole).toString();
        var deptCode = this.state.userData.map(user => user.department).toString();

        let notification = Object.assign({}, this.state.notification);
        notification.roleCode = roleCode;
        notification.deptCode = deptCode;
        this.setState({ notification });
        var item = this.props.notification;

    }

    getUserNotification() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 1;
        this.setState({ notification });
        var myUser = this.props.notification;

        //this.getNotification();
    }

    getEmployeeNotification() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 2;
        this.setState({ notification });
        //this.getNotification();
    }

    getPermitNotification() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 3;
        this.setState({ notification });

        //this.getNotification();
    }

    getCompanyNotification() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 4;
        this.setState({ notification });

        //this.getNotification();
    }

    getVehicleNotifications() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 5;
        this.setState({ notification });
        var veh = this.props.notification;
        //this.getNotification();
    }

    getFinesNotification() {
        let notification = Object.assign({}, this.state.notification);
        notification.notificationType = 6;
        this.setState({ notification });

        //this.getNotification();
    }

    toggleSideBarDirection = () => {
        if (localStorage.getItem('selectedLanguageCode') == 2) {
            document.body.style.direction = "rtl";
        }

    }

    getNotification() {
        var notificate = this.state.notification;
        console.log(notificate);
        var data = JSON.stringify(notificate);

        axios
            .post(config.webApiUrl() + 'aptc_GetNotificationRolewiseUserwise', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false });
                console.log("Status", response.status);
                this.setState({ notificationData: response.data });
            })
            .catch((error) => {
                if (error.response !== undefined) {
                    if (error.response.data.IsSuccess !== undefined) {
                        alert(error.response.data.ResponseMessage);

                    }
                }
                else {
                    alert("Notification Fail:" + error.mesage);
                }
            });
    }

    toggle() {
        this.setState({
            addClass: true,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: false,
            addClassbackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleInUser() {
        this.setState({
            addClass: false,
            addClassInUser: true,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleCompany() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: true,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleEnquiry() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: true,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleExUser() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: true,
            addClassSettings: false,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleSettings() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: true,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleAddPermit() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: true,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: false,
        });
    }

    toggleAddPermitTab() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: true,
            addClassBackOfficeCompany: false,
            addClassVehicle: false,
            addClassPermitTab: true,
        });
    }

    toggleAddVehicle() {
        this.setState({
            addClass: false,
            addClassInUser: false,
            addClassCompany: false,
            addClassEnquiry: false,
            addClassExUser: false,
            addClassSettings: false,
            addClassPermit: false,
            addClassBackOfficeCompany: false,
            addClassVehicle: true,
            addClassPermitTab: false,
        });
    }
    render() {
        let boxClass = ["highlighted"];
        console.log("notificationType " + this.state.notification.notificationType);
        console.log("roleCode " + this.state.notification.roleCode);
        var time = this.state.logTime;
        return (

            <div className='main-nav' style={{ zIndex: '3' }}>
                <div className='navbar navbar-inverse'>
                    <div className='navbar-header'>
                        <button
                            type='button'
                            className='navbar-toggle'
                            data-toggle='collapse'
                            data-target='.navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar' />
                            <span className='icon-bar' />
                            <span className='icon-bar' />
                        </button>
                        <Link id="description" className='navbar-brand' to={'/'}>
                            <Logoa />
                        </Link>
                    </div>
                    <div className='clearfix' />
                    <div className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav'>
                            <li id="icon-home">
                                <Link to={'/'} exact className={this.state.addClass ? "highlighted active" : "null"} onClick={this.toggle.bind(this)}>
                                    <div
                                        className="icons"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Home">
                                        <i className="fa fa-home icon-sidebar" />
                                        <span className="notify-sidebar">
                                            <label className="label label-danger notify-label" />
                                        </span>
                                    </div>
                                    <div data-container="body" data-toggle="popover" data-placement="right" data-trigger="focus" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
                                </Link>
                            </li>
                            <li id="">
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={userNotificationPopover}>
                                    <Link to={'/users'} className={this.state.addClassInUser ? "highlighted active" : "null"} onClick={this.toggleInUser.bind(this)}>{this.state.addClassInUser ? "" : ""}
                                        <div
                                            className="icons"
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="Internal Users">
                                            <i className="fas fa-user-friends icon-sidebar" />
                                            <span className="notify-sidebar">  <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible><label className="label label-danger notify-label">{this.state.notificationData.length}</label></Animated></span>
                                        </div>
                                    </Link>
                                </OverlayTrigger>
                            </li>

                            {/* {this.state.roleid != '3' && <div> */}
                            <li id="">
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={companyNotificationPopover}>
                                    <Link to={'/company'} className={this.state.addClassCompany ? "highlighted active" : "null"} onClick={this.toggleCompany.bind(this)}>{this.state.addClassCompany ? "" : ""}
                                        <div
                                            className="icons"
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="Companies">
                                            <i className="fas fa-building icon-sidebar" /><span className="notify-sidebar">  <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible><label className="label label-danger notify-label">{this.state.notificationData.length}</label></Animated></span>
                                        </div>
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            {/* </div> */}


                            {/*This is for New Left Navigation bar by Vishnu RoleId 3 For back office Start here */}
                            {/* {
                                this.state.roleid === '3' &&
                                <div> 
                                    <li id="">
                                        <OverlayTrigger
                                            trigger={['hover', 'focus']}
                                            placement="right" overlay={companyNotificationPopover}>
                                            <Link to={'/companytab'} className={this.state.addClassCompany ? "highlighted active" : "null"} onClick={this.toggleCompany.bind(this)}>{this.state.addClassCompany ? "" : ""}
                                                <div
                                                    className="icons"
                                                    data-toggle="tooltip"
                                                    data-placement="right"
                                                    title="Company Approve">
                                                    <i className="fas fa-building icon-sidebar" /><span className="notify-sidebar">
                                                        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                                            <label className="label label-danger notify-label">{this.state.notificationData.length}</label>
                                                        </Animated></span>
                                                </div>
                                            </Link>
                                        </OverlayTrigger>
                                    </li>
                                    <li id="">
                                        <OverlayTrigger
                                            trigger={['hover', 'focus']}
                                            placement="right" overlay={PermitNotificationPopover}>
                                            <Link to={'/permittab'} className={this.state.addClassPermitTab ? "highlighted active" : "null"} onClick={this.toggleAddPermitTab.bind(this)}>{this.state.addClassPermitTab ? "" : ""}
                                                <div className="icons" data-toggle="tooltip" data-placement="right" title="Permit Approve">
                                                    <i class="fa fa-ticket-alt icon-sidebar rotate-only" />
                                                    <span className="notify-sidebar">
                                                        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                                            <label className="label label-danger notify-label">{this.state.notificationData.length}</label>
                                                        </Animated></span>
                                                </div>
                                            </Link>
                                        </OverlayTrigger>
                                    </li>
                                    <li id="">
                                        <OverlayTrigger
                                            trigger={['hover', 'focus']}
                                            placement="right" overlay={VehiclesNotificationPopover}>
                                            <Link to={'/vehicletab'} className={this.state.addClassVehicle ? "highlighted active" : "null"} onClick={this.toggleAddVehicle.bind(this)}>{this.state.addClassVehicle ? "" : ""}
                                                <div
                                                    className="icons"
                                                    data-toggle="tooltip"
                                                    data-placement="right"
                                                    title="Vehicle Approve">
                                                    <i className="fas fa-truck icon-sidebar" /><span className="notify-sidebar">
                                                        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                                            <label className="label label-danger notify-label">{this.state.notificationData.length}</label></Animated>
                                                    </span>
                                                </div>
                                            </Link>
                                        </OverlayTrigger>
                                    </li>
                            {/*  </div>
                            } */}
                            {/*This is for New Left Navigation bar by Vishnu RoleId 3 For back office End here  */}

                            <li id="">
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={enquiryNotificationPopover}>
                                    <Link to={'/enquiry'} className={this.state.addClassEnquiry ? "highlighted active" : "null"} onClick={this.toggleEnquiry.bind(this)}>{this.state.addClassEnquiry ? "" : ""}
                                        <div className="icons" data-toggle="tooltip" data-placement="right" title="Enquiry">
                                            <i className="fa fa-exclamation-circle icon-sidebar" />
                                            <span className="notify-sidebar">
                                                <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                                    <label className="label label-danger notify-label">{this.state.notificationData.length}</label>
                                                </Animated>
                                            </span>
                                        </div>
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li id="">
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={individualNotificationPopover}>
                                    <Link to={'/people'} className={this.state.addClassExUser ? "highlighted active" : "null"} onClick={this.toggleExUser.bind(this)}>{this.state.addClassExUser ? "" : ""}
                                        <div className="icons" data-toggle="tooltip" data-placement="right" title="Individuals">
                                            <i className="fas fa-user-alt icon-sidebar" />
                                            <span className="notify-sidebar">  <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible><label className="label label-danger notify-label">{this.state.notificationData.length}</label></Animated></span>
                                        </div>
                                    </Link>
                                </OverlayTrigger>
                            </li>
                            <li className="">
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="right"
                                    overlay={userNotificationPopover}>
                                    <Link to={'/settings'} className={this.state.addClassSettings ? "highlighted active" : "null"} onClick={this.toggleSettings.bind(this)}>{this.state.addClassSettings ? "" : ""}

                                        <div className="icons" data-toggle="tooltip" data-placement="right" title="Settings">
                                            <i className="fa fa-cog icon-sidebar" />
                                        </div>

                                    </Link>
                                </OverlayTrigger>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Sidebar;