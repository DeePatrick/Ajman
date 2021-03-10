import React, { Component } from 'react';
import Pagination from '../shared/Pagination';
import { Animated } from "react-animated-css";
import RenewPermit from './RenewPermit';
import './Permit.css';
import RequestPermit from './RequestPermit';
import $ from 'jquery';
import Loader from '../loader';
import * as config from './../../config';
import Print from '../Permit/Print/Print';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../language/static_content_english_cust.json';
import ar from '../../language/static_content_arabic_cust.json';
import type { T } from 'react-multi-lang';
import { setLanguage, getLanguage } from 'react-multi-lang';

type Props = {
    t: T
}

export class Permit extends Component {
    displayName = Permit.name

    constructor(props) {
        super(props);

        setTranslations({ ar, en })
        //if (localStorage.getItem('selectedLanguageCode') === '2') {
        //    setDefaultLanguage('ar');
        //}
        //else {
        //    setDefaultLanguage('en')
        //}

        this.state = {
            companyid: '',
            mode: '',
            permitlist: [],
            permitList: [],
            currentDrivers: [],
            loading: false,
            offset: 0,
            vec: [],
            todayDate: '',
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            countryCodes: [],
            companyList: [],
            indListPermit: [],
            vehListPermit: [],
            compListPermit: [],
            docFileList: [],

            docFile: [],
            docClassAll: [],
            docTypesAll: [],
            isAddOpen: false,
            isPrint: true,
            permitid: 0,
            permittypeid: 0,
            approvedcomplist: []
        };
        this.addClick = this
            .addClick
            .bind(this);
        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.refreshModel = this
            .refreshModel
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);


    }
    componentWillMount() {

        if (localStorage.getItem('selectedLanguageCode') === '2') { setLanguage('ar'); }
        else { setLanguage('en'); }

        this.setState({ loading: true, isAddOpen: true });
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        //today = mm + '-' + dd + '-' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;
        this.setState({ todayDate: today });
        this.bindCompany();
        this.bindPermit(0);
    }

    bindCompany() {
        var compList = [];
        fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                //this.setState({ companyList: data });
                $.each(data, function (key, value) {
                    if (value.statusid === 421) {
                        compList.push(value);
                    }
                })
                this.setState({ approvedcomplist: compList });
                this.setState({ companyList: compList });
            });

    }
    bindPermit(companyid) {
        this.setState({ loading: true });
        var url = '';
        if (companyid === 0) {
            url = config.webApiUrl() + "aptc_individual_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid');
        }
        else {
            url = config.webApiUrl() + "aptc_company_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + companyid;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ vec: data[0] });
                }
                this.setState({ permitlist: data, currentDrivers: data, loading: false });
                this.setState({ loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
            });
    }
    onPageChanged = data => {
        const { permitlist } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = permitlist.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentDrivers, totalPages });
    };
    companyChange(e) {
        this.setState({ companyid: e.target.value });
        if (e.target.selectedIndex > 0) {
            this.bindPermit(e.target.value);
        }
        else {
            this.bindPermit(0);
        }
    }
    replaceModalItem = (docOutId) => {
        for (var indx = 0; indx < this.state.permitlist.length; indx++) {
            if (docOutId === this.state.permitlist[indx].docOutId) {
                var vec = {};
                vec = this.state.permitlist[indx];
                this.setState({ requiredItem: indx });
            }
        }
    };
    addClick = (e) => {
        this.setState({ isAddOpen: true, mode: 'add' });
    };
    Print = (permittypeid, permitid) => {
        this.setState({ isPrint: true, mode: 'print', permittypeid: permittypeid, permitid: permitid });
    };

    refreshModel = (vec) => {
        this.setState({ mode: '' });
        this.bindPermit(0);
    };

    deletePermit = (permitid) => {
        this.setState({ loading: true });
        if (!window.confirm("Do you want to delete permit with Id: " + permitid)) {
            this.setState({ loading: false });
            return;

        }
        else {
            fetch(config.webApiUrl() + "aptc_permit/" + permitid, { method: 'delete' }).then(data => {
                this.bindPermit(0);

            }).catch((error) => {
                alert("axios error:", error.response.data.ResponseMessage);
                this.setState({ loading: false });
            });
        }
    };
    handleClick = (index) => {
        this.setState({ vec: index });
        console.log(index);
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    render() {
        const { permitlist } = this.state;
        debugger;
        const totalDrivers = permitlist.length;
        let contents = "";
        if (totalDrivers === 0) {
            contents = (
                <div className="row">
                    {this.state.loading === false &&
                        < div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                {
                                    this.state.approvedcomplist.length > 0 &&
                                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                        <div className="panel-title black-button-admin center"
                                            data-toggle="modal"
                                            data-target="#requestModal"
                                            onClick={this
                                                .addClick
                                                .bind(this)} style={{ width: '200px' }}>
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin" style={{ marginLeft: '6px' }}>Add Permit</span>
                                        </div>
                                        {this.state.approvedcomplist.length > 0 &&
                                            <div className="form-group" style={{ marginTop: '20px' }}>
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label htmlFor="vehType">Company</label>
                                                    <select
                                                        data-val="true"
                                                        value={this.state.companyid}
                                                        onChange={(e) => this.companyChange(e)}
                                                        className="edit-form"
                                                        required>
                                                        <option value="">All</option>
                                                        {this
                                                            .state
                                                            .companyList
                                                            .map((comp, index) => <option key={index} value={comp.companyid}>{comp.nameen} </option>)}
                                                    </select>        <br />
                                                </div>
                                            </div>}
                                    </div>
                                }
                                {
                                    this.state.approvedcomplist.length === 0 &&
                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                        <p style={{ marginTop: '20px', fontSize: '20px', color: 'red' }}>You dont have any approved company!</p>
                                    </div>
                                }
                                {
                                    this.state.approvedcomplist.length > 0 && permitlist.length === 0 &&
                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                        <p style={{ marginTop: '20px', fontSize: '20px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                    </div>
                                }
                            </Animated>
                            {this.state.isAddOpen === true && this.state.approvedcomplist.length > 0 &&
                                <RequestPermit
                                    mode={this.state.mode}
                                    refreshModel={this.refreshModel} />}
                        </div>}
                </div>)
        }
        else {
            let filteredPermits = this
                .state
                .currentDrivers
                .filter((vec) => {
                    return (
                        vec.permittype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    );

                });
            contents =
                (
                    <div>
                        <div className="row">

                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <div className="row align-items-center nil-margin">
                                    <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
                                        <span>
                                        <i className="fa fa-ticket icon-title-small"></i>
                                        </span>
                                    </div>
                                <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 title-top-padding">
                                        <strong className="font-custom-standard-gold">PERMITS</strong>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                        <button type="button" className="btn btn-standard-gold right">
                                            <span>{this.props.t('Add_Permit')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                            </div>

                            {/*this.state.approvedcomplist.length > 0 &&
                                <div className="col-md-4 col-lg-4 col-sm-4" style={{ marginBottom: '10px' }}>
                                    <label htmlFor="vehType">{this.props.t('Company')}</label>
                                    <select
                                        data-val="true"
                                        value={this.state.companyid}
                                        onChange={(e) => this.companyChange(e)}
                                        className="edit-form"
                                        required>
                                        <option value="">{this.props.t('All')}</option>
                                        {this
                                            .state
                                            .companyList
                                            .map((comp, index) => <option key={index} value={comp.companyid}>{comp.nameen} </option>)}
                                    </select>
                                </div>*/}
                        </div>
                        {this.state.isAddOpen === true && this.state.approvedcomplist.length > 0 &&
                            <RequestPermit
                                mode={this.state.mode}
                                refreshModel={this.refreshModel} />}
                        {
                            this.state.isPrint === true &&
                            <Print permitid={this.state.permitid}
                                permittypeid={this.state.permittypeid}
                                mode={this.state.mode}
                            />
                        }

                        <div className="row">
                            {/*Left Panel - START - Informational List Display*/}
                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default main-body-height-admin">
                                        <div className="panel panel-body">
                                            <div className="list-container-left-panel">
                                                <div className="container-fluid movetop">
                                                    {/*Row Start*/}
                                                    {filteredPermits.map((vec, index) => (
                                                        <div className="row list-row-styling align-items-center" key={index}>
                                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                                <i className="fa fa-ticket icon-custom-standard-grey"></i>
                                                            </div>
                                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding" onClick={this.handleClick.bind(this, vec)}>
                                                                <span className="font-custom-standard-grey">
                                                                    {
                                                                        (vec.vehicleid === null || vec.vehicleid === undefined)
                                                                        &&
                                                                        <span>
                                                                            {vec.driverName}
                                                                        </span>
                                                                    }
                                                                    {
                                                                        (vec.vehicleid !== null || vec.vehicleid !== undefined)
                                                                        &&
                                                                        <span>
                                                                            {vec.platenumber}
                                                                            &nbsp;&nbsp;
                                                                            {vec.permittype}
                                                                        </span>
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding" onClick={this.handleClick.bind(this, vec)}>
                                                                <span className="pull-right">
                                                                    <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {/*Row End*/}
                                                </div>
                                            </div>

                                            <div className="movein">
                                                <div>
                                                    <h4>
                                                        <strong >{totalDrivers}</strong>{" "}
                                                        {this.props.t('Permit_Entries')}
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Animated>
                            </div>
                            {/*Left Panel - END - Informational List Display*/}

                            {/*Right Panel - Start - Informational Panel Display*/}
                            <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 left-border">
                                <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default main-body-height-admin">
                                        <div className="panel panel-body">

                                            <div className="page-container-right-panel">

                                                <div className="row nil-margin align-items-center">

                                                    <div className='col-lg-1 col-md-1 col-sm-1'>
                                                        <span className='content-icon-car'>
                                                            <i className="fa fa-ticket"></i>
                                                        </span>
                                                    </div>

                                                    <div className='col-lg-9 col-md-9 col-sm-9'>
                                                        <span className="title-side-detail-panel"> {
                                                            (this.state.vec.vehicleid === null || this.state.vec.vehicleid === undefined)
                                                            &&
                                                            <span style={{ marginRight: '5px' }}>
                                                                {this.state.vec.driverName}
                                                                    </span>
                                                             }
                                                            {
                                                                (this.state.vec.vehicleid !== null && this.state.vec.vehicleid !== undefined)
                                                                &&
                                                                <span style={{ marginRight: '5px' }}>
                                                                    {this.state.vec.vehiclemake}-{this.state.vec.vehiclemodel}
                                                                </span>
                                                            } </span>
                                                    </div>

                                                    <div className="col-lg-2 col-md-2 col-sm-2">

                                                        {this.state.vec.statusid === 420 &&
                                                            <div className="dropdown dropleft right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Pending').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                        {this.state.vec.statusid === 421 &&
                                                            <div className="dropdown dropleft right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Approved').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                        {this.state.vec.statusid === 422 &&
                                                            <div className="dropdown dropleft right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Rejected').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row nil-margin">
                                                    <div className='col-lg-2 col-md-2 col-sm-2'>  
                                                        <p>
                                                            <a id="Roles" className="btnNew btnNew-active" style={{ cursor: 'pointer', color: '#a97d3a', TextDecoder: 'underline' }}> Permit Documents </a>
                                                        </p>
                                                    </div>
                                                    <div className='col-lg-5 col-md-5 col-sm-5'>
                                                        <p> <strong> {this.props.t('Company')}: </strong>
                                                            {
                                                                (this.state.vec.vehicleid !== null && this.state.vec.vehicleid !== undefined)
                                                                &&
                                                                <span style={{ marginRight: '5px' }}>
                                                                    {this.state.vec.vehiclecompany}
                                                                </span>
                                                            }
                                                            {this.state.vec.company}
                                                        </p>
                                                    {this.state.vec.statusid === 420 &&
                                                        <p>
                                                            <strong> {this.props.t('Duration')}: </strong>{this.state.vec.duration}
                                                        </p>
                                                    }
                                                    {this.state.vec.statusid === 421 &&
                                                        <div>
                                                            <p><strong> {this.props.t('Issue_Date')}:</strong>
                                                                {
                                                                    (this.state.vec.validfrom !== null && this.state.vec.validfrom !== undefined) &&
                                                                    <span style={{ marginLeft: '5px' }}>
                                                                        {this.state.vec.validfrom.split('T')[0]}
                                                                    </span>
                                                                }

                                                            </p>
                                                            <p><strong> {this.props.t('Expiry_Date')} :</strong>

                                                                {
                                                                    (this.state.vec.validto !== null && this.state.vec.validto !== undefined) &&
                                                                    <span style={{ marginLeft: '5px' }}>
                                                                        {this.state.vec.validto.split('T')[0]}
                                                                    </span>
                                                                }

                                                            </p>

                                                        </div>
                                                    }
                                                    </div>
                                                    <div className='col-lg-5 col-md-5 col-sm-5'>

                                                        <p><strong>{this.props.t('Permit_Type')}:</strong> {this.state.vec.permittype} </p>

                                                        <p><strong>{this.props.t('Permit_Number')}</strong> {this.state.vec.permitid}</p>

                                                        {
                                                            (this.state.vec.vehicleid !== null && this.state.vec.vehicleid !== undefined)
                                                            &&
                                                            <p><strong>{this.props.t('Plate_Number')}</strong> {this.state.vec.platenumber}</p>
                                                        }

                                                        <p><strong>{this.props.t('Amount')}:</strong> AED {this.state.vec.amount}</p>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="page-container-footer-right-panel">

                                                <button type="button" className="btn btn-standard-gold container-button-content">
                                                    <i className="glyphicon glyphicon-edit"></i> {this.props.t('Message')}
                                                </button>

                                                <button type="button" className="btn btn-standard-gold container-button-content">
                                                    <i className="fa fa-trash"></i> {this.props.t('Call')}
                                                </button>

                                                {((this.state.vec.permittype === "Driver" ||
                                                    this.state.vec.permittype === "Conductors") &&
                                                    this.state.vec.statusid === 421) &&

                                                    <button type="button" className="btn btn-standard-gold container-button-content" data-toggle="modal" data-target="#printModal" onClick={() => this.Print(this.state.vec.permittypeid, this.state.vec.permitid)}>
                                                        <i className="fa fa-trash"></i> Print
                                                    </button>

                                                }

                                                <button type="button" className="btn btn-standard-gold container-button-content" onClick={() => this.deletePermit(this.state.vec.permitid)}>
                                                    <i className="fa fa-trash"></i> {this.props.t('Delete')}
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                </Animated>

                            </div>
                            {/*Right Panel - END - Informational Panel Display*/}

                        </div>

                    </div>)
        }

        return (
            <div>
                <div>
                    {this.state.loading === true
                        && <div><Loader /></div>}
                    {contents}
                </div>
            </div>

        );

    }
}
export default translate(Permit);
