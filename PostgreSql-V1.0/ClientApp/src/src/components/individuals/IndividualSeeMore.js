import React, { Component } from 'react';
import ListOfCompaniesPanel from '../shared/ListOfCompaniesPanel';
import Carousel from '../fines/Carousel';
import * as config from '../../config';


class IndividualSeeMore extends Component {
    displayName = IndividualSeeMore.name

    constructor() {
        super();

        this.state = {
            keyID: '',
            customers: [],
            loading: true
        };

    }

    componentDidMount() {
        this.bindMyCompanies();
    }

    bindMyCompanies() {
        var _id = this.props.location.state.vec.individualid;
        var profilephoto = this.props.location.state.vec.profilephoto;

        this.setState({
            individualid: _id, profilephoto: profilephoto
        });

        console.log(_id);
        const url = config.webApiUrl() + "aptc_employee/" + localStorage.getItem('selectedLanguageCode') + "/" + _id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 403 || data.StatusCode === 404 || data.StatusCode !== undefined) {
                    var msg = "";
                }
                else {
                    this.setState({ vecList: data, loading: false, cRNumID: _id });
                }
            });
    }




    render() {

        let contents = "";
        if (this.state.loading === false) {
            contents = (
                <div className="fixed-search" style={{ position: 'inherit', backgroundColor: 'rgba(235, 225, 211, 0.1)', padding: '26px 30px 20px 30px' }}>
                    <div className="row">
                        <div className="col col-md-offset-1 col-lg-2  col-md-3 ">

                            <div>
                                <img src={!this.props.location.state.vec.profilephoto
                                    ? require('../../assets/companylogos/norecord.png')
                                    : this.props.location.state.vec.profilephoto} height="100" width="100" className="img-circle" alt="woman" />
                            </div>         <br />
                            <div>{this.props.location.state.vec.nameen}</div>
                            <br />
                            <div>
                                <button className="black-margin"><i className="fa fa-edit" />Edit details </button>
                                <br /><br />
                            </div>

                        </div>

                        <div className="col col-lg-8 col-md-6 ">
                            <h4>Movers Dubai - Outstanding Fines</h4>
                            <hr /><br />
                            <div className="col-md-offset-2 col-lg-offset-2 ">
                                <Carousel />
                            </div>

                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="row">
                        <div className="col-lg-3  col-md-3 ">
                            <ListOfCompaniesPanel />
                        </div>

                        <div className="col-lg-9 col-md-9">
                            <div className="panel">{/* panel */}
                                <div className="panel-heading">
                                    <div className="row">

                                        <div className="panel-title">
                                            <div className="panel-body">
                                                <div className="centered">
                                                    <i id="" className="fa fa-exclamation-circle blacken" />
                                                    <div className="text-center">Please select an option above to see details</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-lg-7 col-sm-7" />
                                    </div>
                                    <div className="text-center"> <br />
                                    </div>
                                </div><br />{/* panel-heading */}
                            </div>
                        </div>
                    </div>
                </div>

            );
        }



        return (
            <div>
                <div>
                    {contents}
                </div>
            </div>

        );
    }
}
export default IndividualSeeMore;
