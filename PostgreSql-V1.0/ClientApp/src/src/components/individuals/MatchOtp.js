import React, { Component } from 'react';
import Logo from '../../shared/logo/logo';
import Loader from '../../loader';
import axios from 'axios';
import * as config from '../../../config';
import $ from 'jquery';

export default class MatchOtp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            email: '',
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
        sendOtp.isICA = true;
        sendOtp.otp = this.state.otp;
        sendOtp = JSON.stringify(sendOtp);
        var self = this;
        axios
            .post(config.webApiUrl() + 'aptc_matchotp', sendOtp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("Status", response.status);
                this.setState({ loading: false });
                self.setState({ events: response.data });
                $('#btnDashboard').click();
            })
            .catch((error) => {
                console.log("axios error:", error.data.ResponseMessage);
            });
    }

    render() {
        const { email, password, events } = this.state;
        const { showing } = this.state;
        console.log(showing);
        return (

            <div id="background">
                {this.state.loading === true && <div>
                    <Loader />
                </div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-3"></div>
                        <div className="col-md-4 col-lg-4 col-sm-6">
                            <br /><br /><br /><br />
                            <div className="center">
                                <div className="jumbotron">
                                    <span>
                                        <h3><p><strong>One Time Password (OTP)</strong></p></h3>
                                    </span>
                                    <br />
                                    <p>OTP has been sent to your registered mobile number : xxxxxxx9640</p>
                                    <p>Your OTP will expire in : 04:51</p>
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
                                                placeholder="Enter Six Digit Number" />
                                        </div>
                                    </div>
                                    <br />
                                    {/*onClick={this.props.showDashBoard}*/}
                                    <br /><br />
                                    <button onClick={this.props.showDashBoard} id='btnDashboard' type="button" style={{ display: 'none' }} className="btn btn-primary" />
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >continue</button>
                                    <br />
                                    <br /><br /><br />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-3"></div>
                    </div>
                </form>
            </div>

        );
    }
}
