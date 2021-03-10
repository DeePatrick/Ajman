import React, { Component } from 'react';
import * as config from '../../config';
import Loader from '../loader';

class ObjectView extends Component {
    displayName = ObjectView.name;
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            Action: "",
            search: '',
            loading: false,
            datalist: []
        };
    }
    componentWillReceiveProps(nextProps) {
        var url = config.webApiUrl();
        var tmpDataList = [];
        this.setState({ datalist: tmpDataList });
        switch (nextProps.Action) {
            case "Ownership":
                url = url + "aptc_getCompanyOwners/" + localStorage.getItem('selectedLanguageCode') + "/" + + nextProps.companyid;
                this.setState({ Action: "Ownership" });
                break;
            case "Roles":
                url = url + "aptc_employee_roles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                this.setState({ Action: "Roles" });
                break;
            case "Fines":
                if (nextProps.ActionType === "EMP") {
                    url = " aptc_employee_roles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                }
                else {
                    url = url + "aptc_company_getVehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                }
                this.setState({ Action: "Fines" });
                break;
            case "Vehicles":
                if (nextProps.ActionType === "EMP") {
                    url = url + "aptc_individual_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                }
                else {
                    url = url + "aptc_company_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                }
                this.setState({ Action: "Vehicles" });
                break;
            case "Incidents":
                url = url + "aptc_individual_getAllActiveVehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                this.setState({ Action: "Incidents" });
                break;
            case "ScoredCard":
                url = url + "aptc_individual_getAllActiveVehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                this.setState({ Action: "ScoredCard" });
                break;
            case "Documents":
                if (nextProps.ActionType === "EMP") {
                    url = url + "aptc_individual_documentuploads/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                }
                else {
                    url = url + "aptc_company_documentuploads/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                }
                this.setState({ Action: "Documents" });
                break;
            case "Permits":
                if (nextProps.ActionType === "EMP") {
                    url = url + "aptc_individual_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.individualid;
                }
                else {
                    url = url + "aptc_company_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                }
                this.setState({ Action: "Permits" });
                break;
            case "Employees":
                url = url + "aptc_company_getEmployees/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                this.setState({ Action: "Employees" });
                break;
            case "Activity":
                url = url + "aptc_getCompanyActivities/" + localStorage.getItem('selectedLanguageCode') + "/" + nextProps.companyid;
                this.setState({ Action: "Activity" });
                break;

        }
        this.bindData(url);

    }
    bindData(url) {
        this.setState({ loading: true });
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                this.setState({ datalist: data, numEmployeesCount: data.length, loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
            });
    }
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    render() {

        let filteredRoles = [];
        let filteredCompanyOwners = [];
        let filteredVehicles = [];
        let filteredFines = [];
        let filteredDocuments = [];
        let filteredPermits = [];
        let filteredIndividuals = [];
        let filteredActivities = [];

        if (this.state.Action === "Roles" && this.state.datalist.length > 0) {
            if (this.state.datalist.length > 0) {
                {
                        filteredRoles = this
                            .state
                            .datalist
                            .filter((vec) => {
                                return (vec.companyname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.departmentname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.rolename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                                );
                            });
                }
            }
        }
        if (this.state.Action === "Ownership" && this.state.datalist.length > 0) {
            if (this.state.datalist.length > 0) {
                {
                        filteredCompanyOwners = this
                            .state
                            .datalist
                            .filter((vec) => {
                                return (vec.partnername.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownerrolename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownerroletypename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                                );
                            });
                }
            }
        }
        if (this.state.Action === "Vehicles" && this.state.datalist.length > 0) {
            filteredVehicles = this
                .state
                .datalist
                .filter((vec) => {
                    if (vec.make === null || vec.transmissiontype === null || vec.fuelType === null) {
                        return (
                            "No Car Model"
                        );
                    }
                    else {
                        return (
                            vec.platenumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.trafficfilenumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.make.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.fuelType.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.chassisnumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                        );
                    }

                });
        }
        if (this.state.Action === "Fines") {
            filteredFines = this
                .state
                .datalist
                .filter((vec) => {
                    if (vec.makeModel === null || vec.transType === null || vec.fuelType === null) {
                        return (
                            "No fines"
                        );
                    }
                    else {
                        return (
                            vec.vehType.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.trafficNum.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            vec.make.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                        );
                    }

                });
        }
        if (this.state.Action === "Documents" && this.state.datalist.length > 0) {
            filteredDocuments = this.state.datalist.filter((per) => {
                if (per.documenttypename === null || per.documentnumber === null) {
                    return (
                        "No Document"
                    );
                }
                else {
                    return (
                        per.documentnumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        per.documenttypename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        per.validfrom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        per.validto.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        per.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    );
                }

            });
        }
        if (this.state.Action === "Permits" && this.state.datalist.length > 0) {
            filteredPermits = this.state.datalist.filter((per) => {
                if (per.permittype === null || per.platenumber === null) {
                    return (
                        "No Permit"
                    );
                }
                else {
                    return (
                        per.permittype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        per.platenumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    );
                }

            });
        }
        if (this.state.Action === "Employees" && this.state.datalist.length > 0) {
            if (this.state.datalist.length > 0) {
                {
                        filteredIndividuals = this
                            .state
                            .datalist
                            .filter((vec) => {
                                return (vec.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.emiratesid.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.state.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
                            });
                }
            }
        }
        if (this.state.Action === "Activity" && this.state.datalist.length > 0) {
            if (this.state.datalist.length > 0) {
                {

                        filteredActivities = this
                            .state
                            .datalist
                            .filter((vec) => {
                                return (vec.companyactivityname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                            });
                }
            }
        }
        return (
            <div>
                <div
                    className="modal"
                    id="objectModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="objectModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.loading === true
                                    && <div><Loader /></div>}
                                <div className="row" style={{ marginBottom: '10px' }}>
                                    <div className="subtitle-modal">
                                        {this.state.Action === "Vehicles" &&
                                            <div>
                                                No of Vehicles : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Fines" &&
                                            <div>
                                                No of Fines : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Roles" &&
                                            <div>
                                                No of Roles : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Ownership" &&
                                            <div>
                                                No of Ownership : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Documents" &&
                                            <div>
                                                Company Documents : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Permits" &&
                                            <div>
                                                Company Permits : {this.state.datalist.length}
                                            </div>
                                        }
                                        {this.state.Action === "Incidents" &&
                                            <div>
                                                <span>
                                                    No of Incidents : {this.state.datalist.length}
                                                </span>

                                            </div>
                                        }
                                        {this.state.Action === "ScoredCard" &&
                                            <div>
                                                <span>
                                                    No of ScoredCard : {this.state.datalist.length}
                                                </span>

                                            </div>
                                        }
                                        {this.state.Action === "Employees" &&
                                            <div>
                                                <span>
                                                    No of Employees : {this.state.datalist.length}
                                                </span>

                                            </div>
                                        }
                                        {this.state.Action === "Activity" &&
                                            <div>
                                                <span>
                                                    No of Activities : {this.state.datalist.length}
                                                </span>

                                            </div>
                                        }


                                    </div>
                                </div>
                                <div className="row" style={{ marginBottom: '10px' }}>
                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <div>
                                                    <input style={{ width: '96%' }}
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
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {this.state.Action === "Ownership" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {!filteredCompanyOwners.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredCompanyOwners.map((owner, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">  <img
                                                                id="icon-pics"
                                                                className="img-rounded"
                                                                src={require('../../assets/user-img.png')}
                                                                alt=""
                                                                height="40"
                                                                width="40" /> &nbsp;{owner.partnername} &nbsp; {owner.ownerroletypename} &nbsp; {owner.ownerrolename}
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Roles" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {!filteredRoles.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredRoles.map((role, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">  <img
                                                                id="icon-pics"
                                                                src={!this.state.companyPhoto
                                                                    ? require('../../assets/companylogos/norecord.png')
                                                                    : this.state.companyPhoto}
                                                                onError={(e) => {
                                                                    e.target.src = require('../../assets/companylogos/norecord.png');
                                                                }}
                                                                className="img-rounded"
                                                                alt="woman"
                                                                height="40"
                                                                width="40" /> &nbsp;{role.companyname} &nbsp;{role.departmentname} &nbsp; {role.rolename}
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Vehicles" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {!filteredVehicles.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredVehicles.map((vehicle, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">
                                                                <span><i id="circle-black-wrap" className="fa fa-car" /></span>
                                                                <span className="veh-text">
                                                                    {vehicle.trafficfilenumber} &nbsp; {vehicle.makel} - {vehicle.model} - {vehicle.colour}   &nbsp; {vehicle.yearmanufacture}</span>&nbsp;
                                                                    &nbsp;{vehicle.vehicletype} &nbsp; {vehicle.platenumber}

                                                                {
                                                                    vehicle.statusid === 420 &&
                                                                    <div className="pending btn-modal-active-veh pull-right">Pending</div>
                                                                }
                                                                {vehicle.statusid === 421 &&
                                                                    <div className=" approved btn-modal-active-veh pull-right">Approved</div>
                                                                }
                                                                {vehicle.statusid === 422 &&
                                                                    <div className="rejected btn-modal-active-veh pull-right">Rejected</div>
                                                                }

                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }

                                    {this.state.Action === "Fines" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {
                                                !filteredFines.length > 0 ?
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="col-md-4 col-lg-4 col-sm-5">
                                                            <img
                                                                id="icon-pics"
                                                                src={require('../../assets/companylogos/norecord.png')}
                                                                className="img-rounded"
                                                                alt="woman"
                                                                height="80"
                                                                width="80" />
                                                        </div>
                                                        <div className="col-md-8 col-lg-8 col-sm-7">
                                                            <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                        </div>
                                                    </div> :
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        {filteredFines.map((fine, index) => (
                                                            <ul className="list-group" key={index}>
                                                                <li
                                                                    className="list-group-item list-group-item-action">
                                                                    <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                                    Fine No:{fine.FineID}
                                                                    &nbsp;  Issued on :{fine.DateTime}
                                                                    &nbsp; Fined :{fine.Amount} &nbsp;{fine.Status ? <span className="btn btn-modal-active pull-right">Unpaid</span> : <span className="btn btn-modal-active pull-right">Paid</span>}</li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "ScoredCard" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {
                                                !this.state.datalist.length > 0 ?
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="col-md-4 col-lg-4 col-sm-5">
                                                            <img
                                                                id="icon-pics"
                                                                src={require('../../assets/companylogos/norecord.png')}
                                                                className="img-rounded"
                                                                alt="woman"
                                                                height="80"
                                                                width="80" />
                                                        </div>
                                                        <div className="col-md-8 col-lg-8 col-sm-7">
                                                            <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                        </div>
                                                    </div> :
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        {this.state.datalist.map((fine, index) => (
                                                            <ul className="list-group" key={index}>
                                                                <li
                                                                    className="list-group-item list-group-item-action">
                                                                    <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                                    Fine No:{fine.FineID}
                                                                    &nbsp;  Issued on :{fine.DateTime}
                                                                    &nbsp; Fined :{fine.Amount} &nbsp;{fine.Status ? <span className="btn btn-modal-active pull-right">Unpaid</span> : <span className="btn btn-modal-active pull-right">Paid</span>}</li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Incidents" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {
                                                !this.state.datalist.length > 0 ?
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="col-md-4 col-lg-4 col-sm-5">
                                                            <img
                                                                id="icon-pics"
                                                                src={require('../../assets/companylogos/norecord.png')}
                                                                className="img-rounded"
                                                                alt="woman"
                                                                height="80"
                                                                width="80" />
                                                        </div>
                                                        <div className="col-md-8 col-lg-8 col-sm-7">
                                                            <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                        </div>
                                                    </div> :
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        {this.state.datalist.map((fine, index) => (
                                                            <ul className="list-group" key={index}>
                                                                <li
                                                                    className="list-group-item list-group-item-action">
                                                                    <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                                    Fine No:{fine.FineID}
                                                                    &nbsp;  Issued on :{fine.DateTime}
                                                                    &nbsp; Fined :{fine.Amount} &nbsp;{fine.Status ? <span className="btn btn-modal-active pull-right">Unpaid</span> : <span className="btn btn-modal-active pull-right">Paid</span>}</li>
                                                            </ul>
                                                        ))}
                                                    </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Documents" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {!filteredDocuments.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredDocuments.map((per, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">
                                                                <i id="icon-ticket-black-admin" className="fa fa-ticket" />
                                                                <span className="veh-text" style={{ marginLeft: '10px' }}>
                                                                    {per.documenttypename}&nbsp;&nbsp;{per.documentnumber} &nbsp;{per.licensetypepermittedname}&nbsp;{per.validto.split('T')[0]} <strong>To</strong> {per.validfrom.split('T')[0]}
                                                                    &nbsp; <strong style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }}>{per.documentfilename}</strong>

                                                                    {
                                                                        per.statusid === 420 &&
                                                                        <div className="pending pull-right">Pending</div>
                                                                    }
                                                                    {per.statusid === 421 &&
                                                                        <div className="approved pull-right" style={{ width: '72px!important' }}>Approved</div>
                                                                    }
                                                                    {per.statusid === 422 &&
                                                                        <div className="pending pull-right">Rejected</div>
                                                                    }
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Permits" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12" style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            {!filteredPermits.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredPermits.map((per, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">
                                                                <i id="icon-ticket-black-admin" className="fa fa-ticket" />
                                                                <span className="veh-text" style={{ marginLeft: '10px' }}>
                                                                    {per.platenumber}&nbsp;{per.permittype}&nbsp;{per.amount}
                                                                    {
                                                                        per.statusid === 420 &&
                                                                        <div className="pending pull-right">Pending</div>
                                                                    }
                                                                    {per.statusid === 421 &&
                                                                        <div className="approved pull-right" style={{ width: '72px!important' }}>Approved</div>
                                                                    }
                                                                    {per.statusid === 422 &&
                                                                        <div className="pending pull-right">Rejected</div>
                                                                    }
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Employees" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            {!filteredIndividuals.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/user-img.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredIndividuals.map((individual, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">
                                                                <img
                                                                    id="icon-pics"
                                                                    src={require('../../assets/user-img.png')}
                                                                    className="img-circle"
                                                                    alt="woman"
                                                                    height="40"
                                                                    width="40"
                                                                />
                                                                <span className="veh-text" style={{ marginLeft: '10px' }}>
                                                                    {individual.nameen} <span style={{ marginLeft: '20px' }}>{individual.email}</span>
                                                                    <span style={{ marginLeft: '20px' }}>{individual.city}</span>
                                                                    <span style={{ marginLeft: '20px' }}>{individual.state}</span>
                                                                    {
                                                                        individual.statusid === 420 &&
                                                                        <div className="pending pull-right">Pending</div>
                                                                    }
                                                                    {individual.statusid === 421 &&
                                                                        <div className="approved pull-right" style={{ width: '72px!important' }}>Approved</div>
                                                                    }
                                                                    {individual.statusid === 422 &&
                                                                        <div className="pending pull-right">Rejected</div>
                                                                    }
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {this.state.Action === "Activity" &&
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            {!filteredActivities.length > 0 ?
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="col-md-4 col-lg-4 col-sm-5">
                                                        <img
                                                            id="icon-pics"
                                                            src={require('../../assets/companylogos/norecord.png')}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="80"
                                                            width="80" />
                                                    </div>
                                                    <div className="col-md-8 col-lg-8 col-sm-7">
                                                        <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                                                    </div>
                                                </div> :
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    {filteredActivities.map((activet, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li className="list-group-item list-group-item-action">
                                                                <img
                                                                    id="icon-pics"
                                                                    src={require('../../assets/company-icon.png')}
                                                                    className="img-circle"
                                                                    alt="woman"
                                                                    height="40"
                                                                    width="40"
                                                                />
                                                                <span className="veh-text" style={{ marginLeft: '10px' }}>
                                                                    {activet.companyactivityname}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ObjectView;
