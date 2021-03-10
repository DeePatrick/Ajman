import React from 'react';

import './locationlistitem.css';

const LocationListItem = (props)=>{
  return (
      <li className="list-item">
        <div className="list-container">
          <i className={props.location.icon}></i>
          <div className="content1">
            {props.location.locationName}
            {props.location.locationAddress}
          </div>
          <button>
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </li>
  )
}

export default LocationListItem;
