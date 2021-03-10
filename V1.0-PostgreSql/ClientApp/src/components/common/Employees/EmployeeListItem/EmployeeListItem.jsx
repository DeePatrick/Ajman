import React from 'react';

import './EmployeeListItem.css';

const IndividualListItem = (props)=>{
  return (
    <li className="list-item" onClick={props.renderOnClick}>
      <div className="list-container">
        <i className={props.icon}></i>
        <div className="content">
          {props.individual.Driver.nameEN}

        </div>
        <button>
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </li>
  )
}

export default IndividualListItem;
