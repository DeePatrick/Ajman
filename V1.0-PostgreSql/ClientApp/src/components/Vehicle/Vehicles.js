import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddVehicle from './AddVehicle';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import EditVehicle from './EditVehicle';
import Loader from '../loader';
import * as config from '../../config';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Vehicles extends Component {
    displayName = Vehicles.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,
            vehicleid: 0,
            requiredItem: 0,
            cRNum: '',
            fullName: '',
            pageLimit: 0,
            vecList: [],
            currentDrivers: [],
            loading: false,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: false,
            isAddOpe: false,
            isCompanyApproved: false,
            approvedcomplist: [],
            mode: ''
        };

        this.updatePredicate = this
            .updatePredicate
            .bind(this);
        this.addClick = this
            .addClick
            .bind(this);
        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.refreshVehicle = this
            .refreshVehicle
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
        this.bindVehicle();

    }

    componentDidMount() {

        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillMount() {
        window.removeEventListener("resize", this.updatePredicate);
        var compList = [];
        this.setState({ loading: true, isAddOpen: true, showing: false, pageLimit: 10 });

        fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                $.each(data, function (key, value) {
                    if (value.statusid === 421) {
                        compList.push(value);
                    }

                })
                this.setState({ approvedcomplist: compList });
            });

    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('vehicle', JSON.stringify(nextState.vecList));
        localStorage.setItem('vehicleEntryDate', Date.now());
    }

    updatePredicate() {
        this.setState({
            isDesktop: window.innerWidth > 991
        });
    }

    toggleHide = () => {

        if (this.state.isDesktop) {
            this.setState({ showing: false });
        }

    }

    bindVehicle(mode, vehicle) {
        this.setState({ isAddOpen: true });
        fetch(config.webApiUrl() + "aptc_individual_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
                this.setState({ currentDrivers: data });
                if (mode === 'edit') {
                    var tempvec = [];
                    $.each(data, function (key, value) {
                        if (value.vehicleid === vehicle) {
                            tempvec = data[key];
                        }
                    })
                    this.setState({ vec: tempvec });
                }
                else {
                    this.setState({ vec: data[0] });
                }
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
    }
    setValue() {
        const requiredItem = this.state.requiredItem;
        this.setState({ vec: this.state.vecList[requiredItem] });
    }
    addClick = (e) => {
        this.setState({ isAddOpen: true, mode: 'add' });
    };
    onPageChanged = data => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecList.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentDrivers, totalPages });
    };
    replaceModalItem = (index, action) => {
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }
        this.setState({ mode: '' });
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
    refreshVehicle = (vehicleid, mode) => {
        this.setState({ mode: '' });
        this.bindVehicle(mode, vehicleid);

    };
    editItem = (vehicleid) => {
        this.setState({ vehicleid: vehicleid, mode: 'edit' });
        this.setState({ isEditOpen: true, vehicleid: vehicleid });
    }
    deleteItem = (_id) => {
        if (!window.confirm("Do you want to delete this vehicle ?")) {
            this.setState({ loading: false });
            return;
        }
        else {
            this.setState({ loading: true });
            fetch(config.webApiUrl() + 'aptc_vehicle/' + _id, { method: 'delete' })
                .then(response => response.json())
                .then(data => {
                    this.bindVehicle('', '');
                    this.setValue();
                }).catch((error) => {
                    alert("axios error:", error.response.data.ResponseMessage);
                    this.setState({ loading: false });
                });
        }
    };
    handleClick = (index) => {
        this.setState({ vec: index });
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
        const isDesktop = this.state.isDesktop;
        const { vecList, currentDrivers, currentPage, totalPages } = this.state;
        let contents = "";
        const totalDrivers = vecList.length;

        if (totalDrivers === 0) {
            contents = (
                <div className="row">

                    {this.state.loading === false &&
                        < div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                {
                                    this.state.approvedcomplist.length > 0 &&
                                    <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                        <div
                                            className="panel-title black-button-admin center"
                                            data-toggle="modal"
                                            data-target="#addVehicle"
                                            onClick={this
                                                .addClick
                                                .bind(this)}>
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin" style={{ marginLeft: '6px' }}>{this.props.t('Add_Vehicle')}</span>
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
                                    this.state.approvedcomplist.length > 0 && vecList.length === 0 &&
                                    < div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                        <p style={{ marginTop: '20px', fontSize: '20px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                    </div>
                                }
                            </Animated>
                            {this.state.isAddOpen === true && this.state.approvedcomplist.length > 0 &&
                                <AddVehicle mode={this.state.mode} refreshVehicle={this.refreshVehicle} />}
                        </div>}
                </div >)
        }
        else {
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    currentDrivers === null || currentDrivers === [] ? "No Value" :
                        filteredVehicles = this
                            .state
                            .currentDrivers
                            .filter((vec) => {
                                return (
                                    vec.make.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.yearmanufacture.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownershipname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownershiptypename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.trafficfilenumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.transmissiontype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.vehicletype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                                );
                            });
                }
            }
            const { showing } = this.state;

            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];
            contents = (
                <div>
                    {this.state.isAddOpen === true && this.state.approvedcomplist.length > 0 && <div>
                        <AddVehicle mode={this.state.mode} refreshVehicle={this.refreshVehicle} /></div>
                    }

                    {/*Row 1 - Start - Image(logo)/Title/Button*/}
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-sm-12 col-xs-12">
                            <div className="row align-items-center nil-margin">
                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                    <span>
                                        <i className="fa fa-car icon-title-small"></i>
                                    </span>
                                </div>
                                <div className="col-md-6 col-lg-7 col-sm-5 col-xs-5 title-top-padding">
                                    <strong className="font-custom-standard-gold">REGISTERED VEHICLES</strong>
                                </div>
                                <div className="col-md-5 col-lg-4 col-sm-6 col-xs-6">
                                    <button type="button" className="btn btn-standard-gold right" data-toggle="modal" data-target="#addVehicle" onClick={this.addClick.bind(this)}>
                                        <span>{this.props.t('Add_Vehicle')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
                        </div>

                    </div>
                    {/*Row 1 - End - Image(logo)/Title/Button*/}

                    <EditVehicle mode={this.state.mode} vehicleid={this.state.vehicleid} refreshVehicle={this.refreshVehicle} />

                    {/*Row 2 - START - CONTENT CONTAINER*/}
                    {!showing
                        ? <div className="row">
                            {/*Left Panel - START - Informational List Display*/}
                            {isDesktop ? (
                                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                        <div className="panel panel-default main-body-height-admin">
                                            <div className="panel panel-body">

                                                <div className="list-container-left-panel">

                                                    <div className="container-fluid movetop">
                                                        {filteredVehicles.map((vec, index) =>
                                                            <div className="row list-row-styling align-items-center" key={index} onClick={() => this.replaceModalItem(index, '')} >
                                                                <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1 nil-padding">
                                                                    <i className="fa fa-car icon-custom-standard-grey"></i>
                                                                </div>
                                                                <div className="col-md-9 col-lg-9 col-sm-10 col-xs-10 nil-padding">
                                                                    <span className="font-custom-standard-grey">{vec.trafficfilenumber} - {vec.make} {vec.model} [{vec.yearmanufacture}]
                                                                        </span>
                                                                </div>
                                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                                    <span className="pull-right">
                                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
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
                                                            {this.props.t('Vehicle_entries')}
                                                        </h4>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Animated>
                                </div>

                            ) : null}

                            {!isDesktop ? (
                                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                        <div className="panel panel-default main-body-height-admin">
                                            <div className="panel panel-body">

                                                <div className="list-container-left-panel">

                                                    <div className="container-fluid movetop">
                                                        {filteredVehicles.map((vec, index) =>
                                                            <div className="row list-row-styling align-items-center" data-toggle="modal" data-target="#basicModal" key={index} onClick={() => this.replaceModalItem(index, '')} >
                                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-2 nil-padding">
                                                                    <i className="fa fa-car icon-custom-standard-grey"></i>
                                                                </div>
                                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-9 nil-padding">
                                                                    <span className="font-custom-standard-grey" >{vec.trafficfilenumber} - {vec.make} {vec.model} [{vec.yearmanufacture}]
                                                                        </span>
                                                                </div>
                                                                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1 nil-padding">
                                                                    <span className="pull-right">
                                                                        <i className="fa fa-arrow-right icon-custom-standard-gold"></i>
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
                                                            {this.props.t('Vehicle_entries')}
                                                        </h4>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Animated>
                                </div>

                            ) : null}

                            {/*Left Panel - END - Informational List Display*/}


                            {/*Right Panel - Start - Informational Panel Display*/}

                            {isDesktop ? (
                                <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 left-border">
                                    <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                                        <div className="panel panel-default main-body-height-admin">
                                            {this.state.vec.vehicleid !== undefined && <div className="panel panel-body">

                                                <div className="page-container-right-panel">

                                                    <div className="row nil-margin align-items-center">

                                                        <div className='col-lg-1 col-md-1 col-sm-1 col-xs-2'>
                                                            <span className='content-icon'>
                                                                <i className="fa fa-car"></i>
                                                            </span>
                                                        </div>

                                                        <div className='col-lg-9 col-md-9 col-sm-9 col-xs-7 modal-item-title'>
                                                            <span className="title-side-detail-panel">{this.state.vec.trafficfilenumber} - {this.state.vec.make} {this.state.vec.model} [{this.state.vec.yearmanufacture}]</span>
                                                        </div>

                                                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                                                            {this.state.vec.status === "Pending" &&
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
                                                            {this.state.vec.status === "Approved" &&
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
                                                            {this.state.vec.status === "Rejected" &&
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
                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <p><strong>{this.props.t('Plate_Number')}</strong> {this.state.vec.trafficfilenumber}</p>
                                                            <p><strong>{this.props.t('Franchisee')}</strong> {this.state.vec.transmissiontype}</p>
                                                            <p><strong>{this.props.t('Engine_Number')}</strong> {this.state.vec.enginenumber}</p>
                                                        </div>
                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <p><strong>{this.props.t('VIN')}</strong> {this.state.vec.chassisnumber}</p>
                                                            <p><strong>{this.props.t('Passenger_Capacity')}</strong> {!this.state.vec.seatingcapacity
                                                                ? 3
                                                                : this.state.vec.seatingcapacity}
                                                                &nbsp; {this.props.t('Passengers')}</p>
                                                            <p><strong>{this.props.t('Fuel_Type')}</strong> {!this.state.vec.fuelType
                                                                ? "Info Not Available"
                                                                : this.state.vec.fuelType}</p>
                                                            <p><strong> {this.props.t('Vehicle_Type')}</strong>{this.state.vec.vehicletype}</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="page-container-footer-right-panel">

                                                    <button type="button" className="btn btn-standard-gold container-button-content" data-toggle="modal" data-target="#editVehicle" onClick={() => this.editItem(this.state.vec.vehicleid)}>
                                                        <i className="glyphicon glyphicon-edit"></i> {this.props.t('Edit')}
                                                    </button>

                                                    <button type="button" className="btn btn-standard-gold container-button-content" onClick={() => this.deleteItem(this.state.vec.vehicleid)}>
                                                        <i className="fa fa-trash"></i> {this.props.t('Delete')}
                                                    </button>

                                                </div>
                                            </div>
                                            }
                                            {this.state.vec.vehicleid === undefined && <span>
                                                <h5 className="text-center text-vertical"><br /><br /><br />
                                                    <i id="icon-truck-gold-no-circle" className="fa fa-car"></i><br /><br />
                                                    {this.props.t('Click_Vehicle_Group_button_to_show_this_panel')}</h5>
                                            </span>
                                            }

                                        </div>

                                    </Animated>

                                </div>
                            ) : null}


                            {!isDesktop ? (
                                <div className="modal fade" id="basicModal" tabIndex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close mobile-close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <span className="modal-title" id="myModalLabel"></span>
                                            </div>
                                            <div className="modal-body">

                                                <div className="container-fluid inner-modal-info">

                                                    {this.state.vec.vehicleid !== undefined && <div className="panel panel-body">

                                                        <div className="page-container-right-panel">

                                                            <div className="row nil-margin align-items-center">

                                                                <div className='col-lg-1 col-md-1 col-sm-2 col-xs-12'>
                                                                    <span className='content-icon'>
                                                                        <i className="fa fa-car"></i>
                                                                    </span>
                                                                </div>

                                                                <div className='col-lg-9 col-md-9 col-sm-7 col-xs-12 modal-item-title'>
                                                                    <span className="title-side-detail-panel">{this.state.vec.trafficfilenumber} - {this.state.vec.make} {this.state.vec.model} [{this.state.vec.yearmanufacture}]</span>
                                                                </div>

                                                                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 status-label-wrapper">
                                                                    {this.state.vec.status === "Pending" &&
                                                                        <div className="dropdown dropleft status-label right">
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
                                                                    {this.state.vec.status === "Approved" &&
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
                                                                    {this.state.vec.status === "Rejected" &&
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
                                                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                                                    <p><strong>{this.props.t('Plate_Number')}</strong> {this.state.vec.trafficfilenumber}</p>
                                                                    <p><strong>{this.props.t('Franchisee')}</strong> {this.state.vec.transmissiontype}</p>
                                                                    <p><strong>{this.props.t('Engine_Number')}</strong> {this.state.vec.enginenumber}</p>
                                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6'>
                                                                    <p><strong>{this.props.t('VIN')}</strong> {this.state.vec.chassisnumber}</p>
                                                                    <p><strong>{this.props.t('Passenger_Capacity')}</strong> {!this.state.vec.seatingcapacity
                                                                        ? 3
                                                                        : this.state.vec.seatingcapacity}
                                                                        &nbsp; {this.props.t('Passengers')}</p>
                                                                    <p><strong>{this.props.t('Fuel_Type')}</strong> {!this.state.vec.fuelType
                                                                        ? "Info Not Available"
                                                                        : this.state.vec.fuelType}</p>
                                                                    <p><strong> {this.props.t('Vehicle_Type')}</strong>{this.state.vec.vehicletype}</p>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="page-container-footer-right-panel">

                                                            <button type="button" className="btn btn-standard-gold container-button-content" data-toggle="modal" data-target="#editVehicle" onClick={() => this.editItem(this.state.vec.vehicleid)}>
                                                                <i className="glyphicon glyphicon-edit"></i> {this.props.t('Edit')}
                                                            </button>

                                                            <button type="button" className="btn btn-standard-gold container-button-content" onClick={() => this.deleteItem(this.state.vec.vehicleid)}>
                                                                <i className="fa fa-trash"></i> {this.props.t('Delete')}
                                                            </button>

                                                        </div>
                                                    </div>
                                                    }
                                                    {this.state.vec.vehicleid === undefined && <span>
                                                        <h5 className="text-center text-vertical"><br /><br /><br />
                                                            <i id="icon-truck-gold-no-circle" className="fa fa-car"></i><br /><br />
                                                            {this.props.t('Click_Vehicle_Group_button_to_show_this_panel')}</h5>
                                                    </span>
                                                    }
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/*Right Panel - END - Informational Panel Display*/}

                        </div>
                        : null}
                    {/*Row 2 - END - CONTENT CONTAINER*/}
                </div>)
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
export default translate(Vehicles);