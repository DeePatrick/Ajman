import React, {Component} from 'react';

import './CompanyNoDetails.css';

export default class CompanyNoDetails extends Component {
  render() {
    return (
      <div className="company-result">
        <i className="fa fa-search"></i>
        <p>Please select a company</p>
      </div>
    )
  }
}
