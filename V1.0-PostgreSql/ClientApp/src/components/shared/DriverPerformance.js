import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';

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

        fetch("http://103.69.38.2:8081/api/aptc_driver/getall")
            .then(response => response.json())
            .then(data => {
                this.setState({allDrivers: data, loading: false});
            });
    }

    onPageChanged = data => {
        const {allDrivers} = this.state;
        const {currentPage, totalPages, pageLimit} = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentDrivers = allDrivers.slice(offset, offset + pageLimit);

        this.setState({currentPage, currentDrivers, totalPages});
    };

    render() {
        const {allDrivers, currentDrivers, currentPage, totalPages} = this.state;

        const totalDrivers = allDrivers.length;

        if (totalDrivers === 0) 
            return null;
        
        return (
            <div className="panel">
                <div className="panel-body">
                    <div className="container-fluid">
                        <div>
                            <h6>Top Overall Performance - Drivers
                            </h6>
                        </div>
                        {currentDrivers.map((cus, index) => <div className="row" key={index}>
                            <div className="col-md-2 col-lg-2 col-sm-4 col-xs-3">
                                <Link to={'/login'}>
                                    <span className='pics'>

                                        <img
                                            id="icon-pics"
                                            src={!cus.Driver.photo
                                            ? 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                            : cus.Driver.photo}
                                            onError={(e) => {
                                            e.target.src = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
                                        }}
                                            className="img-circle"
                                            alt="woman"
                                            height="45"
                                            width="45"/>
                                    </span>
                                </Link>
                            </div>

                            <div className="col-md-10 col-lg-10 col-sm-8 col-xs-9 ">
                                <div id="profile" className="speech-bubble-left-black">
                                    <span>
                                        {cus.Driver.nameAR} &nbsp;&nbsp;
                                        
                                        {cus.Driver.nameEN}
                                    </span>
                                    <Link to={'/drivers'}>
                                        <span className="pull-right">
                                            <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <br/>
                        </div>)}
                        <div>
                            <div>

                                <h4>

                                    <strong >{totalDrivers}</strong>{" "}
                                    Drivers
                                </h4>
                                {currentPage && (
                                    <span>
                                        Page
                                        <span className="font-weight-bold">{currentPage}</span>
                                        /{" "}
                                        <span className="font-weight-bold">{totalPages}</span>
                                    </span>
                                )}
                            </div>
                            <div>
                                <Pagination
                                    totalRecords={totalDrivers}
                                    pageLimit={4}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}/>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        );
    }
}
export default connect()(DriverPerformance);