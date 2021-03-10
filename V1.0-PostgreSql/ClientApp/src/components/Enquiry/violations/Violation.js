import React, {Component} from 'react';
import * as config from './../../../config';

class Violations extends Component {
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
        fetch(config.webApiUrl() + "/aptc_incdnt/getall")
            .then(response => response.json())
            .then(data => {
                this.setState({custList: data, loading: false});
            });
    }

    handleClick(index) {
        this.setState({singleCus: index});
    }

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0, 20)
        });
    }

    render() {

        let filteredCustomers = this
            .state
            .custList
            .filter((cus) => {
                return cus
                    .IncidentMessage
                    .notes
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1
            });

        let contents = this.state.loading
            ? <p>
                    <img
                        src={require('../../../assets/Gear-1s-200px.gif')}
                        height="35"
                        width="35"
                        alt="woman"/>
                    <em>Loading...</em>
                </p>
            : this.renderVehicleList(filteredCustomers);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div >
        );
    }

    // Returns the HTML table to the render() method.
    renderVehicleList(custList) {
        let filteredCustomers = custList.filter((cus) => {
            return cus
                .IncidentMessage
                .notes
                .toLowerCase()
                .indexOf(this.state.search) !== -1
        });

        return (
            <div>
                <div>
                    <div>
                        <div className="myfines">
                            <span>
                                <input
                                    id="fines"
                                    type="text"
                                    placeholder="Search Violations..."
                                    value={this.state.search}
                                    onChange={this
                                    .updatesearch
                                    .bind(this)}/>
                            </span>
                        </div>

                        <div>
                            <div>
                                <div className="col-md-6 col-lg-6">
                                    <div className="list-header-padding">
                                        Attended Violations
                                    </div>
                                    <div className="list-body-padding">
                                        <div className="container-fluid">
                                            {filteredCustomers.map((cus, index) => <div className="row" key={index}>
                                                <div id="space" className="col-md-2 col-lg-2 col-sm-2 col-xs-3">
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, cus)}>
                                                        <i id="circle-green" className="far fa-file-alt"></i>
                                                    </span>

                                                </div>

                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-9 ">
                                                    <div tabindex="0" id="profile" className="speech-bubble-left-black">
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}
                                                            className="pull-right">
                                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                        </span>
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}>{cus.IncidentMessage.dateTime}<br/>{cus.IncidentMessage.notes}
                                                            <br/>
                                                        </span>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>)}
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 list-header-padding-left">
                                    <div className="list-header-padding">
                                        Outstanding Violations
                                    </div>
                                    <div className="list-body-padding">
                                        <div className="container-fluid">
                                            {filteredCustomers.map((cus, index) => <div className="row" key={index}>
                                                <div className="col-md-2 col-lg-2 col-sm-2 col-xs-3">
                                                    <span
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this, cus)}>
                                                        <i id="circle-red" className="far fa-file-alt"></i>
                                                    </span>

                                                </div>

                                                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-9 ">
                                                    <div tabindex="0" id="profile" className="speech-bubble-left-black">
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}
                                                            className="pull-right">
                                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                        </span>
                                                        <span
                                                            onClick={this
                                                            .handleClick
                                                            .bind(this, cus)}>{cus.IncidentMessage.dateTime}<br/>{cus.IncidentMessage.notes}
                                                            <br/>
                                                        </span>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Violations;