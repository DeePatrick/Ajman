import React from 'react';

import './vehiclelistitem.css';

const VehicleListItem = (props)=>{
  return (
    <li className="list-item" onClick={props.renderOnClick}>
      <div className="list-container">
        <i className={props.icon}></i>
        <div className="content">
          {props.vehicle.trafficNum} - {props.vehicle.makeModel} {props.vehicle.yearManufacture}
        </div>
        <button>
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </li>
  )
}

export default VehicleListItem;
