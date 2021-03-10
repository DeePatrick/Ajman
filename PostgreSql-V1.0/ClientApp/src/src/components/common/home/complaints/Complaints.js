import React, { Component } from 'react';



class Complaints extends Component {


    render() {

        return (
            <div className="panel small-panel-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "panel-title rtl-black-button" : "panel-title black-button"}><i className="fa fa-exclamation-circle" /> <span className="btn-text">Complaints</span> </div>

                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7 col-xs-6" />

                    </div>
                    <div className="text-center"> <br />
                        <div className="grey"><h6><p>No complaints made.</p></h6></div>
                    </div>



                </div><br />{/* panel-heading */}

            </div>
        );
    }
}
export default Complaints;