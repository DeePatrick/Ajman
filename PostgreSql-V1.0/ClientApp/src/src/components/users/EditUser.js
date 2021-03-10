import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import * as config from '../../config';


class EditUser extends Component {

    displayName = EditUser.name;
    constructor(props) {
        super(props);

        this.handleSave = this
            .handleSave
            .bind(this);

        var today = new Date(), passsetdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            showing: false,
            changerole: false,
            username: "",
            emailid: "",
            mobilecountry: 971,
            mobilearea: 0,
            mobilenumber: 0,
            password: "",
            confirmpassword: "",
            prevpass: "",
            passsetdate: passsetdate,
            userphoto: "",
            userrolelist: [
                {
                    roleid: 18,
                    isprimary: true
                },
                {
                    roleid: 12,
                    isprimary: false
                }
            ],

            fireRedirect: false,
            areaCodes: [],
            roleList: [],
            roleList2: [],
            departmentList: [],
            tempstate: '',
            department: 1,
            department2: 2,
            roleid: 1,
            roleid2: 1,
            rolename: 0,
            secondaryrolename: 0,
            secondaryroleid:0
        };



        this.onChange = this
            .onChange
            .bind(this);



        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.docInSubmit = this
            .docInSubmit
            .bind(this);

        fetch(config.webApiUrl() + "aptc_getCountryStates/" + localStorage.getItem('selectedLanguageCode') + "/" + 169)
            .then(response => response.json())
            .then(data => {
                this.setState({ areaCodes: data, loading: false });
            });


