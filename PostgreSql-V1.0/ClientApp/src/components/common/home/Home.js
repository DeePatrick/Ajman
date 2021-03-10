import React, { Component } from 'react';
import CarTrack from './car-track/CarTrack';
import Volumetrics from './volumetrics/Volumetrics';
import Complaints from './complaints/Complaints';
import SatisfactionSurvey from './satisfaction/SatisfactionSurvey';
import BackOffice from './back-office/BackOffice';
import CallCenter from './call-center/CallCenter';
import FrontOffice from './front-office/FrontOffice';
import { Animated } from "react-animated-css";


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
            <div className="entity-table-no-searchbar">
                <div>
                    <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "arab-row" : null}>
                        <div className="col col-lg-4  col-md-4 col-xs-12">
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <FrontOffice />
                            </Animated>
                            <br />
                        </div>
                        <div className="col col-lg-4  col-md-4 col-xs-12">
                            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible>
                                <BackOffice />
                            </Animated>

                            <br />
                        </div>
                        <div className="col col-lg-4  col-md-4 col-xs-12">
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>
                                <CallCenter />
                            </Animated>
                            <br />
                        </div>
                    </div>

                    <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "arab-row" : null}>
                        <div className="col col-lg-4  col-md-4 col-xs-12">

                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible>
                                <CarTrack />
                            </Animated>

                        </div>
                        <div className="col col-lg-4  col-md-4 col-xs-12">
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible>
                                <Volumetrics />
                            </Animated>

                        </div>
                        <div className="col col-lg-4  col-md-4 col-xs-12">
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible>
                                <Complaints />
                                <br />
                                <SatisfactionSurvey />
                            </Animated>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default Home;
