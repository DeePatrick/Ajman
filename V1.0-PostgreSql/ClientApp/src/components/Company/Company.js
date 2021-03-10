import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import AddPartner from './AddPartners';
import AddActivity from './AddActivities';
import Docs from '../Documents/Docs';
import Loader from '../loader';
import $ from 'jquery';
import axios from 'axios';
import * as config from '../../config';
import ObjectView from '../ViewObjectModel/ObjectView';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Company extends Component {
    displayName = Company.name

    constructor(props) {
        super(props);

        this.state = {
            languageid: 0,
            companyid: 0,
            individualid: 0,
            requiredItem: 0,
            currentPage: 0,
            pageLimit: 10,
            offset: 0,
            emirtaiId: '',
            isUpload: false,
            ownerRolesCount: '',
            documentsCount: '',
            vehiclesCount: '',
            finesCount: '',
            numEmployees: '',
            Action: '',
            compID: '',
            indivID: '',
            search: '',
            searchMake: '',
            searchOwner: '',
            optDetails: {},
            Id: {},
            company: {},
            countryCodes: [],
            vehList: [],
            empList: [],
            vecList: [],
            currentDrivers: [],
            vec: [],
            showing: false,
            isEditOpen: false,
            isAddOpen: false,
            isDocOpen: false,
            isModelViewOpen: true,
            objModelName: '',
            redirectVehicle: false,
            redirectPermit: false,
            redirectIndividual: false,
            redirectCompany: true,
            isAddEmployee: false,
            loading: false,
            isAddPartner: false,
            isAddActivity: true,
            mode: ''
        };
        this.refreshCompany = this
            .refreshCompany
            .bind(this);
    }

    componentWillMount() {
        this.setState({ loading: true, isAddPartner: true });
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.bindCompany();
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
    bindCompany(mode) {
        fetch(config.webApiUrl() + 'aptc_individual_getCompanys/' + localStorage.getItem('selectedLanguageCode') + '/' + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                if (data[0] !== undefined) {
                    if (data.length === 0) {
                        this.setState({ isEditOpen: false, isAddOpen: true, loading: false });
                    }
                    else {
                        if (mode === 'edit' && this.state.companyid !== undefined) {
                            var temp = [];
                            this.setState({ mode: '' });
                            $.each(data, function (key, value) {
                                if (value.companyid === this.state.companyid) {
                                    temp = data[key];
                                }
                            })
                            if (temp.length > 0) {
                                this.setState({ vec: temp });
                                this.setState({ companyphoto: temp.companyphoto });
                            }
                            else {

                                this.setState({ vec: data[0] });
                                if (data.length > 0) {
                                    this.setState({ companyphoto: data[0].companyphoto });
                                }
                            }
                        }
                        else {
                            this.setState({ vec: data[0] });
                            if (data.length > 0) {
                                this.setState({ companyphoto: data[0].companyphoto });
                            }
                        }
                        this.setState({ vecList: data, currentDrivers: data, isEditOpen: true, isAddOpen: true, isDocOpen: true });
                        this.setState({ loading: false, vec: data[0], requiredItem: 0 });
                    }
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
    viewItem = (action, companyid) => {
        this.setState({ mode: '' });
        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (companyid === this.state.vecList[indx].companyid) {
                var vec = {};
                vec = this.state.vecList[indx];
                this.setState({ companyphoto: vec.companyphoto });
                this.setState({ vec: vec });
                this.setState({ requiredItem: indx });
            }
        }
    };

    addCompany = (e) => {
        this.setState({ mode: '' });
        this.setState({ isAddOpen: true });
    };
    addDocument = (companyid) => {
        this.setState({ companyid: companyid });
        this.setState({ companyid: companyid, isDocOpen: true, mode: 'doc' });
    };
    editCompany = (companyid) => {
        this.setState({ companyid: companyid, mode: 'edit' });
        this.setState({ isEditOpen: true });
    }
    deleteCompany = (companyid, companyname) => {
        if (!window.confirm("Do you want to delete company with name: " + companyname))
            return;
        else {
            this.setState({ loading: true });
            var url = config.webApiUrl() + 'aptc_company/' + companyid;
            fetch(url, { method: 'delete' })
                .then(data => {
                    const requiredItem = this.state.requiredItem;
                    let tempbrochure = this.state.vecList;
                    tempbrochure.splice(requiredItem, 1);
                    this.bindCompany();
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    if (error.response !== undefined) {
                        if (error.response.data !== undefined) {
                            alert(error.response.data.ResponseMessage);
                        }
                    }
                    else {
                        alert(error.message);
                    }
                });
        }
    };

    addPartner = (companyid) => {
        this.setState({ isAddPartner: true, companyid: companyid });
    }
    addActivity = (companyid) => {
        this.setState({ isAddActivity: true, companyid: companyid });
    }

    refreshCompany = (companyid, mode) => {
        this.setState({ companyid: companyid, loading: true });
        this.bindCompany(mode);
    };
    companyFileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            var fileName = e.target.files[0];
            var size = fileName.size;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ companyphoto: e.target.result, filename: fileName.name, isUpload: true });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    cancelimage = (e) => {
        this.setState({ companyphoto: this.state.vec.companyphoto, isUpload: false });
    };
    saveimage = (companyid) => {
        var companyPhoto = {};
        companyPhoto.modifyby = localStorage.getItem('individualid');
        companyPhoto.filename = this.state.filename;
        companyPhoto.companyid = companyid;
        companyPhoto.companyphoto = this.state.companyphoto;
        var imageupload = JSON.stringify(companyPhoto);
        axios
            .put(config.webApiUrl() + "aptc_company_companyphoto", imageupload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false, isUpload: false, mode: 'edit', companyid: companyid  });
                this.bindCompany();
            })
            .catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });

    };
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

    render() {
        const { vecList, currentDrivers, currentPage, totalPages, redirectVehicle, redirectPermit, redirectIndividual } = this.state;
        const totalDrivers = vecList.length;
        let contents = "";
        if (totalDrivers === 0) {
            contents = (
                <div className="row">
                    {this.state.loading === false &&
                        < div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                    <div
                                        className="panel-title black-button-admin center"
                                        data-toggle="modal"
                                        data-target="#addModal"
                                        onClick={this
                                            .addCompany
                                            .bind(this)}>
                                        <i className="fa fa-plus fa-lg" />
                                        <span className="btn-text-admin" style={{ marginLeft: '6px' }}>Add Company</span>
                                    </div>
                                </div>
                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                    <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                </div>

                            </Animated>

                            {this.state.isAddOpen === true &&
                                <AddCompany
                                    saveModalDetails={this.saveModalDetails} />}
                        </div>
                    }
                </div>)
        }
        else {
            contents = "";
            let filteredCompanies = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    currentDrivers === null || currentDrivers === [] ? "No Value" :
                        filteredCompanies = this
                            .state
                            .currentDrivers
                            .filter((vec) => {
                                return (
                                    vec.website.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.chambernumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.crnumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                                );
                            });
                }

            }
            const { showing } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];
            debugger;
            contents = (<div>  {this.state.loading === true && <div><Loader /></div>}

                <div className="row">
                    <div className="col-md-2 col-lg-2 col-sm-5 col-xs-6">
                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                            <div
                                onClick={this.addCompany
                                    .bind(this)}
                                className="panel-title black-button-admin  center"
                                data-toggle="modal"
                                data-target="#addModal">
                                <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">{this.props.t('Add_Company')}</span>
                            </div>
                        </Animated>
                    </div>

                    <div className="col-md-10 col-lg-10 col-sm-7 col-xs-6">
                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div>
                                        <input style={{ width: '98%' }}
                                            type="text"
                                            className="form-search-admin"
                                            placeholder={this.props.t('Search')}
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
                </div>

                {this.state.isAddOpen === true &&
                    <AddCompany mode={this.state.mode} refreshCompany={this.refreshCompany} />}
                {this.state.isEditOpen === true &&
                    <EditCompany mode={this.state.mode} companyid={this.state.companyid} refreshCompany={this.refreshCompany} />
                }
                {this.state.isDocOpen === true &&
                    <Docs mode={this.state.mode} companyid={this.state.companyid} refreshCompany={this.refreshCompany} type="COMP" />
                }

                {
                    this.state.isAddPartner === true &&
                    <AddPartner companyid={this.state.companyid} refreshCompany={this.refreshCompany} />
                }
                {
                    this.state.isAddActivity === true &&
                    <AddActivity companyid={this.state.companyid} refreshCompany={this.refreshCompany} />
                }
                {
                    this.state.isModelViewOpen === true &&
                    <ObjectView Action={this.state.Action} ActionType="COMP" companyid={this.state.companyid} />
                }
                {showing
                    ?
                    <div className="row">
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                            <div className="panel panel-default">
                                <div className="panel panel-body">
                                    <br />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <label className="container-x">
                                                        <input type="checkbox" />
                                                        <span className="checkmark" />
                                                    </label>
                                                </th>
                                                <th scope="col">{this.props.t('Basic_Info')}</th>
                                                <th scope="col">{this.props.t('Company_Name')}</th>
                                                <th scope="col">{this.props.t('Company_Reg_No')}</th>
                                                <th scope="col">{this.props.t('Address')}</th>
                                                <th scope="col">{this.props.t('Email')}</th>
                                                <th scope="col">{this.props.t('Telephone')}</th>
                                                <th scope="col">{this.props.t('Status')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {filteredCompanies.map((vec, index) => (<tr className="panel-bubble-new" key={index}>
                                                <td scope="row">

                                                    <label className="container-x">
                                                        <input type="checkbox" />
                                                        <span className="checkmark" />
                                                    </label>

                                                </td>
                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    <i id="icon-exclamation-circle-gold-small" className="fa fa-building" />
                                                    <img src={"data:image/jpeg;" + vec.companyPhoto} />
                                                    {vec.namear}
                                                    &nbsp; {vec.nameen}
                                                </td>
                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    {vec.companynameen}&nbsp; {vec.companynamear}
                                                </td>
                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    {vec.crnumber}
                                                </td>
                                                <td
                                                    scope="row"
                                                    title={vec.address}
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    {vec.buildingnumber} &nbsp; {vec.flatnumber}  &nbsp; {vec.street} &nbsp; {vec.area}.......
                                                </td>

                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    {vec.email}
                                                </td>
                                                <td
                                                    scope="row"

                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    +
                                                    {vec.telephonecountry}
                                                    {vec.telephonearea}
                                                    {vec.telephonenumber}
                                                </td>
                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>
                                                    {vec.statusid === 420 &&
                                                        <div className="pending">{this.props.t('Pending')}</div>}
                                                    {vec.statusid === 421 &&
                                                        <div className="approved">{this.props.t('Approved')}</div>
                                                    }
                                                    {vec.statusid === 422 &&
                                                        <div>{this.props.t('Rejected')}</div>
                                                    }
                                                </td>
                                                <td scope="row">
                                                    <button
                                                        type="hidden"
                                                        className={this.state.show
                                                            ? "glyphicon glyphicon-option-horizontal"
                                                            : this.state.show}
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false" />
                                                    <button
                                                        id="call"
                                                        style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }}
                                                        data-toggle="modal"
                                                        data-target="#editModal"
                                                        onClick={() => this.viewItem('edit', vec.companyid)} ><i className="glyphicon glyphicon-edit" /></button>
                                                    <button style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }} className={!this.state.show ? "" : this.state.show} onClick={() => this.deleteCompany(vec.companyid, vec.companynameen)}><i className="fa fa-trash" /></button>

                                                    <button style={{ fontSize: '18px', color: '#9f8865', marginRight: '5px' }}
                                                        data-toggle="modal"
                                                        data-target="#attachModal"
                                                        onClick={() => this.viewItem('doc', vec.companyid)}><i className="fa fa-paperclip" /></button>
                                                </td>
                                            </tr>))}
                                        </tbody>
                                    </table>

                                    <div className="movein">
                                        <div>
                                            <h4>
                                                <strong >{totalDrivers}</strong>{" "}
                                                {this.props.t('User_entries')}
                                            </h4>
                                            {currentPage && (
                                                <span>
                                                    {this.props.t('Rejected')}{this.props.t('Page')} &nbsp;
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
                    </div>
                    : null}

                {!showing
                    ? <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <div className="panel panel-default">
                                    <div className="panel panel-body">
                                        <br />
                                        <div style={{ height: '400px', overflow: 'auto' }}>
                                            <div className="rTableRow ">
                                                <div className="well no-well no-border">
                                                    <span className="icon-checkbox">
                                                        <label className="container-y">
                                                            <input type="checkbox" />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </span>
                                                    <strong> {this.props.t('Basic_Info')}</strong>
                                                </div>
                                            </div>
                                            <div className="container-fluid movetop">
                                                {filteredCompanies.map((vec, index) => (<div className="" key={index}>
                                                    <div className="">
                                                        <div className="speech-bubble small-margin-well">

                                                            <label className="container-y">
                                                                <input type="checkbox" />
                                                                <span className="checkmark" />
                                                            </label>

                                                            <span className='pics'>

                                                                <img
                                                                    id="icon-exclamation-circle-gold-small"
                                                                    src={!vec.companyphoto
                                                                        ? require('../../assets/company-icon.png')
                                                                        : vec.companyphoto}
                                                                    onError={(e) => {
                                                                        e.target.src = require('../../assets/company-icon.png')
                                                                    }} onClick={() => this.viewItem('', vec.companyid)}
                                                                    className="img-circle"
                                                                    onClick={() => this.viewItem('', vec.companyid)}
                                                                    alt="company"
                                                                    height="30"
                                                                    width="30" />

                                                            </span>

                                                            <span
                                                                onClick={() => this.viewItem('', vec.companyid)}>
                                                                &nbsp;{vec.nameen}
                                                            </span>

                                                            <span
                                                                onClick={() => this.viewItem('', vec.companyid)}
                                                                className="pull-right">&nbsp;&nbsp;
                                                                    <i id="scaled-arrow" className="glyphicon glyphicon-option-horizontal" />
                                                            </span>

                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>))}
                                            </div>
                                        </div>
                                        <div className="movein">
                                            <div>
                                                <h4>
                                                    <strong >{totalDrivers}</strong>{" "}
                                                    {this.props.t('Company_entries')}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12 left-border">
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" >
                                <div className="panel panel-default main-body-height-admin">
                                    <div>
                                        <br /></div>
                                    {this.state.vec.email !== undefined && <div>
                                        <br />
                                        <div>
                                            <div className='col-lg-2 col-md-2 col-sm-2'>
                                                <span className='pics'>&nbsp;
                                                        <img
                                                        id="icon-exclamation-circle-gold-small"
                                                        src={!this.state.companyphoto
                                                            ? require('../../assets/company-icon.png')
                                                            : this.state.companyphoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/company-icon.png')
                                                        }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="120"
                                                        width="120" />
                                                </span>
                                                <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.companyFileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                                {
                                                    this.state.isUpload === false &&
                                                    <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Edit Image" onClick={() => this.fileInput.click()}><i className="fa fa-pencil" /></span>}
                                                {
                                                    this.state.isUpload === true &&
                                                    <div>
                                                        <div style={{ marginLeft: '40px' }}>
                                                            <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Save" onClick={() => this.saveimage(this.state.vec.companyid)}><i className="fa fa-save" /></span>
                                                            <span style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '10px' }} title="Cancel" onClick={() => this.cancelimage()}><i className="fa fa-close" /></span>
                                                        </div></div>
                                                }
                                            </div>

                                            <div id="left-border-line-admin"
                                                className="col-lg-8 col-md-8 col-sm-9 left-margin">
                                                <div className="pull-right" style={{ display: 'none' }}>
                                                    <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fa fa-times" />
                                                </div>
                                                <div>
                                                    <span className="title-side-detail-panel">{this.state.vec.nameen}</span>
                                                    {this.state.vec.statusid === 420 &&
                                                        <span className="pending">{this.props.t('Pending')}</span>}
                                                    {this.state.vec.statusid === 421 &&
                                                        <span className="approved">{this.props.t('Approved')}</span>
                                                    }
                                                    {this.state.vec.statusid === 422 &&
                                                        <span className="rejected">{this.props.t('Rejected')}</span>
                                                    }
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-9 col-lg-9 col-sm-10">
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Address')}</strong>{this.state.vec.flatnumber} &nbsp; {this.state.vec.buildingnumber}</p>
                                                        <p>{this.state.vec.street}&nbsp;{this.state.vec.area}&nbsp;{this.state.vec.city}</p>
                                                        <p>{this.state.vec.state} &nbsp; {this.state.vec.country}</p>
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Chamber_Number')} </strong> {!this.state.vec.chambernumber ? "" : this.state.vec.chambernumber}</p>
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Establishment_Date')}</strong> {!this.state.vec.establishmentdate ? "" : this.state.vec.establishmentdate.split('T')[0]}</p>
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Email_Address')}</strong> {this.state.vec.email}</p>
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Telephone_Number')}</strong> +{this.state.vec.telephonecountry}{this.state.vec.telephonearea}{this.state.vec.telephonenumber}</p>
                                                        <p style={{ marginTop: '10px' }}><strong style={{ marginRight: '10px' }}>{this.props.t('Company_Register_Number')}</strong> {this.state.vec.crnumber}</p>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-sm-2">
                                                        <p>

                                                            <a className="btnNew btnNew-active" id="Ownership" onClick={(e) => this.oepModelViewOpenClick('Ownership', this.state.vec.companyid)}
                                                                data-toggle="modal"
                                                                data-target="#objectModal"
                                                                style={{ cursor: 'pointer', color: '#9f8865;' }}>{this.props.t('Ownership')} {this.state.vec.ownershipcount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Fines" data-toggle="modal"
                                                                data-target="#objectModal" className="btnNew btnNew-active"
                                                                onClick={(e) => this.oepModelViewOpenClick('Fines', this.state.vec.companyid)} >{this.props.t('No_Of_Fines')} {this.state.vec.finescount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Vehicles"
                                                                data-toggle="modal" className="btnNew btnNew-active"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Vehicles', this.state.vec.companyid)} >{this.props.t('No_of_Vehicles')}{this.state.vec.vehiclescount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Documents"
                                                                data-toggle="modal"
                                                                data-target="#objectModal" className="btnNew btnNew-active"
                                                                onClick={(e) => this.oepModelViewOpenClick('Documents', this.state.vec.companyid)} >{this.props.t('Documents')} {this.state.vec.documentscount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Permit"
                                                                data-toggle="modal"
                                                                data-target="#objectModal" className="btnNew btnNew-active"
                                                                onClick={(e) => this.oepModelViewOpenClick('Permits', this.state.vec.companyid)} >{this.props.t('Permits')} {this.state.vec.permitsCount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Employee"
                                                                data-toggle="modal"
                                                                data-target="#objectModal" className="btnNew btnNew-active"
                                                                onClick={(e) => this.oepModelViewOpenClick('Employees', this.state.vec.companyid)} >{this.props.t('Employees')} {this.state.vec.noemployeescount}</a>
                                                        </p>
                                                        <p>
                                                            <a id="Activity"
                                                                data-toggle="modal"
                                                                data-target="#objectModal" className="btnNew btnNew-active"
                                                                onClick={(e) => this.oepModelViewOpenClick('Activity', this.state.vec.companyid)} >{this.props.t('Activities')} {this.state.vec.activitiesCount}</a>
                                                        </p>
                                                    </div>

                                                </div>
                                                <br /><br />
                                                <div className="colour">
                                                    <button
                                                        className="black-margin action"
                                                        data-toggle="modal"
                                                        data-target="#editModal"
                                                        onClick={() => this.editCompany(this.state.vec.companyid)}>
                                                        <i className="glyphicon glyphicon-edit" />
                                                        &nbsp; {this.props.t('Edit_Details')}
                                                    </button>

                                                    <button
                                                        className="black-margin action"
                                                        onClick={() => this.deleteCompany(this.state.vec.companyid, this.state.vec.companynameen)}>
                                                        <i className="fa fa-trash" />
                                                        &nbsp; {this.props.t('Delete')}
                                                    </button>
                                                    <button className="black-margin action" data-toggle="modal" data-target="#attachModal"
                                                        onClick={() => this.addDocument(this.state.vec.companyid)}>
                                                        <i id="action" className="fa fa-paperclip" />
                                                        &nbsp; {this.props.t('Attachment')}
                                                    </button>
                                                    <button className="black-margin action" data-toggle="modal" data-target="#activityModal"
                                                        onClick={() => this.addActivity(this.state.vec.companyid)}>
                                                        <i id="action" className="fa fa-plus" />
                                                        &nbsp; {this.props.t('Add_Activity')}
                                                    </button>
                                                    <button className="black-margin action" data-toggle="modal" data-target="#partnerModal"
                                                        onClick={() => this.addPartner(this.state.vec.companyid)}>
                                                        <i id="action" className="fa fa-plus" />
                                                        &nbsp; {this.props.t('Add_Partner')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }

                                </div>

                            </Animated>

                        </div>
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
            </div>

        );
    }
}
export default translate(Company);
