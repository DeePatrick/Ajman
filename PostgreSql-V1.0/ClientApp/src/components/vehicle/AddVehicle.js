import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import english_JSON from './../../data/json_EN';
import Loader from '../loader';
import * as config from '../../config';

const English = english_JSON;

class AddVehicle extends Component {
    displayName = AddVehicle.name

    constructor(props) {
        super(props);
        this.state = {
            companyOwnershipLists: [],
            ownershipLists: [],
            ownershipTypeList: [],
            makeLists: [],
            makeLists1: [],
            plateLists: [],
            plateCodeList: [],
            plateCategoryList: [],
            ownerNameList: [],
            vehicleid: 0,
            individualid: 0,
            vehicletypeid: 0,
            chassisnumber: "",
            enginenumber: "",
            seatingcapacity:0,
            registrationdate: "",
            yearmanufacture: "",
            makeid: 0,
            modelid: 0,
            colourid: 0,
            fueltypeid: 0,
            transmissiontypeid: 0,
            platenumber: "",
            platecategoryid: 0,
            platesourceid: 0,
            platecodeid: 0,
            remarks: "",
            vehiclephoto: "",
            disabledfriendly: false,
            trafficfilenumber: "1",
            ownershiptypeid: 0,
            ownerid: 1,
            ownershipname: "",
            lessorname: "",
            statusid: 420,
            status: "Pending",
            companyid: 0,
            fuelLists: [],
            colourLists: [],
            vehTypeLists: [],
            transportTypeLists: [],
            isactive:false
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/19")
            .then(response => response.json())
            .then(data => {
                this.setState({ makeLists: data, loading: false });
            });

        //fuel
        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/9")
            .then(response => response.json())
            .then(data => {
                this.setState({ fuelLists: data, loading: false });
            });

        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/18")
            .then(response => response.json())
            .then(data => {
                this.setState({ colourLists: data, loading: false });
            });

        //vehicleType
        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/20")
            .then(response => response.json())
            .then(data => {
                this.setState({ vehTypeLists: data, loading: false });
            });

        //transportType
        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/17")
            .then(response => response.json())
            .then(data => {
                this.setState({ transportTypeLists: data, loading: false });
            });

        fetch(config.webApiUrl() + "/aptc_companyName")
            .then(response => response.json())
            .then(data => {
                this.setState({ companyOwnershipLists: data, loading: false });
            });

        fetch(config.webApiUrl() + "/aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ ownershipLists: data, loading: false });
            });

        fetch(config.webApiUrl() + "/aptc_getCommonMasters/1/13")
            .then(response => response.json())
            .then(data => {
                this.setState({ ownershipTypeList: data, loading: false });
            });

        fetch(config.webApiUrl() + "/aptc_getPlateSource/1")
            .then(response => response.json())
            .then(data => {
                this.setState({ plateLists: data, loading: false });
            });
    }



    componentWillReceiveProps(nextProps) {
        this.setState({
            crnumber: nextProps.crnumber,
            companyid: nextProps.companyid
        });
    }


    renderOptions(myArray) {
        return myArray.map(item => <option key={item.Value} value={item.Value}>{item.Value}</option>);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    transTypeChange = (e) => {
        this.setState({ transmissiontypeid: e.target.value });
        var transmissiontype = document.getElementById('transmissiontype').options[document.getElementById('transmissiontype').selectedIndex].text;
        this.setState({ transmissiontype: transmissiontype });
    };

    yearManufactureChange = (e) => {
        this.setState({ yearmanufacture: e.target.value });
    };

    colourChange = (e) => {
        this.setState({ colourid: e.target.value });
        var colour = document.getElementById('colour').options[document.getElementById('colour').selectedIndex].text;
        this.setState({ colour: colour });
    };

    owneridChange = (e) => {

        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ ownerid: intSelectedValue });

