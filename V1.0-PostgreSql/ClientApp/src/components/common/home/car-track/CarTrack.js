import React, { Component } from 'react';
import { connect } from 'react-redux';
import DriverPerformance from './../../../shared/DriverPerformance';
import {Link} from 'react-router-dom';



class CarTrack extends Component {
    render() {
        return (
            <div className="panel main-body-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5">
                            <div className="panel-title black-button"><i className="fa fa-road"></i> <span className="btn-text">Car Track</span> </div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7">
                        <div className="btn-group pull-right">
                                <button
                                    type="button"
                                    className="btn glyphicon glyphicon-option-horizontal"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"></button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={'/home'}>
                                            Distance travelled
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/home'}>
                                            Average Time taken
                                        </Link>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <Link to={'/login'}>
                                            Satisfaction
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <DriverPerformance />
            </div>
        );

    }
}

export default connect()(CarTrack);