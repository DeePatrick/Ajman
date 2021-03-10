import React, { Component } from 'react';
import Pagination from '../../shared/Pagination';
import { Animated } from "react-animated-css";
import './Permit.css';
import RequestPermit from './RequestPermit';
import axios from 'axios';
import $ from 'jquery';
import * as config from './../../../config';
import { Redirect } from 'react-router-dom';
import Loader from '../../loader';

class PermitApproval extends Component {
    displayName = PermitApproval.name

    constructor(props) {
        super(props);
        this.state = {
            cRNumID: '',
            requiredItem: 0,
            currentDrivers:[],
            action:'',
            docAccepted: 'AP',
            fullName: '',
            vecList: [],
            permitList: [],
            currentDrivers: [],
            loading: false,
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
        this.bindPermits('pen');
    }

    componentWillReceiveProps(nextprocs) {
        this.setState({ vecList: [] });
        this.setState({ action: nextprocs.action });
        this.bindPermits(nextprocs.action)
    }
    bindPermits(obj) {
        this.setState({ loading: true });
        var url = config.webApiUrl() + "aptc_permit/" + localStorage.getItem('selectedLanguageCode');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    var tempPermitList = [];

                    for (var i = 0; i < data.length; i++) {
                        if (obj === 'pen' && data[i].statusid === 420) {
                            tempPermitList.push(data[i])
                        }
                        if (obj === 'app' && data[i].statusid === 421) {
                            tempPermitList.push(data[i])
                        }
                        if (obj === 'rej' && data[i].statusid === 422) {
                            tempPermitList.push(data[i])
                        }
                    }
                    this.setState({ vecList: tempPermitList, currentDrivers: tempPermitList.length, loading: false });
                }

            }).catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });
        { };

        //console.log(this.state.vecList);
    }


    onPageChanged = data => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecList.slice(offset, offset + pageLimit);

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
            vec = this.state.vecList[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.vecList[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
        }


    };


    toggleHide = () => {
        var showing = this.state.showing;
        this.setState({ showing: false });
    }


    isLoding() {
        this.setState({ loading: true });
    }

    saveModalDetails = (vec) => {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.vecList;
        tempbrochure[requiredItem] = vec;
        this.setState({ vecList: tempbrochure });
        this.setState({ currentDrivers: tempbrochure });
        this.setState({ vec: vec });
    };

    deleteItem = (index) => {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;
        if (this.state.vecList.length === 0) {
            valueObject = [];
        }
        else {
            valueObject = this.state.vecList[index];
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


        fetch(config.webApiUrl() + 'aptc_docOut/' + _id, { method: 'delete' }).then(data => {
            const requiredItem = this.state.requiredItem;
            let tempbrochure = this.state.vecList;
            tempbrochure.splice(requiredItem, 1);
            this.setState({ vecList: tempbrochure });
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


    approveOuter = (index, action) => {
        debugger;
        var _id;
        var valueObject = this.state.vecList[index];
        var _permittype = valueObject.permittype;
        var _permitNo = 'PR-0' + valueObject.permitid;
        _id = valueObject.permitid;
        var msg=""
        if (action === 'app') {
            msg='approve'
        }
        if (action === 'rej') {
            msg = 'reject'
        }
        if (!window.confirm("Are you sure you want to " + msg + ' ' + _permittype + " permit for " + _permitNo + " ?"))
            return;
        else {
            this.setState({ loading: true });
            var approvedDetails = {};
            approvedDetails.id = _id
            if (action==='app') {
                approvedDetails.statusid = 421
            }
            if (action === 'rej') {
                approvedDetails.statusid = 422
                approvedDetails.rejectreason = "rejectreason"
            }
            const approved = JSON.stringify(approvedDetails);
            debugger;
            axios.put(config.webApiUrl() + 'aptc_permit_approved', approved, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.setState({ loading: false });

                if (action === 'app') {
                    msg = ' has been approved successfully.'
                }
                if (action === 'rej') {
                    msg = ' has been rejected successfully.'
                }

                alert(valueObject.permittype + ' permitNo ' + _permitNo + msg);
                this.bindPermits('pen');
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
        }
        let vec = Object.assign({}, this.state.vec);
        vec.statusid = parseInt(approvedDetails.statusid);
        this.setState({ vec });

    }

    render() {

        const { vecList, currentDrivers, currentPage, totalPages, loading, redirectCompany } = this.state;
        const totalDrivers = vecList.length;
        let contents = "";

        contents = "";
        let filteredPermits = [];
        //if (totalDrivers > 0) {
        //    var abc = currentDrivers;
        //    debugger;
        //    filteredPermits = this
        //        .state
        //        .currentDrivers
        //        .filter((vec) => {
        //            return (
        //                vec.permittype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        //            );
        //        });
        //}

        const { showing } = this.state;
        const requiredItem = this.state.requiredItem;
        contents = (
            <div>  {this.state.loading === true && <div><Loader /></div>}
                <div className="row">
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                        <div className="panel">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default search-input-wrapper">
                                        <div className="panel-body search-input">
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-search-admin"
                                                    placeholder="Search Permit..."
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
                            <div className="panel permitdiv">
                                <br />
                                <table className="table table-width">
                                    <thead>
                                        <tr>
                                            <th scope="col">Basic Info</th>
                                            <th scope="col">Permit Type</th>
                                            <th scope="col">Permit No</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Fees Paid</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.vecList.map((vec, index) => (

                                            <tr className="panel-bubble-new" key={index}>
                                                <td
                                                    scope="row"
                                                    onClick={() => this.setState({
                                                        showing: !showing
                                                    })}>

                                                    {!vec.platenumber ? null : vec.platenumber} &nbsp; {vec.nameen}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? null : "hidden-column"}>
                                                    {vec.permittype}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? null : "hidden-column"}>
                                                    PR-0{vec.permitid}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? null : "hidden-column"}>
                                                    {!vec.duration ? "12 month" : vec.duration}(s)
                                                </td>
                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? null : "hidden-column"}>
                                                    {vec.amount} (AED)
                                                </td>

                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? "status-item" : "hidden-column"}>
                                                    {vec.statusid == (420).toString() ? "Pending" : ([vec.statusid == (422).toString() ? "Rejected" : "Approved"])}

                                                </td>

                                                <td
                                                    scope="row"
                                                    className={this.state.showing ? "status-item" : "hidden-column"}>
                                                    <span className="btn-group">
                                                        <i className="dropdown-arrow dropdown-arrow-inverse" />
                                                        <button className={vec.statusid == (420).toString() ? "btn btn-active status dropdown-toggle status-title" : ([vec.statusid == (422).toString() ? "btn btn-status-rejected dropdown-toggle status status-title-rejected" : "btn btn-status-approved dropdown-toggle status status-title-approved"])} data-toggle="dropdown" >
                                                            Action<span className="dropdown-chevron glyphicon glyphicon-chevron-down" /></button>
                                                        <ul className="dropdown-menu dropdown-menu3 dropdown-inverse">
                                                            <li className="dropdown-spacing" onClick={() => this.approveOuter(index,'app')}>Approved</li>
                                                            <li className="dropdown-spacing" onClick={() => this.approveOuter(index, 'rej')}>Rejected</li>
                                                        </ul>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="movein">
                                    <div>
                                        <h4>
                                            <strong >{totalDrivers}</strong>{" "}
                                            Permit entries
                                                    </h4>
                                        {currentPage && (
                                            <span>
                                                Page &nbsp;
                                                            <span className="font-weight-bold">{currentPage}</span>
                                                /{" "}
                                                <span className="font-weight-bold">{totalPages}</span>
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Pagination
                                            totalRecords={totalDrivers}
                                            pageLimit={5}
                                            pageNeighbours={1}
                                            onPageChanged={this
                                                .onPageChanged
                                                .bind(this)} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Animated>
                </div>

            </div>

        );

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>

        );

    }
}
export default PermitApproval;