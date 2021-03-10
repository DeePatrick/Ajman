import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import Pagination from './../shared/Pagination';
import $ from 'jquery';
import Docs from '../documents/Docs';
import Loader from '../loader';
import * as config from '../../config';
import ObjectView from '../view-object-model/ObjectView';
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang';
import en from '../../language/static_content_english_cust.json';
import ar from '../../language/static_content_arabic_cust.json';
import type { T } from 'react-multi-lang';
import { setLanguage, getLanguage } from 'react-multi-lang';

type Props = {
    t: T
}

class MyAccount extends Component {
    displayName = MyAccount.name
    constructor(props) {
        super(props);

        setTranslations({ ar, en })

        if (localStorage.getItem('selectedLanguageCode') == 2) {
            setDefaultLanguage('ar');
        }
        else {
            setDefaultLanguage('en')
        }

        this.state = {
            employeeid: 0,
            individualid: 0,
            languageid: 0,
            requiredItem: 0,
            currentPage: 0,
            editindex: 0,
            pageLimit: 10,
            fullName: '',
            modal: 'modal',
            emplist: [],
            currentDrivers: [],
            loading: true,
            offset: 0,
            emirtaiId: '',
            vec: [],
            roles: [],
            docInContent: {
                duration: "",
                fees: ""
            },
            company: [],
            eFines: [],
            eDocuments: [],
            eIncidents: [],
            eScore: [],
            eRoles: [],
            eVehicles: [],
            employeeObjects: {},
            search: '',
            searchMake: '',
            searchOwner: '',
            showing: false,
            isEditOpen: false,
            isAddOpen: false,
            isDocOpen: false,
            isModelViewOpen: false,
            Action: '',
            mode: '',
            emp: {},
            countrylist: [],
            approvedcomplist: []
        };

        this.refreshEmployee = this
            .refreshEmployee
            .bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            var compList = [];
            fetch(config.webApiUrl() + "aptc_individual_getCompanys/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
                .then(response => response.json())
                .then(data => {
                    this.setState({ companyList: data });
                    $.each(data, function (key, value) {
                        if (value.statusid === 421) {
                            compList.push(value);
                        }
                    })
                    this.setState({ approvedcomplist: compList });
                });
            this.bindEmployee();

            if (localStorage.getItem('selectedLanguageCode') == 2) { setLanguage('ar'); }
            else { setLanguage('en'); }
        }
    }
    onPageChanged = data => {
        const { emplist } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        if (emplist.StatusCode !== '404') {
            const currentDrivers = emplist.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }
    }
    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }
    bindEmployee(mode) {
        this.setState({ loading: true });
        fetch(config.webApiUrl() + 'aptc_employee_getAllActiveCompanysEmployees/' + localStorage.getItem('selectedLanguageCode') + '/' + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ emplist: data, currentDrivers: data, loading: false });
                this.setState({ isEditOpen: true, isAddOpen: true, isDocOpen: true });
                if (mode === 'edit') {
                    var tempemp = {};
                    for (var indx = 0; indx < this.state.emplist.length; indx++) {
                        if (this.state.employeeid === data.individualid) {
                            this.setState({ requiredItem: indx });
                            tempemp = this.state.data[indx];
                            this.setState({ emp: tempemp });
                        }
                    }
                }
                else {
                    this.setState({ emp: data[0] });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                alert(error);
            });
    }
    viewEmployee = (employeeid) => {
        this.setState({ employeeid: employeeid, mode: '' });
        var tempemp = {};
        for (var indx = 0; indx < this.state.emplist.length; indx++) {
            if (employeeid === this.state.emplist[indx].individualid) {
                this.setState({ requiredItem: indx });
                tempemp = this.state.emplist[indx];
                this.setState({ emp: tempemp });
            }
        }
    };

    addEmployee = (index) => {
        this.setState({ isAddOpen: true, mode: 'add' });
    };
    addDocument = (employeeid) => {
        this.setState({ isDocOpen: true, mode: 'doc', employeeid: employeeid });
    };

    editEmployee = (employeeid) => {
        this.setState({ employeeid: employeeid });
        this.setState({ isEditOpen: true, mode: 'edit' });
    };
    deleteEmployee = (employeeid) => {
        if (!window.confirm("Do you want to delete this employee"))
            return;
        else {
            this.setState({ loading: true });

            fetch(config.webApiUrl() + 'aptc_employee/' + employeeid, { method: 'delete' })
                .then(response => response.json())
                .then(data => {
                    this.bindEmployee('');
                }).catch((error) => {
                    alert(error);
                    alert("axios error:" + error.response.data.ResponseMessage);
                    this.setState({ loading: false });
                });
            //this.fullDelete(_id, index);
        }
    };
    refreshEmployee = (employeeid, mode) => {
        this.setState({ employeeid: employeeid, loading: false });
        this.bindEmployee(mode);
    };

    oepModelViewOpenClick(Action, individualid) {
        this.setState({ isModelViewOpen: true, individualid: individualid });
        switch (Action) {
            case "Roles":
                this.setState({ Action: "Roles" });
                break;
            case "Fines":
                this.setState({ Action: "Fines" });
                break;
            case "Vehicles":
                this.setState({ Action: "Vehicles" });
                break;
            case "Incidents":
                this.setState({ Action: "Incidents" });
                break;
            case "ScoredCard":
                this.setState({ Action: "ScoredCard" });
                break;
            case "Documents":
                this.setState({ Action: "Documents" });
                break;
            case "Permits":
                this.setState({ Action: "Permits" });
                break;
        }

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        let contents = ""
        const { currentDrivers } = this.state;
        let filteredIndividuals = [];
        if (this.state.currentDrivers.length > 0) {
            filteredIndividuals = this.state.currentDrivers
                .filter((emp) => {
                    return (
                        !emp.dob ? "" : emp.dob.indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.nameen.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.emiratesid.indexOf(this.state.search) !== -1 ||
                            emp.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.rolename.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.companyname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.status.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                            emp.telephonenumber.indexOf(this.state.search) !== -1
                    );
                });

        }
        const { showing } = this.state;
        contents =
            (<div>
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 left-border">
                        <div className="panel panel-default main-body-height-admin">
                            <div>
                                <div className='col-lg-2 col-md-4 col-sm-3'>
                                    <span className='pics'>&nbsp;
                                    <img
                                            id="icon-pics"
                                            src={!this.state.emp.profilephoto
                                                ? require('../../assets/user-img.png')
                                                : this.state.emp.profilephoto}
                                            onError={(e) => {
                                                e.target.src = require('../../assets/user-img.png')
                                            }}
                                            className="img-circle"
                                            alt="woman"
                                            height="120"
                                            width="120" />
                                    </span>
                                </div>
                                <div id="left-border-line-admin" style={{ backgroundColor: 'white' }} className="col-lg-10 col-md-8 col-sm-9 left-margin">
                                    <div className="pull-right" style={{ display: 'none' }}>
                                        <i
                                            id="cancel"
                                            onClick={() => this.setState({
                                                showing: !showing
                                            })}
                                            className="fa fa-times" />
                                    </div>
                                    <div>
                                        <span className="title-side-detail-panel">{this.state.emp.nameen} &nbsp; {this.state.emp.namear}</span>
                                        {this.state.emp.status === "Pending" &&
                                            <span className="pending">{this.props.t('Pending')}</span>}
                                        {this.state.emp.status === "Approved" &&
                                            <span className="approved">{this.props.t('Approved')}</span>
                                        }
                                        {this.state.emp.status === "Rejected" &&
                                            <span className="rejected">{this.props.t('Rejected')}</span>
                                        }
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6">
                                            <p> <strong>{this.props.t('Address')}</strong>&nbsp;
                                                                {this.state.emp.buildingnumber}&nbsp;&nbsp; {this.state.emp.flatnumber}
                                                &nbsp; {this.state.emp.area}&nbsp;{this.state.emp.street}<br />
                                                {this.state.emp.city}&nbsp;{this.state.emp.state}&nbsp;{this.state.emp.country}
                                            </p>
                                            <p><strong>{this.props.t('Email')}</strong>&nbsp;{this.state.emp.email}</p>
                                            <p><strong>{this.props.t('Emirates')}</strong>&nbsp;{this.state.emp.emiratesid}</p>
                                            <p><strong>{this.props.t('Company_Name')}</strong>&nbsp;{this.state.emp.companyname}</p>
                                            <p><strong>{this.props.t('Role')}</strong>&nbsp;{this.state.emp.rolename}</p>
                                            <p><strong>{this.props.t('Date_of_Birth')}</strong> &nbsp;
																{
                                                    !this.state.emp.dob
                                                        ? ""
                                                        : this.state.emp.dob.split('T')[0]
                                                }</p>
                                            <p><strong>{this.props.t('Mobile_Number')}</strong>&nbsp; {this.state.emp.mobilenumberwithcountry}</p>
                                            <p><strong>{this.props.t('Telephone_Number')}</strong>&nbsp;{this.state.emp.telephonenumberwithcountry}
                                            </p>
                                            <br />
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="colour">
                                        <button
                                            className="black-margin action"
                                            data-toggle="modal"
                                            data-target="#editModal"
                                            onClick={() => this.editEmployee(this.state.emp.individualid)}
                                        >
                                            <i id="action" className="glyphicon glyphicon-edit" />
                                            &nbsp; {this.props.t('Edit')}
                                        </button>

                                        <button className="black-margin action" onClick={() => this.deleteEmployee(this.state.emp.individualid)}>
                                            <i id="action" className="fa fa-trash" />
                                            &nbsp; {this.props.t('Delete')}
                                        </button>

                                        <button className="black-margin action" data-toggle="modal" data-target="#attachModal"
                                            onClick={() => this.addDocument(this.state.emp.individualid)}>
                                            <i id="action" className="fa fa-paperclip" />
                                            &nbsp; {this.props.t('Attachment')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>);

        return (
            <div>
                <div>
                    {this.state.loading === true
                        && <div><Loader /></div>}
                    {contents}
                </div>
            </div >

        );

    }
}
export default translate(MyAccount);
