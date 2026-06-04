import api from "./axios";

export const getNotifications = ({ page = 1, size = 10 } = {}) =>
    api.get("/notifications", {
        params: { page, size },
    });

export const getUnreadNotificationCount = () =>
    api.get("/notifications/unread-count");

export const markNotificationAsRead = (id) =>
    api.put(`/notifications/${id}/read`);

export const markAllNotificationsAsRead = () =>
    api.put("/notifications/read-all");