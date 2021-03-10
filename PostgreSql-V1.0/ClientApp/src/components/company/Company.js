import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddCompany from './AddCompany';
import $ from 'jquery';
import EditCompany from './EditCompany';
import ObjectView from '../ViewObjectModel/ObjectView';
import Docs from '../documents/Docs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as config from '../../config';
import CompanyPermitRequestList from '../common/permit/CompanyPermitRequestList';
import CompanyVehicles from '../vehicle/Vehicles';
import Individuals from '../individuals/Individuals';
import Loader from '../loader';
import { OverlayTrigger } from 'react-bootstrap';
import popoverHoverFocus from '../notifications/popovers/PopoverHoverFocus';
import AddPartner from './AddPartners';
import AddActivity from './AddActivities';
import Moment from 'react-moment';

class Company extends Component {
    displayName = Company.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,

            requiredItem: 0,

            currentPage: 0,
            pageLimit: 0,
            statusid: 0,
            companyid: 0,
            optDetails: {},
            countryCodes: [],
            Id: {},
            vecList: [],
            currentDrivers: [],
            filteredCompanies: [],
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            mode: '',
            isEditOpen: false,
            isAddOpen: false,
            isModelViewOpen: true,
            objModelName: '',

            redirectCompanyVehicle: false,
            redirectPermit: false,
            redirectIndividual: false,
            redirectCompany: true,

