import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import * as config from '../../config';




class EditCompany extends Component {
    displayName = EditCompany.name;

    constructor(props) {
        super(props);

        this.handleSave = this
            .handleSave
            .bind(this);

        this.state = {

            optDetails: {},
            areaCodes: [],
            comTypeList: [],
            comActivitiesList: [],
            legalFormList: [],
            stateList: [],
            countryList: [],
            changeCityList: [],
            stateCountryList: [],
            roleList: [],
            indList: [],
            createdby: 1,


            companytypeid: 0,
            individualid: 0,
            crnumber: "",
            dedid: 0,
            nameen: "",
            namear: "",
            email: "",
            website: "",
            telephonearea: 0,
            telephonecountry: 0,
            telephonenumber: "",
            countryid: 403,
            stateid: 1,
            area: "",
            street: "",
            buildingnumber: "",
            flatnumber: "",
            establishmentdate: "",
            franchise: false,
            legalformid: 113,
            companyphoto: "",
            isactive: true,
            notes: "",
            cityid: 1,
            noofemployee: 1,
            companyownerslist:[],
            companyactivitylist: []

        };

        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + 169)
            .then(response => response.json())
            .then(data => {
                this.setState({ areaCodes: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 3)
            .then(response => response.json())
            .then(data => {
                this.setState({ comTypeList: data, loading: false });
            });



        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + localStorage.getItem('selectedLanguageCode') + "/" + 6)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 1)
            .then(response => response.json())
            .then(data => {
                this.setState({ comActivitiesList: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 11)
            .then(response => response.json())
            .then(data => {
                this.setState({ legalFormList: data, loading: false });
            });


        //fetch(config.webApiUrl() + "aptc_individualName/" + localStorage.getItem('selectedLanguageCode'))
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ indList: data, loading: false });
        //    });

        fetch(config.webApiUrl() + "aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ indList: data, loading: false });
            });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            companyid: nextProps.companyid,
            crnumber: nextProps.crnumber,
            companytypeid: nextProps.companytypeid,
            individualid: nextProps.individualid,
            dedid: nextProps.dedid,

            nameen: nextProps.nameen,
            namear: nextProps.namear,
            email: nextProps.email,
            website: nextProps.website,

            telephonearea: nextProps.telephonearea,
            telephonecountry: nextProps.telephonecountry,
            telephonenumber: nextProps.telephonenumber,

            countryid: nextProps.countryid,
            stateid: nextProps.stateid,
            cityid: nextProps.cityid,
            area: nextProps.area,

            street: nextProps.street,
            buildingnumber: nextProps.buildingnumber,
            flatnumber: nextProps.flatnumber,
            establishmentdate: nextProps.establishmentdate,

            franchise: nextProps.franchise,
            legalformid: nextProps.legalformid,
            companyphoto: nextProps.companyphoto,
            notes: nextProps.notes,

            companyownerslist: nextProps.companyownerslist,
            companyactivitylist: nextProps.companyactivitylist
        });
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    employeeChange = (e) => {
        this.setState({ individualid: e.target.value });
    }

    telephoneareaChange = (e) => {
        this.setState({ telephonearea: e.target.value });
    }

    dedChange = (e) => {
        this.setState({ dedid: e.target.value });
    };

    legalformChange = (e) => {
        let selectedvalue = e.target.value;
        this.setState({ legalformid: selectedvalue });

    };

    countryChange = (e) => {
        let selectedvalue = e.target.value;
        this.setState({ countryid: selectedvalue });

        let _id = parseInt(selectedvalue);
        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ stateCountryList: data, loading: false });
            });
    };

    stateChange = (e) => {

        let selectedvalue = e.target.value;
        this.setState({ stateid: selectedvalue });

        let _id = selectedvalue;
        fetch(config.webApiUrl() + "aptc_getStateCitys/" + localStorage.getItem('selectedLanguageCode') + "/"  + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ stateList: data, loading: false });
            });

    };

    cityChange = (e) => {
        this.setState({ cityid: e.target.value });
    };

    comTypeChange = (e) => {
        this.setState({ companytypeid: e.target.value });
    };






    //handleOwnershipChange = (e) => {
    //    e.preventDefault();
    //    if ([
    //        "ownerRoleID",
    //        "id",
    //        "nationality",
    //        "ownerRoleType",
    //        "ownerNameAr",
    //        "ownerNameEn"
    //    ].includes(e.target.className)) {
    //        let ownerRoles = [...this.state.ownerRoles];
    //        ownerRoles[e.target.dataset.id][e.target.className] = e
    //            .target
    //            .value
    //            .toUpperCase();
    //        this.setState({
    //            ownerRoles
    //        }, () => console.log(this.state.ownerRoles));
    //    } else {
    //        this.setState({
    //            [e.target.name]: e
    //                .target
    //                .value
    //                .toUpperCase()
    //        });
    //    }
    //}
    /*start  ownership */
    addOwnershipRoles = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            companyownerslist: [
                ...prevState.companyownerslist, {
                    ownerroleid: 0,
                    nationalityid: 0,
                    ownerroletypeid: 0,
                    ownernameen: "",
                    ownernamear: "",
                    partnerid: 0
                }
            ]
        }));
    }

    handleOwnershipChange = (idx) => (e) => {
        e.preventDefault();
        const newadd = this.state.companyownerslist.map((companyowners, sidx) => {
            if (idx !== sidx) return companyowners;
            return {
                ...companyowners, ownerroleid: parseInt(e.target.value), nationalityid: parseInt(e.target.value), ownerroletypeid: parseInt(e.target.value), ownernameen: e.target.value, ownernamear: e.target.value, partnerid: parseInt(e.target.value)
            };
        });

        this.setState({ companyactivitylist: newadd });
    }


    handleRemoveOwnership = (idx) => (e) => {
        e.preventDefault();
        this.setState({ companyownerslist: this.state.companyownerslist.filter((s, sidx) => idx !== sidx) });
    }

    /*end  ownership */
    /*------------------------------------------------*/
    /*start  Activities */

    addCompanyActitives = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            companyactivitylist: [
                ...prevState.companyactivitylist, {
                    companyactivityid: 0
                }
            ]
        }));
    }

    handleActivityChange = (idy) => (e) => {
        e.preventDefault();
        const compAddNew = this.state.companyactivitylist.map((companyactivity, sidy) => {
            if (idy !== sidy) return companyactivity;
            return {
                ...companyactivity, companyactivityid: parseInt(e.target.value)
            };
        });

        this.setState({ companyactivitylist: compAddNew });

    }

    handleRemoveCompanyActivities = (idy) => (e) => {
        e.preventDefault();
        this.setState({ companyactivitylist: this.state.companyactivitylist.filter((s, sidy) => idy !== sidy) });
    }


    /*End Activities */



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
    }

    handleSubmit(e) {
        e.preventDefault();
        var objCompany = {};

        objCompany.companytypeid = this.state.companytypeid;
        objCompany.individualid = this.state.individualid;
        objCompany.companyid = this.state.companyid;
        objCompany.crnumber = this.state.crnumber;
        objCompany.dedid = parseInt(this.state.dedid);
        objCompany.nameen = this.state.nameen;
        objCompany.namear = this.state.namear;
        objCompany.email = this.state.email;
        objCompany.website = this.state.website;
        objCompany.telephonearea = parseInt(this.state.telephonearea);
        objCompany.telephonecountry = parseInt(this.state.telephonecountry);
        objCompany.telephonenumber = this.state.telephonenumber;
        objCompany.countryid = parseInt(this.state.countryid);
        objCompany.stateid = parseInt(this.state.stateid);
        //objCompany.statusid = parseInt(this.state.statusid);


        objCompany.area = this.state.area;
        objCompany.street = this.state.street;
        objCompany.buildingnumber = this.state.buildingnumber;
        objCompany.flatnumber = this.state.flatnumber;
        objCompany.establishmentdate = this.state.establishmentdate;
        objCompany.franchise = this.state.franchise;
        objCompany.legalformid = parseInt(this.state.legalformid);
        objCompany.companyphoto = this.state.companyphoto;
        //objCompany.isactive = this.state.isactive;
        if (this.state.notes){
            objCompany.notes = this.state.notes;
        }
       
        objCompany.cityid = parseInt(this.state.cityid);

        if (this.state.companyownerslist > 0 ){
            objCompany.companyownerslist = this.state.companyownerslist;
        }

        if (this.state.companyactivitylist > 0) {
            objCompany.companyactivitylist = this.state.companyactivitylist;
        }
      
        

        console.log(objCompany);
        debugger;

        const user = JSON.stringify(objCompany);

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
        let { companyownerslist } = this.state;

        return (
            <div>
                <div
                    className="modal fade"
                    id="editModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="editModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>


                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="">
                                        <div className="form-group">
                                            <div className='row'>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4 title-image'>
                                                    <span className='pics'>
                                                        <img
                                                            id="icon-pics"
                                                            src={!this.state.companyphoto || this.state.companyphoto === null
                                                                ? require('../../assets/company-icon.png')
                                                                : this.state.companyphoto}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="90"
                                                            width="90" /><br />

                                                        <br />
                                                        <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                                        <button className="button-upload" onClick={() => this.fileInput.click()}><i className="fas fa-pencil-alt" />&nbsp;Upload Image</button>    <br />
                                                    </span>
                                                </div>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label>Company Name (EN)</label>
                                            <input
                                                name="nameen"
                                                autoFocus
                                                value={this.state.nameen}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder="e.g John Stones" />

                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label>Company Name (AR)</label>
                                            <input
                                                value={this.state.namear}
                                                onChange={this.onChange}
                                                type="text"
                                                name="namear"
                                                className="edit-form"
                                                placeholder="على سبيل المثال ، جون ستونز" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>CR Number</label>
                                            <input
                                                name="crnumber"
                                                autoFocus
                                                value={this.state.crnumber}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder="e.g CR070617YU" />
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>ded</label>
                                            <select
                                                name="dedid"
                                                data-val="true"
                                                value={this.state.dedid}
                                                onChange={this.dedChange}
                                                className="edit-form"
                                                required>
                                                {this
                                                    .state
                                                    .areaCodes
                                                    .map((areaCodes, index) => <option key={index} value={areaCodes.stateid}>{areaCodes.statename}</option>)}
                                            </select>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Legal Form</label>

                                            <select
                                                name="legalformid"
                                                data-val="true"
                                                value={this.state.legalformid}
                                                onChange={this.legalformChange}
                                                className="edit-form">
                                                {this
                                                    .state
                                                    .legalFormList
                                                    .map((legal, index) => <option key={index} value={legal.commonmasterid}>{legal.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Established Date</label>
                                            <input
                                                value={this.state.establishmentdate}
                                                onChange={this.onChange}
                                                type="date"
                                                style={{
                                                    marginTop: '-8.5px'
                                                }}
                                                name="establishmentdate"
                                                className="edit-form" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label>Country</label>
                                            <select
                                                value={this.state.countryid}
                                                onChange={this.countryChange}
                                                className="edit-form">
                                                <option value="">- Select Country -</option>
                                                {this
                                                    .state
                                                    .countryList
                                                    .map((country, index) => <option key={index} value={country.commonmasterid}>{country.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
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
                                        <div className="col-md-6 col-lg-6 col-sm-12">
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


                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <label>Street</label>
                                            <input
                                                name="street"
                                                onChange={this.onChange}
                                                value={this.state.street}
                                                street="text"
                                                className="edit-form"
                                                placeholder="Street" />
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <label>Area</label>
                                            <input
                                                name="area"
                                                onChange={this.onChange}
                                                value={this.state.area}
                                                type="text"
                                                required
                                                className="edit-form"
                                                placeholder="Area" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label>Building Number</label>
                                            <input
                                                name="buildingnumber"
                                                value={this.state.buildingnumber}
                                                onChange={this.onChange}
                                                type="text"
                                                required
                                                className="edit-form"
                                                placeholder="Building Number" /><br />
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label>Flat Number</label>
                                            <input
                                                value={this.state.flatnumber}
                                                onChange={this.onChange}
                                                type="text"
                                                name="flatnumber"
                                                required
                                                className="edit-form"
                                                placeholder="Flat Number" /><br />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="telNum">Telephone Number</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-1 col-lg-1 col-sm-2">+971</div>
                                        <div className="col-md-5 col-lg-5 col-sm-4">
                                            <div className="form-group">
                                                <select
                                                    id="telephonearea"
                                                    data-val="true"
                                                    value={this.state.telephonearea}
                                                    onChange={this.telephoneareaChange}
                                                    className="edit-form"
                                                    required>
                                                    {this.state.areaCodes.map((areaCodes, index) => <option key={index} value={areaCodes.stateid}>({areaCodes.statename}) &nbsp; {areaCodes.areacode}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    style={{
                                                        marginTop: '-1.5px'
                                                    }}
                                                    className="edit-form"
                                                    maxLength="9"
                                                    name="telephonenumber"
                                                    value={this.state.telephonenumber}
                                                    onChange={this.onChange}
                                                    placeholder="Number" />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label>Company Type</label>
                                            <select
                                                name="companytypeid"
                                                data-val="true"
                                                value={this.state.companytypeid}
                                                onChange={this.comTypeChange}
                                                className="edit-form">
                                                {this
                                                    .state
                                                    .comTypeList
                                                    .map((compT, index) => <option key={index} value={compT.commonmasterid}>{compT.name}</option>)}
                                            </select><br/>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                name="email"
                                                style={{
                                                    marginTop: '-2.5px'
                                                }}
                                                value={this.state.email}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder="Email Address" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="password">Website Url</label>
                                            <input
                                                name="website"
                                                onChange={this.onChange}
                                                value={this.state.website}
                                                type="text"
                                                className="edit-form"
                                                placeholder="Website Url" /><br />
                                        </div>
                                    </div>
                                    {!this.state.companyactivitylist ? null : <div>
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Company Activities</label>
                                            </div>
                                        </div>
                                        {this.state.companyactivitylist.map((value, idy) => {
                                            return (
                                                <div key={idy}>
                                                    <div className="row">
                                                        <div className="col-md-10 col-lg-10 col-sm-9">
                                                            <select
                                                                name="companyactivityid"
                                                                data-id={idy}
                                                                id="companyactivityid"
                                                                data-val="true"
                                                                onChange={this.handleActivityChange(idy)}
                                                                value={value.companyactivityid}
                                                                type="text"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Select Activity</option>
                                                                {this
                                                                    .state
                                                                    .comActivitiesList
                                                                    .map((comActList, index) => <option key={index} value={comActList.commonmasterid}>{comActList.name}</option>)}
                                                            </select>


                                                        </div>
                                                        <div className="col-md-2 col-lg-2 col-sm-3">
                                                            <button className="btn-delete" onClick={this.handleRemoveCompanyActivities(idy)} style={{ width: '80px' }}><i className="fa fa-trash" />&nbsp;Delete</button><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        }

                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div>
                                                    <button
                                                        className="btn-primary btn-xs pull-right"
                                                        onClick={this
                                                            .addCompanyActitives
                                                            .bind(this)}
                                                        style={{
                                                            width: '200px'
                                                        }}><i className="fa fa-plus" />&nbsp;Add more company activities</button>
                                                </div>
                                                <br /><br />
                                            </div>
                                        </div>

                                    </div>}
                                    

                                    {!this.state.companyactivitylist ? null : <div>

                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Ownership</label>
                                            </div>
                                        </div>
                                        {companyownerslist.map((val, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <select
                                                                name="ownerroleid"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.ownerroleid}
                                                                type="text"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Emirates ID</option>
                                                                {this.state.indList
                                                                    .map((ab, index) => <option key={index} value={ab.individualid}>{ab.emiratesid}</option>)}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <select
                                                                name="ownerroletypeid"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.ownerroletypeid}
                                                                type="text"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Role Type</option>
                                                                {this.state.roleList
                                                                    .map((ab, index) => <option key={index} value={ab.roleid}>{ab.rolename}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <select
                                                                name="ownernamear"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.ownernamear}
                                                                type="text"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Name (AR)</option>
                                                                {this.state.indList
                                                                    .map((ab, index) => <option key={index} value={ab.namear}>{ab.namear}</option>)}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <select
                                                                name="ownernameen"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.ownernameen}
                                                                type="text"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Name (EN)</option>
                                                                {this.state.indList
                                                                    .map((ab, index) => <option key={index} value={ab.nameen}>{ab.nameen}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                                            <select
                                                                name="nationalityid"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.nationalityid}
                                                                type="number"
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Select Nationality</option>
                                                                {this.state.countryList
                                                                    .map((ab, index) => <option key={index} value={ab.commonmasterid}>{ab.name}  </option>)}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4 col-lg-4 col-sm-9">
                                                            <select
                                                                name="partnerid"
                                                                data-id={idx}
                                                                data-val="true"
                                                                onChange={this.handleOwnershipChange(idx)}
                                                                value={val.partnerid}
                                                                className="edit-form"
                                                                required>
                                                                <option value="">Partner</option>
                                                                {this.state.indList
                                                                    .map((ab, index) => <option key={index} value={ab.individualid}>{ab.namear} &nbsp; {ab.nameen}</option>)}
                                                            </select>

                                                            <br />
                                                        </div>
                                                        <div className="col-md-2 col-lg-2 col-sm-3">
                                                            <button className="btn-delete" onClick={this.handleRemoveOwnership(idx)} ><i className="fa fa-trash" />&nbsp;Delete</button><br />
                                                        </div>
                                                    </div>

                                                </div>
                                            );
                                        })
                                        }

                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div>
                                                    <button
                                                        className="btn-primary btn-xs pull-right"
                                                        onClick={this.addOwnershipRoles}
                                                        style={{
                                                            width: '200px'
                                                        }}><i className="fa fa-plus" />&nbsp;Add more company owners</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>}
                                 
                                    <div className="row">
                                        <div className="col-md-2 col-lg-2 col-sm-6">
                                            <label>Franchisee</label>
                                            <label className="container-x">
                                                <input type="checkbox" name="franchisee" />
                                                <span className="checkmark" />
                                            </label><br />
                                        </div>
                                        <div className="col-md-10 col-lg-10 col-sm-6">
                                            <label>Notes</label>
                                            <input
                                                name="notes"
                                                value={this.state.notes}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder="e.g John Stones" />
                                        </div>
                                    </div>


                                </div>



                                <div className="center">
                                    <button
                                        id="hidePopUpBtn"
                                        type="button"
                                        onClick={(e) => this.binRole(e)}
                                        className="btn btn-blank">aaa</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                                <br />
                                <br />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCompany;