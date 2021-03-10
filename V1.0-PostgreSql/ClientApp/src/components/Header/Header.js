import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import * as config from '../../config';
import $ from 'jquery';
import ChangePassword from '../Account/ChangePassword';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';
type Props = {
    t: T
}

export class Header extends Component {
    displayName = Header.name
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            userName: localStorage.getItem('userName'),
            individual: {},
            password: '',
            loading: true,
            isChangePassword: true,
            otp: '',
            seconds: 0,
            profilephoto: '',
            permissionlist: '',

            events: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            },
            permission: {
                home: 'home',
                locations: 'locations',
                companies: '',
                vehicles: '',
                enquerys: '',
                employee: '',
                permits: '',
                setting: 'settings'
            },

        };

        this.logOut = this
            .logOut
            .bind(this);
        this.changePassword = this
            .changePassword
            .bind(this);

    }
    componentWillMount() {

        ////this.setState({ profilephoto: localStorage.getItem('profilephoto') });
        //fetch(config.webApiUrl() + 'aptc_employee_edit/'+ localStorage.getItem('individualid'))
        //    .then(response => response.json())
        //    .then(data => {
        //        if (data.profilephoto !== undefined) {
        //            this.setState({ profilephoto: localStorage.getItem('indprofilephoto') });
        //        }
        //    });
        this.getMenuandPermisssion();

    }
    componentDidMount() {
        //this.setState({ userName: localStorage.getItem('userName') });
        this.interval = setInterval(() => this.tick(), 360000);
    }
    componentWillReceiveProps(nextProps) {
        $('#icon-pics').attr("src", localStorage.getItem('indprofilephoto'));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    getMenuandPermisssion() {
        var permission = this.state.permission;
        fetch(config.webApiUrl() + 'aptc_RolePermissions/' + localStorage.getItem('userid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ permissionlist: data });
                $.each(data, function (key, value) {
                    switch (value.menunameen) {
                        case "Companies":
                            permission.companies = value.menunameen;
                            break;
                        case "Vehicles":
                            permission.vehicles = value.menunameen;
                            break;
                        case "Permits":
                            permission.permits = value.menunameen;
                            break;
                        case "Complains / Enquires":
                            permission.enquires = value.menunameen;
                            break;
                        case "Employee":
                            permission.employees = value.menunameen;
                            break;
                    }
                })
                this.setState({ permission: permission });
            });
    }
    tick() {

        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }
    handleRoleChange = (e) => {
        this.setState({ nationality: e.target.value });
    }

    logOut() {
        localStorage.clear();
        var date = new Date();
        localStorage.setItem('logTime', date);
        window.location.href = config.logOutUrl();
    }
    changePassword() {
        this.setState({ isChangePassword: true });
    }
    render() {
        const { profilephoto, permission, permissionlist } = this.state;
        return (
            <div className="header">
                <div className="">
                    <div className="row top-nav">
                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle hamburger collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <div id="navbar" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/AboutUs'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('ABOUT_US')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/Services'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('SERVICES')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/RulesRegulations'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('RULES_And_REGULATIONS')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/OpenData'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('OPEN_DATA')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/Eparticipation'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('PARTICIPATION')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/Media'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('MEDIA')}
                                                </NavLink>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#">
                                                <NavLink to={'/Contact'} className="nav-item-top nav-link" id="navLink">
                                                    {this.props.t('CONTACT')}
                                                </NavLink>
                                            </a>
                                        </li>
                                    </ul>

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle top-nav-fa" aria-hidden="true"></i></a>
                                            <ul className="dropdown-menu">
                                                <li id="icon-marker">
                                                    <div className="dropdown-spacing">
                                                        <NavLink style={{ color: '#fff', fontSize: '14px', textDecoration: 'none' }} to={'/MyAccount'} >
                                                            {this.props.t('My_Account')}
                                                        </NavLink>
                                                    </div>
                                                </li>
                                                <li id="icon-marker" style={{ color: '#fff', fontSize: '14px', textDecoration: 'none' }} data-placement="right" title="Change Password" data-toggle="modal" data-target="#changePasswordhModal" onClick={() => this.changePassword()}>
                                                    <div className="dropdown-spacing">
                                                        {this.props.t('Change_Password')}
                                                    </div>
                                                </li>
                                                <li id="icon-marker" style={{ color: '#fff', fontSize: '14px', textDecoration: 'none' }} onClick={() => this.logOut()} data-toggle="tooltip" data-placement="right" title="Log out">
                                                    <div className="dropdown-spacing">
                                                        {this.props.t('Log_Out')}
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-language top-nav-fa" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-cog top-nav-fa" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-list-alt top-nav-fa" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="row">
                        <div className="ajman-logos">
                            <div className="ajman-logo-left logo">
                                <div className="ajman-logo-left logo" style={{ marginRight: '10px' }}><img src={require('../../assets/ptc-logo.png')} /></div>
                            </div>
                            <div className="ajman-logo-right logo">
                                <div className="ajman-logo-right logo">
                                    <img src={require('../../assets/ajman-gov.png')} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle hamburger collapsed" data-toggle="collapse" data-target="#navbarMain" aria-expanded="false" aria-controls="navbar">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <div id="navbarMain" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav">

                                        {/*permission.companies === "Home" &&*/
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/'} exact >
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                                <i className="fa fa-home menu-icon">
                                                                    <span className="label label-danger notify-label">{this.state.seconds}</span>
                                                                </i>
                                                            </div>
                                                            <div className="row menu-text">
                                                                {this.props.t('Home').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {/*permission.companies === "Location" &&
                                            <li>
                                                <a href="#">
                                                    <NavLink to={'/location'} >
                                                        <a className="nav-link" href="#">
                                                        <div className="row">
                                                            <i className="fa fa-map-marker"></i>
                                                            </div>
                                                            <div className="row">
                                                            {this.props.t('Location').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        */}

                                        {permission.vehicles === "Vehicles" &&
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/vehicles'} >
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                                <i className="fa fa-truck menu-icon">
                                                                    <span className="label label-danger notify-label">{this.state.seconds}</span>
                                                                </i>
                                                            </div>
                                                        <div className="row menu-text">
                                                                {this.props.t('Vehicle_Hire').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {permission.employees === "Employee" &&
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/Employee'}>
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                            <i className="fa fa-user menu-icon">
                                                                    <span className="label label-danger notify-label">{this.state.seconds}</span>
                                                                </i>
                                                            </div>
                                                        <div className="row menu-text">
                                                                {this.props.t('Employee').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {permission.enquires === "Complains / Enquires" &&
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/Enquiry'} >
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                            <i className="fa fa-exclamation-circle menu-icon"></i>
                                                            </div>
                                                        <div className="row menu-text">
                                                                {this.props.t('Enquiry').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {permission.permits === "Permits" &&
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/Permit'} >
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                            <i className="fa fa-ticket menu-icon">
                                                                    <span className="label label-danger notify-label">{this.state.seconds}</span>
                                                                </i>
                                                            </div>
                                                        <div className="row menu-text">
                                                                {this.props.t('Permit').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {permission.companies === "Companies" &&
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/settings'} activeClassName='active'>
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                            <i className="fa fa-cog menu-icon">
                                                                    <span className="label label-danger notify-label">{this.state.seconds}</span>
                                                                </i>
                                                            </div>
                                                        <div className="row menu-text">
                                                                {this.props.t('Settings').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                        {/*permission.companies === "Search" &&*/
                                            <li class="nav-item-main">
                                                <a href="#">
                                                    <NavLink to={'/searchNav'} activeClassName='active'>
                                                        <a className="nav-link" href="#">
                                                            <div className="row">
                                                                <i class="fa fa-search menu-icon"></i>
                                                            </div>
                                                            <div className="row menu-text">
                                                                {this.props.t('Search').toUpperCase()}
                                                            </div>
                                                        </a>
                                                    </NavLink>
                                                </a>
                                            </li>
                                        }

                                    </ul>

                                    {/*<ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-user login-user-avatar"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="row">
                                                    <strong>{this.props.t('Welcome')}</strong>
                                                </div>
                                                <div className="row">
                                                    <span id="username"> {this.state.userName}</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>*/}

                                </div>
                            </div>
                        </nav>

                    </div>

                </div>

                {/* Ajman Logos */}
                <ChangePassword />
            </div>)
    }
}
export default translate(Header);