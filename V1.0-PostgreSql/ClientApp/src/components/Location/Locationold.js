import React, { Component } from 'react';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-map";

const Location = () =>

    <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4"></div>
        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
            <div className="container-fluid ">
                <div className="panel panel-default">
                    <div className="panel-body">

                        <ReactGoogleMapLoader
                            params={{
                                key: "AIzaSyCX4XjXaU3SypR1V1YJFyEa4pvgwixKP2I",
                                libraries: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCX4XjXaU3SypR1V1YJFyEa4pvgwixKP2I&v=3.exp&libraries=geometry,drawing,places"
                            }}
                            render={googleMaps =>
                                googleMaps && (
                                    <div style={{ height: "500px" }}>
                                        <ReactGoogleMap
                                            googleMaps={googleMaps}
                                            center={{ lat: 28.474388, lng: 77.503990 }}
                                            zoom={8}>
                                        </ReactGoogleMap>
                                    </div>
                                )}
                        />
                    </div> </div></div></div></div>
export default Location