import React, {Component} from 'react';

import EmployeeListItem from './EmployeeListItem/EmployeeListItem';
import ModalRegisterEmployee from './ModalRegisterEmployee/ModalRegisterEmployee';

import './Employees.css';

const url = 'http://103.69.38.2:8081/api/aptc_driver/getall';

export default class Individual extends Component {
  state = {
    individuals:[],
    icon:'fa fa-user-plus',
    individualInView:{
      action:''
    }
  }

  componentDidMount() {
    fetch(url)
    .then(resp => resp.json())
    .then( data => this.setState({
      individuals:data
    }))
    .catch(err => console.log(err));
  }

  renderOnClick(individual){
    this.setState({
      individualInView:individual
    });
  }

  renderDetails(){
    if (this.state.individualInView.action === ''){
      return (
        <div className="individual-result">
          <i className={this.state.icon}></i>
          <p>Please select an individual</p>
        </div>
      );
    } else {
      return (
        <div className="individual-result-details">
          <div className="headline">
            <i className={this.state.icon}></i>
            <h4>{this.state.individualInView.nameEN}</h4>
          </div>
          <div className="body">
            <p>Permit number: {this.state.individualInView.permitNumber}</p>
            <p>Vehicle type: {this.state.individualInView.vehicleType}</p>
            <br />
            <p>Issue date: {this.state.individualInView.licenseIssueDate}</p>
            <p>Expiry date: {this.state.individualInView.licenseExpiryDate}</p>
          </div>
          <button><i className="fa fa-pencil"></i>Edit Details</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="inner-view individual">
        <div className="container-fluid">

          <div className="row">
              <i className={this.state.icon}></i>
              <h4>INDIVIDUAL</h4>
              <button className="register-employee-button" data-toggle="modal" data-target="#ModalRegisterEmployee">REGISTER NEW EMPLOYEE</button>
          </div>

          <div className="row">
            <div className="col-lg-5 left">
              <div className="list">
                <ul>
                  {
                    this.state.individuals.map(individual => {
                      return (
                        <EmployeeListItem
                          key={individual.Driver.id}
                          individual={individual}
                          icon={this.state.icon}
                          renderOnClick={this.renderOnClick.bind(this, individual.Driver)}
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
        <div class="modal fade" id="ModalRegisterEmployee" tabindex="-1" role="dialog" aria-labelledby="registerEmployee" aria-hidden="true">
          <ModalRegisterEmployee icon={this.state.icon} />
        </div>

      </div>
    )
  }
}
