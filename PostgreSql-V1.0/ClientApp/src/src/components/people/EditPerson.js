import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import english_JSON from './../../data/json_EN';
import arabic_JSON from './../../data/json_AR';
import * as config from '../../config';

const English = english_JSON;
const Arabic = arabic_JSON;

class EditPerson extends Component {
    displayName = EditPerson.name;

    constructor(props) {
        super(props);

        this.handleSave = this
            .handleSave
            .bind(this);

        this.state = {
            indListPermit: [],
            optDetails: {},
            areaCodes: [],
            comTypeList: [],
            comActivitiesList: [],

            companyid: 12,
            crnum: "356456",
            ded: "",
            chambernumber: "46545",
            legalformid: 113,
            legalform: "Civil Company",
            estdate: "2018-12-06T00:00:00",
            website: "ggggg.co",
            companytypeid: 79,
            companytype: "PickUp Truck",
            franchise: false,
            mobilenumber: 585574445,
            telephonenumber: 585574445,
            mobilenumberwithcountry: "+5585574445",
            telephonenumberwithcountry: "+5646585574445",
            status: 1,
            email: "gggg@gg.co",
            companynameen: "fufhgh",
            companynamear: "غانا",
            flatnumber: "gh",
            buildingnumber: "fgh",
            street: "fhy",
            area: "fhd",
            address: "gh, fgh, fhy, fhd",
            companyPhoto: "AAAAAAAAAAA=",
            vehiclescount: 0,
            documentscount: 0,
            finescount: 0,
            ownerRolesCount: 0,
            activitiesCount: 0,
            companyVehicles: null,
            companyDocInOutPut: null,
            companyDocOutOutPut: null
        };

        this.oncrNumChange = this
            .oncrNumChange
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" +  4)
            .then(response => response.json())
            .then(data => {
                var tempArea = [];
                $.each(data, function (index, country) {
                    if (country.Code === 'AE') {
                        $.each(country.State, function (i, area) {
                            var areaCodes = {};
                            areaCodes.code = area.Code;
                            areaCodes.name = area.Value;
                            areaCodes.value = area.area_code;
                            tempArea[i] = areaCodes;
                        });
                    }
                });
                this.setState({ areaCodes: tempArea });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 3)
            .then(response => response.json())
            .then(data => {
                this.setState({ comTypeList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 1)
            .then(response => response.json())
            .then(data => {
                this.setState({ comActivitiesList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ indListPermit: data, loading: false });
            });



    }





    componentWillReceiveProps(nextProps) {
        this.setState({
            ownerRoles: [
                {
                    ownerRoleID: "675",
                    id: "677",
                    nationality: "German",
                    ownerRoleType: "Chairman CEO",
                    ownerNameAr: "رجل سريع",
                    ownerNameEn: "Jimmy Jatt"
                }
            ],
            employeeIDs:
                [{ keyID: "7987776666636337" }]
        });
        this.setState({
            crnum: nextProps.crnum,
            ded: nextProps.dED,
            chamberNum: nextProps.chamberNum,
            legalForm: nextProps.legalForm,
            comType: nextProps.comType,
            website: nextProps.website,
            estDate: nextProps.estDate,
            email: nextProps.email,
            franchisee: nextProps.franchisee,
            name: nextProps.name,
            telNum: nextProps.telNum,
            address: nextProps.address,
            notes: nextProps.notes,
            activities: nextProps.activities,
            ownerRoles: nextProps.ownerRoles,
            comStatus: nextProps.comStatus,
            companyPhoto: nextProps.companyPhoto,
            numEmployees: nextProps.numEmployees,
            employeeIDs: nextProps.employeeIDs
        });


    }

    renderOptions(myArray) {
        return myArray.map(item => <option key={item.Code} value={item.Value}>{item.Value}</option>)
    }

    dedChange = (e) => {
        this.setState({ dED: e.target.value });
    };

    legalFormChange = (e) => {
        this.setState({ legalForm: e.target.value });
    };

    comTypeChange = (e) => {
        this.setState({ comType: e.target.value });
    };


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    oncrNumChange(e) {
        this.setState({
            cRNum: e.target.value
        });
    }
    //{/* name onchange methods  */}//
    onChangeEnName = (e) => {
        let name = Object.assign({}, this.state.name);
        name.en_US = e.target.value;
        this.setState({ name });
    }

    onChangeArName = (e) => {
        let name = Object.assign({}, this.state.name);
        name.ar_SA = e.target.value;
        this.setState({ name });
    };
    //{/* Address onchange methods  */}//

    onChangeAddressBldgNum = (e) => {
        let address = Object.assign({}, this.state.address);
        address.bldgNum = e.target.value;
        this.setState({ address });
    };

    onChangeAddressFlatNum = (e) => {
        let address = Object.assign({}, this.state.address);
        address.flatNum = e.target.value;
        this.setState({ address });
    };

    onChangeAddressStreet = (e) => {
        let address = Object.assign({}, this.state.address);
        address.street = e.target.value;
        this.setState({ address });
    };

    onChangeAddressCity = (e) => {
        let address = Object.assign({}, this.state.address);
        address.city = e.target.value;
        this.setState({ address });
    };

    onChangeAddressArea = (e) => {
        let address = Object.assign({}, this.state.address);
        address.area = e.target.value;
        this.setState({ address });
    };

    onChangeAddressState = (e) => {
        let address = Object.assign({}, this.state.address);
        address.state = e.target.value;
        this.setState({ address });
    };

    //{/* TelNum onchange methods  */}//
    onChangeTelNumCountryCode = (e) => {
        let telNum = Object.assign({}, this.state.telNum);
        telNum.countryCodeT = e.target.value;
        this.setState({ telNum });
    };

    onChangeTelNumNum = (e) => {
        let telNum = Object.assign({}, this.state.telNum);
        telNum.numT = e.target.value;
        this.setState({ telNum });
    };

    onChangeTelNumArea = (e) => {
        let telNum = Object.assign({}, this.state.telNum);
        telNum.areaT = e.target.value;
        this.setState({ telNum });
    };


    onChangeComStatus = (e) => {
        let comStatus = Object.assign({}, this.state.comStatus);
        comStatus.statusID = e.target.value;
        this.setState({ comStatus });
    };


    /*------------------------------------------------*/
    /*start  Activities */

    addCompanyActitives(e) {
        e.preventDefault();

        this.setState((prevState) => ({
            activities: [
                ...prevState.activities, {
                    ActivityID: ""
                }
            ]
        }));
    }


    handleActivityChange = (idy) => (evt) => {
        evt.preventDefault();
        const newadd = this
            .state
            .activities
            .map((active, sidx) => {
                if (idy !== sidx)
                    return active;
                return {
                    ...active,
                    ActivityID: evt.target.value
                };
            });

        this.setState({ activities: newadd });
    }





    handleRemoveCompanyActivities = (idy) => () => {
        this.setState({ activities: this.state.activities.filter((s, sidy) => idy !== sidy) });
    }


    /*End Activities */

    /*--------------------------*/
    /* Start employee */

    addEmployees = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            employeeIDs: [
                ...prevState.employeeIDs, {
                    keyID: ""
                }
            ]
        }));
    }


