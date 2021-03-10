import React, {Component} from 'react';
import { connect } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'google-map-react'
import GMap from './map/GMap';

class Location extends Component {
    displayName = Location.name

    constructor(props) {
        super(props);
        this.state = {
            requiredItem: 0,
            currentPage: 0,
            pageLimit: 0,
            name: '',
            offset: 0,
            custList: [],
            vecList: [],
            currentDrivers: [],
            loading: true,
            singleCus: [],
            search: '',
            searchGender: '',
            searchRegion: '',
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            isMarkerShown: false
        };
        var temp = [];
        fetch('http://103.69.38.2:8081/api/aptc_individual/')
            .then(response => response.json())
            .then(data => {
                temp = data;
                this.setState({vecList:data, loading: false});
            });
        //this.setState({ custList: temp, loading: false });
    }
    componentWillUpdate() {
        this.getGeoLocation()
    }

    componentDidMount() {
        this.delayedShowMarker()
    }
    onPageChanged = data => {
        const { vecList } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        this.setState({ currentPage, pageLimit });
        if (vecList.StatusCode !== '404') {
            const currentDrivers = vecList.slice(offset, offset + pageLimit);
            this.setState({ currentPage, currentDrivers, totalPages });
        }

    }
    handleClick(index) {
        this.setState({singleCus: index});
        console.log(index);
    }

    updatesearch(event) {
        this.setState({
            search: event
                .target
                .value
                .substring(0,5)
        });
    }

    updatesearchGender(event) {
        this.setState({
            searchGender: event
                .target
                .value
                .substring(0, 5)
        });
    }
    updatesearchRegion(event) {
        this.setState({
            searchRegion: event
                .target
                .value
                .substring(0, 5)
        });
    }
    replaceModalItem = (index, action) => {
        if (action === 'edit') {
            this.setState({ isEditOpen: true });
        }
        if (action === 'add') {
            this.setState({ isAddOpen: true });
        }
        var indx = 0;
        var vec = {};
        if (this.state.currentPage > 1) {
            indx = index + this.state.pageLimit * (this.state.currentPage - 1);
            this.setState({ requiredItem: indx });
            vec = this.state.vecList[indx];
            this.setState({ vec: vec });
        }
        else {
            vec = this.state.vecList[index];
            this.setState({ vec: vec });
            this.setState({ requiredItem: index });
        }
    };

    

