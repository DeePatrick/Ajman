import React, { Component } from 'react';
import Pagination from './../shared/Pagination';
import { Animated } from "react-animated-css";
import AddIndividual from './AddIndividuals';
import $ from 'jquery';
import EditIndividual from './EditIndividual';
import axios from 'axios';
import ObjectView from '../ViewObjectModel/ObjectView';
import Docs from '../documents/Docs';
import { Redirect } from 'react-router-dom';
import Loader from '../loader'; 
import * as config from '../../config';
import IndividualSeeMore from './IndividualSeeMore';
import Moment from 'react-moment';

class Individuals extends Component {
    displayName = Individuals.name

    constructor(props) {
        super(props);
        this.state = {
            isDesktop: false,
            employeeid:'',
            companyid: 0,
            companyphoto: null,
            statusid: 0,
            fullName: '',
            vecList: [],
            currentDrivers: [],
            loading: false,
            offset: 0,
            mode:'',
            vec: [],
            vecRolesList: [],
            vecFinesList: [],
            vecScoreCardList: [],
            vecIncidentsList: [],
            vecDriverStatusList: [],
            vecPermitsList: [],
            vecUploads: [],
            vecPermitDetailList: [],
            vecVehicleList: [],
            roles: [],
            company: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            isEditOpen: true,
            isAddOpen: false,
            isListOpen: false,
            isModelViewOpen: false,
            objModelName: '',
            redirectCompany: true,
            redirectSeeMore: false,
            EmployeeDetails: []
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
        
        this.oepModelViewOpenClick = this
            .oepModelViewOpenClick
            .bind(this);

        fetch(config.webApiUrl() + "aptc_company/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                var tempComp = [];
                for (var i = 0; i < data.length; i++) {
                    var comp = {};
                    comp.name = data[i].nameen;
                    comp.Id = data[i].companyid;
                    tempComp[i] = comp;
                }
                this.setState({ companyList: tempComp });
            });
    }