        fetch(config.webApiUrl() + "aptc_getCommonMasters/"+ localStorage.getItem('selectedLanguageCode') + "/" + 3)
            .then(response => response.json())
            .then(data => {
                this.setState({ comTypeList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/"+ localStorage.getItem('selectedLanguageCode') + "/" + 6)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data, loading: false });
            });

        fetch(config.webApiUrl() + "aptc_getDepartments/" + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({ departmentList: data, loading: false });
            });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userid: nextProps.userid,
            username: nextProps.username,
            emailid: nextProps.emailid,
            mobilearea: nextProps.mobilearea,
            mobilecountry: nextProps.mobilecountry,
            mobilenumber: nextProps.mobilenumber,
            statusid: nextProps.statusid,
            status: nextProps.status,
            password: nextProps.password,
            confirmpassword: nextProps.confirmpassword,
            prevpass: nextProps.prevpass,
            passsetdate: nextProps.passsetdate,
            userphoto: nextProps.userphoto,
            rolename: nextProps.rolename,
            secondaryroleid: nextProps.secondaryroleid,
            secondaryrolename: nextProps.secondaryrolename
        });

    }



    handleRoleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleDeptChange = (e) => {
        let selectedvalue = e.target.value;
        this.setState({ department: selectedvalue });

        let _id = selectedvalue;
        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/"+ localStorage.getItem('selectedLanguageCode') + "/" + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList: data, loading: false });
            });
    }


    handleDeptChange2 = (e) => {
        let selectedvalue = e.target.value;
        this.setState({ department2: selectedvalue });

        let _id = selectedvalue;

        fetch(config.webApiUrl() + "aptc_getDepartmentRoles/"+ localStorage.getItem('selectedLanguageCode') + "/" +  _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ roleList2: data, loading: false });
            });
    }
    fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ userphoto: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    telephoneareaChange = (e) => {
        this.setState({ mobilearea: e.target.value });
    }

    handleSave = () => {
        const item = this.state;
        this.props.saveModalDetails(item, 'add');
    }

    toggleHideRoles = (e) => {
        e.preventDefault();
        let showing = true;
        this.setState({ showing: showing });
        this.setState({ changerole: true });

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    handleSave() {
        const item = this.state;
        this
            .props
            .saveModalDetails(item);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        if (this.state.password !== this.state.confirmpassword) {
            alert('Your password and confirmation password do not match.');
        }
        else {
            var objUser = {};
            //objUser.usertype = "user";
            objUser.userid = this.state.userid;
            objUser.username = this.state.username;
            objUser.emailid = this.state.emailid;
            objUser.mobilecountry = parseInt(971);
            objUser.mobilearea = this.state.mobilearea;
            objUser.mobilenumber = this.state.mobilenumber;
            objUser.password = this.state.password;
            objUser.confirmpassword = this.state.confirmpassword;
            objUser.prevpass = this.state.prevpass;
            if (this.state.passsetdate) {
                objUser.passsetdate = this.state.passsetdate;
            }
            else {
                var today = new Date();
                var passsetdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                objUser.passsetdate = passsetdate.toString();
            }

            objUser.userphoto = this.state.userphoto;

            var role1 = {};
            if (this.state.changerole) {
                role1.roleid = parseInt(this.state.roleid);
                role1.isprimary = true;
            }
            else {
                role1.roleid = parseInt(this.state.roleid);
                role1.isprimary = true;
            }
            var role2 = {};
            if (this.state.changerole) {
                role2.roleid = parseInt(this.state.roleid2);
                role2.isprimary = false;
            }
            else {
                role2.roleid = parseInt(this.state.secondaryroleid);
                role2.isprimary = false;
            }
            var arrayRoles = [];
            arrayRoles.push(role1);
            arrayRoles.push(role2);
            objUser.userrolelist = arrayRoles;
            debugger;
            var user = JSON.stringify(objUser);

            axios
                .put(config.webApiUrl() + 'aptc_user', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    fetch(config.webApiUrl() + 'aptc_user')
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ loading: false });
                            alert(res.data.ResponseMessage);
                             this.handleSave();
                            $('.close').click();
                        });
                })
                .catch((error) => {
                    console.log("axios error:", error);
                })
                .then(alert(this.state.username + " has been saved! "))
                .then(this.closePopUp = () => {
                    document
                        .getElementById("hidePopUpBtn")
                        .click();
                });
        }

    }

    docInSubmit() {

        var abc = this.state;
        if (this.state.password !== this.state.confirmpassword) {
            alert('Your password and confirmation password do not match.');
        }
        else {
            const user = JSON.stringify(this.state);
            axios
                .put(config.webApiUrl() + 'aptc_user', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .catch((error) => {
                    console.log("axios error:", error);
                })
                .then(alert("Ajman staff Saved"));
        }

    }
    render() {
        console.log(this.state.secondaryroleid);
        return (
            <div>
                <div
                    className="modal fade"
                    id="editModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="editModalLabel">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="">
                                        <div className="form-group">
                                            <div className=''>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4 title-image'>
                                                    <span className='pics'>
                                                        <img
                                                            id="icon-pics"
                                                            src={!this.state.userPhoto || this.state.userPhoto === null
                                                                ? require('../../assets/user-img.png')
                                                                : this.state.userPhoto}
                                                            className="img-circle"
                                                            alt="woman"
                                                            height="120"
                                                            width="120" /><br />
                                                    </span>
                                                    <span>
                                                        <input style={{ display: 'none' }} type="file" alt="photo" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput} />
                                                        <button className="button-upload" onClick={(e) => this.fileInput.click(e)}><i className="fas fa-pencil-alt" />&nbsp;Upload Image</button>    <br />
                                                        <br />
                                                    </span>
                                                </div>
                                                <div className='col-md-4 col-lg-4 col-sm-4 col-xs-4' />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label>Name (english)</label>
                                                <input
                                                    name="username"
                                                    value={this.state.username}
                                                    onChange={(e) => this.onChange(e)}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="Name" />
                                            </div>

                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    value={this.state.emailid}
                                                    name="emailid"
                                                    onChange={(e) => this.onChange(e)}
                                                    type="text"
                                                    className="edit-form"
                                                    placeholder="emailid" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">

                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="mobileNumber">Mobile Number</label>
                                                <div>
                                                    <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                        +971
                                                    </div>

                                                    <div className="col-md-5 col-lg-5 col-sm-4 col-xs-4">
                                                        <select
                                                            data-val="true"
                                                            value={this.state.mobilearea}
                                                            onChange={this.telephoneareaChange}
                                                            className="edit-form form-dashboard-control"
                                                            required>
                                                            <option value="">Area</option>
                                                            {this.state.areaCodes.map((a, index) => <option key={index} value={a.stateid}>({a.statename}) &nbsp; {a.areacode}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-5 col-lg-5 col-sm-6 col-xs-6">
                                                        <input type="text"
                                                            className="edit-form" maxLength="10"
                                                            name="mobilenumber" value={this.state.mobilenumber} onChange={(e) => this.onChange(e)}
                                                            onKeyPress="return isNumberKey(event)"
                                                            placeholder="Number" /><br />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <div className="">
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <div className="form-group">

                                                <label htmlFor="password">Current Password</label>
                                                <input
                                                    value={this.state.password}
                                                    name="password"
                                                    onChange={(e) => this.onChange(e)}
                                                    type="password"
                                                    className="edit-form"
                                                    placeholder="Current password" />
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <div className="form-group">

                                                <label htmlFor="password">Confirm Password</label>
                                                <input
                                                    value={this.state.confirmpassword}
                                                    name="confirmpassword"
                                                    onChange={(e) => this.onChange(e)}
                                                    type="password"
                                                    className="edit-form"
                                                    placeholder="password" /><br />
                                            </div>
                                        </div>
                                    </div>

                                    {!this.state.showing ?
                                        <content>

                                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                <label>Current Role(s) : <br /></label>
                                            </div>


                                            <div className="">
                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Primary Role :</label> {this.state.rolename}</div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Secondary Role: </label> {this.state.secondaryrolename ? this.state.secondaryrolename : "No other role for this user"}</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                        <div className="form-group">
                                            <div onClick={this.toggleHideRoles.bind(this)} className="btn btn-default btn-sm pull-left">Change Roles</div><br />
                                        </div>
                                    </div>
                                        </content>
                                        : null}

                                    




                                    {this.state.showing ?
                                        <content>
                                            <div className="">
                                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Primary Role : </label></div></div>
                                            </div>

                                            <div className="">
                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Department</label>
                                                        <select id="list"
                                                            data-val="true"
                                                            value={this.state.department}
                                                            onChange={(e) => this.handleDeptChange(e)}
                                                            className="edit-form "
                                                            required>
                                                            <option value="">Department</option>
                                                            {this
                                                                .state
                                                                .departmentList
                                                                .map((d, index) => <option key={index} value={d.departmentid}>{d.departmentname} </option>)}
                                                        </select>

                                                    </div>
                                                </div>


                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Role</label>
                                                        <select
                                                            data-val="true"
                                                            name="roleid"
                                                            value={this.state.roleid}
                                                            onChange={(e) => this.handleRoleChange(e)}
                                                            className="edit-form ">
                                                            <option value="">Role</option>
                                                            {this
                                                                .state
                                                                .roleList
                                                                .map((r, index) => <option key={index} value={r.roleid}>{r.rolename} </option>)}
                                                        </select><br />
                                                    </div>
                                                </div>


                                            </div>
                                            <br />
                                            <div className="">
                                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                    <label>Other Role : </label>
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">

                                                        <label>Department</label>
                                                        <select
                                                            data-val="true"
                                                            value={this.state.department2}
                                                            onChange={(e) => this.handleDeptChange2(e)}
                                                            className="edit-form "
                                                        >
                                                            <option value="">Department</option>
                                                            {this
                                                                .state
                                                                .departmentList
                                                                .map((d, index) => <option key={index} value={d.departmentid}>{d.departmentname} </option>)}
                                                        </select>

                                                    </div>
                                                </div>


                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div className="form-group">
                                                        <label>Role</label>
                                                        <select
                                                            data-val="true"
                                                            value={this.state.roleid2}
                                                            name="roleid2"
                                                            onChange={this.handleRoleChange}
                                                            className="edit-form ">
                                                            <option value="">Role</option>
                                                            {this
                                                                .state
                                                                .roleList2
                                                                .map((r, index) => <option key={index} value={r.roleid}>{r.rolename} </option>)}
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>
                                        </content>
                                        : null}
                                </div>
                                <div className="center">

                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                                <button
                                    id="bindrole"
                                    type="button"
                                    onClick={(e) => this.binRole(e)}
                                    className="btn btn-blank"
                                >aaa</button>
                                <br /><br />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;