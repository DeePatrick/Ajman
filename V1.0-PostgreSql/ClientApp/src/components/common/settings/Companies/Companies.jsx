import React, {Component} from 'react';

import CompanyListItem from './CompanyListItem/CompanyListItem';
import CompanyNoDetails from './CompanyNoDetails/CompanyNoDetails';
import CompanyDetails from './CompanyDetails/CompanyDetails';

import './companies.css';

const url = 'http://103.69.38.2:8081/api/aptc_company/getall';

export default class Companies extends Component {
  state = {
    companies:[],
    icon:'fa fa-building',
    companyInView:{
      docType:''
    }

  }

  componentDidMount() {
    fetch(url)
    .then(resp => resp.json())
    .then( data => this.setState({
      companies:data
    }))
    .catch(err => console.log(err));
  }

  renderOnClick(company){
    this.setState({
      companyInView:company
    });
  }

  renderDetails(){
    if (this.state.companyInView.docType === ''){
      return (
        <CompanyNoDetails />
      )
    } else {
      return (
        <CompanyDetails CompanyDetails={this.state.companyInView} />
      )
    }
  }

  render() {
    console.log(this.state.companies);
    return (
      <div className="inner-view companies">
        <div className="container-fluid">

          <div className="row">
              <i className="fa fa-building"></i>
              <h4>COMPANIES</h4>
              <h5>REGISTER NEW COMPANY</h5>
          </div>

          <div className="row">
            <div className="col-lg-5 left">
              <div className="list">
                <ul>
                  {
                    this.state.companies.map(company => {
                      return (
                        <CompanyListItem
                          key={company.Company.keyID}
                          company={company.Company}
                          icon={this.state.icon}
                          renderOnClick={this.renderOnClick.bind(this, company.Company)}
                          onClick={()=> console.log(this.state.companies[0])}
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
      </div>
    )
  }
}
