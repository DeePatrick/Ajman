import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import $ from 'jquery';
import Docs from '../documents/Docs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as config from '../../config';
import PermitRequestList from '../common/permit/PermitRequestList';
import Vehicles from '../vehicle/Vehicles';
import Company from '../company/Company';
import Loader from '../loader';
import Create from './Create';



class People extends Component {
    displayName = People.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,
            statusid: 0,
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

            redirectVehicle: false,
            redirectPermit: false,
            redirectCompany: false,
            redirectPeople: true,

            numEmployeesCount: 0,
            loading: true,
            isMobile: false
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

        this.callCompany = this
            .callCompany
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


    }


    componentDidMount() {
        this.bindPeople();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }

    bindPeople() {
        fetch(config.webApiUrl() + 'aptc_individual/' + localStorage.getItem('selectedLanguageCode'))
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
            redirectCompany: false,
            redirectPeople: true

        });
        console.log("shown Vehicle");
    }


    callVehicle(index) {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.individualid;

        if (!window.confirm("View Vehicles Registered with " + _name))
            return;
        else {
            this.setState({
                redirectVehicle: true,
                redirectPermit: false,
                redirectCompany: false,
                redirectPeople: false
            });
        }
    }


    callCompany = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.emiratesid;

        if (!window.confirm("View Employees Registered with " + _name))
            return;
        else {
            this.setState({
                redirectCompany: true,
                redirectPermit: false,
                redirectVehicle: false,
                redirectPeople: false

            });
        }

    }


    approveOuter = (index) => {
        var _name;
        console.log(this.state.vec);
        var valueObject = [];
        if (this.state.vecList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecList[index];
        }

        var obj = {};
        var id = valueObject.companyid;
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

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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
        var id = valueObject.companyid;
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

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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
        if (this.state.vecList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecList[index];
        }

        var obj = {};
        var id = valueObject.companyid;
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
            obj.rejectreason = prompt("Enter reason for rejection", "Rejected by Management, Individual not valid...");
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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
        var id = valueObject.companyid;
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
            obj.rejectreason = prompt("Enter reason for rejection", "Rejected by Management, Individual not valid...");
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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
        if (this.state.vecList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecList[index];
        }

        var obj = {};
        var id = valueObject.companyid;
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

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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
        var id = valueObject.companyid;
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
            obj.rejectreason = prompt("Enter reason for rejection", "Rejected by Management, Individual not valid...");
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_individual_approved', approval, {
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



    hideCompany = () => {
        this.setState({
            redirectCompany: false,
            redirectPermit: false,
            redirectVehicle: false,
            redirectPeople: true

        });
        console.log("shown Employee");
    }



    callPermit = () => {

        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var _name = valueObject.nameen;
        _id = valueObject.emiratesid;

        if (!window.confirm("View Permits Registered with " + _name))
            return;
        else {
            this.setState({
                redirectPermit: true,
                redirectCompany: false,
                redirectVehicle: false,
                redirectPeople: false
            });
        }
    }

    hidePermit = () => {
        this.setState({
            redirectPermit: false,
            redirectCompany: false,
            redirectVehicle: false,
            redirectPeople: true
        });
        console.log("hide Permit");
    }


    replaceModalItem = (index, action, emiratesid) => {

        if (action === 'edit') {
            this.setState({ isEditOpen: true });
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }

        this.toggleHide();

        for (var indx = 0; indx < this.state.vecList.length; indx++) {
            if (emiratesid === this.state.vecList[indx].emiratesid) {
                var vec = {};
                this.setState({ requiredItem: indx });
                vec = this.state.vecList[indx];
                this.setState({ vec: vec });

            }


        }

    };


    toggleHide = () => {

        if (this.state.isDesktop) {
            var showing = this.state.showing;
            this.setState({ showing: false });
        }

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

        _id = valueObject.individualid;
        var _name = valueObject.nameen;

        if (!window.confirm("Do you want to delete person with Id: " + _name))
            return;
        else {

            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.setState({ loading: true });
            this.fullDelete(_id, index);

        }
    };





    deleteInnerItem(index) {
        var individualid;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        individualid = valueObject.individualid;
        var _name = valueObject.nameen;

        if (!window.confirm("Do you want to delete person with name: " + _name))
            return;
        else {
            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.fullDelete(individualid);
        }
    }


    fullDelete(individualid) {
        var _id;
        _id = individualid;
        console.log(this.state.vec);



        var url = config.webApiUrl() + 'aptc_individual/' + _id;
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

        const { vecList, showing, redirectVehicle, redirectPermit, redirectCompany, redirectPeople, isDesktop } = this.state;
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];

        const { currentPage, totalPages } = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0)
            return null;

        let filteredCompanies = [];

        if (this.state.vecList.length > 0) {
            filteredCompanies = this.state.currentDrivers
                .filter((vec) => {
                    return (vec.nameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.nameen.toUpperCase().indexOf(this.state.search) !== -1
                        || vec.address.toLowerCase().indexOf(this.state.search) !== -1 || vec.address.toUpperCase().indexOf(this.state.search) !== -1
                        || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1);
                });
        }


        return (
            <div className="wrapper-content">
                {this.state.redirectPeople ? (
                    <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                        ? "col-lg-12 fixed-search"
                        : "arab-fixed-search"}>
                        <div className="">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                ? "col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left"
                                : "col-md-3 col-lg-2 col-sm-3 col-xs-3 entity-search-input pull-right"}>
                                <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div
                                        className="panel-title black-button-admin center"
                                        data-toggle="modal"
                                        data-target="#createModal"
                                        onClick={this.addClick.bind()}>
                                        <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                        <span className="btn-text-admin">Create Account</span>
                                    </div>
                                </Animated>
                            </div>

                            <div
                                className={(localStorage.getItem('selectedLanguageCode') == 1)
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
                    </div>) : null}



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

                <div className={this.state.showing ? "entity-table" : "entity-table entity-table-padding"}>
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
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Emirates ID</th>
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
                                                            onClick={() => this.replaceModalItem(index, '', vec.emiratesid)}>
                                                            <img
                                                                id="icon-pics"
                                                                src={!vec.profilephoto
                                                                    ? require('../../assets/user-img.png')
                                                                    : vec.profilephoto}
                                                                onError={(e) => {
                                                                    e.target.src = require('../../assets/user-img.png')
                                                                }}
                                                                className="img-circle"
                                                                onClick={this
                                                                    .handleClick
                                                                    .bind(this, vec)}
                                                                alt="woman"
                                                                height="30"
                                                                width="30" />

                                                            &nbsp;{vec.namear} &nbsp; {vec.nameen}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.emiratesid)}>
                                                            {vec.emiratesid}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.emiratesid)}>
                                                            {vec.buildingnumber} &nbsp; {vec.flatnumber} &nbsp; {vec.street} &nbsp; {vec.address.city}
                                                            &nbsp; {vec.address.state}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.emiratesid)}>
                                                            {vec.email}
                                                        </td>

                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? null : "hidden-column"}
                                                            onClick={() => this.replaceModalItem(index, '', vec.emiratesid)}>
                                                            ({vec.telephonenumberwithcountry}) &nbsp; {vec.telephonenumber}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className={this.state.showing ? "status-item" : "hidden-column"}
                                                        >
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
                                                                {isDesktop ? (<ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                        <button id="call" data-toggle="modal" data-target="#editPersonModal" onClick={() => this.replaceModalItem(index, 'edit', vec.emiratesid)}>Edit Details</button>
                                                                    </li>
                                                                    <li className="dropdown-spacing table-dropdown-small-width">
                                                                        <button className={!this.state.show ? "" : this.state.show} onClick={() => this.deleteItem(index)}>Delete</button>
                                                                    </li>
                                                                </ul>) :
                                                                    (<ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                            <button id="call" data-toggle="modal" data-target="#editPersonModal" onClick={() => this.replaceModalItem(index, 'edit', vec.emiratesid)}>Edit Details</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                            <button className={!this.state.show ? "" : this.state.show} onClick={() => this.deleteItem(index)}>Delete</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                            <button className="btn btn-active" id="Fines" data-toggle="modal"
                                                                                data-target="#objectModal"
                                                                                onClick={(e) => this.oepModelViewOpenClick('Fines')} style={{ cursor: 'pointer' }}>No Of Fines: {this.state.vec.finesCount}</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                            <button className="btn btn-active" id="Vehicles"
                                                                                data-toggle="modal"
                                                                                data-target="#objectModal"
                                                                                onClick={(e) => this.oepModelViewOpenClick('Vehicles')} style={{ cursor: 'pointer' }}>No of Vehicles: {this.state.vec.vehiclesCount}</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                                            <button className="btn btn-active"
                                                                                id="Documents"
                                                                                data-toggle="modal"
                                                                                data-target="#objectModal"
                                                                                onClick={(e) => this.oepModelViewOpenClick('Documents')} style={{ cursor: 'pointer' }}>Documents : {this.state.vec.documentsCount}</button>
                                                                        </li>
                                                                    </ul>)
                                                                }
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
                            <div>
                                <div className={this.state.showing
                                    ? "panel panel-default main-body-height-admin"
                                    : ([localStorage.getItem('selectedLanguageCode') == 1
                                        ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offse" +
                                        "t-12 col-xs-offset-12 panel panel-default main-body-height-admin"
                                        : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-rig" +
                                        "ht rtl-main-body-height-admin"])}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                        <br />
                                        <div className={localStorage.getItem('selectedLanguageCode') == 1
                                            ? ""
                                            : " rtl-flip"}>
                                            <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                ? "col-lg-3 col-md-0 col-sm-6 title-image pull-left"
                                                : "col-lg-3 col-md-0 col-sm-6 title-image pull-left"}>
                                                <span className='pics'>&nbsp;
                                            <img id="icon-pics" src={!this.state.vec.profilephoto
                                                        ? require('../../assets/user-img-gold.png')
                                                        : this.state.vec.profilephoto}
                                                        onError={(e) => { e.target.src = require('../../assets/user-img-gold.png') }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="120"
                                                        width="120" />
                                                </span>

                                            </div>
                                            <div
                                                id="left-border-line-admin"
                                                className="col-lg-9 col-md-8 col-sm-6 left-margin pull-right">
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "pull-right"
                                                    : ""}>
                                                    <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fas fa-times" />
                                                </div>
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? ""
                                                    : "rtl-flip"}>
                                                    <p> <span className={localStorage.getItem('selectedLanguageCode') == 1
                                                                ? "title-side-detail-panel ltr-space"
                                                                : "title-side-detail-panel rtl-space"}>{this.state.vec.nameen}</span>
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
                                                <br />
                                                <div className="row">
                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "col-md-6 col-lg-6"
                                                        : "col-md-6 col-lg-6 rtl-flip"}>
                                                        <p>User ID: {this.state.vec.emiratesid}</p>
                                                        <p>Email Address: {this.state.vec.email}</p>
                                                        <p>Password: *********
                              </p>
                                                        <p>Primary Role: {this.state.vec.primaryRole === 'FRTO'
                                                            ? 'Front Office Employee'
                                                            : null}
                                                            {this.state.vec.primaryRole === 'HODP'
                                                                ? 'Head of Department'
                                                                : null}
                                                            {this.state.vec.primaryRole === 'BCKO'
                                                                ? 'Back Office Employee'
                                                                : null}
                                                        </p>

                                                        <p>Mobile Number: ({this.state.vec.mobilenumberwithcountry}) &nbsp; {this.state.vec.mobilenumber} </p>
                                                        <p>Address: {this.state.vec.address},</p>
                                                    </div>
                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "col-md-6 col-lg-6"
                                                        : "col-md-6 col-lg-6 rtl-flip"}>
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
                                                    </div>
                                                </div>
                                                <br /><br />
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? "colour"
                                                    : "colour rtl-flip"}>

                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "black-margin action"
                                                            : "black-margin rtl-black-margin action "}
                                                        data-toggle="modal"
                                                        data-target="#editPersonModal">
                                                        <i className="glyphicon glyphicon-edit" />
                                                        &nbsp; Edit Details
                                                        </button>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1
                                                            ? "black-margin action"
                                                            : "black-margin rtl-black-margin action "}
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
                            </div>
                            : null}

                    </Animated>
                </div>
                <div>
                    {redirectPermit ? <PermitRequestList goToHome={this.hidePermit.bind(this)}
                        emiratesid={modalData.emiratesid}
                        companyPhoto={modalData.companyPhoto}
                        name={modalData.name}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails}
                    /> : null}
                    {redirectVehicle ? <Vehicles goToHome={this.hideVehicle.bind(this)}
                        emiratesid={modalData.emiratesid}
                        companyPhoto={modalData.companyPhoto}
                        name={modalData.name}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails}
                    /> : null}
                    {redirectCompany ? <Company goToHome={this.hideCompany.bind(this)}
                        emiratesid={modalData.emiratesid}
                        companyPhoto={modalData.companyPhoto}
                        name={modalData.name}
                        vehicles={modalData.vehicles}
                        saveModalDetails={this.saveModalDetails}
                    /> : null}
                </div>


                <Create />
            </div>
        );
    }

    render() {
        if (this.state.redirectVehicle) {

            return <Redirect push to={{ pathname: '/vehicles', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectPermit) {
            return <Redirect push to={{ pathname: '/permits-requests-list', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/individual-company', state: { vec: this.state.vec } }} />;
        }


        let filteredCompanies = this.state.currentDrivers
            .filter((vec) => {
                return (vec.emiratesid.toLowerCase().indexOf(this.state.search) !== -1 || vec.nameen.toLowerCase().indexOf(this.state.search) !== -1
                    || vec.nameen.toUpperCase().indexOf(this.state.search) !== -1 || vec.address.toLowerCase().indexOf(this.state.search) !== -1
                    || vec.address.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1);
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
export default People;
