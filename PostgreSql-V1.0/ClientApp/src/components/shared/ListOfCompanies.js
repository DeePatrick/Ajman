import React, { Component } from 'react';
import * as config from '../../config';



class ListOfCompanies extends Component {
    displayName = ListOfCompanies.name

    constructor(props) {
        super(props);
        this.state = {
            comList: [],
            individualid: '',
            loading: true,
            singleCom: []
        };


        this.handleClick = this
            .handleClick
            .bind(this);

    }

    componentWillReceiveProps(nextProps) {
        fetch(config.webApiUrl() + 'aptc_individual_getCompanys/' + localStorage.getItem('selectedLanguageCode') + '/' + nextProps.individualid)
            .then(response => response.json())
            .then(data => {
                this.setState({ comList: data });
            }).catch((error) => {
                this.setState({ loading: false });
                if (error.response !== undefined) {
                    this.setState({ loading: false });
                    alert(error.response.data.ResponseMessage);
                }
                else {
                    alert(error.message);
                }
            });
        //fetch(config.webApiUrl() + 'aptc_individual_getCompanys/' + localStorage.getItem('selectedLanguageCode') + '/' + this.state.individualid)
        //    .then(response => response.json())
        //    .then(data => {
        //        debugger;
        //        this.setState({
        //            comList: data,
        //            loading: false
        //        });
        //    });
    }
    handleClick(index) {
        console.log('this click', index);
        this.setState({
            singleCom: index
        });
    }


    render() {
        let contents = this.state.loading
            ? ""
            : this.renderCompanyTable(this.state.comList);

        return (
            <content>
                {contents}
            </content>
        );
    }

    // Returns the HTML table to the render() method.
    renderCompanyTable(comList) {
        if (comList.lenght === 0) {
            return <div>
                <ul className="company-logo" style={{ height: '200px', overflow: 'scroll' }} >
                    <li>
                        <span style={{ color: 'red' }}>
                            record not found!.
                        </span>
                    </li>
                </ul>
            </div>;
        }
        else {
            return <div>
                <ul className="company-logo" style={{ height: '200px', overflow: 'scroll' }} >
                    {comList.slice(0, 10).map((comp, index) =>
                        <li key={index}>
                            <span onClick={this.handleClick.bind(this, comp)}><i id="companylogo" className="fas fa-building"></i>{comp.nameen}{comp.namear}</span>
                        </li>
                    )}
                </ul>
            </div>;
        }

    }
}

export default ListOfCompanies;
