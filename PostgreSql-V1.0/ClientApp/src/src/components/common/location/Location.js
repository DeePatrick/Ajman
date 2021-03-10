import React, {Component} from 'react';
import * as config from './../../../config';

class Location extends Component {
    displayName = Location.name

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            custList: [],
            loading: true,
            singleCus: [],
            search: '',
            searchGender: '',
            searchRegion: ''
        };

        fetch(config.webApiUrl() + '/aptc_company/')
            .then(response => response.json())
            .then(data => {
                this.setState({custList: data, loading: false});
            });
    }

    handleClick(index) {
        this.setState({singleCus: index});
        console.log(index);
    }

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    updatesearchGender(event) {
        this.setState({
            searchGender: event
                .target
                .value
                .substring(0, 10)
        });
    }
    updatesearchRegion(event) {
        this.setState({
            searchRegion: event
                .target
                .value
                .substring(0, 10)
        });
    }

    render() {
        let filteredCustomers = this
            .state
            .custList
            .filter((cus) => {
                return cus
                    .address
                    .city
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1 || cus
                    .address
                    .city
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1;
            });

        let contents = this.state.loading
            ? (<p>
                    <img
                        src={require('../../../assets/Gear-1s-200px.gif')}
                        height="35"
                        width="35"
                        alt="woman"/>
                    <em>Loading...</em>
                </p>)
            : this.renderVehicleList(filteredCustomers);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>
        );
    }

    // Returns the HTML table to the render() method.
    renderVehicleList(custList) {
        let filteredCustomers = this.state.custList.filter((cus) => {
            return cus
                .address
                .city
                .toLowerCase()
                .indexOf(this.state.search) !== -1 || cus
                .address
                .city
                .toLowerCase()
                .indexOf(this.state.search) !== -1;
        });

        let filteredCustomerGender = filteredCustomers.filter((cus) => {
            return cus
                .address
                .area
                .indexOf(this.state.searchGender) !== -1
        });

        let filteredCustomerRegion = filteredCustomerGender.filter((cus) => {
            return cus
                .address
                .state
                .toLowerCase()
                .indexOf(this.state.searchRegion) !== -1 || cus
                    .region
                    .toUpperCase()
                    .indexOf(this.state.searchRegion) !== -1;
        });
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div>
                                    <input
                                        type="text"
                                        className="form-control-search"
                                        placeholder="Search ..."
                                        value={this.state.search}
                                        onChange={this
                                        .updatesearch
                                        .bind(this)}/>

                                    <span className="btn-search-edit">
                                        <button type="button">
                                            <i className="glyphicon glyphicon-search btn-search" />
                                        </button>
                                        <button
                                            type="button"
                                            className="leftborder"
                                            data-toggle="modal"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            data-target="#myModal">
                                            <span className="glyphicon glyphicon-menu-down" />
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div
                                            className="modal fade"
                                            id="myModal"
                                            tabIndex="-1"
                                            role="dialog"
                                            aria-labelledby="myModalLabel">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        <h4 className="modal-title" id="myModalLabel">
                                                            <i className="glyphicon glyphicon-search" />
                                                            &nbsp;&nbsp; Search for a Individual</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control-search2"
                                                                placeholder="Search Gender 'm' or 'f'"
                                                                value={this.state.searchGender}
                                                                onChange={this
                                                                .updatesearchGender
                                                                .bind(this)}/>
                                                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                                                            <input
                                                                type="text"
                                                                className="form-control-search2"
                                                                placeholder="Search Region"
                                                                value={this.state.searchRegion}
                                                                onChange={this
                                                                .updatesearchRegion
                                                                .bind(this)}/>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="container-fluid">
                                                                    <br/> {filteredCustomerGender.map(cus => <div className="row" key={cus.id}>
                                                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                            <span className='pics'>
                                                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker-alt"></i>
                                                                            </span>

                                                                        </div>

                                                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                            <div className="well well-sm">
                                                                                <span
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>{cus.name.en_US} 
                                                                                </span>
                                                                                <span
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}
                                                                                    className="pull-right">
                                                                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                </span>

                                                                            </div>
                                                                        </div>
                                                                        <br/>
                                                                    </div>)}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 co-lg-6">
                                                                <div className="container-fluid">
                                                                    <br/> {filteredCustomerRegion.map(cus => <div className="row" key={cus.id}>
                                                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                            <span className='pics'>
                                                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker-alt"></i>
                                                                            </span>

                                                                        </div>

                                                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                            <div className="well well-sm">
                                                                                <span
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>{cus.name.en_US} 
                                                                                </span>
                                                                                <span
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}
                                                                                    className="pull-right">
                                                                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                </span>

                                                                            </div>
                                                                        </div>
                                                                        <br/>
                                                                    </div>)}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>

                            </div>
                        </div>
                        <br/>
                        <div className="panel panel-default">
                            <div className="panel panel-body">
                                <h4>&nbsp;&nbsp;Search Result</h4>
                                <br/>
                                <div className="container-fluid">
                                    {filteredCustomers.map((cus, index) => <div className="row" key={index}>
                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                            <span className='pics'>
                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker-alt"></i>
                                            </span>

                                        </div>

                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                            <div className="speech-bubble-left">
                                                <span
                                                    onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}>{cus.address.city} {cus.address.country}
                                                </span>
                                                <span
                                                    onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}
                                                    className="pull-right">
                                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                </span>

                                            </div>
                                        </div>
                                        <br/>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-12">
                        <div className="container-fluid ">
                            <div>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <br/>
                                        <iframe
                                            iframe-has-title="map of Ajman"
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115327.94894716372!2d55.490699!3d25.404864!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5809fee07e23%3A0x2f9a01599a6ee2db!2sAl+Jerf+2+-+Ajman+-+United+Arab+Emirates!5e0!3m2!1sen!2suk!4v1528027288241"
                                            width="100%"
                                            height="450"
                                            frameBorder="0"
                                            title="This is a unique title"
                                            allowFullScreen></iframe>
                                    </div>
                                </div>

                                <br/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Location;