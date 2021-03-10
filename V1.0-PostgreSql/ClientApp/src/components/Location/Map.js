import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custList: [],
            vec: {},
            driversList: [],
            currentDrivers: [],
            loading: true,
            position: {},
            options: {
            }

        };
        this.onScriptLoad = this.onScriptLoad.bind(this);
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),this.props.options);
        this.props.onMapLoad(map)
    }

    componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyCX4XjXaU3SypR1V1YJFyEa4pvgwixKP2I';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important. 
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad();
            })
        } else {
            this.onScriptLoad();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vec !== undefined) {
        var geocoder = new window.google.maps.Geocoder();
        var tempOptions = {};
        var center = {};
        var tempPosition = {};
            var address = nextProps.vec.bldgNum + '' + nextProps.vec.area + '' + nextProps.vec.city + '' + nextProps.vec.state;
        geocoder.geocode({ 'address': address },
            function (results, status) {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    center.lat = results[0].geometry.location.lat();
                    center.lng = results[0].geometry.location.lng();
                    tempOptions.center = center;
                    tempOptions.zoom = 10;
                    tempPosition.lat = results[0].geometry.location.lat();
                    tempPosition.lng = results[0].geometry.location.lng();
                    const map = new window.google.maps.Map(
                        document.getElementById(nextProps.id), tempOptions);
                    nextProps.onMapLoad(map);
                }

                else {
                    alert("Geocode was not successful for the following reason: " + status);
                    return false;
                }
            });
       
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: '500px' }} id={this.props.id} />
        );
    }
}

export default Map;