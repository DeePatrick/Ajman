import React, { Component } from 'react';
import { connect } from 'react-redux';



class Complaints extends Component{


    render() {
        
        return (
            <div className="panel small-panel-height">{/* panel */}
            <div className="panel-heading">
            <div className="row">
                <div className="col-md-5 col-lg-5 col-sm-5">
                <div className="panel-title black-button"><i className="fa fa-exclamation-circle"></i> <span className="btn-text">Complaints</span> </div>
                
                </div>
                <div className="col-md-7 col-lg-7 col-sm-7">
                
                </div>
            </div>
            <div className="text-center"> <br/>       
                <div className="grey"><h6><p>No complaints made.</p></h6></div>
            </div>


                
            </div><br />{/* panel-heading */}

        </div>         
        );
    }
}
export default connect()(Complaints);