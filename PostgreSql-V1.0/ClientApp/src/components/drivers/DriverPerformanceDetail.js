import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import { Link } from 'react-router-dom';
import Pagination from './../shared/Pagination';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as config from '../../config';
import Loader from '../loader';
import ListOfCompanies from '../shared/ListOfCompanies';
import ListOfVehicleHire from '../shared/ListOfVehicleHire';

class DriverPerformanceDetail extends Component {
    displayName = DriverPerformanceDetail.name

    constructor(props) {
        super(props);

        this.state = {

            requiredItem: 0,

            currentPage: 0,
            pageLimit: 0,

            comStatus: {
                statusID: "PE",
                dateTime: null
            },


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

            redirectVehicle: false,
            redirectPermit: false,
            redirectIndividual: false,
            redirectCompany: true,
            redirectSeeMore: false,
            numEmployeesCount: 0,
            loading: true
        };


        this.saveModalDetails = this
            .saveModalDetails
            .bind(this);



        this.handleClick = this
            .handleClick
            .bind(this);

        this.addClick = this
            .addClick
            .bind(this);


    }


    componentDidMount() {
        this.bindCompany();
    }

    bindCompany() {
        fetch(config.webApiUrl() + "/aptc_getAllActiveDrivers/" + localStorage.getItem('selectedLanguageCode') + "/" + 15)
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
            });

        var crnum = this.props.match.params["crnum"];
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


    deleteInnerItem(index) {
        var _id;
        console.log(this.state.vec);
        var valueObject = this.state.vec;

        _id = valueObject.email;

        if (!window.confirm("Do you want to delete user  with Id: " + _id))
            return;
        else {
            let tempBrochure = this.state.vecList;
            tempBrochure.splice(index, 1);
            this.setState({ vecList: tempBrochure });

            this.fullDelete();
        }
    }


    handleClick = (index) => {
        this.setState({ vec: index });
        console.log(index);
    };

    callSeeMore = () => {
        this.setState({ redirectSeeMore: true });
    }

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


    renderDriverPerformanceDetailList() {
        console.log(this.state.vec);

        const { vecList, showing, redirectVehicle, redirectPermit, redirectIndividual, redirectCompany } = this.state;
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];

        const { currentPage, totalPages } = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0)
            return null;

        let filteredCompanies = [];
        if (this.state.vecList.length > 0) {
            filteredCompanies = this
                .state
                .vecList
                .filter((vec) => {
                    return (vec.nameen.toUpperCase().indexOf(this.state.search) !== -1 || vec.nameen.toLowerCase().indexOf(this.state.search) !== -1);
                });
        }

        return (
            <div className="wrapper-content">
                <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                    ? "fixed-search"
                    : "arab-fixed-search"}>
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 entity-search-input pull-right">
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

                <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                    ? "entity-table entity-table-padding"
                    : "entity-table entity-table-padding-rtl"}>

                    <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                        ? "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-left"
                        : "col-lg-4 col-md-4 col-sm-12 col-xs-12 panel panel-default animate-table pull-right"}>
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                            <div className="panel full-height">

                                <div className="panel-body">
                                    <br />
                                    <h4>Search Results</h4><br />
                                    <div className="container-fluid">
                                        {filteredCompanies.map((vec, index) => <div className={(localStorage.getItem('selectedLanguageCode') == 1)
                                            ? "row"
                                            : "arab-row row"} key={index} onClick={this.handleClick.bind(this, vec)}>
                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-4">
                                                <Link to={'/login'}>
                                                    <span className='pics'>
                                                        <img
                                                            id="icon-pics"
                                                            src={!vec.profilephoto
                                                                ? require('../../assets/user-img.png')
                                                                : vec.profilephoto}
                                                            onError={(e) => {
                                                                e.target.src = require('../../assets/user-img.png')
                                                            }}
                                                            className="img-circle"
                                                            alt="woman"
                                                            height="45"
                                                            width="45" />
                                                    </span>
                                                </Link>
                                            </div>

                                            <div className="col-md-10 col-lg-10 col-sm-11 col-xs-8">
                                                <div id="profile" className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                    ? "speech-bubble-left-black"
                                                    : "rtl-flip-bubble speech-bubble-left-black"}>
                                                    <span style={{fontSize:'14px'}} className={(localStorage.getItem('selectedLanguageCode') == 1)
                                                        ? ""
                                                        : "rtl-flip pull-left"}>
                                                        {vec.namear} &nbsp;&nbsp; {vec.nameen}
                                                    </span>
                                                    <Link to={'/car-track/drivers'}>
                                                        <span className="pull-right">
                                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>)}
                                        <div className="movein">
                                            <div style={{ float: 'right' }}>
                                                <h4>
                                                    <strong >{totalDrivers}</strong>{" "}
                                                    Driver entries
                                                    </h4>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "col-lg-8 col-md-8 col-sm-0 col-xs-0 col-lg-offset-3 col-md-offset-3 col-sm-offset-12 col-xs-offset-12 panel panel-default main-body-height-admin"
                        : "col-lg-8 col-md-8 col-sm-12 col-xs-12 panel panel-default animate-table pull-right rtl-main-body-height-admin"}>
                        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>

                            <div className="container-fluid" style={{height:'500px',overflow:'scroll'}}>
                                <div style={{marginBotto:'20px;'}}>
                                    <br /></div>
                                {this.state.vec.individualid !== undefined &&
                                    <div>
                                        <br />
                                        <div className={localStorage.getItem('selectedLanguageCode') == 1
                                            ? ""
                                            : " rtl-flip"}>
                                            <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                ? "col-lg-3 col-md-0 col-sm-6 title-image pull-left"
                                                : "col-lg-3 col-md-0 col-sm-6 title-image pull-left"}>
                                                <span className='pics'>&nbsp;
                                                        <img
                                                        id="icon-pics" src={!this.state.vec.profilephoto
                                                            ? require('../../assets/user-img-gold.png')
                                                            : this.state.vec.profilephoto}
                                                        onError={(e) => {
                                                            e.target.src = require('../../assets/user-img-gold.png')
                                                        }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="120"
                                                        width="120" />
                                                </span>

                                            </div>

                                            <div
                                                id="left-border-line-admin"
                                                className={localStorage.getItem('selectedLanguageCode') == 1 ? "col-lg-9 col-md-12 col-sm-9 left-margin" : "col-lg-9 col-md-12 col-sm-9 left-margin"}>
                                                <div className="dropdown pull-right" style={{ padding: '5px' }}>
                                                    <button id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                                                        type="button"><i className="glyphicon glyphicon-option-horizontal" />
                                                    </button>
                                                <ul className={localStorage.getItem('selectedLanguageCode') == 1 ? "dropdown-menu dropdown-menu3 dropdown-inverse pull-right" : "dropdown-menu dropdown-menu3 dropdown-inverse pull-right rtl-flip"} aria-labelledby="dropdownMenu4">
                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                            Edit
                                                            </li>
                                                        <li className="dropdown-spacing table-dropdown-small-width" onClick={() => this.callSeeMore()}>
                                                            See More of {this.state.vec.nameen}
                                                        </li>
                                                        <li className="dropdown-spacing table-dropdown-small-width">
                                                            Delete
                                                            </li>
                                                    </ul>
                                                </div>

                                                <div className={localStorage.getItem('selectedLanguageCode') == 1
                                                    ? ""
                                                    : "rtl-flip"}>
                                                    <h2> <span className={localStorage.getItem('selectedLanguageCode') == 1
                                                        ? "title-side-detail-panel ltr-space"
                                                        : "title-side-detail-panel rtl-space"}>{localStorage.getItem('selectedLanguageCode') == 1 ? this.state.vec.nameen : this.state.vec.namear}</span></h2>
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
                                                        <p>Primary Role: Driver
                                                            </p>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6" />

                                                </div>
                                                <br /><br />
                                                <div className={localStorage.getItem('selectedLanguageCode') == 1 ? "colour" : "colour rtl-flip"}>
                                                    <button
                                                        className={localStorage.getItem('selectedLanguageCode') == 1 ? "black-margin action" : "black-margin rtl-black-margin action"}
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
                                        </div>
                                        <br /><br />
                                        <br /><br />
                                    <div >
                                            <div className="col-md-6 col-lg-6">
                                                <div className="list-header-padding">
                                                    List of Companies
                                            </div>
                                                <div className="list-body-padding">
                                                <ListOfCompanies individualid={this.state.individualid} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 list-header-padding-left">
                                                <div className="list-header-padding">
                                                    List of Vehicles
                                            </div>
                                                <div className="list-body-padding">
                                                <ListOfVehicleHire individualid={this.state.individualid} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.state.vec.individualid == undefined &&
                                    <div>
                                        <h5 className="text-center text-vertical"><br /><br /><br />
                                            <i id="" className="fa fa-exclamation-circle icon-truck-gold-no-circle" />
                                            <br /><br />
                                            Click Enquiry Group button to show this panel</h5>
                                    </div>
                                }

                            </div>
                        </Animated>
                    </div>



                </div>
            </div>
        );
    }

    render() {

        if (this.state.redirectSeeMore) {
            return <Redirect push to={{ pathname: '/See-more', state: { vec: this.state.vec } }} />;
        }


        if (this.state.redirectVehicle) {

            return <Redirect push to={{ pathname: '/vehicles', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectPermit) {
            return <Redirect push to={{ pathname: '/permits-requests-list', state: { vec: this.state.vec } }} />;
        }

        if (this.state.redirectIndividual) {
            return <Redirect push to={{ pathname: '/employees', state: { vec: this.state.vec } }} />;
        }


        let filteredCompanies = this.state.currentDrivers
            .filter((vec) => {
                return (vec.website.toLowerCase().indexOf(this.state.search) !== -1 || vec.website.toUpperCase().indexOf(this.state.search) !== -1 || vec.address.city.toLowerCase().indexOf(this.state.search) !== -1 || vec.address.city.toUpperCase().indexOf(this.state.search) !== -1 || vec.email.toLowerCase().indexOf(this.state.search) !== -1 || vec.email.toUpperCase().indexOf(this.state.search) !== -1 || vec.companynameen.toLowerCase().indexOf(this.state.search) !== -1 || vec.companynameen.toUpperCase().indexOf(this.state.search) !== -1);
            });


        let contents = this.state.loading
            ? <p className="wrapper-content"><Loader /></p>
            : this.renderDriverPerformanceDetailList(filteredCompanies);


        return (
            <div> 
                <div style={{marginBottom:'50px'}}>
                    {contents}
                </div>
            </div >
        );
    }
}
export default DriverPerformanceDetail;
