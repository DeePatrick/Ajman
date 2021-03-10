import React, {Component} from 'react';
import Pagination from '../../shared/Pagination';
import {Animated} from "react-animated-css";
import './Register.css';

class Register extends Component {
    displayName = Register.name
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            vecList: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            singleVec: [],
            search: '',
            searchMake: '',
            searchOwner: ''
        };

        this.handleClick = this.handleClick;

        fetch('http://103.69.38.2:8081/api/aptc_vehicle/getall')
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
        this.setState({singleVec: index});
    }

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

    render() {
        const {vecList, currentDrivers, currentPage, totalPages} = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0) 
            return null;
        
        let filteredVehicles = this
            .state
            .currentDrivers
            .filter((vec) => {
                return vec
                    .Vehicle
                    .registration
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1
            });

        let filteredMakeModel = currentDrivers.filter((vec) => {
            return vec
                .Vehicle
                .make
                .toLowerCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .Vehicle
                .make
                .toUpperCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .Vehicle
                .model
                .toLowerCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .Vehicle
                .model
                .toUpperCase()
                .indexOf(this.state.searchMake) !== -1
        });

        let contents = this.state.loading
            ? <p>
                    <img
                        src={require('../../../assets/Gear-1s-200px.gif')}
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
                                            &nbsp;&nbsp; Search for a Vehicle</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control-search2"
                                                placeholder="Search Make or Model"
                                                value={this.state.searchMake}
                                                onChange={this
                                                .updatesearchMake
                                                .bind(this)}/>
                                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                                            <input
                                                type="text"
                                                className="form-control-search2"
                                                placeholder="Search Region"
                                                value={this.state.searchOwner}
                                                onChange={this
                                                .updatesearchOwner
                                                .bind(this)}/>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="container-fluid">
                                                    <br/> {filteredMakeModel.map((vec, index) => <div className="row" key={index}>
                                                        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                            <i id="icon-car-gold" className="fa fa-car"></i>
                                                        </div>

                                                        <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 ">
                                                            <div className="well well-sm">
                                                                <span
                                                                    onClick={this
                                                                    .handleClick
                                                                    .bind(this, vec)}>{vec.Vehicle.make} {vec.Vehicle.model}
                                                                </span>

                                                            </div>
                                                        </div>
                                                        <br/>
                                                    </div>)}
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6">
                                                <div className="container-fluid">
                                                    <br/> {filteredMakeModel.map((vec, index) => <div className="row" key={index}>
                                                        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">

                                                            <i id="icon-car-gold" className="fa fa-car"></i>

                                                        </div>

                                                        <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 ">
                                                            <div className="well well-sm">
                                                                <span
                                                                    onClick={this
                                                                    .handleClick
                                                                    .bind(this, vec)}>{vec.Vehicle.passengerCapacity} {vec.Vehicle.vehicletype}
                                                                </span>
                                                                <span
                                                                    onClick={this
                                                                    .handleClick
                                                                    .bind(this, vec)}
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
                                    <div className="container-fluid movetop">
                                        {filteredVehicles.map((vec, index) => <div className="row" key={index}>
                                            <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                <span className='pics'>
                                                    <i id="icon-car-gold" className="fa fa-car"></i>
                                                </span>

                                            </div>

                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 ">
                                                <div tabIndex="0" id="profile" className="speech-bubble-left-black">
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, vec)}
                                                        style={{
                                                        backgroundColor: this.state.bgColor
                                                    }}>{vec.Vehicle.registration} {vec.Vehicle.make}
                                                        {vec.Vehicle.model}
                                                        - {vec.Vehicle.vehicletype}
                                                    </span>
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, vec)}
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
                                                Registered vehicles
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
                            <div className="panel panel-default main-body-height">
                                <Animated animationIn="FadeInUp" animationOut="fadeOut" isVisible={true}>
                                    <div>
                                        <br/></div>
                                    {this.state.singleVec.Vehicle !== undefined && <div>
                                        <br/>
                                        <div>
                                            <div className='col-lg-2 col-md-4 col-sm-3 right-border'>
                                                <span className='pics'>
                                                    <i id="icon-car-big" className="fa fa-car"></i>
                                                </span>
                                            </div>

                                            <div id="left-border-line-register" className="col-lg-10 col-md-8 col-sm-9 ">
                                                <h3>
                                                    <strong>{this.state.singleVec.Vehicle.registration}
                                                    </strong>
                                                    - {this.state.singleVec.Vehicle.make}
                                                    <code>{this.state.singleVec.Vehicle.model}</code>
                                                </h3><br/>

                                                <h5>
                                                    <p>Plate Number: {this.state.singleVec.Vehicle.registration}</p>
                                                    <p>Colour: {this.state.singleVec.Vehicle.colour}</p>
                                                    <p>Capacity: {!this.state.singleVec.Vehicle.passengerCapacity
                                                            ? 4
                                                            : this.state.singleVec.Vehicle.passengerCapacity}
                                                        Passengers</p>
                                                    <p>Disabled friendly: {!this.state.singleVec.Vehicle.disabledFriendly
                                                            ? "false"
                                                            : this.state.singleVec.Vehicle.disabledFriendly}</p>
                                                </h5>
                                                <br/>

                                                <h5>
                                                    <p>Engine Number: {this.state.singleVec.Vehicle.engineNumber}</p>
                                                </h5>
                                                {/* <h5>Vehicle Registrar:</h5>
                                            <br />
                                            <div>
                                                <img id="icon-pics" src={!this.state.singleVec.Vehicle.photo ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png' : this.state.singleVec.Vehicle.photo}
                                                    onError={(e) => { e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png' }}
                                                    className="img-circle" alt="woman" height="52" width="52" />
                                            </div>
                                            <br /> */}

                                                <br/>
                                                <div className="colour">
                                                    <button className="black-spacing">
                                                        <i className="fa fa-ticket-alt"></i>
                                                        &nbsp; Permit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
}
                                    {this.state.singleVec.Vehicle === undefined && <span>
                                        <h5 className="text-center text-vertical"><br/><br/><br/>
                                            <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                                                <i id="icon-truck-gold-no-circle" className="fa fa-car"></i>
                                            </Animated><br/>
                                            Select an Vehicle</h5>
                                    </span>
}

                                </Animated>
                            </div>
                        </Animated>
                    </div>
                </div>

            </div>;

        return (
            <div>
                <div>
                    {contents}
                </div >
            </div>
        );
    }
}

export default Register;
