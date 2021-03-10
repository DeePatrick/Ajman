import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class SearchDetails extends Component {
    displayName = SearchDetails.name

    constructor() {
        super();

        this.state = {
            customers: [],
            loading: true,
            singleCus:[]
        };

        fetch('http://103.69.38.2:8081/api/aptc_driver/getall')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers: data, loading: false
                });
            })
            .catch();
    }

    handleClick(index) {
        console.log('this click', index)
        this.setState({
            singleVec: index
        });
      }


    static renderEmployeeTable(customers) {
        return (
            <div className="panel panel-default main-body-height">
            <div><br/></div>
            <div>
            <br/>
            <div>
                            <div className='col-md-2 col-sm-2 right-border'>
                        <img src={customers.photo} className="img-circle img-responsive" alt="woman" />
                        </div>
                    
                    <div className="col-md-10 col-sm-10 ">
                            <h3>{customers.name}  {customers.surname}</h3><br/>
                            Address
                           <h5><p>{customers.address}</p></h5>
                            <br />
                            <h5>D.O.B</h5>
                            <h5>{customers.dob}</h5>
                            <br />

                            {customers.phone}
                            <br/>
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
            : SearchDetails.renderEmployeeTable(this.state.customers);


        return (
            <div>
                <div className="container-fluid ">
                    <div>
                        {contents}
                        <br />
                    </div>
                </div>


            </div>
        );
    }
}
export default SearchDetails;