    handleemployeeIDsChange = (idz) => (evt) => {
        evt.preventDefault();
        const newadd = this
            .state
            .employeeIDs
            .map((emp, sidx) => {
                if (idz !== sidx)
                    return emp;
                return {
                    ...emp,
                    keyID: evt.target.value
                };
            });

        this.setState({ employeeIDs: newadd });
    }



    handleRemoveEmployee = (idz) => () => {
        this.setState({ employeeIDs: this.state.employeeIDs.filter((s, sidy) => idz !== sidy) });
    }


    /*End Employee */

    addOwnershipRoles = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            ownerRoles: [
                ...prevState.ownerRoles, {
                    ownerRoleID: "",
                    id: "",
                    nationality: "",
                    ownerRoleType: "",
                    ownerNameAr: "",
                    ownerNameEn: ""
                }
            ]
        }));
    }

    handleOwnershipChange = (e) => {
        e.preventDefault();
        if ([
            "ownerRoleID",
            "id",
            "nationality",
            "ownerRoleType",
            "ownerNameAr",
            "ownerNameEn"
        ].includes(e.target.className)) {
            let ownerRoles = [...this.state.ownerRoles];
            ownerRoles[e.target.dataset.id][e.target.className] = e
                .target
                .value
                .toUpperCase();
            this.setState({
                ownerRoles
            }, () => console.log(this.state.ownerRoles));
        } else {
            this.setState({
                [e.target.name]: e
                    .target
                    .value
                    .toUpperCase()
            });
        }
    }

    handleRemoveOwnership = (idx) => () => {
        this.setState({ ownerRoles: this.state.ownerRoles.filter((s, sidx) => idx !== sidx) });
    }


    handleSave() {
        const item = this.state;
        this
            .props
            .saveModalDetails(item);
    }


    handleExitModal() {
        document
            .getElementsByClassName("close")[0]
            .click();
    }

    fileSelectedHandler(e) {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ companyPhoto: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const user = JSON.stringify(this.state);
        console.log(user);
        axios.put(config.webApiUrl() + 'aptc_company', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.StatusCode === '200') {
                alert(res.data.ResponseMessage);
                this.setState({ loading: false });
                this.handleSave();
                $('.close').click();
            }
        })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response.data !== undefined) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });
    }

    render() {
        let { ownerRoles, activities, employeeIDs } = this.state;

        return (
            <div>
                <div
                    className="modal fade"
                    id="editPersonModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="editPersonModalLabel">
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
                                                            src={!this.state.profilephoto.photo
                                                                ? require('../../assets/user-img.png')
                                                                : this.state.profilephoto.photo}
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
            </div>
        );
    }
}

export default EditPerson;