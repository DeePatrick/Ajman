import React, { Component } from 'react';
import * as config from '../../config';
import './HeaderNotification.css';
import axios from 'axios';

export class NotificationPopup extends Component {
    displayName = NotificationPopup.name



    state = {
        loading: true,
        user: [],
        userData: [],
        notificationData: [],
        notification: {
            roleCode: 'HODP',
            deptCode: 'FROE',
            notificationType: 4,
            userCode: ''
        }
    };


    componentDidMount() {
        fetch(config.webApiUrl() + 'aptc_user/' + localStorage.getItem('email'))
            .then(response => response.json())
            .then(data => {
                this.setState({ userData: data, user: data, loading: false });
            });

        this.getUserInfo();
    }


    getUserInfo() {
        var roleCode = this.state.userData.map(user => user.roles.primaryRole).toString();
        var deptCode = this.state.userData.map(user => user.department).toString();

        let notification = Object.assign({}, this.state.notification);
        notification.roleCode = roleCode;
        notification.deptCode = deptCode;
        this.setState({ notification });

        var item = this.props.notification;

        this.getUserNotifications();

    }


    getUserNotifications() {
        var notificate = this.state.notification;
        console.log(notificate);
        var data = JSON.stringify(notificate);




        axios
            .post(config.webApiUrl() + 'aptc_GetNotificationRolewiseUserwise', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loading: false });
                console.log("Status", response.status);
                this.setState({ notificationData: response.data });
            })
            .catch((error) => {
                if (error.response !== undefined) {
                    if (error.response.data.IsSuccess !== undefined) {
                        alert(error.response.data.ResponseMessage);

                    }
                }
                else {
                    alert("Notification Fail:" + error.mesage);
                }
            });


    }



    render() {
        console.log("roleCode " + this.state.notification.roleCode);
        console.log("deptCode " + this.state.notification.deptCode);
        console.log("notificationType " + this.state.notification.notificationType);
        console.log("user data " + this.state.userData);
        return (
            <content>
                {this.state.notificationData.slice(0, 1).map((vec, index) => (
                    <div className="notifications-card notify-padding" key={index}>
                        <div className="icon-wrapper"><span className="pics pull-left">
                            <i className="fas fa-user-friends notify-icons" />
                        </span>
                        </div>
                        <div>
                            <span className="main-title">{vec.notificationText}</span>
                        </div>
                        <div>
                            <span className="main-title notify-time pull-right">{vec.notificationCreatedDate}</span>
                        </div>
                        <br />
                        <div>
                            <label className="label label-primary notify-status" />
                        </div>
                    </div>))}
            </content>
        );
    }
}
export default NotificationPopup;