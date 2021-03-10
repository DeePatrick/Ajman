import React, { Component } from 'react';
import DriverPerformance from './../../../shared/DriverPerformance';
import {Link} from 'react-router-dom';



class CarTrack extends Component {
    render() {
        return (
            <div className="panel large-panel-height">{/* panel */}
                <div className="panel-heading remove-padding-bottom">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "panel-title rtl-black-button" : "panel-title black-button"}><i className="fa fa-road" /><span className="btn-text">Car Track</span> </div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "btn-group pull-left" : "btn-group pull-right"}>
                                <button
                                    type="button"
                                    className="btn glyphicon glyphicon-option-horizontal"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false" />
                                <ul className="dropdown-menu dropdown-menu2">
                                    <li>
                                        <Link to={'/'}>
                                            Distance travelled
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}>
                                            Average Time taken
                                        </Link>
                                    </li>
                                    <li role="separator" className="divider" />
                                    <li>
                                        <Link to={'/'}>
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

export default CarTrack;