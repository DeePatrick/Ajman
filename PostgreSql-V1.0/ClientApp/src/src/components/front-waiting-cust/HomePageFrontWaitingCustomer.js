import React, { Component } from 'react';
import Carousel from './../fines/Carousel';
import ListOfCompaniesPanel from './../shared/ListOfCompaniesPanel';


class HomePageFrontWaitingCustomer extends Component {
    displayName = HomePageFrontWaitingCustomer.name

    constructor() {
        super();

        this.state = {
            customers: [],
            loading: true
        };

        fetch('api/customers/8')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers: data, loading: false
                });
            });
    }


    static renderPicture(customers) {
        return (
            <div>
                <br />
                <div>
                    <div>
                        <img src={customers.photo} height="100" width="100" className="img-circle" alt="woman" />
                    </div>         <br />
                    <div>{customers.name} {customers.surname}</div>
                </div>


                {/* {customers.map(customer =>
                    <div key={customer.id} >
                        <div>
                            <img src={customer.photo} height="100" width="100" className="img-circle" alt="woman" />
                        </div>         <br />
                        <div>{customer.name} {customer.surname}</div>
                    </div>
                )} */}
            </div>

        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : HomePageFrontWaitingCustomer.renderPicture(this.state.customers);


        return (
            <div className="home-component">
                <div>
                    <div className="row">
                        <div className="col col-md-offset-1 col-lg-2  col-md-3 ">
                            {contents}
                            <br />
                            <div>
                                <button class="black-margin"  ><i className="fa fa-edit"> </i> Edit details </button>
                                <br /><br />
                            </div>

                        </div>

                        <div className="col col-lg-8 col-md-6 ">
                            <h4>Movers Dubai - Outstanding Fines</h4>
                            <hr /><br />
                            <div className="col-md-offset-2 col-lg-offset-2 ">
                                <Carousel />
                            </div>

                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="row">
                        <div className="col-lg-3  col-md-3 ">
                            <ListOfCompaniesPanel />
                        </div>

                        <div className="col-lg-9 col-md-9">
                            <div className="panel">{/* panel */}
                                <div className="panel-heading">
                                    <div className="row">

                                        <div className="panel-title">
                                            <div className="panel-body">
                                                <div className="centered">
                                                    <i id="blacken" className="fa fa-exclamation-circle" />
                                                    <div className="text-center">Please select an option above to see details</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-lg-7 col-sm-7" />
                                       
                                    </div>
                                    <div className="text-center"> <br />
                                    </div>
                                </div><br />{/* panel-heading */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HomePageFrontWaitingCustomer;
