import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from './../../../config';
import Loader from '../../loader';
import PermitPayment from './PermitPayment';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';
type Props = {
    t: T
}

export class RequestPermit extends Component {
    displayName = RequestPermit.name
    constructor(props) {
        super(props);
        this.state = {
            createdby: 0,
            totalpermitfee: 0,
            inspectionfee: 0,
            individualid: 0,
            platesourceid: 0,
            platecategoryid: 0,
            platecodeid: 0,
            permittypeid: 0,
            carplateamount: 0,
            quickprocesamount: 0,
            amount: 0,
            driverid: 0,
            companyid: 0,
            vehicleid: 0,
            permitdurationid: 0,
            permitlocationid: 0,
            permitcapacityid: 0,
            permitweightid: 0,
            price: 0,
            fees: 0,
            permitmainid: 0,
            permittypecode: '',
            prerequisitionsdocuments: [],
            isindividual: false,
            isDriver: false,
            isPrivate: false,
            isComapny: false,
            isRented: false,
            isVehComp: false,
            isLocation: false,
            isCapacity: false,
            isDuration: false,
            isWeight: false,
            isGPS: false,
            isComme: false,
            isConductor: false,
            quickproces: false,
            isQuickProces: false,
            isPayment: false,
            isthisschoolbuspermit: false,
            isthisreligionsschool: false,
            docfile: [{
                permitfiletypeid: 1,
                permitfilename: "jpg",
                permitfilephoto: "c:/tempdata/fake"
            }],
            companyidlist: [],
            rentedvehiclelist: [],
            permitfilelist: [],
            permittypelist: [],
            indlistpermit: [],
            vehiclelist: [],
            compListPermit: [],
            companylist: [],
            durationlist: [],
            locationlist: [],
            capacitylist: [],
            weightlist: [],
            platelists: [],
            platecodelist: [],
            platecategorylist: [],
            carplatepermitlist: [],
            companyactivitylist: [],
            activityidlist: [],
            driverlist: [],
            indList: []
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.onChangePermitType = this
            .onChangePermitType
            .bind(this);

        this.savePermit = this
            .savePermit
            .bind(this);
    }

    componentDidMount() {
        fetch(config.webApiUrl() + "aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ indList: data });
            });
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.mode === 'add') {
            this.setState({ isPayment: false });
            this.initializeData();
            fetch(config.webApiUrl() + "aptc_getPlateSource/" + localStorage.getItem('selectedLanguageCode'))
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
            fetch(config.webApiUrl() + "/aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/23")
                .then(response => response.json())
                .then(data => {
                    this.setState({ permittypelist: data });
                    this.bindVehicle();
                });
            fetch(config.webApiUrl() + "/aptc_getOthersPermitMaster/" + localStorage.getItem('selectedLanguageCode') + "/434")
                .then(response => response.json())
                .then(data => {
                    this.setState({ carplateamount: data[0].amount, quickprocesamount: data[1].amount, inspectionfee: data[2].amount });
                    this.bindVehicle();
                });
        }

    }
    initializeData() {
        this.setState({
            totalpermitfee: 0,
            inspectionfee: 0,
            platesourceid: 0,
            platecategoryid: 0,
            platecodeid: 0,
            permittypeid: 0,
            amount: 0,
            driverid: 0,
            companyid: 0,
            vehicleid: 0,
            permitdurationid: 0,
            permitlocationid: 0,
            permitcapacityid: 0,
            permitweightid: 0,
            price: 0,
            fees: 0,
            permittypecode: '',
            isindividual: false,
            isDriver: false,
            isPrivate: false,
            isComapny: false,
            isRented: false,
            isVehComp: false,
            isLocation: false,
            isCapacity: false,
            isDuration: false,
            isWeight: false,
            isGPS: false,
            isComme: false,
            isthisschoolbuspermit: false,
            isthisreligionsschool: false,
            companyidlist: [],
            rentedvehiclelist: [],
            permitfilelist: [],
            permittypelist: [],
            indlistpermit: [],
            vehiclelist: [],
            compListPermit: [],
            companylist: [],
            durationlist: [],
            locationlist: [],
            capacitylist: [],
            weightlist: [],
            platelists: [],
            platecodelist: [],
            platecategorylist: [],
            carplatepermitlist: [],
            companyactivitylist: [],
            activityidlist: [],
            createdby: localStorage.getItem('userid'),
            individualid: localStorage.getItem('individualid')
        });

    }



    //Start Bind Dropdown
    bindPrerequisitionsDocuments(permittypeid) {
        fetch(config.webApiUrl() + "aptc_permitprerequisitiondocuments/" + localStorage.getItem('selectedLanguageCode') + "/" + permittypeid)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var prerequisitionsdocuments = [];
                    prerequisitionsdocuments = data[0].documenttypes.toString().split(',');
                    this.setState({ prerequisitionsdocuments: prerequisitionsdocuments });
                }
            });
    }
    bindCompany() {
        fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ companylist: data });
            });
    }
    toggleChangeisschool(e) {
        if (e.target.name === 'isthisreligionsschool') {
            if (this.state.isthisreligionsschool === false) {
                this.setState({ isthisreligionsschool: true });
            }
            else {
                this.setState({ isthisreligionsschool: false });
            }
        }
        if (e.target.name === 'isthisschoolbuspermit') {
            if (this.state.isthisschoolbuspermit === false) {
                this.setState({ isthisschoolbuspermit: true });
            }
            else {
                this.setState({ isthisschoolbuspermit: false });
            }
        }
    }
    bindEmployee() {
        fetch(config.webApiUrl() + 'aptc_getDriver/' + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                if (data[0].individualid !== undefined) {
                    this.setState({ indlistpermit: data, loading: false });
                    this.setState({ driverid: data[0].individualid, loading: false });
                }
            })
            .catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });
    }
    bindVehicle() {
        fetch(config.webApiUrl() + "aptc_individual_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ vehiclelist: data });
                var tempRentedVehicle = [];
                $.each(data, function (key, value) {
                    if (value.lessorname !== undefined && value.lessorname !== '') {
                        tempRentedVehicle.push(value);
                    }
                });
                this.setState({ rentedvehiclelist: tempRentedVehicle });
            });
    }
    bindCapacity() {
        fetch(config.webApiUrl() + "aptc_getPermitCapacity/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ capacitylist: data, isDuration: true });
            });
    }
    bindWeight() {
        fetch(config.webApiUrl() + "aptc_getPermitWeight/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ weightlist: data });
            });
    }
    bindDuration(permittypeid, capacityid) {
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + permittypeid + "/" + capacityid)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationlist: data });
            });
    }
    bindLocation(permittypeid) {
        fetch(config.webApiUrl() + "aptc_getPermitLocation/" + localStorage.getItem('selectedLanguageCode') + "/" + permittypeid)
            .then(response => response.json())
            .then(data => {
                this.setState({ locationlist: data });
            });
    }
    bindDriver() {
        fetch(config.webApiUrl() + "aptc_individual_getAllActiveDrivers/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ driverlist: data });
                if (data.length > 0) {
                    this.setState({ companyid: data[0].companyid });
                }
            });
    }
    bindConductor() {
        fetch(config.webApiUrl() + "aptc_individual_getAllActiveDrivers/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ driverlist: data });
            });
    }
    //End Bind Dropdown

   
    // start commercial lincebse
    bindActivity() {
        fetch(config.webApiUrl() + "/aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/1")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ companyactivitylist: data });
                    //var activityidlist = [];
                    //activityidlist.push(data[0].commonmasterid);
                }
            });
    }
    activityChange = (e) => {
        var amount = 0;
        var price = this.state.price;
        if (e.target.selectedIndex > 0) {
            var activityidlist = this.state.activityidlist;
            var isExists = $.inArray(e.target.value, activityidlist);
            if (isExists === -1) {
                activityidlist.push(e.target.value);
                amount = price + 4500;
            }
            else {
                $.each(activityidlist, function (ind, val) {
                    if (val === e.target.value) {
                        activityidlist.splice(ind, 1);
                        if (price > 0) {
                            amount = price - 4500;
                        }
                    }
                });
            }
            this.setState({ activityidlist: activityidlist, price: amount });
        }
        //else {
        //    this.setState({ price: amount });
        //}
    };
    // End  commercial lincebse

    //Start upload documents
    handleDocsImgChange = (idx) => (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            var file = evt.target.files[0];
            var docFile = this.state.permitfilelist;
            var objFile = {};
            var reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            reader.onload = function () {
                objFile.permitfiletypeid = 1;
                objFile.permitfilename = file.name //file.type.split('/')[1];
                objFile.permitfilephoto = reader.result;
                docFile.push(objFile);
            };
            reader.onerror = function (error) {
                alert('Error: ', error);
            };
            this.setState({ permitfilelist: docFile });
        }
    }
    handleAddDocs = () => {
        if (this.state.permitfilelist.length === 0) {
            alert('please upload document');
            return;
        }
        else {
            this.setState({
                docfile: this.state.docfile.concat([
                    {
                        permitfiletypeid: 1,
                        permitfilename: "",
                        permitfilephoto: "",
                    }
                ])
            });
        }
    };
    handleRemoveDocs = (idx) => () => {
        if (this.state.docfile.length === 1) {
            alert('you can not delete.');
        }
        else {
            this.setState({
                docfile: this
                    .state
                    .docfile
                    .filter((v, vidx) => idx !== vidx)
            });
        }
    };
    //End  upload documents

    // Start Onchange events
    onChangeLocation = (e) => {
        this.setState({ permitlocationid: e.target.value, capacity: "", duration: "", price: 0, weight: '' });
    };
    onChangeCapacity = (e) => {
        this.setState({ permitcapacityid: e.target.value, duration: "", price: '0', weight: '' });
        this.bindDuration(this.state.permittypeid, e.target.value);
    };
    onChangeDuration = (e) => {
        var index = e.target.selectedIndex - 1;
        if (e.target.selectedIndex === 0) {
            this.setState({ price: '0' });
        }
        else {
            this.setState({ permitdurationid: e.target.value, price: this.state.durationlist[index].price });
        }

    };
    onChangeWeight = (e) => {
        this.setState({ permitweightid: e.target.value, price: '0' });
        var index = e.target.selectedIndex - 1;
        if (e.target.selectedIndex === 0) {
            this.setState({ price: '0' });
        }
        else {
            this.setState({ price: this.state.weightlist[index].fees });
        }
    };
    driverChange = (e) => {
        this.setState({ driverid: e.target.value });
        if (this.state.driverlist.length > 0) {
            $.each(this.state.driverlist, function (key, value) {
                if (value.companyid === e.target.value) {
                    this.setState({ companyid: value.companyid });
                }
            });
        }
    };
    vehicleChange = (e) => {
        this.setState({ vehicleid: e.target.value });
        if (e.target.selectedIndex > 0) {
            var onershipType = this.state.vehiclelist[e.target.selectedIndex - 1].ownershiptypeid;
            if (onershipType === '124') {
                if (this.state.companylist.length === 0) {
                    this.bindCompany();
                }
                this.setState({ isVehComp: true });
            }
            else {
                //this.setState({ companyid: this.state.vehiclelist[e.target.selectedIndex - 1].companyid});
                this.setState({ isVehComp: false });
            }
        }

    };
    onVehCompChange = (e) => {
        this.setState({ companyid: e.target.value });
    };
    companyChange = (e) => {
        if (e.target.selectedIndex > 0) {
            var tempcompidlist = this.state.companyidlist;
            var isExists = $.inArray(e.target.value, tempcompidlist);
            if (isExists === -1) {
                tempcompidlist.push(e.target.value);
            }
            else {
                $.each(tempcompidlist, function (ind, val) {
                    if (val === e.target.value) {
                        tempcompidlist.splice(ind, 1);
                    }
                });
            }
            this.setState({ companyidlist: tempcompidlist });
        }
    };
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePaymentMode(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeOwner(e) {
        var individualid = e.target.value;
        this.setState({ individualid: individualid });

        if (this.state.individualid !== undefined || "") {
            localStorage.setItem('individualid', individualid);
        }

      

    }

    onChangePermitType = (e) => {

        var tempcompidlist = [];
        this.setState({ permittypeid: e.target.value });
        this.bindPrerequisitionsDocuments(e.target.value);
        this.setState({ isschoolbus: false });
        this.setState({
            isCommerLicense: false,
            isCarPalte: false,
            isRented: false,
            isDriver: false,
            isPrivate: false,
            isComapny: false,
            isDuration: false,
            isLocation: false,
            isCapacity: false,
            isWeight: false,
            isConductor: false,
            isGPS: false,
            quickproces: false,
            isQuickProces: false,
            isinspectionfee: false,
            isVehComp: false,
            companyidlist: tempcompidlist,
            permittypeid: e.target.value,
            permitlocationid: 0,
            permitcapacityid: 0,
            permitdurationid: 0,
            inspectionfee: 0,
            price: 0,
            permitweightid: 0,
            docfile: [{
                permitfiletypeid: 1,
                permitfilename: "jpg",
                permitfilephoto: "c:/tempdata/fake"
            }],
            carplatepermitlist: [],
            createdby: localStorage.getItem('userid'),
            individualid: localStorage.getItem('individualid')
        });

        if (e.target.selectedIndex > 0) {
            this.setState({ permittypecode: this.state.permittypelist[e.target.selectedIndex - 1].code.toUpperCase() });
            switch (this.state.permittypelist[e.target.selectedIndex - 1].code.toUpperCase()) {
                case "FO-FR01":
                    this.addMorePlate(e.target.value);
                    this.setState({ isCarPalte: true, isQuickProces: true });
                    break;
                case "FO-FR02":
                    this.bindCapacity();
                    this.bindLocation(e.target.value);
                    this.setState({ isRented: true, isDuration: true, isLocation: true, isCapacity: true });
                    break;
                case "FO-FR03":
                    this.bindCapacity();
                    this.bindLocation(e.target.value);
                    this.setState({ isPrivate: true, isDuration: true, isLocation: true, isCapacity: true });
                    break;
                case "FO-FR04":
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isPrivate: true, isDuration: true });
                    break;
                case "FO-FR05":
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isPrivate: true, isDuration: true });
                    break;
                case "FO-FR06":
                    this.bindWeight();
                    this.setState({ isPrivate: true, isWeight: true });
                    break;
                case "FO-FR07":
                    this.bindCompany();
                    this.bindActivity();
                    this.setState({ isCommerLicense: true, isComapny: false });
                    break;
                case "FO-FR08":
                    this.bindCompany();
                    this.setState({ isComapny: true });
                    break;
                case "FO-FR09":
                    this.bindCompany();
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isComapny: true, isDuration: true });
                    break;
                case "FO-FR10":
                    this.bindDriver();
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isDriver: true, isDuration: true });
                    break;
                case "FO-FR11":
                    this.bindConductor();
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isConductor: true, isDuration: true });
                    break;
                case "FO-FR12":
                    this.bindCompany();
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isComapny: true, isDuration: true });
                    break;
                case "FO-FR13":
                    this.bindWeight();
                    this.setState({ isPrivate: true, isWeight: true });
                    break;
                case "FO-FR14":
                    this.bindCompany();
                    this.bindDuration(e.target.value, 0);
                    this.setState({ isGPS: true });
                    break;

            }
            if (this.state.isPrivate === true) {
                if (this.state.vehiclelist.length > 0) {
                    var onershipType = this.state.vehiclelist[0].ownershiptypeid;
                    if (onershipType === '124') {
                        if (this.state.companylist.length === 0) {
                            this.bindCompany();
                        }

                        this.setState({ isVehComp: true, isPrivate: false });
                    }
                    else {
                        this.setState({ isVehComp: false });
                    }
                }
            }
        }
    };

    //End Onchange events

    //start car palte permit
    handlePlateChange = (e) => {
        this.setState({ platesourceid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getPlateSourceCategory/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ platecategorylist: data });
            });

    }
    handlePlateCategoryChange = (e) => {
        this.setState({ platecategoryid: e.target.value });
        fetch(config.webApiUrl() + "aptc_getPlateCategoryCode/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ platecodelist: data });
            });
    }
    handlePlateCodeChange = (e) => {
        var tempVehiclelist = [];
        $.each(this.state.vehiclelist, function (key, value) {
            if (value.platecodeid.toString() === e.target.value) {
                tempVehiclelist.push(value);
            }
        });
        this.setState({ vehiclelist: tempVehiclelist });
    }
    vehiclePlateChange = (e) => {
        let carplatepermitlist = [...this.state.carplatepermitlist];
        carplatepermitlist[e.target.dataset.id]['vehicleid'] = e.target.value;
        this.setState({ carplatepermitlist: carplatepermitlist }, () => console.log(this.state.carplatepermitlist));
    }
    addCarPlatePermit = (idx) => () => {
        this.addMorePlate(this.state.permittypeid);
    }
    addMorePlate(permittypeid) {
        var permit = {};
        var amount = 0;
        var temppermitlist = this.state.carplatepermitlist;
        if (temppermitlist.length > 4 && this.state.isinspectionfee === false) {
            alert('Isinspectionfee(' + this.state.isinspectionfee + ') will be add in your total amount ');
            amount = 0;
            amount = parseFloat(this.state.price) + parseFloat(this.state.isinspectionfee);
            this.setState({ isinspectionfee: true });
        }
        permit.individualid = this.state.individualid;
        permit.permittypeid = permittypeid;
        permit.amount = this.state.carplateamount;
        permit.vehicleid = 0;
        temppermitlist.push(permit);
        amount = parseFloat(this.state.price) + parseFloat(this.state.carplateamount);
        this.setState({ carplatepermitlist: temppermitlist, price: amount });
    }
    removeCarPlatePermit = (idx) => () => {
        if (this.state.carplatepermitlist.length > 1) {
            if (this.state.carplatepermitlist.length > 0) {
                var doclist = this.state.carplatepermitlist;
                doclist.pop(idx);
                var amount = 0;
                if (this.state.isinspectionfee === true) {
                    amount = parseFloat(this.state.price) - parseFloat(this.state.isinspectionfee);
                    this.setState({ isinspectionfee: false });
                }
                this.setState({ carplatepermitlist: doclist });
                amount = parseFloat(this.state.price) - parseFloat(this.state.carplateamount);
                this.setState({ price: amount });
            }
        }
    };
    toggleChange(e) {
        var amount = 0;
        if (this.state.quickproces === false) {
            amount = parseFloat(this.state.price) + parseFloat(this.state.quickprocesamount);
            this.setState({ price: amount });
            this.setState({ quickproces: true });
        }
        else {
            amount = parseFloat(this.state.price) - parseFloat(this.state.quickprocesamount);
            this.setState({ price: amount });
            this.setState({ quickproces: false });
        }
    }
    //End car palte permit

    refreshPermit() {
        this.props.refreshModel();
    }
    savePermit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var permitDetails = {};
        var permit = {};
        var parmitlist = [];
        if (this.state.permitfilelist.length === 0) {
            alert('please select file');
            this.setState({ loading: false });
            return false;
        }
        permit.permittypeid = this.state.permittypeid;
        permit.individualid = this.state.individualid;
        permit.companyid = this.state.companyid;
        permit.isthisschoolbuspermit = this.state.isthisschoolbuspermit;
        permit.isthisreligionsschool = this.state.isthisreligionsschool;
        permit.vehicleid = this.state.vehicleid;
        permit.permitdurationid = this.state.permitdurationid;
        permit.permitlocationid = this.state.permitlocationid;
        permit.permitcapacityid = this.state.permitcapacityid;
        permit.permitweightid = this.state.permitweightid;
        if (this.state.activityidlist.length > 0) {
            permit.amount = this.state.price;
            permit.totalpermitfee = this.state.price;

            permit.companyactivityid = this.state.activityidlist.join(',');
        }
        else {
            permit.amount = this.state.price;
            permit.totalpermitfee = this.state.price;
        }
        parmitlist.push(permit);
        permitDetails.createdby = this.state.createdby;
        permitDetails.createdby = this.state.createdby;
        permitDetails.totalpermitfee = this.state.price;
        permitDetails.permitfileslist = this.state.permitfilelist;
        if (this.state.permittypecode.toUpperCase() === "FO-FR01") {
            permitDetails.permitslist = this.state.carplatepermitlist;
            permit.inspectionfee = 0;
            if (this.state.carplatepermitlist.length > 5) {
                permit.inspectionfee = this.state.inspectionfee;
            }
        }
        else {
            permitDetails.permitslist = parmitlist;
        }
        var permitdata = JSON.stringify(permitDetails);
        axios
            .post(config.webApiUrl() + "aptc_permit", permitdata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false, permitmainid: res.data.Id });
                alert(res.data.ResponseMessage);
                this.refreshPermit();
                this.setState({ isPayment: true });
            })
            .catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div id="close">
                <div
                    className="modal"
                    id="requestModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="requestModalLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                {!this.state.individual ? (
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-12 col-sm-12">
                                            <label htmlFor="vehType">{this.props.t('Person_associated_with_permit')}</label>
                                            <select
                                                data-val="true"
                                                name="individualid"
                                                value={this.state.individualid}
                                                onChange={(e) => this.onChangeOwner(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">{this.props.t('Owner')}</option>
                                                {this
                                                    .state
                                                    .indList
                                                    .map((comp, index) => <option key={index} value={comp.individualid}> {comp.emiratesid}    {comp.nameen}   {comp.namear}</option>)}
                                            </select> <br />
                                        </div>
                                    </div>

                                ) : (



                                        <form name="form" onSubmit={this.savePermit}>
                                            {this.state.loading === true
                                                && <div><Loader /></div>}
                                            {
                                                this.state.isPayment === false &&
                                                <div>
                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <label>{this.props.t('Permit_Type')}</label>
                                                            <select
                                                                data-val="true"
                                                                value={this.state.permittypeid}
                                                                onChange={(e) => this.onChangePermitType(e)}
                                                                className="edit-form"
                                                                required>
                                                                <option value="">{this.props.t('Permit_Type')}</option>
                                                                {this
                                                                    .state
                                                                    .permittypelist
                                                                    .map((permit, index) => <option key={index} value={permit.commonmasterid}>{permit.name}</option>)}
                                                            </select>
                                                        </div>
                                                        {this.state.isCarPalte === true &&
                                                            <div>
                                                                {
                                                                    this.state.carplatepermitlist.map((doc, idx) => {
                                                                        let vehicleid = `vehicleid-${idx}`
                                                                        return (
                                                                            <div key={idx} >
                                                                                <div className="form-group" style={{ marginTop: '10px' }}>
                                                                                    <div className="col-md-6 col-lg-12 col-sm-12" style={{ marginTop: '20px' }}>
                                                                                        <label htmlFor="vehType">{this.props.t('Plate_Source')}</label>
                                                                                        <select
                                                                                            data-val="true"
                                                                                            value={this.state.carplatepermitlist.platesourceid}
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
                                                                                            value={this.state.carplatepermitlist.platecategoryid}
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
                                                                                            value={this.state.carplatepermitlist.platecodeid}
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
                                                                                        <label htmlFor="vehType">{this.props.t('Vehicles')}</label>
                                                                                        <select
                                                                                            name={vehicleid}
                                                                                            id={vehicleid}
                                                                                            data-val={idx}
                                                                                            data-id={idx}
                                                                                            value={this.state.carplatepermitlist.vehicleid}
                                                                                            onChange={(e) => this.vehiclePlateChange(e)}
                                                                                            className="edit-form "
                                                                                            required
                                                                                        >
                                                                                            <option key="" value="">{this.props.t('Vehicles')}</option>
                                                                                            {this
                                                                                                .state
                                                                                                .vehiclelist
                                                                                                .map((vehList, index) => <option key={index} value={vehList.vehicleid}>{vehList.trafficnumber}&nbsp;{vehList.make}&nbsp;{vehList.model}
                                                                                                    &nbsp;{vehList.yearmanufacture}</option>)}
                                                                                        </select>

                                                                                    </div>
                                                                                    <span style={{ fontSize: '18px', cursor: 'pointer', marginRight: '10px' }} onClick={this.removeCarPlatePermit(idx)} ><i className="fa fa-trash" multiple /></span>
                                                                                    <span style={{ fontSize: '18px', cursor: 'pointer' }} onClick={this.addCarPlatePermit(idx)} ><i className="fa fa-plus" multiple /></span>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                        {this.state.isCommerLicense === true &&
                                                            <div>
                                                                <div className="form-group">
                                                                    <div className="col-md-6 col-lg-12 col-sm-12">
                                                                        <label htmlFor="vehType">{this.props.t('Company')}</label>
                                                                        <select
                                                                            data-val="true"
                                                                            name="companyid"
                                                                            value={this.state.companyid}
                                                                            onChange={(e) => this.onChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                            <option value="">{this.props.t('Company')}</option>
                                                                            {this
                                                                                .state
                                                                                .companylist
                                                                                .map((comp, index) => <option key={index} value={comp.companyid}>{comp.nameen}
                                                                                </option>)}
                                                                        </select> <br />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                                        <label htmlFor="vehType">{this.props.t('Company')}{this.props.t('Activity')}</label>
                                                                        <select
                                                                            style={{ height: '200px' }}
                                                                            data-val="true"
                                                                            multiple="multiple"
                                                                            value={this.state.activityidlist}
                                                                            onChange={(e) => this.activityChange(e)}
                                                                            className="edit-form"
                                                                            required>
                                                                            <option value="">{this.props.t('Activity')}</option>
                                                                            {this
                                                                                .state
                                                                                .companyactivitylist
                                                                                .map((activity, index) => <option key={index} value={activity.commonmasterid}>{activity.name}</option>)}
                                                                        </select><br />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {this.state.isDriver === true &&
                                                            <div className="form-group">
                                                                <label>Driver (Company)</label>
                                                                <select
                                                                    data-val="true"
                                                                    value={this.state.driverid}
                                                                    onChange={(e) => this.driverChange(e)}
                                                                    className="edit-form " required>
                                                                    {this.state.driverlist
                                                                        .map((driver, index) => <option key={index} value={driver.individualid}>{driver.nameen}&nbsp;({driver.companyname})</option>)}
                                                                </select>
                                                            </div>}
                                                        {this.state.isConductor === true &&
                                                            <div className="form-group">
                                                                <label>Conductor (Company)</label>
                                                                <select
                                                                    data-val="true"
                                                                    value={this.state.driverid}
                                                                    onChange={(e) => this.driverChange(e)}
                                                                    className="edit-form " required>
                                                                    {this.state.driverlist
                                                                        .map((driver, index) => <option key={index} value={driver.individualid}>{driver.nameen}&nbsp;({driver.companyname})</option>)}
                                                                </select>
                                                            </div>}
                                                        {this.state.isComapny === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label htmlFor="vehType">{this.props.t('Company')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.companyid}
                                                                        name="companyid"
                                                                        onChange={(e) => this.onChange(e)}
                                                                        className="edit-form"
                                                                        required >
                                                                        <option key="" value="">{this.props.t('Company')}</option>
                                                                        {this
                                                                            .state
                                                                            .companylist
                                                                            .map((comp, index) => <option key={index} value={comp.companyid}>{comp.nameen}
                                                                            </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {this.state.isPrivate === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label htmlFor="vehType">{this.props.t('Vehicles')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.vehicleid}
                                                                        onChange={(e) => this.vehicleChange(e)}
                                                                        className="edit-form "
                                                                        required
                                                                    >
                                                                        <option key="" value="">{this.props.t('Vehicles')}</option>
                                                                        {this
                                                                            .state
                                                                            .vehiclelist
                                                                            .map((vehList, index) => <option key={index} value={vehList.vehicleid}>{vehList.trafficnumber}&nbsp;{vehList.make}&nbsp;{vehList.model}
                                                                                &nbsp;{vehList.yearmanufacture}</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {this.state.isRented === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label htmlFor="vehType">{this.props.t('Vehicle')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.vehicleid}
                                                                        onChange={(e) => this.vehicleChange(e)}
                                                                        className="edit-form "
                                                                        required
                                                                    >
                                                                        <option key="" value="">{this.props.t('Vehicle')}</option>
                                                                        {this
                                                                            .state
                                                                            .rentedvehiclelist
                                                                            .map((vehList, index) => <option key={index} value={vehList.vehicleid}>{vehList.trafficnumber}&nbsp;{vehList.make}&nbsp;{vehList.model}
                                                                                &nbsp;{vehList.yearmanufacture}</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {/*this.state.isGPS === false &&
                                                <div className="form-group">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <label htmlFor="vehType">{this.props.t('Company')}</label>
                                                        <select
                                                            data-val="true"
                                                            name="companyid"
                                                            value={this.state.companyid}
                                                            onChange={(e) => this.onChange(e)}
                                                            className="edit-form" required >
                                                            <option key="" value="">{this.props.t('Company')}</option>
                                                            {this
                                                                .state
                                                                .companylist
                                                                .map((comp, index) => <option key={index} value={comp.companyid}>
                                                                    {comp.nameen}
                                                                </option>)}
                                                        </select>
                                                    </div>
                                                </div>*/}
                                                        {this.state.isVehComp === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label htmlFor="vehType">{this.props.t('Company')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.companyid}
                                                                        onChange={(e) => this.onVehCompChange(e)}
                                                                        className="edit-form" >
                                                                        <option key="" value="">{this.props.t('Company')}</option>
                                                                        {this
                                                                            .state
                                                                            .companylist
                                                                            .map((comp, index) => <option key={index} value={comp.companyid}>
                                                                                {comp.nameen}
                                                                            </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {this.state.isLocation === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label style={{ marginTop: '10px' }}>{this.props.t('Location')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.permitlocationid}
                                                                        onChange={(e) => this.onChangeLocation(e)}
                                                                        className="edit-form"
                                                                        required>
                                                                        <option key="" value="">{this.props.t('Location')}</option>
                                                                        {this
                                                                            .state
                                                                            .locationlist
                                                                            .map((location, index) => <option key={index} value={location.permitlocationid}>
                                                                                {location.name}
                                                                            </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {this.state.isCapacity === true &&
                                                            <div className="form-group">
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label style={{ marginTop: '10px' }}>{this.props.t('Capacity')}</label>
                                                                    <select
                                                                        data-val="true"
                                                                        value={this.state.permitcapacityid}
                                                                        onChange={(e) => this.onChangeCapacity(e)}
                                                                        className="edit-form"
                                                                        required>
                                                                        <option key="" value="">{this.props.t('Capacity')}</option>
                                                                        {this
                                                                            .state
                                                                            .capacitylist
                                                                            .map((capacity, index) => <option key={index} value={capacity.permitcapacityid}>
                                                                                {capacity.name} &nbsp;{this.props.t('passenger')}
                                                                            </option>)}
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        {this.state.isDuration === true && <div className="form-group">
                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                <label style={{ marginTop: '10px' }}>{this.props.t('Duration')}</label>
                                                                <select
                                                                    data-val="true"
                                                                    value={this.state.permitdurationid}
                                                                    onChange={(e) => this.onChangeDuration(e)}
                                                                    className="edit-form"
                                                                    required>
                                                                    <option key="" value="">{this.props.t('Duration')}</option>
                                                                    {this
                                                                        .state
                                                                        .durationlist
                                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>
                                                                            {duration.name}
                                                                        </option>)}
                                                                </select>
                                                            </div>
                                                        </div>}
                                                        {this.state.isWeight === true && <div className="form-group">
                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                <label style={{ marginTop: '10px' }}>{this.props.t('Weight')}</label>
                                                                <select
                                                                    data-val="true"
                                                                    value={this.state.permitweightid}
                                                                    onChange={(e) => this.onChangeWeight(e)}
                                                                    className="edit-form"
                                                                    required>
                                                                    <option key="" value="">{this.props.t('Weight')}</option>
                                                                    {this
                                                                        .state
                                                                        .weightlist
                                                                        .map((dur, index) => <option key={index} value={dur.permitweightid}>
                                                                            {dur.name}
                                                                        </option>)}
                                                                </select>
                                                            </div>
                                                        </div>}
                                                        {this.state.isDriver === true &&
                                                            <div className="form-group" style={{ marginTop: '10px' }}>
                                                                <table><tr>
                                                                    <td> <label>School Bus Permit</label></td>
                                                                    <td><input style={{ marginLeft: '10px' }}
                                                                        name="isthisschoolbuspermit"
                                                                        checked={this.state.isthisschoolbuspermit}
                                                                        onChange={(e) => this.toggleChangeisschool(e)}
                                                                        type="checkbox"
                                                                        className="edit-form"
                                                                    /></td>
                                                                </tr></table>
                                                            </div>
                                                        }
                                                        {this.state.isPrivate === true &&
                                                            <div className="form-group" style={{ marginTop: '10px' }}>
                                                                <table><tr>
                                                                    <td> <label>Religions School </label></td>
                                                                    <td><input style={{ marginLeft: '10px' }}
                                                                        name="isthisreligionsschool"
                                                                        checked={this.state.isthisreligionsschool}
                                                                        onChange={(e) => this.toggleChangeisschool(e)}
                                                                        type="checkbox"
                                                                        className="edit-form"
                                                                    /></td>
                                                                </tr></table>

                                                            </div>

                                                        }
                                                        {this.state.isCarPalte === true && <br />}

                                                        {this.state.prerequisitionsdocuments.length > 0 &&
                                                            <div className="form-group" style={{ marginTop: '10px' }}>
                                                                <label>Required Documents </label>
                                                                {this
                                                                    .state
                                                                    .prerequisitionsdocuments
                                                                    .map((prerequisition, index) =>
                                                                        <p>
                                                                            - {prerequisition}
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        }
                                                        <div className="form-group">
                                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                                <label style={{ width: '99%' }} htmlFor="documents">{this.props.t('Upload_Documents')}</label>&nbsp;
                                        {
                                                                    this.state.docfile.map((doc, idx) => (
                                                                        <div className="shareholder" key={idx}>
                                                                            <input style={{ width: '100%' }}
                                                                                type="file"
                                                                                alt="doc"
                                                                                placeholder={`Document #${idx + 1} name`}
                                                                                onChange={this.handleDocsImgChange(idx)} />
                                                                            <button type="button" style={{ marginBottom: '5px', fontSize: '18px' }} onClick={this.handleRemoveDocs(idx)} ><i className="fa fa-trash" multiple /></button>
                                                                            <button type="button" style={{ marginBottom: '5px', fontSize: '18px' }} onClick={this.handleAddDocs} ><i className="fa fa-plus" multiple /></button>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                        <br /><br /><br /><br /><br />
                                                        {
                                                            this.state.isQuickProces === true &&
                                                            <div>
                                                                <div className="form-group">
                                                                    <table><tr>
                                                                        <td> <label>{this.props.t('Quick_Process')}</label></td>
                                                                        <td><input style={{ marginLeft: '10px' }}
                                                                            name="franchise"
                                                                            checked={this.state.quickproces}
                                                                            onChange={(e) => this.toggleChange(e)}
                                                                            type="checkbox"
                                                                            className="edit-form"
                                                                            placeholder="e.g John Stones" /></td>
                                                                    </tr></table>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div>
                                                            <div className="form-group" style={{ textAlign: 'center', marginTop: '30px' }}>
                                                                <label>{this.props.t('Pay_For_Permit')} - ({this.state.price} AED)</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="center">
                                                        <button
                                                            id="hidePopUpBtn"
                                                            type="button"
                                                            className="btn btn-blank"
                                                            data-dismiss="modal">{this.props.t('Close')}</button>
                                                        <button type="submit" className="btn btn-primary">{this.props.t('Save_Changes')}</button>
                                                    </div></div>
                                            }
                                            {this.state.isPayment === true && this.state.price > 0 &&
                                                < div className="modal-body">
                                                    <div className="form-group" style={{ textAlign: 'center', marginTop: '30px' }}>
                                                        <label>{this.props.t('Pay_For_Permit')} - ({this.state.price} AED)</label>
                                                    </div>
                                                    <PermitPayment price={this.state.price} permitmainid={this.state.permitmainid} />
                                                </div>
                                            }
                                            <br /> <br />
                                        </form>
                                    )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default translate(RequestPermit);
