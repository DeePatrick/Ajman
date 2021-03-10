import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';



class TransitionAppearApp extends Component {
    displayName = TransitionAppearApp.name

    render() {
        return (
            <div className="center">
                <CSSTransitionGroup
                    transitionName="AppearTransition"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <h2>{'I \u2661 Animations in React!'}</h2>
                </CSSTransitionGroup>
            </div>
        );
    }


}

export default TransitionAppearApp;