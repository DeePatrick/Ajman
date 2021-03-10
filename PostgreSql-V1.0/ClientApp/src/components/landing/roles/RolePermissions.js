import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Loader from '../../loader';
import Pagination from './../../shared/Pagination';
import axios from 'axios';
import * as config from '../../../config';


export default class RolePermissions extends Component {
    displayName = RolePermissions.name

    constructor(props) {
        super(props);

        this.state = {
            isDesktop: false,
            statusid: 0,
            requiredItem: 0,

            currentPage: 0,
            pageLimit: 0,

            vecList: [],
            currentDrivers: [],
            filteredRoles: [],
            offset: 0,
            vec: [],
            search: '',

            showing: true,

            loading: true,
            isMobile: false,

            add: false,
            update: false,
            delete: false,
            read: false,
            approve: false,
            reject: false,
            refund: false,
            cancel: false

        };

        this.updatePredicate = this.updatePredicate.bind(this);

        this.replaceModalItem = this.replaceModalItem.bind(this);
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
		debugger;
        //fetch(config.webApiUrl() + 'aptc_RolePermissions/' + localStorage.getItem('userid'))
        fetch(config.webApiUrl() + 'aptc_RolePermissions/306')
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
                this.setState({ isEditOpen: true, isAddOpen: true });
            });
    }
    addClick = (index) => {
        this.setState({ isAddOpen: true });
    };

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

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }


    replaceModalItem = (index, action) => {
        if (action === 'edit') {
            this.setState({ isEditOpen: true });

        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });

        }

        this.toggleAddChange();

        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.state.requiredItem = indx;
            vec = this.state.vecList[indx];
            this.state.vec = vec;
        }
        else {
            vec = this.state.vecList[index];
            this.state.vec = vec;
            this.state.requiredItem = indx;
        }
    };

    toggleAddChange = () => {
        this.state.add = !this.state.add
    }

    toggleUpdateChange = () => {
        this.setState({
            update: !this.state.update
        });
    }

    toggleDeleteChange = () => {
        this.setState({
            delete: !this.state.delete
        });
    }

    toggleReadChange = () => {
        this.setState({
            read: !this.state.read
        });
    }

    toggleApproveChange = () => {
        this.setState({
            approve: !this.state.approve
        });
    }

    toggleRejectChange = () => {
        this.setState({
            reject: !this.state.reject
        });
    }

    toggleRefundChange = () => {
        this.setState({
            refund: !this.state.refund
        });
    }

    toggleCancelChange = () => {
        this.setState({
            cancel: !this.state.cancel
        });
    }


    render() {
        console.log("add " + this.state.add);

        const isDesktop = this.state.isDesktop;

        const { vecList, currentDrivers, currentPage, totalPages, loading, redirectCompany, redirectSeeMore } = this.state;
        const totalDrivers = vecList.length;
        let contents = "";
        if (totalDrivers === 0 && loading === false) {
            contents = (
                <div>
                    <div className="fixed-search">
                        <div className="col-md-3 col-lg-2 col-sm-3 col-xs-3 add-button pull-left">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    data-target="#indAddModal"
                                    onClick={this.addClick.bind()}>
                                    <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                <span className="btn-text-admin">Add Role</span>
                                </div>
                            </Animated>
                        </div>
                        <div className="col-md-9 col-lg-10 col-sm-9 col-xs-9 entity-search-input pull-right">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>

                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div>
                                            <input
                                                type="text"
                                                className="form-search-admin"
                                                placeholder="Search ..." />
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

                        <div className="">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                    <div className="panel panel-default main-body-height">
                                        <div className="panel panel-body">
                                            <div className="company-header">
                                                <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                                <div className="pull-left company-title">
                                                    <span><img id="icon-pics"
                                                        src={require('../../../assets/companylogos/norecord.png')}
                                                        onError={(e) => {
                                                            e.target.src = require('../../../assets/companylogos/norecord.png');
                                                        }}
                                                        className="img-rounded"
                                                        alt="woman"
                                                        height="40"
                                                        width="40" />
                                                    </span>
                                                    {/* <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.nameen}</strong></span> */}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="text-center text-vertical">
                                                    <i className="fas fa-user-alt icon-truck-gold-no-circle" />
                                                    <p>No Roles in company. Click "Add Roles" button to add Roless to this Company</p></h5>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </Animated>
                            </div>
                        </div>

                    </div>
                    {/* 
                    <AddPermissions
                        roleid={this.props.roleid}
                        companyid={this.state.companyid}
                        saveModalDetails={this.saveModalDetails}
                        companyList={this.state.companyList} />
                        */}
                </div>
            );
        }
        else {
            contents = "";
            let filteredRoles = [];
            if (this.state.currentDrivers.length > 0) {
                filteredRoles = this
                    .state
                    .currentDrivers
                    .filter((vec) => {
                        if (vec.menunameen === null || vec.rolename === null) {
                            return (
                                "No fullname"
                            );
                        }
                        else {
                            return (vec.menunameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.menunameen.toUpperCase().indexOf(this.state.search) !== -1 || vec.rolename.toUpperCase().indexOf(this.state.search) !== -1 || vec.rolename.toLowerCase().indexOf(this.state.search) !== -1);
                        }

                    });

            }
            const { showing, redirectCompany } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecList[requiredItem];



            contents = this.state.loading
                ? (<p>
                    <Loader />
                </p>)
                : (
                    <div
                        className="modal fade"
                        id="roleChangeModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="roleChangeModalLabel">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>

                                </div>
                                <form name="form" onSubmit={this.onSubmit}>
                                    <div className="modal-body">
                                        <div className="container-fluid">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-width">
                                                                <thead>
                                                                    <tr>
                                                                        <select
                                                                            value={this.state.roleid}
                                                                            onChange={this.handleRoleChange}
                                                                            className="edit-form"
                                                                            required>
                                                                            {filteredRoles.slice(1, 2).map((g, index) => <option key={index} value={g.roleid}>{g.rolename}</option>)}
                                                                        </select>
                                                                    </tr>


                                                                    <tr>
                                                                        <th scope="col">Features</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Create</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Update</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Delete</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Read</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Approve</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Reject</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Refund</th>
                                                                        <th scope="col" className={this.state.showing ? null : "hidden-column"}>Cancel</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {filteredRoles.map((vec, index) => (<tr className="panel-bubble-new" key={index}>

                                                                        <td
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.menunameen}
                                                                        </td>
                                                                        <td
                                                                            onChange={this.replaceModalItem(index, '', vec.cRNum)}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.add ? this.state.add = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.add} /><span className="checkmark" /></label>}
                                                                        </td>
                                                                        <td onChange={this.toggleUpdateChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.update ? this.state.update = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.update} /><span className="checkmark" /></label>}
                                                                        </td>

                                                                        <td onChange={this.toggleDeleteChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.delete ? this.state.delete = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.delete} /><span className="checkmark" /></label>}
                                                                        </td>
                                                                        <td onChange={this.toggleReadChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.read ? this.state.read = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.read} /><span className="checkmark" /></label>}
                                                                        </td>
                                                                        <td onChange={this.toggleApproveChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.approve ? this.state.approve = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.approve} /><span className="checkmark" /></label>}
                                                                        </td>
                                                                        <td onChange={this.toggleRejectChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.reject ? this.state.reject = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.reject} /><span className="checkmark" /></label>}
                                                                        </td>

                                                                        <td onChange={this.toggleRefundChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.refund ? this.state.refund = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.refund} /><span className="checkmark" /></label>}
                                                                        </td>
                                                                        <td onChange={this.toggleCancelChange}
                                                                            scope="row"
                                                                            className={this.state.showing ? null : "hidden-column"}>
                                                                            {vec.cancel ? this.state.cancel = true : null}
                                                                            {<label className="container-x" ><input type="checkbox" checked={this.state.cancel} /><span className="checkmark" /></label>}
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
                                                            Role features
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
                                    </div>
                                </form>

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