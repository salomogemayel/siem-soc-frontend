import api from "./axios";

export const getRules = () => api.get("/wazuh/rules");
export const getManager = () => api.get("/wazuh/manager");
export const getAlerts = ({ page = 1, size = 20, level = "", search = "" }) =>
    api.get("/wazuh/alerts", {
        params: { page, size, level,search },
    });
export const getAgents = ({ page = 1, size = 20, search = "", status = "" }) =>
    api.get("/wazuh/agents", {
        params: { page, size, search, status },
    });

export const getLogs = ({
                            page = 1,
                            size = 20,
                            search = "",
                            agentId = "",
                            location = "",
                            decoder = "",
                            program = "",
                            timeRange = "24h",
                            dateFrom = "",
                            dateTo = "",
                        } = {}) =>
    api.get("/wazuh/logs", {
        params: {
            page,
            size,
            search,
            agent_id: agentId,
            location,
            decoder,
            program,
            time_range: timeRange,
            date_from: dateFrom,
            date_to: dateTo,
        },
    });

export const getLogFilters = () => api.get("/wazuh/logs/filters");