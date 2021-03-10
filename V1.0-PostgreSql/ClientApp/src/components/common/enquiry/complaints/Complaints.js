import React, {Component} from 'react';

class Complaints extends Component {
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
        fetch("http://103.69.38.2:8081/api/aptc_incdnt/getall")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    custList: data,
                    loading: false
                });
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

    render() {

        let filteredCustomers = this
            .state
            .custList
            .filter((cus) => {
                return cus
                    .IncidentMessage.notes
                    .toLowerCase()
                    .indexOf(this.state.search) !== -1
            });

        let contents = this.state.loading
            ? <p>
                <img
                    src={require('../../../../assets/Gear-1s-200px.gif')}
                    height="35"
                    width="35"
                    alt="woman" />
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
            return cus.IncidentMessage.notes.toLowerCase().indexOf(this.state.search) !== -1
        });


        return (
            <div>
                <div>
                    <div>
                        <div className="myfines">
                            <span className="pull-right"><i id="custom-search" className="fa fa-search"></i></span>
                            <span>
                                <input
                                    id="fines"
                                    type="text"
                                    placeholder="Search Complaints.."
                                    value={this.state.search}
                                    onChange={this
                                        .updatesearch
                                        .bind(this)} />
                            </span>
                        </div>
                        <div>
                            <div className="row-text">
                                <div className="container-fluid">
                                    {filteredCustomers.map((cus, index) => <div className="row" key={index}>
                                        <div id="space" className="col-md-1 col-lg-1 col-sm-2 col-xs-3">
                                            <span
                                                className='pics'
                                                onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}>
                                                <i id="circle-red" className="far fa-file-alt"></i>
                                            </span>

                                        </div>

                                        <div className="col-md-11 col-lg-11 col-sm-10 col-xs-9 ">
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
                                                        .bind(this, cus)}>{cus.IncidentMessage.dateTime}<br />{cus.IncidentMessage.notes}
                                                    <br />
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Complaints;