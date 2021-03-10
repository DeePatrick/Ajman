import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';
import Loader from '../loader';
import {translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';
type Props = {
    t: T
}

class Docs extends Component {
    displayName = Docs.name;
    constructor(props) {
        super(props);
        this.state = {
            userid:0,
            currentpassword: '',
            password: '',
            confirmpassword:''
        };

        this.changePassword = this
            .changePassword
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }

    componentWillMount() {
    }
    //Page Load

    componentWillReceiveProps(nextProps) {
        var userid = localStorage.getItem('userid');
        this.setState({ userid: userid, modifiedby: userid });
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //Save Documents/
    changePassword(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var changepassword1 = JSON.stringify(this.state);
        if (this.state.password !== this.state.confirmpassword) {
            alert("Your password and confirm password do not match");
        }
        axios.put(config.webApiUrl() + 'aptc_changepassword', changepassword1, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert("Your password has been changed successfully.");
            $('.close').click();
        }).catch((error) => {
            this.setState({ loading: false});
            if (error.response !== undefined) {
                alert(error.response.data.ResponseMessage);
            }
            else {
                alert(error.message);
            }
        });
    }
    render() {
        return (
            <div
                className="modal"
                id="changePasswordhModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="changePasswordhModalLabel">
                <div className="modal-dialog modal-xl" role="password">
                    <div className="modal-content" style={{ width: '100%', minHeight: '300px' }}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form name="form" onSubmit={this.changePassword}>
                            <div className="modal-body">
                                {this.state.loading === true
                                    && <div><Loader /></div>}
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input required
                                            className="edit-form"
                                            name="currentpassword"
                                            value={this.state.currentpassword}
                                            onChange={this.onChange}
                                            type="password"
                                            placeholder="current password" />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input required
                                            className="edit-form"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            type="password"
                                            placeholder="current password" />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input required
                                            className="edit-form"
                                            name="confirmpassword"
                                            value={this.state.confirmpassword}
                                            onChange={this.onChange}
                                            type="password"
                                            placeholder="current password" />
                                    </div>
                                </div>

                                <button type="button" data-dismiss="modal" aria-label="Close"
                                    style={{ marginLeft: '10px' }}
                                    className="btn btn-primary "
                                >Cancel</button>
                                <button type="submit" style={{ marginTop: '20px' }} className="small">Save Changes</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
export default translate(Docs);