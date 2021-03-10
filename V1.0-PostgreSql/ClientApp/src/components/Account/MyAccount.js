import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import $ from 'jquery';
import axios from 'axios';
import Loader from '../loader';
import EditAccount from './EditAccount';
import * as config from '../../config';
import {translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class MyAccount extends Component {
    displayName = MyAccount.name
    constructor(props) {
        super(props);
        this.state = {
            individualid: 0,
            emp: {},
            mode: 'edit',
            filename: '',
            profilephoto: '',
            isUpload: false,
            isEdit:false

        };

        this.refreshIndividual = this
            .refreshIndividual
            .bind(this);
        this.saveimage = this
            .saveimage
            .bind(this);
        this.cancelimage = this
            .cancelimage
            .bind(this);

    }
    componentWillMount() {
       if (this.state.emp.individualid === undefined) {
           this.setState({ mode: false });
           this.setState({ loading: true });
           this.getIndividual();
            
        }

    }
    getIndividual() {
        fetch(config.webApiUrl() + "aptc_individual/" + localStorage.getItem('selectedLanguageCode') + "/" + localStorage.getItem('individualid'))
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                this.setState({ emp: data, profilephoto: data.profilephoto });

            }).catch((error) => {
                if (error.response !== null) {
                    if (error.response.data.IsSuccess !== null) {
                        this.setState({ loading: false });
                        alert(error.response.data.ResponseMessage);
                    }
                }
                else {
                    this.setState({ loading: false });
                    alert(error);
                }
            });
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
    editAccount = (employeeid) => {
        this.setState({ employeeid: employeeid });
        this.setState({ isEditOpen: true, mode: 'edit' });
    };
    refreshIndividual = (individualid, mode) => {
        this.setState({ individualid: individualid, loading: true, mode:"" });
        this.getIndividual();
    };
    fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            var filename = e.target.files[0];
            var size = filename.size;
            let reader = new FileReader();
            reader.onload = (e) => {
                $('#icon-pics').attr("src", e.target.result);
                this.setState({ profilephoto: e.target.result, filename: filename.name, isUpload: true });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    saveimage = (e) => {
        var indphoto = {};
        indphoto.individualid = this.state.emp.individualid;
        indphoto.profilephoto = this.state.profilephoto;
        indphoto.filename = this.state.filename;
        var imageupload = JSON.stringify(indphoto);
        axios
            .put(config.webApiUrl() + "aptc_individual_profilephoto", imageupload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                localStorage.setItem('profilephoto', this.state.profilephoto);
                this.setState({ loading: false });
                this.setState({ isUpload: false });
            })
            .catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });
       
    };
    cancelimage = (e) => {
        this.setState({ profilephoto: this.state.emp.profilephoto, isUpload: false });
        $('#icon-pics').attr("src", this.state.emp.profilephoto);
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        let contents = ""
        contents =
            (<div>
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 left-border">
                        <div className="panel panel-default main-body-height-admin">
                        <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                <div className='col-lg-2 col-md-4 col-sm-3' style={{ marginTop: '20px' }}>
                                    <span className='pics'>&nbsp;
                                                        <img
                                            id="icon-pics"
                                            src={!this.state.profilephoto
                                                ? require('../../assets/user-img.png')
                                                : this.state.profilephoto}
                                            onError={(e) => {
                                                e.target.src = require('../../assets/user-img.png')
                                            }}
                                            className="img-circle"
                                            alt="profilephoto"
                                            height="120"
                                            width="120" />
                                    </span>

                                    <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                    {
                                        this.state.isUpload === false &&
                                        <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Edit Image" onClick={() => this.fileInput.click()}><i className="fa fa-pencil" /></span>}
                                    {
                                        this.state.isUpload === true &&
                                        <div>
                                            <div style={{ marginLeft: '40px' }}>
                                                <span style={{ fontSize: '20px', cursor: 'pointer' }} title="Save" onClick={() => this.saveimage()}><i className="fa fa-save" /></span>
                                                <span style={{ fontSize: '20px', cursor: 'pointer', marginLeft: '10px' }} title="Cancel" onClick={() => this.cancelimage()}><i className="fa fa-close" /></span>
                                            </div></div>
                                    }

                                </div>
                                <div id="left-border-line-admin" style={{ backgroundColor: 'white' }} className="col-lg-10 col-md-8 col-sm-9 left-margin" style={{ marginTop: '20px' }}>

                                    <div>
                                        <span className="title-side-detail-panel">{this.state.emp.nameen} &nbsp; {this.state.emp.namear}</span>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-4 col-lg-4">
                                            <p> <strong>{this.props.t('Address')}</strong>&nbsp;
                                                                {this.state.emp.buildingnumber}&nbsp;&nbsp; {this.state.emp.flatnumber}
                                                &nbsp; {this.state.emp.area}&nbsp;{this.state.emp.street}<br />
                                                {this.state.emp.city}&nbsp;{this.state.emp.state}&nbsp;{this.state.emp.country}
                                            </p>
                                            <p><strong>{this.props.t('Email')}</strong>&nbsp;{this.state.emp.email}</p>
                                            <p><strong>{this.props.t('Emirates')}</strong>&nbsp;{this.state.emp.emiratesid}</p>
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
                                        <div className="col-md-6 col-lg-6">
                                            <p> <strong>Nationality:</strong>&nbsp;
                                                                {this.state.emp.nationality}
                                            </p>
                                            <p><strong>Religion:</strong>&nbsp;{this.state.emp.religion}</p>
                                        <p><strong>Gender:</strong>&nbsp;{this.state.emp.gendername}</p>
                                            <p><strong>Marital Status:</strong>&nbsp;{this.state.emp.maritalstatus}</p>
                                            <br />
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="colour">
                                        <button
                                            className="black-margin action"
                                            data-toggle="modal"
                                            data-target="#editAccountModal"
                                            onClick={() => this.editAccount(this.state.emp.individualid)}
                                        >
                                            <i id="action" className="glyphicon glyphicon-edit" />
                                            &nbsp; {this.props.t('Edit')}
                                        </button>
                                    </div>
                                </div>
                        </Animated>
                    </div>
                    <EditAccount mode={this.state.mode} individualid={this.state.emp.individualid} refreshIndividual={this.refreshIndividual}/>
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
