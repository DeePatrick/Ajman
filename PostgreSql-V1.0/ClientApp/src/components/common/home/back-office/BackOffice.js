import React, {Component} from 'react';

class BackOffice extends Component {
    render() {
        return (
            <div className="panel sph">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">

                        
                                <div className="panel-title black-button top-dash-padding">
                                    {/*<i className="fas fa-download"/> */}
                                    <span className="btn-text">Back Office</span>
                                </div>
                       

                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7 col-xs-6"/>
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

export default BackOffice;