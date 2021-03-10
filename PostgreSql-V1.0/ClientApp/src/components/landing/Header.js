import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import * as config from '../../config';
import { HeaderNotification } from '../notifications/HeaderNotification';
import DropdownNav from './DropdownNav';
import axios from 'axios';
import Sidebar from './SideBar';
import { Animated } from "react-animated-css";
import LanguageChange from './change-language/LanguageChange';
import RolePermissions from './roles/RolePermissions';


export class Header extends Component {
    displayName = Header.name

    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            email: '',
            password: '',
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
                notificationType: 0,
                userCode: ''
            }

        };
        this.logOut = this
            .logOut
            .bind(this);


    }



    componentWillMount() {
        localStorage.getItem('userid') && this.setState({
            userData: JSON.parse(localStorage.getItem('userid')),
            isLoading: false
        });
        this.toggleSideBarDirection();
    }

    componentDidMount() {
        fetch(config.webApiUrl() + 'aptc_user/' + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('userid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ userData: data, user: data, loading: false });
            });

        this.getUserInfo();
        this.toggleSideBarDirection();
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState.user));
    }


    logOut() {
        localStorage.clear();
        var date = new Date();
        localStorage.setItem('logTime', date);
        window.location.href = config.logOutUrl(); /*'http://localhost:3000';*/
    }


    languageChange() {
        document.getElementById();
    }


    getUserInfo() {
        //var roleCode = this.state.userData.map(user => user.roleid).toString();
        //var deptCode = this.state.userData.map(user => user.departmentid).toString();

        //let notification = Object.assign({}, this.state.notification);
        //notification.roleCode = roleCode;
        //notification.deptCode = deptCode;
        //this.setState({ notification });

        //var item = this.props.notification;


    }

    toggleSideBarDirection = () => {
        if (localStorage.getItem('selectedLanguageCode') == 2) {
            document.body.style.direction = "rtl";
        }

    }

    getUserNotifications() {
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



    render() {
        var userData = this.state.user;
        if (userData.length > 0) {
            var userPhoto = userData.map(user => user.userPhoto);
        }
        return (
            <div>
                <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "rtl-top-nav" : "top-nav"} style={{ zIndex: '2' }}>
                    <ul className={(localStorage.getItem('selectedLanguageCode') == 2) ? "nav nav-pills navbar-margin rtl-nav" : "nav nav-pills navbar-margin"} role="tablist" data-toggle="tooltip" data-placement="right" title="Logo">
                        <li role="presentation">
                            <NavLink to={'/'} activeClassName='active arabic-logo' style={{ marginTop: '-15px' }}>
                                <span className='pics'>
                                    <img className={(localStorage.getItem('selectedLanguageCode') == 2) ? "rtl-logo-resize" : "logo-resize"} src="https://image.ibb.co/ki69Cd/ATlogo.png" width="300" alt="ajman-gov" />
                                </span>
                            </NavLink>
                        </li>

                        <li role="presentation" className="pull-right push-right icon-topbar font-adjust">
                            <div className="">
                                <button id="fire-button" type="button" data-toggle="modal" data-target=".bs-example-modal-sm" onClick={this.getUserNotifications.bind(this)}>
                                    <span className='notifications-outer-bell' data-toggle="tooltip" data-placement="right" title="Notifications">
                                        <i className="fas fa-bell " style={{fontSize:'35px'}} />
                                        <span className="notify-header">
                                            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible><label className="label label-danger notify-label bell-position">{this.state.notificationData ? this.state.notificationData.length : '0'}</label></Animated>
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </li>

                        <li role="presentation" style={{ paddingTop: '0px' }} className="pull-right  icon-topbar font-adjust" data-toggle="tooltip" data-placement="right" title="Help" id="nav-padding">
                            <div> <span className='notifications-outer-bell'>
                                <i className="fas fa-question-circle" style={{ fontSize: '35px' }} />
                            </span></div>

                        </li>
                        <li role="presentation" style={{ paddingTop: '0px', paddingLeft: '2px', paddingRight: '2px' }} className="pull-right  icon-topbar" data-toggle="tooltip" data-placement="right" title="Message" id="nav-padding">
                            <div className="pull-up">
                                <span className=''>
                                    <i className="fas fa-comments" style={{ fontSize: '35px' }} />
                                </span>
                            </div>
                        </li>

                        <li className="forward" role="presentation" style={{ float: 'right', marginTop: '0px', paddingTop: '0px' }} id="nav-padding" data-toggle="tooltip" data-placement="right" title="My Account">
                            <div className="dropdown">
                                <button type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <span >
                                        <img
                                        id="icon-pics"
                                        src={!userPhoto
                                            ? require('../../assets/user-img.png')
                                            : userPhoto}
                                        onError={(e) => {
                                            e.target.src = require('../../assets/user-img.png');
                                        }}
                                        className="img-circle current-user-img"
                                        alt="woman"
                                        height="35"
                                        width="35" />
                                    </span>
                                </button>
                                <ul className="dropdown-menu black-background" aria-labelledby="dropdownMenu1">
                                    <li id="icon-marker">
                                        <div className="dropdown-spacing"> My Account</div>
                                    </li>
                                    <li id="icon-marker" data-toggle="modal" data-target="#languageChangeModal">
                                        <div className="dropdown-spacing">Change Language <i className="glyphicon glyphicon-globe" />
                                        </div>
                                    </li>
                                    <li id="icon-marker" data-toggle="tooltip" data-placement="right" title="Queue Management">
                                        <div className="dropdown-spacing">Queue Management
                                        </div>
                                    </li>
                                    <li id="icon-marker" data-toggle="tooltip" data-placement="right" title="Chart Alerts">
                                        <div className="dropdown-spacing">Alerts
                                        </div>
                                    </li>
                                    <li id="icon-marker" data-toggle="tooltip" data-placement="right" title="Work Queue">
                                        <div className="dropdown-spacing" >Work Queue
                                        </div>
                                    </li>
                                    <li id="icon-marker" data-toggle="modal" data-target="#roleChangeModal">
                                        <div className="dropdown-spacing">Permissions &amp; Role Settings
                                        </div>
                                    </li>
                                    <li role="seperator" className="divider" />
                                    <li id="icon-marker" onClick={() => this.logOut()} data-toggle="tooltip" data-placement="right" title="Log out">

                                        <div className="dropdown-spacing">Log Out  <i className="fa fa-sign-out-alt" /></div>

                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li role="presentation" style={{ float: 'right', marginTop: '0px', paddingTop: '0px' }} id="nav-padding">
                            <DropdownNav />
                        </li>
                    </ul>
                </div>
                <RolePermissions />
                <LanguageChange />
                <HeaderNotification {...this.state} />
                <Sidebar {...this.state} />
            </div >
        );
    }
}
export default Header;