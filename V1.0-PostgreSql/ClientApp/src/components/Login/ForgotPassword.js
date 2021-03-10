import React, { Component } from 'react';
import * as config from '../../config';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';
type Props = {
    t: T
}
export class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.handleForgotPassword = this
            .handleForgotPassword
            .bind(this);
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    closeForgotPopup = (e) => {
        this.props.closeForgotPopup();
    }
    handleForgotPassword(e) {
        e.preventDefault();
        fetch(config.webApiUrl() + 'aptc_forgotpassword/' + this.state.email)
            .then(response => response.json())
            .then(data => {
                alert(data);
                this.closeForgotPopup();
            }).catch((error) => {
                alert(error);
            });
    }
    render() {
        return (
            <div id="background">
                <form onSubmit={this.handleForgotPassword}>
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-3"></div>
                        <div className="col-md-4 col-lg-4 col-sm-6">
                            <br /><br /><br /><br />
                            <div className="center">
                                <div className="jumbotron">
                                    <span>
                                        <h3><p><strong>Forgot Password </strong></p></h3>
                                    </span>
                                    <br />
                                    <p>Please enter your register email</p>
                                    <br />
                                    <div className="form-group">
                                        <div className="bordered-loginbar ">
                                            <input
                                                type="email"
                                                value={this.state.email}
                                                name="email"
                                                required
                                                onChange={this.onChange}
                                                className="form-control myformcontrol center "
                                                aria-describedby="emailHelp"
                                                placeholder="please enter you email" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >{this.props.t('Continue')}</button>
                                    <button type="button" data-dismiss="modal" aria-label="Close"
                                        style={{marginLeft:'10px'}}
                                        className="btn btn-primary "
                                        onClick={() => this.closeForgotPopup()}>
                                        Cancel</button>
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
export default translate(ForgotPassword);
