import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';

class AddPartners extends Component {
    displayName = AddPartners.name;
    constructor(props) {
        super(props);
        //this.handleSave = this
        //    .handleSave
        //    .bind(this);
        this.state = {
            docType: "",
            lang: "en_US",
            placeholder:'',
            companyid: 0,
            roleList: [],
            companyownerslist: [
                {
                    emirati: 0,
                    ownerroleid: 0,
                    partnerid: 0,
                    nationalityid: 0,
                    ownerroletypeid: 0,
                    nationality: "",
                    ownernamear: "",
                    ownernameen: ""
                }
            ]
        };

        this.handleOwnershipEmirati = this
            .handleOwnershipEmirati
            .bind(this);
        this.handleOwnerTypeChange = this
            .handleOwnerTypeChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

    }
    componentWillMount() {
    }
    /*Load*/
    componentWillReceiveProps(nextProps) {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            var companyownerslist = [];
            var companyowners = {};
            companyowners.emirati = 0;
            companyowners.ownerroleid = 0;
            companyowners.partnerid = 0;
            companyowners.nationalityid = 0;
            companyowners.ownerroletypeid = 0;
            companyowners.nationality = "";
            companyowners.ownernamear = "";
            companyowners.ownernameen = "";
            companyownerslist.push(companyowners);
            this.setState({ companyownerslist: companyownerslist});
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode'), companyid: nextProps.companyid });
            fetch(config.webApiUrl() + "aptc_getDepartmentRoles/" + localStorage.getItem('selectedLanguageCode') + "/6")
                .then(response => response.json())
                .then(data => {
                    this.setState({ roleList: data });
                });
        }
    }
    /*start  ownership */
    addOwnershipRoles = (e) => {
        e.preventDefault();
        if (this.state.companyownerslist[0]['ownerroleid'] === "") {
            alert('please fill at least one ownership');
        }
        else {
            this.setState((prevState) => ({
                companyownerslist: [
                    ...prevState.companyownerslist, {
                        ownerroleid: 0,
                        partnerid: 0,
                        nationalityid: 0,
                        ownerroletypeid: 0,
                        nationality: "",
                        ownernamear: "",
                        ownernameen: ""
                    }
                ]
            }));
        }
    }
    handleOwnerTypeChange = (e) => {
        let companyownerslist = [...this.state.companyownerslist];
        companyownerslist[e.target.dataset.id]['ownerroletypeid'] = e.target.value;
        this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
        if (e.target.value === '1') {
            this.setState({ placeholder: 'Please enter C R Number' });
        }
        else {
            this.setState({ placeholder: 'Please enter emiratesid' });
        }
    }
    handleOwnershipEmirati = (e) => {
        let companyownerslist = [...this.state.companyownerslist];
        var url = "";
        var check = companyownerslist[e.target.dataset.id]['ownerroletypeid'];
        if (check === '0') {
            alert('please select owner type company or individual');
        }
        else {
            var index = e.target.dataset.id;
            if (check === '1') {
                
                url = "aptc_company_crnum/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value;
            }
            else {
                
                url = "aptc_individual_emiratesid/" + localStorage.getItem('selectedLanguageCode') + "/" + e.target.value;
            }
            fetch(config.webApiUrl() + url)
                .then(response => response.json())
                .then(data => {
                    if (data.StatusCode === "400") {
                        if (check === '1') {
                            alert('company does not exist in our database');
                        }
                        if (check === '2') {
                            alert('user does not exist in our database');
                        }
                    }
                    else {
                        if (check === '1') {
                            companyownerslist[index]['partnerid'] = data.companyid;
                            companyownerslist[index]['ownernamear'] = data.namear.toUpperCase();
                            companyownerslist[index]['ownernameen'] = data.nameen.toUpperCase();
                        }
                        else if (check === '2') {
                            companyownerslist[index]['partnerid'] = data.individualid;
                            companyownerslist[index]['nationalityid'] = data.nationalityid;
                            companyownerslist[index]['nationality'] = !data.nationality ? "" : data.nationality.toUpperCase();
                            companyownerslist[index]['ownernamear'] = !data.namear ? "" : data.namear.toUpperCase();
                            companyownerslist[index]['ownernameen'] = !data.nameen ? "" : data.nameen.toUpperCase();
                        }

                    }
                    this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    alert(error);
                });
        }
        alert(this.state.placeholder);

    }
    handleOwnershipChange = (e) => {

        var className = e.target.className.split(' ')[0];
        if (
            [
                "emirati",
                "ownerroleid",
                "id",
                "partnerid",
                "nationality",
                "nationalityid",
                "ownerroletypeid",
                "ownernamear",
                "ownernameen"
            ].includes(className
            )) {
            let companyownerslist = [...this.state.companyownerslist];
            companyownerslist[e.target.dataset.id][className] = e
                .target
                .value
                .toUpperCase();
            this.setState({
                companyownerslist
            }, () => console.log(this.state.companyownerslist));
        } else {
            this.setState({
                [e.target.name]: e
                    .target
                    .value
                    .toUpperCase()
            });
        }
        var abc = this.state.companyownerslist;

    }
    handleRemoveOwnership = (idx) => () => {
        if (this.state.companyownerslist.length > 1) {
            if (this.state.companyownerslist.length > 0) {
                var companyownerslist = this.state.companyownerslist;
                companyownerslist.pop(idx);
                this.setState({ companyactivitylist: companyownerslist });
            }
        }
    }
    onChangeRoleName(e) {
        let companyownerslist = [...this.state.companyownerslist];
        companyownerslist[e.target.dataset.id]['ownerroleid'] = e.target.value;
        this.setState({ companyownerslist }, () => console.log(this.state.companyownerslist));
    }
    /*end  ownership */
    handleSave() {
        this.props.refreshCompany(this.state.companyid);
    }
    /*Save Partner*/
    handleSubmit(e) {
        e.preventDefault();
        var companyowner = {};
        companyowner.companyid = this.state.companyid;
        companyowner.createdby = this.state.createdby;
        companyowner.companyownerslist = this.state.companyownerslist;
        const companyowners = JSON.stringify(companyowner);
        axios
            .post(config.webApiUrl() + 'aptc_companyowners ', companyowners, {
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
        let { companyownerslist } = this.state;
        return (
            <div
                className="modal"
                id="partnerModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="partnerhModalLabel">
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
                                    {companyownerslist.map((val, idx) => {
                                        let ownerRoleID = `companyownerslist-${idx}`,
                                            idID = `partnerid-${idx}`,
                                            partnerid = `partnerid-${idx}`,
                                            ownerroletypeid = `ownerroletypeid-${idx}`,
                                            ownerNameArID = `ownernamear-${idx}`,
                                            ownerNameEnID = `ownernameen-${idx}`,
                                            nationalityID = `nationalityid-${idx}`,
                                            ownerroleid = `ownerroleid-${idx}`
                                        return (
                                            <div key={idx}>
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group">
                                                            <select
                                                                id={ownerroletypeid}
                                                                data-val="true"
                                                                name={ownerroletypeid}
                                                                data-id={idx}
                                                                value={this.state.companyownerslist[idx].ownerroletypeid}
                                                                onChange={(e) => this.handleOwnerTypeChange(e)}
                                                                className="edit-form"
                                                                required>
                                                                <option key={idx} value="">Owner Role Type</option>
                                                                <option key={idx} value="1">Company</option>
                                                                <option key={idx} value="2">Individual</option>
                                                            </select></div>
                                                        <div className="form-group" style={{ float: 'right', display: 'none' }}>
                                                            <strong> Comapany </strong>  <input type="radio" onChange={this.handleOwnerTypeChange}
                                                                data-id={idx} className="ownerType" value="1"
                                                                name={ownerroletypeid} />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-lg-6 col-sm-6" style={{ float: 'right', display: 'none' }}>
                                                        <div className="form-group" style={{ marginLeft: '15px', marginRight: '5px' }}>
                                                            <strong>Individual</strong>
                                                            <input type="radio" onChange={this.handleOwnerTypeChange} data-id={idx}
                                                                value="2" className="ownerType" name={ownerroletypeid}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerRoleID}
                                                                data-id={idx}
                                                                id={ownerRoleID}
                                                                value={val.ownerRoleID}
                                                                onBlur={this.handleOwnershipEmirati}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                required
                                                                data-message="dsfsdfs"
                                                                className="ownerRoleID edit-form"
                                                                placeholder={this.state.placeholder} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerNameEnID}
                                                                data-id={idx}
                                                                id={ownerNameEnID}
                                                                value={val.ownernameen}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                className="edit-form ownerNameEn"
                                                                placeholder="Name(En)" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 col-sm-6">
                                                        <div className="form-group">
                                                            <input
                                                                name={ownerNameArID}
                                                                data-id={idx}
                                                                id={ownerNameArID}
                                                                value={val.ownernamear}
                                                                onChange={this.handleOwnershipChange}
                                                                className="ownerNameAr edit-form"
                                                                placeholder="Name(Ar)" /></div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <div className="form-group">
                                                            <input
                                                                name={nationalityID}
                                                                data-id={idx}
                                                                id={nationalityID}
                                                                value={val.nationality}
                                                                onChange={this.handleOwnershipChange}
                                                                type="text"
                                                                className="nationality edit-form"
                                                                placeholder="Nationality" /></div>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ display: 'none' }}>
                                                    <div className="col-md-12 col-lg-12 col-sm-12">
                                                        <input
                                                            name={partnerid}
                                                            data-id={idx}
                                                            id={partnerid}
                                                            value={this.state.partnerid}
                                                            onChange={this.handleOwnershipChange}
                                                            type="text"
                                                            className="id edit-form"
                                                            placeholder="ID" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-7 col-lg-7 col-sm-7">
                                                        <div className="form-group">
                                                            <select
                                                                id={ownerroleid}
                                                                data-val="true"
                                                                name={ownerroleid}
                                                                data-id={idx}
                                                                value={this.state.roleList.commonmasterid}
                                                                onChange={(e) => this.onChangeRoleName(e)}
                                                                className="edit-form"
                                                                required>
                                                                {
                                                                    this
                                                                        .state
                                                                        .roleList
                                                                        .map(role => <option key={idx} value={role.roleid}>{role.rolename}</option>)}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-sm-3">
                                                        <div className="col-md-3 col-lg-3 col-sm-3"><button className="btn-delete1" onClick={this.handleRemoveOwnership(idx)} style={{ width: '70px' }}><i className="fa fa-trash" />&nbsp;Delete</button></div>
                                                        <div className="col-md-7 col-lg-7 col-sm-7"><button className="btn-delete" onClick={this.addOwnershipRoles}
                                                            style={{
                                                                width: '200px', marginLeft: '10px'
                                                            }}><i className="fa fa-plus" />&nbsp;Add more partner</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
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
export default AddPartners;