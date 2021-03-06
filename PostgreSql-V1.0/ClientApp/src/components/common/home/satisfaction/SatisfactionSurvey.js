import React, {Component} from 'react';
import {EmojiSmiley} from './../../../shared/emojis/smiley';
import {Animated} from "react-animated-css";

class SatisfactionSurvey extends Component {

    render() {

        return (
            <div className="panel small-panel-height">{/* panel */}
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-5 col-lg-5 col-sm-5 col-xs-6">
                            <div className={(localStorage.getItem('selectedLanguageCode') == 2) ? "panel-title rtl-black-button" : "panel-title black-button"}>
                                <i className="fa fa-smile" />
                                <span className="btn-text">Satisfaction Survey</span>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-7 col-xs-6" />
                    </div>
                    <div className="text-center">
                    <Animated animationIn="bounceInLeft" animationInDelay={80} animationOutDelay={5000} animationOut="fadeOut" isVisible={true}>
                            <EmojiSmiley/>
                        </Animated>
                        <div className="green">Happy</div>
                        <div>
                            <h6>85% on average</h6>
                        </div>
                    </div>
                </div><br/>{/* panel-heading */}
            </div>
        );
    }
}

export default SatisfactionSurvey;