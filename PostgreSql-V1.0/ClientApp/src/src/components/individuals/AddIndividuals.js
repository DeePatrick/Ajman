

import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import english_JSON from './../../data/json_EN';
import Loader from '../loader';
import * as config from '../../config';


class AddIndividual extends Component {
    displayName = AddIndividual.name;

    constructor(props) {
        super(props);

        this.handleSave = this
            .handleSave
            .bind(this);

        this.state = {
            optDetails: {},
            areaCodes: [],
            stateList: [],
            countryList: [],
            changeCityList: [],
            stateCountryList: [],
            indList: [],
            createdby: 1,
            genderList: [],
            maritalStatusList: [],
            religionList: [],
            titleList: [],
            pendingApprovalRejectionList: [],
            languageList: [],


            languageid: 0,
            langcode: 0,
            individualtype: 'individual',
            emiratesid: '',
            nameen: "",
            namear: "",
            email: "",
            gender: "",
            mobilecountry: '',
            mobilearea: '',
            mobilenumber: '',
            dob: "",
            nationalityid: 169,
            religionid: 1,
            maritalstausid: 169,
            telephonearea: 1,
            telephonecountry: 1,
            telephonenumber: '',
            countryid: 169,
            stateid: 420,
            cityid: 0,
            area: "",
            street: "",
            buildingnumber: 0,
            flatnumber: 0,
            profilephoto: "",
            createdon: "2018-11-28",
            companyid: 0,
            roleid: 0,

            notes: '',

            showing: false,
            individualDetails: false,
            isSendOtp: true,
            isMatchOtp: false
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.onCleareData = this
            .onCleareData
            .bind(this);

        this.onSubmit = this
            .onSubmit
            .bind(this);

        this.onClickClose = this
            .onClickClose
            .bind(this);




        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 10)
            .then(response => response.json())
            .then(data => {
                this.setState({ genderList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 12)
            .then(response => response.json())
            .then(data => {
                this.setState({ maritalStatusList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 15)
            .then(response => response.json())
            .then(data => {
                this.setState({ religionList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 16)
            .then(response => response.json())
            .then(data => {
                this.setState({ titleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 24)
            .then(response => response.json())
            .then(data => {
                this.setState({ pendingApprovalRejectionList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 26)
            .then(response => response.json())
            .then(data => {
                this.setState({ languageList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + localStorage.getItem('selectedLanguageCode') + "/" + 6)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + 169)
            .then(response => response.json())
            .then(data => {
                this.setState({ areaCodes: data, stateCountryList: data, loading: false });
            });


    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            companyid: nextProps.companyid
        });
    }


    onCleareData() {
        this.setState({
            languageid: 1,
            emiratesid: "",
            nameen: "",
            namear: "",
            email: "",
            gender: "",
            mobilecountry: 169,
            mobilearea: 0,
            mobilenumber: 0,
            dob: "",
            nationalityid: 0,
            religionid: 1,
            maritalstausid: 169,
            telephonearea: 1,
            telephonecountry: 169,
            telephonenumber: 9876543299,
            countryid: 169,
            stateid: 420,
            cityid: 1,
            area: "",
            street: "",
            buildingnumber: 0,
            flatnumber: 0,
            profilephoto: "",
            createdon: "",
            companyid: 0,
            roleid: 0,

            notes: ''
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onClickClose = (e) => { }



    handleNationalityChange = (e) => {
        this.setState({ nationalityid: e.target.value });
    }

    languageChange = (e) => {
        this.setState({ languageid: e.target.value });
    };

    handlereligionChange = (e) => {
        this.setState({ religionid: e.target.value });
    }

    handleMaritalChange = (e) => {
        this.setState({ maritalstausid: e.target.value });
    }

    handleGenderChange = (e) => {
        this.setState({ gender: e.target.value });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }



    onChangeRoleId = (e) => {
        this.setState({ roleid: e.target.value });
    }



    stateChange = (e) => {

        let selectedvalue = e.target.value;
        this.setState({ stateid: selectedvalue });

        let _id = selectedvalue;
        fetch(config.webApiUrl() + "aptc_getStateCitys/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ stateList: data, loading: false });
            });

    };

    cityChange = (e) => {
        this.setState({ cityid: e.target.value });
    };


    //{/*Start  MobNum onchange methods  */}//
    onChangemobilecountry = (e) => {
        this.setState({ mobilecountry: e.target.value });
    }

    onChangemobilenumber = (e) => {
        this.setState({ mobilenumber: e.target.value });
    }

    onChangemobilearea = (e) => {
        this.setState({ mobilearea: e.target.value });
    }

    //{/*Start  TelNum onchange methods  */}//
    onChangetelephonecountry = (e) => {
        this.setState({ telephonecountry: e.target.value });
    }

    onChangetelephonenumber = (e) => {
        this.setState({ telephonenumber: e.target.value });
    }

    onChangetelephonearea = (e) => {
        this.setState({ telephonearea: e.target.value });
    }

    //{/*end TelNum onchange methods  */}//
    fileSelectedHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let profilephoto = Object.assign({}, this.state.profilephoto);
                profilephoto.photo = e.target.result;
                this.setState({ profilephoto });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    getIdForAuthentication = (e) => {
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
                console.log("Fail:" + error.response.data.ResponseMessage);
            });

    }

    matchOtpAndGetData = (e) => {
        this.setState({ loading: true });
        var sendOtp = {};
        sendOtp.id = this.state.email;
        sendOtp.isICA = true;
        sendOtp.otp = this.state.otp;
        sendOtp = JSON.stringify(sendOtp);

        axios
            .post(config.webApiUrl() + 'aptc_matchotp', sendOtp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false, isMatchOtp: false, isSendOtp: false, individualDetails: true })
                this.setState({
                    fullName: response.data.userDetails.fullName,
                    email: response.data.userDetails.emailId,
                    dob: response.data.userDetails.dob,
                    gender: response.data.userDetails.gender,
                    nationality: response.data.userDetails.nationality,
                    maritalStatus: response.data.userDetails.maritalStatus,
                    mobNum: response.data.userDetails.mobNum,
                    telNum: response.data.userDetails.telNum,
                    address: response.data.userDetails.address,
                    en_US: response.data.userDetails.fullName.en_US,
                    ar_SA: response.data.userDetails.fullName.ar_SA
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

    handleSave = () => {
        const item = this.state;
        this.props.saveModalDetails(item, 'add');
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        var objUser = {};

        var _id = this.state.companyid;

        objUser.dob = this.state.dob;
        objUser.languageid = parseInt(this.state.languageid);
        objUser.email = this.state.email;


        objUser.nameen = this.state.nameen;
        objUser.namear = this.state.namear;

        objUser.countryid = parseInt(this.state.countryid);
        objUser.stateid = parseInt(this.state.stateid);
        objUser.cityid = parseInt(this.state.cityid);

        objUser.area = this.state.area;
        objUser.street = this.state.street;
        objUser.buildingnumber = this.state.buildingnumber;
        objUser.flatnumber = this.state.flatnumber;

        objUser.gender = this.state.gender;
        objUser.languageid = parseInt(this.state.languageid);
        objUser.maritalstausid = parseInt(this.state.maritalstausid);
        objUser.notes = this.state.notes;


        objUser.mobilecountry = parseInt(this.state.mobilecountry);
        objUser.mobilearea = this.state.mobilearea;
        objUser.mobilenumber = this.state.mobilenumber;


        objUser.telephonecountry = parseInt(this.state.telephonecountry);
        objUser.telephonearea = this.state.telephonearea;
        objUser.telephonenumber = this.state.telephonenumber;

        objUser.nationalityid = parseInt(this.state.nationalityid);
        objUser.companyid = parseInt(this.state.companyid);

        objUser.religionid = parseInt(this.state.religionid);
        objUser.emiratesid = this.state.emiratesid;

        objUser.roleid = parseInt(this.state.roleid);
        objUser.profilephoto = this.state.profilephoto;
        debugger;
        const Individual = JSON.stringify(objUser);
        axios
            .post(config.webApiUrl() + 'aptc_employee/' + localStorage.getItem('selectedLanguageCode'), Individual, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                fetch(config.webApiUrl() + "/aptc_company_getEmployees/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ loading: false });
                        this.onCleareData();
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
    };

    render() {
        const { showing, emiratiDiv } = this.state;
        return (
            <div>
                <div
                    className="modal fade"
                    id="indAddModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="indAddModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => this.setState({
                                        keyID: '', otp: '', isSendOtp: true, isMatchOtp: false, individualDetails: false
                                    })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form name="form" onSubmit={this.onSubmit}>
                                <div className="modal-body">
                                    {this.state.loading === true && <div>
                                        <Loader />
                                    </div>}
                                    <div>
                                        <div>
                                            <div>
                                                <div className="form-group">
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
                                                                        value={this.state.keyID}
                                                                        name="keyID"
                                                                        required
                                                                        onChange={this.onChange}
                                                                        className="form-control myformcontrol center "
                                                                        aria-describedby="emailHelp"
                                                                        placeholder={this.props.t('Enter_Emirati_ID_Number')} />
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="center">or</div>
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


                                                        <div className="center">

                                                            <span>
                                                                <br />
                                                                <h3><p><strong>{this.props.t('One_Time_Password')}</strong></p></h3>
                                                            </span>
                                                            <span>
                                                                <br />
                                                                <p>{this.props.t('Otp_Message')}</p>
                                                                <p>{this.props.t('Otp_Expire_Message')}</p>
                                                                <br /><br />
                                                            </span>
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
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={this.matchOtpAndGetData.bind(this, this.state.keyID)}>{this.props.t('Continue')}</button>
                                                            <br />
                                                            <br /><br /><br />
                                                        </div>





                                                    }
                                                    {this.state.individualDetails === true &&
                                                        <div>
                                                            <div className='row'>
                                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4 title-image'>
                                                                    <span>
                                                                        <img
                                                                            id="icon-pics"
                                                                            src={!this.state.profilephoto
                                                                                ? require('../../assets/user-img.png')
                                                                                : this.state.profilephoto}
                                                                            className="img-circle"
                                                                            alt="woman"
                                                                            height="120"
                                                                            width="120" /><br />
                                                                        <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                                                        <button className="button-upload" onClick={() => this.fileInput.click()}><i className="fas fa-pencil-alt" />&nbsp; {this.props.t('Upload_Image')} </button>
                                                                    </span>
                                                                </div>
                                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
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
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
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
                                                            {this.state.loading === true && <div>
                                                                <Loader />
                                                            </div>}

                                                            <div className="row">

                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>EmiratesID</label>
                                                                        <input
                                                                            value={this.state.emiratesid}
                                                                            onChange={this.onChange}
                                                                            type="text"
                                                                            name="emiratesid"
                                                                            className="edit-form"
                                                                            placeholder="Full Name (AR)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Gender')}</label>
                                                                        <select
                                                                            value={this.state.gender}
                                                                            onChange={this.handleGenderChange}
                                                                            className="edit-form"
                                                                            required>
                                                                            <option value="">{this.props.t('Gender')}</option>
                                                                            {this
                                                                                .state
                                                                                .genderList
                                                                                .map((g, index) => <option key={index} value={g.name}>{g.name}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Building_Number')}</label>
                                                                        <input
                                                                            name="buildingnumber"
                                                                            value={this.state.buildingnumber}
                                                                            onChange={this.onChange}
                                                                            type="text"
                                                                            className="edit-form"
                                                                            placeholder={this.props.t('Building_Number')} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Flat_Number')}</label>
                                                                        <input
                                                                            value={this.state.flatnumber}
                                                                            onChange={this.onChange}
                                                                            type="text"
                                                                            name="flatnumber"
                                                                            className="edit-form"
                                                                            placeholder={this.props.t('Flat_Number')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Street')}</label>
                                                                        <input
                                                                            name="street"
                                                                            onChange={this.onChange}
                                                                            value={this.state.street}
                                                                            street="text"
                                                                            className="edit-form"
                                                                            placeholder={this.props.t('Street')} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Area')} </label>
                                                                        <input
                                                                            name="area"
                                                                            onChange={this.onChange}
                                                                            value={this.state.area}
                                                                            type="text"
                                                                            className="edit-form"
                                                                            placeholder={this.props.t('Area')} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>State</label>
                                                                        <select
                                                                            value={this.state.stateid}
                                                                            onChange={this.stateChange}
                                                                            className="edit-form">
                                                                            <option value="">- State -</option>
                                                                            {this
                                                                                .state
                                                                                .stateCountryList
                                                                                .map((state, index) => <option key={index} value={state.stateid}>{state.statename}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>City</label>
                                                                        <select
                                                                            value={this.state.cityid}
                                                                            onChange={this.cityChange}
                                                                            className="edit-form">
                                                                            <option value="">- City -</option>
                                                                            {this
                                                                                .state
                                                                                .stateList
                                                                                .map((city, index) => <option key={index} value={city.cityid}>{city.cityname}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input
                                                                            name="email"
                                                                            value={this.state.email}
                                                                            onChange={this.onChange}
                                                                            type="text"
                                                                            className="edit-form"
                                                                            placeholder="Email" /><br />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Date of Birth</label>
                                                                        <input
                                                                            name="dob"
                                                                            onChange={this.onChange}
                                                                            value={this.state.dob}
                                                                            type="date"
                                                                            style={{ marginTop: '-7px' }}
                                                                            data-date-inline-picker="true"
                                                                            className="edit-form"
                                                                            placeholder="Date of Birth" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Mobile_Number')}</label>
                                                                        <div>
                                                                            <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                                                +971
                                                    </div>

                                                                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                                                                <div className="form-group">
                                                                                    <select
                                                                                        data-val="true"
                                                                                        value={this.state.mobilearea}
                                                                                        onChange={this.onChangemobilearea}
                                                                                        className="edit-form form-dashboard-control"
                                                                                        required>
                                                                                        <option value="">{this.props.t('Area')}</option>
                                                                                        {this.state.areaCodes.map((areaCodes, index) => <option key={index} value={areaCodes.stateid}>({areaCodes.statename}) &nbsp; {areaCodes.areacode}</option>)}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                                                                <div className="form-group">
                                                                                    <input
                                                                                        value={this.state.mobilenumber}
                                                                                        onChange={this.onChangemobilenumber}
                                                                                        type="text"
                                                                                        name="mobilenumber" maxLength="10"
                                                                                        className="edit-form "
                                                                                        placeholder="Number" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Telephone_Number')}</label>
                                                                        <div>
                                                                            <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                                                +971
                                                                             </div>

                                                                            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                                                                <select
                                                                                    data-val="true"
                                                                                    value={this.state.telephonearea}
                                                                                    onChange={this.onChangetelephonearea}
                                                                                    className="edit-form form-dashboard-control"
                                                                                    required>
                                                                                    <option value="">Area</option>
                                                                                    {this.state.areaCodes.map((area, index) => <option key={index} value={area.stateid}>({area.statename}) &nbsp; {area.areacode}</option>)}
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                                                                <input
                                                                                    value={this.state.telephonenumber}
                                                                                    onChange={this.onChangetelephonenumber}
                                                                                    type="text"
                                                                                    name="telephonenumber"
                                                                                    maxLength="10"
                                                                                    className="edit-form"
                                                                                    placeholder="Number" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>{this.props.t('Nationality')}</label>
                                                                        <select
                                                                            value={this.state.nationalityid}
                                                                            onChange={(e) => this.handleNationalityChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                            <option value="">{this.props.t('Nationality')}</option>
                                                                            {this
                                                                                .state
                                                                                .countryList
                                                                                .map(role => <option key={role.commonmasterid} value={role.commonmasterid}>{role.name}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <div>
                                                                            <label>{this.props.t('Religion')}</label>
                                                                            <select
                                                                                value={this.state.religionid}
                                                                                onChange={(e) => this.handlereligionChange(e)}
                                                                                className="edit-form"
                                                                                required>
                                                                                <option value="">{this.props.t('Religion')}</option>
                                                                                {this
                                                                                    .state
                                                                                    .religionList
                                                                                    .map(r => <option key={r.commonmasterid} value={r.commonmasterid}>{r.name}</option>)}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">

                                                                        <div>
                                                                            <label>{this.props.t('Marital_Status')}</label>
                                                                            <select
                                                                                value={this.state.maritalstausid}
                                                                                onChange={(e) => this.handleMaritalChange(e)}
                                                                                className="edit-form"
                                                                                required>
                                                                                <option value="">{this.props.t('Marital_Status')}</option>
                                                                                {this
                                                                                    .state
                                                                                    .maritalStatusList
                                                                                    .map(m => <option key={m.commonmasterid} value={m.commonmasterid}>{m.name}</option>)}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Language</label>
                                                                        <select
                                                                            value={this.state.languageid}
                                                                            onChange={(e) => this.languageChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                            {this
                                                                                .state
                                                                                .languageList
                                                                                .map(l => <option key={l.commonmasterid} value={l.commonmasterid}>{l.name}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <div className="form-group">
                                                                            <label>Roles</label>
                                                                            <select
                                                                                id="role"
                                                                                data-val="true"
                                                                                value={this.state.roleid}
                                                                                onChange={(e) => this.onChangeRoleId(e)}
                                                                                className="edit-form"
                                                                                required>
                                                                                <option value="">Role</option>
                                                                                {this
                                                                                    .state
                                                                                    .roleList
                                                                                    .map(roleList => <option key={roleList.roleid} value={roleList.roleid}>{roleList.rolename}</option>)}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Notes</label>
                                                                        <input
                                                                            name="notes"
                                                                            onChange={this.onChange}
                                                                            value={this.state.notes}
                                                                            type="text"
                                                                            className="edit-form"
                                                                            placeholder="Notes" />
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
                                                                    data-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary">Save changes</button>
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
            </div>
        );
    }
}

export default AddIndividual;