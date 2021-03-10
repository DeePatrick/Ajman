import React, { Component } from 'react';
import { connect } from 'react-redux';
import './home.css';
import '../../components/mobile-index.css';
import PenaltyPaymentChart from '../Dashboard/1.PenaltyPaymentChart/PenaltyPaymentChart';
import LatestTransaction from '../Dashboard/2.LatestTransaction/LatestTransaction';
import MediaInfo from '../Dashboard/3.MediaInfo/MediaInfo';
import OutstandingActions from '../Dashboard/4.OutstandingActions/OutstandingActions';

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
            direction: "",
            mostRecentPenalityCharge: {},
            latestTransactions: [],
            totalPaymentDue: '',
            events: {
                Id: "",
                StatusCode: "",
                ResponseMessage: "",
                ResponseType: "",
                IsSuccess: false
            }

        };
    }
    componentWillMount() {
        if (localStorage.getItem('selectedLanguageCode') !== null) {
            this.setState({ createdby: localStorage.getItem('individualid'), individualid: localStorage.getItem('individualid') });
            this.setState({ languageid: localStorage.getItem('selectedLanguageCode') });
            this.setState({ loading: true });
            fetch('http://122.160.45.128:8082/api/aptc_getcustomerdashboarddata/33')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        mostRecentPenalityCharge: data.mostRecentPenalityCharge,
                        latestTransactions: data.latestTransactions,
                        totalPaymentDue: data.totalPaymentDue
                    });
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    alert(error);
                });
        }
        if (localStorage.getItem('selectedLanguageCode') === '2') {
            this.setState({ direction: 'RTL' });
        }
        else {
            this.setState({ direction: 'LTL' });
        }
    }

    render() {
        return (
            <div className="container-fluid1" dir={this.state.direction}>
                <div className="row panel-rows">
                    <div className="col-md-8 col-lg-8 col-sm-12 h-100">
                        <PenaltyPaymentChart mostRecentPenalityCharge={this.state.mostRecentPenalityCharge} totalPaymentDue={this.state.totalPaymentDue} />
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12 h-100 top-spacing">
                        <LatestTransaction latestTransactions={this.state.latestTransactions} />
                    </div>
                </div>
                <div className="row panel-rows">
                    <div className="col-md-8 col-lg-8 col-sm-12 h-100">
                        <MediaInfo />
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12 h-100 top-spacing">
                        <OutstandingActions />
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Home);
