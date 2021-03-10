import React, {Component} from 'react';

import './ModalRegisterVehicle.css';

export default class ModalRegisterVehicle extends Component {
  render() {
    return (
      <div className="ModalRegisterVehicle">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" id="close-modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <input className="col-lg-12" type="text" placeholder="Plate Source" />
                  <input className="col-lg-12" type="text" placeholder="Plate Category" />
                  <input className="col-lg-12" type="text" placeholder="Plate Code" />
                  <input className="col-lg-12" type="text" placeholder="Plate Number" />
                  <input className="col-lg-12" type="text" placeholder="Vehicle Owner" />
                  <input className="col-lg-12" type="text" placeholder="Vehicle Comments" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
                    <button type="button" id="save-changes" className="btn btn-standard-gold save-changes">SEND REQUEST</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
