import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

class Docs extends Component {
  displayName = Docs.name;
  constructor(props) {
    super(props);

    this.handleSave = this
      .handleSave
      .bind(this);

    this.state = {
      docType: "DocType_1",
      docRef: "docRef_1",
      metaData: {
        docClass: "docClass_1",
        docType: "docType_1",
        lang: "EN",
        version: "1",
        dateTime: "2018=-0-06 5:00:0000",
        status: "Active",
        validFrom: "2018-09-10",
        validTo: "2028-09-09",
        rejReas: "rejReas_1",
        indivID: "indivID_1",
        vehID: "",
        compID: ""
      },
      docContent: {
        field: "field_1",
        content: "content_1"
      },
      docFormat: "docFormat_1",
      docImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…Tab/qIwa20JmeX7uDoMCliK3UZzEqDLZ9x5mLHQP9SjT/2Q=="
    };

    this.handleSubmit = this
      .handleSubmit
      .bind(this);

    fetch("https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a" +
          "07d9df033b451/CountryCodes.json")
      .then(response => response.json())
      .then(data => {
        this.setState({countryCodes: data, loading: false});
      });

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      docType: nextProps.docType,
      docRef: nextProps.docRef,
      metaData: nextProps.metaData,
      docContent: nextProps.docContent,
      docFormat: nextProps.docFormat,
      docImage: nextProps.docImage
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //{/* name onchange methods  */}//
  onChangeEnName = (e) => {
    let name = Object.assign({}, this.state.name);
    name.en_US = e.target.value;
    this.setState({name});
  }

  onChangeArName = (e) => {
    let name = Object.assign({}, this.state.name);
    name.ar_SA = e.target.value;
    this.setState({name});
  };
  //{/* Address onchange methods  */}//

  onChangeAddressBldgNum = (e) => {
    let address = Object.assign({}, this.state.address);
    address.bldgNum = e.target.value;
    this.setState({address});
  };

  onChangeAddressFlatNum = (e) => {
    let address = Object.assign({}, this.state.address);
    address.flatNum = e.target.value;
    this.setState({address});
  };

  onChangeAddressStreet = (e) => {
    let address = Object.assign({}, this.state.address);
    address.street = e.target.value;
    this.setState({address});
  };

  onChangeAddressCity = (e) => {
    let address = Object.assign({}, this.state.address);
    address.city = e.target.value;
    this.setState({address});
  };

  onChangeAddressArea = (e) => {
    let address = Object.assign({}, this.state.address);
    address.area = e.target.value;
    this.setState({address});
  };

  onChangeAddressState = (e) => {
    let address = Object.assign({}, this.state.address);
    address.state = e.target.value;
    this.setState({address});
  };

  //{/* TelNum onchange methods  */}//
  onChangeTelNumCountryCode = (e) => {
    let telNum = Object.assign({}, this.state.telNum);
    telNum.countryCodeT = e.target.value;
    this.setState({telNum});
  };

  onChangeTelNumNum = (e) => {
    let telNum = Object.assign({}, this.state.telNum);
    telNum.numT = e.target.value;
    this.setState({telNum});
  };

  onChangeTelNumArea = (e) => {
    let telNum = Object.assign({}, this.state.telNum);
    telNum.areaT = e.target.value;
    this.setState({telNum});
  };

  handleSave() {
    const item = this.state;
    this
      .props
      .saveModalDetails(item);
  }

  fileSelectedHandler(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({docImage: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}


  handleSubmit(e) {
    e.preventDefault();

    const user = JSON.stringify(this.state);
    console.log(user);

    axios
      .put('http://103.69.38.2:8081/api/aptc_company', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch((error) => {
        console.log("axios error:", error);
      })
      .then(this.closePopUp = () => {
        document
          .getElementById("hidePopUpBtn")
          .click();
      })
      .then(alert("Form saved!"))
      .then($('modal').close);

  }
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="attachModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="attachModalLabel">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="attachModalLabel">
                  <i className="glyphicon glyphicon-edit"></i>
                  &nbsp; Edit Image Details</h4>
                <hr/>
              </div>

              <form name="form" onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="form-group">
                      <div className='row'>
                        <div className='col-md-4 col-lg-5 col-sm-4'></div>
                        <div className='col-md-4 col-lg-3 col-sm-4'>
                          <span className='pics'>&nbsp;&nbsp;&nbsp;
                            <img
                              id="icon-pics"
                              src={!this.state.docImage
                              ? require('../../../assets/user-img.png')
                              : this.state.docImage}
                              className="img-circle"
                              alt="woman"
                              height="120"
                              width="120"/>
                          </span>
                          <span>
                            <input
                              type="file"
                              alt="photo"
                              onChange={this
                              .fileSelectedHandler
                              .bind(this)}/>
                          </span>
                        </div>
                        <div className='col-md-4 col-lg-4 col-sm-4'></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                      <label>Doc Type</label>
                      <input
                        name="docType"
                        value={this.state.docType}
                        onChange={(e) => this.onChange(e)}
                        type="text"
                        className="edit-form"
                        placeholder="e.g CR070617YU"/>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-6">
                      <label>Doc Reference</label>
                      <input
                        name="docRef"
                        value={this.state.docRef}
                        onChange={(e) => this.onChange(e)}
                        type="text"
                        className="edit-form"
                        placeholder="Emirates"/>
                    </div>
                  </div>

                

                  <div className="form-group">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <label htmlFor="email">docContent</label>
                      <input
                        name="email"
                        autoFocus
                        value={this.state.docContent}
                        onChange={(e) => this.onChange(e)}
                        type="text"
                        className="edit-form"
                        placeholder="docContent"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                      <label>docFormat</label>
                      <input
                        name="docFormat"
                        value={this.state.docFormat}
                        onChange={(e) => this.onChange(e)}
                        type="text"
                        className="edit-form"/>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-6">
                      <label>docImage</label>
                      <input
                        name="docImage"
                        value={this.state.docImage}
                        onChange={(e) => this.onChange(e)}
                        type="text"
                        className="edit-form"
                        placeholder="Emirates"/>
                    </div>
                  </div>

                  <br/><br/>

                </div>
                <div className="modal-footer">
                  <button
                    id="hidePopUpBtn"
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal">Close</button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                    this.handleSave()
                  }}>Save changes</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Docs;