import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Loader from '../loader';
import * as config from '../../config';


class AddCompany extends Component {
    displayName = AddCompany.name;

    constructor(props) {
        super(props);
        this.state = {
            languageid: 0,
            individualid: 0,
            companytypeid: 0,
            crnumber: '',
            chambernumber: '',
            emiratesid: '',
            dedid: 0,
            nameen: '',
            namear: '',
            email: '',
            website: '',
            noofemployee: '',
            mobilecountry: '971',
            mobilearea: '',
            mobilenumber: '',
            telephonearea: '',
            telephonecountry: '971',
            telephonenumber: '',
            countryid: 0,
            stateid: 0,
            area: '',
            street: '',
            buildingnumber: '',
            flatnumber: '',
            establishmentdate: '',
            franchise: false,
            legalformid: 0,
            companyphoto: '',
            cityid: 0,
            employeenum: 0,
            createdby: '',
            legalformlist: [],
            //companyownerslist: [],
            companytypelist: [],
            companyactivitylist: [
                {
                    companyactivityid: 0
                }
            ],
            dedlist: [],
            countrylist: [],
            statelist: [],
            citylist: [],
            activitylist: [],
            roleList: [],
            companyownerslist: [
                {
                    emirati: 0,
                    ownerroleid: 0,
                    partnerid: 0,
                    nationalityid: 0,
                    ownerroletypeid: 0,
                    nationality: "",
                    ownernamear: "",
                    ownernameen: ""
                }
            ]
        };

        this.handleOwnershipEmirati = this
            .handleOwnershipEmirati
            .bind(this);
        this.handleOwnerTypeChange = this
            .handleOwnerTypeChange
            .bind(this);
        this.handleActivityChange = this
            .handleActivityChange
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.toggleChange = this
            .toggleChange
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        fetch(config.webApiUrl() + "aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ indList: data, loading: false });
            });

    }
    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ createdby: localStorage.getItem('userid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.bindDroDown(localStorage.getItem('selectedLanguageCode'));
        }
    }

    isNumberKey = (e) => {
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            alert('please valid id');
            return;
        }
    }
    bindDroDown(langid) {
        if (langid > 0) {
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/11")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ legalformlist: datam });
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
                                    this.setState({ dedlist: data });
                                });
                        }
                    }
                    this.setState({ countrylist: tempcountry });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/1")
                .then(response => response.json())
                .then(data => {
                    this.setState({ activitylist: data, loading: false });
                });
            fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + langid + "/6")
                .then(response => response.json())
                .then(data => {
                    this.setState({ roleList: data });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/3")
                .then(response => response.json())
                .then(data => {
                    this.setState({ companytypelist: data, loading: false });
                });
        }
    }
    //onFranchiseeChange = (e) => {
    //    this.setState({ franchise: e.target.value });
    //};
    onCountryChange(e) {
        if (e.target.value !== '') {
            this.setState({ countryid: e.target.value });
        }
    }
    onStateChange(e) {
        this.setState({ stateid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getStateCitys/1/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ citylist: data });
            });
    }
    onCityChange(e) {
        this.setState({ cityid: e.target.value });
    }
    /*start  ownership */
    addOwnershipRoles = (e) => {
        e.preventDefault();
        if (this.state.companyownerslist[0]['ownerroleid'] === "") {
            alert('please fill at least one ownership');
        }
        else {
            this.setState((prevState) => ({
                companyownerslist: [
                    ...prevState.companyownerslist, {
                        ownerroleid: 0,
                        partnerid: 0,
                        nationalityid: 0,
                        ownerroletypeid: 0,
                        nationality: "",
                        ownernamear: "",
                        ownernameen: ""
                    }
                ]
            }));
        }
    }
    handleOwnerTypeChange = (e) => {

        let companyownerslist = [...this.state.companyownerslist];
        companyownerslist[e.target.dataset.id]['ownerroletypeid'] = e.target.value;
        this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
    }
    handleOwnershipEmirati = (e) => {
        let companyownerslist = [...this.state.companyownerslist];
        var url = "";
        var check = companyownerslist[e.target.dataset.id]['ownerroletypeid'];
        if (check === '') {
            alert('please select owner type company or individual');
        }
        else {
            var index = e.target.dataset.id;
            if (check === '1') {
                url = "aptc_company_crnum/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value;
            }
            else {
                url = "aptc_individual_emiratesid/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value;
            }
            fetch(config.webApiUrl() + url)
                .then(response => response.json())
                .then(data => {
                    if (data.StatusCode === "400") {
                        if (check === '1') {
                            alert('company does not exist in our database');
                        }
                        if (check === '2') {
                            alert('user does not exist in our database');
                        }
                    }
                    else {
                        if (check === '1') {
                            companyownerslist[index]['partnerid'] = data.companyid;
                            companyownerslist[index]['ownernamear'] = data.namear.toUpperCase();
                            companyownerslist[index]['ownernameen'] = data.nameen.toUpperCase();
                        }
                        else if (check === '2') {
                            var setIndividualid = data.individualid;
                            this.setState({ individualid: setIndividualid });
                            companyownerslist[index]['partnerid'] = setIndividualid; 
                            companyownerslist[index]['nationalityid'] = data.nationalityid;
                            companyownerslist[index]['nationality'] = data.nationality.toUpperCase();
                            companyownerslist[index]['ownernamear'] = data.namear.toUpperCase();
                            companyownerslist[index]['ownernameen'] = data.nameen.toUpperCase();
                        }

                    }
                    this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    if (error.response !== undefined) {
                        this.setState({ loading: false });
                        alert(error.response.data.ResponseMessage);
                    }
                    else {
                        //alert(error.message);
                    }
                });
        }


    }
    handleOwnershipChange = (e) => {

        var className = e.target.className.split(' ')[0];
        if (
            [
                "emirati",
                "ownerroleid",
                "id",
                "partnerid",
                "nationality",
                "nationalityid",
                "ownerroletypeid",
                "ownernamear",
                "ownernameen"
            ].includes(className
            )) {
            let companyownerslist = [...this.state.companyownerslist];
            companyownerslist[e.target.dataset.id][className] = e
                .target
                .value
                .toUpperCase();
            this.setState({
                companyownerslist
            }, () => console.log(this.state.companyownerslist));
        } else {
            this.setState({
                [e.target.name]: e
                    .target
                    .value
                    .toUpperCase()
            });
        }
        var abc = this.state.companyownerslist;

    }
    handleRemoveOwnership = (idx) => () => {
        this.setState({ companyownerslist: this.state.companyownerslist.filter((s, sidx) => idx !== sidx) });
    }
    onChangeRoleName(e) {
        let companyownerslist = [...this.state.companyownerslist];
        companyownerslist[e.target.dataset.id]['ownerroleid'] = e.target.value;
        this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
    }
    /*end  ownership */
    addCompanyActitives(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            companyactivitylist: [
                ...prevState.companyactivitylist, {
                    companyactivityid: 0
                }
            ]
        }));
    }
    handleActivityChange(e) {
        let activities = [...this.state.companyactivitylist];
        activities[e.target.dataset.id]['companyactivityid'] = e.target.value;
        this.setState({ companyactivitylist: activities }, () => console.log(this.state.companyactivitylist));
    }
    handleRemoveCompanyActivities = (idy) => (e) => {
        if (this.state.companyactivitylist.length > 1) {
            if (this.state.companyactivitylist.length > 0) {
                var companyactivitylist = this.state.companyactivitylist;
                companyactivitylist.pop(idy);
                this.setState({ companyactivitylist: companyactivitylist });
            }
        }

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    toggleChange(e) {
        if (this.state.franchise === false) {
            this.setState({ franchise: true });
        }
        else {
            this.setState({ franchise: false });
        }
    }
    fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ companyphoto: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    handleSave() {
        this.props.refreshCompany('0', 'add');
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ loading: true });
        var comp = JSON.stringify(this.state);
        axios.post(config.webApiUrl() + 'aptc_company', comp, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            this.setState({ loading: false });
            if (res.data.StatusCode === '200') {
                alert(res.data.ResponseMessage);
                this.handleSave();
                $('.close').click();
            }
        }).catch((error) => {
            this.setState({ loading: false });
            if (error.response !== undefined) {
                alert(error.response.data.ResponseMessage);
            } else {
                alert(error.message);
            }
        });

    }
    render() {
        let { companyownerslist, activities, employeeIDs } = this.state;
        return (
            <div>

                <div
                    className="modal"
                    id="addModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addModalLabel">
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
                                                        <div className="button-upload" onClick={() => this.fileInput.click()}><i className="fas fa-pencil-alt" />&nbsp;&nbsp;Upload Image</div>
                                                    </span>
                                                </div>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Company Name (EN)</label>
                                                <input
                                                    name="nameen"
                                                    autoFocus
                                                    value={this.state.nameen}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder="e.g John Stones" />
                                            </div>

                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Company Name (AR)</label>
                                                <input
                                                    value={this.state.namear}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    name="namear"
                                                    className="edit-form"
                                                    placeholder="على سبيل المثال ، جون ستونز" />
                                            </div></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>CR Number</label>
                                                <input
                                                    name="crnumber"
                                                    autoFocus
                                                    value={this.state.crnumber}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder="e.g CR070617YU" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>DED</label>
                                                <select
                                                    name="dedid"
                                                    data-val="true"
                                                    value={this.state.dedid}
                                                    onChange={this.onChange}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">DED</option>
                                                    {this
                                                        .state
                                                        .dedlist
                                                        .map((ded, index) => <option key={index} value={ded.stateid}>{ded.statename}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Legal Form</label>

                                                <select
                                                    name="legalformid"
                                                    value={this.state.legalformid}
                                                    onChange={this.onChange}
                                                    className="edit-form" required>
                                                    <option value="">Legal Formid</option>
                                                    {this
                                                        .state
                                                        .legalformlist
                                                        .map((legal, index) => <option key={index} value={legal.commonmasterid}>{legal.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Established Date</label>
                                                <input
                                                    name="establishmentdate"
                                                    value={this.state.establishmentdate}
                                                    onChange={this.onChange}
                                                    type="date"
                                                    required
                                                    style={{
                                                        marginTop: '-8.5px'
                                                    }}
                                                    className="edit-form" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Chamber Number</label>
                                                <input
                                                    name="chambernumber"
                                                    autoFocus
                                                    value={this.state.chambernumber}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder="Chamber Number" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>No Of Employee</label>
                                                <input
                                                    name="noofemployee"
                                                    autoFocus
                                                    value={this.state.noofemployee}
                                                    onChange={this.onChange}
                                                    type="number"
                                                    min="1"
                                                    required
                                                    className="edit-form"
                                                    placeholder="5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Building Number</label>
                                                <input
                                                    name="buildingnumber"
                                                    value={this.state.buildingnumber}
                                                    onChange={(e) => this.onChange(e)}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder="Building Number" />
                                            </div></div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Flat Number</label>
                                                <input
                                                    value={this.state.flatnumber}
                                                    onChange={(e) => this.onChange(e)}
                                                    type="text"
                                                    name="flatnumber"
                                                    required
                                                    className="edit-form"
                                                    placeholder="Flat Number" />
                                            </div></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Area</label>
                                                <input
                                                    name="area"
                                                    onChange={(e) => this.onChange(e)}
                                                    value={this.state.area}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder="area" />
                                            </div></div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>Street</label>
                                                <input
                                                    name="street"
                                                    onChange={(e) => this.onChange(e)}
                                                    value={this.state.street}
                                                    street="text"
                                                    className="edit-form"
                                                    placeholder="Street" />
                                            </div></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="form-group">
                                                <label>Country</label>
                                                <select
                                                    data-val="true"
                                                    name="countryid"
                                                    value={this.state.countryid}
                                                    onChange={(e) => this.onCountryChange(e)}
                                                    className="edit-form form-dashboard-control"
                                                    required>
                                                    <option value="">Country</option>
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
                                                <label>State</label>
                                                <select
                                                    name="mobilearea"
                                                    data-val="true"
                                                    value={this.state.stateid}
                                                    onChange={(e) => this.onStateChange(e)}
                                                    className="edit-form form-dashboard-control"
                                                    required>
                                                    <option value="">State</option>
                                                    {this
                                                        .state
                                                        .statelist
                                                        .map((st, index) => <option key={index} value={st.stateid}>{st.statename} </option>)}
                                                </select>
                                            </div></div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>City</label>
                                                <select
                                                    data-val="true"
                                                    value={this.state.cityid}
                                                    onChange={(e) => this.onCityChange(e)}
                                                    className="edit-form form-dashboard-control"
                                                    required>
                                                    <option value="">City</option>
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
                                                <label>Company Type</label>
                                                <select
                                                    name="companytypeid"
                                                    value={this.state.companytypeid}
                                                    onChange={this.onChange}
                                                    className="edit-form"
                                                    required companytypelist
                                                >
                                                    <option value="">Company Type</option>
                                                    {
                                                        this.state.
                                                            companytypelist
                                                            .map((comtype, index) =>
                                                                <option key={index} value={comtype.commonmasterid}>{comtype.name} </option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
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
                                                    placeholder="Email Address" /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="countryCodeT">Telephone Number</label>
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
                                                            <option value="">Area</option>
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
                                                            placeholder="Number" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label >Website Url</label>
                                                <input
                                                    name="website"
                                                    onChange={this.onChange}
                                                    value={this.state.website}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="Website Url" /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <label>Company Activities</label>
                                                    </div>
                                                </div>
                                                {this.state.companyactivitylist.map((val, idy) => {
                                                    let compActivitiesID = `companyactivityid-${idy}`
                                                    return (
                                                        <div key={idy}>
                                                            <div className="row">
                                                                 <div className="col-md-10 col-lg-10 col-sm-9">
                                                                    <select
                                                                        name={compActivitiesID}
                                                                        data-id={idy}
                                                                        id={compActivitiesID}
                                                                        data-val="true"
                                                                        onChange={this.handleActivityChange}
                                                                        value={this.state.companyactivitylist.companyactivityid}
                                                                        type="text"
                                                                        className="ActivityID edit-form"
                                                                        required>
                                                                        <option value="">Select Activity</option>
                                                                        {this
                                                                            .state
                                                                            .activitylist
                                                                            .map((comActList, index) => <option key={index} value={comActList.commonmasterid}>{comActList.name}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-sm-3">
                                                                    <table>
                                                                        <tr>
                                                                            <td><button type="button" className="btn-delete-cp" onClick={this.handleRemoveCompanyActivities(idy)}
                                                                                style={{ width: '80px', marginRight: '10px' }} id="btnDelete"><i className="fa fa-trash" />&nbsp;Delete</button></td>
                                                                            <td><button
                                                                                className="btn-delete1"
                                                                                onClick={this
                                                                                    .addCompanyActitives
                                                                                    .bind(this)}
                                                                                style={{
                                                                                    width: '200px'
                                                                                }}><i className="fa fa-plus" />&nbsp;Add more activities</button></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-lg-5 col-sm-5">

                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-4">
                                            <h3>Partnership</h3>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-3">

                                        </div>
                                    </div>
                                    {/*ownerroleid: 0,
                                    partnerid: 0,
                                    nationalityid:0,
                                    ownerroletypeid: 0,
                                    nationality: "",
                                    ownernamear: "",
                                    ownernameen: ""*/}
                                    {companyownerslist.map((val, idx) => {
                                        let ownerRoleID = `companyownerslist-${idx}`,
                                            idID = `partnerid-${idx}`,
                                            partnerid = `partnerid-${idx}`,
                                            ownerroletypeid = `ownerroletypeid-${idx}`,
                                            ownerNameArID = `ownernamear-${idx}`,
                                            ownerNameEnID = `ownernameen-${idx}`,
                                            nationalityID = `nationalityid-${idx}`,
                                            ownerroleid = `ownerroleid-${idx}`
                                        return (
                                            <div key={idx}>
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group" style={{ float: 'right' }}>
                                                            <strong> Comapany </strong>  <input type="radio" onChange={this.handleOwnerTypeChange}
                                                                data-id={idx} className="ownerType" value="1"
                                                                name={ownerroletypeid} />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group" style={{ marginLeft: '15px', marginRight: '5px' }}>
                                                            <strong>Individual</strong>
                                                            <input type="radio" onChange={this.handleOwnerTypeChange} data-id={idx}
                                                                value="2" className="ownerType" name={ownerroletypeid}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerRoleID}
                                                                data-id={idx}
                                                                id={ownerRoleID}
                                                                value={val.ownerRoleID}
                                                                onBlur={this.handleOwnershipEmirati}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                className="ownerRoleID edit-form"
                                                                placeholder="please enter id" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerNameEnID}
                                                                data-id={idx}
                                                                id={ownerNameEnID}
                                                                value={val.ownernameen}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                className="edit-form ownerNameEn"
                                                                placeholder="Name(En)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerNameArID}
                                                                data-id={idx}
                                                                id={ownerNameArID}
                                                                value={val.ownernamear}
                                                                onChange={this.handleOwnershipChange}
                                                                className="ownerNameAr edit-form"
                                                                placeholder="Name(Ar)" /></div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="form-group">
                                                            <input
                                                                name={nationalityID}
                                                                data-id={idx}
                                                                id={nationalityID}
                                                                value={val.nationality}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                className="nationality edit-form"
                                                                placeholder="Nationality" /></div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ display: 'none' }}>
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <input
                                                            name={partnerid}
                                                            data-id={idx}
                                                            id={partnerid}
                                                            value={this.state.partnerid}
                                                            onChange={this.handleOwnershipChange}
                                                            type="text"
                                                            className="id edit-form"
                                                            placeholder="ID" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-7 col-lg-7 col-sm-7">
                                                        <div className="form-group">
                                                            <select
                                                                id={ownerroleid}
                                                                data-val="true"
                                                                name={ownerroleid}
                                                                data-id={idx}
                                                                value={this.state.roleList.commonmasterid}
                                                                onChange={(e) => this.onChangeRoleName(e)}
                                                                className="edit-form"
                                                                required>
                                                                {
                                                                    this
                                                                        .state
                                                                        .roleList
                                                                        .map(role => <option key={idx} value={role.roleid}>{role.rolename}</option>)}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-sm-3">
                                                        <div className="col-md-3 col-lg-3 col-sm-3"><button className="btn-delete-cp" onClick={this.handleRemoveOwnership(idx)} style={{ width: '100px' }}><i className="fa fa-trash" />&nbsp;Delete</button></div>
                                                        <div className="col-md-7 col-lg-7 col-sm-7"><button className="btn-delete-cp" onClick={this.addOwnershipRoles}
                                                            style={{
                                                                width: '200px', marginLeft: '10px'
                                                            }}><i className="fa fa-plus" />&nbsp;Add more partner</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label>Franchisee</label>
                                                <label className="container-x">
                                                    <input name="franchise"
                                                        checked={this.state.franchise}
                                                        onChange={(e) => this.toggleChange(e)}
                                                        type="checkbox"
                                                        className="edit-form" />
                                                    <span className="checkmark" />
                                                </label><br />
                                            </div>
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

export default AddCompany;