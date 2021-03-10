import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from '../../../Location/Map';
import * as config from '../../../../config';
class Contact extends Component {
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
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel panel-body">
                                <div className="col-md-6 col-lg-6 col-sm-6" style={{
                                    backgroundColor: '#e7e7e8'
                                }}>
                                    <div style={{ backgroundColor: '#9F8865', height: '20px' }}></div>
                                    <div style={{ backgroundColor: '#e7e7e8', marginLeft: '10px' }}>
                                        <h4>Contact</h4>
                                        <div>
                                            <p>

                                                If you have any enquiries or comments, please email us through the following contact form where We will reply to you
                                                </p>

                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="vehType">Name</label>
                                                    <input id="name" className="edit-form" required="" name="name" type="text" placeholder="name *" aria-required="true" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="vehType">Address</label>
                                                    <input id="address" className="edit-form" required="" name="address" type="text" placeholder="Address *" aria-required="true" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="vehType">Subject</label>
                                                    <input id="subject" className="edit-form" required="" name="subject" type="text" placeholder="Subject *" aria-required="true" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="vehType">Email</label>
                                                    <input id="email" className="edit-form" required="" name="email" type="email" placeholder="Email *" aria-required="true" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="vehType">Message</label>
                                                    <textarea id="body" className="edit-form" required="" name="body" placeholder="Message *" aria-required="true" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                        <button className="black-margin action">
                                            Send
                                                        </button>

                                        <button className="black-margin action">
                                            Clear Fields
                                                        </button>
                                    </div>

                                </div>

                                <div className="col-md-6 col-lg-6 col-sm-6" style={{ border: '1px solid gray', height: '500px' }}>
                                    <p style={{textAlign:'center'}}><h3>Ajman Al Jarf</h3></p>
                                            <p> <strong>Phone Number:</strong>&nbsp;0097167148444</p>
                                            <p><strong>Media Center::</strong>&nbsp;7 9999 6005- around 24 h</p>
                                            <p><strong>Email:</strong>&nbsp;<a href="mailto:info@at.gov.ae">info@at.gov.ae </a></p>
                                            <p><strong>Fax:</strong>&nbsp;0097167466699</p>
                                            <p><strong>Working Time:</strong>&nbsp;from 07:30 AM to 02:30 PM</p>
                                            <p><strong>Address:</strong> &nbsp;Ajman Algorf behind AUE Transportation</p>
                                            <p><strong>P.O Box:</strong>&nbsp; AUE 6616 ajman</p>
                                        <br />
                            </div>

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
                    </div>
                </div>
            </div>
                </div >
        );
    }
}
export default Contact;
