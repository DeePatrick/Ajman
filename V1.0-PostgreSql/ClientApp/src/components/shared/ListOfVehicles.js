import React, {Component} from 'react';
import {connect} from 'react-redux';

class ListOfVehicles extends Component {
    displayName = ListOfVehicles.name

    constructor(props) {
        super(props);

        this.state = {
            vecList: [],
            loading: true,
            singleVec: []
        };

        this.handleClick = this.handleClick;

        fetch('http://103.69.38.2:8081/api/aptc_vehicle/getall')
            .then(response => response.json())
            .then(data => {
                this.setState({vecList: data, loading: false});
            });

    }

    handleClick(index) {
        console.log('this click', index);
        this.setState({singleVec: index});

    }

    render() {
        let contents = this.state.loading
            ? <p>
                    <em>Loading...</em>
                </p>
            : this.renderVehicleList(this.state.vecList);

        return (
            <div className="panel">{/* panel */}
                <div className="panel-body">
                    <div>
                        {contents}</div>
                </div>
            </div>

        );
    }

    // Returns the HTML table to the render() method.
    renderVehicleList(vecList) {
        return (
            <div id="forced-scroll">
                <div className="">
                <br/>
                    {vecList.map((vec, index) => <div className="row" key={index}>
                        <div className="col-lg-offset-1  col-md-offset-1 col-md-2 col-lg-2 col-sm-1 col-xs-1">

                            <span className='pics'>
                                <i id="icon-ticket-alt-black" className="fa fa-ticket-alt"></i>
                            </span>

                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-10 col-xs-10 ">
                            <div tabindex="0" id="profile" className="speech-bubble-left-black">
                                <span
                                    onClick={this
                                    .handleClick
                                    .bind(this, vec)}>{vec.Vehicle.trafficNum} {vec.Vehicle.makeModel}
                                    {vec.Vehicle.modelYear}</span>
                                <span
                                    className="pull-right"
                                    data-toggle="modal"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    data-target="#myModal">
                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                </span>
                            </div>
                            <div
                                className="modal fade"
                                id="myModal"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h4 class="modal-title" id="myModalLabel">
                                                <i className="glyphicon glyphicon-search"></i>
                                                &nbsp;&nbsp; Search for a Individual</h4>
                                        </div>

                                        <div className="panel panel-default main-body-height">
                                            <div><br/></div>
                                            {this.state.singleVec.Vehicle !== undefined && <div>
                                                <br/>
                                                <div>
                                                    <div id="normal" className='col-md-2 col-sm-2'>
                                                        &nbsp;
                                                        <img
                                                            src={this.state.singleVec.Vehicle.photo}
                                                            className="img-circle"
                                                            alt="woman"
                                                            width="100"/>
                                                    </div>

                                                    <div className="col-md-10 col-sm-10 ">
                                                        <h3>{this.state.singleVec.Vehicle.ownerName}
                                                        </h3><br/>

                                                        <br/>

                                                        <h5>{this.state.singleVec.Vehicle.vehicletype}</h5>
                                                        <br/> {this.state.singleVec.Vehicle.photo}
                                                        <br/>

                                                        <h5>{this.state.singleVec.make} {this.state.singleVec.Vehicle.model}
                                                            {this.state.singleVec.Vehicle.modelYear}</h5>
                                                        <br/> {this.state.singleVec.Vehicle.colour}
                                                        <br/> {this.state.singleVec.Vehicle.registration}
                                                        <div className="colour">
                                                            <button className="black-margin">
                                                                <i className="fa fa-edit"></i>
                                                                &nbsp; Edit details
                                                            </button>
                                                            <button className="black-margin">
                                                                <i className="fa fa-envelope"></i>
                                                                &nbsp; Message
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br/>
                    </div>)}

                </div>

            </div>

        );
    }

}

export default connect()(ListOfVehicles);