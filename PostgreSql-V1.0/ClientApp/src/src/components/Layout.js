import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Sidebar from './landing/SideBar';
import Header from './landing/Header';
import Logo from './shared/logo/logo';
import axios from 'axios';
import Otp from './login/internal/OtpScreen';
import Loader from './loader';
import * as config from '../config';

import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../language/static_content_english_cust';
import ar from '../language/static_content_arabic_cust';
import type { T } from 'react-multi-lang';
import { setLanguage, getLanguage } from 'react-multi-lang';


type Props = {
    t: T
}

setTranslations({ ar, en });
setDefaultLanguage('en');


class Layout extends Component {
    displayName = Layout.name

    constructor(props) {
        super(props);

        this.state = {
            showing: true,
            email: '',
            password: '',
            Forgot_password: '',
            individualid: '',
            userid: '',
            loading: false,
            isSelectLang: true,
            username: '',
            langcode: 0,
            langid: 0,
            userDetails: {},
            langList: [],
            logTime: '',
            isCreate: false,
            isLogin: false,
            isSendOtp: false,
            isMatchOtp: false,
            sendotps: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            },
            matches: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            },
            userData: []
        };

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.onContinue = this
            .onContinue
            .bind(this);

        this.onLangChange = this
            .onLangChange
            .bind(this);

        this.showDashBoard = this
            .showDashBoard
            .bind(this);
    }


    componentWillMount() {
        fetch(config.webApiUrl() + 'aptc_getCommonMasters/1/26')
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                if (data[0].commonmasterid !== undefined) {
                    this.setState({ langList: data });
                    localStorage.setItem('selectedLanguage', data[0].commonmasterid);
                }
                else {
                    alert(data);
                }
            }).catch((error) => {
                alert(error.message);
                this.setState({ loading: false });
            });


        let tempmatches = Object.assign({}, this.state.sendotps);
        if (localStorage.getItem('logTime') !== undefined) {
            var date = new Date(); // get current date
            var loginTime = new Date(localStorage.getItem('logTime'));
            loginTime = loginTime.getTime();
            var currentTime = date.getTime();
            if (loginTime > currentTime) {
                tempmatches.IsSuccess = true;
                this.setState({ showing: true });
                this.setState({ isSelectLang: false, showing: false, isLogin: false, isSendOtp: false, isMatchOtp: true });
            }
            else {
                localStorage.clear();
                tempmatches.IsSuccess = false;
                this.setState({ isSelectLang: true, showing: true, isLogin: false, isSendOtp: false, isMatchOtp: false });
            }
        }
        else {
            localStorage.clear();
            tempmatches.IsSuccess = true;
            this.setState({ isSelectLang: true, showing: true, isLogin: false, isSendOtp: false, isMatchOtp: false });
        }
        this.setState({ sendotps: tempmatches });


        this.toggleSideBarDirection();

    }




    onContinue(e) {
        if (this.state.langid > 0) {
            this.setState({ isSelectLang: false, showing: true, isLogin: true, isSendOtp: false, isMatchOtp: false });
           
        }
        else {
            alert('please select language');
        }

    }

    toggleSideBarDirection = () => {
        if (localStorage.getItem('selectedLanguageCode') == 2) {
            document.body.style.direction = "rtl";
        }

    }



    onLangChange(e) {
        this.setState({ langid: e.target.value });
        if (e.target.selectedIndex > 0) {
            localStorage.setItem('selectedLanguage', e.target.value);
            localStorage.setItem('selectedLanguageCode', this.state.langList[e.target.selectedIndex - 1].code);

            if (localStorage.getItem('selectedLanguageCode') == 2) { setLanguage('ar'); }
            else { setLanguage('en'); }
        }
    }


    showDashBoard = (userDetails) => {
        this.setState({ userDetails: userDetails });
        var date = new Date(); // get current date
        date.setHours(date.getHours(), date.getMinutes() + 30, 0, 0);
        localStorage.setItem('logTime', date);
        localStorage.setItem('userName', userDetails.username);
        localStorage.setItem('userid', userDetails.userid);
        this.setState({ userName: userDetails.username });
        this.setState({ loading: false });
        this.setState({ isSelectLang: false, showing: false, isLogin: false, isSendOtp: false, isMatchOtp: true });
    }

    creatAccount = (e) => {
        ///this.setState({isCreate: true });
    }


    handleChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        console.log(this.state);
        var user = {};
        user.email = this.state.email;
        user.password = this.state.password;
        user.doctype = 'user';
        user.usertype = 'user';

        var data = JSON.stringify(user);
        axios
            .post(config.webApiUrl() + 'aptc_sendotp', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false });
                this.setState({ isSelectLang: false, isLogin: false, isSendOtp: true, isMatchOtp: false });
            })
            .catch((error) => {
                if (error.response !== null) {
                    if (error.response.data.IsSuccess !== null) {
                        this.setState({ loading: false });
                        alert(error.response.data.ResponseMessage);
                    }
                }
                else {
                    alert("Login Fail");
                }
            });
    }



    render() {
        const { translate } = this.props;
        console.log("individual details!" + this.state.userDetails);
        return (
            <div className="whole-app">
                {this.state.loading === true && <div>
                    <Loader />
                </div>}
                {
                    this.state.isMatchOtp === true && this.state.showing === false &&
                    <div className="view">
                        <Sidebar user={this.state.user} />
                        <Header username={this.state.username} user={this.state.user} />
                        <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "arab-overlay" : "overlay"} >
                            {this.props.children}
                        </div>
                    </div>
                }
                {this.state.showing === true &&
                    <div id="background">
                        <div className="center">
                            {
                                this.state.isSelectLang === true &&
                                <div className="form-group" style={{ paddingTop: '65px' }}>
                                    <img
                                        className="padding-icon"
                                        src={require('../assets/big logo.png')}
                                        width="150"
                                        alt="logo" />
                                    <Logo />

                                    <br />
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <h4 className="center" style={{ marginTop: '0px', color: 'white' }}>Welcome to the Ajman GO Staff Portal</h4>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: '20px' }}>
                                        <div className="col-lg-4 col-md-4" />
                                        <div className="col-md-4 col-lg-4">
                                            <div className="form-group">
                                                <select className="selectpicker" required value={this.state.langid} onChange={this.onLangChange}>
                                                    <option value="" data-content="<span class='select-picker-font-size  select-picker-bg'>Select Language</span>">Select Language</option>
                                                    {this.state.langList.map((lang, index) => <option style={{ color: '#000!important' }} key={index} value={lang.commonmasterid}>{lang.name}</option>)}
                                                </select><br />
                                                <button style={{ marginTop: '20px' }} onClick={this.onContinue} type="button" className="btn-signin">Continue</button>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4" />
                                    </div>
                                </div>

                            }
                            <br />
                            {this.state.isLogin === true &&
                                <div>

                                    <br />
                                    <div id="login">
                                        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                            <form onSubmit={this.handleSubmit}>
                                                <br />
                                                <div className="form-group">
                                                    <img
                                                        className="padding-icon"
                                                        src={require('./../assets/big logo.png')}
                                                        width="150"
                                                        alt="logo" />
                                                    <Logo />

                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4" />
                                                        <div className="col-md-4 col-lg-4">
                                                            <div className="bordered-loginbar" dir={(localStorage.getItem('selectedLanguageCode') == 2) ? "rtl" : "ltr"}>
                                                                <input
                                                                    value={this.state.email}
                                                                    onChange={this.handleChange}
                                                                    type="email"
                                                                    name="email"
                                                                    required
                                                                    className="form-control mineformcontrol "
                                                                    id="exampleInputemail1"
                                                                    aria-describedby="emailHelp"
                                                                    placeholder={this.props.t('Username')} />
                                                            </div>
                                                            <div className="bordered-loginbar" dir={(localStorage.getItem('selectedLanguageCode') == 2) ? "rtl" : "ltr"}>
                                                                <input
                                                                    value={this.state.password}
                                                                    onChange={this.handleChange}
                                                                    type="password"
                                                                    name="password"
                                                                    required
                                                                    className="form-control mineformcontrol "
                                                                    id="exampleInputPassword1"
                                                                    placeholder={this.props.t('Password')} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4" />
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4 col-lg-4 col-sm-2 col-xs-1" />
                                                        <div className="col-md-4 col-lg-4 col-sm-8 col-xs-10">
                                                            <button type="submit" onClick={this.forgotpassword} className={(localStorage.getItem('selectedLanguageCode') == 2) ? "btn btn-link pull-left make-white" : "btn btn-link pull-right make-white"}>{this.props.t('Forgot_password')} </button><br />
                                                            <br /><br /><br />
                                                        </div>
                                                        <div className="col-md-4 col-lg-4 col-sm-2 col-xs-1" />
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-1" />
                                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-10">
                                                            <button type="submit" className="btn-signin">{this.props.t('Sign_in')}</button>
                                                        </div>
                                                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-1" />

                                                    </div>
                                                </div>
                                            </form>
                                        </Animated>
                                    </div>
                                </div>

                            }
                            {
                                this.state.isSendOtp === true &&
                                <div>
                                    <Otp matches={this} showDashBoard={this.showDashBoard.bind(this)} />
                                </div>
                            }

                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default translate(Layout);
