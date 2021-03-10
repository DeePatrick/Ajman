import React, {Component} from 'react';

import './VehicleNoDetails.css'

export default class VehicleNoDetails extends Component {
  render() {
    return (
      <div className="vehicle-result">
        <i className={this.props.icon}></i>
        <p>Please select a permit</p>
      </div>
    )
  }
}
