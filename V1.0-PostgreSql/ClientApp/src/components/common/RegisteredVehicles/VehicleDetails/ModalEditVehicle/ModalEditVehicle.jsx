import React, {Component} from 'react';
import './ModalEditVehicle.css';

export default class ModalEditVehicle extends Component {
  render() {
    return (
      <div className="ModalEditVehicle">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">

              <h6 className="modal-title" ><i className="fa fa-car"></i>{this.props.vehicle.trafficNum} - {this.props.vehicle.makeModel} {this.props.vehicle.yearManufacture}</h6>
              <button type="button" className="close" id="close-modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label className="col-lg-12">Plate Source</label>
                  <input className="col-lg-12" type="text" value="Plate Source" />
                  <label className="col-lg-12">Plate Category</label>
                  <input className="col-lg-12" type="text" value="Plate Category" />
                  <label className="col-lg-12">Plate Code</label>
                  <input className="col-lg-12" type="text" value="Plate Code" />
                  <label className="col-lg-12">Plate Number</label>
                  <input className="col-lg-12" type="text" value="Plate Number" />
                  <label className="col-lg-12">Vehicle Owner</label>
                  <input className="col-lg-12" type="text" value="Vehicle Owner" />
                  <label className="col-lg-12">Vehicle Comments</label>
                  <input className="col-lg-12" type="text" value="Vehicle Comments" />
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label className="col-lg-12">Fuel</label>
                    <input className="col-lg-12" type="text" value="Plate Source" />
                    <label className="col-lg-12">Number of seats</label>
                    <input className="col-lg-12" type="text" value={this.props.vehicle.numSeats} />
                    <label className="col-lg-12">First Reg Date</label>
                    <input className="col-lg-12" type="text" value={this.props.vehicle.firstRegData} />
                    <label className="col-lg-12">Transmission</label>
                    <input className="col-lg-12" type="text" value="Plate Source" />
                    <label className="col-lg-12">Chassis Number</label>
                    <input className="col-lg-12" type="text" value="Plate Source" />
                  </div>
                  <div className="col-lg-6">
                    <label className="col-lg-12">Colour</label>
                    <input className="col-lg-12" type="text" value={this.props.vehicle.colour} />
                    <label className="col-lg-12">Vehicle Type</label>
                    <input className="col-lg-12" type="text" value="Plate Source" />
                    <label className="col-lg-12">Year</label>
                    <input className="col-lg-12" type="text" value="Plate Source" />
                    <label className="col-lg-12">Traffic Number</label>
                    <input className="col-lg-12" type="text" value={this.props.vehicle.trafficNum} />
                    <label className="col-lg-12">Engine Number</label>
                    <input className="col-lg-12" type="text" value={this.props.vehicle.engineNum} />
                  </div>

                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary save-changes">SAVE</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
