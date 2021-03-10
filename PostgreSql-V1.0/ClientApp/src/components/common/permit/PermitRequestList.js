import React, { Component } from 'react';
import Pagination from '../../shared/Pagination';
import { Animated } from "react-animated-css";
import RenewPermit from './RenewPermit';
import './Permit.css';
import RequestPermit from './RequestPermit';
import axios from 'axios';
import $ from 'jquery';
import * as config from './../../../config';
import { Redirect } from 'react-router-dom';
import Loader from '../../loader';

class PermitRequestList extends Component {
    displayName = PermitRequestList.name

    constructor(props) {
        super(props);
        this.state = {
            cRNumID: '',
            requiredItem: 0,
            docAccepted: 'AP',
            fullName: '',
            vecPermitList: [],
            permitList: [],
            currentDrivers: [],
            loading: true,
            isRequestPermit: true,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            countryCodes: [],
            redirectCompany: true,
            error: null
        };

        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.saveModalDetails = this
            .saveModalDetails
            .bind(this);

        this.fullDelete = this
            .fullDelete
            .bind(this);

        this.isLoding = this
            .isLoding
            .bind(this);
    }

    componentDidMount() {
        this.bindPermits();
    }

    bindPermits() {
        debugger;
        var _id = this.props.location.state.vec.individualid;
        this.setState({
            cRNumID: _id
        });

        console.log(_id);
        const url = config.webApiUrl() + "aptc_individual_permits/" + localStorage.getItem('selectedLanguageCode') + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    this.setState({ vecPermitList: data, loading: false, cRNumID: _id });
                }

            });

        console.log(this.state.vecPermitList);
    }

    requestPermit = (id) => {
        this.setState({ isRequestPermit: true, mode: 'edit' });
    }
    onPageChanged = data => {
        const { vecPermitList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecPermitList.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentDrivers, totalPages });
    };


    replaceModalItem = (index, action) => {
        if (action === 'edit') {
            this.setState({ isEditOpen: true });
            this.getEmployeeDetails();
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });

        }

        this.toggleHide();

        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.setState({ requiredItem: indx });
            vec = this.state.vecPermitList[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.vecPermitList[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
        }


    };


    toggleHide = () => {
        var showing = this.state.showing;
        this.setState({ showing: false });
    }


    isLoding() {
        this.setState({ loading: true });
    }

    saveModalDetails = (vec) => {
        this.bindPermits();
        //const requiredItem = this.state.requiredItem;
        //let tempbrochure = this.state.vecPermitList;
        //tempbrochure[requiredItem] = vec;
        //this.setState({ vecPermitList: tempbrochure });
        //this.setState({ currentDrivers: tempbrochure });
        //this.setState({ vec: vec });
    };

    deleteItem = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        if (this.state.vecPermitList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecPermitList[index];
        }

        _id = valueObject.docOutId;



        if (!window.confirm("Do you want to delete permit with Id: " + _id))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);
        }
    };

    fullDelete(docOutId, index) {
        var _id;
        _id = docOutId;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var valueObjectId = valueObject.docOutId;


        fetch(config.webApiUrl() + 'aptc_docOut/' + _id, { method: 'delete' }).then(data => {
            const requiredItem = this.state.requiredItem;
            let tempbrochure = this.state.vecPermitList;
            tempbrochure.splice(requiredItem, 1);
            this.setState({ vecPermitList: tempbrochure });
            this.setState({ currentDrivers: tempbrochure });
            this.setState({ vec: tempbrochure[requiredItem] });
            this.setState({ loading: false });
        }).catch((error) => {
            alert("axios error:", error.response.data.ResponseMessage);
            this.setState({ loading: false });
        });

    }


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
                .substring(0, 5)
        });
    }
    updatesearchOwner(event) {
        this.setState({
            searchOwner: event
                .target
                .value
                .substring(0, 5)
        });
    }


    approve = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _docTypeName = valueObject.docTypeName;
        var _indivName = valueObject.indivName;
        var _compIDName = valueObject.compIDName;
        _id = valueObject.docOutId;

        if (!window.confirm("Are you sure you want to approve " + _docTypeName + " permit for " + _compIDName + " ?"))
            return;
        else {


            let docAccepted = 'AP';
            this.setState({ docAccepted: docAccepted });
            this.state.vec.docAccepted = 'AP';


            console.log(this.state);
            const user = JSON.stringify(this.state);
            console.log(user);
            axios.put(config.webApiUrl() + 'aptc_Approved_docOut/' + _id, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ docAccepted: docAccepted, loading: false });
                    $('.close').click();
                }
            });

            this.setState({ docAccepted: docAccepted });
        }

    }

    reject = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _docTypeName = valueObject.docTypeName;
        var _indivName = valueObject.indivName;
        var _compIDName = valueObject.compIDName;
        _id = valueObject.docOutId;
        if (!window.confirm("Are you sure you want to reject " + _docTypeName + " permit for " + _compIDName + " ?"))
            return;
        else {


            let docAccepted = 'RE';
            this.setState({ docAccepted: docAccepted });
            this.state.vec.docAccepted = 'RE';


            console.log(this.state);
            const user = JSON.stringify(this.state);
            console.log(user);
            axios.put(config.webApiUrl() + 'aptc_Reject_docOut/' + _id, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ docAccepted: docAccepted, loading: false });
                    $('.close').click();
                }
            });

            this.setState({ docAccepted: docAccepted });
        }

    }


    pending = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _docTypeName = valueObject.docTypeName;
        var _indivName = valueObject.indivName;
        var _compIDName = valueObject.compIDName;
        _id = valueObject.docOutId;


        if (!window.confirm("Are you sure you want to keep " + _docTypeName + " permit for " + _compIDName + " as pending?"))
            return;
        else {

            let docAccepted = 'PE';
            this.setState({ docAccepted: docAccepted });
            this.state.vec.docAccepted = 'PE';
        }

    }

    render() {

        if (!this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/company' }} />;
        }


        const { vecPermitList, currentDrivers, currentPage, totalPages, loading, redirectCompany } = this.state;
        const totalDrivers = vecPermitList.length;
        let contents = "";
        if (totalDrivers === 0 && loading === false) {
            contents = (
                <div>
                    <div className="fixed-search">
                        <div className="col-md-3 col-lg-2 col-sm-3 col-xs-3">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    onClick={(e) => this.requestPermit()}
                                    data-target="#requestModal">
                                    <i className="fa fa-plus fa-lg" />
                                    <span className="btn-text-admin">Add Permit</span>
                                </div>
                            </Animated>

                        </div>
                        <div className="col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input">
                            <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
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

                        <div className="">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 empty-list-panel">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height-admin">
                                        <div className="panel panel-body">
                                            <div className="company-header">
                                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                                <div className="pull-left company-title">
                                                    <span><img id="icon-pics"
                                                        src={!this.props.location.state.vec.companyPhoto
                                                            ? require('../../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyPhoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-rounded"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.companynameen}</strong></span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-center text-vertical">
                                                    <i className="fas fa-ticket-alt icon-truck-gold-no-circle rotate" />
                                                    <p>No Permit request for this person click "Add Permit" button to request a Permit</p></h5>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>
                    </div>
                    {this.state.isRequestPermit === true &&
                        <RequestPermit
                            cRNum={this.props.cRNum}
                            cRNumID={this.state.cRNumID}
                            saveModalDetails={this.saveModalDetails}
                        />
                    }
                </div>);
        }
        else {
            contents = "";
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                filteredVehicles = this
                    .state
                    .currentDrivers
                    .filter((vec) => {
                        return (
                            vec.docTypeName.toLowerCase().indexOf(this.state.search) !== -1
                            || vec.docTypeName.toUpperCase().indexOf(this.state.search) !== -1
                            || vec.vehIDTrafficNum.toLowerCase().indexOf(this.state.search) !== -1
                            || vec.vehIDTrafficNum.toUpperCase().indexOf(this.state.search) !== -1
                        );
                    });
            }

            const { showing, redirectCompany } = this.state;

            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecPermitList[requiredItem];

            contents = (<div>  {this.state.loading === true && <div><Loader /></div>}
                <div className="fixed-search">
                    <div className="col-md-2 col-lg-2 col-sm-5 col-xs-6">

                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                            <div
                                className="panel-title black-button-admin center"
                                data-toggle="modal"
                                data-target="#requestModal">
                                <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">Add Permit</span>
                            </div>
                        </Animated>

                    </div>
                    <div className="col-md-10 col-lg-10 col-sm-7 col-xs-6 entity-search-input">
                        <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
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
                <RenewPermit
                    cRNumID={this.state.cRNumID}
                    docOutId={modalData.docOutId}
                    docType={modalData.docType}
                    docRef={modalData.docRef}
                    docClass={modalData.docClass}
                    lang={modalData.lang}
                    version={modalData.version}
                    dateTime={modalData.dateTime}
                    status={modalData.status}
                    validFrom={modalData.validFrom}
                    validTo={modalData.validTo}
                    rejReas={modalData.rejReas}
                    indivID={modalData.indivID}
                    vehID={modalData.vehID}
                    compID={modalData.compID}
                    docOutContent={modalData.docOutContent}
                    docFile={modalData.docFile}
                    saveModalDetails={this.saveModalDetails} />

                <RequestPermit
                    cRNum={this.props.cRNum}
                    cRNumID={this.state.cRNumID}
                    saveModalDetails={this.saveModalDetails}
                />
                <div className="entity-table">
                    <div className={this.state.showing ? "panel panel-default" : "panel panel-default animate-table pull-left"}>
                        <div className="panel panel-body">
                            <div className="company-header">
                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })}
                                    className="fas fa-times" /></div>
                                <div className="pull-left company-title">
                                    <span><img id="icon-pics"

                                        src={!this.props.location.state.vec.companyPhoto
                                            ? require('../../../assets/companylogos/norecord.png')
                                            : this.props.location.state.vec.companyPhoto}
                                        onError={(e) => {
                                            e.target.src = require('../../../assets/companylogos/norecord.png');
                                        }}
                                        className="img-rounded"
                                        alt="woman"
                                        height="40"
                                        width="40" />
                                    </span>
                                    <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.companynameen}</strong></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="table-responsive table-width">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <label className="container-x">
                                                            <input type="checkbox" />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </th>
                                                    <th scope="col">Basic Info</th>
                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Valid From</th>
                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Expires</th>
                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Permit Type</th>
                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Permit No</th>
                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {filteredVehicles.map((vec, index) => (
                                                    <tr className="panel-bubble-new" key={index}>
                                                        <td scope="row">

                                                            <label className="container-x">
                                                                <input type="checkbox" />
                                                                <span className="checkmark" />
                                                            </label>

                                                        </td>
                                                        <td
                                                            scope="row"
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                            <i id="" className="fas fa-ticket-alt rotate icon-ticket-black-admin" />
                                                            {vec.indivName} &nbsp; {vec.vehIDTrafficNum} &nbsp; {vec.vehIDMake}&nbsp; {vec.vehIDModel}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                            {vec.validFrom}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                            {vec.validTo}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                            {vec.docTypeName}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}>
                                                            {vec.docOutId}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.cRNum)}><button className={vec.docAccepted === 'AP' ? "approved" : "pending"}>{vec.docAccepted === 'AP' ? "Approved" : "Pending"}</button>
                                                        </td>

                                                        <td scope="row" className="more-item">
                                                            <div className="dropdown">
                                                                <button id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                                                    type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                        <button
                                                                            id="call"
                                                                            className={!this.state.show
                                                                                ? ""
                                                                                : this.state.show}
                                                                            data-toggle="modal"
                                                                            data-target="#renewModal"
                                                                            onClick={() => this.replaceModalItem(index)}>Edit</button>
                                                                    </li>
                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                        <button
                                                                            className={!this.state.show
                                                                                ? ""
                                                                                : this.state.show}
                                                                            onClick={() => this.deleteItem(index)}>Delete</button>
                                                                    </li>
                                                                </ul>
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
                                        Permit entries
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

                    <div>

                        {this.state.vec.docOutId !== undefined &&
                            <div>
                                {!this.state.showing ?
                                    <div className={this.state.showing ? "panel panel-default main-body-height-admin" : "panel panel-default main-body-height-admin animate-detail-panel pull-right"}>
                                        <br />
                                        <div className='col-lg-3 col-md-4 col-sm-6 title-image pull-left'>
                                            <i id="" className="fa fa-ticket-alt rotate icon-ticket-alt-old-big" />
                                        </div>

                                        <div id="left-border-line-admin" className="col-lg-9 col-md-8 col-sm-6 left-margin pull-right">
                                            <div className="pull-right">
                                                <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fas fa-times" />
                                            </div>
                                            <div className="">
                                                <div className="">
                                                    <div>
                                                        <p> <span className="title-side-detail-panel title-right">{this.state.vec.indivName}{this.state.vec.vehIDTrafficNum} &nbsp;{this.state.vec.vehIDMake}&nbsp;{this.state.vec.vehIDModel}</span>
                                                            <span className="btn-group" style={{ marginBottom: '15px', marginLeft: '5px' }}>
                                                                <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                <button className={this.state.vec.docAccepted == 'PE' ? "btn btn-active status dropdown-toggle status-title" : "btn btn-status-approved dropdown-toggle status status-title-approved"} data-toggle="dropdown">{!this.state.docAccepted || this.state.vec.docAccepted == 'PE' ? "Pending" : "Approved"}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                    <li className="dropdown-spacing" onClick={this.pending}>Pending
                                                                        </li>
                                                                    <li className="dropdown-spacing" onClick={this.approve}>Approved
                                                                        </li>
                                                                    <li className="dropdown-spacing" onClick={this.reject}>Rejected
                                                                        </li>
                                                                </ul>
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <br />
                                                    <p>Validity: {!this.state.vec.docAcceptedDate
                                                        ? null
                                                        : this.state.vec.docOutContent.duration} &nbsp;
                                                        {!this.state.vec.docAcceptedDate
                                                            ? null
                                                            : 'after '}&nbsp;

                                                            {!this.state.vec.docAcceptedDate
                                                            ? 'NOT YET APPROVED'
                                                            : this.state.vec.docAcceptedDate}</p>
                                                    <br /> <br />
                                                    <p>Permit Type: {this.state.vec.docTypeName} </p>

                                                    <p>Permit Number: {this.state.vec.docOutId}</p>
                                                    <br />
                                                    <h5>Vehicle Registrar:</h5>
                                                </div>
                                                <div className="" />
                                            </div>
                                            <div>
                                                <img
                                                    id="icon-pics"
                                                    src={!this.state.vec.photo
                                                        ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                        : this.state.vec.photo}
                                                    onError={(e) => {
                                                        e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                    }}
                                                    className="img-circle"
                                                    alt="woman"
                                                    height="52"
                                                    width="52" data-toggle="tooltip" data-placement="bottom" title={!this.state.vec.indivName ? "No Registar required for this permit" : this.state.vec.indivName}
                                                />

                                            </div>
                                            <br />

                                            <br />

                                            <div className="colour">
                                                <button className="black-margin">
                                                    <i className="fa fa-truck" />
                                                    &nbsp; Vehicle Info
                                                            </button>
                                                <button
                                                    className="black-margin"
                                                    data-toggle="modal"
                                                    data-target="#renewModal">
                                                    <i id="action" className="fa fa-retweet" />
                                                    &nbsp; Renew Permit
                                                            </button>
                                                <button className="black-margin">
                                                    <i className="fa fa-envelope" />
                                                    &nbsp; Message
                                                            </button>
                                                <button className="black-margin">
                                                    <i className="fa fa-phone" />
                                                    &nbsp; Call
                                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                    : null}
                            </div>

                        }
                    </div>
                </div>

            </div>

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
export default PermitRequestList;