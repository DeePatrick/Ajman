import React, { Component } from 'react';
import Pagination from '../../shared/Pagination';
import { Animated } from "react-animated-css";
import RenewPermit from './RenewPermit';
import './Permit.css';
import RequestPermit from './RequestPermit';
import axios from 'axios';
import $ from 'jquery';
import * as config from './../../../config';
import { Redirect } from 'react-router-dom';
import Loader from '../../loader';

class CompanyPermitRequestList extends Component {
    displayName = CompanyPermitRequestList.name

    constructor(props) {
        super(props);
        this.state = {
            isDesktop: false,

            cRNumID: '',
            compName: '',
            requiredItem: 0,
            docAccepted: 'AP',
            fullName: '',
            vecPermitList: [],
            permitList: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            countryCodes: [],
            redirectCompany: true,
            error: null
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

        this.isLoding = this
            .isLoding
            .bind(this);
    }

    componentDidMount() {
        this.bindPermits();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }

    bindPermits() {
        var _id = this.props.location.state.vec.companyid;
        var _compName = this.props.location.state.vec.nameen;
        this.setState({
            cRNumID: _id, compName: _compName
        });

        console.log(_id);
        const url = config.webApiUrl() + "aptc_company_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    this.setState({ vecPermitList: data, loading: false, cRNumID: _id, compName: _compName });
                }

            });

        console.log(this.state.vecPermitList);
    }


    onPageChanged = data => {
        const { vecPermitList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecPermitList.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentDrivers, totalPages });
    };


    replaceModalItem = (index, action) => {
        if (action === 'edit') {
            this.setState({ isEditOpen: true });
            this.getEmployeeDetails();
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
            vec = this.state.vecPermitList[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.vecPermitList[index];
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

    saveModalDetails = (vec) => {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.vecPermitList;
        tempbrochure[requiredItem] = vec;
        this.setState({ vecPermitList: tempbrochure });
        this.setState({ currentDrivers: tempbrochure });
        this.setState({ vec: vec });
    };

    deleteItem = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        if (this.state.vecPermitList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecPermitList[index];
        }

        _id = valueObject.docOutId;



        if (!window.confirm("Do you want to delete permit with Id: " + _id))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);
        }
    };

    fullDelete(docOutId, index) {
        var _id;
        _id = docOutId;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var valueObjectId = valueObject.docOutId;


        fetch(config.webApiUrl() + 'aptc_permit/' + localStorage.getItem('selectedLanguageCode') + _id, { method: 'delete' }).then(data => {
            const requiredItem = this.state.requiredItem;
            let tempbrochure = this.state.vecPermitList;
            tempbrochure.splice(requiredItem, 1);
            this.setState({ vecPermitList: tempbrochure });
            this.setState({ currentDrivers: tempbrochure });
            this.setState({ vec: tempbrochure[requiredItem] });
            this.setState({ loading: false });
        }).catch((error) => {
            alert("axios error:", error.response.data.ResponseMessage);
            this.setState({ loading: false });
        });

    }


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
                .substring(0, 5)
        });
    }
    updatesearchOwner(event) {
        this.setState({
            searchOwner: event
                .target
                .value
                .substring(0, 5)
        });
    }

    //if(!window.confirm("Are you sure you want to approve " + _permittype + " permit for " + _compIDName + " ?"))

    approveOuter = (index) => {
        var _name;
        console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecPermitList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecPermitList[index];
        }

        var obj = {};
        var id = valueObject.permitid;
        _name = valueObject.nameen;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Approved by Management";
        }
        obj.id = id;
        obj.statusid = parseInt(421);

        if (!window.confirm("Are you sure you want to approve " + _name + " ?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(421), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(421) });
            valueObject.statusid = parseInt(421);

        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(421);
        this.setState({ vec });
    };

    approve = (index) => {
        var obj = {};
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        var id = valueObject.permitid;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Approved by Management";
        }

        obj.id = id;
        obj.statusid = parseInt(421);

        if (!window.confirm("Are you sure you want to approve " + _name + " ?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(421), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(421) });
            valueObject.statusid = parseInt(421);
        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(421);
        this.setState({ vec });


    }


    rejectOuter = (index) => {
        var _name;
        console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecPermitList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecPermitList[index];
        }

        var obj = {};
        var id = valueObject.permitid;
        _name = valueObject.nameen;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Rejected by Management, Company fraudulent...";
        }
        obj.id = id;
        obj.statusid = parseInt(422);

        if (!window.confirm("Are you sure you want to reject " + _name + " ?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(422), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(422) });
            valueObject.statusid = parseInt(422);

        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(422);
        this.setState({ vec });
    };

    reject = (index) => {
        var obj = {};
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        var id = valueObject.permitid;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Rejected by Management, Company fraudulent...";
        }

        obj.id = id;
        obj.statusid = parseInt(422);

        if (!window.confirm("Are you sure you want to reject " + _name + " ?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(422), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(422) });
            valueObject.statusid = parseInt(422);
        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(422);
        this.setState({ vec });

    }


    pendingOuter = (index) => {
        var _name;
        console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecPermitList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecPermitList[index];
        }

        var obj = {};
        var id = valueObject.permitid;
        _name = valueObject.nameen;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Reassigned status to pending by Management... awaiting further documents";
        }
        obj.id = id;
        obj.statusid = parseInt(420);

        if (!window.confirm("Are you sure you want to keep " + _name + " as pending?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(420), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(420) });
            valueObject.statusid = parseInt(420);
        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(420);
        this.setState({ vec });
    };


    pending = (index) => {
        console.log("pending fired");


        var obj = {};
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        var id = valueObject.permitid;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Reassigned status to pending by Management... awaiting further documents";
        }

        obj.id = id;
        obj.statusid = parseInt(420);

        if (!window.confirm("Are you sure you want to keep " + _name + " as pending?"))
            return;
        else {
            console.log(obj);
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_permit_approved', approval, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.StatusCode === '200') {
                    this.setState({ statusid: parseInt(420), loading: false });
                    $('.close').click();
                }
            });

            this.setState({ statusid: parseInt(420) });
            valueObject.statusid = parseInt(420);
        }


        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(420);
        this.setState({ vec });
    }


    render() {

        if (!this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/company' }} />;
        }



        const { vecPermitList, currentDrivers, currentPage, totalPages, loading, redirectCompany, isDesktop } = this.state;
        const totalDrivers = vecPermitList.length;
        let contents = "";
        if (totalDrivers === 0 && loading === false) {
            contents = (
                <div>
                    <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                        ? "fixed-search"
                        : "arab-fixed-search"}>
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                            : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    data-target="#requestModal">
                                    <i className="fa fa-plus fa-lg" />
                                    <span className="btn-text-admin">Add Permit</span>
                                </div>
                            </Animated>

                        </div>
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input pull-right"
                            : "col-md-9 col-lg-10 col-sm-9 col-xs-9 add-button pull-left"}>
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
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 empty-list-panel">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height-empty">
                                        <div className="panel panel-body">
                                            <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                ? "company-header"
                                                : "company-header rtl-flip"}>
                                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })}
                                                    className="fas fa-times" /></div>
                                                <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                    ? "company-title"
                                                    : "rtl-flip pull-left company-title rtl-flip"}>
                                                    <span><img id="icon-pics"

                                                        src={!this.props.location.state.vec.companyPhoto
                                                            ? require('../../../assets/companylogos/norecord.png')
                                                            : this.props.location.state.vec.companyPhoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../../assets/companylogos/norecord.png');
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
                                                    <i className="fas fa-ticket-alt icon-truck-gold-no-circle rotate" />
                                                    <p>No Permit request for this company click "Add Permit" button to request a Permit</p></h5>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>
                    </div>
                    <RequestPermit
                        companyid={this.props.companyid}
                        cRNumID={this.state.cRNumID}
                        compName={this.state.compName}
                        saveModalDetails={this.saveModalDetails}
                    />
                </div>);
        }
        else {
            contents = "";
            let filteredVehicles = [];
            if (this.state.vecPermitList.length > 0) {
                filteredVehicles = this
                    .state
                    .currentDrivers
                    .filter((vec) => {

                        if (vec.nameen) {
                            return (vec.nameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.nameen.toUpperCase().indexOf(this.state.search) !== -1);
                        } else {
                            return (vec.platenumber.toLowerCase().indexOf(this.state.search) !== -1 || vec.platenumber.toUpperCase().indexOf(this.state.search) !== -1);
                        }

                    });
            }

            const { showing, redirectCompany } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecPermitList[requiredItem];

            contents = this.state.loading
                ? (<p>
                    <Loader />
                </p>)
                :
                (<div>

                    <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                        ? "fixed-search"
                        : "arab-fixed-search"}>
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                            : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>

                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    data-target="#requestModal">
                                    <i className="fa fa-plus fa-lg" />
                                    <span className="btn-text-admin">Add Permit</span>
                                </div>
                            </Animated>

                        </div>
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                            ? "col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input pull-right"
                            : "col-md-9 col-lg-10 col-sm-9 col-xs-9 add-button pull-left"}>
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

                    <RenewPermit
                        cRNumID={this.state.cRNumID}
                        compName={this.state.compName}
                        permittypeid={modalData.permittypeid}
                        permittype={modalData.permittype}
                        nameen={modalData.nameen}
                        namear={modalData.namear}
                        docClass={modalData.docClass}
                        companyid={modalData.companyid}
                        company={modalData.company}
                        platenumber={modalData.platenumber}
                        permitdurationid={modalData.permitdurationid}
                        duration={modalData.duration}
                        permitlocationid={modalData.permitlocationid}
                        location={modalData.location}
                        permitcapacityid={modalData.permitcapacityid}
                        capacity={modalData.capacity}
                        permitweightid={modalData.permitweightid}
                        weight={modalData.weight}
                        amount={modalData.amount}
                        status={modalData.status}
                        validfrom={modalData.validfrom}
                        validto={modalData.validto}
                        rejectreason={modalData.rejectreason}
                        isactive={modalData.isactive}
                        accepteddate={modalData.accepteddate}
                        individualid={modalData.individualid}
                        vehicleid={modalData.vehicleid}
                        permitfileslist={modalData.permitfileslist}
                        companyactivityfees={modalData.companyactivityfees}
                        saveModalDetails={this.saveModalDetails} />

                    <RequestPermit
                        companyid={this.props.companyid}
                        cRNumID={this.state.cRNumID}
                        compName={this.state.compName}
                        saveModalDetails={this.saveModalDetails}
                    />

                    <div className="col-lg-12">
                        <div className={(this.state.showing && localStorage.getItem('selectedLanguageCode') == 1)
                            ? "entity-table"
                            : ([(this.state.showing && localStorage.getItem('selectedLanguageCode') == 2)
                                ? "entity-table col-lg-12"
                                : "entity-table entity-table-padding"])}>
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <div className={this.state.showing
                                    ? "panel panel-default"
                                    : ([localStorage.getItem('selectedLanguageCode') == 1
                                        ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-lef" +
                                        "t"
                                        : "col-lg-4 col-md-4 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                        "t-12 col-xs-offset-12 panel panel-default animate-table pull-right arab-left-pan" +
                                        "el"])}>
                                    <div className="panel panel-body">
                                        <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                            ? "company-header"
                                            : "company-header rtl-flip"}>
                                            <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })}
                                                className="fas fa-times" /></div>
                                            <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                ? "company-title"
                                                : "rtl-flip pull-left company-title rtl-flip"}>
                                                <span><img id="icon-pics"

                                                    src={!this.props.location.state.vec.companyPhoto
                                                        ? require('../../../assets/companylogos/norecord.png')
                                                        : this.props.location.state.vec.companyPhoto}
                                                    onError={(e) => {
                                                        e.target.src = require('../../../assets/companylogos/norecord.png');
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

                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Permit Type</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Permit No</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Duration</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Fees Paid</th>
                                                                <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {filteredVehicles.map((vec, index) => (
                                                                <tr className="panel-bubble-new" key={index}>
                                                                    <td scope="row">

                                                                        <label className="container-x">
                                                                            <input type="checkbox" />
                                                                            <span className="checkmark" />
                                                                        </label>

                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                        <i id="" className="fas fa-ticket-alt rotate icon-ticket-black-admin" />

                                                                        {!vec.platenumber ? null : vec.platenumber} &nbsp; {vec.nameen}
                                                                    </td>


                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                        {vec.permittype}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                        PR-0{vec.permitid}
                                                                    </td>
                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                        {!vec.duration ? "12 month" : vec.duration}(s)
                                                                    </td>

                                                                    <td
                                                                        scope="row"
                                                                        className={this.state.showing ? null : "hidden-column"}
                                                                        onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                        {vec.amount} (AED)
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
                                                                                            data-target="#renewModal"
                                                                                            onClick={() => this.replaceModalItem(index)}>Edit Details</button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            className={!this.state.show
                                                                                                ? ""
                                                                                                : this.state.show}
                                                                                            onClick={() => this.deleteItem(index)}>Delete</button>
                                                                                    </li>
                                                                                </ul>
                                                                            ) :
                                                                                (<ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            id="call"
                                                                                            className={!this.state.show
                                                                                                ? ""
                                                                                                : this.state.show}
                                                                                            data-toggle="modal"
                                                                                            data-target="#renewModal"
                                                                                            onClick={() => this.replaceModalItem(index)}>Edit Details</button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button
                                                                                            className={!this.state.show
                                                                                                ? ""
                                                                                                : this.state.show}
                                                                                            onClick={() => this.deleteItem(index)}>Delete</button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button className="black-margin">
                                                                                            <i className="fa fa-truck" />
                                                                                            &nbsp; Vehicle Info
                                                                                        </button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button className="black-margin">
                                                                                            <i className="fa fa-envelope" />
                                                                                            &nbsp; Message
                                                                                        </button>
                                                                                    </li>
                                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                                        <button className="black-margin">
                                                                                            <i className="fa fa-phone" />
                                                                                            &nbsp; Call
                                                                                    </button>
                                                                                    </li>
                                                                                </ul>)}



                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="movein">
                                        <div>
                                            <h4>
                                                <strong >{totalDrivers}</strong>{" "}
                                                Permit entries
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

                                {this.state.vec.permitid !== undefined && !this.state.showing ?
                                    <div>
                                        <div className={this.state.showing
                                            ? "panel panel-default main-body-height-admin"
                                            : ([localStorage.getItem('selectedLanguageCode') == 1
                                                ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default main-body-height-admin"
                                                : "col-lg-8 col-md-8 col-sm-0 col-xs-0 panel panel-default animate-table pull-right rtl-main-body-height-admin"])}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                                <br />
                                                <div
                                                    className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? ""
                                                        : " rtl-flip"}>

                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "col-lg-3 col-md-0 col-sm-6 title-image pull-left"
                                                        : "col-lg-3 col-md-0 col-sm-6 title-image pull-left"}>
                                                        <span className='pics'>
                                                            <i id="" className="fa fa-ticket-alt rotate icon-ticket-alt-old-big" />
                                                        </span>
                                                    </div>

                                                    <div
                                                        id="left-border-line-admin"
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "col-lg-9 col-md-12 col-sm-9 left-margin"
                                                            : "col-lg-9 col-md-12 col-sm-9 left-margin"}>

                                                        <div className="">
                                                            <div className="">
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
                                                                    <p> <span className={localStorage.getItem('selectedLanguageCode') == 1
                                                                        ? "title-side-detail-panel ltr-space"
                                                                        : "title-side-detail-panel rtl-space"}> {this.state.vec.nameen}  &nbsp; {!this.state.vec.platenumber ? null : this.state.vec.platenumber}</span>
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
                                                                        <span>
                                                                            <p>Permit Type: {this.state.vec.permittype} </p>
                                                                        </span>
                                                                        <p>{this.state.vec.duration ? "Duration : " + this.state.vec.duration : null}</p>
                                                                        <p>{this.state.vec.location ? "Location : " + this.state.vec.location : null}</p>
                                                                        <p>{this.state.vec.capacity ? "Capacity : " + this.state.vec.capacity : null}</p>
                                                                        <p>{this.state.vec.weight ? "Weight : " + this.state.vec.weight : null}</p>
                                                                        <p>Permit Number:  PR-0{this.state.vec.permitid}</p>
                                                                        <p>{this.state.vec.docAcceptedDate ? "Accepted Date : " + this.state.vec.docAcceptedDate : null}</p>

                                                                        <br />
                                                                        <h5>Vehicle Registrar:</h5> <div>
                                                                            <img
                                                                                id="icon-pics"
                                                                                src={!this.state.vec.photo
                                                                                    ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                                                    : this.state.vec.photo}
                                                                                onError={(e) => {
                                                                                    e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                                                }}
                                                                                className="img-circle"
                                                                                alt="woman"
                                                                                height="52"
                                                                                width="52" data-toggle="tooltip" data-placement="bottom" title={!this.state.vec.nameen ? "No Registar required for this permit" : this.state.vec.nameen}
                                                                            />

                                                                        </div>
                                                                        <br />
                                                                    </div>
                                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                                        <p>
                                                                            <button className="btn btn-active" id="Documents" onClick={(e) => this.oepModelViewOpenClick('Roles')}
                                                                                data-toggle="modal"
                                                                                data-target="#objectModal"
                                                                                style={{ cursor: 'pointer' }}>Documents : {this.state.vec.permitfileslist}</button>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <br /> <br />
                                                            </div>
                                                            <div className="" /></div>
                                                        <br />

                                                        <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "colour" : "colour rtl-flip"}>
                                                            <button className={localStorage.getItem('selectedLanguageCode') == 1 ? " black-margin action" : "black-margin rtl-black-margin action"}>
                                                                <i className="fa fa-truck" />
                                                                &nbsp; Vehicle Info
                                                            </button>
                                                            <button
                                                                className={localStorage.getItem('selectedLanguageCode') == 1 ? " black-margin action" : "black-margin rtl-black-margin action"}
                                                                data-toggle="modal"
                                                                data-target="#renewModal">
                                                                <i id="action" className="fa fa-retweet" />
                                                                &nbsp; Renew Permit
                                                            </button>
                                                            <button className={localStorage.getItem('selectedLanguageCode') == 1 ? " black-margin action" : "black-margin rtl-black-margin action"}>
                                                                <i className="fa fa-envelope" />
                                                                &nbsp; Message
                                                            </button>
                                                            <button className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}>
                                                                <i className="fa fa-phone" />
                                                                &nbsp; Call
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div></Animated>
                                        </div>
                                    </div>

                                    : null}
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
            </div >

        );

    }
}
export default CompanyPermitRequestList;