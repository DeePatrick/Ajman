import React, { Component } from 'react';
import Pagination from '../../shared/Pagination';
import { Animated } from "react-animated-css";
import RenewPermit from './RenewPermit';
import './Permit.css';
import RequestPermit from './RequestPermit';
import $ from 'jquery';

class PermitAdmin extends Component {
    displayName = PermitAdmin.name

    constructor(props) {
        super(props);
        this.state = {
            requiredItem: 0,

            fullName: '',
            vecList: [],
            permitList: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: true,
            countryCodes: []
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

        this.handleClick = this
            .handleClick
            .bind(this);

        fetch("http://103.69.38.2:8081/api/aptc_docOut")
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
            });

    }



    onPageChanged = data => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecList.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentDrivers, totalPages });
    };


    replaceModalItem = (index) => {
        var vec = this.state.vecList[index];
        this.setState({ vec: vec });
        var indx = 0;
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * this.state.currentPage - 1;
            this.setState({ requiredItem: indx });
        }
        else {
            this.setState({ requiredItem: index });
        }

    };

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
        debugger;
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


        fetch('http://103.69.38.2:8081/api/aptc_docOut/' + _id, { method: 'delete' }).then(data => {
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

    handleClick = (index) => {
        this.setState({ vec: index });
        console.log(index);
    };


    callEdit = (e) => {
        e.preventDefault();

        $('#call').click();
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
                .substring(0, 5)
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

    render() {
        const { vecList, currentDrivers, currentPage, totalPages } = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0)
            return null;

        let filteredVehicles = this
            .state
            .currentDrivers
            .filter((vec) => {
                if (vec.indivName === null || vec.vehIDMakeModel === null || vec.vehIDTrafficNum === null) {
                    return (
                        "No Name"
                    );
                }
                else {
                    return (
                        vec.indivName.toLowerCase().indexOf(this.state.search) !== -1 || vec.indivName.toUpperCase().indexOf(this.state.search) !== -1 ||
                        vec.vehIDMakeModel.toLowerCase().indexOf(this.state.search) !== -1 || vec.vehIDMakeModel.toUpperCase().indexOf(this.state.search) !== -1 ||
                        vec.vehIDTrafficNum.toLowerCase().indexOf(this.state.search) !== -1 || vec.vehIDTrafficNum.toUpperCase().indexOf(this.state.search) !== -1
                    );
                }

            });

        const { showing } = this.state;

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];

        let contents = this.state.loading
            ? (
                <p>
                    <img
                        src={require('../../../assets/Gear-1s-200px.gif')}
                        height="35"
                        width="35"
                        alt="woman" />
                    <em>Loading...</em>
                </p>
            )
            : (
                <div>
                    <div className="row">
                        <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">

                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                <div
                                    className="panel-title black-button-admin center"
                                    data-toggle="modal"
                                    data-target="#requestModal">
                                    <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">Add Permit</span>
                                </div>
                            </Animated>

                        </div>
                        <div className="col-md-10 col-lg-10 col-sm-6 col-xs-10">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>

                                <div className="panel1 panel-default1" style={{ marginLeft: '10px'}}>
                                    <div className="panel-body1">
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
                    </div>
                    <RequestPermit />
                    <RenewPermit
                        docOutId={modalData.docOutId}
                        docType={modalData.docType}
                        docRef={modalData.docRef}
                        docClass={modalData.docClass}
                        lang={modalData.lang}
                        version={modalData.version}
                        dateTime={modalData.dateTime}
                        status={modalData.status}
                        validFrom={modalData.validFrom}
                        validTo={modalData.validTo}
                        rejReas={modalData.rejReas}
                        indivID={modalData.indivID}
                        vehID={modalData.vehID}
                        compID={modalData.compID}
                        docContent={modalData.docContent}
                        docFile={modalData.docFile}
                        saveModalDetails={this.saveModalDetails} /> {showing
                            ? <div className="row">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default">
                                        <div className="panel panel-body">
                                            <br />
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
                                                        <th scope="col">Permit Valid from</th>
                                                        <th scope="col">Permit Valid to</th>
                                                        <th scope="col">Permit Type</th>
                                                        <th scope="col">Permit No</th>
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
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                <i id="icon-ticket-black-admin" className="fa fa-ticket" />
                                                                {vec.indivName} &nbsp; {vec.vehIDTrafficNum} &nbsp; {vec.vehIDMakeModel}
                                                            </td>

                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {vec.validFrom}
                                                            </td>

                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {vec.validTo}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {vec.docTypeName}
                                                            </td>
                                                            <td
                                                                scope="row"
                                                                onClick={() => this.setState({
                                                                    showing: !showing
                                                                })}>
                                                                {vec.docOutId}
                                                            </td>

                                                            <td scope="row">
                                                                <button
                                                                    type="hidden"
                                                                    className={this.state.show
                                                                        ? "glyphicon glyphicon-option-horizontal"
                                                                        : this.state.show}
                                                                    data-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false" />
                                                                <button
                                                                    id="call"
                                                                    className={!this.state.show
                                                                        ? ""
                                                                        : this.state.show}
                                                                    data-toggle="modal"
                                                                    data-target="#renewModal"
                                                                    onClick={() => this.replaceModalItem(index)}>Edit</button>
                                                                |
                                                                <button
                                                                    className={!this.state.show
                                                                        ? ""
                                                                        : this.state.show}
                                                                    onClick={() => this.deleteItem(index)}>Delete</button>
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
                            : null}

                    {!showing
                        ? <div className="row">
                            <div className="col-md-4 col-lg-3 col-sm-12 col-xs-12">
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default">
                                        <div className="panel panel-body">
                                            <br />
                                            <div className="rTableRow ">
                                                <div className="well no-well no-border">
                                                    <span className="icon-checkbox">
                                                        <label className="container-y">
                                                            <input type="checkbox" />
                                                            <span className="checkmark" />
                                                        </label>
                                                    </span>
                                                    <span className="icon-info">
                                                        Basic Info</span>
                                                </div>
                                            </div>

                                            <div className="container-fluid movetop">
                                                {filteredVehicles.map((vec, index) => (
                                                    <div className="" key={index}>
                                                        <div className="">
                                                            <div className="speech-bubble small-margin-well">
                                                                <label className="container-y">
                                                                    <input type="checkbox" />
                                                                    <span className="checkmark" />
                                                                </label>

                                                                <span
                                                                    className='pics'
                                                                    onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}>
                                                                    <i id="icon-ticket-small" className="fa fa-ticket" />
                                                                </span>

                                                                <span
                                                                    onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}>&nbsp;{vec.vehIDTrafficNum} &nbsp; {vec.vehIDMakeModel}
                                                                </span>

                                                                <span
                                                                    onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}
                                                                    className="pull-right">&nbsp;&nbsp;
                                                                        <i id="scaled-arrow" className="glyphicon glyphicon-option-horizontal" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
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
                            <div className="col-md-8 col-lg-9 col-sm-12 col-xs-12 left-border">
                                <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                                    <div className="panel panel-default main-body-height-admin">
                                        <div>
                                            <br /></div>
                                        {this.state.vec.docOutId !== undefined && <div>

                                            <div>
                                                <br />
                                                <div className='col-lg-3 col-md-4 col-sm-3 right-border'>
                                                    <span className='pics'>
                                                        <i id="icon-ticket-alt-old-big" className="fa fa-ticket-alt" />
                                                    </span>
                                                </div>

                                                <div id="left-border-line" className="col-lg-9 col-md-8 col-sm-9">
                                                    <div className="pull-right">
                                                        <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fa fa-times" />
                                                    </div>
                                                    <div className="">
                                                        <div className="">
                                                            <h3>{this.state.vec.vehIDTrafficNum} &nbsp; {this.state.vec.vehIDMakeModel}  <button className="btn btn-primary">Approved</button></h3>
                                                            <br />
                                                            Permit Valid from
                                                        <code>
                                                                {!this.state.vec.validFrom
                                                                    ? '20/10/2011'
                                                                    : this.state.vec.validFrom}</code>
                                                            to
                                                        <code>
                                                                {!this.state.vec.validTo
                                                                    ? '20/10/2019'
                                                                    : this.state.vec.validTo}</code>
                                                            <br /> <br />
                                                            <p>Permit Type: {this.state.vec.docTypeName} </p>

                                                            <p>Permit Number: {this.state.vec.docOutId}</p>
                                                            <br />
                                                            <h5>Vehicle Registrar:</h5>
                                                        </div>
                                                        <div className="" />
                                                    </div>
                                                    <div>
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
                                                            width="52" data-toggle="tooltip" data-placement="bottom" title={!this.state.vec.indivName ? "No Registar required for this permit" : this.state.vec.indivName}
                                                        />

                                                    </div>
                                                    <br />

                                                    <br />

                                                    <div className="colour">
                                                        <button className="black-margin">
                                                            <i className="fa fa-truck" />
                                                            &nbsp; Vehicle Info
                                                            </button>
                                                        <button
                                                            className="black-margin"
                                                            data-toggle="modal"
                                                            data-target="#renewModal"
                                                            onClick={this
                                                                .callEdit
                                                                .bind(this)}>
                                                            <i id="action" className="fa fa-retweet" />
                                                            &nbsp; Renew Permit
                                                            </button>
                                                        <button className="black-margin">
                                                            <i className="fa fa-envelope" />
                                                            &nbsp; Message
                                                            </button>
                                                        <button className="black-margin">
                                                            <i className="fa fa-phone" />
                                                            &nbsp; Call
                                                            </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {this.state.vec.docOutId === undefined && <span>
                                            <h5 className="text-center text-vertical"><br /><br /><br />
                                                <i id="icon-truck-gold-no-circle" className="fa fa-ticket" /><br /><br />
                                                Click Vehicle Group button to show this panel</h5>
                                        </span>
                                        }

                                    </div>

                                </Animated>

                            </div>
                        </div>
                        : null}
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

export default PermitAdmin;
