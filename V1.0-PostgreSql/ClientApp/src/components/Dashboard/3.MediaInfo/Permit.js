import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import * as config from '../../../config';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class Permit extends Component {
    displayName = Permit.name

    constructor(props) {
        super(props);

        this.state = {
            permitlist: []
        };
    }
    componentWillMount() {
        this.bindPermit(0);
    }

    bindPermit(companyid) {
        this.setState({ loading: true });
        var url = '';
        if (companyid === 0) {
            url = config.webApiUrl() + "aptc_individual_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid');
        }
        else {
            url = config.webApiUrl() + "aptc_company_permits/" + localStorage.getItem('selectedLanguageCode') + "/" + companyid;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ vec: data[0] });
                }
                this.setState({ permitlist: data, currentDrivers: data, loading: false });
                this.setState({ loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
            });
    }
    render() {
        const { permitlist, showing } = this.state;
        let contents = "";

        contents = (
            <div className="row" style={{ height: '300px', overflow: 'auto' }}>
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                    <div className="panel panel-default">
                        <div className="panel panel-body">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">{this.props.t('Basic_Info')}</th>
                                            <th scope="col">{this.props.t('Duration')}</th>
                                            <th scope="col">{this.props.t('Permit_Valid_From')}</th>
                                            <th scope="col">{this.props.t('Permit_Valid_to')}</th>
                                            <th scope="col">{this.props.t('Permit_Type')}</th>
                                            <th scope="col">{this.props.t('Permit_No')}</th>
                                            <th scope="col">{this.props.t('Status')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {permitlist.map((vec, index) => (
                                            <tr className="panel-bubble-new" key={index}>
                                                <td scope="row">
                                                    <i id="icon-ticket-black-admin" className="fa fa-ticket" />
                                                    {vec.indivName} &nbsp; {vec.vehIDTrafficNum} &nbsp; {vec.vehIDMakeModel}
                                                </td>
                                                <td scope="row">
                                                    {vec.duration} {vec.permitweightid}
                                                </td>
                                                <td scope="row">
                                                    {
                                                        vec.statusid === 421 &&
                                                        <span >{vec.validfrom}</span>
                                                    }
                                                    {
                                                        vec.statusid !== 421 &&
                                                        <span >N/A</span>
                                                    }
                                                </td>
                                                <td scope="row">
                                                    {
                                                        vec.statusid === 421 &&
                                                        <span >{vec.validto}</span>
                                                    }
                                                    {
                                                        vec.statusid !== 421 &&
                                                        <span >N/A</span>
                                                    }
                                                </td>
                                                <td scope="row">
                                                    {vec.permittype}
                                                </td>
                                                <td scope="row">
                                                    {vec.permitid}
                                                </td>
                                                <td scope="row">
                                                    {vec.statusid === 420 &&
                                                        <span className="pending">{this.props.t('Pending')}</span>}
                                                    {vec.statusid === 421 &&
                                                        <span className="approved">{this.props.t('Approved')}</span>
                                                    }
                                                    {vec.statusid === 422 &&
                                                        <span className="pending">{this.props.t('Rejected')}</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Animated>
            </div>)

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>

        );

    }
}
export default translate(Permit);