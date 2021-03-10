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


class EditAccount extends Component {
    displayName = EditAccount.name;
    constructor(props) {
        super(props);
        this.state = {
            employeeid: 0,
            languageid: 0,
            individualid: 0,
            createdby: 0,
            modifyby: 0,
            langcode: 0,
            roleid: 0,
            companyid: 0,
            countryid: 0,
            stateid: 0,
            cityid: 0,
            nationalityid: 0,
            maritalstatusid: 0,
            religionid: 0,
            emiratesid: '',
            nameen: '',
            namear: '',
            email: '',
            gender: '',
            mobilecountry: '+971',
            mobilearea: '',
            mobilenumber: '',
            dob: '1900-01-01',
            telephonearea: '',
            telephonecountry: '+971',
            telephonenumber: '',
            area: '',
            street: '',
            buildingnumber: '',
            flatnumber: '',
            profilephoto: '',
            optDetails: {},
            userDetails: {},
            countrylist: [],
            statelist: [],
            citylist: [],
            genderlist: [],
            maritallist: [],
            religionlist: [],
            nationalitylist: [],
            rolelist: [],
            companylist: [],
            employeerolelist:
                [
                    {
                        individualid: 0,
                        companyid: 0,
                        roleid: 0
                    }
                ],
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
        this.onUpdateIndividual = this
            .onUpdateIndividual
            .bind(this);
        this.handleSave = this
            .handleSave
            .bind(this);

    }

    componentWillMount() {
        this.bindDroDown(localStorage.getItem('selectedLanguageCode'));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.mode === 'edit') {
            this.setState({ loading: true });
            this.setState({ modifyby: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.setState({ individualid: nextProps.individualid });
            this.bindEmployee(nextProps.individualid);
        }
    }
    bindDroDown(langid) {
        if (this.state.nationalitylist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/4")
                .then(response => response.json())
                .then(datac => {
                    var tempcountry = [];
                    for (var i = 0; i < datac.length; i++) {
                        if (datac[i].commonmasterid === 169) {
                            tempcountry.push(datac[i]);
                            this.setState({ country: datac[i].commonmasterid });
                            this.setState({ countryid: 169 });
                            //this.bindState(datac[i].commonmasterid);
                        }
                    }
                    this.setState({ countrylist: tempcountry });
                    this.setState({ nationalitylist: datac });
                });
        }
        if (this.state.statelist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/169")
                .then(response => response.json())
                .then(data => {
                    debugger;
                    this.setState({ statelist: data });
                });
        }
        if (this.state.genderlist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/10")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ genderlist: datam });
                });
        }
        if (this.state.maritallist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/12")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ maritallist: datam });
                    //this.bindReligion(langid);
                });
        }
        if (this.state.religionlist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/15")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ religionlist: datam });
                    //this.bindRole(langid);
                });
        }
        if (this.state.rolelist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + langid + "/6")
                .then(response => response.json())
                .then(data => {
                    this.setState({ rolelist: data });
                    fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode')+'/' + localStorage.getItem('individualid'))
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ companylist: data });

                        });
                });
        }
    }
    bindEmployee(individualid) {
        fetch(config.webApiUrl() + "aptc_employee_edit/" + individualid)
            .then(response => response.json())
            .then(data => {
                if (data.individualid !== undefined) {
                    this.bindCity(data.stateid);
                    this.fillEmployee(data);
                }
                else {
                    this.setState({ loading: false });
                }
            }).catch(error => {
                alert(error.message);
            });
    }
    fillEmployee(employee) {
        fetch(config.webApiUrl() + "aptc_getStateCitys/" + this.state.languageid + "/" + employee.stateid)
            .then(response => response.json())
            .then(data => {
                this.setState({ citylist: data });
                this.setState({
                    employeeid: employee.individualid,
                    individualid: employee.individualid,
                    roleid: employee.roleid,
                    companyid: employee.companyid,
                    emiratesid: employee.emiratesid,
                    nameen: employee.nameen,
                    namear: employee.namear,
                    email: employee.email,
                    gender: employee.gender,
                    mobilecountry: '+971',
                    mobilearea: employee.mobilearea,
                    mobilenumber: employee.mobilenumber,
                    dob: employee.dob,
                    nationalityid: employee.nationalityid,
                    religionid: employee.religionid,
                    maritalstatusid: employee.maritalstatusid,
                    telephonearea: employee.telephonearea,
                    telephonecountry: '+971',
                    telephonenumber: employee.telephonenumber,
                    countryid: 169,
                    stateid: employee.stateid,
                    cityid: employee.cityid,
                    area: employee.area,
                    street: employee.street,
                    buildingnumber: employee.buildingnumber,
                    flatnumber: employee.flatnumber,
                    profilephoto: employee.profilephoto,
                    loading: false
                });
            });
    }

    onCountryChange(e) {
        if (e.target.value !== '') {
            this.setState({ countryid: e.target.value });
        }
    }
    onStateChange(e) {
        this.setState({ stateid: e.target.value });
        this.bindCity(e.target.value);
    }
    bindState(countryid) {
        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + countryid)
            .then(response => response.json())
            .then(data => {
                this.setState({ statelist: data });
                this.bindCity(data[0].stateid);
            });
    }
    bindCity(stateid) {
        fetch(config.webApiUrl() + "aptc_getStateCitys/" + this.state.languageid + "/" + stateid)
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
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilephoto: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    handleSave() {
        this.props.refreshIndividual(this.state.individualid, 'edit');
    }
    onUpdateIndividual(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const individual = JSON.stringify(this.state);
        axios
            .put(config.webApiUrl() + 'aptc_individual ', individual, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false });
                alert(res.data.ResponseMessage);
                document.getElementById("username").innerHTML = this.state.nameen;
                localStorage.setItem('userName', this.state.nameen);
                this.handleSave();
                $('.close').click();
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
    render() {
        return (
            <div className="modal" id="editAccountModal" tabIndex="-1" role="dialog" aria-labelledby="editAccountModalLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form name="form" onSubmit={this.onUpdateIndividual}>
                            <div className="modal-body">
                                {this.state.loading === true && <div>
                                    <Loader />
                                </div>}
                                <div className="container-fluid">
                                    <div className="modal-body">
                                        <div className="container-fluid1">
                                            <div className="form-group1">
                                                <div>
                                                    <div className='row'>
                                                        <div className='col-md-5 col-lg-5 col-sm-5'>&nbsp;</div>
                                                        <div className='col-md-3 col-lg-3 col-sm-3'>
                                                            <span className='pics'>&nbsp;&nbsp;&nbsp;
    
                                                            </span>
                                                            <span>
                                                                <img
                                                                    id="icon-pics"
                                                                    src={!this.state.profilephoto || this.state.profilephoto === null
                                                                        ? require('../../assets/user-img.png')
                                                                        : this.state.profilephoto}
                                                                    className="img-rounded"
                                                                    alt=""
                                                                    height="90"
                                                                    width="90" /><br />
                                                            </span>
                                                        </div>
                                                        <div className='col-md-4 col-lg-4 col-sm-4'>&nbsp;</div>
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
                                                                    placeholder={this.props.t('Full_Name_AR')} />
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
                                                                    placeholder= {this.props.t('Flat_Number')} />
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
                                                                <label>{this.props.t('State')}</label>
                                                                <select
                                                                    name="stateid"
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
                                                                    readOnly="readOnly"
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
                                                                    required
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
                                                                                readOnly="readOnly"
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
                                                                                readOnly="readOnly"
                                                                                className="edit-form "
                                                                                placeholder={this.props.t('Number')}  />
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
export default translate(EditAccount);