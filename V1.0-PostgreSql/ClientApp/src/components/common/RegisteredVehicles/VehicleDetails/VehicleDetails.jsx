import React, {Component} from 'react';

import ModalEditVehicle from './ModalEditVehicle/ModalEditVehicle';

import './VehicleDetails.css'

export default class VehicleDetails extends Component {
  render() {
    return (
      <div className="vehicle-result-details">
        <div className="headline">
          <i className={this.props.icon}></i>
          <h4>{this.props.vehicle.trafficNum} - {this.props.vehicle.makeModel} {this.props.vehicle.yearManufacture}</h4>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-lg-6">
              <p>Plate Number: {this.props.vehicle.trafficNum}</p>
              <p>Fuel: {this.props.vehicle.fuelType}</p>
              <br /><br />
              <p>Number of seats: {this.props.vehicle.numSeats}</p>
              <br /><br />
              <p>Transmission: {this.props.vehicle.transType}</p>
            </div>
            <div className="col-lg-6">
              <p>Colour: {this.props.vehicle.colour}</p>
              <p>Vehicle Type: {this.props.vehicle.vehType}</p>
              <br /><br />
              <p>Year: {this.props.vehicle.yearManufacture}</p>
              <p>Engine Number: {this.props.vehicle.engineNum}</p>
            </div>
          </div>
          <p>Engine number: {this.props.vehicle.engineNumber}</p>
          <br />
          <p>Vehicle Colour: {this.props.vehicle.colour}</p>
          <p>Year: {this.props.vehicle.yearManufacture}</p>
        </div>
        <button data-toggle="modal" data-target="#ModalEditVehicle"><i className="fa fa-pencil"></i>Edit Details</button>

        {/* Modal Edit Vehicle */}

        <div class="modal fade" id="ModalEditVehicle" tabindex="-1" role="dialog" aria-labelledby="editVehicle" aria-hidden="true">
          <ModalEditVehicle vehicle={this.props.vehicle}/>
        </div>
      </div>
    )
  }
}
