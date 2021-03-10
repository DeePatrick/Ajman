import React, { Component } from 'react';
import * as config from '../../config';



class ListOfCompanies extends Component {
    displayName = ListOfCompanies.name

    constructor(props) {
        super(props);
        this.state = { 
            comList: [], 
            loading: true, 
            singleCom:[] 
        };


        this.handleClick = this
            .handleClick
            .bind(this);

        fetch(config.webApiUrl() + 'aptc_company/' + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    comList: data,
                    loading: false
                });
            });
    }

    handleClick(index) {
        console.log('this click', index);
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
                {comList.slice(0,4).map((comp, index) =>
                    <li key={index}>
                        <span onClick={this.handleClick.bind(this, comp)}><i id="companylogo" className="fas fa-building"></i>{comp.nameen}{comp.namear}</span>
                    </li>
                )}
            </ul>
        </div>;
    }
}

export default ListOfCompanies;
