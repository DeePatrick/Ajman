import React from 'react';
import { Popover } from 'react-bootstrap';
import { NotificationPopup } from '../../NotificationPopup';


const VehiclesNotificationPopover = (
    <Popover id="popover-trigger-hover-focus" title="Vehicle Notification" className="notifications-sidebar-width">
        <NotificationPopup />
    </Popover>
);



export default VehiclesNotificationPopover;