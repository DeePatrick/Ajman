import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './MediaInfo.css';
//import Carousel from './location/Carousel';

export default class MediaInfo extends Component {
    constructor() {
        super();
        this.state = {
            render: ''
        }
    }
    handleClick(compName, e) {
        console.log(compName);
        this.setState({render: compName});
    }
    _renderSubComp() {
        switch (this.state.render) {
            //case 'location':
            //    return <LocationTab/>
            case 'hiredvehicle':
                return <HiredVehicleTab/>
            case 'registeredvehicle':
                return <RegisteredVehicleTab/>
            case 'enquiry':
                return <EnquiryTab/>
            case 'permit':
                return <PermitTab/>
            default:
                return <LocationTab/>

        }
    }

    render() {
        return (
            <div>
                <p className="view-header">
                    <i className="fa fa-play-circle"></i>
                    <h4>{this.props.t('Media_Info')}</h4></p>
                <div className="panel fixed-height">
                    <div className="panel-body">
                        <ul className="nav nav-tabs nav-justified">
                            <li
                                role="presentation"
                                className="active"
                                onClick={this
                                .handleClick
                                .bind(this, 'location')}>
                                <span className="mediainfo">
                                    <i className="fa fa-map-marker-alt"></i>
                                </span>
                                <span className="icon-subtext">{this.props.t('Location')}</span>
                            </li>
                            <li
                                onClick={this
                                .handleClick
                                .bind(this, 'hiredvehicle')}>
                                <span className="mediainfo">
                                    <i className="fa fa-truck"></i>
                                </span>
                                <span className="icon-subtext">
                                    {this.props.t('Hired_Vehicle')}</span>
                            </li>
                            <li
                                onClick={this
                                .handleClick
                                .bind(this, 'registeredvehicle')}>
                                <span className="mediainfo">
                                    <i className="fa fa-car"></i>
                                </span>
                                <span className="icon-subtext">
                                    {this.props.t('Registered_Vehicles')}</span>
                            </li>
                            <li
                                onClick={this
                                .handleClick
                                .bind(this, 'enquiry')}>
                                <span className="mediainfo">
                                    <i className="fa fa-exclamation-circle"></i>
                                </span>
                                <span className="icon-subtext">
                                    {this.props.t('Enquires')}</span>
                            </li>
                            <li
                                onClick={this
                                .handleClick
                                .bind(this, 'permit')}>
                                <span className="mediainfo">
                                    <i className="fa fa-ticket-alt"></i>
                                </span>
                                <span className="icon-subtext">
                                    {this.props.t('Permit')}</span>
                            </li>
                        </ul>
                        {this._renderSubComp()}
                    </div>
                </div>
            </div>
        )
    }
}

class LocationTab extends React.Component {
    render() {
        return <div>Inside LocationTab
            <div>
                {/* <Carousel/>*/}
            </div>
            Go to Location Services
        </div>
    }
}

class HiredVehicleTab extends React.Component {
    render() {
        return <div>Inside HiredVehicleTab
            <div>
                {/* <Carousel/>*/}
            </div>
            Go to Hired Vehicle Services
        </div>
    }
}
class RegisteredVehicleTab extends React.Component {
    render() {
        return <div>Inside RegisteredVehicleTab
            <div>
                {/* <Carousel/>*/}
            </div>
            Go to RegisteredVehicle Services
        </div>
    }
}

class EnquiryTab extends React.Component {
    render() {
        return <div>Inside Enquiry Tab
            <div>
                {/* <Carousel/>*/}
            </div>
        </div>
    }
}

class PermitTab extends React.Component {
    render() {
        return <div>Inside Permit Tab
            <div>
                {/* <Carousel/>*/}
            </div>
        </div>
    }
}