import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../../config';
import './print.css';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

export class Print extends Component {
    displayName = Print.name;
    constructor(props) {
        super(props);
        this.state = {
            permitdetails: {},
            validfrom: '',
            validto: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.mode==='print') {
            this.bindPrmitDetails(nextProps);
        }
    }
    bindPrmitDetails(obj) {
        var url = config.webApiUrl() + "aptc_permit_print/" + localStorage.getItem('selectedLanguageCode') + "/" + obj.permittypeid + "/" + obj.permitid;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.validfrom!==undefined) {
                    this.setState({ validfrom: data.validfrom.split('T')[0], validto: data.validto.split('T')[0], loading: false });
                }
                this.setState({ permitdetails: data, loading: false });

            }).catch((error) => {
                alert(error);
                this.setState({ loading: false });
            });
    }
    render() {
        return (
            <div id="close">
                <div
                    className="modal"
                    id="printModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="requestModalLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p style={{ fontSize: '18px', float: 'left', marginRight: '23px',cursor:'pointer' }}><i className="fa fa-print" /></p><button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                
                            </div>
                            <div className="main-background">
                                <div className="wrapper" style={{width:'100%'}}>
                                    <header className="main-header">
                                        <span className="header-image-left"><img src={require('../../Permit/Print/images/logo1.png')} alt="test" width="182" height="112" /></span>
                                        <span className="header-image-right"><img src={require('../../Permit/Print/images/logo2.png')} alt="test" width="350" height="112" /></span>
                                    </header>
                                    <header className="sub-header" style={{height:'40px'}}>
                                        <h2 className="sub-title">( {this.state.permitdetails.permitid} ) Permit Number
                                        </h2>
                                        <h2 className="sub-title2">{this.state.permitdetails.permittype} Permit

                                        </h2>
                                    </header>

                                    <div className="main-container">
                                        <div className="profile-pic-container">
                                            <img
                                                src={!this.state.permitdetails.profilephoto
                                                    ? require('../../../assets/user-img.png')
                                                    : this.state.permitdetails.profilephoto}
                                                onError={(e) => {
                                                    e.target.src = require('../../../assets/user-img.png')
                                                }} 
                                                 alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '150px' }} />
                                        </div>
                                        <div className="text-container">
                                            <div className="text-style floatleft fontbold" style={{float:'left', fontWeight:'bold'}}>Name:</div>
                                            <div className="text-style" style={{ float: 'left' }}>{this.state.permitdetails.drivername}</div>
                                            <br /><br />
                                            <div className="text-style" style={{ float: 'left', fontWeight: 'bold' }}>Nationality:</div>
                                            <div className="text-style" style={{ float: 'left' }}>{this.state.permitdetails.nationality}</div>
                                            <br /><br />
                                            <div className="text-style" style={{ float: 'left', fontWeight: 'bold' }}>Sponsor:</div>
                                            <div className="text-style" style={{ float: 'left' }}>{this.state.permitdetails.companyname}</div>
                                            <br /><br />
                                            <div className="text-style" style={{float:'left', fontWeight:'bold'}}>Lorem ipsum dolor:</div>
                                            <div className="text-style" style={{float:'left'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                            <br /><br />
                                            <div className="text-style" style={{ float: 'left', fontWeight: 'bold' }}>Issue Date:</div>
                                            <div className="text-style" style={{ float: 'left' }}>{this.state.validfrom}</div>
                                            <div className="text-style" style={{float:'left', fontWeight:'bold'}}>Expiry Date:</div>
                                            <div className="text-style" style={{ float: 'left' }}>{this.state.validto}</div>
                                        </div>
                                        <div className="barcode-container">
                                            <img src={require('../../Permit/Print/images/frame.png')} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '145px' }} />
                                        </div>
                                    </div>
                                    <footer className="sub-footer" />
                                    <footer className="main-footer">
                                        <p style={{ color: 'darkgreen' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <p style={{ fontWeight:'bold'}}>APTC/QMS/CH/PRO1/FRM/05</p>
                                        <img className="footer-image" src={require('../../Permit/Print/images/zayed.png')} alt="test" width="258" height="102" />
                                        
                                        </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
export default translate(Print);