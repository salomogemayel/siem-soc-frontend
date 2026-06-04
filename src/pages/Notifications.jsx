import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import Pagination from "../components/Pagination";
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../api/notificationApi";

const PAGE_SIZE = 10;

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchNotifications = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getNotifications({
                page,
                size: PAGE_SIZE,
            });

            if (response.data.success) {
                setNotifications(response.data.data || []);
                setUnread(response.data.unread || 0);
                setTotalPages(response.data.total_pages || 1);
            } else {
                setError("Failed to load notifications");
            }
        } catch (err) {
            setError("Cannot connect to Laravel backend API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchNotifications();
    }, [page]);

    const handleRead = async (id) => {
        await markNotificationAsRead(id);
        await fetchNotifications();
    };

    const handleMarkAll = async () => {
        await markAllNotificationsAsRead();
        await fetchNotifications();
    };

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }, [page, totalPages]);

    if (loading) return <LoadingState message="Loading notifications..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <>
            <PageHeader
                title="Notifications"
                description="Review high and critical security alerts that require attention."
            />

            <div className="notification-page-toolbar">
                <div>
                    <strong>{unread}</strong>
                    <span> unread notifications</span>
                </div>

                <button onClick={handleMarkAll}>Mark all as read</button>
            </div>

            <div className="card notification-page-list">
                {notifications.length === 0 ? (
                    <p className="notification-empty">No notifications found.</p>
                ) : (
                    notifications.map((item) => (
                        <div
                            key={item.id}
                            className={`notification-page-item ${
                                item.is_read ? "" : "unread"
                            }`}
                        >
                            <div className={`notification-page-icon ${item.severity}`}>
                                <AlertTriangle size={20} />
                            </div>

                            <div className="notification-page-content">
                                <div className="notification-page-title">
                                    <h3>{item.title}</h3>

                                    {!item.is_read && (
                                        <button onClick={() => handleRead(item.id)}>
                                            Mark as read
                                        </button>
                                    )}
                                </div>

                                <p>{item.message}</p>

                                <div className="notification-meta">
                                    <span>Rule {item.rule_id}</span>
                                    <span>Level {item.rule_level}</span>
                                    <span>{item.agent_name}</span>
                                    <span>{item.alert_timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    setPage={setPage}
                />
            </div>
        </>
    );
}