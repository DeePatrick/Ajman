import React, { Component } from 'react';
import Pagination from '../shared/Pagination';
import { Animated } from "react-animated-css";
import RenewPermit from './RenewPermit';
import './Permit.css';
import RequestPermit from './RequestPermit';
import $ from 'jquery';
import * as config from '../../config';
import { Redirect } from 'react-router-dom';
import Loader from '../loader';
class PermitRequestList extends Component {
    displayName = PermitRequestList.name

    constructor(props) {
        super(props);
        this.state = {
            requiredItem: 0,

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
        this.isLoding = this
            .isLoding
            .bind(this);
    }




    componentDidMount() {
        this.bindPermits();
    }

    bindPermits() {
        var _id = this.props.location.state.vec.cRNum;

        console.log(_id);
        const url = config.webApiUrl() + "aptc_company_getPendingPermits/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    this.setState({ vecPermitList: data, loading: false });
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


    replaceModalItem = (index) => {
        var vec = this.state.vecPermitList[index];
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


        fetch(config.webApiUrl()+'aptc_docOut/' + _id, { method: 'delete' }).then(data => {
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
    render() {

        if (!this.state.redirectCompany) {
            return <Redirect push to={{ pathname: '/company' }} />;
        }


        const { vecPermitList, currentDrivers, currentPage, totalPages, loading, redirectCompany } = this.state;
        const totalDrivers = vecPermitList.length;
        let contents = "";
        if (totalDrivers === 0) {
            contents = (<div className="row">
                <div className="col-md-2 col-lg-2 col-sm-5 col-xs-6">
                    <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                        <div
                            className="panel-title black-button-admin center"
                            data-toggle="modal"
                            data-target="#requestModal">
                            <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">Add Permit</span>
                        </div>
                    </Animated>

                </div>
                <div className="col-md-10 col-lg-10 col-sm-6 col-xs-6">
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

                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                            <div className="panel panel-default centered-empty-panel ">
                                <div className="panel panel-body">
                                    <div className="company-header">
                                        <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })} className="fas fa-times" /></div>
                                        <div className="pull-left company-title">
                                            <span><img id="icon-pics"
                                                src={!this.props.location.state.vec.companyPhoto
                                                    ? require('../../assets/companylogos/norecord.png')
                                                    : this.props.location.state.vec.companyPhoto}
                                                onError={(e) => {
                                                    e.target.src = require('../../assets/companylogos/norecord.png');
                                                }}
                                                className="img-rounded"
                                                alt="woman"
                                                height="40"
                                                width="40" />
                                            </span>
                                            <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.name.en_US}</strong></span>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-center text-vertical">
                                            <i className="fas fa-ticket-alt" />
                                            <br />
                                            <br />
                                            <br />
                                            <p>Click Add Permit button to show this panel</p></h5>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
                <RequestPermit />
            </div>);
        }
        else {
            contents = "";
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    currentDrivers === null || currentDrivers === [] ? "No Value" :
                        filteredVehicles = this
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
                }

            }

            const { showing, redirectCompany } = this.state;

            const requiredItem = this.state.requiredItem;
            let modalData = this.state.vecPermitList[requiredItem];

            contents = (<div>  {this.state.loading === true && <div><Loader /></div>}
                <div className="row">
                    <div className="col-md-2 col-lg-2 col-sm-6 col-xs-6">

                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                            <div
                                className="panel-title black-button-admin center"
                                data-toggle="modal"
                                data-target="#requestModal">
                                <i className="fa fa-plus fa-lg" />&nbsp;&nbsp;
                                    <span className="btn-text-admin">Add Permit</span>
                            </div>
                        </Animated>

                    </div>
                    <div className="col-md-10 col-lg-10 col-sm-6 col-xs-6">
                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>

                            <div className="panel panel-default">
                                <div className="panel-body">
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
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <div className="panel panel-default">
                                    <div className="panel panel-body">
                                        <div className="company-header">
                                            <div className="pull-right"><i id="cancel" onClick={() => this.setState({ redirectCompany: !redirectCompany })}
                                                className="fas fa-times" /></div>
                                            <div className="pull-left company-title">
                                                <span><img id="icon-pics"

                                                    src={!this.props.location.state.vec.companyPhoto
                                                        ? require('../../assets/companylogos/norecord.png')
                                                        : this.props.location.state.vec.companyPhoto}
                                                    onError={(e) => {
                                                        e.target.src = require('../../assets/companylogos/norecord.png');
                                                    }}
                                                    className="img-rounded"
                                                    alt="woman"
                                                    height="40"
                                                    width="40" />
                                                </span>
                                                <span style={{ fontSize: '16px' }}> &nbsp;<strong>{this.props.location.state.vec.name.en_US}</strong></span>
                                            </div>
                                        </div>

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
                                                            <i id="icon-ticket-black-admin" className="fas fa-ticket-alt" />
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
                                                    pageLimit={10}
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
                                                                <i id="icon-ticket-small" className="fas fa-ticket-alt" />
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
                                                    pageLimit={10}
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
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>
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
                                                    <i id="cancel" onClick={() => this.setState({ showing: !showing })} className="fas fa-times" />
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
                                            <i id="icon-truck-gold-no-circle" className="fas fa-ticket-alt" /><br /><br />
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

        }

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>

        );

    }
}


export default PermitRequestList;