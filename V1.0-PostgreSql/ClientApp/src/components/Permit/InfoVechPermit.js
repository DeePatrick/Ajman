import React, { Component } from 'react';
import axios from 'axios';

class InfoVechPermit extends Component {
    displayName = InfoVechPermit.name

    constructor(props) {
        super(props);
        this.state = {


            vehModList: [],
            myVehList: [],
            docOutId: "",
            docType: "",
            lang: "en_US",
            version: 1,
            dateTime: "",
            status: false,

            indivID: "",
            vehID: "",
            compID: "",

            keyID: '',
            engineNum: "",
            numSeats: "",
            trafficNum: "",
            firstRegData: "",
            yearManufacture: "",
            makeModel: "",
            colour: "",
            vehType: "",
            fuelType: "",
            transType: "",
            vehValid: true,
            disabledFriendly: true,
            vehPlate: {}

        };

        this.onChange = this
            .onChange
            .bind(this);

    }

    componentDidMount() {
        var _id = this.props.vehID
        fetch('http://103.69.38.2:8081/api/aptc_vehicle/' + _id)
            .then(response => response.json())
            .then(data => {
                this.setState({ myVehList: data, loading: false });
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            docOutId: nextProps.docOutId,
            vehID: nextProps.vehID
        });
     
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        console.log(this.state.myVehList);
        return (
            <div id="close">
                <div
                    className="modal"
                    id="vehInfoModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="vehInfoModalLabel">
                    <div id="close" className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">


                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <span className="modal-title" id="editModalLabel">
                                    <i id="black-onModal" className="fas fa-car" /> &nbsp; Edit Details
                                {this.state.vehID}
                                </span>

                                <hr />


                            </div>
                            <div className="modal-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoVechPermit;
