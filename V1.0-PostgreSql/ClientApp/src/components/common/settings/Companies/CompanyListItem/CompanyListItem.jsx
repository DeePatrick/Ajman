import React from 'react';

import './companylistitem.css';

const Company = (props) => {
  return (
    <li className="list-item" onClick={props.renderOnClick}>
      <div className="list-container">
        <i className={props.icon}></i>
        <div className="content">
          {props.company.fullName.ar_SA}
        </div>
        <button>
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </li>
  )
}

export default Company;
