import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddCompany from './AddCompany';
import $ from 'jquery';
import EditCompany from './EditCompany';
import CompanyObjectView from './CompanyObjectView';
import Docs from '../documents/Docs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as config from '../../config';
import PermitRequestList from '../common/permit/PermitRequestList';
import Vehicles from '../vehicle/Vehicles';
import Individuals from '../individuals/Individuals';
import Loader from '../loader';
import { OverlayTrigger } from 'react-bootstrap';
import popoverHoverFocus from '../notifications/popovers/PopoverHoverFocus';


class IndividualCompanies extends Component {
    displayName = IndividualCompanies.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,
            requiredItem: 0,

            currentPage: 0,
            pageLimit: 0,

            comStatus: {
                statusID: "PE",
                dateTime: null
            },

            optDetails: {},
            countryCodes: [],
            Id: {},
            vecList: [],
            currentDrivers: [],
            filteredCompanies: [],
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            isEditOpen: false,
            isAddOpen: false,
            isModelViewOpen: false,
            objModelName: '',

            redirectCompany: false,
            numEmployeesCount: 0,
            loading: true
        };
        this.updatePredicate = this.updatePredicate.bind(this);

        this.replaceModalItem = this
            .replaceModalItem
            .bind(this);
        this.saveModalDetails = this
            .saveModalDetails
            .bind(this);
        this.isLoding = this
            .isLoding
            .bind(this);
        this.fullDelete = this
            .fullDelete
            .bind(this);

        this.handleClick = this
            .handleClick
            .bind(this);

        this.addClick = this
            .addClick
            .bind(this);


        this.callVehicle = this
            .callVehicle
            .bind(this);

        this.callPermit = this
            .callPermit
            .bind(this);

        this.callEmployee = this
            .callEmployee
            .bind(this);

        this.oepModelViewOpenClick = this
            .oepModelViewOpenClick
            .bind(this);


        this.approve = this
            .approve
            .bind(this);

        this.reject = this
            .reject
            .bind(this);

        fetch(config.webApiUrl() + "aptc_getStateOfCountry/AE")
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data });
            });
    }

    componentWillMount() {
        this.setState({ loading: true });
    }


    componentDidMount() {
        this.bindCompany();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }

    bindCompany() {
        var _id = this.props.location.state.vec.individualid;

        console.log(_id);
        fetch(config.webApiUrl() + 'aptc_individual_getCompanys/' + localStorage.getItem('selectedLanguageCode') + "/" +  _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
                this.setState({ isEditOpen: true, isAddOpen: true });
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

    }

    hideVehicle = () => {

        this.setState({
            redirectVehicle: false,
            redirectPermit: false,
            redirectIndividual: false,
            redirectCompany: true

        });
        console.log("shown Vehicle");
    }


    callVehicle(index) {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("View Vehicles Registered with " + _name))
            return;
        else {
            this.setState({
                redirectVehicle: true,
                redirectPermit: false,
                redirectIndividual: false,
                redirectCompany: false
            });
        }
    }


    callEmployee = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("View Employees Registered with " + _name))
            return;
        else {
            this.setState({
                redirectIndividual: true,
                redirectPermit: false,
                redirectVehicle: false,
                redirectCompany: false

            });
        }

    }

    approve = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("Are you sure you want to approve " + _name + " ?"))
            return;
        else {
            let comStatus = Object.assign({}, this.state.comStatus);
            comStatus.statusID = 'AP';
            this.setState({ comStatus });
            this.state.vec.status = 'AP';


            console.log(this.state);
            const user = JSON.stringify(this.state);
            console.log(user);
            axios.put(config.webApiUrl() + 'aptc_Approved_company/' + _id, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ comStatus: comStatus, loading: false });
                    $('.close').click();
                }
            });

            this.setState({ comStatus: comStatus });
        }

        let comStatus = Object.assign({}, this.state.comStatus);
        comStatus.statusID = 'AP';
        this.setState({ comStatus });


    }

    reject = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("Are you sure you want to reject " + _name + " ?"))
            return;
        else {
            let comStatus = Object.assign({}, this.state.comStatus);
            comStatus.statusID = 'Rejected';
            this.setState({ comStatus: comStatus });
            console.log("rejected");

        }

    }


    pending = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("Are you sure you want to keep " + _name + " as pending?"))
            return;
        else {
            let comStatus = Object.assign({}, this.state.comStatus);
            comStatus.statusID = 'Pending';
            this.setState({ comStatus: comStatus });
            console.log("pending");
        }

    }


    hideEmployee = () => {
        this.setState({
            redirectIndividual: false,
            redirectPermit: false,
            redirectVehicle: false,
            redirectCompany: true

        });
        console.log("shown Employee");
    }



    callPermit = () => {

        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.companynameen;
        _id = valueObject.crnum;

        if (!window.confirm("View Permits Registered with " + _name))
            return;
        else {
            this.setState({
                redirectPermit: true,
                redirectIndividual: false,
                redirectVehicle: false,
                redirectCompany: false
            });
        }
    }

    hidePermit = () => {
        this.setState({
            redirectPermit: false,
            redirectIndividual: false,
            redirectVehicle: false,
            redirectCompany: true
        });
        console.log("hide Permit");
    }


    replaceModalItem = (index, action, crnum) => {

        if (action === 'edit') {
            this.setState({ isEditOpen: true });
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }

        this.toggleHide();

        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (crnum === this.state.vecList[indx].crnum) {
                var vec = {};
                this.setState({ requiredItem: indx });
                vec = this.state.vecList[indx];
                this.setState({ vec: vec });
                this.getEmployeesCount();
            }


        }

    };



    toggleHide = () => {
        var showing = this.state.showing;
        this.setState({ showing: false });
    }


    oepModelViewOpenClick(obj) {
        this.setState({ isModelViewOpen: true });
        this.setState({ objModelName: obj });
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

        _id = valueObject.crnum;

        if (!window.confirm("Do you want to delete company with Id: " + _id))
            return;
        else {

            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.setState({ loading: true });
            this.fullDelete(_id, index);

        }
    };


    getEmployeesCount() {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        _id = valueObject.crnum;

        fetch(config.webApiUrl() + "aptc_company_getEmployeesCount/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ numEmployeesCount: data, loading: false });
            });

        console.log(this.state.numEmployeesCount);
    }


    deleteInnerItem(index) {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        _id = valueObject.crnum;

        if (!window.confirm("Do you want to delete company with Id: " + _id))
            return;
        else {

            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.fullDelete();
        }
    }


    fullDelete(crnum, index) {
        var id = crnum;
        var _id = id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var url = config.webApiUrl() + 'aptc_company/' + _id;
        fetch(url, { method: 'delete' })
            .then(data => {
                const requiredItem = this.state.requiredItem;
                let tempbrochure = this.state.vecList;
                tempbrochure.splice(requiredItem, 1);
                this.setState({ vecList: tempbrochure });
                this.setState({ currentDrivers: tempbrochure });
                this.setState({ vec: tempbrochure[requiredItem] });
                this.setState({ loading: false });
                this.setState({ loading: false });
                $('.close').click();
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    if (error.response.data !== undefined) {
                        alert(error.response.data.ResponseMessage);
                    }
                }
                else {
                    alert(error.message);
                    const requiredItem = this.state.requiredItem;
                    let tempbrochure = this.state.vecList;
                    tempbrochure.splice(requiredItem, 1);
                    this.setState({ vecList: tempbrochure });
                    this.setState({ currentDrivers: tempbrochure });
                    this.setState({ vec: tempbrochure[requiredItem] });
                }
            });
    }



    handleClick = (index) => {
        this.setState({ vec: index });
        console.log(index);
    };

    addClick = (index) => {
        this.setState({ isAddOpen: true });
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


    renderCompanyList() {
        console.log(this.state.vec);
        console.log(this.state.status);

        const { vecList, currentDrivers, currentPage, totalPages, loading, redirectCompany} = this.state;
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];



        const totalDrivers = vecList.length;

        const isDesktop = this.state.isDesktop;

        if (totalDrivers === 0 && loading === false){

            if (!this.state.redirectCompany) {
                return (
                    <div>
                        <div className="fixed-search">
                            <div className="col-md-2 col-lg-2 col-sm-5 col-xs-6">
                                <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div
                                        className="panel-title black-button-admin  center"
                                        data-toggle="modal"
                                        data-target="#addModal">
                                        <i className="fa fa-plus fa-lg" />
                                        <span className="btn-text-admin">Add Company</span>
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


                            <div className="">
                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                        <div className="panel panel-default main-body-height">
                                            <div className="panel panel-body">
                                                <div className="company-header">
                                                    <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                                    <div className="pull-left company-title">
                                                        <span><img id="icon-pics"
                                                            src={!this.props.location.state.vec.profilephoto
                                                                ? require('../../assets/companylogos/norecord.png')
                                                                : this.props.location.state.vec.profilephoto}
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
                                                        <i className="fas fa-building icon-truck-gold-no-circle" />
                                                        <p>No Company is linked to this person. Click "Add Company" button to link a company to this person</p></h5>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </Animated>
                                </div>
                            </div>

                        </div>
                        <AddCompany
                            individualid={this.props.individualid}
                            cRNumID={this.state.cRNumID}
                            saveModalDetails={this.saveModalDetails}
                        />


                    </div>
                );
            }
            else {
                return <Redirect push to={{ pathname: '/people' }} />;
            }

        }


        else {
            const { vecList, showing, redirectVehicle, redirectPermit, redirectIndividual, redirectCompany } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];

            let filteredCompanies = [];
            if (this.state.vecList.length > 0) {
                filteredCompanies = this
                    .state
                    .currentDrivers
                    .filter((vec) => {
                        return (vec.website.toLowerCase().indexOf(this.state.search) !== -1 || vec.website.toUpperCase().indexOf(this.state.search) !== -1 || vec.address.city.toLowerCase().indexOf(this.state.search) !== -1 || vec.address.city.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1 || vec.companynameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.companynameen.toUpperCase().indexOf(this.state.search) !== -1);
                    });
            }

            if (!this.state.redirectCompany) {
                return (
                    <div className="wrapper-content">
                        <div className="col-lg-12 fixed-search">
                            <div className="">
                                <div className="col-md-2 col-lg-2 col-sm-5 col-xs-3 add-button pull-left">
                                    <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                        <div
                                            className="panel-title black-button-admin  center"
                                            data-toggle="modal"
                                            data-target="#addModal">
                                            <i className="fa fa-plus fa-lg" />
                                            <span className="btn-text-admin">Add Company</span>
                                        </div>
                                    </Animated>
                                </div>

                                <div className="col-md-10 col-lg-10 col-sm-7 col-xs-9 entity-search-input pull-right">
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
                        </div>
                        {this.state.isAddOpen === true &&
                            <AddCompany
                                saveModalDetails={this.saveModalDetails} />
                        }


                        {this.state.isEditOpen === true &&
                            <EditCompany
                                crnum={modalData.crnum}
                                ded={modalData.ded}
                                chambernumber={modalData.chambernumber}
                                legalformid={modalData.legalformid}
                                legalform={modalData.legalform}
                                companytypeid={modalData.companytypeid}
                                companytype={modalData.companytype}
                                email={modalData.email}
                                website={modalData.website}
                                estdate={modalData.estdate}
                                franchisee={modalData.franchisee}
                                companynameen={modalData.companynameen}
                                companynamear={modalData.companynamear}
                                telNum={modalData.telNum}
                                address={modalData.address}
                                notes={modalData.notes}
                                activities={modalData.activities}
                                ownerRoles={modalData.ownerRoles}
                                comStatus={modalData.comStatus}
                                companyPhoto={modalData.companyPhoto}
                                numEmployeesCount={modalData.numEmployeesCount}
                                employeeIDs={modalData.employeeIDs}
                                saveModalDetails={this.saveModalDetails} />
                        }


                        {
                            modalData !== undefined &&
                            <Docs
                                docType={modalData.docType}
                                lang={modalData.language}
                                indivID={modalData.keyID}
                                docFormat={modalData.docFormat}
                                docImage={modalData.docImage}
                                vecList={this.state.vecList}
                                saveModalDetails={this.saveModalDetails} />
                        }


                        {
                            this.state.isModelViewOpen === true &&
                            <CompanyObjectView
                                crnum={modalData.crnum}
                                dED={modalData.dED}
                                chamberNum={modalData.chamberNum}
                                legalForm={modalData.legalForm}
                                comType={modalData.comType}
                                email={modalData.email}
                                website={modalData.website}
                                estDate={modalData.estDate}
                                franchisee={modalData.franchisee}
                                name={modalData.name}
                                telNum={modalData.telNum}
                                address={modalData.address}
                                notes={modalData.notes}
                                activities={modalData.activities}
                                ownerRoles={modalData.ownerRoles}
                                comStatus={modalData.comStatus}
                                companyPhoto={modalData.companyPhoto}
                                numEmployees={modalData.numEmployees}
                                employeeIDs={modalData.employeeIDs}
                                vehiclesCount={modalData.vehiclesCount}
                                finesCount={modalData.finesCount}
                                documentsCount={modalData.documentsCount}
                                numEmployeesCount={modalData.numEmployeesCount}
                                ownerRolesCount={modalData.ownerRolesCount}
                                fines={modalData.fines}
                                documents={modalData.documents}
                                vehicles={modalData.vehicles}
                                saveModalDetails={this.saveModalDetails}
                                objModelName={this.state.objModelName} />
                        }



                        <div className={this.state.showing ? "entity-table" : "entity-table entity-table-padding"}>
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <div className={this.state.showing ? "panel panel-default" : "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left"}>
                                    <div className="panel panel-body">
                                        <div className="company-header">
                                            <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                            <div className="pull-left company-title">
                                                <span><img id="icon-pics"
                                                    src={!this.props.location.state.vec.profilephoto
                                                        ? require('../../assets/companylogos/norecord.png')
                                                        : this.props.location.state.vec.profilephoto}
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
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Company Reg</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Address</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Email</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Telephone</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="fixed_body">
                                                            {filteredCompanies.map((vec, index) => (<tr className="panel-bubble-new" key={index}>
                                                                <td scope="row">
                                                                    <label className="container-x">
                                                                        <input type="checkbox" />
                                                                        <span className="checkmark" />
                                                                    </label>

                                                                </td>
                                                                <td
                                                                    scope="row"
                                                                    className="shown-column"
                                                                    onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                    <i id="" className="fas fa-building icon-exclamation-circle-gold-small" />
                                                                    {vec.companynamear} &nbsp; {vec.companynameen}
                                                                </td>
                                                                <td
                                                                    scope="row"
                                                                    className={this.state.showing ? null : "hidden-column"}
                                                                    onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                    {vec.crnumber}
                                                                </td>
                                                                <td
                                                                    scope="row"
                                                                    className={this.state.showing ? null : "hidden-column"}
                                                                    onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                    {vec.buildingnumber} &nbsp; {vec.flatnumber} &nbsp; {vec.street} &nbsp; {vec.address.city}
                                                                    &nbsp; {vec.address.state}
                                                                </td>

                                                                <td
                                                                    scope="row"
                                                                    className={this.state.showing ? null : "hidden-column"}
                                                                    onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                    {vec.email}
                                                                </td>

                                                                <td
                                                                    scope="row"
                                                                    className={this.state.showing ? null : "hidden-column"}
                                                                    onClick={() => this.replaceModalItem(index, '', vec.crnum)}>
                                                                    {vec.telephonecountry}&nbsp;{vec.telephonearea}&nbsp;{vec.telephonenumber}
                                                                </td>
                                                                <td
                                                                    scope="row"
                                                                    className={this.state.showing ? "status-item" : "hidden-column"}
                                                                >
                                                                    <span className="btn-group">
                                                                        <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                        <button className={vec.status == 'PE' ? "btn btn-active status dropdown-toggle status-title" : "btn btn-status-approved dropdown-toggle status status-title-approved"} data-toggle="dropdown">{vec.status == 'PE' ? "Pending" : "Approved"}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                        <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                            <li className="dropdown-spacing" onClick={this.pending.bind(this)}>Pending</li>
                                                                            <li className="dropdown-spacing" onClick={this.approve.bind(this)}>Approved</li>
                                                                            <li className="dropdown-spacing" onClick={this.reject.bind(this)}>Rejected</li>
                                                                        </ul>
                                                                    </span>
                                                                </td>

                                                                <td scope="row" className="more-item">
                                                                    <div className="dropdown">
                                                                        <button id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                                                            type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                                        </button>

                                                                        <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button id="call" data-toggle="modal" data-target="#editModal" onClick={() => this.replaceModalItem(index, 'edit', vec.crnum)}>Edit Details</button>
                                                                            </li>
                                                                            <li className="dropdown-spacing table-dropdown-small-width">
                                                                                <button className={!this.state.show ? "" : this.state.show} onClick={() => this.deleteItem(index)}>Delete</button>
                                                                            </li>
                                                                        </ul>
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
                                                    User entries
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


                                {this.state.vec.email !== undefined && !this.state.showing ?

                                    <div className={this.state.showing ? "panel panel-default main-body-height-admin" : "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default main-body-height-admin"}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                            <br />
                                            <div>
                                                <div className='col-lg-2 col-md-4 col-sm-6 title-image pull-left'>
                                                    <i className="icon-building-gold-admin fas fa-building" />
                                                </div>
                                                <div
                                                    id="left-border-line-admin"
                                                    className="col-lg-10 col-md-8 col-sm-6 left-margin pull-right">
                                                    <div className="pull-right">
                                                        <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fas fa-times" />
                                                    </div>
                                                    <div>
                                                        <p> <span className="title-side-detail-panel">{this.state.vec.companynameen}</span>
                                                            <span className="btn-group" style={{ marginBottom: '15px', marginLeft: '5px' }}>
                                                                <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                                <button className={this.state.vec.status == 'PE' ? "btn btn-active status dropdown-toggle status-title" : "btn btn-status-approved dropdown-toggle status status-title-approved"} data-toggle="dropdown">{this.state.vec.status == 'PE' ? "Pending" : "Approved"}<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                                <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                                    <li className="dropdown-spacing" onClick={this.pending.bind(this)}>Pending
                                                          </li>
                                                                    <li className="dropdown-spacing" onClick={this.approve.bind(this)}>Approved
                                                          </li>
                                                                    <li className="dropdown-spacing" onClick={this.reject.bind(this)}>Rejected
                                                          </li>
                                                                </ul>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-6">
                                                            <p>Address: {this.state.vec.address}</p>

                                                            <br />
                                                            <p>Website: {this.state.vec.website}</p>
                                                            <p>Email: {this.state.vec.email}</p>
                                                            <p>Phone: {this.state.vec.telephonenumber}</p>
                                                        </div>
                                                        <div className="col-md-6 col-lg-6">
                                                            <p>
                                                                <button className="btn btn-active" id="Ownership" onClick={(e) => this.oepModelViewOpenClick('Ownership')}
                                                                    data-toggle="modal"
                                                                    data-target="#objectModal"
                                                                    style={{ cursor: 'pointer' }}>Ownership : {this.state.vec.ownerRolesCount}</button>
                                                            </p>
                                                            <p>
                                                                <button className="btn btn-active" id="Fines" data-toggle="modal"
                                                                    data-target="#objectModal"
                                                                    onClick={(e) => this.oepModelViewOpenClick('Fines')} style={{ cursor: 'pointer' }}>No Of Fines: {this.state.vec.finesCount}</button>
                                                            </p>

                                                            <p>
                                                                <button className="btn btn-active" id="Vehicles"
                                                                    data-toggle="modal"
                                                                    data-target="#objectModal"
                                                                    onClick={(e) => this.oepModelViewOpenClick('Vehicles')} style={{ cursor: 'pointer' }}>No of Vehicles: {this.state.vec.vehiclesCount}</button>
                                                            </p>
                                                            <p>
                                                                <button className="btn btn-active"
                                                                    id="Documents"
                                                                    data-toggle="modal"
                                                                    data-target="#objectModal"
                                                                    onClick={(e) => this.oepModelViewOpenClick('Documents')} style={{ cursor: 'pointer' }}>Documents : {this.state.vec.documentsCount}</button>
                                                            </p>
                                                            <p><button className="btn btn-active" id="Employees"
                                                                data-toggle="modal"
                                                                data-target="#objectModal"
                                                                onClick={(e) => this.oepModelViewOpenClick('Employees')}>See all employees  </button>
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <br /><br />
                                                    <div className="colour">
                                                        <button
                                                            className="black-margin action"
                                                            data-toggle="modal"
                                                            data-target="#editModal">
                                                            <i className="glyphicon glyphicon-edit" />
                                                            &nbsp; Edit Details
                                                            </button>
                                                        <button
                                                            className="black-margin action"
                                                            onClick={this
                                                                .deleteInnerItem
                                                                .bind(this)}>
                                                            <i className="fa fa-trash" />
                                                            &nbsp; Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div></Animated>
                                    </div>

                                    : null}

                            </Animated>
                        </div>
                        <div>
                            {redirectPermit ? <PermitRequestList goToHome={this.hidePermit.bind(this)}
                                crnum={modalData.crnum}
                                companyPhoto={modalData.companyPhoto}
                                name={modalData.name}
                                vehicles={modalData.vehicles}
                                saveModalDetails={this.saveModalDetails}
                            /> : null}
                            {redirectVehicle ? <Vehicles goToHome={this.hideVehicle.bind(this)}
                                crnum={modalData.crnum}
                                companyPhoto={modalData.companyPhoto}
                                name={modalData.name}
                                vehicles={modalData.vehicles}
                                saveModalDetails={this.saveModalDetails}
                            /> : null}
                            {redirectIndividual ? <Individuals goToHome={this.hideEmployee.bind(this)}
                                crnum={modalData.crnum}
                                companyPhoto={modalData.companyPhoto}
                                name={modalData.name}
                                vehicles={modalData.vehicles}
                                saveModalDetails={this.saveModalDetails}
                            /> : null}
                        </div>

                    </div>
                );
            }
            else {
                return <Redirect push to={{ pathname: '/people' }} />;
            }


        }

    }

    render() {
        let filteredCompanies = this.state.currentDrivers
            .filter((vec) => {
                return (vec.website.toLowerCase().indexOf(this.state.search) !== -1 || vec.website.toUpperCase().indexOf(this.state.search) !== -1 || vec.address.city.toLowerCase().indexOf(this.state.search) !== -1 || vec.address.city.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1 || vec.companynameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.companynameen.toUpperCase().indexOf(this.state.search) !== -1);
            });


        let contents = this.state.loading
            ? <p className="wrapper-content"><Loader /></p>
            : this.renderCompanyList(filteredCompanies);


        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >
        );
    }
}
export default IndividualCompanies;
