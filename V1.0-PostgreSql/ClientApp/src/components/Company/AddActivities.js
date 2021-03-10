import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';

class AddActivities extends Component {
    displayName = AddActivities.name;
    constructor(props) {
        super(props);
        //this.handleSave = this
        //    .handleSave
        //    .bind(this);
        this.state = {
            comapnyid:0,
            companyactivitylist: [
                {
                    companyactivityid: 0
                }
            ],
            activitylist: []
        };

        this.handleActivityChange = this
            .handleActivityChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

    }
    /*Load*/
    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            var companyactivitylist = [];
            var companyactivity = {};
            companyactivity.companyactivityid = 0;
            companyactivitylist.push(companyactivity);
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode'), companyid: nextProps.companyid  });
            fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode')  + "/1")
                .then(response => response.json())
                .then(data => {
                    this.setState({ activitylist: data, loading: false });
                });
        }
    }
    addCompanyActitives(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            companyactivitylist: [
                ...prevState.companyactivitylist, {
                    companyactivityid: 0
                }
            ]
        }));
    }
    handleActivityChange(e) {
        let activities = [...this.state.companyactivitylist];
        activities[e.target.dataset.id]['companyactivityid'] = e.target.value;
        this.setState({ companyactivitylist: activities }, () => console.log(this.state.companyactivitylist));
    }
    handleRemoveCompanyActivities = (idy) => () => {
        if (this.state.companyactivitylist.length > 1) {
            if (this.state.companyactivitylist.length > 0) {
                var companyactivitylist = this.state.companyactivitylist;
                companyactivitylist.pop(idy);
                this.setState({ companyactivitylist: companyactivitylist });
            }
        }

    }
    /*Save Partner*/
    handleSave() {
        this.props.refreshCompany(this.state.companyid);
    }
    handleSubmit(e) {
        e.preventDefault();
        var companyactivity = {};
        companyactivity.companyid = this.state.companyid;
        companyactivity.createdby = this.state.createdby;
        companyactivity.companyactivitylist = this.state.companyactivitylist;
        const companyactivities = JSON.stringify(companyactivity);
        axios
            .post(config.webApiUrl() + 'aptc_companyactivity ', companyactivities, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({ loading: false });
                alert(res.data.ResponseMessage);
                this.handleSave();
                $('.close').click();
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response.data !== null) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.response);
                }
            });
    }
    /*End  Partner*/
    render() {
        return (
            <div
                className="modal"
                id="activityModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="activityModalLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content" style={{ width: '100%', minHeight: '300px' }}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12" style={{marginTop:'30px'}}>
                                                        <label>Company Activities</label>
                                                    </div>
                                                </div>
                                                {this.state.companyactivitylist.map((val, idy) => {
                                                    let compActivitiesID = `companyactivityid-${idy}`
                                                    return (
                                                        <div key={idy}>
                                                            <div className="row">
                                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                                    <select
                                                                        name={compActivitiesID}
                                                                        data-id={idy}
                                                                        id={compActivitiesID}
                                                                        data-val="true"
                                                                        onChange={this.handleActivityChange}
                                                                        value={this.state.companyactivitylist.companyactivityid}
                                                                        type="text"
                                                                        className="ActivityID edit-form"
                                                                        required>
                                                                        <option value="">Select Activity</option>
                                                                        {this
                                                                            .state
                                                                            .activitylist
                                                                            .map((comActList, index) => <option key={index} value={comActList.commonmasterid}>{comActList.name}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 col-lg-3 col-sm-3">
                                                                    <table>
                                                                        <tr>
                                                                            <td><button type="button" className="btn-delete" onClick={this.handleRemoveCompanyActivities(idy)}
                                                                                style={{ width: '60px', marginRight: '10px' }} id="btnDelete"><i className="fa fa-trash" />&nbsp;Delete</button></td>
                                                                            <td><button
                                                                                className="btn-delete1"
                                                                                onClick={this
                                                                                    .addCompanyActitives
                                                                                    .bind(this)}
                                                                                style={{
                                                                                    width: '150px'
                                                                                }}><i className="fa fa-plus" />&nbsp;Add more activities</button></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <button
                                    id="hidePopUpBtn"
                                    type="button"
                                    className="btn btn-blank">&nbsp;</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                            <br />
                            <br />
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
export default AddActivities;