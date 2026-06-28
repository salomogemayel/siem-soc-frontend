export const getAlertSeverity = (level) => {
    const value = Number(level);

    if (value >= 12) return "critical"; // Tambahkan batas critical
    if (value >= 10) return "high";
    if (value >= 5) return "medium";

    return "low";
};

export const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
        case "critical":
            return "#7f1d1d"; // Merah gelap untuk critical
        case "high":
            return "#ef4444";
        case "medium":
            return "#f59e0b";
        case "low":
            return "#3b82f6";
        default:
            return "#9ca3af";
    }
};