import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchDetails from '../shared/SearchResults';
import SearchBar from '../shared/SearchBar';


class HomePageFranchise extends Component {
    displayName = HomePageFranchise.name

    constructor() {
        super();

        this.state = {
            customers: [],
            loading: true
        };

        fetch('/api/customers/8')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers: data, loading: false
                });
            })
            .catch();
    }



    static renderEmployeeTable(customers) {
        return (
            <div className="panel panel-default full-height">
                <div className="panel-body">
                    <br />
                    <div>
                        <div className='col-md-2 col-sm-2 right-border'>
                            <img src={customers.photo} className="img-circle img-responsive" alt="woman" />
                        </div>

                        <div className="col-md-10 col-sm-10 ">
                            <h4>{customers.name}  {customers.surname}</h4><br />
                            Address
                           <h5><p>{customers.address}</p></h5>
                            <br />
                            <h5>D.O.B</h5>
                            <h5>{customers.dob}</h5>
                            <br />

                            {customers.phone}
                            <br />
                            <div>
                                <button className="black-margin"  ><i className="fa fa-edit"> </i> Edit details </button>
                                <button className="black-margin"  ><i className="fa fa-edit"> </i> Message </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : HomePageFranchise.renderEmployeeTable(this.state.customers);


        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-12">
                        <SearchBar /><br />
                        <div className="panel panel-default">

                            <div className="panel search-height">
                                <h4>		&nbsp;	&nbsp;&nbsp; Search Result</h4>
                                <br />
                                <SearchDetails />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-12">

                        <div className="container-fluid ">






                            <div className="panel-header">
                                <div>
                                    {contents}
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default connect()(HomePageFranchise);
