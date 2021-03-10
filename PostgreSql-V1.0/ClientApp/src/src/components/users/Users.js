import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import AddUser from './AddUser';
import axios from 'axios';
import $ from 'jquery';
import EditUser from './EditUser';
import Docs from '../documents/Docs';
import Loader from '../loader';
import * as config from '../../config';
import { PropTypes } from 'react';


class Users extends Component {
    displayName = Users.name

    constructor(props) {
        super(props);
        this.state = {
            isDesktop: false,
            statusid: 0,
            requiredItem: 0,
            name: '',
            vecList: [],
            docList: [],
            roles: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            areaCodes: [],
            roleList: [],
            roleCodes: [],
            showing: true
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

        this.handleClick = this
            .handleClick
            .bind(this);

        this.approve = this
            .approve
            .bind(this);

        this.reject = this
            .reject
            .bind(this);

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 4)
            .then(response => response.json())
            .then(data => {
                var tempArea = [];
                $.each(data, function (index, country) {
                    if (country.Code === 'AE') {
                        $
                            .each(country.State, function (i, area) {
                                var areaCodes = {};
                                areaCodes.name = area.Value;
                                areaCodes.value = area.area_code;
                                tempArea[i] = areaCodes;
                            });
                    }
                });
                this.setState({ areaCodes: tempArea });
            });

        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 25)
            .then(response => response.json())
            .then(data => {
                var tempRole = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Code !== 'EXTN') {
                        for (var x = 0; x < data[i].Roles.length; x++) {
                            var role = {};
                            role.name = data[i].Roles[x].Val;
                            role.code = data[i].Roles[x].Code;
                            tempRole[x] = role;
                        }
                    }
                }

