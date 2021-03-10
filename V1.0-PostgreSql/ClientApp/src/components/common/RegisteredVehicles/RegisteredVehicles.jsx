import React, {Component} from 'react';

import VehicleListItem from './VehicleListItem/VehicleListItem';
import VehicleNoDetails from './VehicleNoDetails/VehicleNoDetails';
import VehicleDetails from './VehicleDetails/VehicleDetails';
import ModalRegisterVehicle from './ModalRegisterVehicle/ModalRegisterVehicle';

import './RegisteredVehicles.css';

const url = 'http://103.69.38.2:8081/api/aptc_vehicle';

export default class Register extends Component {
  state = {
    vehicles:[],
    icon:'fa fa-car',
    vehicleInView:{
      action:''
    }
  }

  componentDidMount() {
    fetch(url)
    .then(resp => resp.json())
    .then( data =>
      this.setState({
      vehicles:data
    })
  )
    .catch(err => console.log(err));
  }

  renderOnClick(vehicle){
    this.setState({
      vehicleInView:vehicle
    });
  }

  renderDetails(){
    if (this.state.vehicleInView.action === ''){
      return (
        <VehicleNoDetails icon={this.state.icon} />
      );
    } else {
      return (
        <VehicleDetails
          icon={this.state.icon}
          vehicle={this.state.vehicleInView}
        />
      )
    }
  }

  render() {
    console.log(this.state.vehicles);
    return (
      <div className="inner-view register">
        <div className="container-fluid">

          <div className="row">
              <i className="fa fa-car"></i>
              <h4>REGISTERED VEHICLES</h4>
              <button className="register-vehicle-button" data-toggle="modal" data-target="#ModalRegisterNewVehicle">REGISTER NEW VEHICLE</button>
          </div>

          <div className="row">
            <div className="col-lg-5 left">
              <div className="list">
                <ul>
                  {
                    this.state.vehicles.map(vehicle => {
                      return (
                        <VehicleListItem
                          key={vehicle.keyID}
                          vehicle={vehicle}
                          icon={this.state.icon}
                          renderOnClick={this.renderOnClick.bind(this, vehicle)}
                         />
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-7 right">
              {this.renderDetails()}
            </div>
          </div>

        </div>
        {/* Modal Register New Vehicle */}
        <div class="modal fade" id="ModalRegisterNewVehicle" tabindex="-1" role="dialog" aria-labelledby="registerNewVehicle" aria-hidden="true">
          <ModalRegisterVehicle />
        </div>
      </div>

    );
  }
}
