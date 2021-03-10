import React, { Component } from 'react';
import ListOfCompanies from './ListOfCompanies';

class ListOfCompaniesPanel extends Component {
    render() {
        return (
            <div className="panel">
                <div className="panel-heading">
                    <div id="underline" className="row">
                        <div className="col-md-9 col-lg-9 col-sm-9">
                            <div className="panel-body">
                                <br /><p> <h4>List of Companies</h4></p> </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-3">
                            <div className="btn-group pull-right">
                                <button type="button" className="btn glyphicon glyphicon-option-horizontal" data-toggle="modal" data-target="#myModal">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel-body">
                    <ListOfCompanies/>
                    <div className="center-twin-buttons">
                        <button class="black-margin" ><i className="fa fa-copy"> </i> Scan </button>
                        <button class="black-margin" ><i className="fa fa-edit"> </i> Message </button>
                    </div>
<br/>
                    <div className="center-twin-buttons">
                        <button class="red-end-session-button" > End Session <span>00:00:59</span></button>
                    </div>
                </div>
            </div>

        );
    }

}

export default ListOfCompaniesPanel;
