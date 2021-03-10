import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import DropdownVolumetrics from './../../../shared/DropdownVolumetrics';



class Volumetrics extends Component {
    displayName = Volumetrics.name

    render() {
        return (
            <div className="panel main-body-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5">
                            <div className="panel-title black-button">
                                <i className="fa fa-bar-chart"></i>
                                <span className="btn-text">Volumetrics</span>
                            </div>
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
                                            Comparative Study
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/home'}>
                                            Analytics
                                        </Link>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <Link to={'/login'}>
                                            Past Records
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <DropdownVolumetrics/>
                </div>
            </div>
        );
    }
}

export default connect()(Volumetrics);