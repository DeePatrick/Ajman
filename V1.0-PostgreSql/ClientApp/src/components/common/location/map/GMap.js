import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-map-react'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GMap extends Component {
    displayName = Location.name
    static defaultProps = {
        center: {
            lat: 28.535517,
            lng: 77.391029
        },
        zoom: 11
    };
    constructor(props) {
        super(props);
        this.state = {
            currentLatLng: {
                lat: 28.535517,
                lng: 77.391029
            },
            zoom: 11
        };
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        //this.setState({ lat: nextProps.currentLatLng.lat, lng: nextProps.currentLatLng.lng });
    }
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    defaultCenter={this.state.currentLatLng}
                    defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={this.state.currentLatLng.lat}
                        lng={this.state.currentLatLng.lng}
                        text={'noida'}
                    />
                    
                </GoogleMapReact>
            </div> 
        );
    }
}

export default GMap;