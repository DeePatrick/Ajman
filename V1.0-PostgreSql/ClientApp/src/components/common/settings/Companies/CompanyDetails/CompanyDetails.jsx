import React, {Component} from 'react';

import ModalVehicles from '../ModalVehicles/ModalVehicles';

import './CompanyDetails.css';

export default class CompanyDetails extends Component {
  render() {
    return (
      <div className="company-result-details">
        <div className="headline">
          <i className={this.props.icon}></i>
          <h4>{this.props.CompanyDetails.fullName.ar_SA}</h4>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-6">
              <p>Address</p>
              <p>{this.props.CompanyDetails.address.city} / {this.props.CompanyDetails.address.country}</p>
              <p>{this.props.CompanyDetails.address.state} - {this.props.CompanyDetails.address.zip}</p>
              <br />
              <p>Mobile: {this.props.CompanyDetails.mobNum.countryCodeM} / {this.props.CompanyDetails.mobNum.numM}</p>
              <p>Landline: {this.props.CompanyDetails.telNum.countryCodeT} / {this.props.CompanyDetails.telNum.numT}</p>
              <p>Email: {this.props.CompanyDetails.email}</p>
              <p>Website: {this.props.CompanyDetails.website}</p>

            </div>
            <div className="col-md-6">
              <p><a href="#">Roles</a></p>
              <p><a href="#">No. of fines</a></p>
              <br />
              <p>
                <a href="#" data-toggle="modal" data-target="#exampleModal">
                  Number of vehicles
                </a>
              </p>
              <p><a href="#">Documents</a></p>
            </div>
          </div>

        </div>
        <button><i className="fa fa-pencil"></i>Edit Details</button>
        <div>
          <ModalVehicles Vehicles={this.props.CompanyDetails.vehicles} />
        </div>
      </div>
    )
  }
}
