import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddVehicle from './AddVehicle';
import axios from 'axios';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import EditVehicle from './EditVehicle';
import * as config from '../../config';
import Loader from '../loader';

class Vehicles extends Component {
    displayName = Vehicles.name

    constructor(props) {
        super(props);
        this.state = {
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
            offset: 0,
            vec: [],
            status: 'PE',
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            companyPhoto: '',
            crnumber: '',
            name: {
                ar_SA: "جون الحجارة",
                en_US: ""
            },
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

        this.handleClick = this
            .handleClick
            .bind(this);
        this.isLoding = this
            .isLoding
            .bind(this);

    }

    componentDidMount() {
        this.bindVehicles();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            crnumber: nextProps.crnumber,
            vehicles: nextProps.vehicles,
            name: nextProps.name,
            companyPhoto: nextProps.companyPhoto
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }


    bindVehicles() {
        var _id = this.props.location.state.vec.individualid;

        console.log(_id);
        const url = config.webApiUrl() + "aptc_individual_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    this.setState({ vecList: data, loading: false, companyid: _id });
                }
            });

        console.log(this.state.vecList);
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
        if (action === 'edit') {
            this.setState({ isEditOpen: true });
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
            this.setState({ showing: false });
        }
    }


    isLoding() {
        this.setState({ loading: true });
    }


    saveModalDetails = (vec, action) => {
        if (action === 'update') {
            const requiredItem = this.state.requiredItem;
            let tempbrochure = this.state.vecList;
            tempbrochure[requiredItem] = vec;
            this.setState({ vecList: tempbrochure });
            this.setState({ currentDrivers: tempbrochure });
            this.setState({ vec: vec });
        }
        if (action === 'add') {
            let tempbrochure = this.state.vecList;
            tempbrochure.push(vec);
            this.setState({ vecList: tempbrochure });
            this.setState({ currentDrivers: tempbrochure });
        }
    };

    deleteItem = (index) => {
        var _id;
        console.log(this.state.vec);
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

        console.log(_id);
        if (!window.confirm("Do you want to delete vehicle : " + makeVeh + " " + modelVeh + " " + vehReg))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);
        }
    };

    deleteInnerItem(index) {
        var _id;
        console.log(this.state.vec);
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
        this.setState({ vec: index });
        console.log(index);
    };

    callEdit = (e) => {
        e.preventDefault();

        $('#call').click();
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

    approve = (index) => {

        console.log(this.state.vec);
        var valueObject = this.state.vec;



        var makeVeh = valueObject.make;
        var modelVeh = valueObject.model;
        var vehReg = valueObject.trafficfilenumber;
        var _id = valueObject.chassisnumber;

        console.log(_id);
        if (!window.confirm("Are you sure you want to approve " + makeVeh + " " + modelVeh + " " + vehReg))
            return;
        else {

            let status = 'AP';
            this.setState({ status: status });
            this.state.vec.status = 'AP';

            console.log(this.state);
            const user = JSON.stringify(this.state);
            console.log(user);
            axios.put(config.webApiUrl() + 'aptc_Approved_vehicle/' + _id, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ status: status, loading: false });
                    $('.close').click();
                }
            });

            this.setState({ status: status });
        }

    }

    reject = (index) => {
        console.log(this.state.vec);
        var valueObject = this.state.vec;



        var makeVeh = valueObject.make;
        var modelVeh = valueObject.model;
        var vehReg = valueObject.trafficfilenumber;
        var _id = valueObject.chassisnumber;

        if (!window.confirm("Are you sure you want to reject " + makeVeh + " " + modelVeh + " " + vehReg + " ?"))
            return;
        else {
            let comStatus = Object.assign({}, this.state.comStatus);
            comStatus.statusID = 'Rejected';
            this.setState({ comStatus: comStatus });
            console.log("rejected");

        }

    }


    pending = (index) => {
        console.log(this.state.vec);
        var valueObject = this.state.vec;



        var makeVeh = valueObject.make;
        var modelVeh = valueObject.model;
        var vehReg = valueObject.trafficfilenumber;
        var _id = valueObject.chassisnumber;

        if (!window.confirm("Are you sure you want to keep " + makeVeh + " " + modelVeh + " " + vehReg + " as pending?"))
            return;
        else {
            let comStatus = Object.assign({}, this.state.comStatus);
            comStatus.statusID = 'Pending';
            this.setState({ comStatus: comStatus });
            console.log("pending");
        }

    }

    render() {

        console.log("ago" + this.state.chassisnumber);

        if (!this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/people' }} />;
        }


        const isDesktop = this.state.isDesktop;

        const { vecList, currentDrivers, currentPage, totalPages, loading, redirectCompany } = this.state;
        const totalDrivers = vecList.length;
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
                                    data-target="#vehAddModal">
                                    <i className="fa fa-plus fa-lg" />
                                    <span className="btn-text-admin">Add Vehicle</span>
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
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height">
                                        <div className="panel panel-body">
                                            <div className="company-header">
                                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                                <div className="pull-left company-title">
                                                    <span><img id="icon-pics"
                                                        src={!this.props.location.state.vec.companyPhoto
                                                            ? require('../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyPhoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-rounded"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.nameen}</strong></span>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-center text-vertical">
                                                    <i className="fas fa-car icon-truck-gold-no-circle" />
                                                    <p>No vehicles in this company. Click "Add Vechicle" button to add vehicle to this Company</p></h5>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>

                    </div>
                    <AddVehicle
                        crnumber={this.props.crnumber}
                        companyid={this.state.companyid}
                        saveModalDetails={this.saveModalDetails}
                    />
                </div>
            );
        }
        else {
            contents = "";
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                filteredVehicles = this
                    .state
                    .currentDrivers
                    .filter((vec) => {
                        if (vec.make === null || vec.transType === null || vec.fuelType === null) {
                            return (
                                "No Car Model"
                            );
                        }
                        else {
                            return (vec.make.toLowerCase().indexOf(this.state.search) !== -1 || vec.make.toUpperCase().indexOf(this.state.search) !== -1);
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
                        <div className="fixed-search">
                            <div className="col-md-2 col-lg-2 col-sm-5 col-xs-3">
                                <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div
                                        className="panel-title black-button-admin center"
                                        data-toggle="modal"
                                        data-target="#vehAddModal">
                                        <i className="fa fa-plus fa-lg" />
                                        <span className="btn-text-admin">Add Vehicle</span>
                                    </div>
                                </Animated>

                            </div>
                            <div className="col-md-10 col-lg-10 col-sm-7 col-xs-9 entity-search-input">
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
                        <AddVehicle
                            crnumber={this.props.crnumber}
                            individualid={this.props.individualid}
                            companyid={this.state.companyid}
                            saveModalDetails={this.saveModalDetails}
                        />
                        <EditVehicle
                            vehicleid={this.state.vehicleid}
                            companyid={this.state.companyid}
                            crnumber={this.props.crnumber}
                            individualid={this.props.individualid}
                            chassisnumber={modalData.chassisnumber}
                            enginenumber={modalData.enginenumber}
                            seatingcapacity={modalData.seatingcapacity}
                            trafficfilenumber={modalData.trafficfilenumber}
                            registrationdate={modalData.registrationdate}
                            yearmanufacture={modalData.yearmanufacture}
                            makeid={modalData.makeid}
                            make={modalData.make}
                            modelid={modalData.modelid}
                            model={modalData.model}
                            colourid={modalData.colourid}
                            colour={modalData.colour}

                            platecodeid={modalData.platecodeid}
                            platecode={modalData.platecode}
                            platenumber={modalData.platenumber}
                            platecategoryid={modalData.platecategoryid}
                            platecategory={modalData.platecategory}
                            platesourceid={modalData.platesourceid}
                            platesource={modalData.platesource}

                            fuelTypeid={modalData.fuelTypeid}
                            fuelType={modalData.fuelType}
                            transmissiontype={modalData.transmissiontype}
                            transmissiontypeid={modalData.transmissiontypeid}
                            vehValid={modalData.vehValid}
                            vehicletypeid={modalData.vehicletypeid}
                            vehicletype={modalData.vehicletype}
                            vehiclephoto={modalData.vehiclephoto}
                            statusid={modalData.statusid}

                            remarks={modalData.remarks}
                            ownershiptype={modalData.ownershiptype}
                            ownerID={modalData.ownerID}
                            ownershipname={modalData.ownershipname}
                            lessorname={modalData.lessorname}
                            disabledfriendly={modalData.disabledfriendly}
                            saveModalDetails={this.saveModalDetails} />






                        <div className="col-lg-12">
                            <div className={this.state.showing ? "entity-table" : "entity-table entity-table-padding"}>
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className={this.state.showing ? "panel panel-default" : "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left"}>
                                        <div className="panel panel-body">
                                            <div className="company-header">
                                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                                <div className="pull-left company-title">
                                                    <span><img id="icon-pics"
                                                        src={!this.props.location.state.vec.companyPhoto
                                                            ? require('../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyPhoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-rounded"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.nameen}</strong></span>
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
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Registration No.</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>TransmissionType</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Vehicle Type</th>
                                                                    <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredVehicles.map((vec, index) => (<tr className="panel-bubble-new" key={index}>
                                                                    <td scope="row">
                                                                        <label className="container-x">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmark" />
                                                                        </label>
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                        <i id="" className="fas fa-car icon-exclamation-circle-gold-small" />
                                                                        {vec.make} - {vec.model}&nbsp;&nbsp; {vec.yearmanufacture}
                                                                    </td>

                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                        {vec.enginenumber}
                                                                    </td>

                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                        {vec.transmissiontype}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                        {vec.vehicletype}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? "status-item" : "hidden-column"}>

                                                                        <span className="btn-group">
                                                                            <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                            <button className={vec.statusid == (420).toString() ? "btn btn-active status dropdown-toggle status-title" : ([vec.statusid == (422).toString() ? "btn btn-status-rejected dropdown-toggle status status-title-rejected" : "btn btn-status-approved dropdown-toggle status status-title-approved"])} data-toggle="dropdown" >
                                                                                {vec.statusid == (420).toString() ? "Pending" : ([vec.statusid == (422).toString() ? "Rejected" : "Approved"])}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                            <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                                <li className="dropdown-spacing" onClick={() => this.pendingOuter(index)}>Pending</li>
                                                                                <li className="dropdown-spacing" onClick={() => this.approveOuter(index)}>Approved</li>
                                                                                <li className="dropdown-spacing" onClick={() => this.rejectOuter(index)}>Rejected</li>
                                                                            </ul>
                                                                        </span>
                                                                    </td>

                                                                    <td scope="row" className={localStorage.getItem('selectedLanguageCode') == 1 ? "more-item" : "rtl-more-item"}>
                                                                        <div className="dropdown">
                                                                            <button id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                                                                type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                                            </button>



                                                                            {isDesktop ? (
                                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            id="call"
                                                                                            className={!this.state.show
                                                                                                ? ""
                                                                                                : this.state.show}
                                                                                            data-toggle="modal"
                                                                                            data-target="#vehEditModal"
                                                                                            onClick={() => this.replaceModalItem(index)}>Edit</button>
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
                                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                                            <button
                                                                                                id="call"
                                                                                                className={!this.state.show
                                                                                                    ? ""
                                                                                                    : this.state.show}
                                                                                                data-toggle="modal"
                                                                                                data-target="#vehEditModal"
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
                                                                                )}
                                                                        </div>
                                                                    </td>
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


                                    {this.state.vec.chassisnumber !== undefined && !this.state.showing ?
                                        <div>
                                            <div className={this.state.showing ? "panel panel-default main-body-height-admin" : "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default main-body-height-admin"}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                                <br />
                                                <div>
                                                    <div className='col-lg-3 col-md-4 col-sm-6 title-image pull-left'>

                                                        <span className='pics'>
                                                            <i id="" className="fas fa-car icon-exclamation-circle-gold-admin" />
                                                        </span>

                                                    </div>

                                                    <div
                                                        id="left-border-line-admin"
                                                        className="col-lg-9 col-md-8 col-sm-6 left-margin pull-right">
                                                        <div className="pull-right">
                                                            <i
                                                                id="cancel"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}
                                                                className="fas fa-times" />
                                                        </div>

                                                        <div>
                                                            <p>
                                                                <span className="title-side-detail-panel">{this.state.vec.trafficfilenumber} - {this.state.vec.make} {this.state.vec.model}&nbsp; {this.state.vec.yearManufacture} </span>
                                                                <span className="btn-group" style={{ marginBottom: '15px', marginLeft: '5px' }}>
                                                                    <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                    <button className={this.state.vec.status == 'PE' ? "btn btn-active status dropdown-toggle status-title" : "btn btn-status-approved dropdown-toggle status status-title-approved"} data-toggle="dropdown">{this.state.vec.status == 'PE' ? "Pending" : "Approved"}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                    <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                        <li className="dropdown-spacing" onClick={this.pending.bind(this)}>Pending</li>
                                                                        <li className="dropdown-spacing" onClick={this.approve.bind(this)}>Approved</li>
                                                                        <li className="dropdown-spacing" onClick={this.reject.bind(this)}>Rejected</li>
                                                                    </ul>
                                                                </span>
                                                            </p>

                                                        </div>


                                                        <br />
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6">
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
                                                            <div className="col-md-6 col-lg-6">
                                                                <p>Vehicle Type: {this.state.vec.vehicletype}</p>
                                                                <p>Year: {this.state.vec.yearmanufacture}</p>
                                                                <p>Engine Number: {this.state.vec.enginenumber}</p>
                                                                <p>Vehicle Valid: {this.state.vec.vehValid === false ? "Vehicle not Valid" : "Validated"}</p>
                                                            </div>
                                                        </div>
                                                        <br /><br />
                                                        <div className="colour">
                                                            <button
                                                                className="black-margin action"
                                                                data-toggle="modal"
                                                                data-target="#vehEditModal"
                                                                onClick={() => this.replaceModalItem(this.state.requiredItem, 'edit')}>
                                                                <i className="glyphicon glyphicon-edit" />
                                                                &nbsp; Edit Details
                                                        </button>
                                                            <button
                                                                className="black-margin action"
                                                                onClick={this
                                                                    .deleteInnerItem
                                                                    .bind(this)}>
                                                                <i className="fa fa-trash" />&nbsp; Delete Vehicle</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Animated>
                                            </div>
                                        </div>
                                        : null}
                                </Animated>
                            </div>
                        </div>
                    </div>);
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


export default Vehicles;
