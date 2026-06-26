export const getAlertSeverity = (level) => {
    const lvl = Number(level);

    if (lvl >= 10) return "high";
    if (lvl >= 5) return "medium";
    return "low";
};

export const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
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