import React, {Component} from 'react';
import Pagination from '../../shared/Pagination';
import {Animated} from "react-animated-css";
import './VehicleHire.css';

class VehicleHire extends Component {
    displayName = VehicleHire.name
    constructor(props) {
        super(props);

        this.state = {
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

        fetch("http://103.69.38.2:8081/api/aptc_vehicle/getall")
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
        console.log(index);
    }

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
        const {vecList, currentDrivers, currentPage, totalPages} = this.state;

        const totalDrivers = vecList.length;

        if (totalDrivers === 0) 
            return null;
        
        let filteredVehicles = this
            .state
            .currentDrivers
            .filter((vec, index) => {
                return vec
                    .Vehicle
                    .registration
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1 || vec
                    .Vehicle
                    .registration
                    .toUpperCase()
                    .indexOf(this.state.search) !== -1;
            });

        let filteredMakeModel = currentDrivers.filter((vec) => {
            return vec
                .Vehicle
                .make
                .toLowerCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .make
                .toUpperCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .model
                .toLowerCase()
                .indexOf(this.state.searchMake) !== -1 || vec
                .model
                .toUpperCase()
                .indexOf(this.state.searchMake) !== -1
        });

        let filteredOwner = currentDrivers.filter((vec) => {
            return vec
                .Vehicle
                .vehicletype
                .toLowerCase()
                .indexOf(this.state.searchOwner) !== -1;
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
                <div>
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
                                                                <i id="icon-car-gold" className="fa fa-truck"></i>
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
                                                        <br/> {filteredOwner.map((vec, index) => <div className="row" key={index}>
                                                            <div className="col-md21 col-lg-2 col-sm21 col-xs-2">
                                                                <i id="icon-car-gold" className="fa fa-truck"></i>
                                                            </div>
                                                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 ">
                                                                <div className="well well-sm">
                                                                    <span
                                                                        onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}>
                                                                        {vec.Vehicle.vehicleType}
                                                                    </span>
                                                                    <span
                                                                        onClick={this
                                                                        .handleClick
                                                                        .bind(this, vec)}
                                                                        className="pull-right">
                                                                        <i className="fa fa-arrow-right"></i>
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
                                                        <i id="icon-truck-gold" className="fa fa-truck"></i>
                                                    </span>

                                                </div>

                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 small-margin">
                                                    <div tabIndex="0" id="profilehire" className="speech-bubble-left-hire">
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, vec)}>

                                                            Plate Number: {vec.Vehicle.registration}
                                                            - {vec.Vehicle.vehicletype}<br/>
                                                            Make: {vec.Vehicle.make}<br/>
                                                            Model: {vec.Vehicle.model}<br/>
                                                            Colour: {vec.Vehicle.colour}<br/>
                                                        </span>
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, vec)}
                                                            className="pull-right">
                                                            <i id="scaled-arrow-truck" className="fa fa-arrow-right"></i>
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
                                                    Vehicles
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
                                                        <i id="icon-truck-big" className="fa fa-truck"></i>
                                                    </span>
                                                </div>

                                                <div id="left-border-line" className="col-lg-10 col-md-8 col-sm-9">
                                                    <h2>
                                                        {this.state.singleVec.Vehicle.vehicletype}
                                                        - {this.state.singleVec.Vehicle.make}
                                                    </h2>
                                                    <p>Plate Number: {this.state.singleVec.Vehicle.registration}</p>
                                                    <p>Engine Number: {this.state.singleVec.Vehicle.engineNumber}</p>
                                                    <p>vehicle VIN: {this.state.singleVec.Vehicle.vin}</p>

                                                    <p>Colour: {this.state.singleVec.Vehicle.colour}
                                                    </p>
                                                    <p>Make: {this.state.singleVec.Vehicle.make}</p>
                                                    <p>Model: {this.state.singleVec.Vehicle.model}
                                                    </p>
                                                    <p>Model year: {this.state.singleVec.Vehicle.modelYear}</p>

                                                    <br/>
                                                    <div className="colour">
                                                        <button className="black-spacing">
                                                            <i className="fa fa-truck"></i>
                                                            &nbsp;Assign Hire</button>
                                                        <button className="black-spacing">
                                                            <i className="fa fa-envelope"></i>
                                                            &nbsp; Message
                                                        </button>
                                                        <button className="black-spacing">
                                                            <i className="fa fa-phone"></i>
                                                            &nbsp; Call
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
}
                                        {this.state.singleVec.Vehicle === undefined && <span>
                                            <h5 className="text-center text-vertical"><br/><br/><br/>
                                                <Animated
                                                    animationIn="bounce"
                                                    animationOut="fadeOut"
                                                    animationInDelay="2"
                                                    isVisible={true}>
                                                    <i id="icon-truck-gold-no-circle" className="fa fa-truck"></i>
                                                </Animated>
                                                <br/>
                                                Select an Vehicle</h5>
                                        </span>
}
                                    </Animated>
                                </div>

                            </Animated>

                        </div>
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
export default VehicleHire;