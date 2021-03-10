import React, { Component } from 'react';
import Logo from '../../shared/logo/logo';
import Loader from '../../loader';
import axios from 'axios';
import * as config from '../../../config';
import $ from 'jquery';
import { debug } from 'util';


import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../../language/static_content_english_cust';
import ar from '../../../language/static_content_arabic_cust';

import { setLanguage, getLanguage } from 'react-multi-lang';


export class OtpScreen extends Component {

    constructor(props) {
        super(props);

        setTranslations({ ar, en });
        setDefaultLanguage('en');

        this.state = {
            showing: false,
            email: '',
            individual: {},
            password: '',
            loading: false,
            otp: '',
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

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }
    componentWillMount() {

        if (localStorage.getItem('selectedLanguageCode') == 2) { setLanguage('ar'); }
        else { setLanguage('en'); }
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var sendOtp = {};
        sendOtp.id = this.props.matches.state.email;
        sendOtp.isICA = false;
        sendOtp.otp = this.state.otp;
        sendOtp.usertype = "user";
        sendOtp = JSON.stringify(sendOtp);
        axios
            .post(config.webApiUrl() + 'aptc_matchotp', sendOtp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false });
                debugger;
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
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-3"/>
                        <div className="col-md-4 col-lg-4 col-sm-6">
                            <br /><br /><br /><br />
                            <div className="center">
                                <div className="jumbotron">
                                    <span>
                                        <h3><p><strong>{this.props.t('One_Time_Password')}</strong></p></h3>
                                    </span>
                                    <br />
                                    <p>{this.props.t('Otp_Message')}</p>
                                    <p>{this.props.t('Otp_Expire_Message')}</p>
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
                                    <p className="">{this.props.t('Didnot_recieve_OTP')} <span className="btn-link">{this.props.t('Resend')}</span> </p>
                                    <button id='btnDashboard' type="button" style={{ display: 'none' }} className="btn btn-primary" /><br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >continue</button>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-3"/>
                    </div>
                </form>
            </div>

        );
    }
}
export default translate(OtpScreen);