            numEmployeesCount: 0,
            loading: true,
            isAddPartner: true,
            isAddActivity: true,
        };

        this.updatePredicate = this
            .updatePredicate
            .bind(this);

        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.saveModalDetails = this
            .saveModalDetails
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
        this.callVehicle = this
            .callVehicle
            .bind(this);

        this.callPermit = this
            .callPermit
            .bind(this);

        this.callEmployee = this
            .callEmployee
            .bind(this);


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data });
            });
    }
    componentWillMount() {
        this.setState({ isAddOpen: true, isEditOpen: true });
        window.removeEventListener("resize", this.updatePredicate);
        this.bindCompany();
    }
    componentDidMount() {

        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
    bindCompany(companyid, mode) {
        fetch(config.webApiUrl() + 'aptc_company/' + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
                this.setState({ currentDrivers: data });
                if (mode === 'edit') {
                    for (var i = 0; i < data.length; i++) {
                        if (companyid === data[i].companyid) {
                            this.setState({ vec: data[i], mode: '' });
                            break;
                        }
                    }
                }
                else {
                    this.setState({ vec: data[0], loading: false });
                }
            }).catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    this.setState({ loading: false });
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });
    }
    onPageChanged = data => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        if (vecList.StatusCode !== '404') {
            const currentDrivers = vecList.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }

    }

    updatePredicate() {
        this.setState({
            isDesktop: window.innerWidth > 991
        });
    }

    editCompany = (id) => {
        this.setState({ isEditOpen: true, mode: 'edit' });
    }
    addCompany = (e) => {
        this.setState({ isAddOpen: true, mode: 'add' });
    }
    addDocument = (companyid) => {
        this.setState({ companyid: companyid, isDocOpen: true, mode: 'doc' });
    };
    deleteCompany = (companyid) => {
        if (!window.confirm("Do you want to delete company with Id: " + companyid))
            return;
        else {
            var url = config.webApiUrl() + 'aptc_company/' + companyid;
            fetch(url, { method: 'delete' }).then(data => {
                this.bindCompany(0, '');
                $('.close').click();
            }).catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    if (error.response.data !== undefined) {
                        alert(error.response.data.ResponseMessage);
                    }
                } else {
                    alert(error.message);
                    const requiredItem = this.state.requiredItem;
                }
            });
        }
    }
    changeCompanyStatus = (companyid, statusid, name, rejectreason) => {
        var confirmMsg = "";
        var msgRejectreason = "";
        if (statusid === 420) {
            confirmMsg = "Are you sure you want to keep " + name + " as pending?";
            msgRejectreason = "Reassigned status to pending by Management... awaiting further documents";
        }
        else if (statusid === 421) {
            confirmMsg = "Are you sure you want to approve " + name + " ?";
            msgRejectreason = "Approved by Management";
        }
        else {
            confirmMsg = "Are you sure you want to reject " + name + " ?";
            msgRejectreason = "No record found...";
        }
        var obj = {};
        obj.id = companyid;
        obj.statusid = statusid;
        if (rejectreason) {
            var rejectreasons = rejectreason;
            obj.rejectreason = rejectreasons;
        } else {
            obj.rejectreason = msgRejectreason;
        }
        if (!window.confirm(confirmMsg))
            return;
        else {
            const param = JSON.stringify(obj);
            axios.put(config.webApiUrl() + 'aptc_company_approved', param, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.bindCompany(companyid, 'edit');
                $('.close').click();
            }).catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    alert(error.response.data.ResponseMessage);
                } else {
                    alert(error.message);
                }
            });
        }
    }
    oepModelViewOpenClick(obj, companyid) {
        this.setState({ isModelViewOpen: true, companyid: companyid });
        this.setState({ objModelName: obj });
        switch (obj) {
            case "Ownership":
                this.setState({ Action: "Ownership" });
                break;
            case "Roles":
                this.setState({ Action: "Roles" });
                break;
            case "Fines":
                this.setState({ Action: "Fines" });
                break;
            case "Vehicles":
                this.setState({ Action: "Vehicles" });
                break;
            case "Documents":
                this.setState({ Action: "Documents" });
                break;
            case "Employees":
                this.setState({ Action: "Employees" });
                break;
            case "Permits":
                this.setState({ Action: "Permits" });
                break;
            case "Activity":
                this.setState({ Action: "Activity" });
                break;
        }
    }
    addPartner = (companyid) => {
        this.setState({ isAddPartner: true, companyid: companyid, mode: 'adptr' });
    }
    addActivity = (companyid) => {
        this.setState({ isAddActivity: true, companyid: companyid, mode: 'adact' });
    }

    hideVehicle = () => {

        this.setState({ redirectCompanyVehicle: false, redirectPermit: false, redirectIndividual: false, redirectCompany: true });
        //console.log("shown Vehicle");
    }
    callVehicle(index) {
        var _id;
        //console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.crnumber;

        if (!window.confirm("View Vehicles Registered with " + _name))
            return;
        else {
            this.setState({ redirectCompanyVehicle: true, redirectPermit: false, redirectIndividual: false, redirectCompany: false });
        }
    }
    callEmployee = (index) => {
        var _id;
        // console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.crnumber;

        if (!window.confirm("View Employees Registered with " + _name))
            return;
        else {
            this.setState({ redirectIndividual: true, redirectPermit: false, redirectCompanyVehicle: false, redirectCompany: false });
        }

    }
    hideEmployee = () => {
        this.setState({ redirectIndividual: false, redirectPermit: false, redirectCompanyVehicle: false, redirectCompany: true });
    }
    callPermit = () => {
        var _id;
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.crnumber;
        if (!window.confirm("View Permits Registered with " + _name))
            return;
        else {
            this.setState({ redirectPermit: true, redirectIndividual: false, redirectCompanyVehicle: false, redirectCompany: false });
        }
    }
    hidePermit = () => {
        this.setState({ redirectPermit: false, redirectIndividual: false, redirectCompanyVehicle: false, redirectCompany: true });
    }
    replaceModalItem = (index, action, companyid) => {
        this.toggleHide();
        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (companyid === this.state.vecList[indx].companyid) {
                var vec = {};
                this.setState({ requiredItem: indx });
                vec = this.state.vecList[indx];
                this.setState({ vec: vec });
            }
        }
    };
    toggleHide = () => {

        if (this.state.isDesktop) {
            this.setState({ showing: false });
        }

    }

    handleClick = (index) => {
        this.setState({ vec: index });
        //console.log(index);
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
    saveModalDetails = (companyid, mode) => {
        this.setState({ loading: false });
        this.bindCompany(companyid, mode);
    };
    renderCompanyList() {
        const isDesktop = this.state.isDesktop;
        const {
            vecList,
            showing,
            redirectCompanyVehicle,
            redirectPermit,
            redirectIndividual,
            redirectCompany
        } = this.state;
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];

        const { currentPage, totalPages } = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0)
            return null;

        let filteredCompanies = [];
        if (this.state.vecList.length > 0) {
            filteredCompanies = this
                .state
                .currentDrivers
                .filter((vec) => {
                    return (
                        vec.website.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        vec.address.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        vec.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        vec.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        vec.telephonenumber.toString().indexOf(this.state.search) !== -1 ||
                        vec.crnumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    );
                });
        }

        return (
            <div className="wrapper-content">
                {this.state.redirectCompany
                    ? (
                        <div
                            className={(localStorage.getItem('selectedLanguageCode') == 1)
                                ? "col-lg-12 fixed-search"
                                : "arab-fixed-search"}>
                            <div className="">
                                <div
                                    className={(localStorage.getItem('selectedLanguageCode') == 1)
                                        ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                                        : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>
                                    <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                        <div
                                            className="panel-title black-button-admin  center"
                                            data-toggle="modal"
                                            onClick={(e) => this.addCompany()}
                                            data-target="#addModal">
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin">Add Company</span>
                                        </div>
                                    </Animated>
                                </div>

                                <div
                                    className={(localStorage.getItem('selectedLanguageCode') == 1)
                                        ? "col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input pull-right"
                                        : "col-md-9 col-lg-10 col-sm-9 col-xs-9 add-button pull-left"}>
                                    <Animated
                                        className="search-input-height"
                                        animationIn="bounceIn"
                                        animationOut="fadeOut"
                                        isVisible>
                                        <div className="panel panel-default search-input-wrapper">
                                            <div className="panel-body search-input">
                                                <input
                                                    type="text"
                                                    className="form-search-admin"
                                                    placeholder="Search ..."
                                                    value={this.state.search}
                                                    onChange={this
                                                        .updatesearch
                                                        .bind(this)} />

                                                <span className="btn-search-edit">
                                                    <button type="button">
                                                        <i className="glyphicon glyphicon-search btn-search" />
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                    </Animated>
                                </div>
                            </div>
                        </div>
                    )
                    : null}
                {this.state.isAddOpen === true && <AddCompany mode={this.state.mode} saveModalDetails={this.saveModalDetails} />
                }

                {this.state.isEditOpen === true && <EditCompany
                    companyid={modalData.companyid}
                    mode={this.state.mode}
                    saveModalDetails={this.saveModalDetails} />
                }

                {<Docs
                    type="COMP"
                    companyid={this.state.companyid}
                    saveModalDetails={this.saveModalDetails}
                    mode={this.state.mode}
                />
                }
                {
                    this.state.isAddPartner === true &&
                    <AddPartner companyid={this.state.companyid} mode={this.state.mode} saveModalDetails={this.saveModalDetails} />
                }
                {
                    this.state.isAddActivity === true &&
                    <AddActivity companyid={this.state.companyid} mode={this.state.mode} saveModalDetails={this.saveModalDetails} />
                }
                {
                    this.state.isModelViewOpen === true &&
                    <ObjectView Action={this.state.Action} ActionType="COMP" companyid={this.state.companyid} />
                }

                <div
                    className={this.state.showing
                        ? ([(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "entity-table"
                            : "entity-table-rtl"])
                        : "entity-table entity-table-padding"}>

                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                    <div
                        className={this.state.showing
                            ? "panel panel-default"
                            : ([localStorage.getItem('selectedLanguageCode') == 1
                                ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-lef" +
                                "t"
                                : "col-lg-4 col-md-4 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                "t-12 col-xs-offset-12 panel panel-default animate-table pull-right arab-left-pan" +
                                "el"])}>
                        <div className="panel panel-body">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="table-responsive">
                                        <table className="table table-width">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <label className="container-x">
                                                            <input type="checkbox" />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </th>
                                                    <th scope="col">Basic Info</th>
                                                    <th

                                                        scope="col"
                                                        className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Company Reg</th>
                                                    <th

                                                        scope="col"
                                                        className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Address</th>
                                                    <th

                                                        scope="col"
                                                        className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Email</th>
                                                    <th

                                                        scope="col"
                                                        className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Telephone</th>
                                                    <th

                                                        scope="col"
                                                        className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="fixed_body">
                                                {filteredCompanies.map((vec, index) => (
                                                    <tr className="panel-bubble-new" key={index}>
                                                        <td scope="row">
                                                            <label className="container-x">
                                                                <input type="checkbox" />
                                                                <span className="checkmark" />
                                                            </label>

                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="shown-column"
                                                            onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                            {!vec.companyphoto
                                                                ? <i id="" className="fas fa-building icon-exclamation-circle-gold-small" />
                                                                : <img style={{ marginLeft: '5px' }}
                                                                    id="icon-pics"
                                                                    src={!vec.companyphoto
                                                                        ? require('../../assets/user-img.png')
                                                                        : vec.companyphoto}
                                                                    onError={(e) => {
                                                                        e.target.src = require('../../assets/user-img.png')
                                                                    }}
                                                                    className="img-circle"
                                                                    onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}
                                                                    alt="woman"
                                                                    height="30"
                                                                    width="30" />
                                                            }
                                                            &nbsp;

                                                                {vec.namear}
                                                            &nbsp; {vec.nameen}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                            {vec.crnumber}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                            {vec.buildingnumber}
                                                            &nbsp; {vec.flatnumber}
                                                            &nbsp; {vec.street}
                                                            &nbsp; {vec.city}
                                                            &nbsp; {vec.address.state}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                            {vec.email}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                            {vec.telephonenumber}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing
                                                                ? "status-item"
                                                                : "hidden-column"}>
                                                            <span className="btn-group">
                                                                <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                <button
                                                                    dir="ltr"
                                                                    className={vec.statusid == (420).toString()
                                                                        ? "btn btn-active status dropdown-toggle status-title"
                                                                        : ([vec.statusid == (422).toString()
                                                                            ? "btn btn-status-rejected dropdown-toggle status status-title-rejected"
                                                                            : "btn btn-status-approved dropdown-toggle status status-title-approved"])}
                                                                    data-toggle="dropdown">
                                                                    {vec.statusid == (420).toString()
                                                                        ? "Pending"
                                                                        : ([vec.statusid == (422).toString()
                                                                            ? "Rejected"
                                                                            : "Approved"])}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeCompanyStatus(vec.companyid, 420, vec.nameen, vec.rejectreason)}>Pending</li>
                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeCompanyStatus(vec.companyid, 421, vec.nameen, vec.rejectreason)}>Approved</li>
                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeCompanyStatus(vec.companyid, 422, vec.nameen, vec.rejectreason)}>Rejected</li>
                                                                </ul>
                                                            </span>
                                                        </td>

                                                        <td scope="row" className={localStorage.getItem('selectedLanguageCode') == 1 ? "more-item" : "rtl-more-item"}>
                                                            <div className="dropdown">
                                                                <button
                                                                    id="dropdownMenu4"
                                                                    data-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="true"
                                                                    type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                                </button>

                                                                {isDesktop
                                                                    ? (
                                                                        <ul
                                                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-left"}
                                                                            aria-labelledby="dropdownMenu4">
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    id="call"
                                                                                    data-toggle="modal"
                                                                                    data-target="#editModal"
                                                                                    onClick={(e) => this.editCompany(vec.companyid)}
                                                                                >Edit Details</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className={!this.state.show
                                                                                        ? ""
                                                                                        : this.state.show}
                                                                                    onClick={(e) => this.deleteCompany(vec.companyid)}>Delete</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    id="callAttachment"
                                                                                    className={!this.state.show
                                                                                        ? ""
                                                                                        : this.state.show}
                                                                                    data-toggle="modal"
                                                                                    data-target="#attachModal"
                                                                                    onClick={() => this.addDocument(this.state.vec.companyid)}>Attachment</button>
                                                                            </li>
                                                                        </ul>
                                                                    )
                                                                    : (
                                                                        <ul
                                                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-left"} aria-labelledby="dropdownMenu4">
                                                                            aria-labelledby="dropdownMenu4">
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    id="call"
                                                                                    data-toggle="modal"
                                                                                    data-target="#editModal"
                                                                                    onClick={(e) => this.editCompany(vec.companyid)}
                                                                                >Edit Details</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className={!this.state.show
                                                                                        ? ""
                                                                                        : this.state.show}
                                                                                    onClick={(e) => this.deleteCompany(vec.companyid)}
                                                                                >Delete</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    id="callAttachment"
                                                                                    className={!this.state.show
                                                                                        ? ""
                                                                                        : this.state.show}
                                                                                    data-toggle="modal"
                                                                                    data-target="#attachModal"
                                                                                    onClick={() => this.addDocument(vec.companyid)}>Attachment</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className="btn btn-active"
                                                                                    id="Ownership"
                                                                                    onClick={(e) => this.oepModelViewOpenClick('Ownership', vec.companyid)}
                                                                                    data-toggle="modal"
                                                                                    data-target="#objectModal"
                                                                                    style={{
                                                                                        cursor: 'pointer'
                                                                                    }}>No of Owners : {vec.ownershipcount}</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className="btn btn-active"
                                                                                    id="Fines"
                                                                                    data-toggle="modal"
                                                                                    data-target="#objectModal"
                                                                                    onClick={(e) => this.oepModelViewOpenClick('Fines', vec.companyid)}
                                                                                    style={{
                                                                                        cursor: 'pointer'
                                                                                    }}>No Of Fines: {vec.finescount}</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className="btn btn-active"
                                                                                    id="Vehicles"
                                                                                    data-toggle="modal"
                                                                                    data-target="#objectModal"
                                                                                    onClick={(e) => this.oepModelViewOpenClick('Vehicles', vec.companyid)}
                                                                                    style={{
                                                                                        cursor: 'pointer'
                                                                                    }}>No of Vehicles: {vec.vehiclescount}</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className="btn btn-active"
                                                                                    id="Activity"
                                                                                    data-toggle="modal"
                                                                                    data-target="#objectModal"
                                                                                    onClick={(e) => this.oepModelViewOpenClick('Activity', vec.companyid)}
                                                                                    style={{
                                                                                        cursor: 'pointer'
                                                                                    }}>No of Activities: {vec.activitiesCount}</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button
                                                                                    className="btn btn-active"
                                                                                    id="Employees"
                                                                                    data-toggle="modal"
                                                                                    data-target="#objectModal"
                                                                                    onClick={(e) => this.oepModelViewOpenClick('Employees', vec.companyid)}>No of employees: {vec.noemployeescount}
                                                                                </button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button className="black-margin action" onClick={this.callVehicle}>
                                                                                    <i className="fas fa-car" />
                                                                                    &nbsp; Vehicles<label className="label label-danger notify-label">{vec.vehiclescount}</label>
                                                                                </button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button className="black-margin action" onClick={this.callEmployee}>
                                                                                    <i className="fas fa-user-alt" />
                                                                                    &nbsp; Employees<label className="label label-danger notify-label">{vec.noemployeescount}</label>
                                                                                </button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button className="black-margin action" onClick={this.callPermit}>
                                                                                    <i className="fa fa-ticket-alt rotate-small" />
                                                                                    &nbsp; Permits1<label className="label label-danger notify-label">{vec.permitsCount}</label>
                                                                                </button>
                                                                            </li>

                                                                        </ul>
                                                                    )
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="movein">
                                <div>
                                    <h4>
                                        <strong >{totalDrivers}</strong>{" "}
                                        User entries
                                        </h4>
                                </div>
                                <div>
                                    <Pagination
                                        totalRecords={totalDrivers}
                                        pageLimit={1000}
                                        pageNeighbours={1}
                                        onPageChanged={this
                                            .onPageChanged
                                            .bind(this)} />
                                </div>
                            </div>

                        </div>
                    </div>
                </Animated>
                {this.state.vec.companyid !== undefined && !this.state.showing
                    ? <div>
                        <div
                            className={this.state.showing
                                ? "panel panel-default main-body-height-admin"
                                : ([localStorage.getItem('selectedLanguageCode') == 1
                                    ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                    "t-12 col-xs-offset-12 panel panel-default main-body-height-admin"
                                    : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-rig" +
                                    "ht rtl-main-body-height-admin"])}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                <br />
                                <div
                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                        ? ""
                                        : " rtl-flip"}>
                                    <div
                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                            ? "col-lg-3 col-md-0 col-sm-6 title-image pull-left"
                                            : "col-lg-3 col-md-0 col-sm-6 title-image pull-left"}>
                                        {!this.state.vec.companyphoto || this.state.vec.companyphoto === null ?
                                            <i className="icon-building-gold-admin fas fa-building" /> :
                                            <img
                                                id="icon-pics"
                                                src={this.state.vec.companyphoto}
                                                className="img-circle"
                                                alt="woman"
                                                height="120"
                                                width="120" />
                                        }
                                    </div>
                                    <div
                                        id="left-border-line-admin"
                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                            ? "col-lg-9 col-md-12 col-sm-9 left-margin"
                                            : "col-lg-9 col-md-12 col-sm-9 left-margin"}>

                                        <div
                                            className={localStorage.getItem('selectedLanguageCode') == 1
                                                ? ""
                                                : "rtl-flip"}>

                                            <div
                                                className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "pull-right"
                                                    : "pull-left"}>
                                                <i
                                                    id="cancel"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}
                                                    className="fas fa-times" />
                                            </div>
                                            <p>
                                                <span
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "title-side-detail-panel ltr-space"
                                                        : "title-side-detail-panel rtl-space"}>{this.state.vec.nameen}</span>
                                                <span
                                                    className="btn-group"
                                                    style={{
                                                        marginBottom: '15px',
                                                        marginLeft: '5px'
                                                    }}>
                                                    <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                    <button
                                                        className={this.state.vec.statusid == (420).toString()
                                                            ? "btn btn-active status dropdown-toggle status-title"
                                                            : ([this.state.vec.statusid == (422).toString()
                                                                ? "btn btn-status-rejected dropdown-toggle status status-title-rejected"
                                                                : "btn btn-status-approved dropdown-toggle status status-title-approved"])}
                                                        data-toggle="dropdown">
                                                        {this.state.vec.statusid == (420).toString()
                                                            ? "Pending"
                                                            : ([this.state.vec.statusid == (422).toString()
                                                                ? "Rejected"
                                                                : "Approved"])}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                    <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                        <li
                                                            className="dropdown-spacing"
                                                            onClick={(e) => this.changeCompanyStatus(this.state.vec.companyid, 420, this.state.vec.nameen, this.state.vec.rejectreason)}
                                                        >Pending</li>
                                                        <li
                                                            className="dropdown-spacing"
                                                            onClick={(e) => this.changeCompanyStatus(this.state.vec.companyid, 421, this.state.vec.nameen, this.state.vec.rejectreason)}
                                                        >Approved</li>
                                                        <li
                                                            className="dropdown-spacing"
                                                            onClick={(e) => this.changeCompanyStatus(this.state.vec.companyid, 422, this.state.vec.nameen, this.state.vec.rejectreason)}
                                                        >Rejected</li>
                                                    </ul>
                                                </span>
                                            </p>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div
                                                className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "col-md-6 col-lg-6"
                                                    : "col-md-6 col-lg-6 rtl-flip"}>
                                                <p>Address: {this.state.vec.address}</p>

                                                <br />
                                                <p>Website: {this.state.vec.website}</p>
                                                <p>Email: {this.state.vec.email}</p>
                                                <p>Phone: {this.state.vec.telephonenumber}</p>
                                                <br />
                                                <p>Establishment Date:
                                                                <Moment format="DD MMM YYYY">{this.state.vec.establishmentdate}</Moment>
                                                </p>
                                                <p>Legal Form: {this.state.vec.legalform}</p>
                                                <p>Company Type: {this.state.vec.companytype}</p>
                                                <p>DED: {this.state.vec.ded}</p>
                                            </div>
                                            <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                ? "col-md-6 col-lg-6"
                                                : "col-md-6 col-lg-6 rtl-flip"}>
                                                <p>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "btn btn-active"
                                                            : "btn btn-active"}
                                                        id="Ownership"
                                                        onClick={(e) => this.oepModelViewOpenClick('Ownership', this.state.vec.companyid)}
                                                        data-toggle="modal"
                                                        data-target="#objectModal"
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}>No of Owners : {this.state.vec.ownershipcount}</button>
                                                </p>
                                                <p>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "btn btn-active"
                                                            : "btn btn-active"}
                                                        id="Fines"
                                                        data-toggle="modal"
                                                        data-target="#objectModal"
                                                        onClick={(e) => this.oepModelViewOpenClick('Fines', this.state.vec.companyid)}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}>No Of Fines: {this.state.vec.finescount}</button>
                                                </p>

                                                <p>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "btn btn-active"
                                                            : "btn btn-active"}
                                                        id="Vehicles"
                                                        data-toggle="modal"
                                                        data-target="#objectModal"
                                                        onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.vec.companyid)}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}>No of Vehicles: {this.state.vec.vehiclescount}</button>
                                                </p>
                                                <p>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "btn btn-active"
                                                            : "btn btn-active"}
                                                        id="Vehicles"
                                                        data-toggle="modal"
                                                        data-target="#objectModal"
                                                        onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.vec.companyid)}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}>No of Activities: {this.state.vec.activitiesCount}</button>
                                                </p>
                                                <p>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "btn btn-active"
                                                            : "btn btn-active"}
                                                        id="Documents"
                                                        data-toggle="modal"
                                                        data-target="#objectModal"
                                                        onClick={(e) => this.oepModelViewOpenClick('Documents', this.state.vec.companyid)}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}>Documents : {this.state.vec.documentscount}</button>
                                                </p>


                                            </div>

                                        </div>

                                        <div
                                            className={localStorage.getItem('selectedLanguageCode') == 1
                                                ? "colour"
                                                : "colour rtl-flip"} style={{ marginBottom: '20px', height: '200px' }}>
                                            <OverlayTrigger
                                                trigger={['hover', 'focus']}
                                                placement="bottom"
                                                overlay={popoverHoverFocus}>
                                                <button
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "black-margin action"
                                                        : "black-margin rtl-black-margin action "}
                                                    onClick={this.callVehicle}>
                                                    <i className="fas fa-car" />
                                                    &nbsp; Vehicles<label className="label label-danger notify-label">{this.state.vec.vehiclescount}</label>
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                trigger={['hover', 'focus']}
                                                placement="bottom"
                                                overlay={popoverHoverFocus}>
                                                <button
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "black-margin action"
                                                        : "black-margin rtl-black-margin action "}
                                                    onClick={this.callEmployee}>
                                                    <i className="fas fa-user-alt" />
                                                    &nbsp; Employees<label className="label label-danger notify-label">{this.state.vec.noemployeescount}</label>
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                trigger={['hover', 'focus']}
                                                placement="bottom"
                                                overlay={popoverHoverFocus}>
                                                <button
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "black-margin action"
                                                        : "black-margin rtl-black-margin action "}
                                                    onClick={this.callPermit}>
                                                    <i className="fa fa-ticket-alt rotate-small" />
                                                    &nbsp; Permits<label className="label label-danger notify-label">{this.state.vec.permitsCount}</label>
                                                </button>
                                            </OverlayTrigger>
                                            <button
                                                className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "black-margin action"
                                                    : "black-margin rtl-black-margin action "}
                                                data-toggle="modal"
                                                onClick={(e) => this.editCompany(this.state.vec.companyid)}
                                                data-target="#editModal">
                                                <i className="glyphicon glyphicon-edit" />
                                                &nbsp; Edit Details
                                                        </button>
                                            <button
                                                className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "black-margin action"
                                                    : "black-margin rtl-black-margin action "}
                                                onClick={(e) => this.deleteCompany(this.state.vec.companyid)}>
                                                <i className="fa fa-trash" />
                                                &nbsp; Delete
                                                        </button>
                                            <button
                                                className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                data-toggle="modal"
                                                data-target="#attachModal"
                                                onClick={() => this.addDocument(this.state.vec.companyid)}>
                                                <i id="action" className="fa fa-paperclip" />
                                                &nbsp; Attachment
                                                      </button>
                                            <button className="black-margin action" data-toggle="modal" data-target="#activityModal"
                                                onClick={() => this.addActivity(this.state.vec.companyid)}>
                                                <i id="action" className="fa fa-plus" />
                                                &nbsp;Add Activity
                                                    </button>
                                            <button className="black-margin action" data-toggle="modal" data-target="#partnerModal"
                                                onClick={() => this.addPartner(this.state.vec.companyid)}>
                                                <i id="action" className="fa fa-plus" />
                                                &nbsp; Add Partner
                                                    </button>
                                        </div>
                                    </div>
                                </div>
                            </Animated>
                        </div>

                    </div>
                    : null}

            </div>
            <div>
                {redirectPermit
                    ? <CompanyPermitRequestList
                        goToHome={this
                            .hidePermit
                            .bind(this)}
                        crnumber={modalData.crnumber}
                        companyid={modalData.companyid}
                        nameen={modalData.nameen}
                        namear={modalData.namear}
                        companyPhoto={modalData.companyPhoto}
                        name={modalData.name}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails} />
                    : null}
                {redirectCompanyVehicle
                    ? <CompanyVehicles
                        goToHome={this
                            .hideVehicle
                            .bind(this)}
                        crnumber={modalData.crnumber}
                        companyid={modalData.companyid}
                        companyPhoto={modalData.companyPhoto}
                        nameen={modalData.nameen}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails} />
                    : null}
                {redirectIndividual
                    ? <Individuals
                        goToHome={this
                            .hideEmployee
                            .bind(this)}
                        crnumber={modalData.crnumber}
                        companyid={modalData.companyid}
                        companyPhoto={modalData.companyPhoto}
                        name={modalData.name}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails} />
                    : null}
            </div>

            </div >
        );
    }
    render() {
        if (this.state.redirectCompanyVehicle) {
            return <Redirect push to={{ pathname: '/company-vehicles', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectPermit) {
            return <Redirect push to={{ pathname: '/company-permits-requests-list', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectIndividual) {
            return <Redirect push to={{ pathname: '/employees', state: { vec: this.state.vec } }} />;
        }

        let filteredCompanies = this
            .state
            .currentDrivers
            .filter((vec) => {
                return (vec.website.toLowerCase().indexOf(this.state.search) !== -1 || vec.website.toUpperCase().indexOf(this.state.search) !== -1 || vec.address.toLowerCase().indexOf(this.state.search) !== -1 || vec.address.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1 || vec.nameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.nameen.toUpperCase().indexOf(this.state.search) !== -1);
            });

        let contents = this.state.loading
            ? <p className="wrapper-content"><Loader /></p>
            : this.renderCompanyList(filteredCompanies);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >
        );
    }
}
export default Company;
