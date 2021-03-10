import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


class RenewPermit extends Component {
    displayName = RenewPermit.name

    constructor(props) {
        super(props);
        this.state = {
            permitList: [],
            indListPermit: [],
            vehListPermit: [],
            compListPermit: [],

            docOutId: "",
            docType: "",
            lang: "en_US",
            version: 1,
            dateTime: "",
            status: false,
            validFrom: "",
            validTo: "",
            rejReas: "",
            indivID: "",
            vehID: "",
            compID: "",
            docContent: {
                field: "",
                content: ""
            },
            docClass: "",
            docFileList:[],
            docFiles: [
                {
                    docFormat: "jpg",
                    docImage: "c:/tempdata/fake"
                }, {
                    docFormat: "jpg",
                    docImage: "c:/hardcoded data will replace soon"
                }
            ],
            docClassAll: [],
            docTypesAll: []
        };
        this.handleSave = this
            .handleSave
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    componentWillMount() {
        fetch("http://103.69.38.2:8081/api/aptc_getCommonMasters/DocClass")
            .then(response => response.json())
            .then(data => {
                this.setState({ docClassAll: data, loading: false });
            });

        fetch("http://103.69.38.2:8081/api/aptc_getCommonMasters/DocType")
            .then(response => response.json())
            .then(data => {
                this.setState({ docTypesAll: data, loading: false });
            });

        fetch("http://103.69.38.2:8081/api/aptc_getCommonMasters/Permit")
            .then(response => response.json())
            .then(data => {
                this.setState({ permitList: data, loading: false });
            });

        fetch("http://103.69.38.2:8081/api/aptc_vehicle/")
            .then(response => response.json())
            .then(data => {
                this.setState({ vehListPermit: data, loading: false });
            });

        fetch("http://103.69.38.2:8081/api/aptc_individualName")
            .then(response => response.json())
            .then(data => {
                this.setState({ indListPermit: data, loading: false });
            });

        fetch("http://103.69.38.2:8081/api/aptc_companyName")
            .then(response => response.json())
            .then(data => {
                this.setState({ compListPermit: data, loading: false });
            });

        localStorage.getItem('vehicle') && this.setState({
            vecListPermit: JSON.parse(localStorage.getItem('vehicle')),
            isLoading: false
        });

        fetch("http://103.69.38.2:8081/api/aptc_getCommonMasters/Country")
            .then(response => response.json())
            .then(data => {
                this.setState({ countryCodes: data, loading: false });
            });

    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            docOutId: nextProps.docOutId,
            name: nextProps.name,
            docType: nextProps.docType,
            lang: nextProps.lang,
            version: nextProps.version,
            dateTime: nextProps.dateTime,
            status: nextProps.status,
            validFrom: nextProps.validFrom,
            validTo: nextProps.validTo,
            rejReas: nextProps.rejReas,
            indivID: nextProps.indivID,
            vehID: nextProps.vehID,
            compID: nextProps.compID,
            docContent: nextProps.docContent,
            docClass: nextProps.docClass,
            docFile: nextProps.docFile
        });
    }
    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item, 'update');
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


 

    /*Start Docs*/
    handleDocsNameChange = (idx) => (evt) => {
        const newDocFormat = this
            .state
            .docFile
            .map((docFileOne, vidx) => {
                if (idx !== vidx)
                    return docFileOne;
                return {
                    ...docFileOne,
                    docFormat: evt.target.value
                };
            });

        this.setState({ docFile: newDocFormat });
    }

    handleDocsImgChange = (idx) => (event) => {
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var docFile = this.state.docFileList;
            var objFile = {};
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                objFile.docFormat = file.type.split('/')[1];
                objFile.docImage = reader.result;
                docFile.push(objFile);
            };
            reader.onerror = function (error) {
                alert('Error: ', error);
            };
            this.setState({ docFileList: docFile });
        }
    }

    handleAddDocs = () => {
        var files = this.state.docFileList;
        if (this.state.docFileList.length === 0) {
            alert('please upload document');
            return;
        }
        else {
        this.setState({
            docFile: this
                .state
                .docFile
                .concat([
                    {
                        docFormat: "",
                        docImage: ""
                    }
                ])
            });
        }
    };

    handleRemoveDocs = (idx) => () => {
        this.setState({
            docFile: this
                .state
                .docFile
                .filter((v, vidx) => idx !== vidx)
        });
    };

    /*End  Docs*/

    renderOptions(myArray) {
        return myArray.map(item => <option key={item.Code} value={item.Value}>{item.Value}</option>)
    }

    onChangedocType = (e) => {
        this.setState({ docType: e.target.value });
    };

    onChangedocClass = (e) => {
        this.setState({ docClass: e.target.value });
    };

    individualChange = (e) => {
        this.setState({ indivID: e.target.value });
    };

    vehicleChange = (e) => {
        this.setState({ vehID: e.target.value });
    };

    companyChange = (e) => {
        this.setState({ compID: e.target.value });
    };



    fileSelectedHandler(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {

                let docFile = Object.assign({}, this.state.docFile);
                docFile.docImage = e.target.result;
                this.setState({ docFile });
            };

            reader.readAsDataURL(event.target.files[0]);

        }
    }

    onChangevecListPermit = (e) => {
        this.setState({ franchise: e.target.value });
    };

    handleFranchiseChange = (e) => {
        this.setState({ franchise: e.target.value });
    };

    fuelTypeChange = (e) => {
        this.setState({ fuelType: e.target.value });
    };

    vehTypeChange = (e) => {
        this.setState({ vehType: e.target.value });
    };

    handleIdChange = (e) => {
        this.setState({ trafficNum: e.target.value });
        let keyID = this.state.trafficNum;
        this.setState({ keyID: keyID });
    };

    handleSubmit(e) {
        e.preventDefault();
        var obj = {};
        obj.docType = this.state.docType;
        obj.lang = 'en_US';
        obj.version = this.state.version;
        obj.validFrom = this.state.validFrom;
        obj.validTo = this.state.validTo;
        obj.indivID = this.state.indivID;
        obj.vehID = this.state.vehID;
        obj.compID = this.state.compID;
        obj.docClass = this.state.docClass;
        obj.docFile = this.state.docFileList;
        const doc = JSON.stringify(obj);
        console.log(doc);
        debugger;
        var _id;
        _id = this.state.docOutId;
        var url = 'http://103.69.38.2:8081/api/aptc_docOut/' + _id;
        axios
            .put(url, doc, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                alert(res.data.ResponseMessage);
                this.handleSave();
                $('.close').click();
            })
            .catch((error) => {
                this.setState({ loading: false });
                if (error.response.data !== undefined) {
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }

            })
            //.catch((error) => {
            //    console.log("axios error:", error);
            //})
            //.then(alert("Permit form has be editted successfully!"))
            //.then(this.closePopUp = () => {
            //    document
            //        .getElementById("hidePopUpBtn")
            //        .click();
            //});
    }

    render() {

        const today = new Date();
        today.setDate(today.getDate() + 1);

        return (
            <div id="close">
                <div
                    className="modal"
                    id="renewModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="renewModalLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>

                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Search Vehicles</label>
                                        <select
                                            data-val="true"
                                            value={this.state.vehID}
                                            onChange={(e) => this.vehicleChange(e)}
                                            className="edit-form "
                                            required>
                                            <option value="">Vehicle Reg No.</option>
                                            {this
                                                .state
                                                .vehListPermit
                                                .map((vehList, index) => <option key={index} value={vehList.keyID}>{vehList.trafficNum}&nbsp;{vehList.makeModel} &nbsp;{vehList.yearManufacture}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Doc Class</label>
                                        <select
                                            name="docClass"
                                            data-val="true"
                                            value={this.state.docClass}
                                            onChange={(e) => this.onChangedocClass(e)}
                                            className="edit-form"
                                            required>
                                            <option value="">Doc Classification</option>
                                            {this
                                                .state
                                                .docClassAll
                                                .map((docClassOne, index) => <option key={index} value={docClassOne.Code}>{docClassOne.Value}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Permit Type</label>
                                        <select
                                            name="docType"
                                            data-val="true"
                                            value={this.state.docType}
                                            onChange={(e) => this.onChangedocType(e)}
                                            className="edit-form"
                                            required>
                                            <option value="">Permit Type</option>
                                            {this
                                                .state
                                                .permitList
                                                .map((permit, index) => <option key={index} value={permit.Code}>{permit.Value}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Valid From</label>
                                            <input id="datefield" 
                                                name="validFrom"
                                                onChange={this.onChange}
                                                value={this.state.validFrom}
                                                type="date"
                                                className="edit-form"
                                                placeholder="Valid From"
                                                minDate={today}
                                                required />
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Valid To</label>
                                            <input
                                                name="validTo"
                                                onChange={this.onChange}
                                                value={this.state.validTo}
                                                type="date"
                                                className="edit-form"
                                                placeholder="Valid To"
                                                minDate={this.state.validFrom}
                                                required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Search Individual</label>
                                        <select
                                            data-val="true"
                                            value={this.state.indivID}
                                            onChange={(e) => this.individualChange(e)}
                                            className="edit-form "
                                            required>
                                            <option value="">Permit Owner</option>
                                            {this
                                                .state
                                                .indListPermit
                                                .map((indList, index) => <option key={index} value={indList.keyID}>{indList.fullName.en_US}</option>)}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="documents">Upload Documents</label>&nbsp; {this
                                            .state
                                            .docFiles
                                            .map((docFile, idx) => (
                                                <div className="shareholder" key={idx}>
                                                    <input
                                                        type="file"
                                                        alt="doc"
                                                        placeholder={`Vehicles #${idx + 1} name`}
                                                        onChange={this.handleDocsImgChange(idx)} />

                                                    <button type="button" onClick={this.handleRemoveDocs(idx)} className="small">-</button>
                                                </div>
                                            ))}
                                        <button type="button" onClick={this.handleAddDocs} className="small">Add Documents</button>
                                    </div>

                                    <br /><br /><br /><br /><br />

                                    <div className="form-group">
                                        <label>Pay for Permit - (30 AED)</label>
                                        <input
                                            name="cardNumber"
                                            maxLength="14"
                                            onChange={this.onChange}
                                            value={this.state.cardNumber}
                                            type="text"
                                            className="edit-form"
                                            placeholder="Card Number" />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Start date</label>
                                            <input
                                                name="startDate"
                                                onChange={this.onChange}
                                                value={this.state.startDate}
                                                type="date"
                                                className="edit-form"
                                                placeholder="Start date" />
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>End date</label>
                                            <input
                                                name="endDate"
                                                onChange={this.onChange}
                                                value={this.state.endDate}
                                                type="date"
                                                className="edit-form"
                                                placeholder="End date" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>CSV(3 last digits at the back of the card)</label>
                                            <input
                                                name="CSV"
                                                maxLength="3"
                                                onChange={this.onChange}
                                                value={this.state.CSV}
                                                type="text"
                                                className="edit-form"
                                                placeholder="Start date" />
                                        </div>

                                        <div className="col-md-6 col-lg-6 col-sm-6">
                                            <label>Name on the card</label>
                                            <input
                                                name="nameOnCard"
                                                maxLength="23"
                                                onChange={this.onChange}
                                                value={this.state.nameOnCard}
                                                type="text"
                                                className="edit-form"
                                                placeholder="Name on card" />
                                        </div>
                                    </div>

                                </div>

                                <div className="center">
                                    <button
                                        id="hidePopUpBtn"
                                        type="button"
                                        className="btn btn-blank"
                                        data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                                <br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RenewPermit;