        fetch(config.webApiUrl() + "aptc_individualName")
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].individualid == intSelectedValue) {
                        let models = data[i].namear + "  " + data[i].nameen;
                        tempRole = models;
                    }
                }
                this.setState({ ownershipname: tempRole });
            });

    }


    ownercompIDChange = (e) => {

        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ ownerid: intSelectedValue });

        fetch(config.webApiUrl() + "aptc_companyName")
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].companyid == intSelectedValue) {
                        let models = data[i].namear + "  " + data[i].nameen;
                        tempRole = models;
                    }
                }
                this.setState({ ownershipname: tempRole });
            });
    }


    numSeatsChange = (e) => {
        this.setState({ seatingcapacity: e.target.value });
    };

    fuelTypeChange = (e) => {
        this.setState({ fueltypeid: e.target.value });
        var fueltype = document.getElementById('fueltype').options[document.getElementById('fueltype').selectedIndex].text;
        this.setState({ fueltype: fueltype });
    };

    vehTypeChange = (e) => {
        this.setState({ vehicletypeid: e.target.value });
        var vehicletype = document.getElementById('vehicletype').options[document.getElementById('vehicletype').selectedIndex].text;
        this.setState({ vehicletype: vehicletype });
    };



    onChangeVehPlatePlateNumber(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleIdChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };



    handlePlateChange = (e) => {

        let selectedValue = e.target.value;
        this.setState({ platesourceid: selectedValue });
        var platesource = document.getElementById('platesource').options[document.getElementById('platesource').selectedIndex].text;
        this.setState({ platesource: platesource });


        let _id = selectedValue;

        fetch(config.webApiUrl() + "/aptc_getPlateSourceCategory/1/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ plateCategoryList: data, loading: false });
            });
    }


    handlePlateCategoryChange = (e) => {
        let selectedValue = e.target.value;
        this.setState({ platecategoryid: selectedValue });
        var platecategory = document.getElementById('platecategory').options[document.getElementById('platecategory').selectedIndex].text;
        this.setState({ platecategory: platecategory });

        let _id = selectedValue;

        fetch(config.webApiUrl() + "aptc_getPlateCategoryCode/1/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ plateCodeList: data, loading: false });
            });
    }


    handlePlateCodeChange = (e) => {
        this.setState({ platecodeid: e.target.value });
        var platecode = document.getElementById('platecode').options[document.getElementById('platecode').selectedIndex].text;
        this.setState({ platecode: platecode });
    }


    onMakeChange = (e) => {
        let selectedValue = e.target.value;
        this.setState({ makeid: selectedValue });


        let _id = selectedValue;

        fetch(config.webApiUrl() + "aptc_getVehicleMakeModel/1/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ makeLists1: data, loading: false });
            });
    };


    onModelChange = (e) => {
        this.setState({ modelid: e.target.value });
    };


    /* ownership change*/
    ownershipTypeChange = (e) => {
        this.setState({ ownershiptypeid: e.target.value });
    }


    leasorNameChange = (e) => {
        this.setState({ lessorname: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item, 'add');
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var _id = this.props.companyid;

        var objVehicle = {};

        objVehicle.individualid = parseInt(this.state.individualid);

        objVehicle.companyid = parseInt(this.props.companyid);
        objVehicle.vehicletypeid = parseInt(this.state.vehicletypeid);
        objVehicle.enginenumber = this.state.enginenumber;
        objVehicle.seatingcapacity = parseInt(this.state.seatingcapacity);
        objVehicle.registrationdate = this.state.registrationdate;
        objVehicle.yearmanufacture = this.state.yearmanufacture;
        objVehicle.makeid = parseInt(this.state.makeid);
        objVehicle.modelid = parseInt(this.state.modelid);
        objVehicle.colourid = parseInt(this.state.colourid);
        objVehicle.fueltypeid = parseInt(this.state.fueltypeid);
        objVehicle.transmissiontypeid = parseInt(this.state.transmissiontypeid);

        objVehicle.platenumber = this.state.platenumber;
        objVehicle.platecategoryid = parseInt(this.state.platecategoryid);
        objVehicle.platesourceid = parseInt(this.state.platesourceid);

        objVehicle.platecodeid = parseInt(this.state.platecodeid);
        objVehicle.remarks = this.state.remarks;
        objVehicle.vehiclephoto = this.state.vehiclephoto;
        objVehicle.isactive = this.state.isactive;
        objVehicle.statusid = parseInt(this.state.statusid);
        objVehicle.disabledfriendly = this.state.disabledfriendly;

        objVehicle.chassisnumber = this.state.chassisnumber;
        objVehicle.trafficfilenumber = this.state.trafficfilenumber;
        objVehicle.ownerid = parseInt(this.state.ownerid);
        objVehicle.ownershiptypeid = parseInt(this.state.ownershiptypeid);
        objVehicle.ownershipname = this.state.ownershipname;

        objVehicle.lessorname = this.state.lessorname;
        //objVehicle.vehicleid = parseInt(this.state.vehicleid);

        const vehicle = JSON.stringify(objVehicle);

        console.log(this.state);
        axios
            .post(config.webApiUrl() + "aptc_vehicle", vehicle, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                fetch(config.webApiUrl() + 'aptc_company_vehicles/' + localStorage.getItem('selectedLanguageCode') +"/"  + _id)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ loading: false });
                        alert(res.data.ResponseMessage);
                        this.handleSave();
                        $('.close').click();
                    });
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
        console.log(this.props.companyid);
        console.log(this
            .state
            .ownerNameList);

        return (
            <div id="close">
                <div
                    className="modal fade"
                    id="vehAddModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="vehAddModalLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="platesourceid">Plate Source</label>
                                            <select
                                                id="platesource"
                                                data-val="true"
                                                value={this.state.platesourceid}
                                                onChange={(e) => this.handlePlateChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">Plate Source</option>
                                                {this
                                                    .state
                                                    .plateLists
                                                    .map((plate, index) => <option key={index} value={plate.platesourceid}>{plate.platesourcename}</option>)}
                                            </select> <br />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="platecategoryid">Plate Category</label>
                                            <select
                                                id="platecategory"
                                                data-val="true"
                                                required
                                                value={this.state.platecategoryid}
                                                onChange={(e) => this.handlePlateCategoryChange(e)}
                                                className="edit-form">
                                                <option value="">Plate Category</option>
                                                {this
                                                    .state
                                                    .plateCategoryList
                                                    .map((plate, index) => <option key={index} value={plate.platecategoryid}>{plate.platecategoryname}</option>)}
                                            </select><br />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="platecodeid">Plate Code</label>
                                            <select
                                                id="platecode"
                                                data-val="true"
                                                required
                                                value={this.state.platecodeid}
                                                onChange={(e) => this.handlePlateCodeChange(e)}
                                                className="edit-form">
                                                <option value="">Plate Code</option>
                                                {this
                                                    .state
                                                    .plateCodeList
                                                    .map((plate, index) => <option key={index} value={plate.platecodeid}>{plate.platecodename}</option>)}
                                            </select>   <br />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="vehType">Plate Number</label>
                                            <input
                                                name="platenumber"
                                                value={this.state.platenumber}
                                                onChange={(e) => this.onChangeVehPlatePlateNumber(e)}
                                                type="text"
                                                required
                                                className="edit-form"
                                                placeholder=" Plate Number" /><br />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label htmlFor="vehType">Vehicle Ownership Type</label>
                                            <select
                                                data-val="true"
                                                value={this.state.ownershiptypeid}
                                                onChange={(e) => this.ownershipTypeChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">- Ownership Type -</option>
                                                {this
                                                    .state
                                                    .ownershipTypeList
                                                    .map((owner, index) => <option key={index} value={owner.commonmasterid}>{owner.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>


                                    {this.state.ownershiptypeid == (126).toString() ?

                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label>Vehicle Leasor Name</label>
                                            <input
                                                value={this.state.lessorname}
                                                onChange={(e) => this.leasorNameChange(e)}
                                                type="text"
                                                name="lessorname"
                                                className="edit-form" placeholder="Lessor Name" /><br />
                                        </div>
                                        : null}

                                    {this.state.ownershiptypeid == (124).toString() ?
                                        <div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Vehicle Owner - Emirates ID</label>
                                                <select
                                                    data-val="true"
                                                    value={this.state.ownerid}
                                                    onChange={(e) => this.owneridChange(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Vehicle Owner ID -</option>
                                                    {this
                                                        .state
                                                        .ownershipLists
                                                        .map((owner, index) => <option key={index} value={owner.individualid}>{owner.emiratesid}</option>)}
                                                </select>        <br />

                                            </div>


                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Vehicle Owner - Name</label>
                                                <input
                                                    value={this.state.ownershipname}
                                                    type="text"
                                                    name="ownershipname"
                                                    className="edit-form" />       <br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.ownershiptypeid == (125).toString() ?
                                        <div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Vehicle Owner - Company Reg No</label>
                                                <select
                                                    id="ownershipname"
                                                    data-val="true"
                                                    value={this.state.ownerid}
                                                    onChange={(e) => this.ownercompIDChange(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Vehicle Owner Name -</option>
                                                    {this
                                                        .state
                                                        .companyOwnershipLists
                                                        .map((owner, index) => <option key={index} value={owner.companyid}>{owner.crnumber}</option>)}
                                                </select>        <br />
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Vehicle Owner - Company Name</label>
                                                <input
                                                    value={this.state.ownershipname}
                                                    type="text"
                                                    name="ownershipname"
                                                    className="edit-form" />       <br />
                                            </div>
                                        </div>
                                        : null}


                                    <div className="form-group">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <label>Vehicle Comments</label>
                                            <input
                                                name="remarks"
                                                value={this.state.remarks}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder=" Comments" />        <br /><br />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <label>Make</label>
                                            <select
                                                data-val="true"
                                                value={this.state.makeid}
                                                onChange={(e) => this.onMakeChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">- Select vehicle make -</option>
                                                {this
                                                    .state
                                                    .makeLists
                                                    .map((vecMake, index) => <option key={index} value={vecMake.commonmasterid}>{vecMake.name} </option>)}
                                            </select>        <br />
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <label>Model</label>
                                            <select
                                                data-val="true"
                                                value={this.state.modelid}
                                                onChange={(e) => this.onModelChange(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">- Select vehicle model-</option>
                                                {this
                                                    .state
                                                    .makeLists1
                                                    .map((m, index) => <option key={index} value={m.vehiclemodelid}> {m.name}</option>)}
                                            </select>        <br />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label>Fuel</label>
                                            <select
                                                id="fueltype"
                                                value={this.state.fueltypeid}
                                                required
                                                onChange={this.fuelTypeChange}
                                                className="edit-form">
                                                <option value="">- Select Fuel Type -</option>
                                                {this
                                                    .state
                                                    .fuelLists
                                                    .map((fuel, index) => <option key={index} value={fuel.commonmasterid}>{fuel.name} </option>)}
                                            </select>        <br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label>Colour</label>
                                            <select
                                                id="colour"
                                                required
                                                value={this.state.colourid}
                                                onChange={this.colourChange}
                                                className="edit-form">
                                                <option value="">- Select Vehicle Colour -</option>
                                                {this
                                                    .state
                                                    .colourLists
                                                    .map((vehcolour, index) => <option key={index} value={vehcolour.commonmasterid}>{vehcolour.name} </option>)}
                                            </select><br />
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="seatingcapacity">Passenger Capacity</label>
                                            <select
                                                required
                                                value={this.state.seatingcapacity}
                                                onChange={this.numSeatsChange}
                                                className="edit-form">
                                                {this.renderOptions(english_JSON.Contents.NumberOfSeats)}
                                            </select>        <br />
                                        </div>



                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="vehType">Vehicle Type</label>
                                            <select
                                                id="vehicletype"
                                                required
                                                className="edit-form"
                                                value={this.state.vehicletypeid}
                                                onChange={this.vehTypeChange}>
                                                <option value="">- Select Vehicle Type -</option>
                                                {this
                                                    .state
                                                    .vehTypeLists
                                                    .map((vehtype, index) => <option key={index} value={vehtype.commonmasterid}>{vehtype.name} </option>)}
                                            </select>        <br />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label>First Reg Date</label>
                                            <input
                                                value={this.state.registrationdate}
                                                onChange={this.onChange}
                                                type="date"
                                                style={{ marginTop: '-7px' }}
                                                name="registrationdate"
                                                className="edit-form" />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label>Year</label>
                                            <select
                                                onChange={this.yearManufactureChange}
                                                value={this.state.yearManufacture}
                                                required
                                                className="edit-form">
                                                {this.renderOptions(english_JSON.Contents.YearManufactured)}
                                            </select>        <br />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label>Transportation Type</label>
                                            <select
                                                id="transmissiontype"
                                                value={this.state.transmissiontypeid}
                                                onChange={this.transTypeChange}
                                                required
                                                className="edit-form">
                                                <option value="">- Select Transport Type -</option>
                                                {this
                                                    .state
                                                    .transportTypeLists
                                                    .map((trans, index) => <option key={index} value={trans.commonmasterid}>{trans.name} </option>)}
                                            </select>        <br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="trafficfilenumber">Vehicle Registration Number</label>
                                            <input
                                                name="trafficfilenumber"
                                                onChange={this.onChange}
                                                value={this.state.trafficfilenumber}
                                                type="text"
                                                required
                                                className="edit-form"
                                                placeholder="Vehicle Registration No." />        <br />
                                        </div>
                                    </div>




                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6">
                                            <label>Engine Number</label>
                                            <input
                                                name="enginenumber"
                                                required
                                                onChange={this.onChange}
                                                value={this.state.enginenumber}
                                                type="text"
                                                className="edit-form"
                                                placeholder="Engine Number" /><br /><br />
                                        </div>


                                        <div className="col-md-6 col-lg-6">
                                            <label htmlFor="chassisnumber">VIN</label>
                                            <input
                                                name="chassisnumber"
                                                value={this.state.chassisnumber}
                                                onChange={this.onChange}
                                                type="text"
                                                className="edit-form"
                                                placeholder="chassisnumber" required/><br /><br />
                                        </div>
                                    </div>

                                </div>
                                <div className="center">
                                    <button
                                        id="hidePopUpBtn"
                                        type="button"
                                        className="btn btn-blank"
                                        data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
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


export default AddVehicle;
