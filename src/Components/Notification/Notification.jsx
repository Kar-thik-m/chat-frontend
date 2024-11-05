import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotiStyle from "../Notification/Notification.module.css";
import { clearAllNotifications, clearNotification } from '../../Redux/Slice/AuthSlice';

const NotificationComponent = () => {
    const dispatch = useDispatch();
    const { notification } = useSelector((state) => state.user);

    
    const handleClearNotification = (senderId) => {
        dispatch(clearNotification(senderId));
    };

    
    const handleClearAllNotifications = () => {
        dispatch(clearAllNotifications());
    };

    return (
        <div className={NotiStyle.container}>
            
            <button className={NotiStyle.clearAllButton} onClick={handleClearAllNotifications}>
                Clear All Notifications
            </button>
            
            <div className={NotiStyle.notifications}>
                {notification.length > 0 ? (
                    <ul className={NotiStyle.notificationList}>
                       
                        {notification.map((notif) => (
                            <li 
                                key={notif.senderId} 
                                className={NotiStyle.notificationItem}
                            >
                                <p className={NotiStyle.notificationText}>
                                    {notif.userinfo}
                                </p>
                                
                                
                                <button
                                    className={NotiStyle.clearButton}
                                    onClick={() => handleClearNotification(notif.senderId)}
                                >
                                    Clear
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    
                    <p className={NotiStyle.noNotifications}>No notifications</p>
                )}
            </div>
        </div>
    );
};

export default NotificationComponent;
