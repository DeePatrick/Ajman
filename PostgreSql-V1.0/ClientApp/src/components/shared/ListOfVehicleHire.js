import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as config from '../../config';


class ListOfVehicleHire extends Component {
    constructor(props) {
        super(props);


        this.state = { vecList: [], loading: true, singleVec: [] };

        this.handleClick = this.handleClick;

        fetch(config.webApiUrl() + 'aptc_vehicle/' + localStorage.getItem('selectedLanguageCode'))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    vecList: data,
                    loading: false
                });
            });
    }

    handleClick(index) {
        console.log('this click', index);
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
                {vecList.slice(0, 3).map(vec =>
                    <div className="row" key={vec.id}>
                        <div className="col-md-2 col-lg-1 col-sm-4 col-xs-2">
                            <span className='pics' style={{ paddingLeft: '10px', display: 'block', paddingTop: '10px'}}>
                                <i id="" className="fas fa-car icon-exclamation-circle-gold-small" onClick={this.handleClick.bind(this, vec)} />
                            </span>
                        </div>
                        <div className="col-md-10 col-lg-11 col-sm-8 col-xs-10 car-track-list">
                            <div className="speech-bubble-left-black-colour">
                                <span onClick={this.handleClick.bind(this, vec)}>{vec.trafficfilenumber} - {vec.make} {vec.model}</span>
                            </div>
                        </div>
                        <br />
                    </div>
                )}
            </div>


        );
    }


}


export default ListOfVehicleHire;