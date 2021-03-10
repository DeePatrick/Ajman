import React, {Component} from 'react';

import './ModalRegisterEmployee.css';

export default class ModalRegisterEmployee extends Component {
  render() {
    return (
      <div className="ModalRegisterEmployee">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" id="close-modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-image-section">
                <i className={this.props.icon}></i>
                <button><i className="fa fa-pencil"></i>Upload Image</button>
              </div>
              <form>
                <div className="form-group row">
                  <input className="col-lg-6" type="text" placeholder="Full Name (EN)" />
                  <input className="col-lg-6" type="text" placeholder="Full Name (AR)" />
                  <input className="col-lg-12" type="text" placeholder="Gender" />
                  <input className="col-lg-12" type="text" placeholder="Country" />
                  <input className="col-lg-12" type="text" placeholder="State" />
                  <input className="col-lg-12" type="text" placeholder="Area" />
                  <input className="col-lg-12" type="text" placeholder="Street" />
                  <input className="col-lg-12" type="text" placeholder="Flat Number, Building Number" />
                  <input className="col-lg-6" type="text" placeholder="Email Address" />
                  <input className="col-lg-6" type="text" placeholder="Date of birth" />
                  <div className="col-lg-6">
                    <label className="col-lg-12">Telephone Number</label>
                    <input className="col-lg-4" type="text" placeholder="Country" />
                    <input className="col-lg-4" type="text" placeholder="Area" />
                    <input className="col-lg-4" type="text" placeholder="Number" />
                    <input className="col-lg-12" type="text" placeholder="Language" />
                    <input className="col-lg-12" type="text" placeholder="Nationality" />
                  </div>
                  <div className="col-lg-6">
                    <label className="col-lg-12">Mobile Number</label>
                    <input className="col-lg-4" type="text" placeholder="Country" />
                    <input className="col-lg-4" type="text" placeholder="Area" />
                    <input className="col-lg-4" type="text" placeholder="Number" />
                    <input className="col-lg-12" type="text" placeholder="Marital Status" />
                    <input className="col-lg-12" type="text" placeholder="Religion" />
                  </div>
                  <label className="col-lg-12">Roles</label>
                  <input className="col-lg-12" type="text" placeholder="Link Id" />
                  <input className="col-lg-12" type="text" placeholder="Role Company Name" />
                  <input className="col-lg-12" type="text" placeholder="Role Type" />
                </div>
                <button className="add-another-role"><i className="fa fa-plus"></i> Add another role</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id="save-changes" className="btn btn-primary save-changes">SAVE</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
