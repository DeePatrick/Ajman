import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class PermitPayment extends Component {
    displayName = PermitPayment.name;
    constructor(props) {
        super(props);

        this.state = {
            paymentmodeid: 0,
            permitmasterid: 0,
            isCash: false,
            isDD: false,
            isOnline: false,
            chequeno: '',
            amountreceived: 0,
            paymentmodelist: []
        };
        this.onChangePaymentMode = this
            .onChangePaymentMode
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);

        this.savePayment = this
            .savePayment
            .bind(this);

    }
    componentWillMount() {
        fetch(config.webApiUrl() + "/aptc_getPaymentMode/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ paymentmodelist: data });
            });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onChangePaymentMode = (e) => {
        this.setState({ paymentmodeid: e.target.value, amountreceived: this.props.price, permitmasterid: this.props.permitmainid });
        this.setState({ isCash: false, isDD: false, isOnline: false });
        if (e.target.value === '1') {
            this.setState({ isCash: true });
        }
        if (e.target.value === '6') {
            this.setState({ isDD: true });
        }
        if (e.target.value === '4') {
            this.setState({ isOnline: true });
        }
    };
    savePayment(e) {
        e.preventDefault();
        var amount = this.props.price;
        var paymentState = this.state;
        var payment = JSON.stringify(paymentState);
        axios.post(config.webApiUrl() + 'aptc_payment', payment, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert(res.data.ResponseMessage);
            this.setState({ loading: false });
            $('.close').click();
        }).catch((error) => {
            alert(error);
            this.setState({ loading: false });
        });
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <label>{this.props.t('Payment_Mode')}</label>
                    <select
                        data-val="true"
                        value={this.state.paymentmodeid}
                        onChange={(e) => this.onChangePaymentMode(e)}
                        className="edit-form"
                        required>
                        <option value="">{this.props.t('Payment_Mode')}</option>
                        {this
                            .state
                            .paymentmodelist
                            .map((mode, index) => <option key={index} value={mode.paymentmodeid}>{mode.paymentmode}</option>)}
                    </select>
                </div>
                {this.state.isCash === true &&
                    <div>
                        <div className="center">
                            <button
                                id="hidePopUpBtn"
                                type="button"
                                className="btn btn-blank"
                                data-dismiss="modal">{this.props.t('Close')}</button>
                            <button type="submit" onClick={this.savePayment} className="btn btn-primary">{this.props.t('PAY_NOW')}</button>
                        </div>
                    </div>
                }
                {this.state.isDD === true &&
                    <div>
                        <div className="form-group">
                            <label>{this.props.t('DD_Number')}</label>
                            <input
                                name="chequeno"
                                maxLength="20"
                                onChange={this.onChange}
                                value={this.state.chequeno}
                                type="text"
                                className="edit-form"
                                required
                                placeholder={this.props.t('DD_Number')} />
                        </div>
                        <div className="center">
                            <button
                                id="hidePopUpBtn"
                                type="button"
                                className="btn btn-blank"
                                data-dismiss="modal">Close</button>
                            <button type="submit" onClick={this.savePayment} className="btn btn-primary">{this.props.t('PAY_NOW')}</button>
                        </div>
                    </div>
                }
                {this.state.isOnline === true &&
                    <div>
                        <div className="center">
                            <button
                                id="hidePopUpBtn"
                                type="button"
                                className="btn btn-blank"
                                data-dismiss="modal">{this.props.t('PAY_NOW')}</button>
                            <button type="submit" onClick={this.savePayment} className="btn btn-primary">{this.props.t('PAY_NOW')}</button>
                        </div>
                    </div>
                }

            </div>
        );
    }
}
export default translate(PermitPayment);