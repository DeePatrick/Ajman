import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './footer.css';
import { translate } from 'react-multi-lang';
import type { T } from 'react-multi-lang';

type Props = {
    t: T
}

export class Footer extends Component {
    displayName = Footer.name;
    constructor(props) {
        super(props);
        this.state = {
            direction: ''
        };
    }
    componentWillMount() {
        if (localStorage.getItem('selectedLanguageCode') === '2') {
            this.setState({ direction: 'RTL' });

        }
        else {
            this.setState({ direction: 'LTL' });
        }
    }
    render() {
        return (
            <footer className="footer" dir={this.state.direction}>

                <div style={{ backgroundColor: 'white' }}>
                    <div className="row first-footer-content-container">
                        <div className="col-md-6 col-lg-3 col-sm-6 col-xs-6 sub-footer-align-center">
                            <div className="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 footer-top-icon">
                                    <span className="footer-fa-icon-top"><i className="fa fa-phone" aria-hidden="true"></i></span>
                                </div>
                                <div className="col-md-10 col-lg-10 col-sm-10 footer-top-text">
                                    CONTACT APTC
                                    <p className="footer-bolded-header-top">+971 67148444</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-6 col-xs-6 sub-footer-align-center sub-footer-align">
                            <div className="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 footer-top-icon">
                                    <span className="footer-fa-icon-top"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                </div>
                                <div className="col-md-10 col-lg-10 col-sm-10 footer-top-text">
                                    VIEW LOCATION IN
                                    <p className="footer-bolded-header-top">GOOGLE MAPS</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-6 col-xs-6 sub-footer-align-center sub-footer-align">
                            <div className="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 footer-top-icon">
                                    <span className="footer-fa-icon-top"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-4 footer-top-text">
                                    OUR WORK
                                    <p className="footer-bolded-header-top">TIMINGS</p>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-6 footer-top-text footer-working-times">
                                    Sunday to Thursday
                                    <p>7:30am to 2:30pm</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-sm-6 col-xs-6 sub-footer-align-center sub-footer-align">
                            <div className="row">
                                <div className="col-md-2 col-lg-3 col-sm-2 footer-top-icon">
                                    <span className="footer-fa-icon-top"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-6 footer-top-text">
                                    SUBSCRIBE TO OUR
                                    <p className="footer-bolded-header-top">NEWSLETTER</p>
                                </div>
                                <div className="col-md-4 col-lg-3 col-sm-4 footer-top-text">
                                    <button type="button" className="btn btn-primary footer-button-custom">SUBSCRIBE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{}}>
                    <div className="row second-footer-content-container align-items-center">
                        <div className="col-md-4 col-lg-2 col-sm-4 footer-align">
                            <img className="footer-image-logo" src={require('../../assets/ptc_logo_grey.png')} />
                        </div>
                        <div className="col-md-4 col-lg-6 col-sm-4 footer-align">
                            <p>{this.props.t('Website_Updated')}</p>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-4 footer-align-img">

                            <div class="footer-image-wrapper">
                                <section class="carousel-default">
                                    <div id="carousel-default" class="carousel slide" data-ride="carousel">
                                    
                                        <div class="carousel-inner" role="listbox">
                                            <div class="item footer-caro">
                                                <img src="https://dummyimage.com/400x150" alt="First slide" />
                                            </div>
                                            <div class="item footer-caro">
                                                <img src="https://dummyimage.com/400x150" alt="Second slide" />
                                            </div>
                                            <div class="item footer-caro active">
                                                <img src="https://dummyimage.com/400x150" alt="Third slide" />
                                            </div>
                                        </div>
                                        <a class="left carousel-control left-arrow" href="#carousel-default" role="button" data-slide="prev">
                                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="right carousel-control right-arrow" href="#carousel-default" role="button" data-slide="next">
                                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                </section>
                            </div>
                                      
                        </div>
                    </div>
                </div>

                <div style={{}}>
                    <div className="row third-footer-content-container">
                        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                            <div className="left">
                                <ul className="footer-nav">
                                    <li><a href="#">{this.props.t('Accessibility')}</a></li>
                                    <li><a href="#">{this.props.t('Disclaimer')}</a></li>
                                    <li><a href="#">{this.props.t('Help')}</a></li>
                                    <li><a href="#">{this.props.t('Glossary')}</a></li>
                                    <li><a href="#">{this.props.t('Privacy_Policy')}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                            <div className="right">
                                <ul className="footer-nav">
                                    <li><a href="#">{this.props.t('Programs_and_Channels')}</a></li>
                                    <li className="footer-icon"><a href="#"><i className="fa fa-facebook-official" aria-hidden="true" /></a></li>
                                    <li className="footer-icon"><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                                    <li className="footer-icon"><a href="#"><i className="fa fa-youtube-play" aria-hidden="true" /></a></li>
                                    <li className="footer-icon"><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
                                    <li className="footer-icon"><a href="#"><i className="fa fa-rss" aria-hidden="true" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default translate(Footer)