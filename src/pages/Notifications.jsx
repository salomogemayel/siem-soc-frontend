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
        try {
            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, is_read: true } : item
                )
            );

            setUnread((prev) => Math.max(prev - 1, 0));

            await markNotificationAsRead(id);

            const response = await getNotifications({
                page,
                size: PAGE_SIZE,
            });

            if (response.data.success) {
                setNotifications(response.data.data || []);
                setUnread(response.data.unread || 0);
                setTotalPages(response.data.total_pages || 1);
            }
        } catch (err) {
            setError("Failed to mark notification as read");
        }
    };

    const handleMarkAll = async () => {
        try {
            await markAllNotificationsAsRead();
            await fetchNotifications();
        } catch (err) {
            setError("Failed to mark all notifications as read");
        }
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

    const getSeverityClass = (severity) => {
        if (severity === "high") {
            return {
                icon: "bg-red-50 text-red-600",
                badge: "bg-red-50 text-red-700",
                label: "High",
            };
        }

        if (severity === "medium") {
            return {
                icon: "bg-amber-50 text-amber-600",
                badge: "bg-amber-50 text-amber-700",
                label: "Medium",
            };
        }

        return {
            icon: "bg-blue-50 text-blue-600",
            badge: "bg-blue-50 text-blue-700",
            label: "Low",
        };
    };

    if (loading) return <LoadingState message="Loading notifications..." />;
    if (error) return <ErrorState message={error} />;

    return (
        <section className="space-y-[18px]">
            <PageHeader
                title="Notifications"
            />

            <div className="flex flex-col gap-3 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="text-sm text-slate-600">
                        <strong className="text-lg text-slate-900">
                            {unread}
                        </strong>{" "}
                        notifikasi belum dibaca
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                        Tindak lanjuti alerts yang masuk ke notifikasi.
                    </p>
                </div>

                <button
                    onClick={handleMarkAll}
                    disabled={unread === 0}
                    className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
                            const severity = getSeverityClass(item.severity);

                            return (
                                <div
                                    key={item.id}
                                    className={`flex gap-4 rounded-xl border p-4 transition hover:shadow-sm ${
                                        item.is_read
                                            ? "border-slate-100 bg-white hover:bg-slate-50"
                                            : "border-blue-200 border-l-4 border-l-blue-600 bg-blue-50/40"
                                    }`}
                                >
                                    <div
                                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${severity.icon}`}
                                    >
                                        <AlertTriangle size={20} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="m-0 text-sm font-semibold text-slate-900">
                                                        {item.title || "-"}
                                                    </h3>

                                                    {!item.is_read && (
                                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                                                            Unread
                                                        </span>
                                                    )}

                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${severity.badge}`}
                                                    >
                                                        {severity.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {!item.is_read && (
                                                <button
                                                    onClick={() =>
                                                        handleRead(item.id)
                                                    }
                                                    className="w-fit rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow-md"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>

                                        <p
                                            className="mt-1 line-clamp-2 text-sm text-slate-500"
                                            dangerouslySetInnerHTML={{
                                                __html: item.message || "-",
                                            }}
                                        />

                                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                                            <span className="rounded-full bg-slate-100 px-2 py-1">
                                                Rule {item.rule_id || "-"}
                                            </span>
                                            <span className="rounded-full bg-slate-100 px-2 py-1">
                                                Level {item.rule_level || "-"}
                                            </span>
                                            <span className="rounded-full bg-slate-100 px-2 py-1">
                                                {item.agent_name || "-"}
                                            </span>
                                            <span className="rounded-full bg-slate-100 px-2 py-1">
                                                {formatDate(
                                                    item.alert_timestamp
                                                )}
                                            </span>
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