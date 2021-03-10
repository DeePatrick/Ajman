import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
//import AddCompany from './AddCompany';
import $ from 'jquery';
//import EditCompany from './EditCompany';
//import CompanyObjectView from './CompanyObjectView';
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
import Moment from 'react-moment';

class CompanyApproval extends Component {
    displayName = CompanyApproval.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,
            action: '',
            requiredItem: 0,

            currentPage: 0,
            pageLimit: 0,
            statusid: 0,

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
            isModelViewOpen: false,
            objModelName: '',

            redirectCompanyVehicle: false,
            redirectPermit: false,
            redirectIndividual: false,
            redirectCompany: true,

            numEmployeesCount: 0,
            loading: true
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
        this.isLoding = this
            .isLoding
            .bind(this);

        this.bindCompany('pen');

        this.fullDelete = this
            .fullDelete
            .bind(this);

        this.handleClick = this
            .handleClick
            .bind(this);

        this.addClick = this
            .addClick
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

        this.oepModelViewOpenClick = this
            .oepModelViewOpenClick
            .bind(this);

       

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data });
            });
    }
    componentWillMount() {

        window.removeEventListener("resize", this.updatePredicate);
        this.bindCompany('pen');
    }
    componentDidMount() {

        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillReceiveProps(nextprocs) {
        this.setState({ vecList: [] });
        this.setState({ action: nextprocs.action });
        this.bindCompany(nextprocs.action);
    }
    updatePredicate() {
        this.setState({
            isDesktop: window.innerWidth > 991
        });
    }
    editCompany = (id) => {
        this.setState({ isEditOpen: true, mode: 'edit' });
    }


    addDocument = (companyid) => {
        //this.setState({ companyid: companyid });
        this.setState({ companyid: companyid, isDocOpen: true, mode: 'doc' });
    };

    bindCompany(obj) {
        debugger;
        this.setState({ loading: true });
        var url = config.webApiUrl() + 'aptc_company/' + localStorage.getItem('selectedLanguageCode');
        fetch(url)
            .then(response => response.json())
            .then(data => {
               // this.setState({ vecList: data, loading: false });
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    var tempCompanyList = [];
                    $.each(data, function (key, value) {
                        if (obj === 'pen' && value.statusid === 420) {
                            tempCompanyList.push(value)
                        }
                        if (obj === 'app' && value.statusid === 421) {
                            tempCompanyList.push(value)
                        }
                        if (obj === 'rej' && value.statusid === 422) {
                            tempCompanyList.push(value)
                        }
                    })
                    this.setState({ vecList: tempCompanyList, loading: false });
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

    callAttachmentButton = () => {
        $('#callAttachment').click();
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

    approveOuter = (index, action) => {
        var _id;
        var _name;

        var valueObject = [];

        if (this.state.vecList.length === 0) {
            valueObject = [];
        } else {
            valueObject = this.state.vecList[index];
        }

        var obj = {};
        _id = valueObject.companyid;
        _name = valueObject.nameen;

        var msg = ""
        if (action === 'app') {
            msg = 'approve'
        }
        if (action === 'rej') {
            msg = 'reject'
        }
        if (!window.confirm("Are you sure you want to " + msg + 'company ' + _name +" ?"))
            return;
        else {
            this.setState({ loading: true });
            var approvedDetails = {};
            approvedDetails.id = _id
            if (action === 'app') {
                approvedDetails.statusid = 421
            }
            if (action === 'rej') {
                approvedDetails.statusid = 422
                approvedDetails.rejectreason = "rejectreason"
            }
            const approved = JSON.stringify(approvedDetails);
            debugger;
            axios.put(config.webApiUrl() + 'aptc_company_approved', approved, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.setState({ loading: false });
                if (action === 'app') {
                    msg = ' has been approved successfully.'
                }
                if (action === 'rej') {
                    msg = ' has been rejected successfully.'
                }
                alert(valueObject.nameen + msg);
                this.bindCompany('pen');
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
        }
        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(approvedDetails.statusid);
        this.setState({ vec });
    }


    hideEmployee = () => {
        this.setState({ redirectIndividual: false, redirectPermit: false, redirectCompanyVehicle: false, redirectCompany: true });
        // console.log("shown Employee");
    }

    callPermit = () => {

        var _id;
        //console.log(this.state.vec);
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
        //console.log("hide Permit");
    }

    replaceModalItem = (index, action, companyid) => {

        if (action === 'edit') {
            this.setState({ isEditOpen: true });
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }

        this.toggleHide();

        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (companyid === this.state.vecList[indx].companyid) {
                var vec = {};
                this.setState({ requiredItem: indx });
                vec = this.state.vecList[indx];
                this.setState({ vec: vec });
                this.getEmployeesCount();
            }

        }

    };

    toggleHide = () => {

        if (this.state.isDesktop) {
            var showing = this.state.showing;
            this.setState({ showing: false });
        }

    }

    oepModelViewOpenClick(obj) {
        this.setState({ isModelViewOpen: true });
        this.setState({ objModelName: obj });
    }

    isLoding() {
        this.setState({ loading: true });
    }

    saveModalDetails = (companyid, mode) => {

        this.setState({ loading: false });
        this.bindCompany(mode);
    };

    deleteItem = (index) => {
        var _id;
        //console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecList.length === 0) {
            valueObject = [];
        } else {
            valueObject = this.state.vecList[index];
        }

        _id = valueObject.companyid;

        if (!window.confirm("Do you want to delete company with Id: " + _id))
            return;
        else {

            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.setState({ loading: true });
            this.fullDelete(_id, index);

        }
    };

    getEmployeesCount() { }

    viewItem = (action, companyid) => {
        this.setState({ mode: '' });
        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (companyid === this.state.vecList[indx].companyid) {
                var vec = {};
                vec = this.state.vecList[indx];
                this.setState({ vec: vec });
                this.setState({ requiredItem: indx });
            }
        }
    };

    deleteInnerItem(index) {
        var companyid;
        //console.log(this.state.vec);
        var valueObject = this.state.vec;

        companyid = valueObject.companyid;
        var _email = valueObject.email;

        if (!window.confirm("Do you want to delete company with  email: " + _email))
            return;
        else {

            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.fullDelete(companyid);
        }
    }

    fullDelete(companyid) {
        var id = companyid;
        var _id = id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var url = config.webApiUrl() + 'aptc_company/' + _id;
        fetch(url, { method: 'delete' }).then(data => {
            this.bindCompany('pen');
            
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

    handleClick = (index) => {
        this.setState({ vec: index });
        //console.log(index);
    };

    addClick = (index) => {
        this.setState({ isAddOpen: true });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onDelete = () => {
        this.deleteItem();
    };

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    updatesearchMake(event) {
        this.setState({
            searchMake: event
                .target
                .value
                .substring(0, 10)
        });
    }
    updatesearchOwner(event) {
        this.setState({
            searchOwner: event
                .target
                .value
                .substring(0, 10)
        });
    }

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
                    return (vec.crnumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
                        
                        || vec.address.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
                        
                        || vec.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                        
                        || vec.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                        );
                });
        }

        return (
            <div className="wrapper-content">
                <div className="row">
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                        <div>
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default search-input-wrapper">
                                        <div className="panel-body search-input">
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-search-admin"
                                                    placeholder="Search Company..."
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
                                    </div>
                                    <br />
                                </Animated>
                            </div>
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
                                                        <th scope="col" className={this.state.showing
                                                            ? null
                                                            : "hidden-column"}>Company Reg</th>
                                                        <th scope="col"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}>Address</th>
                                                        <th scope="col"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}>Email</th>
                                                        <th scope="col"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}>Telephone</th>
                                                        <th scope="col"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}>Status</th>
                                                        <th scope="col"
                                                            className={this.state.showing
                                                                ? null
                                                                : "hidden-column"}>Action</th>
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
                                                                className="shown-column">
                                                                <i id="" className="fas fa-building icon-exclamation-circle-gold-small" /> {vec.namear}
                                                                &nbsp; {vec.nameen}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing
                                                                    ? null
                                                                    : "hidden-column"}>
                                                                {vec.crnumber}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing
                                                                    ? null
                                                                    : "hidden-column"}>
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
                                                                    : "hidden-column"}>
                                                                {vec.email}
                                                            </td>

                                                            <td
                                                                scope="row"
                                                                className={this.state.showing
                                                                    ? null
                                                                    : "hidden-column"}>
                                                                {vec.telephonenumber}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? "status-item" : "hidden-column"}>
                                                                {vec.statusid == (420).toString() ? "Pending" : ([vec.statusid == (422).toString() ? "Rejected" : "Approved"])}

                                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? "status-item" : "hidden-column"}>
                                                                <span className="btn-group">
                                                                    <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                    <button className={vec.statusid == (420).toString() ? "btn btn-active status dropdown-toggle status-title" : ([vec.statusid == (422).toString() ? "btn btn-status-rejected dropdown-toggle status status-title-rejected" : "btn btn-status-approved dropdown-toggle status status-title-approved"])} data-toggle="dropdown" >
                                                                        Action<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                    <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                        <li className="dropdown-spacing" onClick={() => this.approveOuter(index, 'app')}>Approved</li>
                                                                        <li className="dropdown-spacing" onClick={() => this.approveOuter(index, 'rej')}>Rejected</li>
                                                                    </ul>
                                                                </span>
                                                            </td>

                                                           {/* <td scope="row" className={localStorage.getItem('selectedLanguageCode') == 1 ? "more-item" : "rtl-more-item"}>
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
                                                                                        onClick={() => this.deleteItem(index)}>Delete</button>
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
                                                                                        onClick={() => this.deleteItem(index)}>Delete</button>
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
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                    <button
                                                                                        className="btn btn-active"
                                                                                        id="Ownership"
                                                                                        onClick={(e) => this.oepModelViewOpenClick('Ownership')}
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
                                                                                        onClick={(e) => this.oepModelViewOpenClick('Fines')}
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
                                                                                        onClick={(e) => this.oepModelViewOpenClick('Vehicles')}
                                                                                        style={{
                                                                                            cursor: 'pointer'
                                                                                        }}>No of Vehicles: {vec.vehiclescount}</button>
                                                                                </li>
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                    <button
                                                                                        className="btn btn-active"
                                                                                        id="Vehicles"
                                                                                        data-toggle="modal"
                                                                                        data-target="#objectModal"
                                                                                        onClick={(e) => this.oepModelViewOpenClick('Vehicles')}
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
                                                                                        onClick={(e) => this.oepModelViewOpenClick('Employees')}>No of employees: {vec.noemployeescount}
                                                                                    </button>
                                                                                </li>
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                    <button className="black-margin action" onClick={this.callVehicle}>
                                                                                        <i className="fas fa-car" />
                                                                                        &nbsp; Vehicles<label className="label label-danger notify-label">23.5k</label>
                                                                                    </button>
                                                                                </li>
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                    <button className="black-margin action" onClick={this.callEmployee}>
                                                                                        <i className="fas fa-user-alt" />
                                                                                        &nbsp; Employees<label className="label label-danger notify-label">5</label>
                                                                                    </button>
                                                                                </li>
                                                                                <li className="dropdown-spacing table-dropdown-small-width">
                                                                                    <button className="black-margin action" onClick={this.callPermit}>
                                                                                        <i className="fa fa-ticket-alt rotate-small" />
                                                                                        &nbsp; Permits<label className="label label-danger notify-label">12</label>
                                                                                    </button>
                                                                                </li>

                                                                            </ul>
                                                                        )
                                                                    } 
                                                                </div>
                                                            </td>*/}
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
                                                <i className="icon-building-gold-admin fas fa-building" />
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
                                                                    onClick={this
                                                                        .pending
                                                                        .bind(this)}>Pending</li>
                                                                <li
                                                                    className="dropdown-spacing"
                                                                    onClick={this
                                                                        .approve
                                                                        .bind(this)}>Approved</li>
                                                                <li
                                                                    className="dropdown-spacing"
                                                                    onClick={this
                                                                        .reject
                                                                        .bind(this)}>Rejected</li>
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
                                                                onClick={(e) => this.oepModelViewOpenClick('Ownership')}
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
                                                                onClick={(e) => this.oepModelViewOpenClick('Fines')}
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
                                                                onClick={(e) => this.oepModelViewOpenClick('Vehicles')}
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
                                                                onClick={(e) => this.oepModelViewOpenClick('Vehicles')}
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
                                                                onClick={(e) => this.oepModelViewOpenClick('Documents')}
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}>Documents : {this.state.vec.documentscount}</button>
                                                        </p>
                                                        <p>
                                                            <button
                                                                className={localStorage.getItem('selectedLanguageCode') == 1
                                                                    ? "btn btn-active"
                                                                    : "btn btn-active"}
                                                                id="Employees"
                                                                data-toggle="modal"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Employees')}>No of employees: {this.state.vec.noemployeescount}
                                                            </button>
                                                        </p>

                                                    </div>

                                                </div>

                                                <div
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "colour"
                                                        : "colour rtl-flip"}>
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
                                                            &nbsp; Vehicles<label className="label label-danger notify-label">23.5k</label>
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
                                                            &nbsp; Employees<label className="label label-danger notify-label">5</label>
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
                                                            &nbsp; Permits<label className="label label-danger notify-label">12</label>
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
                                                        onClick={this
                                                            .deleteInnerItem
                                                            .bind(this)}>
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
                                                </div>
                                            </div>
                                        </div>
                                    </Animated>
                                </div>

                            </div>
                            : null}
                    </Animated>
                </div>
                {/*<div>
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
                </div>*/}
            </div>
        );
    }

    render() {
        {/*if (this.state.redirectCompanyVehicle) {
            return <Redirect push to={{ pathname: '/company-vehicles', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectPermit) {
            return <Redirect push to={{ pathname: '/company-permits-requests-list', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectIndividual) {
            return <Redirect push to={{ pathname: '/employees', state: { vec: this.state.vec } }} />;
        }
        */}
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
export default CompanyApproval;
