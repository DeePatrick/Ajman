import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';
import Loader from '../loader';

class CompanyObjectView extends Component {
    displayName = CompanyObjectView.name;

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false,
            indListPermit: [],
            optDetails: {},
            areaCodes: [],
            comTypeList: [],
            comActivitiesList: [],

            employeeIDs: [{ keyID: '' }],
            cRNum: "",
            ded: "",
            chamberNum: "",
            legalForm: "",
            estDate: "",
            email: '',
            website: '',
            comType: "",
            franchisee: true,
            numEmployees: [{
                date: "23/09/2017",
                employees: 2
            }],
            name: {
                ar_SA: 'جون الحجارة',
                en_US: ''
            },
            telNum: {
                countryCodeT: "+971",
                numT: "",
                areaT: ""
            },

            address: {
                city: "",
                state: "",
                area: "",
                street: "",
                bldgNum: " ",
                flatNum: ""
            },
            notes: '',
            activities: [{ ActivityID: "Shopping" }],
            ownerRoles: [{
                ownerRoleID: "",
                id: "",
                nationality: "",
                ownerRoleType: "",
                ownerNameAr: "",
                ownerNameEn: "Jimmy Jatt"
            }],
            fines: [
                {
                    amount: "",
                    dateTime: "",
                    fineID: "",
                    remark: null,
                    status: "pending"
                }
            ],
            documents: [
                {
                    documentID: "permit",
                    expDate: "2028-05-29",
                    type: null
                }
            ],
            vehicles: [
                {
                    make: "",
                    modelYear: "",
                    status: "true",
                    vehType: "",
                    vehicleID: ""
                }
            ],
            comStatus: {
                statusID: "07979089789",
                dateTime: ""
            },
            companyPhoto: '',
            fireRedirect: false,
            Action: '',
            vecList: [],
            indList: [],
            numEmployeesCount: 0
        };
    }



    componentWillReceiveProps(nextProps) {
        this.setState({
            Action: nextProps.objModelName,
            cRNum: nextProps.cRNum,
            email: nextProps.email,
            franchisee: nextProps.franchisee,
            name: nextProps.name,
            telNum: nextProps.telNum,
            address: nextProps.address,
            notes: nextProps.notes,
            ownerRoles: nextProps.ownerRoles,
            companyPhoto: nextProps.companyPhoto,
            numEmployees: nextProps.numEmployees,
            employeeIDs: nextProps.employeeIDs,
            fines: nextProps.fines,
            documents: nextProps.documents,
            vehicles: nextProps.vehicles,
            vehiclesCount: nextProps.vehiclesCount,
            finesCount: nextProps.finesCount,
            documentsCount: nextProps.documentsCount,
            //numEmployeesCount: nextProps.numEmployeesCount,
            ownerRolesCount: nextProps.ownerRolesCount
        });
    }

    getVehicles() {
        var _id = this.props.cRNum;

        fetch(config.webApiUrl() + "aptc_company_getVehicles/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
            });
    }




    getEmployees() {
        var _id = this.props.cRNum;


        fetch(config.webApiUrl() + "/aptc_company_getEmployees/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ indList: data, loading: false });
            });

    }

    getEmployeesCount() {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        _id = valueObject.cRNum;

        fetch(config.webApiUrl() + "/aptc_company_getEmployeesCount/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ numEmployeesCount: data, loading: false });
            });

        console.log(this.state.numEmployeesCount);
        this.handleClick();
    }

    handleClick = (index) => {
        var individual = this.state.indList[index];
        this.setState({ individual: individual });
        this.setState({ requiredItem: index });

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

        let filteredVehicles = this
            .state
            .vecList
            .filter((vec) => {
                if (vec.makeModel === null || vec.transType === null || vec.fuelType === null) {
                    return (
                        "No Car Model"
                    );
                }
                else {
                    return (vec.vehType.toLowerCase().indexOf(this.state.search) !== -1 ||
                        vec.vehType.toUpperCase().indexOf(this.state.search) !== -1 ||
                        vec.trafficNum.toLowerCase().indexOf(this.state.search) !== -1 ||
                        vec.trafficNum.toUpperCase().indexOf(this.state.search) !== -1 ||
                        vec.makeModel.toLowerCase().indexOf(this.state.search) !== -1 ||
                        vec.makeModel.toUpperCase().indexOf(this.state.search) !== -1);
                }

            });

        let filteredIndividuals = [];
        if (this.state.indList.length > 0) {
            filteredIndividuals = this.state.indList.filter((vec) => {
                return (vec.fullName.en_US.toLowerCase().indexOf(this.state.search) !== -1 || vec.fullName.en_US.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1);
            });

        }



        return (
            <div>
                <div
                    className="modal fade"
                    id="objectModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="objectModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="subtitle-modal">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>

                                    {this.state.Action === "Vehicles" &&
                                        <div>
                                            No of Vehicles : {this.props.vehiclesCount}
                                        </div>
                                    }
                                    {this.state.Action === "Fines" &&
                                        <div>
                                            No of Fines : {this.props.finesCount}
                                        </div>
                                    }
                                    {this.state.Action === "Ownership" &&
                                        <div>
                                            No of Owners : {this.props.ownerRolesCount}
                                        </div>


                                    }
                                    {this.state.Action === "Documents" &&
                                        <div>
                                            Company Documents : {this.props.documentsCount}
                                        </div>
                                    }
                                    {this.state.Action === "Employees" &&
                                        <div>
                                            {this.getEmployees()}
                                            <span>
                                                No of Employees : {this.state.indList.length}
                                            </span>

                                        </div>
                                    }



                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="form-search-modal"
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
                            <div className="modal-body">
                                <div className="row">
                                    {this.state.Action === "Ownership" &&
                                        <div>
                                            {!this.state.ownerRoles.length > 0 ?

                                                <div>
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

                                                <div className="">
                                                    {this.state.ownerRoles.map((owner, index) => (
                                                        <ul className="list-group" key={index}>
                                                            <li style={{ marginLeft: '25px', marginRight: '25px' }} className="list-group-item list-group-item-action">  <img
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
                                                                width="40" /> &nbsp; &nbsp;{owner.ownerNameEn} &nbsp; {owner.ownerRoleType} &nbsp; &nbsp;{owner.nationality}
                                                            </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    }

                                    {this.state.Action === "Vehicles" &&
                                        <div className="veh-modal">
                                            {this.getVehicles()}
                                            {this.state.vecList.map((vehicle, index) => (
                                                <ul className="list-group" key={index}>
                                                    <li className="list-group-item list-group-item-action"> <span><i id="circle-black-wrap" className="fas fa-car" /></span><span className="veh-text">{vehicle.trafficNum} &nbsp; {vehicle.makeModel} - {vehicle.vehType} - {vehicle.colour}   &nbsp; {vehicle.yearManufacture}</span>&nbsp; {vehicle.Status ? <span className="btn btn-modal-active pull-right">Active</span> : <span className="btn btn-modal-active-veh  pull-right">InActive</span>} &nbsp;{vehicle.VehType} &nbsp; {vehicle.vechicleID}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    }

                                    {this.state.Action === "Fines" &&
                                        <div className="veh-modal">

                                            {this.state.fines.map((fine, index) => (
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


                                    {this.state.Action === "Documents" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }


                                    {this.state.Action === "Employees" &&
                                        <div className="veh-modal">
                                            {this.getEmployees()}
                                            {this.state.indList.map((individual, index) => (
                                                <ul className="list-group" key={index}>
                                                    <li className="list-group-item list-group-item-action"> <span className="veh-text">
                                                        <img
                                                            id="icon-pics"
                                                            src={!individual.profilePhoto.photo
                                                                ? require('../../assets/user-img.png')
                                                                : individual.profilePhoto.photo}
                                                            onError={(e) => {
                                                                e.target.src = require('../../assets/user-img.png');
                                                            }}
                                                            className="img-circle"
                                                            alt="woman"
                                                            height="40"
                                                            width="40" />  &nbsp;{individual.fullName.en_US}&nbsp;{individual.fullName.ar_SA}
                                                    </span></li>
                                                </ul>
                                            ))}
                                        </div>
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyObjectView;
