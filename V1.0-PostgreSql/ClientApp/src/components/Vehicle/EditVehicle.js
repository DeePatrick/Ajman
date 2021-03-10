import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Loader from '../loader';
import * as config from '../../config';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class EditVehicle extends Component {
    displayName = EditVehicle.name

    constructor(props) {
        super(props);

        this.state = {
            vehicleid: 0,
            languageid: 0,
            platesourceid: 0,
            platecategoryid: 0,
            platecodeid: 0,
            platenumber: '',
            makeid: 0,
            modelid: 0,
            ownershiptypeid: 0,
            ownershiptype: '',
            ownerid: 0,
            transmissiontypeid: 0,
            colourid: 0,
            fueltypeid: 0,
            vehicletypeid: 0,
            leaseename: '',
            seatingcapacity: '',
            registrationdate: '',
            yearmanufacture: '',
            trafficfilenumber: '',
            chassisnumber: '',
            enginenumber: '',
            remarks: '',
            modifyby: 0,
            ownershipname: '',
            ownershiplists: [],
            ownershiptypelist: [],
            companyList: [],
            makelists: [],
            modellist: [],
            platelists: [],
            platecategorylist: [],
            platecodelist: [],
            transmissionlist: [],
            fueltypelist: [],
            vehiclecolourlist: [],
            vehtypelist: [],
            vehseatlist: [],
            yearmanufacturelist: [],
            isLeasor: false,
            isComp: false,
            isIndiv: false,
            loading: false,
            vehValid: true,
            disabledfriendly: false
        };
        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    componentWillReceiveProps(nextProps) {
                if (nextProps.mode === 'edit') {
            this.setState({ loading: true });
            this.setState({ modifyby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.bindDroDown(localStorage.getItem('selectedLanguageCode'));
            this.bindVehicle(nextProps.vehicleid);
        }
    }
    bindDroDown(languageid) {
        fetch(config.webApiUrl() + "aptc_getPlateSource/" + languageid)
            .then(response => response.json())
            .then(data => {
                this.setState({ platelists: data });
            }).catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }

            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/19")
            .then(response => response.json())
            .then(data => {
                this.setState({ makelists: data });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/13")
            .then(response => response.json())
            .then(data => {
                this.setState({ ownershiptypelist: data });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/17")
            .then(response => response.json())
            .then(data => {
                this.setState({ transmissionlist: data });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/18")
            .then(response => response.json())
            .then(data => {
                this.setState({ vehiclecolourlist: data });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/9")
            .then(response => response.json())
            .then(data => {
                this.setState({ fueltypelist: data });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + languageid + "/20")
            .then(response => response.json())
            .then(data => {
                this.setState({ vehtypelist: data });
            });
        fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ ownershiplists: data });
            });
        var vehseatlist = [];
        var yearmanufacturelist = [];

        for (var i = 1; i < 7; i++) {
            var vehseat = {};
            vehseat.commonmasterid = i;
            vehseat.number = i + 1;
            vehseatlist.push(vehseat);
        }
        for (var x = 0; x < 4; x++) {
            var yearmanufacture = {};
            if (x === 0) {
                yearmanufacture.commonmasterid = i;
                yearmanufacture.year = "2000-2005";
                yearmanufacturelist.push(yearmanufacture);
            }
            if (x === 1) {
                yearmanufacture.commonmasterid = 2;
                yearmanufacture.year = "2005-2010";
                yearmanufacturelist.push(yearmanufacture);
            }
            if (x === 3) {
                yearmanufacture.commonmasterid = 3;
                yearmanufacture.year = "2010-2015";
                yearmanufacturelist.push(yearmanufacture);
            }
            if (x === 3) {
                yearmanufacture.commonmasterid = 4;
                yearmanufacture.year = "2015-2020";
                yearmanufacturelist.push(yearmanufacture);
            }

        }
        this.setState({ vehseatlist: vehseatlist });
        this.setState({ yearmanufacturelist: yearmanufacturelist });
    }
    bindVehicle(vehicleid) {
        fetch(config.webApiUrl() + "aptc_vehicle_edit/" + vehicleid)
            .then(response => response.json())
            .then(data => {
                this.fillVehicle(data);
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error.response);
            });
    }
    fillVehicle(vehicle) {
        var ownerType = '';
        if (vehicle.ownershiptypeid === 124) {
            ownerType = 'IND';
        }
        if (vehicle.ownershiptypeid === 125) {
            ownerType = 'COMP';
        }
        if (vehicle.ownershiptypeid === 126) {
            ownerType = 'RENT';
        }
        fetch(config.webApiUrl() + "aptc_getPlateSourceCategory/" + this.state.languageid + "/" + vehicle.platesourceid)
            .then(response => response.json())
            .then(data => {
                this.setState({ platecategorylist: data });
                this.setState({ platecategoryid: vehicle.platecategoryid });
                fetch(config.webApiUrl() + "aptc_getPlateCategoryCode/" + this.state.languageid + "/" + vehicle.platecategoryid)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ platecodelist: data });
                        fetch(config.webApiUrl() + "aptc_getVehicleMakeModel/" + this.state.languageid + "/" + vehicle.makeid)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({ modellist: data });
                                this.setState({
                                    vehicleid: vehicle.vehicleid,
                                    languageid: vehicle.languageid,
                                    platesourceid: vehicle.platesourceid,
                                    platecategoryid: vehicle.platecategoryid,
                                    platecodeid: vehicle.platecodeid,
                                    makeid: vehicle.makeid,
                                    modelid: vehicle.modelid,
                                    ownershiptypeid: vehicle.ownershiptypeid,
                                    ownershiptype: vehicle.ownershiptype,
                                    ownerid: vehicle.ownerid,
                                    transmissiontypeid: vehicle.transmissiontypeid,
                                    colourid: vehicle.colourid,
                                    fueltypeid: vehicle.fueltypeid,
                                    vehicletypeid: vehicle.vehicletypeid,
                                    leaseename: vehicle.leaseename,
                                    seatingcapacity: vehicle.seatingcapacity,
                                    registrationdate: vehicle.registrationdate,
                                    yearmanufacture: vehicle.yearmanufacture,
                                    trafficfilenumber: vehicle.trafficfilenumber,
                                    chassisnumber: vehicle.chassisnumber,
                                    enginenumber: vehicle.enginenumber,
                                    remarks: vehicle.remarks,
                                    platenumber: vehicle.platenumber,
                                    ownershipname: vehicle.ownershipname,
                                    disabledfriendly: vehicle.disabledfriendly,
                                    loading: false
                                });

                            });
                    });
            });
        this.bindOwnership(ownerType);

    }
    cleareData() {
        this.setState({
            keyID: '',
            engineNum: "",
            numSeats: "",
            trafficNum: "",
            firstRegData: "",
            yearManufacture: "",
            plateSource: "",
            plateCategory: "",
            plateCode: "",
            plateNumber: "",
            cRNum: "",
            make: "",
            model: "",
            colour: "",
            vehType: "",
            fuelType: "",
            transType: "",
            isLeasor: false,
            vehValid: true,
            disabledFriendly: true
        });

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //vehicle plate cahnge
    handlePlateChange = (e) => {
        this.setState({ platesourceid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getPlateSourceCategory/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                if (data.length!==undefined) {
                    this.setState({ platecategorylist: data });
                }
            });

    }
    handlePlateCategoryChange = (e) => {
        this.setState({ platecategoryid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getPlateCategoryCode/" + localStorage.getItem('selectedLanguageCode')+ "/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ platecodelist: data });
            });
    }
    handlePlateCodeChange = (e) => {
        this.setState({ platecodeid: e.target.value });
    }
    /* ownership change*/
    ownershipTypeChange(e) {
        this.setState({ ownershiptypeid: e.target.value });
        var code = '';
        if (e.target.selectedIndex > 0) {
            code = this.state.ownershiptypelist[e.target.selectedIndex - 1].code;
        }
        if (code === "IND") {

            this.setState({ isLeasor: false, isComp: false, isIndiv: true });
        }
        else if (code === "COMP") {
            this.setState({ isLeasor: false, isComp: true, isIndiv: false });
        }
        else if (code === "RENT") {
            this.setState({ isLeasor: true, isComp: true, isIndiv: false });
        }
        this.bindOwnership(code);
    }
    onOwnerChange(e) {

        this.setState({ ownerid: e.target.value });
        if (e.target.selectedIndex > 0) {
            this.setState({ ownershipname: this.state.ownershiplists[e.target.selectedIndex - 1].nameen });
        }
    }
    toggleChange(e) {
        alert(this.state.disabledfriendly);
        if (this.state.disabledfriendly === false) {
            this.setState({ disabledfriendly: true });
        }
        else {
            this.setState({ disabledfriendly: false });
        }
    }
    bindOwnership(ownershipType) {
        var tempownershiplists = [];
        var owner = {};
        fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ ownershiplists: [] });
                if (ownershipType === "IND") {
                    owner.companyid = localStorage.getItem('individualid');
                    owner.nameen = localStorage.getItem('userName').toString();
                    owner.namear = "";
                    tempownershiplists.push(owner);
                    this.setState({ ownershiplists: tempownershiplists });
                }
                else {
                    tempownershiplists = data;
                    this.setState({ ownershiplists: tempownershiplists });
                }
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error.message);
            });
    }
    makeChange = (e) => {
        this.setState({ makeid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getVehicleMakeModel/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ modellist: data });
            });
    };
    // refresh after save data
    handleSave() {
        this.props.refreshVehicle(this.state.vehicleid, 'edit');
    }
    // save data in database
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var vehicle = JSON.stringify(this.state);
        axios
            .put(config.webApiUrl() + "aptc_vehicle", vehicle, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false });
                alert(res.data.ResponseMessage);
                this.handleSave();
                $('.close').click();
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response.data !== null) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.response);
                }

            });

    }
    render() {
        return (
            <div>
                <div
                    className="modal"
                    id="editVehicle"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="editVehicleLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {this.state.loading === true && <div>
                                <Loader />
                            </div>}
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="vehType">{this.props.t('Plate_Source')}</label>
                                            <select
                                                data-val="true"
                                                value={this.state.platesourceid}
                                                onChange={(e) => this.handlePlateChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">{this.props.t('Plate_Source')}</option>
                                                {this
                                                    .state
                                                    .platelists
                                                    .map((plate, index) => <option key={index} value={plate.platesourceid}>{plate.platesourcename}</option>)}
                                            </select> <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="vehType">{this.props.t('Plate_Category')}</label>
                                            <select
                                                data-val="true"
                                                value={this.state.platecategoryid}
                                                onChange={(e) => this.handlePlateCategoryChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">{this.props.t('Plate_Category')}</option>
                                                {this
                                                    .state
                                                    .platecategorylist
                                                    .map((cecategory, index) => <option key={index} value={cecategory.platecategoryid}>{cecategory.platecategoryname}</option>)}
                                            </select><br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="vehType">{this.props.t('Plate_Code')}</label>
                                            <select
                                                data-val="true"
                                                value={this.state.platecodeid}
                                                onChange={(e) => this.handlePlateCodeChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">{this.props.t('Plate_Code')}</option>
                                                {this
                                                    .state
                                                    .platecodelist
                                                    .map((plate, index) => <option key={index} value={plate.platecodeid}>{plate.platecodename}</option>)}
                                            </select>   <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="vehType">{this.props.t('Plate_Number')}</label>
                                            <input
                                                name="platenumber"
                                                value={this.state.platenumber}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                required
                                                placeholder={this.props.t('Plate_Number')} /><br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <label htmlFor="vehType">{this.props.t('Vehicle_Ownership_Type')}</label>
                                            <select
                                                data-val="true"
                                                value={this.state.ownershiptypeid}
                                                onChange={(e) => this.ownershipTypeChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">{this.props.t('Vehicle_Ownership_Type')}</option>
                                                {this
                                                    .state
                                                    .ownershiptypelist
                                                    .map((owner, index) => <option key={index} value={owner.commonmasterid}>{owner.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label htmlFor="vehType">{this.props.t('Vehicle_Owner')}</label>
                                        <select
                                            data-val="true"
                                            name="ownerid"
                                            value={this.state.ownerid}
                                            onChange={(e) => this.onOwnerChange(e)}
                                            className="edit-form" required>
                                            <option value="">{this.props.t('Vehicle_Owner')}</option>
                                            {
                                                this
                                                    .state
                                                    .ownershiplists
                                                    .map((owner, index) => <option key={index} value={owner.companyid}>{owner.nameen} &nbsp; {owner.namear} </option>)

                                            }
                                        </select>
                                    </div>
                                    {this.state.isLeasor === true &&
                                        < div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label htmlFor="vehType">{this.props.t('Lessor_Name')}</label>
                                                <input
                                                    name="leaseename"
                                                    value={this.state.leaseename}
                                                    onChange={this.onChange}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder={this.props.t('Lessor_Name')} />        <br /><br />
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="vehType">{this.props.t('Vehicle_Comments')}</label>
                                            <input
                                                name="remarks"
                                                value={this.state.remarks}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder={this.props.t('Vehicle_Comments')} />        <br /><br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="makeModel">{this.props.t('Make')}</label>
                                            <select
                                                name="makeid"
                                                onChange={this.makeChange}
                                                value={this.state.makeid}
                                                className="edit-form" required>
                                                <option key="-1" value="">{this.props.t('Make')}</option>
                                                {this
                                                    .state
                                                    .makelists
                                                    .map((make, index) => <option key={index} value={make.commonmasterid}>{make.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label htmlFor="makeModel">{this.props.t('Model')}</label>
                                            <select
                                                name="modelid"
                                                onChange={this.onChange}
                                                value={this.state.modelid}
                                                className="edit-form" required>
                                                <option key="-1" value="">{this.props.t('Model')}</option>)
                                                {this
                                                    .state
                                                    .modellist
                                                    .map((model, index) => <option key={index} value={model.vehiclemodelid}>{model.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="fuelType">{this.props.t('Fuel_Type')}</label>
                                            <select
                                                name="fueltypeid"
                                                value={this.state.fueltypeid}
                                                onChange={this.onChange}
                                                className="edit-form">
                                                <option key="-1" value="">{this.props.t('Fuel_Type')}</option>)
                                                {this
                                                    .state
                                                    .fueltypelist
                                                    .map((fueltype, index) => <option key={index} value={fueltype.commonmasterid}>{fueltype.name}</option>)}
                                            </select>        <br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="vehType">{this.props.t('Colour')}</label>
                                            <select
                                                name="colourid"
                                                value={this.state.colourid}
                                                onChange={this.onChange}
                                                className="edit-form">
                                                <option key="-1" value="">{this.props.t('Colour')}</option>)
                                                {this
                                                    .state
                                                    .vehiclecolourlist
                                                    .map((vehiclecolour, index) => <option key={index} value={vehiclecolour.commonmasterid}>{vehiclecolour.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="numSeats">{this.props.t('Passenger_Capacity')}</label>
                                            <select
                                                name="seatingcapacity"
                                                value={this.state.seatingcapacity}
                                                onChange={this.onChange}
                                                className="edit-form">
                                                <option key="-1" value="">{this.props.t('Passenger_Capacity')}</option>)
                                                {this
                                                    .state
                                                    .vehseatlist
                                                    .map((vehseat, index) => <option key={index} value={vehseat.number}>{vehseat.number}</option>)}
                                            </select>        <br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="vehType">{this.props.t('Vehicle_Type')}</label>
                                            <select
                                                className="edit-form"
                                                name="vehicletypeid"
                                                value={this.state.vehicletypeid}
                                                onChange={this.onChange}>
                                                <option key="-1" value="">{this.props.t('Vehicle_Type')}</option>)
                                                {this
                                                    .state
                                                    .vehtypelist
                                                    .map((vehtype, index) => <option key={index} value={vehtype.commonmasterid}>{vehtype.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="yearManufacture">{this.props.t('First_Reg_Date')}</label>
                                            <input type="date"
                                                name="registrationdate"
                                                style={{ marginTop: '-7px' }}
                                                onChange={this.onChange}
                                                value={this.state.registrationdate}
                                                className="edit-form" />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="yearManufacture">{this.props.t('Year')}</label>
                                            <select
                                                name="yearmanufacture"
                                                onChange={this.onChange}
                                                value={this.state.yearmanufacture}
                                                className="edit-form"
                                                required >
                                                <option key="-1" value="">{this.props.t('Year')}</option>)
                                                {this
                                                    .state
                                                    .yearmanufacturelist
                                                    .map((yearmanufacture, index) => <option key={index} value={yearmanufacture.year}>{yearmanufacture.year}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="numSeats">{this.props.t('Transportation_Type')}</label>
                                            <select
                                                name="transmissiontypeid"
                                                value={this.state.transmissiontypeid}
                                                onChange={this.onChange}
                                                className="edit-form">
                                                <option key="-1" value="">{this.props.t('Transportation_Type')}</option>)
                                                {this
                                                    .state
                                                    .transmissionlist
                                                    .map((transmission, index) => <option key={index} value={transmission.commonmasterid}>{transmission.name}</option>)}
                                            </select>        <br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="telNum">{this.props.t('Vehicle_Registration_Number')}</label>
                                            <input
                                                name="trafficfilenumber"
                                                onChange={this.onChange}
                                                value={this.state.trafficfilenumber}
                                                type="text"
                                                required
                                                className="edit-form"
                                                placeholder={this.props.t('Vehicle_Registration_Number')} />        <br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="engineNum">{this.props.t('Engine_Number')}</label>
                                            <input
                                                name="enginenumber"
                                                required
                                                onChange={this.onChange}
                                                value={this.state.enginenumber}
                                                type="text"
                                                className="edit-form"
                                                placeholder={this.props.t('Engine_Number')} /><br /><br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="keyID">{this.props.t('Chassis_Number')}</label>
                                            <input
                                                name="chassisnumber"
                                                value={this.state.chassisnumber}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder={this.props.t('Chassis_Number')} /><br /><br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <table><tr>
                                                <td> <label>{this.props.t('Disabledfriendly')}</label></td>
                                                <td><input style={{ marginLeft: '10px' }}
                                                    name="disabledfriendly"
                                                    checked={this.state.disabledfriendly}
                                                    onChange={(e) => this.toggleChange(e)}
                                                    type="checkbox"
                                                    className="edit-form"
                                                    placeholder={this.props.t('eg_John_Stones')} /></td>
                                            </tr></table>
                                        </div>
                                    </div>
                                </div>
                                <div className="center">
                                    <button
                                        id="hidePopUpBtn"
                                        type="button"
                                        className="btn btn-blank"
                                        data-dismiss="modal">{this.props.t('Close')}</button>
                                    <button type="submit" className="btn btn-standard-gold">{this.props.t('Save_Changes')}</button>
                                </div>
                                <br /><br />
                            </form>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default translate(EditVehicle);