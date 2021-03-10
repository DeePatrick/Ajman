import React, { Component } from 'react';
import './HeaderNotification.css';




export class HeaderNotification extends Component {
    displayName = HeaderNotification.name

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            userData: []

        };
    }


    render() {
        console.log("roleCode " + this.props.notification.roleCode);
        console.log("deptCode " + this.props.notification.deptCode);
        console.log("notification data" + this.props.notificationData);
        return (
            <div>
                <div id="six" className="modal fade bs-example-modal-sm notifications-background" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog modal-sm pull-right notifications-wrapper" role="document">
                        <div className="modal-content notifications-panel">
                            <header>
                                <h2>Global Notifications</h2>
                                <span className='notifications-bell pull-right'>
                                    <i className="fa fa-bell inner-bell" >
                                        <span className="notify-sidebar"><label className="label label-danger notify-label">{this.props.notificationData.length}</label></span>
                                    </i>
                                </span>
                                <span className='more-icon-notify pull-right'>
                                    <i className="glyphicon glyphicon-option-horizontal" />
                                </span>
                            </header>
                            <content>
                               {this.props.notificationData.map((vec, index) => (<div className="" key={index}>

									<div className="notifications-card">
										<div className="icon-wrapper">
											<span className="pics pull-left">

												{vec.notificationType === 5 ? <i className="fas fa-car notify-icons" /> : null}
												{vec.notificationType === 3 ? <i className="fas fa-ticket-alt notify-icons rotate" /> : null}
												{vec.notificationType === 2 ? <i className="fas fa-user-alt notify-icons" /> : null}
												{vec.notificationType === 6 ? <i className="far fa-file-alt notify-icons icon-align" /> : null}
												{vec.notificationType === 4 ? <i className="fas fa-building notify-icons" /> : null}
												{vec.notificationType === 1 ? <i className="fas fa-user-friends notify-icons" /> : null}

											</span>
										</div>
                                        <span className="pull-right notify-right-arrow" onClick={this.getUserNotifications}>
                                            <i className="fas fa-arrow-right">
                                                <span className="notify-time">{vec.notificationCreatedDate}</span>
                                            </i>
                                        </span>
                                        <span className="main-title">{vec.notificationDescription}</span><br />
                                        <span className="main-title">{vec.notificationText}</span><br />
                                        <span className="main-title">{vec.notificationText.includes("AP") ? <label className="label label-primary notify-status">Active<span className="glyphicon glyphicon-chevron-down notify-status-chevron" /></label> : <label className="label label-primary notify-status">Inactive<span className="glyphicon glyphicon-chevron-down notify-status-chevron" /></label>}
                                        </span>
                                    </div>

                                </div>))}

                            </content>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default HeaderNotification;