    delayedShowMarker = () => {
        setTimeout(() => {
            this.getGeoLocation()
            this.setState({ isMarkerShown: true })
        }, 5000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    debugger;
                    console.log(position.coords);
                    this.setState(prevState => ({currentLatLng: {...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    }

    render() {
       
        let contents = this.state.loading
            ? <p>
                    <img
                        src={require('../../../assets/Gear-1s-200px.gif')}
                        height="35"
                        width="35"
                        alt="woman"/>
                    <em>Loading...</em>
                </p>
            : this.renderVehicleList(this.state.vecList);

        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>
        );
    }

    // Returns the HTML table to the render() method.
    renderVehicleList(custList) {
        const { currentDrivers, currentPage, totalPages} = this.state;
        const totalDrivers = custList.length;
        if (totalDrivers === 0)
            return null;
        const { showing } = this.state;
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.vecList[requiredItem];
        let filteredCustomers = this.state.currentDrivers.filter((cus) => {
            return cus
                .address
                .city
                .toLowerCase()
                .indexOf(this.state.search) !== -1 || cus
                .address
                .city
                .toLowerCase()
                .indexOf(this.state.search) !== -1;
        });

        //let filteredCustomerGender = filteredCustomers.filter((cus) => {
        //    return cus
        //        .address
        //        .zip
        //        .indexOf(this.state.searchGender) !== -1
        //});

        //let filteredCustomerRegion = filteredCustomerGender.filter((cus) => {
        //    return cus
        //        .address
        //        .state
        //        .toLowerCase()
        //        .indexOf(this.state.searchRegion) !== -1 || cus
        //        .region
        //        .toUpperCase()
        //        .indexOf(this.state.searchRegion) !== -1
        //});
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div>
                                    <input
                                        type="text"
                                        className="form-control-search"
                                        placeholder="Search ..."
                                        value={this.state.search}
                                        onChange={this
                                        .updatesearch
                                        .bind(this)}/>

                                    <span className="btn-search-edit">
                                        <button type="button">
                                            <i className="glyphicon glyphicon-search btn-search"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="leftborder"
                                            data-toggle="modal"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            data-target="#myModal">
                                            <span className="glyphicon glyphicon-menu-down"></span>
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div
                                            className="modal fade"
                                            id="myModal"
                                            tabIndex="-1"
                                            role="dialog"
                                            aria-labelledby="myModalLabel">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                        <h4 className="modal-title" id="myModalLabel">
                                                            <i className="glyphicon glyphicon-search"></i>
                                                            &nbsp;&nbsp; Search for a Individual</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control-search2"
                                                                placeholder="Search Gender 'm' or 'f'"
                                                                value={this.state.searchGender}
                                                                onChange={this
                                                                .updatesearchGender
                                                                .bind(this)}/>
                                                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                                                            <input
                                                                type="text"
                                                                className="form-control-search2"
                                                                placeholder="Search Region"
                                                                value={this.state.searchRegion}
                                                                onChange={this
                                                                .updatesearchRegion
                                                                .bind(this)}/>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="container-fluid">
                                                                    <br /> {filteredCustomers.map(cus => <div className="row" key={cus.id}>
                                                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                            <span className='pics'>
                                                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker"></i>
                                                                            </span>

                                                                        </div>

                                                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                            <div className="well well-sm" style={{ cursor: 'pointer' }}>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>{cus.name} {cus.surname}
                                                                                </span>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}
                                                                                    className="pull-right">
                                                                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                                                </span>

                                                                            </div>
                                                                        </div>
                                                                        <br/>
                                                                    </div>)}
                                                                </div>
                                                                
                                                            </div>
                                                            <div className="col-md-6 co-lg-6">
                                                                <div className="container-fluid">
                                                                    <br /> {filteredCustomers.map(cus => <div className="row" key={cus.id}>
                                                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                                                            <span className='pics'>
                                                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker"></i>
                                                                            </span>

                                                                        </div>

                                                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                                                            <div className="well well-sm" style={{ cursor: 'pointer' }}>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}>{cus.name} {cus.surname}
                                                                                </span>
                                                                                <span
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={this
                                                                                    .handleClick
                                                                                    .bind(this, cus)}
                                                                                    className="pull-right">
                                                                                    <i id="scaled-arrow" className="fa fa-long-arrow-right"></i>
                                                                                </span>

                                                                            </div>
                                                                        </div>
                                                                        <br/>
                                                                    </div>)}
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>

                            </div>
                        </div>
                        <br/>
                        <div className="panel panel-default">
                            <div className="panel panel-body full-height">
                                <h4>&nbsp;&nbsp;Search Result</h4>
                                <br/>
                                <div className="container-fluid">
                                    {filteredCustomers.map((cus, index) => <div className="row" key={index}>
                                        <div className="col-md-2 col-lg-2 col-sm-1 col-xs-1">

                                            <span className='pics'>
                                                <i id="icon-exclamation-circle-gold" className="fa fa-map-marker"></i>
                                            </span>

                                        </div>

                                        <div className="col-md-10 col-lg-10 col-sm-11 col-xs-11 ">
                                            <div className="speech-bubble-left">
                                                <span
                                                    onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}>{cus.address.city} {cus.address.country}
                                                </span>
                                                <span
                                                    onClick={this
                                                    .handleClick
                                                    .bind(this, cus)}
                                                    className="pull-right">
                                                    <i id="scaled-arrow" className="fa fa-arrow-right"></i>
                                                </span>

                                            </div>
                                        </div>
                                        <br/>
                                    </div>)}
                                    
                                </div>
                                <div className="movein">
                                    <div>
                                        <h4>
                                            <strong >{totalDrivers}</strong>{" "}
                                            User entries
                                                    </h4>
                                        {currentPage && (
                                            <span>
                                                Page &nbsp;
                                                            <span className="font-weight-bold">{currentPage}</span>
                                                /{" "}
                                                <span className="font-weight-bold">{totalPages}</span>
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Pagination
                                            totalRecords={totalDrivers}
                                            pageLimit={5}
                                            pageNeighbours={1}
                                            onPageChanged={this
                                                .onPageChanged
                                                .bind(this)} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                       
                    </div>
                   
                    <div className="col-md-9 col-lg-9 col-sm-12">
                        <div className="container-fluid ">
                            <div>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <br />
                                        <iframe
                                            iframe-has-title="map of Ajman"
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115327.94894716372!2d55.490699!3d25.404864!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5809fee07e23%3A0x2f9a01599a6ee2db!2sAl+Jerf+21+-+Delhi+-+United+Arab+Emirates!5e0!3m2!1sen!2suk!4v1528027288241"
                                            width="100%"
                                            height="450"
                                            frameBorder="0"
                                            title="This is a unique title"
                                            allowFullScreen></iframe>
                                    </div>
                                </div>

                                <br/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default connect()(Location);