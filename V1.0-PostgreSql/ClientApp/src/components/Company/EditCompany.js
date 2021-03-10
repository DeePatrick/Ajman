import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Loader from '../loader';
import * as config from '../../config';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class EditCompany extends Component {
    displayName = EditCompany.name;

    constructor(props) {
        super(props);
        this.state = {
            languageid: 0,
            individualid: 0,
            companytypeid: 0,
            companyid: 0,
            modifyby: 0,
            crnumber: '',
            chambernumber: '',
            dedid: '',
            nameen: '',
            namear: '',
            email: '',
            website: '',
            mobilecountry: '971',
            mobilearea: '',
            mobilenumber: '',
            telephonearea: '',
            telephonecountry: '971',
            telephonenumber: '',
            countryid: 169,
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
    }
    componentDidMount() {
        //this.bindDroDown(localStorage.getItem('selectedLanguageCode'))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.mode === 'edit') {
            this.setState({ loading: true });
            this.setState({ modifyby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.bindDroDown(localStorage.getItem('selectedLanguageCode'));
            this.bindCompanyDetails(nextProps.companyid);
        }

    }
    bindCompanyDetails(companyid) {
        fetch(config.webApiUrl() + "aptc_company_edit/" + companyid)
            .then(response => response.json())
            .then(data => {
                this.fillCompanyData(data);
            });
    }
    fillCompanyData(company) {
        this.setState({
            companyid: company.companyid,
            area: company.area,
            buildingnumber: company.buildingnumber,
            companyphoto: company.companyphoto,
            companytypeid: company.companytypeid,
            createdby: company.createdby,
            createdon: company.createdon,
            crnumber: company.crnumber,
            email: company.email,
            establishmentdate: company.establishmentdate,
            flatnumber: company.flatnumber,
            franchise: company.franchise,
            individualid: company.individualid,
            namear: company.namear,
            nameen: company.nameen,
            street: company.street,
            telephonearea: company.telephonearea,
            telephonecountry: company.telephonecountry,
            telephonenumber: company.telephonenumber,
            website: company.website,
            loading: false
        });
        //this.bindLegalform(company.legalformid);
        this.setState({ dedid: company.dedid });
        this.setState({ countryid: 169 });
        this.bindState(169, company.stateid);
        this.bindCity(company.stateid, company.cityid);
        this.setState({ dedid: company.dedid, legalformid: company.legalformid });
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
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/4")
                .then(response => response.json())
                .then(datac => {
                    var tempcountry = [];
                    for (var i = 0; i < datac.length; i++) {
                        if (datac[i].commonmasterid === 169) {
                            tempcountry.push(datac[i]);
                            this.setState({ country: datac[i].commonmasterid });
                        }
                    }
                    this.setState({ countrylist: tempcountry });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + langid + "/3")
                .then(response => response.json())
                .then(data => {
                    this.setState({ companytypelist: data, loading: false });
                });
            fetch(config.webApiUrl() + "aptc_getCountryStates/1/169")
                .then(response => response.json())
                .then(data => {
                    this.setState({ dedlist: data });
                });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/11")
                .then(response => response.json())
                .then(datam => {
                    this.setState({ legalformlist: datam });
                });
        }
    }
    toggleChange(e) {
        if (this.state.franchise === false) {
            this.setState({ franchise: true });
        }
        else {
            this.setState({ franchise: false });
        }
    }
    onCountryChange(e) {
        if (e.target.value !== '') {
            this.setState({ countryid: e.target.value });
            this.bindState(e.target.value, 0);
        }
    }
    onStateChange(e) {
        this.setState({ stateid: e.target.value });
        this.bindCity(e.target.value, 0);
    }
    bindState(countryid, stateid) {
        if (this.state.statelist.length === 0) {
            fetch(config.webApiUrl() + "aptc_getCountryStates/1/" + countryid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ statelist: data });
                });
        }
    }
    bindCity(stateid, cityid) {
        if (stateid !== undefined) {
            fetch(config.webApiUrl() + "aptc_getStateCitys/" + localStorage.getItem('selectedLanguageCode') + "/" + stateid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ stateid: stateid });
                    this.setState({ citylist: data });
                    this.setState({ cityid: cityid });
                    this.setState({ loading: false });
                });
        }
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
                url = "aptc_company/" + e.target.value;
            }
            else {
                url = "aptc_individual_emiratesid/" + e.target.value;
            }
            fetch(config.webApiUrl() + url)
                .then(response => response.json())
                .then(data => {
                    if (data.StatusCode === "400") {
                        if (check === '1') {
                            alert('company does not exist in our database');
                        }
                        if (check === 'individual') {
                            alert('user does not exist in our database');
                        }
                    }
                    else {
                        if (check === '1') {
                            companyownerslist[index]['partnerid'] = data.companyid;
                            companyownerslist[index]['ownernamear'] = data.companynamear.toUpperCase();
                            companyownerslist[index]['ownernameen'] = data.companynameen.toUpperCase();
                        }
                        else if (check === '2') {
                            companyownerslist[index]['partnerid'] = data.individualid;
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
    handleRemoveCompanyActivities = (idy) => () => {
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
        this.props.refreshCompany(this.state.companyid, 'edit');
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var comp = JSON.stringify(this.state);
        axios.put(config.webApiUrl() + 'aptc_company', comp, {
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
        return (
            <div>
                < div
                    className="modal"
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

                            {this.state.loading === true && <div>
                                <Loader />
                            </div>}
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className="form-group">
                                            <div className='row'>
                                                <div className='col-md-4 col-lg-5 col-sm-4' />
                                                <div className='col-md-4 col-lg-3 col-sm-4'>
                                                    <span className='pics'>&nbsp;&nbsp;&nbsp;
                                                        <img
                                                            id="icon-pics"
                                                            src={!this.state.companyphoto || this.state.companyphoto === null
                                                                ? require('../../assets/company-icon.png')
                                                                : this.state.companyphoto}
                                                            className="img-rounded"
                                                            alt="company"
                                                            height="90"
                                                            width="90" /><br />
                                                    </span>
                                                </div>
                                                <div className='col-md-4 col-lg-4 col-sm-4' />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label>{this.props.t('Company_Name(EN)')}</label>
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
                                                <label>{this.props.t('Company_Name(AR)')}</label>
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
                                                <label>{this.props.t('CR_Number')}</label>
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
                                                <label>{this.props.t('DED')}</label>
                                                <select
                                                    name="dedid"
                                                    data-val="true"
                                                    value={this.state.dedid}
                                                    onChange={this.onChange}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">{this.props.t('DED')}</option>
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
                                                <label>{this.props.t('Legal_Form')}</label>

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
                                                <label>{this.props.t('Established_Date')}</label>
                                                <input
                                                    name="establishmentdate"
                                                    value={this.state.establishmentdate}
                                                    onChange={this.onChange}
                                                    type="date"
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
                                                <label>{this.props.t('Building_Number')}</label>
                                                <input
                                                    name="buildingnumber"
                                                    value={this.state.buildingnumber}
                                                    onChange={(e) => this.onChange(e)}
                                                    type="text"
                                                    required
                                                    className="edit-form"
                                                    placeholder={this.props.t('Building_Number')} />
                                            </div></div>
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
                                            </div></div>
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
                                            </div></div>
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
                                                    name="countryid"
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
                                                <label>City</label>
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
                                                <label>{this.props.t('Company_Type')}</label>
                                                <select
                                                    name="companytypeid"
                                                    value={this.state.companytypeid}
                                                    onChange={this.onChange}
                                                    className="edit-form"
                                                    required companytypelist>
                                                    <option value="">{this.props.t('Company_Type')}</option>
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
                                                <label htmlFor="email">{this.props.t('Email_Address')}</label>
                                                <input
                                                    name="email"
                                                    style={{
                                                        marginTop: '-2.5px'
                                                    }}
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder={this.props.t('Email_Address')} /></div>
                                        </div>
                                    </div>
                                    <div className="row">
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

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <div className="form-group">
                                                <label >{this.props.t('Website_Url')}</label>
                                                <input
                                                    name="website"
                                                    onChange={this.onChange}
                                                    value={this.state.website}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder={this.props.t('Website_Url')} /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="form-group">
                                                <table><tr>
                                                    <td> <label>{this.props.t('Franchisee')}</label></td>
                                                    <td><input style={{ marginLeft: '10px' }}
                                                        name="franchise"
                                                        checked={this.state.franchise}
                                                        onChange={(e) => this.toggleChange(e)}
                                                        type="checkbox"
                                                        className="edit-form"
                                                        placeholder={this.props.t('eg_John_Stones')} /></td>
                                                </tr></table>
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
                                    <button type="submit" className="btn btn-primary">{this.props.t('Save_Changes')}</button>
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
export default translate(EditCompany);