    componentWillMount() {
        this.setState({ loading: true, isAddOpen: true });
    }
    componentDidMount() {
        this.bindEmployees(0,'');
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ cRNum: nextProps.cRNum, crnumber: nextProps.crnumber, name: nextProps.nameen, companyphoto: nextProps.companyphoto });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }
    updatePredicate() {
        this.setState({
            isDesktop: window.innerWidth > 991
        });
    }
    bindEmployees(employeeid, mode) {
        var _id = this.props.location.state.vec.companyid;
      
        var _companyphoto = this.props.location.state.vec.companyphoto;
        this.setState({ companyid: _id, companyphoto: _companyphoto });
        const url = config.webApiUrl() + "aptc_company_getEmployees/" + localStorage.getItem('selectedLanguageCode') + "/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                } else {
                    this.setState({ vecList: data, currentDrivers: data, loading: false });
                    if (mode === 'edit') {
                        for (var i = 0; i < this.state.vecList.length; i++) {
                            if (employeeid === this.state.vecList[i].individualid) {
                                this.setState({ vec: this.state.vecList[i], loading: false });
                            }
                        }
                    }
                    else {
                        this.setState({ vec: data[0], loading: false });
                    }
                }
                
            });
    }
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }
    toggleHide = () => {
        if (this.state.isDesktop) {
            this.setState({ showing: false });
        }
    }


    addDocument = (employeeid) => {
        this.setState({ isDocOpen: true, mode: 'doc', employeeid: employeeid });
    };
    addEmployee = () => {
        this.setState({ mode: 'add' });
        this.setState({ isAddOpen: true });
    }
    editEmployee = (employeeid) => {
        this.setState({ individualid: employeeid });
        this.setState({ isEditOpen: true, mode: 'edit' });
    };
    deleteEmolyee = (employeeid) => {
        if (!window.confirm("Do you want to delete with Id: " + employeeid))
            return;
        else {
            fetch(config.webApiUrl() + 'aptc_employee/' + employeeid, { method: 'delete' })
                .then(response => response.json())
                .then(data => {
                    this.bindEmployees(0, '');
                });
        }
    }
    changeEmployeeStatus = (employeeid, statusid, nameen, rejectreason) => {
        var confirmMsg = "";
        var msgRejectreason = "";
        if (statusid === 420) {
            confirmMsg = "Are you sure you want to keep " + nameen + " as pending?";
            msgRejectreason = "Reassigned status to pending by Management... awaiting further documents";
        }
        else if (statusid === 421) {
            confirmMsg = "Are you sure you want to approve " + nameen + " ?";
            msgRejectreason = "Approved by Management";
        }
        else {
            confirmMsg = "Are you sure you want to reject " + nameen + " ?";
            msgRejectreason = "No record found...";
        }
        var obj = {};
        obj.id = employeeid;
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
            axios.put(config.webApiUrl() + 'aptc_individual_approved', param, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.bindEmployees(employeeid, 'edit');
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
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
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
    replaceModalItem = (index, action) => {
        this.setState({ mode: '' });
        this.toggleHide();
        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.setState({ requiredItem: indx });
            vec = this.state.vecList[indx];
            this.setState({ vec: vec });
            this.getEmployeeDetails();
        } else {
            vec = this.state.vecList[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
            this.getEmployeeDetails();
        }

    };
    oepModelViewOpenClick(obj) {
        this.setState({ isModelViewOpen: true });
        this.setState({ objModelName: obj });
    }
    handleClick = (index) => {
        this.setState({ vec: index });
    };

    callAttachmentButton = () => {
        $('#callAttachment').click();
    }
    callDeleteButton = () => {
        $('#callDelete').click();
    }
    callSeeMore = () => {
        this.setState({ redirectSeeMore: true });
    }
    getEmployeeDetails = () => { }
    saveModalDetails = (employeeid, mode) => {
        this.bindEmployees(employeeid, mode);

    };
    render() {
        //console.log("roles" + this.state.vecRolesList + " pic " + this.props.location.state.vec.companyphoto);
        if (!this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/company'}} />;
        }

        if (this.state.redirectSeeMore) {
            return <Redirect push to={{  pathname: '/See-more', state: {vec: this.state.vec} }} />;
        }

        const isDesktop = this.state.isDesktop;

        const {
            vecList,
            currentDrivers,
            currentPage,
            totalPages,
            loading,
            redirectCompany,
            redirectSeeMore
        } = this.state;

        const totalDrivers = vecList.length;
        let contents = "";
        if (totalDrivers === 0 && loading === false) {
            contents = (
                <div>
                    <div
                        className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "fixed-search"
                            : "arab-fixed-search"}>
                        <div
                            className={(localStorage.getItem('selectedLanguageCode') == 1)
                                ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                                : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    data-target="#employeeCreateModal"
                                    onClick={(e) => this.addEmployee()}>
                                    <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">Add Employee</span>
                                </div>
                            </Animated>
                        </div>
                        <div
                            className={(localStorage.getItem('selectedLanguageCode') == 1)
                                ? "col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input pull-right"
                                : "col-md-9 col-lg-10 col-sm-9 col-xs-9 add-button pull-left"}>
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>

                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div>
                                            <input type="text" className="form-search-admin" placeholder="Search ..." />
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

                        <div className="">

                            <div
                                className={(localStorage.getItem('selectedLanguageCode') == 1)
                                    ? "col-md-12 col-lg-12 col-sm-12 col-xs-12"
                                    : "col-md-12 col-lg-12 col-sm-12 col-xs-12 rtl-flip"}>
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height-empty">
                                        <div className="panel panel-body">
                                            <div className="company-header">
                                                <div className="pull-right"><i
                                                    id="cancel"
                                                    onClick={() => this.setState({
                                                        redirectCompany: !redirectCompany
                                                    })}
                                                    className="fas fa-times" /></div>
                                                <div className="pull-left company-title">
                                                    <span><img
                                                        id="icon-pics"
                                                        src={!this.props.location.state.vec.companyphoto
                                                            ? require('../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyphoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '16px'
                                                        }}>
                                                        &nbsp;<strong>{this.props.location.state.vec.nameen}</strong>
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-center text-vertical">
                                                    <i className="fas fa-user-alt icon-truck-gold-no-circle" />
                                                    <p>No employee in company. Click "Add Employee" button to add employees to this
                                                        Company</p>
                                                </h5>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>

                    </div>
                    <AddIndividual
                        companyid={this.state.companyid}
                        mode={this.state.mode}
                        saveModalDetails={this.saveModalDetails}
                      />
                </div>
            );
        } else {
            contents = "";
            let filteredIndividuals = [];
            if (this.state.currentDrivers.length > 0) {
                filteredIndividuals = this
                    .state
                    .currentDrivers
                    .filter((vec) => {
                        return (
                            vec.emiratesid.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || vec.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || vec.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || vec.rolename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                            || vec.telephonenumberwithcountry.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                        );
                    });

            }
            const { showing, redirectCompany } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];

            contents = this.state.loading
                ? (
                    <p>
                        <Loader />
                    </p>
                )
                : (
                    <div className="wrapper-content">
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "col-lg-12 fixed-search"
                            : "arab-fixed-search"}>
                            <div className="">
                                <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                    ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                                    : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>
                                    <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                        <div
                                            className="panel-title black-button-admin center"
                                            data-toggle="modal"
                                            data-target="#employeeCreateModal"
                                            onClick={(e) => this.addEmployee()}>
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin">Add Employee</span>
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
                        {this.state.isAddOpen === true &&
                            <AddIndividual
                            companyid={this.state.companyid}
                            mode={this.state.mode}
                            saveModalDetails={this.saveModalDetails}
                            />
                        }
                        
                        {this.state.isEditOpen === true &&
                            <EditIndividual mode={this.state.mode} languageid={this.state.languageid} employeeid={this.state.individualid} saveModalDetails={this.saveModalDetails} />
                        }

                        {modalData !== undefined && <Docs
                            type="EMP"
                            mode="doc"
                            employeeid={this.state.employeeid}
                            saveModalDetails={this.saveModalDetails} />
                        }

                        {this.state.isModelViewOpen === true &&
                            <ObjectView
                                Action={this.state.Action}
                                ActionType="EMP"
                                individualid={this.state.employeeid} />
                        }

                        {redirectSeeMore
                            ? <IndividualSeeMore
                                goToHome={this
                                    .hideEmployee
                                    .bind(this)}
                                cRNum={modalData.cRNum}
                                companyphoto={modalData.companyphoto}
                                name={modalData.name}
                                vehicles={modalData.vehicles}
                                saveModalDetails={this.saveModalDetails} />
                            : null}

                        {!filteredIndividuals
                            ? (
                                <h1>There is no External User</h1>
                            )
                            : null}

                        <div className="col-lg-12">
                            <div
                                className={(this.state.showing && localStorage.getItem('selectedLanguageCode') == 1)
                                    ? "entity-table"
                                    : ([(this.state.showing && localStorage.getItem('selectedLanguageCode') == 2)
                                        ? "entity-table col-lg-12"
                                        : "entity-table entity-table-padding"])}>

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
                                            <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                ? "company-header"
                                                : "company-header rtl-flip"}>
                                                <div className="pull-right"><i
                                                    id="cancel"
                                                    onClick={() => this.setState({
                                                        redirectCompany: !redirectCompany
                                                    })}
                                                    className="fas fa-times" /></div>
                                                <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                    ? "company-title"
                                                    : "rtl-flip pull-left company-title rtl-flip"}>
                                                    <span><img
                                                        id="icon-pics"
                                                        src={!this.props.location.state.vec.companyphoto
                                                            ? require('../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyphoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '16px'
                                                        }}>
                                                        &nbsp;<strong>{this.props.location.state.vec.nameen}</strong>
                                                    </span>
                                                </div>
                                            </div>

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
                                                                            : "hidden-column"}>Emirati</th>
                                                                    <th
                                                                        scope="col"
                                                                        className={this.state.showing
                                                                            ? null
                                                                            : "hidden-column"}>Email</th>
                                                                    <th
                                                                        scope="col"
                                                                        className={this.state.showing
                                                                            ? null
                                                                            : "hidden-column"}>Role</th>
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
                                                            <tbody>
                                                                {filteredIndividuals.map((vec, index) => (
                                                                    <tr className="panel-bubble-new" key={index}>
                                                                        <td scope="row">
                                                                            <label className="container-x">
                                                                                <input type="checkbox" />
                                                                                <span className="checkmark" />
                                                                            </label>

                                                                        </td>
                                                                        <td scope="row" onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                                            <img
                                                                                id="icon-pics"
                                                                                src={!vec.profilephoto
                                                                                    ? require('../../assets/user-img.png')
                                                                                    : vec.profilephoto}
                                                                                onError={(e) => {
                                                                                    e.target.src = require('../../assets/user-img.png')
                                                                                }}
                                                                                className="img-circle"
                                                                                alt="woman"
                                                                                height="30"
                                                                                width="30" />
                                                                            &nbsp;{vec.nameen}

                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing
                                                                                ? null
                                                                                : "hidden-column"}
                                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                                            {vec.emiratesid}
                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing
                                                                                ? null
                                                                                : "hidden-column"}
                                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                                            {vec.email}
                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing
                                                                                ? null
                                                                                : "hidden-column"}
                                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                                            {vec.rolename}
                                                                        </td>

                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing
                                                                                ? null
                                                                                : "hidden-column"}
                                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                                            {vec.telephonenumberwithcountry}
                                                                        </td>
                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing
                                                                                ? "status-item"
                                                                                : "hidden-column"}>
                                                                            <span className="btn-group">
                                                                                <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                                <button
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
                                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeEmployeeStatus(vec.individualid, 420, vec.nameen, vec.rejectreason)}>Pending</li>
                                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeEmployeeStatus(vec.individualid, 421, vec.nameen, vec.rejectreason)}>Approved</li>
                                                                                    <li className="dropdown-spacing" onClick={(e) => this.changeEmployeeStatus(vec.individualid, 422, vec.nameen, vec.rejectreason)}>Rejected</li>
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
                                                                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-left"} aria-labelledby="dropdownMenu4">
                                                                                            <li
                                                                                                data-toggle="modal"
                                                                                                data-target="#editModal"
                                                                                                onClick={() => this.editEmployee(vec.individualid)}
                                                                                                className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    
                                                                                                    >Edit</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    id="callDelete"
                                                                                                    className={!this.state.show
                                                                                                        ? ""
                                                                                                        : this.state.show}
                                                                                                    onClick={(e) => this.deleteEmolyee(vec.individualid)}>Delete</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    id="callAttachment"
                                                                                                    className={!this.state.show
                                                                                                        ? ""
                                                                                                        : this.state.show}
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#attachModal"
                                                                                                    onClick={() => this.replaceModalItem(index, 'doc')}>Attachment</button>
                                                                                            </li>
                                                                                        </ul>
                                                                                    )
                                                                                    : (
                                                                                        <ul
                                                                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-left"} aria-labelledby="dropdownMenu4">
                                                                                            <li
                                                                                                data-toggle="modal"
                                                                                                data-target="#editModal"
                                                                                                onClick={() => this.editEmployee(this.state.vec.individualid)}
                                                                                                className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                   >Edit</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    id="callDelete"
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
                                                                                                    onClick={() => this.replaceModalItem(index, 'doc')}>Attachment</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    className="btn btn-active"
                                                                                                    id="Roles"
                                                                                                    onClick={(e) => this.oepModelViewOpenClick('Roles')}
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#objectModal"
                                                                                                    style={{
                                                                                                        cursor: 'pointer'
                                                                                                    }}>Roles : {this.state.vec.rolescount}</button>
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
                                                                                                    }}>No Of Fines: {this.state.vec.finesCount}</button>
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
                                                                                                    }}>No Of Vehicles : {this.state.vec.vehiclescount}</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    className="btn btn-active"
                                                                                                    id="Incidents"
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#objectModal"
                                                                                                    onClick={(e) => this.oepModelViewOpenClick('Incidents')}
                                                                                                    style={{
                                                                                                        cursor: 'pointer'
                                                                                                    }}>Incidents : {this.state.vec.incidentscount}</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    className="btn btn-active"
                                                                                                    id="Incidents"
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#objectModal"
                                                                                                    onClick={(e) => this.oepModelViewOpenClick('Incidents')}
                                                                                                    style={{
                                                                                                        cursor: 'pointer'
                                                                                                    }}>Driver Statuses : {this.state.vec.driverstatuscount}</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    className="btn btn-active"
                                                                                                    id="Scored"
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#objectModal"
                                                                                                    onClick={(e) => this.oepModelViewOpenClick('Scored')}
                                                                                                    style={{
                                                                                                        cursor: 'pointer'
                                                                                                    }}>Scored Card Total : {this.state.vec.scoreCardsCount}</button>
                                                                                            </li>
                                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                                <button
                                                                                                    className="btn btn-active"
                                                                                                    id="Documents"
                                                                                                    data-toggle="modal"
                                                                                                    data-target="#objectModal"
                                                                                                    onClick={(e) => this.oepModelViewOpenClick('Documents')}
                                                                                                    style={{
                                                                                                        cursor: 'pointer'
                                                                                                    }}>Uploads : {this.state.vec.documentscount}</button>
                                                                                            </li>
                                                                                        </ul>
                                                                                    )}

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
                                                        Employee entries
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
                                    {!this.state.showing
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
                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? ""
                                                        : " rtl-flip"}>
                                                        <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "col-lg-3 col-md-0 col-sm-6 title-image pull-left"
                                                            : "col-lg-3 col-md-0 col-sm-6 title-image pull-left"}>
                                                            <span className='pics'>&nbsp;
                                                                    <img
                                                                    id="icon-pics"
                                                                    src={!this.state.vec.profilephoto
                                                                        ? require('../../assets/user-img-gold.png')
                                                                        : this.state.vec.profilephoto}
                                                                    onError={(e) => {
                                                                        e.target.src = require('../../assets/user-img-gold.png')
                                                                    }}
                                                                    className="img-circle"
                                                                    alt="woman"
                                                                    height="120"
                                                                    width="120" />
                                                            </span>
                                                        </div>
                                                        <div
                                                            id="left-border-line-admin"
                                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-9 col-md-12 col-sm-9 left-margin" : "col-lg-9 col-md-12 col-sm-9 left-margin"}>

                                                            <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                                ? ""
                                                                : "rtl-flip"}>

                                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "pull-right" : "pull-left"}>
                                                                    <i
                                                                        id="cancel"
                                                                        onClick={() => this.setState({
                                                                            showing: !showing
                                                                        })}
                                                                        className="fas fa-times" />


                                                                </div>
                                                                <span className={localStorage.getItem('selectedLanguageCode') == 1 ? "pull-right" : "pull-left"}>
                                                                    <button style={{ padding: '5px' }} id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" type="button">
                                                                        <i className="glyphicon glyphicon-option-horizontal" />
                                                                    </button>
                                                                    <ul
                                                                        className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-left"} aria-labelledby="dropdownMenu4">
                                                                        <li
                                                                            className="dropdown-spacing table-dropdown-small-width"
                                                                            data-toggle="modal"
                                                                            data-target="#editModal"
                                                                            onClick={() => this.editEmployee(this.state.vec.individualid)}
                                                                            >
                                                                            Edit
                                                                        </li>
                                                                        <li
                                                                            className="dropdown-spacing table-dropdown-small-width"
                                                                            onClick={() => this.callSeeMore()}>
                                                                            See More of {this.state.vec.nameen}
                                                                        </li>
                                                                        <li
                                                                            className="dropdown-spacing table-dropdown-small-width"
                                                                            onClick={() => this.callAttachmentButton()}>
                                                                            Attachment
                                                                        </li>
                                                                        <li
                                                                            className="dropdown-spacing table-dropdown-small-width"
                                                                            onClick={() => this.callDeleteButton()}>
                                                                            Delete
                                                                        </li>
                                                                    </ul>
                                                                </span>



                                                                <p>
                                                                    <span className={localStorage.getItem('selectedLanguageCode') == 1
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
                                                                                onClick={(e) => this.changeEmployeeStatus(this.state.vec.individualid, 420, this.state.vec.nameen, this.state.vec.rejectreason)}
                                                                               >Pending
                                                                                    </li>
                                                                            <li
                                                                                className="dropdown-spacing"
                                                                                onClick={(e) => this.changeEmployeeStatus(this.state.vec.individualid, 421, this.state.vec.nameen, this.state.vec.rejectreason)}>Approved
                                                                                    </li>
                                                                            <li
                                                                                className="dropdown-spacing"
                                                                                onClick={(e) => this.changeEmployeeStatus(this.state.vec.individualid, 422, this.state.vec.nameen, this.state.vec.rejectreason)}>Rejected
                                                                                    </li>
                                                                        </ul>
                                                                    </span>
                                                                </p>

                                                            </div>
                                                           

                                                            <div className="row">
                                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                                    <span>
                                                                        <p>{this.state.vec.address}<br /> {this.state.vec.city} &nbsp; {this.state.vec.state}</p>
                                                                    </span>
                                                                    <br />

                                                                    <p>EmiratesID:{this.state.vec.emiratesid}</p>
                                                                    <p> D.O.B:
                                                                            <Moment format='DD MMM YYYY'>{this.state.vec.dob}</Moment>
                                                                    </p>
                                                                    <p>Nationality: {this.state.vec.nationality}</p>
                                                                    <p>Mobile: {this.state.vec.telephonenumberwithcountry}</p>
                                                                    <p>Tel: {this.state.vec.telephonenumberwithcountry}
                                                                    </p>
                                                                    <p>{this.state.vec.religion
                                                                        ? <span>Religion: {this.state.vec.religion}</span>
                                                                        : null}</p>
                                                                    <p>{this.state.vec.rolename
                                                                        ? <span>Role: {this.state.vec.rolename}</span>
                                                                        : null}</p>
                                                                    <p>Gender: {this.state.vec.gendername}
                                                                    </p>
                                                                    
                                                                </div>
                                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Roles"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Roles', this.state.vec.individualid)}
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>Roles : {this.state.vec.rolescount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Fines"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Fines', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>No Of Fines: {this.state.vec.finesCount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Vehicles"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>No Of Vehicles : {this.state.vec.vehiclescount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Incidents"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Incidents', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>Incidents : {this.state.vec.incidentscount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Scored"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Scored', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>Driver Statuses : {this.state.vec.driverstatuscount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Scored"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Scored', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>Scored Card Total : {this.state.vec.scoreCardsCount}</button>
                                                                    </p>
                                                                    <p>
                                                                        <button
                                                                            className="btn btn-active"
                                                                            id="Documents"
                                                                            data-toggle="modal"
                                                                            data-target="#objectModal"
                                                                            onClick={(e) => this.oepModelViewOpenClick('Documents', this.state.vec.individualid)}
                                                                            style={{
                                                                                cursor: 'pointer'
                                                                            }}>Uploads : {this.state.vec.documentscount}</button>
                                                                    </p>
                                                                </div>
                                                            </div>                                          
                                                            <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "colour" : "colour rtl-flip"}>
                                                                <button
                                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                                    data-toggle="modal"
                                                                    data-target="#editModal"
                                                                    onClick={() => this.editEmployee(this.state.vec.individualid)}>
                                                                    <i id="action" className="glyphicon glyphicon-edit" />
                                                                    &nbsp; Edit
                                                                    </button>

                                                                <button
                                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                                    onClick={(e) => this.deleteEmolyee(this.state.vec.individualid)}>
                                                                    <i id="action" className="fa fa-trash" />
                                                                    &nbsp; Delete
                                                                    </button>

                                                                <button
                                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                                    data-toggle="modal"
                                                                    data-target="#attachModal"
                                                                    onClick={() => this.addDocument(this.state.vec.individualid)}>
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
                               
                            </div>
                        </div>
                    </div >
                );
        }

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>

        );

    }
}
export default Individuals;
