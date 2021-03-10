import React, {Component} from 'react';
//import { Link } from 'react-router-dom';

class PermitDetails extends Component {
    displayName = PermitDetails.name

    constructor() {
        super();

        this.state = {
            customers: [],
            loading: true
        };

        fetch('/api/customers/8')
            .then(response => response.json())
            .then(data => {
                this.setState({customers: data, loading: false});
            })
            .catch();
    }

    static renderEmployeeTable(customers) {
        return (
            <div className="panel panel-default main-body-height">
                <div><br/></div>
                <div className="panel-body ">
                    <br/>
                    <div>
                        <div className='col-md-2 col-sm-2 right-border'>
                            <span className='pics'>
                                <i id="icon-ticket-alt-old-big" className="fa fa-ticket-alt"></i>
                            </span>

                        </div>

                        <div className="col-md-10 col-sm-10 ">
                            <h3>KG05 LHX - Nissan Micra K12 2005-2010</h3><br/>
                            Permit: Valid from 01/05/2018 - Valid to 01/01/2020

                            <br/>
                            <h5>Vehicle Registrar:</h5>
                            <br/>
                            <div>
                                <img src={customers.photo} className="img-circle" alt="woman" width="52"/>
                            </div>
                            <br/>

                            <div className="bubble-move-up">
                                <div className="bubble-move-left">
                                    <div className="speech-bubble-top-small  col-md-2 col-lg-2 col-sm-2">
                                        {customers.name}
                                        {customers.surname}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="colour">
                                <button className="black-margin">
                                    <i className="fa fa-taxi"></i>
                                    &nbsp; Vehicle Info</button>
                                <button className="black-margin">
                                    <i className="fa fa-retweet"></i>
                                    &nbsp; Renew Permit
                                </button>
                                <button className="black-margin">
                                    <i className="fa fa-envelope"></i>
                                    &nbsp; Message
                                </button>
                                <button className="black-margin">
                                    <i className="fa fa-phone"></i>
                                    &nbsp; Call
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p>
                    <em>Loading...</em>
                </p>
            : PermitDetails.renderEmployeeTable(this.state.customers);

        return (
            <div>
                <div className="container-fluid ">
                    <div>
                        {contents}
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
export default PermitDetails;
