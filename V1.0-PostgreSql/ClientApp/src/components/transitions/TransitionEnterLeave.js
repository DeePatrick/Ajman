import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group';



class TransitionEnterLeave extends Component {
    displayName = TransitionEnterLeave.name

    render() {
        return (
            <div>
                <CSSTransitionGroup
                    transitionName="EnterTransition"
                    transitionAppear={false}
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={true}
                    transitionLeaveTimeout={500}
                >
                    <h2>{'I \u2661 Animations in React!'}</h2>
                </CSSTransitionGroup>
            </div>
        );
    }


}

export default TransitionEnterLeave;