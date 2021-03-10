import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from './../../../config';

class RenewPermit extends Component {
    displayName = RenewPermit.name

    constructor(props) {
        super(props);
        var today = new Date(), validfromDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var validtoDate = today.getFullYear() + 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            amountSum: 0,
            codeValuePrice: 0,
            permitList: [],

            indListPermit: [],
            vehListPermit: [],
            compListPermit: [],

            locationLists2: [],
            locationLists3: [],

            capacityLists2: [],
            capacityLists3: [],

            weightLists: [],

            priceLocation: 0,
            priceDuration: 0,
            priceWeight: 0,
            permitcapacityid: 0,
            permitmainid: 0,
            permitid: 0,
            permittypeid: 0,
            permittype: '',
            individualid: 0,
            nameen: '',
            namear: '',
            companyid: 0,
            company: '',
            vehicleid: 0,
            platenumber: '',
            permitdurationid: 0,
            duration: "",
            location: "",
            permitlocationid: 0,
            capacity: "",
            permitweightid: 0,
            weight: "",
            amount: "",
            validfrom: validfromDate,
            validto: validtoDate,
            rejectreason: "",
            isactive: true,
            statusid: 420,
            accepteddate: null,
            createdby: 1,
            fileList: [],
            permitfileslist: [
                {
                    permitfiletypeid: 1,
                    permitfilephoto: "permitfileslistphoto_1",
                    permitfilename: "permitfileslistname_1"
                },
                {
                    permitfiletypeid: 2,
                    permitfilephoto: "permitfileslistphoto_2",
                    permitfilename: "permitfileslistname_2"
                }
            ],
            documentnumber: "doc_1",
            totalpermitfee: 0,
            inspectionfee: 12,
            permitslist: [],


            docClass: "PERM",

            docClassAll: [],
            docTypesAll: [],

            locationLists408: [],
            locationLists409: [],
            capacityListsAll: [],

            durationLists408: [],
            durationLists409: [],
            durationLists410: [],
            durationLists411: [],
            durationLists412: [],
            durationLists413: [],
            durationLists414: [],
            durationLists415: [],
            durationLists416: [],
            durationLists417: [],
            durationLists418: []
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);


        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 5)
            .then(response => response.json())
            .then(data => {
                this.setState({ docClassAll: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 7)
            .then(response => response.json())
            .then(data => {
                this.setState({ docTypesAll: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 23)
            .then(response => response.json())
            .then(data => {
                this.setState({ permitList: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_companyName")
            .then(response => response.json())
            .then(data => {
                this.setState({ compListPermit: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data, loading: false });
            });

        //START LOCATION APIS

        fetch(config.webApiUrl() + "aptc_getPermitLocation/" + localStorage.getItem('selectedLanguageCode') + "/" + 408)
            .then(response => response.json())
            .then(data => {
                this.setState({ locationLists408: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getPermitLocation/" + localStorage.getItem('selectedLanguageCode') + "/" + 409)
            .then(response => response.json())
            .then(data => {
                this.setState({ locationLists409: data, loading: false });
            });

        //END LOCATION APIS

        //START CAPACITY APIS

        fetch(config.webApiUrl() + "aptc_getPermitCapacity/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ capacityListsAll: data, loading: false });
            });

        //END CAPACITY APIS
        //START WEIGHT APIS

        fetch(config.webApiUrl() + "aptc_getPermitWeight/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ weightLists: data, loading: false });
            });
        //END WEIGHT APIS
        //START DURATION  APIS
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 410 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists410: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 411 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists411: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 413 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists413: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 414 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists414: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 415 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists415: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 416 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists416: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 417 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists417: data, loading: false });
            });
        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 418 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists418: data, loading: false });
            });

        //END DURATION APIS

    }


    componentDidMount() {
        this.getEmployees();
        this.getVehicles();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cRNumID: nextProps.cRNumID,
            permittypeid: nextProps.permittypeid,
            permittype: nextProps.permittype,
            nameen: nextProps.nameen,
            namear: nextProps.namear,
            docClass: nextProps.docClass,
            companyid: nextProps.companyid,
            company: nextProps.company,
            platenumber: nextProps.platenumber,
            permitdurationid: nextProps.permitdurationid,
            duration: nextProps.duration,
            permitlocationid: nextProps.permitlocationid,
            location: nextProps.location,
            permitcapacityid: nextProps.permitcapacityid,
            capacity: nextProps.capacity,
            permitweightid: nextProps.permitweightid,
            weight: nextProps.weight,
            amount: nextProps.amount,
            status: nextProps.status,
            validfrom: nextProps.validfrom,
            validto: nextProps.validto,
            rejectreason: nextProps.rejectreason,
            isactive: nextProps.isactive,
            accepteddate: nextProps.accepteddate,
            individualid: nextProps.individualid,
            vehicleid: nextProps.vehicleid,
            permitfileslist: nextProps.permitfileslist,
            companyactivityfees: nextProps.companyactivityfees
        });
    }



    getVehicles = () => {
        var _id = this.props.cRNumID;
        var _compName = this.props.compName;

        fetch(config.webApiUrl() + "aptc_company_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ vehListPermit: data, loading: false, companyid: _id, company: _compName });
            });
    };
    getEmployees = () => {
        var _id = this.props.cRNumID;
        var _compName = this.props.compName;

        fetch(config.webApiUrl() + "aptc_company_getEmployees/" + localStorage.getItem('selectedLanguageCode') + "/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ indListPermit: data, loading: false, companyid: _id, company: _compName });
            });
    }


    /**START NEW DOCUMENTS */
    /*Start Docs*/
    handleDocsNameChange = (idx) => (evt) => {
        const newpermitfilename = this
            .state
            .permitfileslist
            .map((permitfileslistOne, vidx) => {
                if (idx !== vidx)
                    return permitfileslistOne;
                return {
                    ...permitfileslistOne,
                    permitfilename: evt.target.value
                };
            });
        this.setState({ permitfileslist: newpermitfilename });
    }
    handleDocsImgChange = (idx) => (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            var file = evt.target.files[0];
            var permitfileslist = this.state.fileList;
            var objFile = {};
            var reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            reader.onload = function () {
                objFile.permitfilename = file.type.split('/')[1];
                objFile.permitfilephoto = reader.result;
                permitfileslist.push(objFile);
            };
            reader.onerror = function (error) {
                alert('Error: ', error);
            };
            this.setState({ fileList: permitfileslist });
        }
    }
    handleAddDocs = () => {
        var files = this.state.fileList;
        if (this.state.fileList.length === 0) {
            alert('please upload document');
            return;
        }
        else {
            this.setState({
                permitfileslist: this
                    .state
                    .permitfileslist
                    .concat([
                        {
                            permitfiletypeid: 1,
                            permitfilename: "",
                            permitfilephoto: ""
                        }
                    ])
            });
        }
    };
    handleRemoveDocs = (idx) => () => {
        this.setState({
            permitfileslist: this
                .state
                .permitfileslist
                .filter((v, vidx) => idx !== vidx)
        });
    };

    /*End  Docs*/

    fileSelectedHandler(evt) {
        var objFile = {};
        var permitfileslist = [];
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(evt.target.files[0]);
        reader.onload = function () {
            objFile.permitfilename = file.type.split('/')[1];
            objFile.permitfilephoto = reader.result;
            objFile.permitfiletypeid = objFile.permitfiletypeid + 1;
            permitfileslist.push(objFile);
            this.setState({ permitfileslist: permitfileslist });
        };
    }
    /* END OF DOCUMENTS*/

    getamountSumDueDuration() {
        let amountSum = 0;

        let amount = amountSum;
        this.state.amount = amount;

        let amountSumDueDuration = 0;
        amountSumDueDuration = this.state.priceDuration;

        amountSum = parseInt(amountSumDueDuration);
        this.state.amount = amountSum;

    }
    getamountSumDueLocationDuration() {
        let amountSum = 0;

        let amount = amountSum;

        this.state.amount = amount;

        let amountSumDueLocation = 0;
        let amountSumDueDuration = 0;
        amountSumDueLocation = this.state.priceLocation;
        amountSumDueDuration = this.state.priceDuration;

        amountSum = parseInt(amountSumDueLocation) + parseInt(amountSumDueDuration);
        this.state.amount = amountSum;
    }
    getamountSumDueWeight() {
        let amountSum = 0;

        let amount = amountSum;
        this.state.amount = amount;

        let amountSumDueWeight = 0;
        amountSumDueWeight = this.state.priceWeight;

        amountSum = parseInt(amountSumDueWeight);
        this.state.amount = amountSum;
    }

    getamountSumDueTypeDuration() {
        let amountSum = 0;

        let amount = amountSum;
        this.state.amount = amount;

        let amountSumDueDuration = 0;
        let privateCompaniesPrice = 0;

        amountSumDueDuration = this.state.priceDuration;
        privateCompaniesPrice = this.state.codeValuePrice;

        amountSum = parseInt(amountSumDueDuration) + parseInt(privateCompaniesPrice);
        this.state.amount = amountSum;

    }

    onChangedocType = (e) => {
        this.getVehicles();
        this.getEmployees();

        var selectedValue = e.target.value;
        this.setState({ permittypeid: selectedValue });

        var permittypeValue = document.getElementById('permit-type').options[document.getElementById('permit-type').selectedIndex].text;
        this.setState({ permittype: permittypeValue });
    };


    onChangeCapacity408 = (e) => {
        e.preventDefault();
        let selectedValue = e.target.value;
        this.setState({ permitcapacityid: parseInt(selectedValue) });
        var capacityValue = document.getElementById('capacity-rented-buses').options[document.getElementById('capacity-rented-buses').selectedIndex].text;
        this.setState({ capacity: capacityValue });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 408 + "/" + selectedValue)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists408: data, loading: false });
            });
    };

    onChangeCapacity409 = (e) => {
        e.preventDefault();
        let selectedValue = e.target.value;
        this.setState({ permitcapacityid: parseInt(selectedValue) });
        var capacityValue = document.getElementById('capacity-private-buses').options[document.getElementById('capacity-private-buses').selectedIndex].text;
        this.setState({ capacity: capacityValue });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 409 + "/" + selectedValue)
            .then(response => response.json())
            .then(data => {
                this.setState({ durationLists409: data, loading: false });
            });

    };

    onChangedocClass = (e) => {
        this.setState({ docClass: e.target.value });
    };


    individualChange = (e) => {
        var _id = e.target.value;
        this.setState({ individualid: _id });
        var nameenValue = document.getElementById('nameen').options[document.getElementById('nameen').selectedIndex].text;
        this.setState({ nameen: nameenValue });

        fetch(config.webApiUrl() + "aptc_employee_edit/" + _id)
            .then(response => response.json())
            .then(data => {
                var tempRole = data.namear;
                this.setState({ namear: tempRole });
            });
    };

    vehicleChange = (e) => {
        var _id = e.target.value;
        this.setState({ vehicleid: _id });

        fetch(config.webApiUrl() + "aptc_vehicle_edit/" + _id)
            .then(response => response.json())
            .then(data => {
                var tempRole = data.platenumber;
                this.setState({ platenumber: tempRole });
            });
    };

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangevecListPermit = (e) => {
        this.setState({ franchise: e.target.value });
    };


    /*START ALL DURATION VALUES */
    onChangeDurationBuses408 = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-buses-408').options[document.getElementById('duration-buses-408').selectedIndex].text;
        this.setState({ duration: durationValue });

        var capacityidValue = this.state.permitcapacityid;

        fetch(config.webApiUrl() + "aptc_getPermitDuration/1/408/" + capacityidValue)
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole = models;
                    }
                }
                this.setState({ priceDuration: tempRole });
            });

    }

    onChangeDurationBuses409 = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-buses-409').options[document.getElementById('duration-buses-409').selectedIndex].text;
        this.setState({ duration: durationValue });

        var capacityidValue = this.state.permitcapacityid;

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + " /" + 409 + "/" + capacityidValue)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });
    }


    onChangeDurationTourism = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-tourism').options[document.getElementById('duration-tourism').selectedIndex].text;
        let duration = durationValue;
        this.setState({ duration: duration });


        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + " /" + 410 +"/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });

    }

    onChangeDurationHotel = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-hotel').options[document.getElementById('duration-hotel').selectedIndex].text;

        let duration = durationValue;
        this.setState({ duration: duration });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode')  + "/" + 411 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });

    }


    onChangeDurationPrivateCompanies = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-private-companies').options[document.getElementById('duration-private-companies').selectedIndex].text;

        let duration = durationValue;
        this.setState({ duration: duration });


        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 414 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });

    }


    onChangeDurationDriver = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-driver').options[document.getElementById('duration-driver').selectedIndex].text;

        let duration = durationValue;
        this.setState({ duration: duration });


        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 415 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });
    }


    onChangeDurationConductor = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-conductor').options[document.getElementById('duration-conductor').selectedIndex].text;

        let duration = durationValue;
        this.setState({ duration: duration });


        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 416 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });

    }

    onChangeDurationRep = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitdurationid: intSelectedValue });
        var durationValue = document.getElementById('duration-comp-rep').options[document.getElementById('duration-comp-rep').selectedIndex].text;

        let duration = durationValue;
        this.setState({ duration: duration });

        fetch(config.webApiUrl() + "aptc_getPermitDuration/" + localStorage.getItem('selectedLanguageCode') + "/" + 417 + "/" + 0)
            .then(response => response.json())
            .then(data => {
                var tempRole2 = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitdurationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole2 = models;
                    }
                }
                this.setState({ priceDuration: tempRole2 });
            });



    }


    /*END ALL DURATION VALUES */


    /*START ALL LOCATION VALUES */
    onChangeLocationRentedBuses = (e) => {
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitlocationid: intSelectedValue });

        var locationValue = document.getElementById('location-rented-buses').options[document.getElementById('location-rented-buses').selectedIndex].text;

        let location = locationValue;
        this.setState({ location: location });

        fetch(config.webApiUrl() + "aptc_getPermitLocation/" + localStorage.getItem('selectedLanguageCode') + "/" + 408)
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitlocationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole = models;
                    }
                }
                this.setState({ priceLocation: tempRole });
            });
    }


    onChangeLocationPrivateBuses = (e) => {

        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitlocationid: intSelectedValue });

        var locationValue = document.getElementById('location-private-buses').options[document.getElementById('location-private-buses').selectedIndex].text;

        let location = locationValue;
        this.setState({ location: location });

        fetch(config.webApiUrl() + "aptc_getPermitLocation/" + localStorage.getItem('selectedLanguageCode') + "/" + 409)
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitlocationid == intSelectedValue) {
                        let models = data[i].price;
                        tempRole = models;
                    }
                }
                this.setState({ priceLocation: tempRole });
            });
    }


    /*END ALL LOCATION VALUES */


    /*START ALL WEIGHT VALUES */

    onChangeWeight = (e) => {
        //this.setState({ priceWeight: parseInt(e.target.value) });
        var selectedValue = e.target.value;
        var intSelectedValue = parseInt(selectedValue);
        this.setState({ permitweightid: intSelectedValue });

        var weightValue = document.getElementById('weight').options[document.getElementById('weight').selectedIndex].text;
        this.setState({ weight: weightValue });

        fetch(config.webApiUrl() + "aptc_getPermitWeight/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                var tempRole = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].permitweightid == intSelectedValue) {
                        let models = data[i].fees;
                        tempRole = models;
                    }
                }
                this.setState({ priceWeight: tempRole });
            });



    };
    /*END ALL WEIGHT VALUES */


    onChangeamount = (e) => {
        let amount = e.target.value;
        this.state.amount = amount;

    }
    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item, 'update');
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        var totalpermitfee = parseInt(this.state.inspectionfee) + parseInt(this.state.amount);

        var obj = {};
        obj.permittypeid = this.state.permittypeid;
        obj.individualid = parseInt(this.state.individualid);
        obj.companyid = this.state.companyid;

        if (parseInt(this.state.vehicleid) > 0)
            obj.vehicleid = parseInt(this.state.vehicleid);

        if (this.state.permitweightid > 0) {
            obj.permitweightid = this.state.permitweightid;
        }
        if (this.state.permitweightid < 1) {
            obj.permitdurationid = this.state.permitdurationid;
            obj.permitlocationid = this.state.permitlocationid;
            obj.permitcapacityid = this.state.permitcapacityid;
        }
        obj.amount = (this.state.amount).toString();
        obj.documentnumber = this.state.documentnumber;
        obj.validfrom = this.state.validfrom;
        obj.validto = this.state.validto;
        obj.rejectreason = this.state.rejectreason;
        obj.permitfileslist = this.state.fileList;
        var objPermit = {};
        objPermit.totalpermitfee = totalpermitfee;
        objPermit.inspectionfee = this.state.inspectionfee;
        objPermit.createdby = this.state.createdby;
        var docPermits = [];
        docPermits.push(obj);
        objPermit.permitslist = docPermits;


        console.log(obj);
        debugger;

        const doc = JSON.stringify(objPermit);

        var _id = this.props.cRNumID;

        axios
            .put(config.webApiUrl() + 'aptc_permit', doc, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.res.data !== null) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.response);
                }

            });
    }

    render() {

        console.log("price location " + this.state.priceLocation + " price duration " + this.state.priceDuration + " capacity " + this.state.capacity + " capacityid " + this.state.permitcapacityid + " plateNumber " + this.state.platenumber);
        console.log("price duration " + this.state.priceDuration);
        console.log("duration " + this.state.duration + " location " + this.state.location);
        console.log("weight " + this.state.weight + " weight price " + this.state.priceWeight);
        console.log("codeValuePrice " + this.state.codeValuePrice);
        console.log("full amountSum " + this.state.amount);
        console.log("permittypeid " + this.state.permittypeid);
        console.log("crNumID props " + this.props.cRNumID + " " + this.props.compName);
        console.log("locationValue " + this.state.priceLocation);
        return (
            <div id="close">
                <div
                    className="modal fade"
                    id="renewModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="renewModalLabel">
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
                                            <label>Permit Type</label>
                                            <select id="permit-type"
                                                data-val="true"
                                                value={this.state.permittypeid}
                                                onChange={(e) => this.onChangedocType(e)}
                                                className="edit-form"
                                                required>
                                                <option value="">- Permit Type -</option>
                                                {this
                                                    .state
                                                    .permitList
                                                    .map((permit, index) => <option key={index} value={permit.commonmasterid}>{permit.name}</option>)}
                                            </select><br />
                                        </div>
                                    </div>


                                    {this.state.permittypeid === (408).toString() ||  this.state.permittypeid === (409).toString() ||  this.state.permittypeid === (410).toString() ||  this.state.permittypeid === (411).toString() ||  this.state.permittypeid === (412).toString() ||  this.state.permittypeid === (414).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Search Vehicles</label>
                                                <select
                                                    data-val="true"
                                                    value={this.state.vehicleid}
                                                    onChange={(e) => this.vehicleChange(e)}
                                                    className="edit-form "
                                                    required>
                                                    <option value="">- Vehicle Reg No. -</option>
                                                    {this
                                                        .state
                                                        .vehListPermit
                                                        .map((vehList, index) => <option key={index} value={vehList.vehicleid}>{vehList.chassisnumber}&nbsp;{vehList.make}&nbsp;{vehList.model}&nbsp;{vehList.yearmanufacture}</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (415).toString() || this.state.permittypeid === (416).toString() || this.state.permittypeid === (408).toString() ||  this.state.permittypeid === (409).toString() ||  this.state.permittypeid === (410).toString() ||  this.state.permittypeid === (411).toString() ||  this.state.permittypeid === (412).toString() ||  this.state.permittypeid === (414).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Search Individual</label>
                                                <select
                                                    id="nameen"
                                                    data-val="true"
                                                    value={this.state.individualid}
                                                    onChange={(e) => this.individualChange(e)}
                                                    className="edit-form "
                                                    required>
                                                    <option value="">- Permit Owner -</option>
                                                    {this.state.indListPermit
                                                        .map((indList, index) => <option key={index} value={indList.individualid}>{indList.nameen}</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (408).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Location</label>
                                                <select id="location-rented-buses"
                                                    name="priceLocation"
                                                    data-val="true"
                                                    value={this.state.permitlocationid}
                                                    onChange={this.onChangeLocationRentedBuses}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Location-</option>
                                                    {this
                                                        .state
                                                        .locationLists408
                                                        .map((location, index) => <option key={index} value={location.permitlocationid}>{location.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (409).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Location</label>
                                                <select id="location-private-buses"
                                                    name="priceLocation"
                                                    data-val="true"
                                                    value={this.state.permitlocationid}
                                                    onChange={this.onChangeLocationPrivateBuses}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Location-</option>
                                                    {this
                                                        .state
                                                        .locationLists409
                                                        .map((location, index) => <option key={index} value={location.permitlocationid}>{location.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (408).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <br />
                                                <label>Capacity</label>
                                                <select id="capacity-rented-buses"
                                                    data-val="true"
                                                    value={this.state.permitcapacityid}
                                                    onChange={(e) => this.onChangeCapacity408(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Vehicle Capacity -</option>
                                                    {this
                                                        .state
                                                        .capacityListsAll
                                                        .map((cap, index) => <option key={index} value={cap.permitcapacityid}>{cap.name} passengers</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (409).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <br />
                                                <label>Capacity</label>
                                                <select id="capacity-private-buses"
                                                    data-val="true"
                                                    value={this.state.permitcapacityid}
                                                    onChange={(e) => this.onChangeCapacity409(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Vehicle Capacity -</option>
                                                    {this
                                                        .state
                                                        .capacityListsAll
                                                        .map((cap, index) => <option key={index} value={cap.permitcapacityid}>{cap.name} passengers</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (408).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-buses-408"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationBuses408(e)}
                                                    className="edit-form">
                                                    <option value="">- Duration -</option>
                                                    {this
                                                        .state
                                                        .durationLists408
                                                        .map((cap, index) => <option key={index} value={cap.permitdurationid}>{cap.name}</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}
                                    {this.state.permittypeid === (409).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-buses-409"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationBuses409(e)}
                                                    className="edit-form">
                                                    <option value="">- Duration -</option>
                                                    {this
                                                        .state
                                                        .durationLists409
                                                        .map((cap, index) => <option key={index} value={cap.permitdurationid}>{cap.name}</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}



                                    {this.state.permittypeid === (412).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Weight</label>
                                                <select id="weight"
                                                    data-val="true"
                                                    value={this.state.permitweightid}
                                                    onChange={(e) => this.onChangeWeight(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Weight-</option>
                                                    {this
                                                        .state
                                                        .weightLists
                                                        .map((weigh, index) => <option key={index} value={weigh.permitweightid}>{weigh.name} </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {/*START same fr04-fr12 */}

                                    {this.state.permittypeid === (410).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-tourism"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationTourism(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists410
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name}</option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (411).toString()  ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-hotel"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationHotel(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists411
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name} </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (414).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-private-companies"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationPrivateCompanies(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists414
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name} </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (415).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-driver"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationDriver(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists415
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name} </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (416).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-conductor"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationConductor(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists416
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name}  </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (417).toString() ?
                                        <div className="form-group">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <label>Duration</label>
                                                <select id="duration-comp-rep"
                                                    data-val="true"
                                                    value={this.state.permitdurationid}
                                                    onChange={(e) => this.onChangeDurationRep(e)}
                                                    className="edit-form"
                                                    required>
                                                    <option value="">- Duration-</option>
                                                    {this
                                                        .state
                                                        .durationLists417
                                                        .map((duration, index) => <option key={index} value={duration.permitdurationid}>{duration.name}  </option>)}
                                                </select><br />
                                            </div>
                                        </div>
                                        : null}

                                    {/*END same fr04-fr12 */}


                                    <div className="form-group">
                                        <label htmlFor="documents">Upload Documents</label>&nbsp;
                                     {this.state.permittypeid === (407).toString() ?
                                            <ul>
                                                <li>Rental agreement (Address) </li>
                                                <li>Record of registered vehicles</li>
                                                <li>Commercial License</li>
                                                <li>Owner Record</li>
                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (408).toString()  ?
                                            <ul>
                                                <li>Rental agreement</li>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>School&apos;s owner(s) record</li>
                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (409).toString()  ?
                                            <ul>
                                                <li>Commercial License</li>
                                                <li>A signed letter from the school</li>
                                                <li>Bus passes APTC buses checkup test</li>
                                                <li>Vehicle&apos;s ownership details</li>

                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (410).toString() ?
                                            <ul>
                                                <li>Commercial License</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>A signed letter from the company</li>
                                                <li>Company owner(s) record</li>
                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (411).toString()  ?
                                            <ul>
                                                <li>Commercial License</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>A signed letter from the hotel</li>
                                                <li>Hotel owner(s) record</li>
                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (412).toString()  ?
                                            <ul>
                                                <li>Rental agreement(if the company is from outside Ajman)</li>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>A signed letter from the company</li>
                                                <li>Company owner(s) record</li>
                                            </ul>
                                            : null}



                                        {this.state.permittypeid === (413).toString()  ?
                                            <ul>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>Company owner(s) record</li>
                                            </ul>
                                            : null}


                                        {this.state.permittypeid === (414).toString() ?
                                            <ul>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License (optional)</li>
                                                <li>Operating Card (optional)</li>
                                                <li>Company owner(s) record</li>
                                                <li>The contract between the two companies</li>
                                            </ul>
                                            : null}



                                        {this.state.permittypeid === (415).toString() ?
                                            <ul>
                                                <li>Emirati ID</li>
                                                <li>Driving License</li>
                                                <li>Photo</li>
                                                <li>Recent criminal record - for school drivers</li>
                                                <li>APTC training certificate.</li>
                                            </ul>
                                            : null}



                                        {this.state.permittypeid === (416).toString() ?
                                            <ul>
                                                <li>Emirati ID</li>
                                                <li>Photo</li>
                                                <li>APTC training certificate.</li>
                                                <li>Certificate of good conduct</li>
                                                <li>A medical certificate > 50 years&apos; old</li>
                                            </ul>
                                            : null}


                                        {this.state.permittypeid === (417).toString() ?
                                            <ul>
                                                <li>Emirati ID</li>
                                                <li>Photo</li>
                                                <li>Driving license</li>
                                                <li>No objection letter.</li>
                                            </ul>
                                            : null}

                                        {this.state.permittypeid === (418).toString() ?
                                            <ul>
                                                <li>Rental agreement</li>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>School&apos;s owner(s) record</li>
                                            </ul>
                                            : null}
                                        {this.state.permittypeid === (419).toString() ?
                                            <ul>
                                                <li>Rental agreement</li>
                                                <li>Commercial License</li>
                                                <li>Vehicle&apos;s ownership</li>
                                                <li>Operating License</li>
                                                <li>Operating Card</li>
                                                <li>School&apos;s owner(s) record</li>
                                            </ul>
                                            : null}
                                        {!this.state.permitfileslist ? null : (this.state.permitfileslist.map((doc, idx) => (
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="shareholder" key={idx}>
                                                        <input style={{ width: '520px' }}
                                                            className="upload-btn"
                                                            type="file"
                                                            alt="doc"
                                                            placeholder={`Document #${idx + 1} name`}
                                                            onChange={this.handleDocsImgChange(idx)}
                                                        />
                                                        <button type="button" onClick={this.handleRemoveDocs(idx)} className="small" style={{ marginTop: '2px' }}><i className="fa fa-trash-alt" multiple /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                        <button type="button" onClick={this.handleAddDocs} className="small">Add Docs</button>
                                    </div>
                                    <br /><br />


                                    {this.state.permittypeid === (408).toString()  ?
                                        <div>
                                            <div className="form-group">
                                                <div>{this.getamountSumDueLocationDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (409).toString()  ?
                                        <div>
                                            <div className="form-group">
                                                <div>{this.getamountSumDueLocationDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (410).toString() ?
                                        <div className="form-group">
                                            <div>
                                                <div>{this.getamountSumDueDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (411).toString()  ?
                                        <div className="form-group">
                                            <div>
                                                <div>{this.getamountSumDueDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (415).toString() ?
                                        <div className="form-group">
                                            <div>
                                                <div>{this.getamountSumDueDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (416).toString() ?
                                        <div className="form-group">
                                            <div>
                                                <div>{this.getamountSumDueDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}


                                    {this.state.permittypeid === (417).toString() ?
                                        <div>
                                            <div className="form-group">
                                                <div>{this.getamountSumDueWeight()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (412).toString()  ?
                                        <div>
                                            <div className="form-group">
                                                <div>{this.getamountSumDueWeight()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}

                                    {this.state.permittypeid === (414).toString() ?
                                        <div>
                                            <div className="form-group">
                                                <div>{this.getamountSumDueTypeDuration()}</div>
                                                <label><span className="pay-title">Pay for Permit - ({this.state.amount} AED)</span></label>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <label>Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        maxLength="14"
                                                        onChange={this.onChange}
                                                        value={this.state.cardNumber}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Card Number" /><br />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Start date</label>
                                                    <input
                                                        name="startDate"
                                                        onChange={this.onChange}
                                                        value={this.state.startDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="Start date" /><br />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>End date</label>
                                                    <input
                                                        name="endDate"
                                                        onChange={this.onChange}
                                                        value={this.state.endDate}
                                                        type="date"
                                                        className="edit-form"
                                                        placeholder="End date" /><br />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>CSV(3 last digits at the back of the card)</label>
                                                    <input
                                                        name="CSV"
                                                        maxLength="3"
                                                        onChange={this.onChange}
                                                        value={this.state.CSV}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Start date" />
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <label>Name on the card</label>
                                                    <input
                                                        name="nameOnCard"
                                                        maxLength="23"
                                                        onChange={this.onChange}
                                                        value={this.state.nameOnCard}
                                                        type="text"
                                                        className="edit-form"
                                                        placeholder="Name on card" />
                                                </div>
                                            </div>
                                        </div>

                                        : null}
                                </div>
                                <div className="">
                                    <button
                                        id="hidePopUpBtn"
                                        type="button"
                                        className="btn btn-blank"
                                        data-dismiss="modal">Close</button>
                                </div>
                                <div className="center">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default RenewPermit;
