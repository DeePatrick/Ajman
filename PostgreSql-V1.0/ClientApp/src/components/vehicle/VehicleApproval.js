import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import axios from 'axios';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import * as config from '../../config';
import Loader from '../loader';

class VehicleApproval extends Component {
    displayName = VehicleApproval.nameen

    constructor(props) {
        super(props);

        this.state = {
            statusid: 0,
            isDesktop: false,
            companyid: '',
            requiredItem: 0,
            currentPage: 0,
            pageLimit: 0,
            fullName: '',
            filteredVehicles: [],
            vecList: [],
            tempVecList: [],
            currentDrivers: [],
            loading: true,
            isEditOpen:false,
            offset: 0,
            mode: '',
            vec: [],
            status: 'PE',
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            action: '',
            crnum: '',
            nameen: '',
            vehicles: [],
            redirectCompany: true
        };

        this.updatePredicate = this.updatePredicate.bind(this);

        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.saveModalDetails = this
            .saveModalDetails
            .bind(this);

        this.fullDelete = this
            .fullDelete
            .bind(this);

        this.bindVehicles('pen');

        this.handleClick = this
            .handleClick
            .bind(this);
        this.isLoding = this
            .isLoding
            .bind(this);
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ vecList: [] });
        this.setState({
            crnumber: nextProps.crnumber,
            vehicles: nextProps.vehicles,
            nameen: nextProps.nameen,
            action: nextProps.action
        });
        this.bindVehicles(nextProps.action);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
        this.bindVehicles('pen');
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
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
        var id = valueObject.vehicleid;
        _name = valueObject.make + '-' + valueObject.model + '  ' + valueObject.yearmanufacture;
        var _registrationNum = valueObject.enginenumber;

        var msg = ""
        if (action === 'app') {
            msg ='approve'
        }
        if (action === 'rej') {
            msg = 'reject'
        }
        var vehname_regisno = _name + ' registration number ' + _registrationNum;
        if (!window.confirm("Are you sure you want to " +msg+ " " + vehname_regisno + " ?"))
            return;
        else {
            this.setState({ loading: true });
            var approvedDetails = {};
            approvedDetails.id = id;
            if (action === 'app') {
                approvedDetails.statusid = 421
            }
            if (action === 'rej') {
                approvedDetails.statusid = 422
                approvedDetails.rejectreason = "rejectreason"
            }
            const approved = JSON.stringify(approvedDetails);
            debugger;
            axios.put(config.webApiUrl() + 'aptc_vehicle_approved', approved, {
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
                alert(vehname_regisno + msg);
                this.bindVehicles('pen');
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
        }
        //let vec = Object.assign({}, this.state.vec);
        //vec.statusid = parseInt(approvedDetails.statusid);
        //this.setState({ vec });
    }

    bindVehicles(obj) {
        debugger;
        const url = config.webApiUrl() + "aptc_vehicle/" + localStorage.getItem('selectedLanguageCode');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ mode : ''})
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    var tempVehicleList = [];
                    $.each(data, function (key, value) {
                        if (obj === 'pen' && value.statusid === 420) {
                            tempVehicleList.push(value)
                        }
                        if (obj === 'app' && value.statusid === 421) {
                            tempVehicleList.push(value)
                        }
                        if (obj === 'rej' && value.statusid === 422) {
                            tempVehicleList.push(value)
                        }
                    })
                    this.setState({ vecList: tempVehicleList, loading: false });
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
    };

    replaceModalItem = (index, action) => {
            this.setState({ isEditOpen: true, isAddOpen: true });
            this.toggleHide();
        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.setState({ requiredItem: indx });
            vec = this.state.vecList[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.vecList[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
        }
    };

    toggleHide = () => {
        if (this.state.isDesktop) {
            var showing = this.state.showing;
            this.setState({ showing: false });
        }

    }
    
    isLoding() {
        this.setState({ loading: true });
    }

    saveModalDetails = (id, mode) => {
        this.bindVehicles(mode);
    };

    deleteItem = (index) => {
        var _id;
        //console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecList[index];
        }

        _id = valueObject.chassisnumber;
        var makeVeh = valueObject.make;
        var modelVeh = valueObject.model;
        var vehReg = valueObject.trafficfilenumber;

        //console.log(_id);
        if (!window.confirm("Do you want to delete vehicle : " + makeVeh + " " + modelVeh + " " + vehReg))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);
        }
    };

    deleteInnerItem(index) {
        var _id;
        //console.log(this.state.vec);
        var valueObject = this.state.vec;

        _id = "vehicle_" + valueObject.chassisnumber;
        var makeVeh = valueObject.make;
        var modelVeh = valueObject.model;
        var vehReg = valueObject.trafficfilenumber;

        if (!window.confirm("Do you want to delete vehicle : " + makeVeh + " " + modelVeh + " " + vehReg))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);

        }
    }

    fullDelete(chassisnumber, index) {
        var id = chassisnumber;
        var _id = id;

        fetch(config.webApiUrl() + '/aptc_vehicle/' + _id, { method: 'delete' })
            .then(response => response.json())
            .then(data => {
                const requiredItem = this.state.requiredItem;
                let tempbrochure = this.state.vecList;
                tempbrochure.splice(requiredItem, 1);
                this.setState({ vecList: tempbrochure });
                this.setState({ currentDrivers: tempbrochure });
                this.setState({ vec: tempbrochure[requiredItem] });
                this.setState({ loading: false });
            }).catch((error) => {
                alert("axios error:", error.response.data.ResponseMessage);
                this.setState({ loading: false });
            });
    }

    handleClick = (index) => {
        debugger;
        this.setState({ vec: index });
        //console.log(index);
    };

    callEdit = (e) => {
        e.preventDefault();

        $('#call').click();
    };

    onChange = (e) => {
        this.setState({
            [e.target.nameen]: e.target.value
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

    editItem = (vehicleid) => {
        this.setState({ vehicleid: vehicleid, mode: 'edit', isEditOpen: true });
    }

    render() {

        //console.log("ago" + this.state.chassisnumber);

        //if (!this.state.redirectCompany) {
        //    return <Redirect push to={{ pathname: '/company' }} />;
        //}

        const isDesktop = this.state.isDesktop;

        const { vecList, currentDrivers, currentPage, totalPages, loading } = this.state;
        const totalDrivers = vecList.length;
        let contents = "";
        if (totalDrivers === 0 && loading === false) {
            contents = (
                <div>
                    <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                        ? "fixed-search"
                        : "arab-fixed-search"}>
                        <div className="">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                ? "col-md-12 col-lg-12 col-sm-12 col-xs-12"
                                : "col-md-12 col-lg-12 col-sm-12 col-xs-12 rtl-flip"}>
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height-empty">
                                        <div className="panel panel-body">
                                            
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>
                    </div>
                  </div>
            );
        }

        else {
            contents = "";
            //debugger;
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                filteredVehicles = this.state.currentDrivers.filter((vec) => {
                    if (vec.make === null || vec.transmissiontype === null || vec.fuelType === null) {
                        return (
                            "No Car Model"
                        );
                    }
                    else {
                        return (vec.platenumber.toLowerCase().indexOf(this.state.search) !== -1 || vec.platenumber.toUpperCase().indexOf(this.state.search) !== -1);
                    }

                });
            }
            const { showing, redirectCompany } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];

            contents = this.state.loading
                ? (<p>
                    <Loader />
                </p>)
                : (
                    <div>
                        <div className="col-lg-12">
                            <div>
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
                                                                placeholder="Search Vehicle..."
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
                                                                   
                                                                    <th scope="col">Basic Info</th>
                                                                    <th scope="col">Vehicle Owner</th>
                                                                    <th scope="col">Vehicle Owner Type</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Registration No.</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>TransmissionType</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Vehicle Type</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredVehicles.map((vec, index) => (<tr className="panel-bubble-new" key={index}>
                                                                    <td
                                                                        scope="row" >
                                                                        <i id="" className="fas fa-car icon-exclamation-circle-gold-small" />
                                                                        &nbsp;{vec.make} - {vec.model}&nbsp;&nbsp; {vec.yearmanufacture}
                                                                    </td>
                                                                    <td
                                                                        scope="row" className={this.state.showing ? null : "hidden-column"}>
                                                                        &nbsp;{vec.ownershipname}
                                                                    </td>
                                                                    <td
                                                                        scope="row" className={this.state.showing ? null : "hidden-column"}>
                                                                        &nbsp;{vec.ownershiptypename}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}>
                                                                        {vec.enginenumber}
                                                                    </td>

                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"} >
                                                                        {vec.transmissiontype}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"} >
                                                                        {vec.vehicletype}
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
                                                                    {/*
                                                                    <td scope="row" className="more-item">
                                                                        <div className="dropdown">
                                                                            <button id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                                                                type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                                            </button>



                                                                            {isDesktop ? (
                                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                                    <li
                                                                                        data-toggle="modal"
                                                                                        data-target="#editVehicle"
                                                                                        onClick={() => this.editItem(vec.vehicleid)}
                                                                                        className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            >Edit</button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            className={!this.state.show
                                                                                                ? ""
                                                                                                : this.state.show}
                                                                                            onClick={() => this.deleteItem(index)}>Delete</button>
                                                                                    </li>
                                                                                </ul>) : (
                                                                                    <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                                        <li
                                                                                            data-toggle="modal"
                                                                                            data-target="#editVehicle"
                                                                                            onClick={() => this.editItem(vec.vehicleid)}
                                                                                            className="dropdown-spacing table-dropdown-small-width">
                                                                                            <button
                                                                                               >Edit</button>
                                                                                        </li>
                                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                                            <button
                                                                                                className={!this.state.show
                                                                                                    ? ""
                                                                                                    : this.state.show}
                                                                                                onClick={() => this.deleteItem(index)}>Delete</button>
                                                                                        </li>
                                                                                    </ul>
                                                                                )}
                                                                        </div>
                                                                    </td> */}
                                                                </tr>))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="movein">
                                                <div>
                                                    <h4>
                                                        <strong >{totalDrivers}</strong>{" "}
                                                        Vehicle entries
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

                                    {/*
                                    {this.state.vec.chassisnumber !== undefined && !this.state.showing ?
                                        <div>

                                            <div className={this.state.showing
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

                                                            <span className='pics'>
                                                                <i id="" className="fas fa-car icon-exclamation-circle-gold-admin" />
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


                                                                <p>
                                                                    <span className="title-side-detail-panel">{this.state.vec.trafficfilenumber} - {this.state.vec.make} {this.state.vec.model}&nbsp; {this.state.vec.yearManufacture} </span>
                                                                    <span className="btn-group" style={{ marginBottom: '15px', marginLeft: '5px' }}>
                                                                        <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                        <button className={this.state.vec.statusid == (420).toString() ? "btn btn-active status dropdown-toggle status-title" : ([this.state.vec.statusid == (422).toString() ? "btn btn-status-rejected dropdown-toggle status status-title-rejected" : "btn btn-status-approved dropdown-toggle status status-title-approved"])} data-toggle="dropdown">
                                                                            {this.state.vec.statusid == (420).toString() ? "Pending" : ([this.state.vec.statusid == (422).toString() ? "Rejected" : "Approved"])}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                        <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                            <li className="dropdown-spacing" onClick={this.pending.bind(this)}>Pending</li>
                                                                            <li className="dropdown-spacing" onClick={this.approve.bind(this)}>Approved</li>
                                                                            <li className="dropdown-spacing" onClick={this.reject.bind(this)}>Rejected</li>
                                                                        </ul>
                                                                    </span>
                                                                </p>

                                                            </div>


                                                            <div className="row">
                                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                                    <p>Plate Number: {this.state.vec.trafficfilenumber}</p>
                                                                    <p>Fuel Type: {!this.state.vec.fuelType
                                                                        ? "Info Not Available"
                                                                        : this.state.vec.fuelType}</p>
                                                                    <p>Passenger Capacity: {!this.state.vec.seatingcapacity
                                                                        ? 3
                                                                        : this.state.vec.seatingcapacity}
                                                                        &nbsp; passengers</p>

                                                                    <p>Transmission: {this.state.vec.transmissiontype}</p>
                                                                    <p>Colour: {this.state.vec.colour}</p>
                                                                    <br />

                                                                    <p>Vehicle registrar: {this.state.vec.ownershipname}</p>
                                                                    <div>
                                                                        <img
                                                                            id="icon-pics"
                                                                            src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'

                                                                            onError={(e) => {
                                                                                e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png';
                                                                            }}
                                                                            className="img-circle"
                                                                            alt="woman"
                                                                            height="52"
                                                                            width="52" data-toggle="tooltip" data-placement="bottom" title={this.state.vec.ownershipname === null ? "No Registar required for this permit" : this.state.vec.ownershipname}
                                                                        />

                                                                    </div>

                                                                </div>
                                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                                    <p>Vehicle Type: {this.state.vec.vehicletype}</p>
                                                                    <p>Year: {this.state.vec.yearmanufacture}</p>
                                                                    <p>Engine Number: {this.state.vec.enginenumber}</p>
                                                                    <p>Vehicle Valid: {this.state.vec.vehValid}</p>
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div>

                                                                <button
                                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                                    data-toggle="modal"
                                                                    data-target="#editVehicle"
                                                                    onClick={() => this.editItem(this.state.vec.vehicleid)}>
                                                                    <i className="glyphicon glyphicon-edit" />
                                                                    &nbsp; Edit Details
                                                        </button>
                                                                <button
                                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                                    onClick={this
                                                                        .deleteInnerItem
                                                                        .bind(this)}>
                                                                    <i className="fa fa-trash" />&nbsp; Delete Vehicle</button>
                                                            </div>
                                                        </div>
                                                    </div></Animated>
                                            </div>
                                        </div> 
                                        : null} */} 
                                </Animated>
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
export default VehicleApproval;
