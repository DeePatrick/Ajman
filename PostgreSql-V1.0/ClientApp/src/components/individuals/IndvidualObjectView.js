import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';
import Loader from '../loader';

class IndvidualObjectView extends Component {
    displayName = IndvidualObjectView.name;

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false,


            individualid: 0,
            languageid: 1,
            emiratesid: "1234567891234599",
            nameen: "Kimiko Gleen",
            namear: "كيميكو غلين",
            email: "kimiko@gmail.com",
            gender: "Male",
            mobilecountry: 169,
            mobilearea: 1,
            mobilenumber: 9876543299,
            dob: "1998-11-27",
            nationalityid: 169,
            religionid: 1,
            maritalstausid: 169,
            telephonearea: 1,
            telephonecountry: 1,
            telephonenumber: 9876543299,
            countryid: 169,
            stateid: 420,
            cityid: 0,
            area: "Area 51",
            street: "Regan Street",
            buildingnumber: 0,
            flatnumber: 0,
            profilephoto: "",
            createdon: "2018-11-28",
            companyid: 0,
            roleid: 0,

            notes: '',
        
            documents: null,
            fireRedirect: false,
            companyId: '',
            companyName: '',
            roleCode: '',
            rlId: '',




            Action: '',
            vecList: [],
            indList: []



        };
    }



    componentWillReceiveProps(nextProps) {
        this.setState({
            Action: nextProps.objModelName,
            individualid: nextProps.individualid,
            nameen: nextProps.nameen,
            namear: nextProps.namear,
            dob: nextProps.dob,
            isactive: nextProps.isactive,
            email: nextProps.email,
            address: nextProps.address,
            flatnumber: nextProps.flatnumber,
            buildingnumber: nextProps.buildingnumber,
            street: nextProps.street,
            area: nextProps.area,
            state: nextProps.state,
            stateid: nextProps.stateid,
            cityid: nextProps.cityid,
            city: nextProps.city,
            gender: nextProps.gender,
            languageid: nextProps.languageid,
            language: nextProps.language,
            maritalstatusid: nextProps.maritalstatusid,
            maritalStatus: nextProps.maritalStatus,
            notes: nextProps.notes,
            country: nextProps.country,
            mobilenumber: nextProps.mobilenumber,
            mobilenumberwithcountry: nextProps.mobilenumberwithcountry,
            telephonenumber: nextProps.telephonenumber,
            telephonenumberwithcountry: nextProps.telephonenumberwithcountry,
            nationalityid: nextProps.nationalityid,
            nationality: nextProps.nationality,
            religionid: nextProps.religionid,
            religion: nextProps.religion,
            emirateId: nextProps.emirateId,
            keyID: nextProps.keyID,
            department: nextProps.department,
            profilephoto: nextProps.profilephoto,
            status: nextProps.status,
            companyname: nextProps.companyname,
            companyid: nextProps.companyid

        });
    }


    getVehicles() {
        var _id = this.props.cRNumID;

        fetch(config.webApiUrl() + "aptc_company_getVehicles/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ vecList: data, loading: false });
            });
    }


    getPermits() {
        var _id = this.props.cRNumID;

        const url = config.webApiUrl() + "aptc_company_getPendingPermits/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ permitList: data, loading: false });
            });
    }







    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }


    render() {
        console.log("cRNumID " + this.props.cRNumID);
        console.log("roles" + this.props.vecRolesList);
        console.log("vehicles " + this.props.vecVehicleList);
        console.log("fines " + this.props.vecFinesList);
        console.log("diverState " + this.props.vecDriverStatusList);
        console.log("permits " + this.props.vecPermitsList);
        console.log("uploads " + this.props.vecUploads);
        return (
            <div>
                <div
                    className="modal fade"
                    id="objectModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="objectModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="subtitle-modal">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>


                                    {this.state.Action === "Roles" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }
                                    {this.state.Action === "Fines" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }
                                    {this.state.Action === "ScoreCards" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }

                                    {this.state.Action === "Incidents" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }


                                    {this.state.Action === "Driver Status" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }
                                    {this.state.Action === "Permit" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }

                                    {this.state.Action === "Uploads" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }




                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="form-search-modal"
                                        placeholder="Search ..."
                                        value={this.state.search}
                                        onChange={this
                                            .updatesearch
                                            .bind(this)} />

                                    <span className="btn-search-edit">
                                        <button type="button">
                                            <i className="glyphicon glyphicon-search btn-search" />
                                        </button>
                                    </span>
                                </div>

                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {this.state.Action === "Roles" &&
                                        <div className="">
                                            <ul className="list-group">
                                                <li style={{ marginLeft: '25px', marginRight: '25px' }} className="list-group-item list-group-item-action">  <img
                                                    id="icon-pics"
                                                    src={!this.props.companyPhoto
                                                        ? require('../../assets/companylogos/norecord.png')
                                                        : this.props.companyPhoto}
                                                    onError={(e) => {
                                                        e.target.src = require('../../assets/companylogos/norecord.png');
                                                    }}
                                                    className="img-rounded"
                                                    alt="woman"
                                                    height="40"
                                                    width="40" /> &nbsp; &nbsp;
                                                            {this.props.roleName}
                                                </li>
                                            </ul>

                                        </div>
                                    }

                                    {this.state.Action === "Fines" &&
                                        <div className="veh-modal">
                                            {this.props.vecFinesList.map((vec, index) => (
                                                <ul className="list-group" key={index}>
                                                    <li
                                                        className="list-group-item list-group-item-action">
                                                        <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                        Fine No:{vec.fineID}
                                                        &nbsp;  Issued on :{vec.dateTime}
                                                        &nbsp; Fined :{vec.amount} &nbsp;{vec.status ? <span className="btn btn-modal-active pull-right">Unpaid</span> : <span className="btn btn-modal-active pull-right">Paid</span>}</li>
                                                </ul>
                                            ))}
                                        </div>

                                    }

                                    {this.state.Action === "Vehicles" &&
                                        <div className="veh-modal">
                                            {this.props.vecVehicleList.map((vec, index) => (
                                                <ul className="list-group" key={index}>
                                                    <li
                                                        className="list-group-item list-group-item-action">
                                                        <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                        Vin No:{vec.keyID}
                                                        &nbsp;  First Registered  on :{vec.firstRegData}
                                                        &nbsp; Plate Number :{vec.plateNumber} &nbsp;{vec.status ? <span className="btn btn-modal-active pull-right">Unpaid</span> : <span className="btn btn-modal-active pull-right">Paid</span>}</li>
                                                </ul>
                                            ))}
                                        </div>
                                    }

                                    {this.state.Action === "Incidents" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }

                                    {this.state.Action === "Scored" &&
                                        <div>
                                            {this.state.Action}
                                        </div>
                                    }

                                    {this.state.Action === "Documents" &&
                                        <div className="veh-modal">
                                            {this.props.vecUploads.map((vec, index) => (
                                                <ul className="list-group" key={index}>
                                                    <li
                                                        className="list-group-item list-group-item-action">
                                                        <i id="circle-red-no-margin" className="far fa-file-alt" />
                                                        <img
                                                            id="icon-pics"
                                                            src={!vec.docImage
                                                                ? require('../../assets/companylogos/norecord.png')
                                                                : vec.docImage}
                                                            onError={(e) => {
                                                                e.target.src = require('../../assets/companylogos/norecord.png');
                                                            }}
                                                            className="img-rounded"
                                                            alt="woman"
                                                            height="40"
                                                            width="40" />
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndvidualObjectView;
