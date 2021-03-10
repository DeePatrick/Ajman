import React, { Component } from 'react';
import './OustandingActions.css';
import { Link } from 'react-router-dom';

import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

class OutstandingActions extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel-element-header-container">
                    <strong className="gold-small-header"><i id="icon-small_noborder" class="fa fa-file-text-o"></i><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{this.props.t('OUTSTANDING_ACTIONS')}</span></strong>
                </div>
                <div className="white-panel-container row panel-element-container-row-bottom outstand-panel-action">

                    <div id="OutstandingActionsCarousel" className="carousel slide inner-carousel" data-ride="carousel">

                        <ol className="carousel-indicators">
                            <li data-target="#OutstandingActionsCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#OutstandingActionsCarousel" data-slide-to="1"></li>
                        </ol>

                        <div className="carousel-inner">

                            {/*CAROUSEL SLIDE 1 - START*/}
                            <div class="item active">
                                <div className="row transaction-info-row-container-top align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="green-full-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">GL05GFD - Fined &#163;200</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mr Assad Mamood</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>

                                <div className="row transaction-info-row-container align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="red-full-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">KG05LHX - Permit Rejected &#163;20 per year</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mrs Miriam Kithaia</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>
                                <div className="row transaction-info-row-container align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="yellow-half-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">GL05GFD - Waiting Appeal &#163;200</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mr Assad Mamood</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>

                                <div className="row transaction-info-row-container align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="yellow-half-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">GL05GFD - Waiting Appeal &#163;200</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mr Assad Mamood</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>
                            </div>
                            {/*CAROUSEL SLIDE 1 - END*/}

                            {/*CAROUSEL SLIDE 2 - START*/}
                            <div className="item">
                                <div className="row transaction-info-row-container-top align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="green-full-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">GL05GFD - Fined &#163;200</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mr Assad Mamood</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>

                                <div className="row transaction-info-row-container align-items-center">
                                    <div className="col-lg-2 col-md-2 col-sm-1 col-xs-2 padding-none">
                                        <span className=""><i id="red-full-circle" className="fa fa-file-text-o"></i></span>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-sm-10 col-xs-9">
                                        {/*"Transaction Information" Row - Start*/}
                                        <div className="row">KG05LHX - Permit Rejected &#163;20 per year</div>
                                        {/*"Transaction Information" Row - End*/}
                                        {/*"Information Status" Row - Start*/}
                                        <div className="row">Mrs Miriam Kithaia</div>
                                        <div className="row">Issued on 03/08/2017</div>
                                        {/*"Information Status" Row - End*/}
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 padding-none">
                                        <span className=""><i className="fa fa-arrow-right transactional-arrow"></i></span>
                                    </div>
                                </div>
                            </div>
                            {/*CAROUSEL SLIDE 2 - END*/}

                        </div>
                    </div>
                </div>
                <div className="panel-element-footer-container right">
                    <a href=""><u>See More ></u></a>
                </div>
            </div>
        )
    }
}
export default translate(OutstandingActions); 