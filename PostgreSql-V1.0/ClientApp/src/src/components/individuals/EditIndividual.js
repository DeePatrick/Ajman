import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import english_JSON from './../../data/json_EN';
import * as config from '../../config';
import Loader from '../loader';

class EditIndividual extends Component {
    displayName = EditIndividual.name;

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


            loading: false,
            languageid: 1,
            emiratesid: "1234567891234599",
            nameen: "",
            namear: "",
            email: "",
            gender: "",
            mobilecountry: 169,
            mobilearea: 1,
            mobilenumber: 9876543299,
            dob: "",
            nationalityid: 169,
            religionid: 1,
            maritalstausid: 169,
            telephonearea: 1,
            telephonecountry: 1,
            telephonenumber: 9876543299,
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
            roleList: [],
            roles: [],
            notes: ''
        };

        this.onChange = this
            .onChange
            .bind(this);

        this.onSubmit = this
            .onSubmit
            .bind(this);


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 10)
            .then(response => response.json())
            .then(data => {
                this.setState({ genderList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + + 12)
            .then(response => response.json())
            .then(data => {
                this.setState({ maritalStatusList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + + 15)
            .then(response => response.json())
            .then(data => {
                this.setState({ religionList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + + 16)
            .then(response => response.json())
            .then(data => {
                this.setState({ titleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + + 24)
            .then(response => response.json())
            .then(data => {
                this.setState({ pendingApprovalRejectionList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/"  + 26)
            .then(response => response.json())
            .then(data => {
                this.setState({ languageList: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/"  + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + localStorage.getItem('selectedLanguageCode') + "/" +  6)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + 169)
            .then(response => response.json())
            .then(data => {
                this.setState({ areaCodes: data, stateCountryList: data,  loading: false });
            });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            individualid: nextProps.individualid,
            nameen: nextProps.nameen,
            namear: nextProps.namear,
            dob: nextProps.dob,
            isactive: nextProps.isactive,
            email: nextProps.email,
            address: nextProps.address,
            flatnumber: nextProps.flatnumber,
            buildingnumber: nextProps.buildingnumber,
            street: nextProps.street,
            area: nextProps.area,
            state: nextProps.state,
            stateid: nextProps.stateid,
            cityid: nextProps.cityid,
            city: nextProps.city,
            gender: nextProps.gender,
            languageid: nextProps.languageid,
            language: nextProps.language,
            maritalstatusid: nextProps.maritalstatusid,
            maritalStatus: nextProps.maritalStatus,
            notes: nextProps.notes,
            country: nextProps.country,
            mobilenumber: nextProps.mobilenumber,
            mobilenumberwithcountry: nextProps.mobilenumberwithcountry,
            telephonenumber: nextProps.telephonenumber,
            telephonenumberwithcountry: nextProps.telephonenumberwithcountry,
            nationalityid: nextProps.nationalityid,
            nationality: nextProps.nationality,
            religionid: nextProps.religionid,
            religion: nextProps.religion,
            emirateId: nextProps.emirateId,
            keyID: nextProps.keyID,
            department: nextProps.department,
            profilephoto: nextProps.profilephoto,
            status: nextProps.status,
            companyname: nextProps.companyname,
            companyid: nextProps.companyid
        });

        if (this.state.stateid) {
            let _id = this.state.stateid;

            fetch(config.webApiUrl() + "aptc_getStateCitys/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
                .then(response => response.json())
                .then(data => {
                    this.setState({ stateList: data, loading: false });
                });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('countryCodes', JSON.stringify(nextState.countryCodes));
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
 
    handleNationalityChange = (e) => {
        this.setState({ nationalityid: e.target.value });
    }

    languageChange = (e) => {
        this.setState({ languageid: e.target.value });
    }
    handlereligionChange = (e) => {
        this.setState({ religionid: e.target.value });
    };
    handleMaritalChange = (e) => {
        this.setState({ maritalstausid: e.target.value });
    };
    handleGenderChange = (e) => {
        this.setState({ gender: e.target.value });
    };
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleDeptChange = (e) => {
        this.setState({ dept: e.target.value });
    };
    onChangeRoleId(e) {
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



    // Dept {/* Documents onchange methods  */}//
    handleDocChangeDocumentID = (idx) => (evt) => {
        const newadd = this
            .state
            .documents
            .map((document, sidx) => {
                if (idx !== sidx)
                    return document;
                return {
                    ...document,
                    documentID: evt.target.value
                };
            });

        this.setState({ documents: newadd });
    }
    handleDocChangeExpDate = (idx) => (evt) => {
        const newadd = this
            .state
            .documents
            .map((document, sidx) => {
                if (idx !== sidx)
                    return document;
                return {
                    ...document,
                    expDate: evt.target.value
                };
            });

        this.setState({ documents: newadd });
    }
    handleDocChangeStatus = (idx) => (evt) => {
        const newadd = this
            .state
            .documents
            .map((document, sidx) => {
                if (idx !== sidx)
                    return document;
                return {
                    ...document,
                    status: evt.target.value
                };
            });

        this.setState({ documents: newadd });
    }
    handleDocChangeType = (idx) => (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ type: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }

        const newadd = this
            .state
            .documents
            .map((document, sidx) => {
                if (idx !== sidx)
                    return document;
                return {
                    ...document,
                    type: event.target.value
                };
            });

        this.setState({ documents: newadd });
    }
    handleNameChange = (evt) => {
        this.setState({ name: evt.target.value });
    }
    handleVehicleNameChange = (idx) => (evt) => {
        const newvehicles = this
            .state
            .vehicles
            .map((vehicle, sidx) => {
                if (idx !== sidx)
                    return vehicle;
                return {
                    ...vehicle,
                    name: evt.target.value
                };
            });

        this.setState({ vehicles: newvehicles });
    }
    handleAddVehicle = () => {
        this.setState({
            vehicles: this
                .state
                .vehicles
                .concat([
                    {
                        name: ''
                    }
                ])
        });
    }


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

    fileSelectedHandler(event) {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {

                let profilephoto = Object.assign({}, this.state.profilephoto);
                profilephoto.photo = e.target.result;
                this.setState({ profilephoto });
                //this.setState({profilephoto: e.target.result});
            };

            reader.readAsDataURL(event.target.files[0]);

        }
    }
    handleDocChangeVersion = (idx) => (evt) => {
        const newadd = this
            .state
            .documents
            .map((document, sidx) => {
                if (idx !== sidx)
                    return document;
                return {
                    ...document,
                    version: evt.target.value
                };
            });

        this.setState({ documents: newadd });
    }

    handleSave() {
        const item = this.state;
        this
            .props
            .saveModalDetails(item, 'update');
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);




    }
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        var objUser = {};
        objUser.dob = this.state.dob;
        objUser.languageid = parseInt(this.state.languageid);
        objUser.email = this.state.email;
        objUser.individualid = this.state.individualid;

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

        var Individual = JSON.stringify(objUser);
        axios
            .put(config.webApiUrl() + 'aptc_employee/' + localStorage.getItem('selectedLanguageCode'), Individual, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.data.StatusCode === '200') {
                    alert(res.data.ResponseMessage);
                    this.setState({ loading: false });
                    this.handleSave();
                    $('.close').click();
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                this.handleSave();
            });
    };
    render() {
        return (
            <div>

                <div
                    className="modal fade"
                    id="indEditModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="inEditModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <form name="form" onSubmit={this.onSubmit}>
                                <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className="form-group">
                                            <div className='row'>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4 title-image'>
                                                    <span className='pics'>
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
                                                        <button className="button-upload" onClick={(e) => this.fileInput.click(e)}><i className="fas fa-pencil-alt" />&nbsp;Upload Image</button>
                                                    </span>
                                                </div>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Full Name (EN)</label>
                                                <input
                                                    name="nameen"
                                                    autoFocus
                                                    value={this.state.nameen}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="Full Name (EN)" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Full Name (AR)</label>
                                                <input
                                                    value={this.state.namear}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    name="namear"
                                                    className="edit-form"
                                                    placeholder="Full Name (AR)" />
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
                                                <label>Gender</label>
                                                <select
                                                    value={this.state.gender}
                                                    onChange={this.handleGenderChange}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">Gender</option>
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
                                                <label>Building Number</label>
                                                <input
                                                    name="buildingnumber"
                                                    autoFocus
                                                    value={this.state.buildingnumber}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="Building Number" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Flat Number</label>
                                                <input
                                                    value={this.state.flatnumber}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    name="flatnumber"
                                                    className="edit-form"
                                                    placeholder="Flat Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Street</label>
                                                <input
                                                    name="street"
                                                    onChange={this.onChange}
                                                    value={this.state.street}
                                                    street="text"
                                                    className="edit-form"
                                                    placeholder="Street" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Area</label>
                                                <input
                                                    name="area"
                                                    onChange={this.onChange}
                                                    value={this.state.area}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="Area" />
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
                                                <label>Mobile Number</label>
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
                                                                <option value="">Area</option>
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
                                                <label>Telephone Number</label>
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
                                                <label>Nationality</label>
                                                <select
                                                    value={this.state.nationalityid}
                                                    onChange={(e) => this.handleNationalityChange(e)}
                                                    className="edit-form"
                                                    required>
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
                                                    <label>Religion</label>
                                                    <select
                                                        value={this.state.religionid}
                                                        onChange={(e) => this.handlereligionChange(e)}
                                                        className="edit-form"
                                                        required>
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
                                                    <label>Marital Status</label>
                                                    <select
                                                        value={this.state.maritalstausid}
                                                        onChange={(e) => this.handleMaritalChange(e)}
                                                        className="edit-form"
                                                        required>
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
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                                <br /><br />
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default EditIndividual;
