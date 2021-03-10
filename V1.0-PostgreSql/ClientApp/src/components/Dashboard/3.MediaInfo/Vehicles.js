import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import $ from 'jquery';
import * as config from '../../../config';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Vehicles extends Component {
    displayName = Vehicles.name
    constructor(props) {
        super(props);

        this.state = {
            vehicleid: 0,
            requiredItem: 0,
            cRNum: '',
            fullName: '',
            pageLimit: 0,
            vecList: [],
            currentDrivers: [],
            loading: false,
            offset: 0,
            vec: [],
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: false,
            isAddOpe: false,
            mode: ''
        };
    }

    componentWillMount() {
        this.bindVehicle();
    }

    bindVehicle() {
        fetch(config.webApiUrl() + "aptc_individual_vehicles/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, currentDrivers: data, loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error.response);
            });
    }

    render() {
        const { vecList, currentDrivers, currentPage, totalPages } = this.state;
        let contents = "";
        const totalDrivers = vecList.length;

        if (totalDrivers === 0) {
            contents = (
                <div className="row">
                    < div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10" style={{ marginLeft: '20px', textAlign: 'center' }}>
                                <p style={{ marginTop: '20px', fontSize: '15px', color: 'red' }}> NO RECORD EXIST YET!</p>
                            </div>
                        </Animated>
                    </div>
                </div>)
        }
        else {
            let filteredVehicles = [];
            if (this.state.currentDrivers.length > 0) {
                {
                    currentDrivers === null || currentDrivers === [] ? "No Value" :
                        filteredVehicles = this
                            .state
                            .currentDrivers
                            .filter((vec) => {
                                return (
                                    vec.make.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.yearmanufacture.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownershipname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.ownershiptypename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.trafficfilenumber.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.transmissiontype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                                    vec.vehicletype.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                                );
                            });
                }
            }
            contents = (
                <div>
                    <div className="row" style={{ height: '290px', overflow: 'auto' }}>
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                            <div className="panel panel-default" style={{ width: '100%!important' }}>
                                <div className="panel panel-body" style={{ width: '100%!important' }}>
                                    <br />
                                    <table className="table" style={{ width: '100%!important' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">{this.props.t('Basic_Info')}</th>
                                                <th scope="col">{this.props.t('Registration_No.')}</th>
                                                <th scope="col">{this.props.t('Owner_Type')}</th>
                                                <th scope="col">{this.props.t('Owner_Name')}</th>
                                                <th scope="col">{this.props.t('Vehicle_Type')}</th>
                                                <th scope="col">{this.props.t('Status')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredVehicles.map((vec, index) => <tr className="panel-bubble-new" key={index}>
                                                    <td
                                                        scope="row"
                                                    >
                                                        <i id="icon-exclamation-circle-gold-small" className="fa fa-taxi"></i>
                                                        {vec.model}&nbsp;&nbsp; {vec.yearmanufacture}
                                                    </td>

                                                    <td
                                                        scope="row"
                                                    >
                                                        {vec.trafficfilenumber}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                    >
                                                        {vec.ownershiptypename}
                                                    </td>
                                                    <td scope="row">
                                                        {vec.ownershipname}
                                                    </td>
                                                    <td
                                                        scope="row"
                                                    >
                                                        {vec.vehicletype}
                                                    </td>
                                                    <td
                                                    >
                                                        {vec.status === "Pending" &&
                                                            <div className="pending">{this.props.t('Pending')}</div>
                                                        }
                                                        {vec.status === "Approved" &&
                                                            <div className="approved">{this.props.t('Approved')}</div>
                                                        }
                                                        {vec.status === "Rejected" &&
                                                            <div className="rejected">{this.props.t('Rejected')}</div>
                                                        }
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>

                                    <div className="movein">
                                        <div>
                                            <h4>
                                                <strong >{totalDrivers}</strong>{" "}
                                                {this.props.t('Vehicle_entries')}
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
                                    </div>

                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>)
        }

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >

        );

    }
}
export default translate(Vehicles);
