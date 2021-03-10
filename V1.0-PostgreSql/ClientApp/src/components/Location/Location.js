import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Pagination from '../shared/Pagination';
import $ from 'jquery';
import Loader from '../loader';
import Map from './Map';
import * as config from '../../config';
//import InfoWindow from './InfoWindow';

class Location extends Component {
    constructor() {
        super();
        this.state = {
            custList: [],
            vec: {},
            driverlist: [],
            currentDrivers: [],
            loading: true,
            position: {},
            options: {
            }

        };
        this.createInfoWindow = this.createInfoWindow.bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
        //this.getLatandLang();

    }
    componentWillMount() {
        fetch(config.webApiUrl() + "aptc_individual_getAllActiveDrivers/" + localStorage.getItem('selectedLanguageCode') +"/" + localStorage.getItem('individualid')+'/15')
            .then(response => response.json())
            .then(data => {
                var tempOptions = this.state.options;
                var lat = 25.41111;
                var lng = 55.43504;
                var center = {};
                var tempPosition = this.state.position;
                center.lat = lat;
                center.lng = lng;
                tempOptions.center = center;
                tempOptions.zoom = 10;
                tempPosition.lat = lat;
                tempPosition.lng = lng;
                this.setState({ options: tempOptions, position: tempPosition });
                this.setState({ driverlist: data, currentDrivers: data, loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error);
                
            });
    }
    createInfoWindow(e, map) {
        const infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
        });
        infoWindow.addListener('domready', e => {
            render(
                //<InfoWindow />, document.getElementById('infoWindow')
            )
        });
        infoWindow.open(map);
    }

    handleClick = (vec) => {
        //this.getLatandLang(vec.address);
        var geocoder = new window.google.maps.Geocoder();
        this.setState({ vec: vec });
        var tempOptions = this.state.options;
        var center = {};
        var tempPosition = this.state.position;
        var tempdriverlist = this.state.driverlist;
        var address = vec.address.bldgNum + '' + vec.address.area + '' + vec.address.city + '' + vec.address.state;
        geocoder.geocode({ 'address': address },
            function (results, status) {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    center.lat = results[0].geometry.location.lat();
                    center.lng = results[0].geometry.location.lng();
                    tempOptions.center = center;
                    tempOptions.zoom = 10;
                    tempPosition.lat = results[0].geometry.location.lat();
                    tempPosition.lng = results[0].geometry.location.lng();
                }

                else {
                    alert("Geocode was not successful for the following reason: " + status);
                    return false;
                }
            });
        this.setState({ driverlist: tempdriverlist, options: tempOptions, position: tempPosition });
        this.setState({ driverlist: tempdriverlist, loading: false });
    };
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 5)
        });
    }

    updatesearchGender(event) {
        this.setState({
            searchGender: event
                .target
                .value
                .substring(0, 5)
        });
    }
    updatesearchRegion(event) {
        this.setState({
            searchRegion: event
                .target
                .value
                .substring(0, 5)
        });
    }
    onPageChanged = data => {
        const { driverlist } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        const currentDrivers = driverlist.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentDrivers, totalPages });

    }
    replaceModalItem = (index, action) => {
        if (action === 'edit') {
            this.setState({ isEditOpen: true });
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }
        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.setState({ requiredItem: indx });
            vec = this.state.driverlist[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.driverlist[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
        }
    };
    render() {
        const { currentPage, totalPages } = this.state;
        const totalDrivers = this.state.driverlist.length;
        let contents = "";
        if (totalDrivers === 0) {
            contents = (
                <div className="row">
                    {this.state.loading === false &&
                        < div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                <p style={{ marginTop: '20px', fontSize: '30px', color: 'red' }}> NO RECORD EXIST YET!</p>
                            </div>
                        </div>}
                </div>);
        }
        else {
            const { showing } = this.state;
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.driverlist[requiredItem];
            let filteredDrivers = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    this.state.currentDrivers === null || this.state.currentDrivers === [] ? "No Value" :
                        filteredDrivers = this.state.currentDrivers;
                }

            }
            contents = (
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
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
                                            .bind(this)} />

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
                                                                    .bind(this)} />
                                                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                                                            <input
                                                                type="text"
                                                                className="form-control-search2"
                                                                placeholder="Search Region"
                                                                value={this.state.searchRegion}
                                                                onChange={this
                                                                    .updatesearchRegion
                                                                    .bind(this)} />

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="container-fluid">
                                                                    <br /> {
                                                                        filteredDrivers.map(cus =>
                                                                            <div className="row" key={cus.id}>
                                                                                <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                                    <span className='pics' style={{ marginRight: '8px' }}>
                                                                                        <i id="icon-map-marker-alt-gold" className="fa fa-map-marker"></i>
                                                                                    </span>

                                                                                </div>

                                                                                <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                                    <div className="well well-sm" style={{ cursor: 'pointer' }}>

                                                                                        <img
                                                                                            id="icon-pics"
                                                                                            src={!cus.profilephoto
                                                                                                ? require('../../assets/user-img.png')
                                                                                                : cus.profilephoto}
                                                                                            onError={(e) => {
                                                                                                e.target.src = require('../../assets/user-img.png')
                                                                                            }}
                                                                                            className="img-circle"
                                                                                            onClick={this
                                                                                                .handleClick
                                                                                                .bind(this, cus)}
                                                                                            alt="woman"
                                                                                            height="20"
                                                                                            width="20" />  &nbsp;{cus.nameen}&nbsp;{cus.namear}
                                                                                        <span
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={this
                                                                                                .handleClick
                                                                                                .bind(this, cus)}>&nbsp;{cus.nameen}&nbsp;{cus.namear}
                                                                                        </span>
                                                                                        <span
                                                                                            style={{ cursor: 'pointer' }}
                                                                                            onClick={this
                                                                                                .handleClick
                                                                                                .bind(this, cus)}
                                                                                            className="pull-right">
                                                                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                        </span>

                                                                                    </div>
                                                                                </div>
                                                                                <br />
                                                                            </div>)}
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6 co-lg-6">
                                                                <div className="container-fluid">
                                                                    <br /> {filteredDrivers.map(cus => <div className="row" key={cus.id}>
                                                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                            <span className='pics'>
                                                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker"></i>
                                                                            </span>

                                                                        </div>

                                                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                            <div className="well well-sm" style={{ cursor: 'pointer' }}>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}>{cus.name} {cus.surname}
                                                                                </span>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                        .handleClick
                                                                                        .bind(this, cus)}
                                                                                    className="pull-right">
                                                                                    <i id="scaled-arrow" className="fa fa-long-arrow-right"></i>
                                                                                </span>

                                                                            </div>
                                                                        </div>
                                                                        <br />
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
                                    </span>
                                </div>

                            </div>
                        </div>
                        <br />
                        <div className="panel panel-default">
                            <div className="panel panel-body full-height">
                                <h4>&nbsp;&nbsp;Search Result</h4>
                                <br />
                                <div className="container-fluid movetop" style={{ height: '400px', overflow: 'auto' }}>
                                    {filteredDrivers.map((cus, index) =>
                                        <div className="" key={index}>
                                            <div className="">
                                                <div className="speech-bubble small-margin-well">
                                                    <span
                                                        className='pics' style={{ marginRight: '8px', marginTop: '8px' }}
                                                    >
                                                        <i id="icon-exclamation-circle-gold-small" className="fa fa-map-marker"></i>
                                                    </span>
                                                    &nbsp;{cus.nameen} &nbsp;
                                                    <span
                                                        onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}>  {cus.city}
                                                    </span>
                                                    <span
                                                        onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}
                                                        className="pull-right">
                                                        <i id="scaled-arrow" className="glyphicon glyphicon-option-horizontal" />
                                                    </span>

                                                </div>
                                            </div>
                                            <br />
                                        </div>)}

                                </div>
                                
                            </div>

                        </div>

                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-8">
                        <div className="container-fluid ">
                            <div>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <Map
                                            id="myMap"
                                            vec={this.state.vec.address}
                                            options={this.state.options}
                                            onMapLoad={map => {
                                                var name = '';
                                                if (this.state.vec.fullName !== undefined) {
                                                    name = this.state.vec.fullName.en_US;
                                                }
                                                const marker = new window.google.maps.Marker({
                                                    position: this.state.position,
                                                    map: map,
                                                    title: name
                                                });
                                                marker.addListener('click', e => {
                                                    this.createInfoWindow(e, map);
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <br />

                            </div>
                        </div>
                    </div>
                </div>);
        }

        return (
            <div>
                <div>
                    {this.state.loading === true
                        && <div><Loader /></div>}
                    {contents}
                </div>
            </div>

        );
    }
}

export default Location;
