import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class BackOffice extends Component {
    render() {
        return (
            <div className="panel small-panel-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5">

                            <Link to={'/back-office/home'}>
                                <div className="panel-title black-button">
                                    <i className="fas fa-download"></i>
                                    <span className="btn-text">Back Office</span>
                                </div>
                            </Link>

                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7"></div>
                    </div>
                    <div className="row">
                        <div className="text-center">
                            <br/>
                            <div className="grey">
                                <h6>Average time to complete tasks at desks</h6>
                            </div>
                            <div className="gold">
                                <strong>3:15</strong>
                            </div>
                        </div>
                    </div>
                </div><br/>{/* panel-heading */}

            </div>
        );
    }
}

export default connect()(BackOffice);