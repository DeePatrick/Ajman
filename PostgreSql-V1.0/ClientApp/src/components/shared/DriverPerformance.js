import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import * as config from './../../config';


class DriverPerformance extends Component {
    displayName = DriverPerformance.name
    constructor() {
        super();

        this.state = {
            allDrivers: [],
            currentDrivers: [],
            loading: true,
            offset: 0
        };

        fetch(config.webApiUrl() + "/aptc_getAllActiveDrivers/" + localStorage.getItem('selectedLanguageCode') + "/" + 15)
            .then(response => response.json())
            .then(data => {
                this.setState({ allDrivers: data, loading: false });
            });
    }

    onPageChanged = data => {
        const { allDrivers } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        var currentDrivers = '';
        if (allDrivers.length > 0) {
            currentDrivers = allDrivers.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }
        
    };

    render() {
        const { allDrivers, currentDrivers, currentPage, totalPages } = this.state;

        const totalDrivers = allDrivers.length;

        if (totalDrivers === 0)
            return null;

        return (
            <div className="">
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="cartrack-subtitle">
                            <h6>Top Overall Performance - Drivers
                            </h6>
                        </div>
                        {currentDrivers.map((cus, index) => <div className="row" key={index}>
                            <div className="col-md-2 col-lg-1 col-sm-1 col-xs-1">
                                <Link to={'/car-track/drivers'}>
                                    <span className='pics'>
                                        <img
                                            id="icon-pics"
                                            src={!cus.profilephoto
                                                ? require('../../assets/user-img.png')
                                                : cus.profilephoto}
                                            onError={(e) => {
                                                e.target.src = require('../../assets/user-img.png')
                                            }}
                                            className="img-circle"
                                            alt="woman"
                                            height="45"
                                            width="45" />
                                    </span>
                                </Link>
                            </div>

                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "col-md-10 col-lg-11 col-sm-11 col-xs-11 car-track-list rtl-flip-bubble" : "col-md-10 col-lg-11 col-sm-11 col-xs-11 car-track-list"}>
                                <div id="profile" className="speech-bubble-left-black">
                                    <span style={{fontSize:'14px'}} className={(localStorage.getItem('selectedLanguageCode') == 2) ? "rtl-flip-bubble pull-left" : ""}>
                                        {cus.namear} &nbsp;&nbsp;
                                        {cus.nameen}
                                    </span>
                                    <Link to={'/car-track/drivers'}>
                                        <span className="pull-right">
                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                </div> 
                            </div>
                        </div>)}

                        <div className="center-pagination">
                            <Pagination
                                totalRecords={totalDrivers}
                                pageLimit={5}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged} />
                        </div>

                    </div>
                </div >
            </div >

        );
    }
}
export default DriverPerformance;