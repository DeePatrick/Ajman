import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ListOfVehicleRegistered extends Component {
    constructor(props) {
        super(props);

       
        this.state = { vecList: [], loading: true , singleVec:[]};

        this.handleClick = this.handleClick

        fetch('api/Vehicles/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    vecList: data,
                    loading: false
                });
            });
    }

    handleClick(index) {
        console.log('this click', index)
        this.setState({
            singleVec: index
        });
      }

      


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderVehicleList(this.state.vecList);

        return (
            <div className="panel">{/* panel */}
                <div className="panel-body">
                    <div> {contents}</div>
                </div>
            </div>

        );
    }


    // Returns the HTML table to the render() method.
    renderVehicleList(vecList) {
        return (
            <div>
                {vecList.map(vec =>
                    <div className="row" key={vec.id}>
                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">
                       
                                <span className='pics'>
                                    <i id="icon-exclamation-circle-gold" className="fa fa-car"></i>
                                </span>
                         
                        </div>

                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                            <div className="speech-bubble-left">
                                <span onClick={ this.handleClick.bind(this, vec) }>{vec.licensePlate} - {vec.make} {vec.model}</span>
                                    <span className="pull-right"><i id="scaled-arrow" className="fa fa-arrow-right"></i></span>
                            </div>
                        </div>
                        <br />
                    </div>
                )}
            </div>


        );
    }


}


export default connect()(ListOfVehicleRegistered);