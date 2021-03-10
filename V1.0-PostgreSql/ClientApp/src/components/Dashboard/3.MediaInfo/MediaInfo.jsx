import React, { Component } from 'react';
import './MediaInfo.css';
import MediaLoaction from '../3.MediaInfo/location/MediaLoaction';
import Permits from '../3.MediaInfo/Permit';
import Enquiry from '../3.MediaInfo/Enquiry';
import Vehicles from '../3.MediaInfo/Vehicles';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

//Multilingual Uncomments below line
export class MediaInfo extends Component {

    //Multilingual comment below line
    //export default class MediaInfo extends Component {
    constructor() {
        super();

        this.state = {
            render: ''
        }
    };

    //handleClick(index) {
    //    //alert(compName);
    //    //console.log(compName);
    //    //this.setState({ render: compName });
    //}
    //_renderSubComp() {
    //    switch (this.state.render) {
    //        //case 'location':
    //        //    return <LocationTab/>
    //        case 'hiredvehicle':
    //            return <HiredVehicleTab />
    //        case 'registeredvehicle':
    //            return <RegisteredVehicleTab />
    //        case 'enquiry':
    //            return <EnquiryTab />
    //        case 'permit':
    //            return <PermitTab />
    //        default:
    //            return <LocationTab />

    //    }
    //}
    handleSelect = (index) => {
        //alert('Selected tab: ' + index);
        //console.log('Selected tab: ' + index);
        // this is how you update your state
        //this.setState({ value: index });
    }
    render() {
        return (
            <div>
                <div className="panel-element-header-container">
                    <strong className="gold-small-header"><i id="icon-small_noborder" class="fa fa-play-circle"></i>{this.props.t('MEDIA_INFO')}</strong>
                </div>
                <div className="white-panel-container row panel-element-container-row-bottom media-info-panel">
                    <Tabs onSelect={(index, label) => console.log(label + ' selected')} className="media-info-tabs">

                        <Tab label={<span className="fullcercle"> <i id="icon-small_noborder" className="fa fa-map-marker" />{this.props.t('Location')}</span>}>
                            <MediaLoaction />
                        </Tab>

                        <Tab label={<span onClick={() => this.handleSelect(1)}> <i id="icon-small_noborder" className="fa fa-truck" />{this.props.t('Hired_Vehicle')}</span>}>
                            <Vehicles className="test"/>
                        </Tab>

                        <Tab label={<span onClick={() => this.handleSelect(2)}> <i id="icon-small_noborder" className="fa fa fa-car" />{this.props.t('Registered_Vehicles')}</span>}>
                            <Vehicles />
                        </Tab>

                        <Tab label={<span onClick={() => this.handleSelect(3)}> <i id="icon-small_noborder" className="fa fa-exclamation-circle" />{this.props.t('Enquires')}</span>}>
                            <Enquiry />
                        </Tab>

                        <Tab label={<span onClick={() => this.handleSelect(4)}> <i id="icon-small_noborder" className="fa fa-ticket" />{this.props.t('Permit')}</span>}>
                            <Permits />
                        </Tab>

                    </Tabs>
                </div>
                <div className="panel-element-footer-container right">
                    <a href=""><u>Go to Location Services ></u></a>
                </div>
            </div>
        )
    }
}
//Multilingual Uncomments below lines
export default translate(MediaInfo);

//class LocationTab extends React.Component {
//    render() {
//        return <div>Inside LocationTab1
//            <div>
//                {/* <Carousel/>*/}
//            </div>
//            Go to Location Services
//        </div>
//    }
//}
//class HiredVehicleTab extends React.Component {
//    render() {
//        return <div>Inside HiredVehicleTab
//            <div>
//                {/* <Carousel/>*/}
//            </div>
//            Go to Hired Vehicle Services
//        </div>
//    }
//}
//class RegisteredVehicleTab extends React.Component {
//    render() {
//        return <div>Inside RegisteredVehicleTab
//            <div>
//                {/* <Carousel/>*/}
//            </div>
//            Go to RegisteredVehicle Services
//        </div>
//    }
//}
//class EnquiryTab extends React.Component {
//    render() {
//        return <div>Inside Enquiry Tab
//            <div>
//                {/* <Carousel/>*/}
//            </div>
//        </div>
//    }
//}
//class PermitTab extends React.Component {
//    render() {
//        return <div>Inside Permit Tab
//            <div>
//                {/* <Carousel/>*/}
//            </div>
//        </div>
//    }
//}