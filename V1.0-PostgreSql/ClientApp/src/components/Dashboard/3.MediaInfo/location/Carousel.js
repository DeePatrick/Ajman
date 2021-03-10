import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from '../../../Location/Map';

class Carousel extends Component {
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

    }
    componentWillMount() {
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
        // this.setState({ driverlist: data, currentDrivers: data, loading: false });
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
    render() {
        return(
            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="6000">
                <div className="col-md-12 col-lg-12 col-sm-12">
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
        </div>
        );
    }
}

export default Carousel;