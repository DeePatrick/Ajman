import React, { Component } from 'react';
import { connect } from 'react-redux';



class ListOfCompanies extends Component {
    displayName = ListOfCompanies.name

    constructor(props) {
        super(props);
        this.state = { 
            comList: [], 
            loading: true, 
            singleCom:[] 
        };

        this.handleClick = this.handleClick

        fetch('http://103.69.38.2:8081/api/aptc_company/getall')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    comList: data,
                    loading: false
                });
            });
    }

    handleClick(index) {
        console.log('this click', index)
        this.setState({
            singleCom: index
        });
      }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCompanyTable(this.state.comList);

        return (
            <content>  
                    {contents}                  
            </content>
        );
    }

    // Returns the HTML table to the render() method.
    renderCompanyTable(comList) {
        return <div>
            <ul className="company-logo">
                {comList.map((comp, index) =>
                    <li key={index}>
                        <span onClick={ this.handleClick.bind(this, comp) }><i id="companylogo" className="fas fa-building"></i>{comp.Company.fullName.ar_SA}</span>
                    </li>
                )}
            </ul>
        </div>;
    }
}

export default connect()(ListOfCompanies);
