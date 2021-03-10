import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DropdownVolumetrics from './../../../shared/DropdownVolumetrics';



class Volumetrics extends Component {
    displayName = Volumetrics.name

    render() {
        return (
            <div className="panel large-panel-height volumetrics-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "panel-title rtl-black-button" : "panel-title black-button"}>
                                <i className="fa fa-bar-chart" />
                                <span className="btn-text">Volumetrics</span>
                            </div>
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
                                            Comparative Study
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}>
                                            Analytics
                                        </Link>
                                    </li>
                                    <li role="separator" className="divider" />
                                    <li>
                                        <Link to={'/'}>
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

export default Volumetrics;