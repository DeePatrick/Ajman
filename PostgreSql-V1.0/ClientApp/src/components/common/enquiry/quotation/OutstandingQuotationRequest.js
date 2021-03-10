import React, { Component } from 'react';
import * as config from './../../../../config';
import { Animated } from "react-animated-css";

class OutstandingViolation extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            custList: [],
            loading: true,
            singleCus: [],
            search: '',
            searchGender: '',
            searchRegion: ''
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/comments")
            //fetch(config.webApiUrl() + "/aptc_incdnt/getall")
            .then(response => response.json())
            .then(data => {
                this.setState({ custList: data, loading: false });
            });
    }

    handleClick(index) {
        this.setState({ singleCus: index });
    }

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }


    // Returns the HTML table to the render() method.
    renderVehicleList(custList) {
        let filteredCustomers = custList.filter((cus) => {
            return cus
                .body
                .toLowerCase()
                .indexOf(this.state.search) !== -1;
        });

        return (
            <div>
                <Animated className="search-input-height" animationIn="bounceIn" animationOut="fadeOut" isVisible>
                    <div className="panel panel-default search-input-wrapper">
                        <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "panel-body search-input" : "panel-body search-input rtl-flip"}>
                            <input
                                type="text"
                                className="form-search-admin"
                                placeholder="Search Quotation Requests..."
                                value={this.state.search}
                                onChange={this
                                    .updatesearch
                                    .bind(this)} />

                            <span className="btn-search-edit">
                                <button type="button">
                                    <i className="glyphicon glyphicon-search btn-search" />
                                </button>
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "rtl-flip"}>
                        Outstanding Quotation Requests
                                    </div>
                    <div className="list-body-padding">
                        <div className="container-fluid">
                            {filteredCustomers.map((cus, index) =>
                                (<div className="row" key={index}>
                                    <div className="col-md-1 col-lg-1 col-sm-2 col-xs-3">
                                        <span
                                            onClick={this
                                                .handleClick
                                                .bind(this, cus)}>
                                            <i id="" className="far fa-file-alt circle-red" />
                                        </span>

                                    </div>

                                    <div className="col-md-11 col-lg-11 col-sm-10 col-xs-9 ">
                                        <div tabIndex="0" id="profile"
                                            className="speech-bubble-left-black">
                                            <span
                                                onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}
                                                className="pull-right">
                                                <i id="scaled-arrow" className="fa fa-arrow-right" />
                                            </span>
                                            <span className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "text-truncate-big pull-left rtl-flip"}
                                                onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}>{cus.email}<br />{cus.body}
                                                <br />
                                            </span>
                                        </div>
                                    </div>
                                    <br />
                                </div>))}
                        </div>
                    </div>
                </Animated>
            </div>
        );
    }

    render() {
        let filteredCustomers = this
            .state
            .custList
            .filter((cus) => {
                return cus
                    .body
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1
            });

        let contents = this.state.loading
            ? (<p className={(localStorage.getItem('selectedLanguageCode') == 1) ? "" : "pull-left rtl-flip"}>
                <img
                    src={require('../../../../assets/Gear-1s-200px.gif')}
                    height="35"
                    width="35"
                    alt="woman" />
                <em>Loading...</em>
            </p>)
            : this.renderVehicleList(filteredCustomers);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >
        );
    }
}



export default OutstandingViolation;