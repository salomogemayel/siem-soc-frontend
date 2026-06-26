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

    const formatDate = (value) => {
        if (!value) return "-";

        return new Intl.DateTimeFormat("id-ID", {
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(new Date(value));
    };

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Notifications"
                description="Review high and critical security alerts that require attention."
            />

            <div className="flex flex-col gap-3 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                    <strong className="text-lg text-slate-900">
                        {unread}
                    </strong>{" "}
                    unread notifications
                </div>

                <button
                    onClick={handleMarkAll}
                    className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Mark all as read
                </button>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
                {notifications.length === 0 ? (
                    <div className="py-10 text-center text-sm text-slate-500">
                        No notifications found.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((item) => {
                            const severityClass =
                                item.severity === "high"
                                    ? "bg-red-50 text-red-600"
                                    : item.severity === "medium"
                                        ? "bg-amber-50 text-amber-600"
                                        : "bg-blue-50 text-blue-600";

                            return (
                                <div
                                    key={item.id}
                                    className={`flex gap-4 rounded-xl border p-4 transition ${
                                        item.is_read
                                            ? "border-slate-100 bg-white"
                                            : "border-blue-200 bg-blue-50/30"
                                    }`}
                                >
                                    <div
                                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${severityClass}`}
                                    >
                                        <AlertTriangle size={20} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <h3 className="m-0 text-sm font-semibold text-slate-900">
                                                {item.title}
                                            </h3>

                                            {!item.is_read && (
                                                <button
                                                    onClick={() => handleRead(item.id)}
                                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>

                                        <p className="m-0 text-sm text-slate-600">
                                            {item.message}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                                            <span>Rule {item.rule_id}</span>
                                            <span>Level {item.rule_level}</span>
                                            <span>{item.agent_name}</span>
                                            <span>{formatDate(item.alert_timestamp)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-5">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        pageNumbers={pageNumbers}
                        setPage={setPage}
                    />
                </div>
            </div>
        </section>
    );
}