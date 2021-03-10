import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Loader from '../loader';
import * as config from '../../config';
import {translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Create extends Component {
    displayName = Create.name;
    constructor(props) {
        super(props);
        this.handleSave = this
            .handleSave
            .bind(this);
        this.state = {
            languageid: 0,
            langcode: 0,
            individualtype: 'individual',
            emiratesid: '',
            nameen: '',
            namear: '',
            email: '',
            gender: '',
            mobilecountry: '+971',
            mobilearea: '',
            mobilenumber: '',
            dob: '',
            nationalityid: '',
            religionid: '',
            maritalstatusid: '',
            telephonearea: '',
            telephonecountry: '+971',
            telephonenumber: '',
            countryid: 0,
            stateid: '',
            cityid: '',
            area: '',
            street: '',
            buildingnumber: '',
            flatnumber: '',
            profilephoto: '',
            password: '',
            confirmPassword: '',
            otp: '',
            filename: '',
            optDetails: {},
            userDetails: {},
            countrylist: [],
            statelist: [],
            citylist: [],
            genderlist: [],
            maritallist: [],
            religionlist: [],
            nationalitylist: [],
            loading: false,
            emiratiDiv: true,
            showing: false,
            individualDetails: false,
            isSendOtp: true,
            isMatchOtp: false
        };
        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });

            this.bindDroDown(localStorage.getItem('selectedLanguageCode'));
        }
    }
    bindDroDown(langid) {
        if (langid > 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/10")
                .then(response => response.json())
                .then(data => {
                    this.setState({ genderlist: data });
                    this.setState({ showing: true, isSendOtp: true });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/12")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ maritallist: datam });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/15")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ religionlist: datam });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/4")
                .then(response => response.json())
                .then(datac => {
                    var tempcountry = [];
                    for (var i = 0; i < datac.length; i++) {
                        if (datac[i].commonmasterid === 169) {
                            tempcountry.push(datac[i]);
                            this.setState({ country: datac[i].commonmasterid });
                            fetch(config.webApiUrl() + "aptc_getCountryStates/" + langid + "/" + datac[i].commonmasterid)
                                .then(response => response.json())
                                .then(data => {
                                    this.setState({ statelist: data });
                                });
                        }
                    }
                    this.setState({ countrylist: tempcountry });
                    this.setState({ nationalitylist: datac });

                });
        }
    }
    onCountryChange(e) {
        if (e.target.value !== '') {
            this.setState({ countryid: e.target.value });
        }
    }
    onStateChange(e) {
        this.setState({ stateid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getStateCitys/" + localStorage.getItem('selectedLanguageCode')+"/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ citylist: data });
            });
    }
    onCityChange(e) {
        this.setState({ cityid: e.target.value });
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            var fileName = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilephoto: e.target.result,filename: fileName.name});
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    getIdForAuthentication(e) {
        this.setState({ loading: true });
        var emiratesId = this.state.emiratesid;

        const url = config.webApiUrl() + 'aptc_sendotp/' + emiratesId;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode !== null) {
                    if (data.StatusCode === '200') {
                        this.setState({ email: data.Id, loading: false, showing: false, isMatchOtp: true, isSendOtp: false, individualDetails: false });
                    }
                    else {
                        alert(data.ResponseMessage);
                        this.setState({ loading: false, isMatchOtp: false, isSendOtp: true, individualDetails: false });
                    }
                }
                else {
                    this.setState({ loading: false, isMatchOtp: false, isSendOtp: true, individualDetails: false });
                }
            })
            .catch((error) => {

                this.setState({ loading: false, showing: false, isMatchOtp: false, isSendOtp: true, individualDetails: false });
                if (error.response !== undefined) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });

    }
    matchOtpAndGetData(e) {
        this.setState({ loading: true });
        var sendOtp = {};
        sendOtp.id = this.state.emiratesid;
        sendOtp.isica = true;
        sendOtp.otp = this.state.otp;
        sendOtp = JSON.stringify(sendOtp);
        axios
            .post(config.webApiUrl() + 'aptc_matchotp', sendOtp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false, isMatchOtp: false, isSendOtp: false, individualDetails: true });
                this.setState({
                    nameen: response.data.nameen,
                    namear: response.data.namear,
                    email: response.data.email,
                    dob: response.data.dob,
                    nationality: response.data.nationality,
                    religion: response.data.religion,
                    maritalstatus: response.data.maritalstatus,
                    gender: response.data.gender
                });
            })
            .catch((error) => {
                this.setState({ loading: false, isMatchOtp: true, isSendOtp: false, individualDetails: false });
                if (error.response !== undefined) {
                    alert("axios error:" + error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });
    }
    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item, 'add');
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Your password and confirmation password do not match.');
        }
        else {
            this.setState({ loading: true });
            const Individual = JSON.stringify(this.state);
            axios
                .post(config.webApiUrl() + 'aptc_individual ', Individual, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    fetch(config.webApiUrl() + "aptc_individual/")
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ loading: false });
                            alert(res.data.ResponseMessage);
                            $('.close').click();
                            //this.handleSave();
                        });
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    if (error.response.data !== null) {
                        alert(error.response.data.ResponseMessage);
                    }
                    else {
                        alert(error.response);
                    }

                });
        }
    }
    render() {
        const { showing, emiratiDiv } = this.state;
        return (
            <div
                className="modal"
                id="createModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => this.setState({
                                    emiratesid: '', otp: '', isSendOtp: true, isMatchOtp: false, individualDetails: false
                                })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form name="form" onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                {this.state.loading === true && <div>
                                    <Loader />
                                </div>}
                                <div className="container-fluid">
                                    <div className="modal-body">
                                        <div className="container-fluid1">
                                            <div className="form-group1">
                                                {
                                                    this.state.isSendOtp === true &&
                                                    <div className="center">
                                                        <span>
                                                            <p><br />
                                                                {this.props.t('You_will_need_an_Emirates_ID_to_register')}
                                                                    </p>
                                                        </span>
                                                        <br />
                                                        <div className="form-group">
                                                            <div className="bordered-loginbar ">
                                                                <input
                                                                    type="text"
                                                                    value={this.state.emiratesid}
                                                                    name="emiratesid"
                                                                    required
                                                                    onChange={this.onChange}
                                                                    className="form-control myformcontrol center "
                                                                    aria-describedby="emailHelp"
                                                                    placeholder={this.props.t('Enter_Emirati_ID_Number')} />
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="center">{this.props.t('or')}</div>
                                                        <br />
                                                        <div>
                                                            <button type="button" className="btn btn-primary">{this.props.t('Scan_Emirati_ID_Card')}</button>
                                                        </div>
                                                        <br />
                                                        <img
                                                            className="padding-icon"
                                                            src={require('../../assets/Emirates_ID.png')}
                                                            width="180"
                                                            alt="logo" />
                                                        <br /><br />
                                                        <button
                                                            id="hiddenbutton" style={
                                                                { display: 'none' }
                                                            }
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => this.setState({
                                                                showing: !showing
                                                            })}>{this.props.t('Continue')}</button>

                                                        &nbsp;

                                                                <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={this
                                                                .getIdForAuthentication
                                                                .bind(this, this.state.emiratesid)}>{this.props.t('Continue')}</button>
                                                        <br />
                                                        <br /><br /><br />
                                                    </div>
                                                }
                                                {this.state.isMatchOtp === true &&

                                                    <div className="row">
                                                        <div className="col-md-2 col-lg-2 col-sm-2"></div>
                                                        <div className="col-md-8 col-lg-8 col-sm-8">
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
                                                                                placeholder="Enter Six Digit Number" />
                                                                        </div>
                                                                    </div>
                                                                <p className="">{this.props.t('Didnot_recieve_OTP')}<span className="btn-link">{this.props.t('Resend')}</span> </p>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                    onClick={this.matchOtpAndGetData.bind(this, this.state.keyID)}>{this.props.t('Continue')}</button>
                                                                    <br />
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 col-lg-2 col-sm-2"></div>
                                                    </div>}
                                                {this.state.individualDetails === true &&
                                                    <div>
                                                        <div className='row'>
                                                            <div className='col-md-5 col-lg-5 col-sm-5'></div>
                                                            <div className='col-md-3 col-lg-3 col-sm-3'>

                                                                <span>
                                                                <img
                                                                    id="icon-pics"
                                                                    src={!this.state.profilephoto || this.state.profilephoto === null
                                                                        ? require('../../assets/user-img.png')
                                                                        : this.state.profilephoto}
                                                                    className="img-rounded"
                                                                    alt="employee"
                                                                    height="90"
                                                                    width="90" /><br />
                                                                    <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                                                <div className="button-upload" style={{ cursor: 'pointer' }} onClick={() => this.fileInput.click()}><i className="fas fa-pencil-alt" />{this.props.t('Upload_Image')}</div>
                                                                    {/*<button className="button-upload" onClick={() => this.fileInput.click()}><i className="fas fa-pencil-alt" />&nbsp;Upload Image</button>*/}
                                                                </span>
                                                            </div>
                                                            <div className='col-md-4 col-lg-4 col-sm-4'></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group" >
                                                                <label>{this.props.t('Full_Name_EN')}</label>
                                                                    <input
                                                                    name="nameen"
                                                                    autoFocus
                                                                    value={this.state.nameen}
                                                                    onChange={this.onChange}
                                                                    type="text"
                                                                    required
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Full_Name_EN')} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Full_Name_AR')}</label>
                                                                    <input
                                                                    value={this.state.namear}
                                                                    onChange={this.onChange}
                                                                    type="text"
                                                                    name="namear"
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Full_Name_AR')}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Building_Number')}</label>
                                                                    <input
                                                                    name="buildingnumber"
                                                                    autoFocus
                                                                    value={this.state.buildingnumber}
                                                                    onChange={(e) => this.onChange(e)}
                                                                    type="text"
                                                                    required
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Building_Number')} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Flat_Number')}</label>
                                                                    <input
                                                                    value={this.state.flatnumber}
                                                                    onChange={(e) => this.onChange(e)}
                                                                    type="text"
                                                                    name="flatnumber"
                                                                    required
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Flat_Number')} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Area')}</label>
                                                                    <input
                                                                    name="area"
                                                                    onChange={(e) => this.onChange(e)}
                                                                    value={this.state.area}
                                                                    type="text"
                                                                    required
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Area')} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Street')}</label>
                                                                    <input
                                                                        name="street"
                                                                        onChange={(e) => this.onChange(e)}
                                                                        value={this.state.street}
                                                                        street="text"
                                                                        className="edit-form"
                                                                    placeholder={this.props.t('Street')} />
                                                                </div></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Country')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        name="country"
                                                                        value={this.state.countryid}
                                                                        onChange={(e) => this.onCountryChange(e)}
                                                                        className="edit-form form-dashboard-control"
                                                                        required>
                                                                    <option value="">{this.props.t('Country')}</option>
                                                                        {
                                                                            this.state.
                                                                                countrylist
                                                                                .map((country, index) =>
                                                                                    <option key={index} value={country.commonmasterid}>{country.name} </option>)}
                                                                    </select>
                                                                </div></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Emirate')}</label>
                                                                    <select
                                                                        name="mobilearea"
                                                                        data-val="true"
                                                                        value={this.state.stateid}
                                                                        onChange={(e) => this.onStateChange(e)}
                                                                        className="edit-form form-dashboard-control"
                                                                        required>
                                                                    <option value="">{this.props.t('Emirate')}</option>
                                                                        {this
                                                                            .state
                                                                            .statelist
                                                                            .map((st, index) => <option key={index} value={st.stateid}>{st.statename} </option>)}
                                                                    </select>
                                                                </div></div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('City')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.cityid}
                                                                        onChange={(e) => this.onCityChange(e)}
                                                                        className="edit-form form-dashboard-control"
                                                                        required>
                                                                    <option value="">{this.props.t('City')}</option>
                                                                        {this
                                                                            .state
                                                                            .citylist
                                                                            .map((city, index) => <option key={index} value={city.cityid}>{city.cityname} </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="row">

                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Email')}</label>
                                                                    <input
                                                                    name="email"
                                                                    value={this.state.email}
                                                                    onChange={this.onChange}
                                                                    type="text"
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Email')} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Date_of_Birth')}</label>
                                                                    <input
                                                                    name="dob"
                                                                    onChange={this.onChange}
                                                                    value={this.state.dob}
                                                                    type="date"
                                                                    style={{ marginTop: '-7px' }}
                                                                    data-date-inline-picker="true"
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Date_of_Birth')} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Password')}</label>
                                                                    <input
                                                                    name="password"
                                                                    value={this.state.password}
                                                                    onChange={this.onChange}
                                                                    type="password"
                                                                    minLength="8"
                                                                    maxLength="16"
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Password')} />
                                                                </div> </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Confirm_Password')}</label>
                                                                    <input
                                                                    name="confirmPassword"
                                                                    value={this.state.confirmPassword}
                                                                    onChange={this.onChange}
                                                                    type="password"
                                                                    data-date-inline-picker="true"
                                                                    className="edit-form"
                                                                    placeholder={this.props.t('Confirm_Password')} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label htmlFor="mobileNumber">{this.props.t('Mobile_Number')}</label>
                                                                    <div>
                                                                        <div className="col-md-2 col-lg-2 col-sm-2">
                                                                            +971
                                                    </div>

                                                                        <div className="col-md-5 col-lg-5 col-sm-5">
                                                                            <div className="form-group">
                                                                                <select
                                                                                    data-val="true"
                                                                                    name="mobilearea"
                                                                                    value={this.state.mobilearea}
                                                                                    onChange={(e) => this.onChange(e)}
                                                                                    className="edit-form form-dashboard-control"
                                                                                    required>
                                                                                <option value="">{this.props.t('Area')}</option>
                                                                                    {this
                                                                                        .state
                                                                                        .statelist
                                                                                        .map((areaCodes, index) => <option key={index} value={areaCodes.areacode}>{areaCodes.statename} </option>)}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4 col-lg-4 col-sm-4">
                                                                            <div className="form-group">
                                                                                <input
                                                                                name="mobilenumber"
                                                                                value={this.state.mobilenumber}
                                                                                onChange={(e) => this.onChange(e)}
                                                                                type="text"
                                                                                maxLength="10"
                                                                                required
                                                                                className="edit-form "
                                                                                placeholder={this.props.t('Number')}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label htmlFor="countryCodeT">{this.props.t('Telephone_Number')}</label>
                                                                    <div>
                                                                        <div className="col-md-2 col-lg-2 col-sm-2">
                                                                            +971
                                                                        </div>
                                                                        <div className="col-md-4 col-lg-4 col-sm-4">
                                                                            <select
                                                                                data-val="true"
                                                                                name="telephonearea"
                                                                                value={this.state.telephonearea}
                                                                                onChange={(e) => this.onChange(e)}
                                                                                className="edit-form form-dashboard-control"
                                                                                required>
                                                                            <option value="">{this.props.t('Area')}</option>
                                                                                {this
                                                                                    .state
                                                                                    .statelist
                                                                                    .map((areaCodes, index) => <option key={index} value={areaCodes.areacode}>{areaCodes.statename} </option>)}
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-4 col-lg-4 col-sm-4">
                                                                            <input
                                                                            name="telephonenumber"
                                                                            value={this.state.telephonenumber}
                                                                            onChange={this.onChange}
                                                                            type="text"
                                                                            maxLength="10"
                                                                            className="edit-form"
                                                                            placeholder={this.props.t('Number')} />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Nationality')}</label>
                                                                    <select
                                                                    name="nationalityid"
                                                                        value={this.state.nationalityid}
                                                                        onChange={(e) => this.onChange(e)}
                                                                        className="edit-form"
                                                                        required>
                                                                    <option value="">{this.props.t('Nationality')}</option>
                                                                        {this
                                                                            .state
                                                                            .nationalitylist
                                                                            .map((nationality, index) => <option key={index} value={nationality.commonmasterid}>{nationality.name} </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">

                                                                    <div>
                                                                    <label>{this.props.t('Religion')}</label>
                                                                        <select
                                                                        name="religionid"
                                                                            value={this.state.religionid}
                                                                            onChange={(e) => this.onChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                        <option value="">{this.props.t('Religion')}</option>
                                                                            {this
                                                                                .state
                                                                                .religionlist
                                                                                .map((religion, index) => <option key={index} value={religion.commonmasterid}>{religion.name} </option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">

                                                                    <div>
                                                                    <label>{this.props.t('Marital_Status')}</label>
                                                                        <select
                                                                        name="maritalstatusid"
                                                                            value={this.state.maritalstatusid}
                                                                            onChange={(e) => this.onChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                        <option value="">{this.props.t('Marital_Status')}</option>
                                                                            {this
                                                                                .state
                                                                                .maritallist
                                                                                .map((marital, index) => <option key={index} value={marital.commonmasterid}>{marital.name} </option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-lg-6 col-sm-6">
                                                                <div className="form-group">
                                                                <label>{this.props.t('Gender')}</label>
                                                                    <select
                                                                        name="gender"
                                                                        required
                                                                        value={this.state.gender}
                                                                        onChange={(e) => this.onChange(e)}
                                                                        className="edit-form">
                                                                    <option value="">{this.props.t('Gender')}</option>
                                                                        {this
                                                                            .state
                                                                            .genderlist
                                                                            .map((gender, index) => <option key={index} value={gender.commonmasterid}>{gender.name} </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="center">
                                                            <button
                                                                id="hidePopUpBtn"
                                                                type="button"
                                                                className="btn btn-blank"
                                                                onClick={() => this.setState({
                                                                    emiratesid: '', otp: '', isSendOtp: true, isMatchOtp: false, individualDetails: false
                                                                })}
                                                            data-dismiss="modal">{this.props.t('Close')}</button>
                                                        <button type="submit" className="btn btn-primary">{this.props.t('Save_Changes')}</button>
                                                        </div>
                                                    </div>
                                                }
                                                <br /><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default translate(Create);