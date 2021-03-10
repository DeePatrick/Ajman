import React from 'react';
import { Popover } from 'react-bootstrap';
import { NotificationPopup } from '../../NotificationPopup';


const companyNotificationPopover = (
    <Popover id="popover-trigger-hover-focus" title="Company Notification" className="notifications-sidebar-width">
        <NotificationPopup />
    </Popover>
);



export default companyNotificationPopover;