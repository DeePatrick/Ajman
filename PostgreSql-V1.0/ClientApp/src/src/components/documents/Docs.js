import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';
import Loader from '../loader';
import { setTranslations, setDefaultLanguage, translate, setLanguage, getLanguage  } from 'react-multi-lang';
import en from '../../language/static_content_english_cust';
import ar from '../../language/static_content_arabic_cust';

import type { T } from 'react-multi-lang';

setTranslations({ ar, en });
setDefaultLanguage('en');



class Docs extends Component {
    displayName = Docs.name;
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            createdby: 0,
            documenttypeid: 0,
            individualid: 0,
            documentnumber: 0,
            licensetypepermitted: '',
            companyid: 0,
            vehicleid: 0,
            validfrom: '',
            validto: '',
            documentfilephoto: '',
            documentfilename: '',
            docnumberlabel: '',
            doctypelist: [],
            documentlist: [],
            licensetypelist: [],
            licensetypeides: []

        };

        this.saveDocument = this
            .saveDocument
            .bind(this);



        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 7)
            .then(response => response.json())
            .then(data => {
                this.setState({ doctypelist: data, loading: false });
                this.addDocument();
                this.setState({ loading: false });
                this.setState({ createdby: parseInt(localStorage.getItem('userid')) });
            }).catch((error) => {
                this.setState({ loading: false });
                alert(error.message);
            });
    }


    componentWillMount() {
        if (localStorage.getItem('selectedLanguageCode') === 2) { setLanguage('ar'); }
        else { setLanguage('en'); }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            companyid: nextProps.companyid,
            individualid: nextProps.individualid
        });
    }

    


    bindLicense() {
        fetch(config.webApiUrl() + "aptc_getCommonMasters/" + localStorage.getItem('selectedLanguageCode') + "/" + 29)
            .then(response => response.json())
            .then(data => {
                this.setState({ licensetypelist: data });
            });
    }
    addDocument() {
        var doc = {};
        var doclist = this.state.documentlist;
        doc.validto = this.state.validto;
        doc.validfrom = this.state.validfrom;
        doc.documentnumber = this.state.documentnumber
        doc.documenttypeid = this.state.documenttypeid;
        doc.documentfiletypeid = this.state.documentfiletypeid;
        doc.documentfilephoto = this.state.documentfilephoto;
        doc.documentfilename = this.state.documentfilename;
        doc.individualid = this.state.individualid;
        doc.licensetypepermitted = this.state.licensetypepermitted;
        doc.companyid = this.state.companyid;
        doc.createdby = this.state.createdby;
        doclist.push(doc);
        this.setState({ documentlist: doclist });

    }
    // Page load compeleted

    // Start Change Event
    onChangeDocType = (e) => {
        var doclist = this.state.documentlist;
        doclist[e.target.dataset.id].documenttypeid = e.target.value;
        this.setState({ documentlist: doclist, licensetypeides: [] });
        doclist[e.target.dataset.id].isLicense = false;
        if (e.target.selectedIndex > 0) {
            this.setState({ docnumberlabel: this.state.doctypelist[e.target.selectedIndex - 1].name });
        }
        if (e.target.value === '93') {
            doclist[e.target.dataset.id].isLicense = true;
            this.bindLicense();

        }
    };
    onDocumentNumberChange = (e) => {
        var doclist = this.state.documentlist;
        doclist[e.target.dataset.id].documentnumber = e.target.value;
        this.setState({ documentlist: doclist });
    }
    onValidToChange = (e) => {
        var doclist = this.state.documentlist;
        doclist[e.target.dataset.id].validto = e.target.value;
        this.setState({ documentlist: doclist });
    }
    onValidFromChange = (e) => {
        var doclist = this.state.documentlist;
        doclist[e.target.dataset.id].validfrom = e.target.value;
        this.setState({ documentlist: doclist });
    }
    onLicenseTypeChnage = (e) => {
        var licensetypeides = this.state.licensetypeides;
        var licensetypeid = this.state.licensetypelist[e.target.name].commonmasterid;
        var isExists = $.inArray(licensetypeid, licensetypeides);
        if (isExists === -1) {
            licensetypeides.push(licensetypeid);
        }
        else {
            licensetypeides.pop(licensetypeid);
        }
        this.setState({ licensetypeides: licensetypeides });
        var doclist = this.state.documentlist;
        doclist[e.target.dataset.id].licensetypepermitted = licensetypeides.join(',');
        this.setState({ documentlist: doclist });

    }
    handleDocsImgChange = (idx) => (evt) => {
        if (evt.target.files && evt.target.files[0]) {
            var filename = evt.target.files[0].name;
            var doclist = this.state.documentlist;
            let reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            reader.onload = (e) => {
                doclist[idx].documentfiletypeid = 1;
                doclist[idx].documentfilephoto = e.target.result;
                doclist[idx].documentfilename = filename;
            };
            this.setState({ documentlist: doclist });
        }
    }
    //End Change Events

    //Start Documents
    handleAddDocs = (idx) => () => {
        this.addDocument();
    }
    handleRemoveDocs = (idx) => () => {
        if (this.state.documentlist.length > 1) {
            if (this.state.documentlist.length > 0) {
                var doclist = this.state.documentlist;
                doclist.pop(idx);
                this.setState({ documentlist: doclist });
                this.setState({
                    documentlist: this
                        .state
                        .documentlist
                        .filter((v, vidx) => idx !== vidx)
                });
            }
        }
    };
    //End  Documents

    //Save Documents/
    saveDocument(e) {
        e.preventDefault();
        this.setState({ loading: true });
        var doc = JSON.stringify(this.state.documentlist);
        debugger;
        axios.post(config.webApiUrl() + 'aptc_documentupload', doc, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert(res.data.ResponseMessage);
            $('.close').click();
        }).catch((error) => {
            this.setState({ loading: false });
            alert(error.message);
        });
    }

    //End  Documents
    render() {
        const { translate } = this.props;
        console.log("companyid " + this.state.companyid);
        console.log("individualid " + this.state.individualid);
        return (
            <div
                className="modal fade"
                id="attachModal"
                tabIndex="-1"
                role="dialog"
                style={{ width: '500px!important' }}
                aria-labelledby="attachModalLabel">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content" style={{ width: '100%' }}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="attachModalLabel">
                                <i className="glyphicon glyphicon-edit" />
                                &nbsp; Upload Documents</h4>
                            <hr />
                        </div>
                        <form name="form" onSubmit={this.saveDocument}>
                            <div className="modal-body">
                                {this.state.loading === true
                                    && <div><Loader /></div>}
                                {
                                    this.state.documentlist.map((docs, idx) =>
                                        (
                                            <div className="shareholder1" key={idx}>

                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label>{this.props.t('Document_Type')}</label>
                                                        <select
                                                            data-val="true" style={{ height: '24px' }}
                                                            value={this.state.documentlist.documenttypeid}
                                                            onChange={(e) => this.onChangeDocType(e)}
                                                            className="edit-form"
                                                            data-id={idx}
                                                            required>
                                                            <option value="">{this.props.t('Document_Type')}</option>
                                                            {this
                                                                .state
                                                                .doctypelist
                                                                .map((doctype, index) => <option key={index} value={doctype.commonmasterid}>{doctype.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label>{this.props.t('Document_Number')}</label>
                                                        <input required
                                                            className="edit-form"
                                                            data-id={idx}
                                                            name="docnumber"
                                                            value={this.state.documentlist.documentnumber}
                                                            onChange={this.onDocumentNumberChange}
                                                            type="text"
                                                            placeholder={this.props.t('Document_Number')} />
                                                    </div>
                                                </div>

                                                {
                                                    docs.isLicense === true &&
                                                    <div>
                                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                                            <div className="form-group">
                                                                <label>{this.props.t('License_Type')}</label>
                                                            </div>
                                                            {
                                                                this
                                                                    .state
                                                                    .licensetypelist
                                                                    .map((licensetype, indx) =>
                                                                        (<div className="col-md-4 col-lg-4 col-sm-4">
                                                                            <input style={{ marginRight: '10px' }}
                                                                                name={indx}
                                                                                data-id={idx}
                                                                                onChange={(e) => this.onLicenseTypeChnage(e)}
                                                                                type="checkbox"
                                                                            />{licensetype.name}
                                                                        </div>))}
                                                        </div>
                                                    </div>
                                                }

                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label >{this.props.t('Valid_From')}</label>
                                                        <input
                                                            name="validFrom"
                                                            data-id={idx}
                                                            onChange={this.onValidFromChange}
                                                            value={this.state.documentlist.validfrom}
                                                            type="date"
                                                            required
                                                            className="edit-form"
                                                            placeholder={this.props.t('Valid_From')} />
                                                    </div>
                                                </div>


                                                <div className="col-md-6 col-lg-6 col-sm-6">
                                                    <div className="form-group" >
                                                        <label>{this.props.t('Valid_To')}</label>
                                                        <input
                                                            name="validTo"
                                                            onChange={this.onValidToChange}
                                                            value={this.state.documentlist.validto}
                                                            type="date"
                                                            data-id={idx}
                                                            required
                                                            className="edit-form"
                                                            placeholder={this.props.t('Valid_To')} />
                                                    </div>
                                                </div>

                                                <div className="col-md-8 col-lg-8 col-sm-8">
                                                    <div className="form-group">
                                                        <label>{this.props.t('Select_File')}</label>
                                                        <input required multiple
                                                            type="file" alt="doc" id={idx} style={{ height: '24px' }}
                                                            placeholder={`Vehicles #${idx + 1} name`}
                                                            onChange={this.handleDocsImgChange(idx)}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-4 col-lg-4 col-sm-4">
                                                        <button type="button" onClick={this.handleRemoveDocs(idx)} style={{ fontSize: '18px', display: 'inline', marginRight: '10px' }}><i className="fa fa-trash" multiple /></button>
                                                        <button type="button" onClick={this.handleAddDocs(idx)} style={{ fontSize: '18px', display: 'inline' }}><i className="fa fa-plus" multiple /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                <button type="button" style={{ display: 'none' }} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <button type="submit" style={{ marginTop: '20px' }} className="small">{this.props.t('Save_Docs')}</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
export default translate (Docs);