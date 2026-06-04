import { useEffect, useState } from "react";
import { Bell, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../api/notificationApi";

export default function NotificationBell() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const fetchNotificationData = async () => {
        try {
            const [countRes, listRes] = await Promise.all([
                getUnreadNotificationCount(),
                getNotifications({ page: 1, size: 5 }),
            ]);

            if (countRes.data.success) {
                setCount(countRes.data.count || 0);
            }

            if (listRes.data.success) {
                setNotifications(listRes.data.data || []);
            }
        } catch (err) {
            console.error("Failed to load notifications");
        }
    };

    useEffect(() => {
        void fetchNotificationData();

        const interval = setInterval(() => {
            void fetchNotificationData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const openRelatedAlert = async (notification) => {
        try {
            if (!notification.is_read) {
                await markNotificationAsRead(notification.id);
            }
        } catch (err) {
            console.error("Failed to mark notification as read");
        }

        setOpen(false);

        const rule = notification.rule_id || "";
        const level = notification.rule_level || "";

        navigate(`/alerts?search=${rule}&level=${level}`);
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            await fetchNotificationData();
        } catch (err) {
            console.error("Failed to mark all notifications as read");
        }
    };

    return (
        <div className="notification-wrapper">
            <button
                className="notification-button"
                onClick={() => setOpen((prev) => !prev)}
            >
                <Bell size={20} />

                {count > 0 && (
                    <span className="notification-badge">
            {count > 99 ? "99+" : count}
          </span>
                )}
            </button>

            {open && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <div>
                            <h3>Notifications</h3>
                            <p>{count} unread critical alerts</p>
                        </div>

                        <button onClick={handleMarkAllAsRead}>Mark all read</button>
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="notification-empty">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <button
                                    key={item.id}
                                    className={`notification-item ${
                                        item.is_read ? "" : "unread"
                                    }`}
                                    onClick={() => openRelatedAlert(item)}
                                >
                                    <div className={`notification-icon ${item.severity}`}>
                                        <AlertTriangle size={16} />
                                    </div>

                                    <div className="notification-content">
                                        <strong>{item.title}</strong>
                                        <p>{item.message}</p>

                                        <span>
                      Rule {item.rule_id} • Level {item.rule_level} •{" "}
                                            {item.agent_name}
                    </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    <div className="notification-footer">
                        <button
                            onClick={() => {
                                setOpen(false);
                                navigate("/notifications");
                            }}
                        >
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}