import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import $ from 'jquery';
import axios from 'axios';
import Docs from '../Documents/Docs';
import Loader from '../loader';
import * as config from '../../config';
import ObjectView from '../ViewObjectModel/ObjectView';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Employee extends Component {
    displayName = Employee.name
    constructor(props) {
        super(props);

        this.state = {
            employeeid: 0,
            individualid: 0,
            languageid: 0,
            requiredItem: 0,
            currentPage: 0,
            editindex: 0,
            pageLimit: 10,
            fullName: '',
            profilephoto: '',
            filename: '',
            modal: 'modal',
            emplist: [],
            currentDrivers: [],
            loading: true,
            isUpload: false,
            offset: 0,
            emirtaiId: '',
            vec: [],
            roles: [],
            docInContent: {
                duration: "",
                fees: ""
            },
            company: [],
            eFines: [],
            eDocuments: [],
            eIncidents: [],
            eScore: [],
            eRoles: [],
            eVehicles: [],
            employeeObjects: {},
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: false,
            isEditOpen: false,
            isAddOpen: false,
            isDocOpen: false,
            isModelViewOpen: false,
            Action: '',
            mode: '',
            emp: {},
            countrylist: [],
            approvedcomplist: []
        };

        this.refreshEmployee = this
            .refreshEmployee
            .bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            var compList = [];
            fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
                .then(response => response.json())
                .then(data => {
                    this.setState({ companyList: data });
                    $.each(data, function (key, value) {
                        if (value.statusid === 421) {
                            compList.push(value);
                        }
                    })
                    this.setState({ approvedcomplist: compList });
                });
            this.bindEmployee();
        }
    }
    onPageChanged = data => {
        const { emplist } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        if (emplist.StatusCode !== '404') {
            const currentDrivers = emplist.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }
    }
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }
    bindEmployee(mode) {
        this.setState({ loading: true });
        fetch(config.webApiUrl() + 'aptc_employee_getAllActiveCompanysEmployees/' + localStorage.getItem('selectedLanguageCode') + '/' + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ emplist: data, currentDrivers: data, loading: false });
                this.setState({ isEditOpen: true, isAddOpen: true, isDocOpen: true });
                if (mode === 'edit') {
                    var tempemp = {};
                    for (var indx = 0; indx < this.state.emplist.length; indx++) {
                        if (this.state.employeeid === data.individualid) {
                            this.setState({ requiredItem: indx });
                            tempemp = this.state.data[indx];
                            this.setState({ emp: tempemp });
                            this.setState({ profilephoto: tempemp.profilephoto });
                        }
                    }
                }
                else {
                    if (data.length > 0) {
                        this.setState({ emp: data[0] });
                        this.setState({ profilephoto: data[0].profilephoto });
                    }
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
    }
    viewEmployee = (employeeid) => {
        this.setState({ employeeid: employeeid, mode: '' });
        var tempemp = {};
        for (var indx = 0; indx < this.state.emplist.length; indx++) {
            if (employeeid === this.state.emplist[indx].individualid) {
                this.setState({ requiredItem: indx });
                tempemp = this.state.emplist[indx];
                this.setState({ emp: tempemp });
                this.setState({ profilephoto: tempemp.profilephoto });
            }
        }
    };

    addEmployee = (index) => {
        this.setState({ isAddOpen: true, mode: 'add' });
    };
    addDocument = (employeeid) => {
        this.setState({ isDocOpen: true, mode: 'doc', employeeid: employeeid });
    };

    editEmployee = (employeeid) => {
        this.setState({ employeeid: employeeid });
        this.setState({ isEditOpen: true, mode: 'edit' });
    };
    deleteEmployee = (employeeid) => {
        if (!window.confirm("Do you want to delete this employee"))
            return;
        else {
            this.setState({ loading: true });

            fetch(config.webApiUrl() + 'aptc_employee/' + employeeid, { method: 'delete' })
                .then(response => response.json())
                .then(data => {
                    this.bindEmployee('');
                }).catch((error) => {
                    alert(error);
                    alert("axios error:" + error.response.data.ResponseMessage);
                    this.setState({ loading: false });
                });
            //this.fullDelete(_id, index);
        }
    };
    refreshEmployee = (employeeid, mode) => {
        this.setState({ employeeid: employeeid, loading: false });
        this.bindEmployee(mode);
    };
    employeeFileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            var fileName = e.target.files[0];
            var size = fileName.size;

            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilephoto: e.target.result, filename: fileName.name, isUpload: true });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    cancelimage = (e) => {
        this.setState({ profilephoto: this.state.emp.profilephoto, isUpload: false });
    };
    saveimage = (e) => {
        var indphoto = {};
        indphoto.individualid = this.state.emp.individualid;
        indphoto.filename = this.state.filename;
        indphoto.profilephoto = this.state.profilephoto;
        var imageupload = JSON.stringify(indphoto);
        axios
            .put(config.webApiUrl() + "aptc_individual_profilephoto", imageupload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false });
                this.setState({ isUpload: false });
            })
            .catch((error) => {
                debugger;
                alert(error);
                this.setState({ loading: false });
            });

    };
    oepModelViewOpenClick(Action, individualid) {
        this.setState({ isModelViewOpen: true, employeeid: individualid });
        switch (Action) {
            case "Roles":
                this.setState({ Action: "Roles" });
                break;
            case "Fines":
                this.setState({ Action: "Fines" });
                break;
            case "Vehicles":
                this.setState({ Action: "Vehicles" });
                break;
            case "Incidents":
                this.setState({ Action: "Incidents" });
                break;
            case "ScoredCard":
                this.setState({ Action: "ScoredCard" });
                break;
            case "Documents":
                this.setState({ Action: "Documents" });
                break;
            case "Permits":
                this.setState({ Action: "Permits" });
                break;
        }

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        let contents = ""
        const { emplist, currentDrivers, currentPage, totalPages } = this.state;
        const totalDrivers = emplist.length;
        if (totalDrivers === 0) {
            contents = (
                <div className="row">
                    {this.state.loading === false
                        &&
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                {
                                    this.state.approvedcomplist.length > 0 &&
                                    <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                        <div
                                            className="panel-title black-button-admin center"
                                            data-toggle="modal"
                                            data-target="#createModal"
                                            onClick={this
                                                .addEmployee
                                                .bind(this)}>
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin" style={{ marginLeft: '6px' }}>{this.props.t('Add_Employee')}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    this.state.approvedcomplist.length === 0 &&
                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                        <p style={{ marginTop: '20px', fontSize: '20px', color: 'red' }}> You dont have any approved company!</p>
                                    </div>
                                }
                                {
                                    this.state.approvedcomplist.length > 0 && emplist.length === 0 &&
                                    <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                        <p style={{ marginTop: '20px', fontSize: '20px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                    </div>
                                }
                            </Animated>
                        </div>
                    }
                    <AddEmployee mode={this.state.mode} individualid={this.state.individualid} refreshEmployee={this.refreshEmployee} />
                </div>)
        }
        else {
            let filteredIndividuals = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    currentDrivers === null || currentDrivers === [] ? "No Value" :
                        filteredIndividuals = this
                            .state
                            .currentDrivers
                            .filter((emp) => {
                                return (
                                    !emp.dob ? "" : emp.dob.indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.emiratesid.indexOf(this.state.search) !== -1 ||
                                        emp.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.rolename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.companyname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                        emp.telephonenumber.indexOf(this.state.search) !== -1
                                );
                            });
                }

            }
            const { showing } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.emplist[requiredItem];

            contents =
                (<div>
                    {/*-- FIRST ROW (TITLE AND LOGO) / START --*/}
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                            <div className="row align-items-center nil-margin">
                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
                                    <span>
                                    <i className="fa fa-users icon-title-small"></i>
                                    </span>
                                </div>
                            <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 title-top-padding">
                                    <strong className="font-custom-standard-gold">EMPLOYEES</strong>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                                    <button type="button" className="btn btn-standard-gold right" data-toggle="modal" data-target="#createModal" onClick={this.addEmployee.bind()}>
                                        <span>{this.props.t('Add_Employee')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                        </div>

                    </div>
                    {/*-- FIRST ROW (TITLE AND LOGO) / END --*/}

                    {this.state.isAddOpen === true &&
                        <AddEmployee mode={this.state.mode} languageid={this.state.languageid} individualid={this.state.individualid} refreshEmployee={this.refreshEmployee} approvedcomplist={this.state.approvedcomplist} />
                    }
                    {this.state.isEditOpen === true &&
                        <EditEmployee mode={this.state.mode} languageid={this.state.languageid} employeeid={this.state.employeeid} refreshEmployee={this.refreshEmployee} />
                    }
                    {this.state.isDocOpen === true &&
                        <Docs mode={this.state.mode} type="EMP" employeeid={this.state.employeeid} refreshEmployee={this.refreshEmployee} />
                    }
                    <ObjectView
                        Action={this.state.Action}
                        ActionType="EMP"
                        individualid={this.state.employeeid} />

                    {
                        !filteredIndividuals ? (<h3>There is no External User</h3>) : null
                    }
                    {showing
                        ?
                        {/*-- <div className="row">
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                <div className="panel panel-default">
                                    <div className="panel panel-body">
                                        <br />
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <label className="container-x">
                                                            <input type="checkbox" />
                                                            <span className="checkmark">&nbsp;</span>
                                                        </label>
                                                    </th>
                                                    <th scope="col">{this.props.t('Basic_Info')}</th>
                                                    <th scope="col">{this.props.t('Emirati')}</th>
                                                    <th scope="col">{this.props.t('Email')}</th>
                                                    <th scope="col">{this.props.t('Role')}</th>
                                                    <th scope="col">{this.props.t('Company')}</th>
                                                    <th scope="col">{this.props.t('Telephone')}</th>
                                                    <th scope="col">{this.props.t('Status')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredIndividuals.map((emp, index) =>

                                                        <tr className="panel-bubble-new" key={index}>
                                                            <td scope="row">
                                                                <label className="container-x" >
                                                                    <input type="checkbox" />
                                                                    <span className="checkmark"></span>
                                                                </label>

                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                <img
                                                                    id="icon-pics"
                                                                    src={emp.profilephoto}
                                                                    className="img-circle"
                                                                    height="20"
                                                                    width="20" />  &nbsp;{emp.nameen}&nbsp;{emp.namear}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {emp.emiratesid}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {emp.email}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({ showing: !showing })}>
                                                                {emp.rolename}
                                                            </td>
                                                            <td>
                                                                {emp.companyname}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {emp.telephonenumberwithcountry}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {
                                                                    emp.status === "Pending" &&
                                                                    <div className="pending">{this.props.t('Pending')}</div>
                                                                }
                                                                {emp.status === "Approved" &&
                                                                    <div className="approved">{this.props.t('Approved')}</div>
                                                                }
                                                                {emp.status === "Rejected" &&
                                                                    <div className="rejected">{this.props.t('Rejected')}</div>
                                                                }
                                                            </td>
                                                            <td scope="row">
                                                                <button style={{ fontSize: '11px' }}
                                                                    type="hidden"
                                                                    className={this.state.show
                                                                        ? "glyphicon glyphicon-option-horizontal"
                                                                        : this.state.show}
                                                                    data-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"></button>
                                                                <button style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }}
                                                                    id="call"
                                                                    title="Edit"
                                                                    className={!this.state.show
                                                                        ? ""
                                                                        : this.state.show}
                                                                    data-toggle="modal"
                                                                    data-target="#editModal"
                                                                    onClick={() => this.viewEmployee('edit', emp.individualid)}><i className="glyphicon glyphicon-edit" /></button>
                                                                <button title="Delete" style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }}
                                                                    className={!this.state.show ? "" : this.state.show}
                                                                    onClick={() => this.deleteEmployee(emp.individualid)}><i className="fa fa-trash" /></button>
                                                                <button title="Attach" style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }}
                                                                    className={!this.state.show
                                                                        ? ""
                                                                        : this.state.show}
                                                                    data-toggle="modal"
                                                                    data-target="#attachModal"
                                                                    onClick={() => this.viewEmployee('doc', emp.individualid)}><i className="fa fa-paperclip" /></button>
                                                            </td>

                                                        </tr>)}
                                            </tbody>
                                        </table>

                                        <div className="movein">
                                            <div>
                                                <h4>
                                                    <strong >{totalDrivers}</strong>{" "}
                                                    {this.props.t('Individual_entries')}
                                                </h4>
                                                {currentPage && (
                                                    <span>
                                                        Page &nbsp;
                                                        <span className="font-weight-bold">{currentPage}</span>
                                                        /{" "}
                                                        <span className="font-weight-bold">{totalPages}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <Pagination
                                                    totalRecords={totalDrivers}
                                                    pageLimit={5}
                                                    pageNeighbours={1}
                                                    onPageChanged={this
                                                        .onPageChanged
                                                        .bind(this)} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Animated>
                    </div>--*/}
                        : null}
                    {!showing
                        ?
                        <div className="row">

                            {/*-- EMPLOYEE LIST / START --*/}
                            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default main-body-height-admin">
                                        <div className="panel panel-body">

                                            <div className="list-container-left-panel">
                                                <div className="container-fluid movetop">
                                                    {filteredIndividuals.map((emp, index) =>
                                                        <div className="row list-row-styling align-items-center" key={index}>
                                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                                <i className="fa fa-users icon-custom-standard-grey"></i>
                                                            </div>
                                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 nil-padding">
                                                                <span className="font-custom-standard-grey" onClick={() => this.viewEmployee(emp.individualid)}>{emp.nameen} [{emp.namear}]
                                                                </span>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                                <span onClick={() => this.viewEmployee(emp.individualid)} className="pull-right">
                                                                    <i id="scaled-arrow" className="fa fa-arrow-right icon-custom-standard-gold"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="movein">
                                                <div>
                                                    <h4>
                                                        <strong >{totalDrivers}</strong>{" "}
                                                        {this.props.t('Employee_entries')}
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Animated>
                            </div>
                            {/*-- EMPLOYEE LIST / END --*/}

                            {/*-- INFORMATIONAL DISPLAY / START --
                            <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 left-border">
                                <div className="panel panel-default main-body-height-admin">
                                    <div>
                                        <div className='col-lg-2 col-md-4 col-sm-3'>
                                            <span className='pics'>&nbsp;
                                                        <img
                                                    id="icon-pics"
                                                    src={!this.state.profilephoto
                                                        ? require('../../assets/user-img.png')
                                                        : this.state.profilephoto}
                                                    onError={(e) => {
                                                        e.target.src = require('../../assets/user-img.png')
                                                    }}
                                                    className="img-circle"
                                                    alt="woman"
                                                    height="120"
                                                    width="120" />
                                            </span>
                                            <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.employeeFileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                            {
                                                this.state.isUpload === false &&
                                                <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Edit Image" onClick={() => this.fileInput.click()}><i className="fa fa-pencil" /></span>}
                                            {
                                                this.state.isUpload === true &&
                                                <div>
                                                    <div style={{ marginLeft: '40px' }}>
                                                        <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Save" onClick={() => this.saveimage()}><i className="fa fa-save" /></span>
                                                        <span style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '10px' }} title="Cancel" onClick={() => this.cancelimage()}><i className="fa fa-close" /></span>
                                                    </div></div>
                                            }
                                        </div>
                                        <div id="left-border-line-admin" style={{ backgroundColor: 'white' }} className="col-lg-10 col-md-8 col-sm-9 left-margin">
                                            <div className="pull-right" style={{ display: 'none' }}>
                                                <i
                                                    id="cancel"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}
                                                    className="fa fa-times" />
                                            </div>
                                            <div>
                                                <span className="title-side-detail-panel">{this.state.emp.nameen} &nbsp; {this.state.emp.namear}</span>
                                                {this.state.emp.status === "Pending" &&
                                                    <span className="pending">{this.props.t('Pending')}</span>}
                                                {this.state.emp.status === "Approved" &&
                                                    <span className="approved">{this.props.t('Approved')}</span>
                                                }
                                                {this.state.emp.status === "Rejected" &&
                                                    <span className="rejected">{this.props.t('Rejected')}</span>
                                                }
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-6 col-lg-6">
                                                    <p> <strong>{this.props.t('Address')}</strong>&nbsp;
                                                                {this.state.emp.buildingnumber}&nbsp;&nbsp; {this.state.emp.flatnumber}
                                                        &nbsp; {this.state.emp.area}&nbsp;{this.state.emp.street}<br />
                                                        {this.state.emp.city}&nbsp;{this.state.emp.state}&nbsp;{this.state.emp.country}
                                                    </p>
                                                    <p><strong>{this.props.t('Email')}</strong>&nbsp;{this.state.emp.email}</p>
                                                    <p><strong>{this.props.t('Emirates')}</strong>&nbsp;{this.state.emp.emiratesid}</p>
                                                    <p><strong>{this.props.t('Company_Name')}</strong>&nbsp;{this.state.emp.companyname}</p>
                                                    <p><strong>{this.props.t('Role')}</strong>&nbsp;{this.state.emp.rolename}</p>
                                                    <p><strong>{this.props.t('Date_of_Birth')}</strong> &nbsp;
																{
                                                            !this.state.emp.dob
                                                                ? ""
                                                                : this.state.emp.dob.split('T')[0]
                                                        }</p>
                                                    <p><strong>{this.props.t('Mobile_Number')}</strong>&nbsp; {this.state.emp.mobilenumberwithcountry}</p>
                                                    <p><strong>{this.props.t('Telephone_Number')}</strong>&nbsp;{this.state.emp.telephonenumberwithcountry}
                                                    </p>
                                                    <br />
                                                </div>
                                                <div className="col-md-6 col-lg-6">
                                                    <p>
                                                        <a id="Roles" onClick={(e) => this.oepModelViewOpenClick('Roles', this.state.emp.individualid)}
                                                            data-toggle="modal"
                                                            className="btnNew btnNew-active"
                                                            data-target="#objectModal"
                                                            style={{ cursor: 'pointer', color: '#a97d3a', TextDecoder: 'underline' }}>{this.props.t('Roles')} {this.state.emp.rolescount}</a>
                                                    </p>
                                                    <p>
                                                        <a id="Fines" data-toggle="modal"
                                                            className="btnNew btnNew-active"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('Fines', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('No_of_Fines')}{this.state.emp.finesCount}</a>
                                                    </p>
                                                    <p>
                                                        <a id="Vehicles" data-toggle="modal"
                                                            className="btnNew btnNew-active"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('No_of_Vehicles')}{this.state.emp.vehiclescount}</a>
                                                    </p>
                                                    <p>
                                                        <a id="Incidents" data-toggle="modal"
                                                            className="btnNew btnNew-active"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('Incidents', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Incidents')}{this.state.emp.incidentscount}</a>
                                                    </p>
                                                    <p>
                                                        <a id="ScoredCard"
                                                            data-toggle="modal"
                                                            className="btnNew btnNew-active"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('ScoredCard', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Scored_Card_Total')}{this.state.emp.scoreCardsCount}</a>
                                                    </p>
                                                    <p>
                                                        <a id="Documents"
                                                            className="btnNew btnNew-active"
                                                            data-toggle="modal"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('Documents', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Documents')}{this.state.emp.documentscount}</a>
                                                    </p>
                                                    <p style={{ display: 'none' }}>
                                                        <a id="Permits"
                                                            className="btnNew btnNew-active"
                                                            data-toggle="modal"
                                                            data-target="#objectModal"
                                                            onClick={(e) => this.oepModelViewOpenClick('Permits', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Permits')}{this.state.emp.permitcount}</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <br /><br />
                                            <div className="colour">
                                                <button
                                                    className="black-margin action"
                                                    data-toggle="modal"
                                                    data-target="#editModal"
                                                    onClick={() => this.editEmployee(this.state.emp.individualid)}>
                                                    <i id="action" className="glyphicon glyphicon-edit" />
                                                    &nbsp; {this.props.t('Edit')}
                                                </button>

                                                <button className="black-margin action" onClick={() => this.deleteEmployee(this.state.emp.individualid)}>
                                                    <i id="action" className="fa fa-trash" />
                                                    &nbsp; {this.props.t('Delete')}
                                                </button>

                                                <button className="black-margin action" data-toggle="modal" data-target="#attachModal"
                                                    onClick={() => this.addDocument(this.state.emp.individualid)}>
                                                    <i id="action" className="fa fa-paperclip" />
                                                    &nbsp; {this.props.t('Attachment')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}

                            <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 left-border">
                                <Animated animationIn="bounceInRight" animationOut="fadeOut">
                                    <div className="panel panel-default main-body-height-admin">
                                        <div className="panel panel-body">

                                            <div className="page-container-right-panel">

                                                <div className="row nil-margin align-items-center">

                                                    <div className='col-lg-1 col-md-1 col-sm-1'>
                                                        <span className='content-icon-car'>
                                                            {!this.state.emp.profilephoto ? <i className="fa fa-users" /> :
                                                                <img
                                                                    id="icon-pics"
                                                                    src={!this.state.emp.profilephoto
                                                                        ? require('../../assets/user-img-gold.png')
                                                                        : this.state.emp.profilephoto}
                                                                    onError={(e) => {
                                                                        e.target.src = require('../../assets/user-img-gold.png');
                                                                    }}
                                                                    className="img-circle"
                                                                    alt="woman"
                                                                    height="50"
                                                                    width="50" />
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className='col-lg-9 col-md-9 col-sm-9'>
                                                        <span className="title-side-detail-panel">{this.state.emp.nameen} [{this.state.emp.namear}] - {this.state.emp.companyname}</span>
                                                    </div>

                                                    <div className="col-lg-2 col-md-2 col-sm-2">

                                                        {this.state.emp.status === "Pending" &&
                                                            <div className="dropdown dropdown right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle status-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Pending').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu pull-right status-dropdown" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                        {this.state.emp.status === "Approved" &&
                                                            <div className="dropdown dropdown right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle status-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Approved').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu pull-right status-dropdown" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                        {this.state.emp.status === "Rejected" &&
                                                            <div className="dropdown dropdown right">
                                                                <button type="button" className="btn btn-standard-gold dropdown-toggle status-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    {this.props.t('Rejected').toUpperCase()}
                                                                </button>

                                                                <div className="dropdown-menu pull-right status-dropdown" aria-labelledby="dropdownMenuButton">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                                </div>

                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row nil-margin">
                                                    <div className='col-lg-3 col-md-3 col-sm-2 col-xs-12'>
                                                        <p>
                                                            <a id="Roles" onClick={(e) => this.oepModelViewOpenClick('Roles', this.state.emp.individualid)}
                                                                data-toggle="modal"
                                                                className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                style={{ cursor: 'pointer', color: '#a97d3a', TextDecoder: 'underline' }}>{this.props.t('Roles')} {this.state.emp.rolescount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Fines" data-toggle="modal"
                                                                className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Fines', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('No_of_Fines')}{this.state.emp.finesCount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Vehicles" data-toggle="modal"
                                                                className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('No_of_Vehicles')}{this.state.emp.vehiclescount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Incidents" data-toggle="modal"
                                                                className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Incidents', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Incidents')}{this.state.emp.incidentscount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="ScoredCard"
                                                                data-toggle="modal"
                                                                className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('ScoredCard', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Scored_Card_Total')}{this.state.emp.scoreCardsCount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Documents"
                                                                className="btnNew btnNew-active"
                                                                data-toggle="modal"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Documents', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Documents')}{this.state.emp.documentscount}</a>
                                                        </p>
                                                        <p style={{ display: 'none' }}>
                                                            <a id="Permits"
                                                                className="btnNew btnNew-active"
                                                                data-toggle="modal"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Permits', this.state.emp.individualid)} style={{ cursor: 'pointer', color: ' #a97d3a' }}>{this.props.t('Permits')}{this.state.emp.permitcount}</a>
                                                        </p>
                                                    </div>
                                                    <div className='col-lg-5 col-md-5 col-sm-5 col-xs-12'>
                                                        <p> <strong>{this.props.t('Address')}</strong>&nbsp;
                                                                {this.state.emp.buildingnumber}&nbsp;&nbsp; {this.state.emp.flatnumber}
                                                            &nbsp; {this.state.emp.area}&nbsp;{this.state.emp.street}<br />
                                                            {this.state.emp.city}&nbsp;{this.state.emp.state}&nbsp;{this.state.emp.country}
                                                        </p>
                                                        <p><strong>{this.props.t('Email')}</strong>&nbsp;{this.state.emp.email}</p>
                                                        <p><strong>{this.props.t('Emirates')}</strong>&nbsp;{this.state.emp.emiratesid}</p>
                                                        <p><strong>{this.props.t('Company_Name')}</strong>&nbsp;{this.state.emp.companyname}</p>

                                                    </div>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
                                                        <p><strong>{this.props.t('Role')}</strong>&nbsp;{this.state.emp.rolename}</p>
                                                        <p><strong>{this.props.t('Date_of_Birth')}</strong> &nbsp;
																{
                                                                !this.state.emp.dob
                                                                    ? ""
                                                                    : this.state.emp.dob.split('T')[0]
                                                            }</p>
                                                        <p><strong>{this.props.t('Mobile_Number')}</strong>&nbsp; {this.state.emp.mobilenumberwithcountry}</p>
                                                        <p><strong>{this.props.t('Telephone_Number')}</strong>&nbsp;{this.state.emp.telephonenumberwithcountry}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="page-container-footer-right-panel">

                                                <button type="button" className="btn btn-standard-gold container-button-content" data-toggle="modal" data-target="#editModal" onClick={() => this.editEmployee(this.state.emp.individualid)}>
                                                    <i className="glyphicon glyphicon-edit"></i> {this.props.t('Edit')}
                                                </button>

                                                <button type="button" className="btn btn-standard-gold container-button-content" onClick={() => this.deleteEmployee(this.state.emp.individualid)}>
                                                    <i className="fa fa-trash"></i> {this.props.t('Delete')}
                                                </button>

                                                <button type="button" className="btn btn-standard-gold container-button-content" data-toggle="modal" data-target="#attachModal" onClick={() => this.addDocument(this.state.emp.individualid)}>
                                                    <i className="fa fa-paperclip"></i> {this.props.t('Attachment')}
                                                </button>

                                            </div>
                                        </div>

                                    </div>

                                </Animated>

                            </div>

                            {/*-- INFORMATIONAL DISPLAY / END --*/}

                        </div>
                        : null}
                </div>);
        }
        return (
            <div>
                <div>
                    {this.state.loading === true
                        && <div><Loader /></div>}
                    {contents}
                </div>
            </div >

        );

    }
}
export default translate(Employee);