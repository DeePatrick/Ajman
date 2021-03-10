import React, { Component } from 'react';
import Header from '../Header/Header';
import Footers from '../Footer/Footer';
import Logo from '../shared/logo/logo';
import axios from 'axios';
import Otp from './OtpScreen'; 
import ForgotPassword from './ForgotPassword';
import Loader from '../../components/loader';
import * as config from '../../config';
import CreateAccount from '../Account/Create';
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../language/static_content_english_cust.json';
import ar from '../../language/static_content_arabic_cust.json';
import type { T } from 'react-multi-lang';
import { setLanguage } from 'react-multi-lang';
type Props = {
    t: T
}

class Layout extends Component {
    displayName = Layout.name
    constructor(props) {
        super(props);
        setTranslations({ ar, en })
        if (localStorage.getItem('selectedLanguageCode') === '2') {
            setDefaultLanguage('ar');
        }
        else {
            setDefaultLanguage('en');
        }

        this.state = {
            showing: true,
            email: '',
            password: '',
            Forgot_password: '',
            individualid: '',
            loading: false,
            isSelectLang: true,
            userName: '',
            mobileno:'',
            langcode: 0,
            langid: 0,
            individualDetails: {},
            langList: [],
            logTime: '',
            isCreate: false,
            isLogin: false,
            isSendOtp: false,
            isMatchOtp: false,
            isForgot:false,
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
            direction: ""
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
        this.creatAccount = this
            .creatAccount
            .bind(this);

        this.showDashBoard = this
            .showDashBoard
            .bind(this);

        this.forgotpassword = this
            .forgotpassword
            .bind(this);

        this.closeForgotPopup = this
            .closeForgotPopup
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
            var date = new Date();
            var loginTime = new Date(localStorage.getItem('logTime'));
            loginTime = loginTime.getTime();
            var currentTime = date.getTime();
            if (loginTime > currentTime) {
                tempmatches.IsSuccess = true;
                this.setState({ showing: false });
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

        this.toggleHtmlBodyDirection();
    }
    onContinue(e) {
        if (this.state.langid > 0) {
            this.setState({ isSelectLang: false, showing: true, isLogin: true, isSendOtp: false, isMatchOtp: false });
        }
        else {
            alert('please select language');
        }


    }

    toggleHtmlBodyDirection = () => {
        if (localStorage.getItem('selectedLanguageCode') === '2') {
            document.body.style.direction = "rtl";
        }

    }


    onLangChange(e) {
        this.setState({ langid: e.target.value });
        if (e.target.selectedIndex > 0) {
            localStorage.setItem('selectedLanguage', e.target.value);
            localStorage.setItem('selectedLanguageCode', this.state.langList[e.target.selectedIndex - 1].code);
           
            if (localStorage.getItem('selectedLanguageCode') === '2') {
                setDefaultLanguage('ar');
                this.setState({ direction: 'RTL' });
            }
            else {
                setDefaultLanguage('en');
                this.setState({ direction: 'LTL' });
            }
        }
    }
    closeForgotPopup = (e) =>
    {
        this.setState({ isSelectLang: false, showing: true, isLogin: true, isSendOtp: false, isMatchOtp: false,isForgot:false });
    }
    forgotpassword = (e) => {
        this.setState({ isSelectLang: false, isLogin: false, isSendOtp: false, isMatchOtp: false });
        this.setState({ isForgot: true });
    }
    showDashBoard = (individualDetails) => {
        this.setState({ individualDetails: individualDetails });
        var date = new Date(); // get current date
        date.setHours(date.getHours(), date.getMinutes() + 30, 0, 0);
        localStorage.setItem('logTime', date); 
        localStorage.setItem('userid', individualDetails.userid);
        localStorage.setItem('userName', individualDetails.nameen);
        localStorage.setItem('emirtaiId', individualDetails.emiratesid);
        localStorage.setItem('individualid', individualDetails.individualid);
        localStorage.setItem('indprofilephoto', individualDetails.indprofilephoto);
        this.setState({ userName: individualDetails.nameen });
        this.setState({ loading: false });
        this.setState({ isSelectLang: false, showing: false, isLogin: false, isSendOtp: false, isMatchOtp: true });
    }
    handleChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    creatAccount = (e) => {
        ///this.setState({isCreate: true });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var user = {};
        user.email = this.state.email;
        user.password = this.state.password;
        user.docType = 'individual';
        var data = JSON.stringify(user);
        axios
            .post(config.webApiUrl() + 'aptc_sendotp', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {

                this.setState({ loading: false});
                if (response.data.MobileNo!==undefined) {
                    this.setState({ loading: false, mobileno: response.data.MobileNo });
                }
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
        const { translate } = this.props
        return (
            <div className="whole-app">
                {this.state.loading === true && <div>
                    <Loader />
                </div>}
                {
                    this.state.isMatchOtp === true && this.state.showing === false &&
                    <div className="view" dir={this.state.direction}>
                        <div className="col-md-12 col-lg-12 col-sm-12" >
                            <Header userName={this.state.userName} user={this.state.user} />
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12" >
                            {/* <div className="col-md-1 col-lg-1 col-sm-1" style={{ marginRight: '10px' }} >
                                <Sidebar userName={this.state.userName} user={this.state.user} langValue={this.state.langValue} />
                            </div>*/}
                            <div className="row">
                                <div className="inner-view-new" >
                                    {this.props.children}
                                </div>
                            </div>   
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12" >
                            <div className="row">
                                <Footers user={this.state.user} />
                            </div>
                        </div>
                    </div>
                }
                {this.state.showing === true &&
                    <div id="background" >
                        <div className="center">
                            {
                                this.state.isSelectLang === true &&

                                <div className="container ctn-langLayout">

                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">

                                            <h2 className="white-coloring">Welcome to the Ajman GO Customer Portal</h2>
                                        </div>
                                    </div>

                                    <div className="row ctn-lang">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="form-group">

                                                <select className="language" required value={this.state.langid} onChange={this.onLangChange}>
                                                <option value="">{this.props.t("Plaese_Select_Language")}</option>
                                                    {this.state
                                                        .langList
                                                    .map((lang, index) => <option key={index} value={lang.commonmasterid}>
                                                        {index === 0 &&
                                                            <span>
                                                                {this.props.t("English")}
                                                            </span>

                                                        }
                                                        {index === 1 &&
                                                            <span>
                                                                {this.props.t("Arabic")}
                                                            </span>

                                                        }
                                                    </option>)}
                                                </select>
                                                <button onClick={this.onContinue} type="button" className="btn-signin">Select Language</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.isLogin === true &&
                                <div className="container ctn-loginLayout">
                                    <div className="ctn-login">
                                        <div id="login">
                                            <form onSubmit={this.handleSubmit}>

                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12"
                                                            data-toggle="modal"
                                                            data-target="#createModal">
                                                            <button type="button" onClick={this.creatAccount()} className="btn-signup">{this.props.t('Create_Account')}</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <img
                                                        className="padding-icon"
                                                        src={require('../../assets/big logo.png')}
                                                        width="150"
                                                        alt="logo" />
                                                    <Logo />

                                                    <div className="row">
                                                        <div className="bordered-loginbar">
                                                            <input
                                                                value={this.state.email}
                                                                onChange={this.handleChange}
                                                                type="email"
                                                                name="email"
                                                                required
                                                                className="form-control mineformcontrol "
                                                                id="exampleInputEmail1"
                                                                aria-describedby="emailHelp"
                                                                placeholder={this.props.t('Username')} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="bordered-loginbar">
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

                                                </div>
                                                <div className="form-group" >
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                            <button type="button" onClick={this.forgotpassword} className="btn btn-link pull-right make-white">{this.props.t('Forgot_password')}</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12"><button type="submit" className="btn-signin">{this.props.t('Sign_in')}</button></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                this.state.isSendOtp === true &&
                                <div>
                                    <Otp matches={this} showDashBoard={this.showDashBoard.bind(this)} />
                                </div>
                            }
                        {
                            this.state.isForgot === true &&
                            <div>
                                <ForgotPassword matches={this} closeForgotPopup={this.closeForgotPopup.bind(this)} />
                            </div>
                        }
                        </div>
                        <CreateAccount langid={this.state.langcode} />
                    </div>
                }
            </div>
        );
    }
}
export default translate(Layout);
