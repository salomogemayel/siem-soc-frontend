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
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
                <Bell size={20} />

                {count > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {count > 99 ? "99+" : count}
                </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-12 z-50 w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <div className="flex items-start justify-between border-b border-slate-100 p-4">
                        <div>
                            <h3 className="m-0 text-sm font-semibold text-slate-900">
                                Notifications
                            </h3>

                            <p className="m-0 mt-1 text-xs text-slate-500">
                                {count} unread critical alerts
                            </p>
                        </div>

                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Mark all read
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-sm text-slate-500">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map((item) => {
                                const severityClass =
                                    item.severity === "high"
                                        ? "bg-red-50 text-red-600"
                                        : item.severity === "medium"
                                            ? "bg-amber-50 text-amber-600"
                                            : "bg-blue-50 text-blue-600";

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => openRelatedAlert(item)}
                                        className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                                            item.is_read ? "" : "bg-blue-50/30"
                                        }`}
                                    >
                                        <div
                                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${severityClass}`}
                                        >
                                            <AlertTriangle size={16} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <strong className="block truncate text-sm text-slate-900">
                                                {item.title}
                                            </strong>

                                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                                {item.message}
                                            </p>

                                            <span className="mt-2 block text-[11px] text-slate-400">
                                            Rule {item.rule_id} • Level{" "}
                                                {item.rule_level} •{" "}
                                                {item.agent_name}
                                        </span>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <div className="border-t border-slate-100 p-3">
                        <button
                            onClick={() => {
                                setOpen(false);
                                navigate("/notifications");
                            }}
                            className="w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}