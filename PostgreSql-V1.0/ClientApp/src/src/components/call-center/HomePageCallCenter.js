import React, { Component } from 'react';
import ListOfVehicleHire from './../shared/ListOfVehicleHire';
import ListOfCompanies from './../shared/ListOfCompanies';
import {Link} from 'react-router-dom';
import Pagination from './../shared/Pagination';
import {Animated} from "react-animated-css";
import * as config from './../../config';

class HomePageCallCenter extends Component {
    displayName = HomePageCallCenter.name

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            vecList: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            singleCus: [],
            search: '',
            searchGender: '',
            searchRegion: ''
        };

    }

    componentDidMount() {
        fetch(config.webApiUrl() + "/aptc_driver/getall")
            .then(response => response.json())
            .then(data => {
                this.setState({vecList: data, loading: false});
            });
    }

    onPageChanged = data => {
        const {vecList} = this.state;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = vecList.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentDrivers, totalPages});
    };

    handleClick(index) {
        this.setState({singleCus: index});
    }

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    updatesearchGender(event) {
        this.setState({
            searchGender: event
                .target
                .value
                .substring(0, 10)
        });
    }
    updatesearchRegion(event) {
        this.setState({
            searchRegion: event
                .target
                .value
                .substring(0, 10)
        });
    }

    render() {
        const {vecList, currentDrivers, currentPage, totalPages} = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0) 
            return null;
        
        let filteredDrivers = this
            .state
            .currentDrivers
            .filter((cus) => {
                return cus
                    .Driver
                    .nameEN
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1 || cus
                    .Driver
                    .nameAR
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1;
            });

        let filteredDriverGender = filteredDrivers.filter((cus) => {
            return cus
                .Driver
                .licenseNumber
                .indexOf(this.state.searchGender) !== -1
        });

        let filteredDriverRegion = currentDrivers.filter((cus) => {
            return cus
                .Driver
                .emailAddress
                .toLowerCase()
                .indexOf(this.state.search) !== -1
        });

        let contents = this.state.loading
            ? <p>
                    <img
                        src={require('../../assets/Gear-1s-200px.gif')}
                        height="35"
                        width="35"
                        alt="woman"/>
                    <em>Loading...</em>
                </p>
            : <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">

                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control-search"
                                            placeholder="Search ..."
                                            value={this.state.search}
                                            onChange={this
                                            .updatesearch
                                            .bind(this)}/>

                                        <span className="btn-search-edit">
                                            <button type="button">
                                                <i className="glyphicon glyphicon-search btn-search"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="leftborder"
                                                data-toggle="modal"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-target="#myModal">
                                                <span className="glyphicon glyphicon-menu-down"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </Animated>

                                            <div
                                                className="modal fade"
                                                id="myModal"
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby="myModalLabel">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <h4 className="modal-title" id="myModalLabel">
                                                                <i className="glyphicon glyphicon-search"></i>
                                                                &nbsp;&nbsp; Search for a Individual</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control-search2"
                                                                    placeholder="Search Gender 'm' or 'f'"
                                                                    value={this.state.searchGender}
                                                                    onChange={this
                                                                    .updatesearchGender
                                                                    .bind(this)}/>
                                                                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                                                                <input
                                                                    type="text"
                                                                    className="form-control-search2"
                                                                    placeholder="Search Region"
                                                                    value={this.state.searchRegion}
                                                                    onChange={this
                                                                    .updatesearchRegion
                                                                    .bind(this)}/>

                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="container-fluid">
                                                                        <br/> {filteredDriverGender.map((cus, index) => <div className="row" key={index}>
                                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">
                                                                                <span
                                                                                    className='pics'
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>
                                                                                    <img
                                                                                        id="icon-pics"
                                                                                        src={cus.Driver.photo}
                                                                                        className="img-circle"
                                                                                        alt="woman"
                                                                                        height="25"
                                                                                        width="25"/>
                                                                                </span>

                                                                            </div>

                                                                            <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                                <div className="well well-sm">
                                                                                    <span
                                                                                        onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}>{cus.Driver.nameEN} {cus.Driver.nameAR}
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}
                                                                                        className="pull-right">
                                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                    </span>

                                                                                </div>
                                                                            </div>
                                                                            <br/>
                                                                        </div>)}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 co-lg-6">
                                                                    <div className="container-fluid">
                                                                        <br/> {filteredDriverRegion.map(cus => <div className="row" key={cus.id}>
                                                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                                <span
                                                                                    className='pics'
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>
                                                                                    <img
                                                                                        id="icon-pics"
                                                                                        src={cus.photo}
                                                                                        className="img-circle"
                                                                                        alt="woman"
                                                                                        height="25"
                                                                                        width="25"/>
                                                                                </span>

                                                                            </div>

                                                                            <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                                <div className="well well-sm">
                                                                                    <span
                                                                                        onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}>{cus.nameEN}
                                                                                        <arab>
                                                                                            {cus.nameAR}</arab>
                                                                                    </span>
                                                                                    <span
                                                                                        onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}
                                                                                        className="pull-right">
                                                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                    </span>

                                                                                </div>
                                                                            </div>
                                                                            <br/>
                                                                        </div>)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default">
                                <div className="panel panel-body full-height">
                                    <h4>&nbsp;&nbsp;Search Result</h4>
                                    <br/>
                                    <div className="container-fluid ">
                                        {filteredDrivers.map((cus, index) => <div className="row" key={index}>
                                            <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                <span
                                                    className='pics'
                                                    onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}>
                                                    <img
                                                        id="icon-pics"
                                                        src={!cus.Driver.photo
                                                        ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                        : cus.Driver.photo}
                                                        onError={(e) => {
                                                        e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                    }}
                                                        className="img-circle"
                                                        alt="woman"
                                                        height="45"
                                                        width="45"/>
                                                </span>

                                            </div>

                                            <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                <div tabIndex="0" id="profile" className="speech-bubble-left-black">
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, cus)}>{cus.Driver.nameEN}
                                                        <arab>
                                                            {cus.Driver.nameAR}
                                                        </arab>
                                                    </span>
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, cus)}
                                                        className="pull-right">
                                                        <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                    </span>

                                                </div>
                                            </div>
                                            <br/>
                                        </div>)}
                                    </div>

                                    <div className="movein">
                                        <div>
                                            <h4>
                                                <strong >{totalDrivers}</strong>{" "}
                                                Search entries
                                            </h4>
                                            {currentPage && (
                                                <span>
                                                    Page
                                                    <span className="font-weight-bold">{currentPage}</span>
                                                    /{" "}
                                                    <span className="font-weight-bold">{totalPages}</span>
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <Pagination
                                                totalRecords={totalDrivers}
                                                pageLimit={8}
                                                pageNeighbours={1}
                                                onPageChanged={this
                                                .onPageChanged
                                                .bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>

                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default full-height">
                                {this.state.singleCus.Driver !== undefined && <div>
                                    <div className="btn-group pull-right">
                                        <div
                                            className="btn glyphicon glyphicon-option-horizontal"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"></div>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to={'/home'}>
                                                    Add to queue
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/home'}>
                                                   See more of {this.state.singleCus.Driver.nameEN}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/home'}>
                                                    Delete Individual
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <br/>
                                    <div>
                                        <div className='col-lg-2 col-md-4 col-sm-3 right-margin'>
                                        <br/> <br/> 
                                            &nbsp; &nbsp; &nbsp;&nbsp;
                                            <img
                                                src={!this.state.singleCus.Driver.photo
                                                ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                                : this.state.singleCus.Driver.photo}
                                                onError={(e) => {
                                                e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                            }}
                                                className="img-circle"
                                                alt="woman"
                                                width="100"/>
                                        </div>

                                        <div id="left-border-line" className="col-lg-10 col-md-8 col-sm-9">
                                        <div className="margin-right">
                                        <h3>{this.state.singleCus.Driver.nameEN}</h3><br/>
                                            <strong>Address and Personal details:</strong>
                                            <h5>
                                                <p>email: {this.state.singleCus.Driver.emailAddress}</p>
                                                <p>permit: {this.state.singleCus.Driver.permitNumber}</p>
                                                <p>license: {this.state.singleCus.Driver.licenseNumber}
                                                    &nbsp; date of issue: {this.state.singleCus.Driver.licenseIssueDate}</p>
                                            </h5>
                                            <br/>
                                            <h5>Vehicle Type:</h5>
                                            <h5>{this.state.singleCus.Driver.vehicleType}</h5>
                                            <br/>
                                            <h5>Phone:</h5>
                                            + {this.state.singleCus.Driver.mobileNumber}
                                            <br/>
                                            <div className="colour">
                                                <button className="black-margin">
                                                    <i className="fa fa-edit"></i>
                                                    &nbsp; Edit details
                                                </button>
                                                <button className="black-margin">
                                                    <i className="fa fa-envelope"></i>
                                                    &nbsp; Message
                                                </button>
                                            </div>
                                        </div>
                                            

                                        </div>
                                    </div>
                                    <br/><br/>
                                    <br/><br/>
                                    <div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="list-header-padding">
                                                List of Companies
                                            </div>
                                            <div className="list-body-padding">
                                                <ListOfCompanies/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 list-header-padding-left">
                                            <div className="list-header-padding">
                                                List of Vehicles
                                            </div>
                                            <div className="list-body-padding">
                                                <ListOfVehicleHire/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
}
                                {this.state.singleCus.Driver === undefined && <span>
                                    <h5 className="text-center text-vertical"><br/><br/><br/>
                                        <i id="icon-truck-gold-no-circle" className="fa fa-user"></i><br/>
                                        Select an Individual</h5>
                                </span>
}

                            </div>

                        </Animated>
                    </div>

                </div>
            </div>;

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>
        );
    }
}
export default HomePageCallCenter;
