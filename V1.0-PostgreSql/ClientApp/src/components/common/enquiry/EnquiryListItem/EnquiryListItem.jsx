import React from 'react';

import './enquirylistitem.css';

const EnquiryListItem = (props)=>{
  return (
    <li className="list-item">
      <div className="list-container">
        <i className={props.enquiry.icon}></i>
        <div className="content">
          {props.enquiry.enquiryDetails}
        </div>
        <button>
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </li>
  )
}

export default EnquiryListItem;