                this.setState({ roleList: data });
                this.setState({ roleCodes: tempRole });

            });

    }

    componentDidMount() {
        this.bindUser();
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }




    bindUser() {
        fetch(config.webApiUrl() + "aptc_user/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
            });
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 991 });
    }

    onPageChanged = (data) => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        if (vecList.StatusCode !== '404') {
            const currentDrivers = vecList.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }
        //const currentDrivers = vecList.slice(offset, offset + pageLimit);
    };

    replaceModalItem = (index) => {
        var vec = this.state.vecList[index];
        this.setState({ vec: vec });

        this.toggleHide();

        var indx = 0;
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * this.state.currentPage - 1;
            this.setState({ requiredItem: indx });
        } else {
            this.setState({ requiredItem: index });
        }
    };


    toggleHide = () => {
        if (this.state.isDesktop) {
            this.setState({ showing: false });
        }
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
        } else {
            valueObject = this.state.vecList[index];
        }
        _id = valueObject.userid;
        var _emailid = valueObject.emailid;
        if (!window.confirm("Do you want to delete user with email: " + _emailid))
            return;
        else {
            this.setState({ loading: true });
            this.fullDelete(_id, index);
        }
    };

    deleteInnerItem(index) {
        var userid;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        userid = valueObject.userid;
        var _emailid = valueObject.emailid;

        if (!window.confirm("Do you want to delete user with email: " + _emailid))
            return;
        else {
            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.fullDelete(userid);
        }
    }

    fullDelete(userid) {
        var _id;
        _id = userid;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        var valueObjectId = valueObject.userid;


        fetch(config.webApiUrl() + 'aptc_user/' + _id, { method: 'delete' }).then(data => {
            const requiredItem = this.state.requiredItem;
            let tempbrochure = this.state.vecList;
            tempbrochure.splice(requiredItem, 1);
            this.setState({ vecList: tempbrochure });
            this.setState({ currentDrivers: tempbrochure });
            this.setState({ vec: tempbrochure[requiredItem] });
            this.setState({ loading: false });
        });
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
        var id = valueObject.userid;
        _name = valueObject.username;
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

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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
        var _name = valueObject.username;
        var id = valueObject.userid;
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

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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
        var id = valueObject.userid;
        _name = valueObject.username;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Rejected by Management, Individual not valid...";
        }
        obj.id = id;
        obj.statusid = parseInt(422);

        if (!window.confirm("Are you sure you want to reject " + _name + " ?"))
            return;
        else {
            console.log(obj);
            obj.rejectreason = prompt("Enter reason for rejection", "Rejected by Management, Individual not valid...");

            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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
        var _name = valueObject.username;
        var id = valueObject.userid;
        if (valueObject.rejectreason) {
            var rejectreason = valueObject.rejectreason;
            obj.rejectreason = rejectreason;
        }
        else {
            obj.rejectreason = "Rejected by Management, Individual not Valid...";
        }

        obj.id = id;
        obj.statusid = parseInt(422);

        if (!window.confirm("Are you sure you want to reject " + _name + " ?"))
            return;
        else {
            console.log(obj);
            obj.rejectreason = prompt("Enter reason for rejection", "Rejected by Management, Individual not valid...");
            const approval = JSON.stringify(obj);

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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
        var id = valueObject.userid;
        _name = valueObject.username;
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

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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
        var _name = valueObject.username;
        var id = valueObject.userid;
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

            axios.put(config.webApiUrl() + 'aptc_user_approved', approval, {
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

    handleClick = (index) => {
        this.setState({ vec: index });
        console.log(index);
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


    renderUserList() {
        const { vecList, currentDrivers, currentPage, totalPages } = this.state;
        const totalDrivers = vecList.length;

        if (totalDrivers === 0)
            return null;

        let filteredUsers = this
            .state
            .currentDrivers
            .filter((vec) => {
                if (vec.username === null || vec.email === null) {
                    return ("No User found");
                } else {
                    return (vec.username.toLowerCase().indexOf(this.state.search) !== -1 || vec.username.toUpperCase().indexOf(this.state.search) !== -1 || vec.emailid.toUpperCase().indexOf(this.state.search) !== -1 || vec.emailid.toLowerCase().indexOf(this.state.search) !== -1);
                }

            });

        const { showing } = this.state;

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];

        return (
            <div>

                {(localStorage.getItem('selectedLanguageCode') == 2) ?
                    (
                        <div className="arab-fixed-search">
                            <div className="col-md-10 col-lg-10 col-sm-7 col-xs-9 entity-search-input">

                                <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default search-input-wrapper">
                                        <div className="panel-body search-input">
                                            <div>
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
                                    </div>
                                    <br />
                                </Animated>
                            </div>
                            <div className="col-md-2 col-lg-2 col-sm-5 col-xs-3">
                                <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div
                                        className="panel-title black-button-admin center"
                                        data-toggle="modal"
                                        data-target="#myModal">
                                        <i className="fa fa-plus fa-lg" />
                                        <span className="btn-text-admin">Add Internal User</span>
                                    </div>
                                </Animated>
                            </div>
                        </div>
                    ) : (
                        <div className="fixed-search" >
                            <div className="col-md-2 col-lg-2 col-sm-5 col-xs-3">

                                <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div
                                        className="panel-title black-button-admin center"
                                        data-toggle="modal"
                                        data-target="#myModal">
                                        <i className="fa fa-plus fa-lg" />
                                        <span className="btn-text-admin">Add Internal User</span>
                                    </div>
                                </Animated>
                            </div>
                            <div className="col-md-10 col-lg-10 col-sm-7 col-xs-9 entity-search-input">
                                <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default search-input-wrapper">
                                        <div className="panel-body search-input">
                                            <div>
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
                                    </div>
                                    <br />
                                </Animated>
                            </div>
                        </div>)}

                <AddUser
                    saveModalDetails={this.saveModalDetails}
                />
                <EditUser
                    userid={modalData.userid}
                    usertype={modalData.usertype}
                    username={modalData.username}
                    emailid={modalData.emailid}
                    mobilearea={modalData.mobilearea}
                    mobilecountry={modalData.mobilecountry}
                    mobilenumber={modalData.mobilenumber}
                    isactive={this.state.isactive}
                    statusid={modalData.statusid}
                    status={modalData.status}
                    language={modalData.language}
                    roleid={modalData.roleid}
                    rolename={modalData.rolename}
                    departmentid={modalData.departmentid}
                    department={modalData.department}
                    departmentname={modalData.departmentname}
                    password={modalData.password}
                    confirmpassword={modalData.confirmpassword}
                    prevpass={modalData.prevpass}
                    passsetdate={modalData.passsetdate}
                    emirateId={modalData.emirateId}
                    userphoto={modalData.userphoto}
                    secondaryroleid={modalData.secondaryroleid}
                    secondaryrolename={modalData.secondaryrolename}
                    saveModalDetails={this.saveModalDetails} />
                <Docs
                    docType={modalData.docType}
                    lang={modalData.lang}
                    indivID={modalData.indivID}
                    docFormat={modalData.docFormat}
                    docImage={modalData.docImage} /> {!filteredUsers
                        ? (
                            <h1>There is no Internal User</h1>
                        )
                        : null}

                <div className={this.state.showing ? "entity-table" : "entity-table entity-table-padding"}>
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                        <div className={this.state.showing ? "panel panel-default" : ([localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left" : "col-lg-4 col-md-4 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default animate-table pull-right arab-left-panel"])} >
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
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Email</th>
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Mobile</th>
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Department</th>
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Primary Role</th>
                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {filteredUsers.map((vec, index) => (
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
                                                                <img
                                                                    id="icon-pics"
                                                                    src={!vec.userphoto
                                                                        ? require('../../assets/user-img.png')
                                                                        : vec.userphoto}
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

                                                                &nbsp;{vec.username}

                                                            </td>

                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? null : "hidden-column"}
                                                                onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                {vec.emailid}

                                                            </td>

                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? null : "hidden-column"}
                                                                onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                {vec.mobilecountry}&nbsp;{vec.mobilearea}&nbsp;{vec.mobilenumber}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? null : "hidden-column"}
                                                                onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                ({vec.department})
                                            </td>
                                                            <td
                                                                scope="row"
                                                                className={this.state.showing ? null : "hidden-column"}
                                                                onClick={() => this.replaceModalItem(index, '', vec.companyid)}>
                                                                ({vec.rolename})
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
                                                                    <ul className="dropdown-menu dropdown-menu3 dropdown-inverse pull-right" aria-labelledby="dropdownMenu4">
                                                                        <li className="dropdown-spacing table-dropdown-small-width" onClick={() => this.replaceModalItem(index)}>
                                                                            <button id="call" className="" data-toggle="modal" data-target="#editModal">Edit</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width" onClick={() => this.deleteItem(index)}>
                                                                            <button className="">Delete</button>
                                                                        </li>
                                                                        <li className="dropdown-spacing table-dropdown-small-width" onClick={() => this.replaceModalItem(index)}>
                                                                            <button className="" data-toggle="modal" data-target="#attachModal">Attachment</button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
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


                        {this.state.vec.emailid !== undefined && !this.state.showing ?
                            <div className={this.state.showing ? "panel panel-default main-body-height-admin" : ([localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default main-body-height-admin" : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-right rtl-main-body-height-admin"])} >
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                                    <br />
                                    <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "" : " rtl-flip"}>
                                        <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-3 col-md-4 col-sm-6 title-image pull-left" : "col-lg-3 col-md-4 col-sm-6 title-image pull-left"} >
                                            <span className='pics'>&nbsp;
                                            <img id="icon-pics" src={!this.state.vec.userphoto
                                                    ? require('../../assets/user-img-gold.png')
                                                    : this.state.vec.userphoto}
                                                    onError={(e) => { e.target.src = require('../../assets/user-img-gold.png') }}
                                                    className="img-circle"
                                                    alt="woman"
                                                    height="120"
                                                    width="120" />
                                            </span>

                                        </div>

                                        <div
                                            id="left-border-line-admin"
                                            className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-9 col-md-8 col-sm-9 left-margin" : "col-lg-9 col-md-8 col-sm-9 left-margin"}>


                                            <div>
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "" : "rtl-flip"}>
                                                    <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "pull-right" : "pull-left"}>
                                                        <i
                                                            id="cancel"
                                                            onClick={() => this.setState({
                                                                showing: !showing
                                                            })}
                                                            className="fas fa-times" />
                                                    </div>
                                                    <p> <span className={localStorage.getItem('selectedLanguageCode') == 1 ? "title-side-detail-panel ltr-space" : "title-side-detail-panel rtl-space"} >{this.state.vec.username}</span>
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
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-md-6 col-lg-6" : "col-md-6 col-lg-6 rtl-flip"}>
                                                    <p>User ID: {this.state.vec.userid}</p>
                                                    <p>Email Address: {this.state.vec.emailid}</p>
                                                    <p>Password: *********
                              </p>
                                                    <p>Primary Role: {this.state.vec.rolename}
                                                    </p>

                                                    <p>Mobile Number: ({this.state.vec.mobilecountry}) &nbsp; {this.state.vec.mobilearea}
                                                        &nbsp; {this.state.vec.mobilenumber}

                                                    </p>
                                                </div>
                                                <div className="col-md-6 col-lg-6" />
                                            </div>
                                            <br /><br />
                                            <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "colour" : "colour rtl-flip"}>
                                                <button
                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                    data-toggle="modal"
                                                    data-target="#editModal">
                                                    <i id="action" className="glyphicon glyphicon-edit" />
                                                    &nbsp; Edit Details
                            </button>

                                                <button
                                                    className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action "}
                                                    onClick={this
                                                        .deleteInnerItem
                                                        .bind(this)}>

                                                    <i id="action" className="fa fa-trash" />
                                                    &nbsp; Delete User
                            </button>
                                            </div>
                                        </div>
                                    </div></Animated>
                            </div>
                            : null}

                    </Animated>
                </div>
            </div>
        );
    }

    render() {

        let filteredUsers = this
            .state
            .currentDrivers
            .filter((vec) => {
                return (vec.username.toLowerCase().indexOf(this.state.search) !== -1 || vec.username.toUpperCase().indexOf(this.state.search) !== -1 || vec.emailid.toUpperCase().indexOf(this.state.search) !== -1 || vec.emailid.toLowerCase().indexOf(this.state.search) !== -1);

            });

        let contents = this.state.loading
            ? <p className="wrapper-content">
                <Loader />
            </p>
            : this.renderUserList(filteredUsers);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >
        );
    }
}
export default Users;


