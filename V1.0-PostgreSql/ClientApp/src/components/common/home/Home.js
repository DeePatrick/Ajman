import React, { Component } from 'react';
import {connect} from 'react-redux';
import './home.css';
import PenaltyPaymentChart from '../home/1.PenaltyPaymentChart/PenaltyPaymentChart';
import LatestTransaction from '../home/2.LatestTransaction/LatestTransaction';
import MediaInfo from '../home/3.MediaInfo/MediaInfo';
import OutstandingActions from '../home/4.OutstandingActions/OutstandingActions';

export class Home extends Component {
    displayName = Home.name
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            email: '1',
            password: '',
            loading: true,
            otp: '',
            events: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            }

        };
    }
    render() {
        return (
            <div className="home">
                <div className="container-fluid">
                    <div className="row row-top">
                        <div className="col-lg-7 column">
                            <PenaltyPaymentChart />
                        </div>
                        <div className="col-lg-5 column">
                                <LatestTransaction/>
                        </div>
                        </div>
                    <div className="row">
                        <div className="col-lg-7 column">
                            <MediaInfo/>
                        </div>
                        <div className="col-lg-5 column">
                            <OutstandingActions />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Home);
