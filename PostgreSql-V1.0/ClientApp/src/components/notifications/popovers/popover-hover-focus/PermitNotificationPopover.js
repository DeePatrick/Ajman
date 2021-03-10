import React from 'react';
import { Popover } from 'react-bootstrap';
import { NotificationPopup } from '../../NotificationPopup';


const PermitNotificationPopover = (
    <Popover id="popover-trigger-hover-focus" title="Permit Notification" className="notifications-sidebar-width">
        <NotificationPopup />
    </Popover>
);



export default PermitNotificationPopover;