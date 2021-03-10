import React, { Component } from 'react';
import Loader from '../loader';
import axios from 'axios';
import * as config from '../../config';
import $ from 'jquery';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../language/static_content_english_cust.json';
import ar from '../../language/static_content_arabic_cust.json';
import type { T } from 'react-multi-lang';
import { setLanguage, getLanguage } from 'react-multi-lang';

type Props = {
    t: T
}
var timerOn = true;
export class OtpScreen extends Component {

    constructor(props) {
        super(props);

        setTranslations({ ar, en })

        if (localStorage.getItem('selectedLanguageCode') == 2) {
            setDefaultLanguage('ar');
        }
        else {
            setDefaultLanguage('en')
        }

        this.state = {
            showing: false,
            email: '',
            mobileno: '',
            individual: {},
            password: '',
            loading: false,
            isoptsent:false,
            otp: '',
            time: {},
            seconds: 300,
            livetimer: '',
            events: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            }

        };

        this.onChange = this
            .onChange
            .bind(this);
        this.resend = this
            .resend
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    componentWillMount() {

        if (localStorage.getItem('selectedLanguageCode') == 2) { setLanguage('ar'); }
        else { setLanguage('en'); }
    }
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ mobileno: this.props.matches.state.mobileno });
        //this.interval = setInterval(() => this.tick(), 50000);
        this.startTimer();
    }
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    secondsToTime(secs) {
        //let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;
    }
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({ time: this.secondsToTime(seconds), seconds: seconds });
        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            //alert('Your otp has been expired please resend otp');
            this.expiredOtp();
        }
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    expiredOtp() {
        var email = this.props.matches.state.email;
        fetch(config.webApiUrl() + 'aptc_expiredotp/' + this.props.matches.state.email , { method: 'delete' })
            .then(response => response.json())
            .then(data => {
                var abc = "";
            }).catch((error) => {
                alert(error);
            });
    }
    resend = (e) => {
        this.setState({ loading: true });
        var user = {};
        user.email = this.props.matches.state.email;
        user.password = this.props.matches.state.password;
        user.docType = 'individual';
        var data = JSON.stringify(user);
        axios
            .post(config.webApiUrl() + 'aptc_sendotp', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.MobileNo !== undefined) {
                    alert('Your otp has been sent successfully on your registered mobile');
                    this.setState({ seconds: 300 });
                    this.setState({ time: this.secondsToTime(300) });
                    this.timer = 0;
                    this.startTimer();
                }
                this.setState({ loading: false });
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
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var sendOtp = {};
        sendOtp.id = this.props.matches.state.email;
        sendOtp.isICA = false;
        sendOtp.otp = this.state.otp;
        sendOtp.usertype = "individual";
        sendOtp = JSON.stringify(sendOtp);
        axios
            .post(config.webApiUrl() + 'aptc_matchotp', sendOtp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false });
                $('#btnDashboard').click();
                this.props.showDashBoard(response.data);
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    this.setState({ loading: false });
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });
    }
    render() {
        const { showing } = this.state;
        console.log(showing);
        return (
            <div>
                {this.state.loading === true && <div>
                    <Loader />
                </div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="">
                        <div className="col-md-4 col-lg-4 col-sm-3"></div>
                        <div className="col-md-4 col-lg-4 col-sm-6">
                            <br /><br /><br /><br />
                            <div className="center">
                                <div className="jumbotron">
                                    <span>
                                        <h3><p><strong>{this.props.t('One_Time_Password')}</strong></p></h3>
                                    </span>
                                    <br />
                                    <p>{this.props.t('Otp_Message')}<strong> XXXXXX {this.props.matches.state.mobileno.substr(this.props.matches.state.mobileno.length - 4)}</strong></p>
                                    <p>{this.props.t('Otp_Expire_Message')} <strong> {this.state.time.m} : {this.state.time.s}</strong></p>
                                    {this.state.time.s === 0 && this.state.time.m === 0 &&
                                        <p>
                                            <strong style={{ color: 'red' }}>
                                                Your otp has been expired please resend otp</strong>
                                        </p>
                                    }
                                    <br />
                                    <div className="form-group">
                                        <div className="bordered-loginbar ">
                                            <input
                                                type="text"
                                                value={this.state.otp}
                                                name="otp"
                                                required
                                                onChange={this.onChange}
                                                className="form-control myformcontrol center "
                                                aria-describedby="emailHelp"
                                                placeholder={this.props.t('One_time_password')} maxLength="4" />
                                        </div>
                                    </div>
                                    {/*onClick={this.props.showDashBoard}*/}
                                    <p className="">{this.props.t('Didnot_recieve_OTP')} <span className="btn-link" style={{ cursor: 'pointer' }} onClick={this.resend}>
                                        {this.props.t('Resend')}
                                    </span> </p>
                                    <button id='btnDashboard' type="button" style={{ display: 'none' }} className="btn btn-primary" /><br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >{this.props.t('Continue')}</button>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-3" />
                    </div>
                </form>
            </div>

        );
    }
}
export default translate(OtpScreen);
