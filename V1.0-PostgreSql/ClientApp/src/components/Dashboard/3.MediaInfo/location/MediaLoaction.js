import React, { Component } from 'react';
import { render } from 'react-dom';
//import Map from '../location/Map';

class MediaLoaction extends Component {
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
            //content: '<div id="infoWindow" />',
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
        return (
            <div id="myCarousel1" className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                    <li data-target="#myCarousel1" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel1" data-slide-to="1"></li>
                </ol>

                <div className="carousel-inner">
                    <div class="item active">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-sm-4 col-xs-8">
                                <a href="#" class="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <a href="#" class="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <a href="#" class="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-sm-4 col-xs-8">
                                <a href="#" class="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <a href="#" className="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <a href="#" className="thumbnail embed-responsive embed-responsive-4by3">
                                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/BBAvd4hFX98" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
       
        );
    }
}

export default MediaLoaction;